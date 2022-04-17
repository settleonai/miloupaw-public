const businessProfileModel = require("../../models/businessProfileModel");
const { GENERAL_CHARGES } = require("../constants/fees");
const { employeeShare } = require("../constants/employeeShares");

exports.incomeCalc = async (appointment) => {
  let total = appointment.payment.amount.total;
  let tip = appointment.payment.amount.tip;

  try {
    const { generalCuts, share } = await this.baseFeesCalc(
      appointment.employee
    );

    const totalNoTip = +(total - tip).toFixed(2);
    const appFee = +(totalNoTip - generalCuts).toFixed(2);
    const companyCommission = +((totalNoTip - appFee) * (1 - share)).toFixed(2);
    const income = +(total - companyCommission - appFee).toFixed(2);

    return {
      totalNoTip,
      income,
      tip,
      appFee,
      companyCommission,
    };
  } catch (error) {
    console.log("calculateIncome || error", error);
    throw error;
  }
};

exports.baseFeesCalc = async (userId) => {
  try {
    const business = await businessProfileModel
      .findOne({
        user: userId,
      })
      .select("+partner_class");

    // calculate sum of general fees using reducer
    const generalCuts = Object.keys(GENERAL_CHARGES).reduce((acc, curr) => {
      const { amount, type } = GENERAL_CHARGES[curr];
      if (type === "percentage") {
        return +(acc + amount * acc).toFixed(2);
      } else {
        return +(acc + amount).toFixed(2);
      }
    }, 0);

    const share = employeeShare[business.partner_class];

    return {
      generalCuts,
      share,
    };
  } catch (error) {
    console.log("baseFeesCalc || error", error);
    throw error;
  }
};
