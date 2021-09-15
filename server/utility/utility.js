const moment = require("moment");

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

// getDueDataForSingleUser
const getDueDataForSingleUser = async (usages, plans) => {
  const dueDataForSingleUser = usages
    .slice(usages.length > 12 ? -12 : 0)
    .map((usage, index) => {
      // dueDataForSingleUser template
      /*  
        dueDataForSingleUser = {
          isPlanActive: false,
          isDueDatePassed: false,
          isDueDateWithInAMonthForLastUsage
          totalDue: 0
        }
      */

      // default
      const paymentDetails = usage.paymentDetails ? usage.paymentDetails : [];
      const planId = usage.planId ? usage.planId : "noPlanId";
      const planStartedAt = usage.startedAt ? usage.startedAt : 0;

      // check if any plan
      if (!plans.length) {
        console.log("Error: There is no plans in DB");
        reject({
          error: "Error: There is no plans in DB",
        });
      }

      // find plan for the usage.planId
      const plan =
        planId === "noPlanId" ? {} : plans.find((plan) => plan.id === planId);
      const planPrice = plan.price;
      const planValidityPeriod = plan.validityPeriod;
      const planDueDate = planStartedAt + planValidityPeriod;
      const todaysDate = moment().valueOf();

      // isDueDateWithInAMonth
      let isDueDateWithInAMonth;
      if (index === usages.length - 1 && planId !== "noPlanId") {
        const withInAMonth = moment().add(30, "days").valueOf();
        console.log(
          "isDueDateWithInAMonth",
          moment(planDueDate).format(),
          moment(withInAMonth).format()
        );
        isDueDateWithInAMonth =
          planDueDate >= todaysDate && planDueDate <= withInAMonth;
      }

      // if no payment received
      if (!paymentDetails.length) {
        console.log("no payment received");
        return {
          isPlanActive: planId === "noPlanId" ? false : true,
          isDueDatePassed: todaysDate > planDueDate,
          isDueDateWithInAMonth,
          totalDue: planPrice,
        };
      }

      // yes payment received, calculate total payment received
      const totalPaymentReceived = usage.paymentDetails.reduce(
        (totalPaidAmount, paymentDetail) =>
          totalPaidAmount + paymentDetail.paidAmount,
        0
      );

      if (index === user.usages.length - 1) {
        dueDatePassed;
      } else {
        return false;
      }

      console.log(
        "getDueDataForSingleUser - gonna return dueDataArrayForSingleUserForLastOneYear ",
        {
          isPlanActive: planId === "noPlanId" ? false : true,
          isDueDatePassed: todaysDate > planDueDate,
          isDueDateWithInAMonth,
          totalDue: planPrice - totalPaymentReceived,
        }
      );

      return {
        isPlanActive: planId === "noPlanId" ? false : true,
        isDueDatePassed: todaysDate > planDueDate,
        isDueDateWithInAMonth,
        totalDue: planPrice - totalPaymentReceived,
      };
    });

  // console.log("gonna return", dueDataForSingleUser);
  return dueDataForSingleUser;
};

// getDueData
const getDueData = async (user, plans) => {
  console.log("getDueData - init");

  console.log("getDueData - start");
  // default
  const dueData = {
    everUsedAnyPlan: false,
    everDueDatePassed: false,
    isDueDateWithInAMonth: false,
    totalDueForLastOneYear: 0,
  };

  console.log("getDueData - check if no users");
  const usages = user.usages ? user.usages : [];
  if (!usages.length) {
    return dueData;
  }

  console.log("getDueData - yes there are usages");
  // else, yes there are usages
  // const dueDataArrayForSingleUserForLastOneYearPromise = async () => {
  //   const dueDataForSingleUser = ;
  //   console.log("2 getDueData - dueDataForSingleUser", dueDataForSingleUser);
  //   return dueDataForSingleUser;
  // };

  // const dueDataArrayForSingleUserForLastOneYear = await getDueDataForSingleUser(
  //   usages,
  //   plans
  // );

  return getDueDataForSingleUser(usages, plans)
    .then((dueDataArrayForSingleUserForLastOneYear) => {
      const everUsedAnyPlan = dueDataArrayForSingleUserForLastOneYear.some(
        (dueData) => {
          return dueData.isPlanActive === true;
        }
      );

      console.log("5. everUsedAnyPlan", everUsedAnyPlan);
      return {
        dueDataArrayForSingleUserForLastOneYear,
        everUsedAnyPlan,
      };
    })
    .then((updatedObject) => {
      const everDueDatePassed =
        updatedObject.dueDataArrayForSingleUserForLastOneYear.some(
          (dueData) => {
            return dueData.isDueDatePassed === true;
          }
        );

      return {
        ...updatedObject,
        everDueDatePassed,
      };
    })
    .then((updatedObject) => {
      const totalDueForLastOneYear =
        updatedObject.dueDataArrayForSingleUserForLastOneYear.reduce(
          (totalDueForLastOneYear, dueData) =>
            totalDueForLastOneYear + dueData.totalDue,
          0
        );

      return {
        ...updatedObject,
        totalDueForLastOneYear,
      };
    })
    .then((updatedObject) => {
      const isDueDateWithInAMonth =
        updatedObject.dueDataArrayForSingleUserForLastOneYear.slice(-1)[0]
          .isDueDateWithInAMonth;

      return {
        everUsedAnyPlan: updatedObject.everUsedAnyPlan,
        everDueDatePassed: updatedObject.everDueDatePassed,
        isDueDateWithInAMonth,
        totalDueForLastOneYear: updatedObject.totalDueForLastOneYear,
      };
    })
    .catch((err) => {
      console.log("getDueData - catch", err);
    });

  console.log(
    "getDueData - got dueDataArrayForSingleUserForLastOneYear",
    dueDataArrayForSingleUserForLastOneYear
  );
  // got dueDataArrayForSingleUserForLastOneYear
  // calculate totalPaymentReceived for the user, and total Due

  console.log("totalDueForLastOneYear", totalDueForLastOneYear);

  dueData.everUsedAnyPlan = everUsedAnyPlan;
  dueData.everDueDatePassed = everDueDatePassed;
  // console.log(
  //   "3. dueDataArrayForSingleUserForLastOneYear",
  //   dueDataArrayForSingleUserForLastOneYear.slice(-1)[0]
  // );

  console.log("getDueData - gonna return ", dueData);
  return dueData;
};

// getNumberOfActiveAndInactiveUsers
const getUsersCount = async (users, plans) => {
  const usersCount = {
    activeUsers: 0,
    inactiveUsers: 0,
    totalUsers: users.length,

    dueDatePassedUsers: 0,
    dueDateWithInAMonthUsers: 0,
    totalDuesSinceLastOneYear: 0,
  };

  // if no users
  if (users.length === 0) {
    console.log("getUsersCount - no users");
    return usersCount;
  }

  // iterate over users
  const usersCountPromise = async (users) => {
    let numberOfActiveUsers = 0;

    return Promise.all(
      users.map(async (user) => {
        // count active
        if (user.status === "active") {
          numberOfActiveUsers++;
        }
        // count dueDatePassed
        return getDueData(user, plans)
          .then((dueData) => {
            console.log("9. dueData", dueData);
            return dueData;
          })
          .catch((err) => {
            console.log("getUsersCount - catch", err);
          });
      })
    ).then((dueDataArray) => {
      console.log("dueDataArray", dueDataArray);
      // +
      // const {
      //   everUsedAnyPlan,
      //   everDueDatePassed,
      //   isDueDateWithInAMonth,
      //   totalDueForLastOneYear,
      // } = dueData;

      let dueDatePassedForAllUsersCount = 0,
        dueDateWithInAMonthForAllUsersCount = 0,
        totalDuesSinceLastOneYearForAllUsersCount = 0;

      dueDataArray.map((dueData) => {
        if (dueData.everUsedAnyPlan) {
          if (dueData.everDueDatePassed) {
            dueDatePassedForAllUsersCount++;
          }
          if (dueData.isDueDateWithInAMonth) {
            dueDateWithInAMonthForAllUsersCount++;
          }

          // calculate totalDuesSinceLastOneYear for all users
          totalDuesSinceLastOneYearForAllUsersCount +=
            dueData.totalDueForLastOneYear;
        }
      });

      return {
        numberOfActiveUsers,
        dueDatePassedForAllUsersCount,
        dueDateWithInAMonthForAllUsersCount,
        totalDuesSinceLastOneYearForAllUsersCount,
      };
      // -
    });
  };

  // const usersCountPromiseReturn = await usersCountPromise(users);
  // console.log("usersCountPromise", usersCountPromiseReturn);
  // // return usersCountPromiseReturn;

  return usersCountPromise(users).then((usersCountPromiseReturn) => {
    console.log("usersCountPromiseReturn", usersCountPromiseReturn);
    return usersCountPromiseReturn;
  });
};

// getAdminDashboardData
const getAdminDashboardData = async (UserModel, PlanModel) => {
  let users = [];
  let plans = [];

  // fetch data
  try {
    users = await UserModel.find({}).exec();
    plans = await PlanModel.find({}).exec();
  } catch (err) {
    return err;
  }

  // // return
  // const dashboardData = await getUsersCount(users, plans);
  // console.log("final dashboardData", dashboardData);
  // return dashboardData;

  return getUsersCount(users, plans)
    .then((usersCount) => {
      console.log("getAdminDashboardData - usersCount", usersCount);
      const numberOfInactiveUsers =
        users.length - usersCount.numberOfActiveUsers;
      const totalUsers = users.length;

      return {
        ...usersCount,
        numberOfInactiveUsers,
        totalUsers,
      };
    })
    .then((dashboardData) => {
      return dashboardData;
    })
    .catch((err) => {
      console.log("getAdminDashboardData - catch", err);
    });
};

// getUserDashboardData
const getUserDashboardData = async (UserModel, PlanModel) => {
  let dashboardData = {};
  let users = [];
  let plans = [];

  // total Users
  UserModel.find({})
    .exec()
    .then((users) => users.map((user) => hideUserSensitiveDetails(user)))
    .then((allUsers) => {
      users = users.concat(allUsers);
    })
    .catch((err) => {
      return {
        error: err,
      };
    });

  console.log(users, plans);
};

module.exports = {
  hideUserSensitiveDetails,
  getUserUsage,
  getUserPatchDetails,
  doEveryUsageContainsAtLeastOnePaymentDetail,

  hidePlanSensitiveDetails,

  getErrors,

  getAdminDashboardData,
  getUserDashboardData,
};
