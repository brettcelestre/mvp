
var Word = require('./models/word');
// var mongodb = require('mongodb');  // Attempted for DELETE method

module.exports = function(app) {

  app.get('/api/words', function(req, res) {
    console.log('word GET req');
    
    Word.find(function(err, words) {
        if (err) res.send(err);
        res.json(words);
    });
      
  });
  
  app.post('/api/words', function( req, res ){
    
    console.log('Routes > Post > req.body: ', req.body);
    
    var newWord = new Word();         // create a new instance of the Word model
    newWord.word = req.body.word;     // Assigns word to schema
    newWord.def = req.body.def;       // Assigns definition to schema
    newWord.pos = req.body.pos;       // Assigns part of speech
    newWord.audio = req.body.audio;   // Assigns audio url
    newWord.created_at = new Date();  // Assigns time stamp
    
    newWord.save(function(err) {  // Saves the newWord
      if (err) res.send(err);     // Check for errors
      res.json(newWord);          // Response to POST request
    });
  });
  
  app.delete('/api/words', function( req, res ){  // Delete request
    Word.find(req.body).remove().exec();          // Finds the word by _id, removes it, then exec.
    Word.find(function(err, words) {              // This sends all remaining words back as a response
        if (err) res.send(err);
        res.json(words);
    });
  });
  
  // Front End routes ---
  // route to handle all angular requests
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
    
    