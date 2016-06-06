
var Word = require('./models/word');

module.exports = function(app) {

  app.get('/api/words', function(req, res) {
    console.log('word GET req');

    // TEST ------
    res.json( {'words': "GET"} );  
    
      Word.find(function(err, words) {
        
          if (err) res.send(err);
          
          res.json(words);
      });
      
  });
  
  app.post('/api/words', function( req, res ){
    
    // console.log('3) inside routes app.post /api/words: ');
    console.log('Routes > post > req.body: ', req.body);
      // req.body.word === { word: 'whatever name' }
    
    // var word = new word();      // create a new instance of the Bear model
    // word.name = req.body.word;  // set the bears name (comes from the request)

    // console.log('word: ', Word);
    
    // save the word and check for errors
    word.save(function(err) {
        if (err)
            res.send(err);

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
    
    