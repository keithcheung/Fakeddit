const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, index: {unique:true}},
  password: String
});

module.exports = mongoose.model('User', userSchema);
// model = collection in database
