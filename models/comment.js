const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: String,
  uid: String,
  text: String
});

module.exports = mongoose.model('Comment', commentSchema);
// model = collection in database
