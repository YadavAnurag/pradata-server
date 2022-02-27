const Connect = require("./connectModel");

exports.get = (req, res) => {
  Connect.findOne({})
    .then((connect) => {
      if (!connect) {
        res.status(404).json({
          msg: "connect not found",
          error: `no connect data`,
        });
        return;
      } else {
        req.connect = connect;
        res.json({ error: null, connect: req.connect });
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "got error", error: err });
      return next(err);
    });
};

exports.patch = (req, res, next) => {
  const connectUpdates = req.body;

  Connect.findOne({})
    .then((connect) => {
      if (!connect) {
        res.status(404).json({
          msg: "connect not found",
          error: `no connect data`,
        });
        return;
      } else {
        console.log("connect", connect);
        console.log("connectUpdates", connectUpdates);
        // update
        Object.assign(connect, connectUpdates);
        connect.save((err, saved) => {
          if (err) {
            res.json({ msg: "got error while saving to database", error: err });
          } else {
            const responseJSON = {
              error: null,
              updates: saved,
            };
            res.status(202).json(responseJSON);
          }
        });
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "got error", error: err });
      return next(err);
    });

  // console.log("connect", connect);
  // console.log("connectUpdates", connectUpdates);
  // Object.assign(connect, connectUpdates);
  // connect.save((err, saved) => {
  //   if (err) {
  //     res.json({ msg: "got error while saving to database", error: err });
  //   } else {
  //     const responseJSON = {
  //       error: null,
  //       updates: saved,
  //     };
  //     res.status(202).json(responseJSON);
  //   }
  // });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "not allowed", error: "API Endpoint not permitted...!!" });
};
