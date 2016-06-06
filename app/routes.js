
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
    
    // console.log('3) inside routes app.post /api/words: ');
    console.log('3) Routes > post > req.body: ', req.body);
      // req.body.word === { word: 'whatever name' }
    
    var newWord = new Word();      // create a new instance of the Word model
    
    newWord.word = req.body.word;
    newWord.def = req.body.def; 

    console.log('4) word: ', newWord);
    
    // save the word and check for errors
    newWord.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'New word created!' });
    });
  });

  // route to handle delete goes here (app.delete)

  // Front End routes ---
  // route to handle all angular requests
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
    
    