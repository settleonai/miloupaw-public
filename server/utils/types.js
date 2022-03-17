const { DOG_BREEDS_KEYS } = require("./dog-breeds");

const SERVICE_TYPES = [
  "DOG_WALKING",
  "PET_SITTING",
  "PET_TAXI",
  "BOARDING",
  "PET_TRAINING",
];

const SERVICE_STATUS = [
  "REQUESTED",
  "READY_TO_PAY",
  "VOIDED",
  "PENDING",
  "APPROVED",
  "EXPIRED",
  "ONGOING",
  "FINISHED",
  "REJECTED",
  "CANCELLED",
  "DISPUTED",
  "ARCHIVED",
];

const SERVICE_PAYMENT_TYPES = [
  "pending",
  "received",
  "paid_out",
  "refunded",
  "voided",
];
const APT_PAYABLE_TYPES = ["pending"];
const APT_POST_START_TYPES = [
  "voided",
  "expired",
  "ongoing",
  "finished",
  "rejected",
  "cancelled",
  "disputed",
  "archived",
];

const READY_TO_PAY_STATUS = "finished";
const PAYABLE_ROLES = ["stylist", "organizer"];

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
  APT_PAYABLE_TYPES,
  APT_POST_START_TYPES,
  PAYABLE_ROLES,
  SERVICE_STATUS,
  SERVICE_TYPES,
  PET_SPECIES,
  PET_DOG_BREEDS,
};
