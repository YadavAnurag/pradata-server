const User = require("./userModel");
const {
  hideUserSensitiveDetails,
  getUserPatchDetails,
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

exports.getOne = (req, res, next) => {
  const user = hideUserSensitiveDetails(req.user);
  res.json(user);
};

exports.patchOne = (req, res) => {
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
  }

  Object.assign(user, userUpdates);
  user.save((err, saved) => {
    if (err) {
      res.json({ msg: "", error: err });
      return;
    } else {
      // then send res
      const responseJSON = { error: null, updates: getUserPatchDetails(saved) };
      res.status(202).json(responseJSON);
    }
  });
};

exports.deleteOne = (req, res) => {
  req.user.remove((err, removed) => {
    const responseJSON = { err: null, msg: "" };
    if (err) {
      responseJSON.err = err;
      responseJSON.msg = "Error while deleting the document from database";
    } else {
      responseJSON.removed = removed.id;
    }
    res.json(responseJSON);
    return;
  });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "", error: "Not Permitted...!!" });
};
