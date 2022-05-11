exports.SERVICES = {
  MEET_AND_GREET: {
    name: "Meet and Greet",
    desc: "Meet and greet with a client",
    duration: 30,
    price: 0,
  },
  DOG_WALKING_30_1: {
    name: "Dog Walking",
    desc: "Private Dog walking for 30 minutes. One dog at a time.",
    duration: 30,
    price: 22,
  },
  DOG_WALKING_30_2: {
    name: "Dog Walking",
    desc: "Private Dog walking for 30 minutes. Two dogs only",
    duration: 30,
    price: 26,
  },
  DOG_WALKING_60_1: {
    name: "Dog Walking",
    desc: "Private Dog walking for 60 minutes. One dog at a time.",
    duration: 60,
    price: 26,
  },
  DOG_WALKING_60_2: {
    name: "Dog Walking",
    desc: "Private Dog walking for 60 minutes. Two dogs only",
    duration: 60,
    price: 30,
  },
  POTTY_BREAK: {
    name: "Potty Break",
    desc: "10 minutes Potty break. Covers up to 3 dogs at a time.",
    duration: 10,
    price: 20,
  },
  PET_SITTING: {
    name: "Pet Sitting",
    desc: "30 minutes Pet sitting. Service includes meal serving, water refill, medicine giving, and poddy break.",
    duration: 30,
    price: 22,
  },
  BOARDING: {
    name: "Boarding",
    desc: "24 hours Boarding.",
    duration: 1440,
    price: 85,
    variants: {
      non_large: {
        name: "Boarding-Small-Medium",
        desc: "24 hours Boarding for small size dogs.",
        duration: 1440,
        price: 85,
      },
      large: {
        name: "Boarding-Big",
        desc: "24 hours Boarding for large size dogs.",
        duration: 1440,
        price: 100,
      },
    },
  },
};
