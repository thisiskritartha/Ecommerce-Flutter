const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User must contains UserId'],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'User must contain Name.'],
  },
  email: {
    type: String,
    required: [true, 'User must contain Email.'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'User must contain Phone number.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must contain the Password'],
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
