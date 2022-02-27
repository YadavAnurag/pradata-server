const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titleValidation = {
  type: String,
  lowercase: true,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Title Should be in lowercase and its required, got {VALUE}",
  default: "pradata",
};
const subTitleValidation = {
  type: String,
  lowercase: true,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Subtitle Should be in lowercase and its required, got {VALUE}",
  default: "connect with us",
};
const descriptionValidation = {
  type: String,
  lowercase: true,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Description Should be in lowercase and its required, got {VALUE}",
  default: "connect with us, for fast cable tv. a good one in tanda",
};
const nameValidation = {
  type: String,
  lowercase: true,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Name Should be in lowercase and its required, got {VALUE}",
  default: "manoj kumar gupta",
};

const locationURLValidation = {
  type: String,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Its required, got {VALUE}",
};
const contactNumberValidation = {
  type: String,
  unique: false,
  required: true,
  default: "9876543210",
};
const emailIdValidation = {
  type: String,
  lowercase: true,
  required: true,
  default: "manoj@gov.in",
};
const addressValidation = {
  type: String,
  trim: true,
  required: [true, "Required (was - {VALUE})"],
  message: "Address Should be in lowercase and its required, got {VALUE}",
  default: "Sakrawal Tanda Ambedkar Nagar",
};

const ConnectSchema = new Schema({
  title: titleValidation,
  subTitle: subTitleValidation,
  description: descriptionValidation,
  locationURL: locationURLValidation,
  name: nameValidation,
  contactNumber: contactNumberValidation,
  emailId: emailIdValidation,
  address: titleValidation,
});

const connectModel = mongoose.model("Connect", ConnectSchema);
module.exports = connectModel;
