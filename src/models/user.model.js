const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: { type: String, required: true },
   lastname: { type: String, required: true },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true, lowercase: true }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;