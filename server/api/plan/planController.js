const Plan = require("./planModel");
const { hidePlanSensitiveDetails } = require("../../utility/utility");

exports.params = (req, res, next, id) => {
  // console.log("Searching, id", id);

  Plan.findOne({ id })
    .then((plan) => {
      if (!plan) {
        res.status(404).json({
          msg: "plan not found",
          error: `no such plan with id - ${id}`,
        });
        return;
      } else {
        req.plan = plan;
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "got error", error: err });
      return next(err);
    });
};

exports.getList = (req, res, next) => {
  Plan.find({})
    .exec()
    .then((plans) => plans.map((plan) => hidePlanSensitiveDetails(plan)))
    .then((plans) => res.status(202).json({ error: null, plans }))
    .catch((err) => {
      res.json({
        msg: "failed while fetching plans from database",
        error: err,
      });
      return next(err);
    });
};

exports.post = (req, res) => {
  const plan = req.body;
  const newPlan = new Plan(plan);
  newPlan.save((err, saved) => {
    if (err) {
      res.json({ msg: "got error while saving to database", error: err });
      return;
    } else {
      res.status(202).json({
        error: null,
        plan: hidePlanSensitiveDetails(saved),
      });
    }
  });
};

exports.getOne = (req, res) => {
  const plan = hidePlanSensitiveDetails(req.plan);
  res.json({ error: null, plan });
};

exports.patchOne = (req, res, next) => {
  const plan = req.plan;
  const planUpdates = req.body;

  Object.assign(plan, planUpdates);
  plan.save((err, saved) => {
    if (err) {
      res.json({ msg: "got error while saving to database", error: err });
    } else {
      const responseJSON = {
        error: null,
        updates: hidePlanSensitiveDetails(saved),
      };
      res.status(202).json(responseJSON);
    }
  });
};

exports.deleteOne = (req, res) => {
  req.plan.remove((err, removed) => {
    const responseJSON = { error: null, msg: "" };

    if (err) {
      responseJSON.error = error;
      responseJSON.msg = "error while removing document from database";
    } else {
      responseJSON.removed = removed.id;
    }

    res.json(responseJSON);
    return;
  });
};

exports.notPermitted = (req, res) => {
  res.json({ msg: "not allowed", error: "endpoint not permitted...!!" });
};
