exports.USER_PROJECTION_PUBLIC = {
  first_name: 1,
  last_name: 1,
  picture: 1,
  role: 1,
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
