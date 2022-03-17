const DOG_BREEDS = require("../constants/dog_breeds.json");
const CAT_BREEDS = require("../constants/cat_breeds.json");

CAT_BREEDS_KEYS = Object.keys(CAT_BREEDS);
DOG_BREEDS_KEYS = Object.keys(DOG_BREEDS);

module.exports = {
  DOG_BREEDS,
  DOG_BREEDS_KEYS,
  CAT_BREEDS,
  CAT_BREEDS_KEYS,
};
