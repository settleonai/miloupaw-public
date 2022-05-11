const businessProfileModel = require("../../models/businessProfileModel");
const { GENERAL_CHARGES } = require("../constants/fees");
const { employeeShare } = require("../constants/employeeShares");
const { SERVICES } = require("./services");

exports.incomeCalc = async (appointment) => {
  let total = appointment.payment.amount.total;
  let tip = appointment.payment.amount.tip;

  if (total === 0) {
    return {
      totalNoTip: 0,
      income: 0,
      tip: 0,
      appFee: 0,
      companyCommission: 0,
    };
  }

  try {
    const totalNoTip = +(total - tip).toFixed(2);

    const { generalCuts, share } = await this.baseFeesCalc(
      appointment.employee,
      totalNoTip
    );

    const appFee = +generalCuts.toFixed(2);
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

exports.baseFeesCalc = async (userId, total) => {
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
        return +(acc + amount * total).toFixed(2);
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

exports.calculateAppointmentBaseFee = (type, pets, time) => {
  console.log("pets", pets);
  console.log("time", time);
  const feeTemplate = SERVICES;
  const typeA = ["DOG_WALKING"];
  const typeB = ["POTTY_BREAK", "PET_SITTING"];
  const typeC = ["BOARDING"];
  let baseFee = 0;
  if (typeA.includes(type)) {
    baseFee =
      feeTemplate[`DOG_WALKING_${time.duration}_${pets > 1 ? 2 : 1}`].price;
  }
  if (typeB.includes(type)) {
    baseFee = feeTemplate[type].price;
  }
  if (typeC.includes(type)) {
    const totalDays = time.duration / 1440;
    const billableDays =
      totalDays % 1 > 0.166 ? +totalDays.toFixed(0) + 1 : +totalDays.toFixed(0);

    pets.forEach((pet) => {
      price =
        feeTemplate["BOARDING"].variants[
          `${pet.general_info.weight > 2 ? "large" : "non_large"}`
        ].price;

      price = price * billableDays;
      baseFee += price;
    });
  }

  let tax = 7.89;
  let total_no_tip = +(baseFee * (1 + tax / 100)).toFixed(2);

  return total_no_tip;
};
