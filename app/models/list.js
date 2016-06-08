
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  title: String,
  wordCollection: Array,
  created_at: String
}) 

module.exports = mongoose.model('List', ListSchema );