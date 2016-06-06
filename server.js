
// modules ---
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// configuration ---
var port = process.env.PORT || 3333;  // set our port

app.use(bodyParser.json());                                       // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));               // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));  // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

// API Routes --- 
var router = express.Router();  // Creates an instance of an express router

// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/api', router);  // all of our routes will be prefixed with /api

mongoose.connect( 'mongodb://localhost/myvocab' );  // connects to mongoDB database 

// Normal Routes ---
require('./app/routes')(app); // configure our routes

// Start App ---
app.listen(port);             

console.log('Currently on port ' + port); // Ensure the server is running
          
exports = module.exports = app;   // exports app

