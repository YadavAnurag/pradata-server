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

// getErrors
const getErrors = (error) => {
  let errorArray = [];

  if (error) {
    if (error.errors["id"]) {
      console.log(error.errors["id"].message);
      errorArray.push(error.errors["id"].message);
    }
    if (error.errors["title"]) {
      console.log(error.errors["title"].message);
      errorArray.push(error.errors["title"].message);
    }
    if (error.errors["price"]) {
      console.log(error.errors["price"].message);
      errorArray.push(error.errors["price"].message);
    }
    if (error.errors["status"]) {
      console.log(error.errors["status"].message);
      errorArray.push(error.errors["status"].message);
    }
    if (error.errors["description"]) {
      console.log(error.errors["description"].message);
      errorArray.push(error.errors["description"].message);
    }
    if (error.errors["validityPeriod"]) {
      console.log(error.errors["validityPeriod"].message);
      errorArray.push(error.errors["validityPeriod"].message);
    }
    if (error.errors["createdAt"]) {
      console.log(error.errors["createdAt"].message);
      errorArray.push(error.errors["createdAt"].message);
    }
  } else {
    // console.log('No Errors');
  }

  return errorArray;
};

module.exports = {
  hideUserSensitiveDetails,
  getUserUsage,
  getUserPatchDetails,
  doEveryUsageContainsAtLeastOnePaymentDetail,

  hidePlanSensitiveDetails,

  getErrors,
};
