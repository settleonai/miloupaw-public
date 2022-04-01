exports.USER_PROJECTION_PUBLIC = {
  first_name: 1,
  last_name: 1,
  username: 1,
  avatar: 1,
  role: 1,
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

exports.APPOINTMENT_PROJECTION_PUBLIC = {
  location_track: 0,
  "payment.status": 0,
  "payment.intent": 0,
  room: 0,
  location_track: 0,
  notes: 0,
  status: 0,
  completed_by: 0,
  open_reviews: 0,
  video_call: 0,
};

exports.APPOINTMENT_PROJECTION_PRIVATE = {
  location_track: 0,
  "payment.intent": 0,
};

exports.POST_PROJECTION = {
  "address.address1": 0,
  "address.address2": 0,
  "address.postal_code": 0,
  "address.formatted_address": 0,
  admin_featured: 0,
  disabled: 0,
};

exports.COMMENT_REPLY_PROJECTION_PUBLIC = {
  replies: 0,
};
