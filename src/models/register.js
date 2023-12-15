const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String, // Assuming you want to store phone numbers as strings
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

const Registration = mongoose.model("Register", registrationSchema);

module.exports = Registration;
