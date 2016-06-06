
var Word = require('./models/word');

module.exports = function(app) {

  app.get('/api/words', function(req, res) {
    console.log('word GET req');
    
    Word.find(function(err, words) {
        if (err) res.send(err);
        res.json(words);
    });
      
  });
  
  app.post('/api/words', function( req, res ){
    
    var newWord = new Word();      // create a new instance of the Word model
    newWord.word = req.body.word;  // Assigns word to schema
    newWord.def = req.body.def;    // Assigns definition to schema
    newWord.created_at = new Date();
    
    newWord.save(function(err) {  // Saves the newWord
      if (err) res.send(err);     // Check for errors
      res.json(newWord);          // Response to POST request
    });
  });

  // route to handle delete goes here (app.delete)

  // Front End routes ---
  // route to handle all angular requests
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
    
    