const User = require("../user/userModel");
const { getUserUsage } = require("../../utility/utility");

exports.post = (req, res, next) => {
  // console.log("post", req.query, req.body);
  const { userId } = req.query;
  const usage = req.body.usage;

  User.findOne({ id: userId })
    .then((user) => {
      // console.log(user);
      if (!user) {
        res
          .status(404)
          .json({ msg: "", error: `No such user with id - ${userId}` });
        return;
      }

      // console.log("found user", user, user.usages.concat(usage));
      const userUpdates = {
        usages: user.usages.concat(usage),
      };
      Object.assign(user, userUpdates);
      // console.log("gonna save", user);
      user.save((err, saved) => {
        const responseJSON = { error: null, usage: {} };
        if (err) {
          responseJSON.msg = "Got error while adding new usage to db";
          responseJSON.error = err;
        } else {
          // then send res
          responseJSON.usage = getUserUsage(
            saved.usages[saved.usages.length - 1]
          );
        }

        res.status(202).json(responseJSON);
      });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Got error...", error: err });
      return next(err);
    });

  // const user = req.body;
  // // if user contains any usages property
  // if (user.hasOwnProperty("usages")) {
  //   // user contains usages property
  //   if (user.usages.length) {
  //     // send res - insert user along with usages details is not permitted to this endpoint, please post to /usages
  //     res.json({
  //       msg: "",
  //       error:
  //         "user along with usages details is not permitted to post to [/users] endpoint, please post to [/usages] endpoint",
  //     });
  //     return;
  //   }
  // } else {
  //   // user doesn't contain any usages property
  //   res.json({ msg: "", error: "User must contain empty usages property" });
  //   return next(err);
  // }

  // const newUser = new User(user);
  // newUser.save((err, saved) => {
  //   if (err) {
  //     res.json({ msg: "Got error while saving to database", error: err });
  //     return;
  //   } else {
  //     // then send res
  //     res.status(202).json({
  //       msg: "",
  //       error: null,
  //       user: hideUserSensitiveDetails(saved),
  //     });
  //   }
  // });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "", error: "Not Permitted...!!" });
};
