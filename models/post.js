const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: String,
  heading: String,
  text: String,
  upvotes: Number
});

module.exports = mongoose.model('Post', postSchema);
// model = collection in database
