const User = require("../user/userModel");
const { getUserUsage } = require("../../utility/utility");

// to find if user exists
exports.params = (req, res, next, id) => {
  // console.log("Searching, id", id);

  User.findOne({ id })
    .then((user) => {
      // console.log(user);
      if (!user) {
        res.status(404).json({
          msg: "`No such user with id - ${id}`",
          error: `No such user with id - ${id}`,
        });
        return;
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({
        msg: "Got error while searching user in Database",
        error: err,
      });
      return next(err);
    });
};

exports.addUsage = (req, res) => {
  // console.log("post", req.query, req.body);
  const user = req.user;
  console.log("req.body", req.body);
  const usage = req.body;

  console.log("found user", user, user.usages.concat(usage));
  const userUpdates = {
    usages: user.usages.concat(usage),
  };
  Object.assign(user, userUpdates);
  // console.log("gonna save", user);
  user.save((err, saved) => {
    const responseJSON = { msg: "", error: null, usage: {} };
    if (err) {
      responseJSON.msg = "Got error while adding new usage to db";
      responseJSON.error = err;
    } else {
      // then send res
      console.log("exports.post - saved", saved);
      responseJSON.usage = getUserUsage(saved.usages[saved.usages.length - 1]);
    }

    res.status(202).json(responseJSON);
  });
};

exports.addPayment = (req, res) => {
  // console.log("post", req.query, req.body);
  const user = req.user;
  console.log("req.body", req.body);
  const { usageId, paymentDetail } = req.body;

  console.log("addPayment", "userId, usageId, paymentDetails", req.body);

  // check if no usages
  if (!user.usages) {
    res.json({
      msg: "To add payment, please add any usage first",
      err: "To add payment, please add any usage first",
    });
    return;
  }

  const usage = user.usages.find(({ id }) => id === usageId);
  // check if usageId matches and found usage
  if (usage === "undefined") {
    res.json({
      msg: `There is no such usage with usageId - ${usageId}`,
      err: `There is no such usage with usageId - ${usageId}`,
    });
    return;
  }

  // add payment details to the usage
  const updatedUsages = user.usages.map((usage) => {
    // console.log("see this usage", usage);
    if (usage.id !== usageId) {
      return usage;
    } else {
      const paymentDetails = usage.paymentDetails.concat(paymentDetail);
      Object.assign(usage, { paymentDetails });
      return usage;
    }
  });
  const userUpdates = {
    usages: updatedUsages,
  };

  // console.log(
  //   "addPayment - userUpdates updatedUsages",
  //   userUpdates,
  //   updatedUsages
  // );

  const updatedUser = Object.assign(user, userUpdates);
  // console.log("gonna save", updatedUser, updatedUser.usages[0].paymentDetails);
  user.save((err, saved) => {
    if (err) {
      console.log("got error while saving", err);
      res.status(302).json({
        msg: "Got error while adding new payment to db",
        error: "Got error while adding new payment to db",
      });
    } else {
      console.log("successfully added", saved);
      res.status(202).json({
        msg: "Payment Successfully added",
        error: null,
      });
    }
  });
};

exports.notPermitted = (req, res) => {
  console.log("coming here");
  res.json({ msg: "", error: "API Endpoint Not Permitted...!!" });
};
