const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titleValidation = {
  type: String,
  lowercase: true,
  trim: true,
  unique: true,
  required: [true, "Plan title is required (was - {VALUE})"],
  message: "title should be in lowercase, unique and its required, got {VALUE}",
};

const priceValidation = {
  type: Number,
  required: [true, "Plan price is required (was - {VALUE})"],
  message: "price is required, (was - {VALUE})",
};

const statusValidation = {
  type: String,
  enum: {
    values: ["active", "inactive"],
    message:
      "Plan status is required, should be ('inactive' or 'active'), (was - {VALUE})",
  },
  required: [
    true,
    "Plan status is required, should be ('inactive' or 'active'), (was - {VALUE})",
  ],
  default: "inactive",
};

const descriptionValidation = {
  type: String,
  required: [true, "Plan description is required (was - {VALUE})"],
  message: "description is required, (was - {VALUE})",
};

const dateValidation = {
  type: Schema.Types.Number,
  required: [true, "Plan validity and createdAt is required (was - {VALUE})"],
};

const PlanSchema = new Schema({
  id: { type: String, unique: true, required: true },
  title: titleValidation,
  price: priceValidation,
  status: statusValidation,
  description: descriptionValidation,
  validityPeriod: dateValidation,
  createdAt: dateValidation,
});

const planModel = mongoose.model("Plan", PlanSchema);
module.exports = planModel;
