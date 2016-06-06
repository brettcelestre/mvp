
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  def: String,
  created_at: String
}) 

module.exports = mongoose.model('Word', WordSchema );