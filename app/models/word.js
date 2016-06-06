
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  name: String,
  def: String
}) 

module.exports = mongoose.model('Word', WordSchema );