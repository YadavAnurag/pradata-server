const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titleValidation = {
  type: String,
  lowercase: true,
  trim: true,
  unique: true,
  required: true,
  message: "title should be in lowercase, unique and its required, got {VALUE}",
};

const priceValidation = {
  type: Number,
  required: true,
  message: "price is required, (was - {VALUE})",
};

const statusValidation = {
  type: String,
  enum: {
    values: ["active", "inactive"],
  },
  required: true,
  default: "inactive",
};

const descriptionValidation = {
  type: String,
  required: true,
  message: "description is required, (was - {VALUE})",
};

const dateValidation = {
  type: Schema.Types.Number,
  required: true,
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
