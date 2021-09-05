const hideUserSensitiveDetails = (user) => {
  // console.log("[utility.js - hideUserSensitiveDetails]", user);

  // TODO - Also hide _id in usages and paymentDetails array
  const {
    id,
    middleName,
    lastName,
    status,
    createdAt,
    isAdmin,
    address,
    contactNumber,
    emailId,
    firstName,
    usages,
  } = user;
  return {
    id,
    middleName,
    lastName,
    status,
    createdAt,
    isAdmin,
    address,
    contactNumber,
    emailId,
    firstName,
    usages,
  };
};

const doEveryUsageContainsAtLeastOnePaymentDetail = (usages) => {
  let isGood = true;
  // check if every usage contains at least one payment details
  usages.map((usage) => {
    if (isGood && usage.hasOwnProperty("paymentDetails")) {
    } else {
      isGood = false;
    }
  });

  return isGood;
};

const getUserPatchDetails = (user) => {
  const {
    firstName,
    middleName,
    lastName,
    emailId,
    contactNumber,
    address,
    status,
  } = user;

  return {
    firstName,
    middleName,
    lastName,
    emailId,
    contactNumber,
    address,
    status,
  };
};

const getUserUsage = (usage) => {
  const { id, planId, startedAt, paymentDetails } = usage;

  return {
    id,
    planId,
    startedAt,
    paymentDetails,
  };
};

// plan
const hidePlanSensitiveDetails = (plan) => {
  const { id, title, price, status, description, validityPeriod, createdAt } =
    plan;

  return { id, title, price, status, description, validityPeriod, createdAt };
};

module.exports = {
  hideUserSensitiveDetails,
  getUserUsage,
  getUserPatchDetails,
  doEveryUsageContainsAtLeastOnePaymentDetail,

  hidePlanSensitiveDetails,
};
