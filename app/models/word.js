
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  def: String,
  pos: String,
  audio: String,
  gif: String,
  created_at: String
}) 

module.exports = mongoose.model('Word', WordSchema );