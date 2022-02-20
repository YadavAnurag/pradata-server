const User = require("../user/userModel");

exports.login = (req, res, next) => {
  const { emailId,
    password,
    //isAdmin, secretCode 
  } = req.body;

  // let responseMsg = "";
  // if (isAdmin) {
  //   responseMsg = "Incorrect EmailId, Password or Secret-Code";
  // } else {
  //   responseMsg = "Incorrect EmailId or Password";
  // }
  let responseMsg = "Incorrect EmailId or Password";

  console.log("got", req.body);

  User.findOne({ emailId })
    .then((user) => {
      console.log("finding user", user);
      if (!user) {
        // user not found
        console.log("user not found");
        res.json({
          msg: responseMsg,
          error: `No such user with emailId - ${emailId}`,
        });
        return;
      } else {
        // user found
        // match password
        console.log("user found\n", user);
        const isPasswordMatched = user.auth.password === password;

        // password not matched
        if (!isPasswordMatched) {
          console.log("pass not matched");
          res
            .status(200)
            .json({ msg: responseMsg, error: `Incorrect Password` });
          return;
        }

        // if admin then also match secret code
        console.log("pass  matched, gonna check admin");
        // const isAdminMatched = isAdmin &&
        //   user.id.startsWith("xyz") &&
        //   user.auth.isAdmin === true;
        const isAdminMatched = user.auth.isAdmin === true;
        /*
        // if admin matched, then check if userId stats with xyz
        if (isAdminMatched) {
          const isSecretCodeMatched = user.auth.secretCode === secretCode;

          console.log("admin found");
          // secret code not matched
          if (!isSecretCodeMatched) {
            console.log("secret code not matched");
            res.json({ msg: responseMsg, error: `Incorrect Secret Code` });
            return;
          }
        }
        // secret code also matched for admin
        console.log("secret code matched too");
        */
        console.log("successful");
        // send success response for normal user or admin
        res.status(200).json({
          msg: "User Successfully Logged In",
          error: null,
          userId: user.id,
          isAdmin: isAdminMatched,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Got Server Error While Login", error: err });
    });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "", error: "API Endpoint Not Permitted...!!" });
};
