const User = require("./userModel");
const {
  hideUserSensitiveDetails,
  doEveryUsageContainsAtLeastOnePaymentDetail,
} = require("../../utility/utility");

exports.params = (req, res, next, id) => {
  // console.log("Searching, id", id);

  User.findOne({ id })
    .then((user) => {
      // console.log(user);
      if (!user) {
        res
          .status(404)
          .json({ msg: "", error: `No such user with id - ${id}` });
        return;
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "Got error...", error: err });
      return next(err);
    });
};

exports.getList = (req, res, next) => {
  User.find({})
    .exec()
    .then((users) => users.map((user) => hideUserSensitiveDetails(user)))
    .then((users) => res.status(202).json({ error: null, users }))
    .catch((err) => {
      res.json({
        msg: "Failed while fetching users from database",
        error: err,
      });
      return next(err);
    });
};
exports.post = (req, res, next) => {
  const user = req.body;

  // if user contains any usages property
  if (user.hasOwnProperty("usages")) {
    // user contains usages property
    if (user.usages.length) {
      // send res - insert user along with usages details is not permitted to this endpoint, please post to /usages
      res.json({
        msg: "",
        error:
          "user along with usages details is not permitted to post to [/users] endpoint, please post to [/usages] endpoint",
      });
      return;
    }
    // // then checkdoEveryUsageContainsAtLeastOnePaymentDetail if returns false means
    // // at least one usage does not contains paymentDetail then res error
    // if (!doEveryUsageContainsAtLeastOnePaymentDetail(user.usages)) {
    //   res.json({
    //     msg: "Every Usage must contain at least one paymentDetail",
    //   });
    // } else {
    //   // else
    //   // user contains all usages with at least one paymentDetail, save doc
    //   const newUser = new User(user);
    //   newUser.save((err, saved) => {
    //     if (err) {
    //       res.json({ msg: "", error: err });
    //     } else {
    //       res
    //         .status(201)
    //         .json({ msg: `document created with id - ${saved.id}` });
    //     }
    //   });
    // }
  } else {
    // user doesn't contain any usages property
    res.json({ msg: "", error: "User must contain empty usages property" });
    return next(err);
  }

  const newUser = new User(user);
  newUser.save((err, saved) => {
    if (err) {
      res.json({ msg: "Got error while saving to database", error: err });
      return;
    } else {
      // then send res
      res.status(202).json({
        msg: "",
        error: null,
        user: hideUserSensitiveDetails(saved),
      });
    }
  });
};
// exports.post = (req, res, next) => {
//   const newUser = new User(req.body);
//   // if there is any usage then there must be at least one payment detail
//   if (newUser.usages.length) {
//     console.log(newUser.usages[0]);
//     if (!newUser.usages[0].paymentDetails.length) {
//       res.json({
//         msg: "",
//         error:
//           "if there is any usage then there must be at least one payment detail",
//       });
//       return;
//     }
//   }

//   newUser.save((err, saved) => {
//     if (err) {
//       res.json({ msg: "", error: err });
//     } else {
//       res.status(201).json({ msg: `document created with id - ${saved.id}` });
//     }
//   });
// };

exports.getOne = (req, res, next) => {
  const user = hideUserSensitiveDetails(req.user);
  res.json(user);
};

exports.patchOne = (req, res, next) => {
  // if document has nested document please update key values explicitly
  const user = req.user;
  const userUpdates = req.body;

  // if user contains any usages property
  if (userUpdates.hasOwnProperty("usages")) {
    res.json({
      msg: "",
      error:
        "User patch with usages property is not permitted to this endpoint, please send [patch req] to [/usage/:userId]",
    });
    return;
    // if (userUpdates.usages.length) {
    //   // then checkdoEveryUsageContainsAtLeastOnePaymentDetail if returns false means
    //   // at least one usage does not contains paymentDetail then res error
    //   if (!doEveryUsageContainsAtLeastOnePaymentDetail(userUpdates.usages)) {
    //     res.json({
    //       msg: "Every Usage must contain at least one paymentDetail",
    //     });
    //   } else {
    //     if (!userUpdates.usages.paymentDetails.length) {
    //       // if no payment details found return err that if any usage then it must contain at least one paymentDetail
    //       res.json({
    //         msg: "",
    //         error:
    //           "if user contains any usage then it must contain at least one paymentDetail",
    //       });
    //       return;
    //     } else {
    //       // else
    //       // user contains all usages with at least one payment detail
    //       // for a user usages path- 1. usages only can be added 2. paymentDetails only can be added
    //       //combine both paymentDetails
    //       // combine both usage
    //       // combine both user
    //       // save doc
    //       // then send res
    //     }
    //   }
    // } else {
    //   // else there is no usage, means usages is empty
    //   // combine userUpdates with user and save doc
    // }
  }

  Object.assign(user, userUpdates);
  user.save((err, saved) => {
    if (err) {
      res.json({ msg: "", error: err });
      return;
    } else {
      // then send res
      res.status(202).json({
        msg: "",
        error: null,
        user: hideUserSensitiveDetails(saved),
      });
    }
  });
};

exports.deleteOne = (req, res) => {
  req.user.remove((err, removed) => {
    if (err) {
      res.json({
        msg: "Error while deleting the document from database",
        error: err,
      });
      return;
    } else {
      res.json({ msg: `user removed with id: ${removed.id}` });
      return;
    }
  });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "", error: "Not Permitted...!!" });
};
