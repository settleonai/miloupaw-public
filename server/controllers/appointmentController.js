const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const generatePassword = require("../utils/randomPassword");
const getAvatar = require("../utils/getAvatar");

// save customer info on payment
// https://stripe.com/docs/payments/save-during-payment

module.exports = {};
