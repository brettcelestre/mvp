
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  def: String
}) 

module.exports = mongoose.model('Word', WordSchema );