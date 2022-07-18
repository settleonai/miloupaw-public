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

exports.APPOINTMENT_PROJECTION_EMPLOYEE = {
  employee: 1,
  client: 1,
  type: 1,
  location: 1,
  pets: 1,
  service_items: 1,
  check_in: 1,
  check_out: 1,
  payment: {
    amount: {
      total: 1,
      tip: 1,
      employee_share: 1,
      total_no_tip: 1,
      app_fee: 1,
      company_commission: 1,
      income: 1,
    },
    currency: 1,
    status: 1,
  },
  time: {
    start: 1,
    end: 1,
    duration: 1,
  },
  notes: 1,
  status: 1,
  journal: 1,
  claim: 1,
  is_private: 1,
  reviews: 1,
  open_reviews: 1,
  createdAt: 1,
  updatedAt: 1,
};

exports.APPOINTMENT_PROJECTION_ADMIN = {
  employee: 1,
  client: 1,
  type: 1,
  location: 1,
  pets: 1,
  service_items: 1,
  check_in: 1,
  check_out: 1,
  location_snapshot: 1,
  payment: {
    amount: {
      total: 1,
      tip: 1,
      employee_share: 1,
      total_no_tip: 1,
      app_fee: 1,
      company_commission: 1,
    },
    currency: 1,
    status: 1,
    intent: 1,
    charge: 1,
    transfer: 1,
    reversal: 1,
    payout: 1,
    refund: 1,

    receipt_url: 1,
  },
  time: {
    start: 1,
    end: 1,
    duration: 1,
  },
  notes: 1,
  status: 1,
  journal: 1,
  claim: 1,
  is_private: 1,
  reviews: 1,
  open_reviews: 1,
  createdAt: 1,
  updatedAt: 1,
};

exports.EMPLOYEE_ADMIN_PROJECTION = {
  user: 1,
  first_name: 1,
  last_name: 1,
  phone_number: 1,
  phone_verified: 1,
  gender: 1,
  date_of_birth: 1,
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
  coordinates: 1,
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
  partner_class: 1,
  createdAt: 1,
  updatedAt: 1,
  rating: 1,
};

exports.EMPLOYEE_PUBLIC_PROJECTION = {
  user: 1,
  first_name: 1,
  last_name: 1,
  gender: 1,
  appointments: 1,
  rating: 1,
  phone_number: 1,

  address: {
    city: 1,
    state: 1,
    postal_code: 1,
    country: 1,
  },
  bio: 1,
  good_with_dogs: 1,
  good_with_cats: 1,
  good_with_other_pets: 1,
  commute_method: 1,
  years_of_experience: 1,
  status: 1,
  createdAt: 1,
  updatedAt: 1,
};

exports.EMPLOYEE_CARD_PROJECTION = {
  user: 1,
  first_name: 1,
  last_name: 1,
  gender: 1,
  years_of_experience: 1,
  status: 1,
};
