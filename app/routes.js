
var Word = require('./models/word');
var mongodb = require('mongodb');

module.exports = function(app) {

  app.get('/api/words', function(req, res) {
    console.log('word GET req');
    
    Word.find(function(err, words) {
        if (err) res.send(err);
        res.json(words);
    });
      
  });
  
  app.post('/api/words', function( req, res ){
    
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
  
  // app.delete(
      
  // )

  // route to handle delete goes here (app.delete)
  // Word.delete('/api/words/:id', function( req, res ){
    // delete the word  
    // console.log('Routes.js > req: ', req);
    
    // req.body.find( 'word', function( err, word ){
    //   if ( err ) {
    //     res.send(err);
    //   } else if ( word ){
    //     req.word = word;
    //     console.log('found it: ');
    //     // next();
    //   }
    //   res.json(newWord);
    // });
  // })
  
  // Front End routes ---
  // route to handle all angular requests
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
    
    