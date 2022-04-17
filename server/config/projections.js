exports.USER_PROJECTION_PUBLIC = {
  name: 1,
  pictures: 1,
  role: 1,
};

exports.PET_GENERAL_PROJECTION = {
  characteristics: 0,
  location_rules: 0,
  training: 0,
  emergency_veterinarian: 0,
  vaccinations: 0,
  medical: 0,
};

exports.PET_CARD_PROJECTION = {
  characteristics: 0,
  location_rules: 0,
  training: 0,
  emergency_veterinarian: 0,
  vaccinations: 0,
  medical: 0,
  general_info: {
    adopted_from: 0,
    adoption_date: 0,
    birthday: 0,
    breed: 0,
    color: 0,
    notes: 0,
    weight: 0,
  },
};

exports.LOCATION_CARD_PROJECTION = {
  access_parking_notes: 0,
  additional_notes: 0,
  address: {
    address1: 0,
    address2: 0,
    country: 0,
    formatted_address: 0,
    postal_code: 0,
  },
  alarm_code: 0,
  coordinates: 0,
  has_alarm: 0,
  has_camera: 0,

  updatedAt: 0,
  user: 0,
  uses_keys: 0,
  createdAt: 0,
};

exports.APPOINTMENTS_LIST_PROJECTION_PUBLIC = {
  location: 0,
  service_items: 0,
  check_in: 0,
  check_out: 0,
  location_snapshot: 0,
  location: 0,
  notes: 0,
  journal: 0,
  claim: 0,
  is_private: 0,
  reviews: 0,
  open_reviews: 0,
};

exports.APPOINTMENT_PROJECTION_PRIVATE = {
  location_track: 0,
  "payment.intent": 0,
};

exports.EMPLOYEE_SELF_BUSINESS_PROFILE = {
  user: 1,
  first_name: 1,
  last_name: 1,
  phone_number: 1,
  phone_verified: 1,
  gender: 1,
  birth_date: 1,
  coordinates: {
    coordinates: 1,
  },
  address: {
    address1: 1,
    address2: 1,
    city: 1,
    state: 1,
    postal_code: 1,
    country: 1,
    formatted_address: 1,
  },
  locations: 0,
  bio: 1,
  good_with_dogs: 1,
  good_with_cats: 1,
  good_with_other_pets: 1,
  notes: 1,
  commute_method: 1,
  maximum_commute_distance: 1,
  driving_license: 1,

  authorized_to_work_in_us: 1,
  years_of_experience: 1,

  status: 1,

  appointments: 1,
  stripe: {
    id: 1,
    business_type: 1,
    created: 1,
    external_account: 1,
    login_links: 1,
    charges_enabled: 1,
    capabilities: {
      transfers: 1,
      card_payments: 1,
    },
    currency: 1,
  },
};
