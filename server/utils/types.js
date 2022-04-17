const { DOG_BREEDS_KEYS } = require("./pet-breeds");

const SERVICE_TYPES = [
  "DOG_WALKING",
  "PET_SITTING",
  "BOARDING",
  "POTTY_BREAK",
  "PET_TAXI",
  "PET_TRAINING",
  "MEET_AND_GREET",
];

const MEET_AND_GREET_STATUS = [
  "REQUESTED",
  "CONTACTED",
  "EMPLOYEE_REQUESTED",
  "ASSIGNED",
  "COMPLETED",
  "REJECTED",
];

const SERVICE_STATUS = [
  "REQUESTED",
  "READY_TO_PAY",
  "VOIDED",
  "AUTHORIZED_TO_CHARGE",
  "EMPLOYEE_REQUESTED",
  "ASSIGNED",
  "PAID",
  "PENDING",
  "EXPIRED",
  "ONGOING",
  "COMPLETED",
  "REJECTED",
  "CANCELLED",
  "DISPUTED",
  "ARCHIVED",
];

const SERVICE_PAYMENT_TYPES = [
  "pending",
  "received",
  "transferred",
  "paid_out",
  "refunded",
  "voided",
];

const PET_SPECIES = [
  "DOG",
  "CAT",
  "BIRD",
  "HORSE",
  "REPTILE",
  "CHICKEN",
  "OTHER",
];
const PET_DOG_BREEDS = DOG_BREEDS_KEYS;

module.exports = {
  SERVICE_PAYMENT_TYPES,
  MEET_AND_GREET_STATUS,
  SERVICE_STATUS,
  SERVICE_TYPES,
  PET_SPECIES,
  PET_DOG_BREEDS,
};
