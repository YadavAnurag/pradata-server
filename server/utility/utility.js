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

module.exports = {
  hideUserSensitiveDetails,
  doEveryUsageContainsAtLeastOnePaymentDetail,
};
