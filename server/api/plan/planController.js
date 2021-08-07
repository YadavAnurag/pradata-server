exports.params = (req, res, next, id) => {
  // res.json({ msg: `searching for id - ${id}` });
  next();
};

exports.getList = (req, res, next) => {
  res.json({ msg: "will send List" });
};
exports.post = (req, res, next) => {
  res.json({ msg: "will insert ", body: req.body });
};

exports.getOne = (req, res, next) => {
  res.json({ msg: "will send one " });
};

exports.patchOne = (req, res, next) => {
  res.json({ msg: "will patch one " });
};

exports.deleteOne = (req, res, next) => {
  res.json({ msg: `will delete ` });
};
