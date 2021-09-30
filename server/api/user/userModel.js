const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const firstNameValidation = {
  type: String,
  lowercase: true,
  trim: true,
  unique: false,
  required: true,
  message: "firstName should be lowercase and it is required, got {VALUE}",
};
const nameValidation = {
  type: String,
  lowercase: true,
  trim: true,
  unique: false,
  required: false,
  default: "",
};
const emailIdValidation = {
  type: String,
  lowercase: true,
  unique: true,
  required: true,
};
const contactNumberValidation = {
  type: String,
  unique: false,
  required: true,
};
const addressValidation = {
  type: String,
  required: true,
};
const statusValidation = {
  type: String,
  enum: {
    values: ["active", "inactive"],
  },
  required: true,
  default: "inactive",
};
const isAdminValidation = {
  type: Boolean,
  required: true,
};
const dateValidation = {
  type: Schema.Types.Number,
  required: true,
};
const usageValidation = [
  {
    id: { type: String, unique: true, required: true },
    planId: { type: String, unique: true, required: true },
    startedAt: dateValidation,
    paymentDetails: [
      {
        id: { type: String, unique: true, required: true },
        paidAmount: {
          type: Schema.Types.Number,
          required: true,
        },
        paymentMethod: {
          type: Schema.Types.String,
          enum: {
            values: ["digital", "cash"],
            message: "{VALUE} is not supported",
          },
          required: true,
        },
        paymentReferenceId: {
          type: Schema.Types.String,
          default: "",
        },
        paidAt: dateValidation,
      },
    ],
    createdAt: dateValidation,
  },
];

const UserSchema = new Schema({
  id: { type: String, unique: true, required: true },
  firstName: firstNameValidation,
  middleName: nameValidation,
  lastName: nameValidation,
  emailId: emailIdValidation,
  contactNumber: contactNumberValidation,
  address: addressValidation,
  status: statusValidation,
  isAdmin: isAdminValidation,

  usages: usageValidation,
  createdAt: dateValidation,
});

userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
