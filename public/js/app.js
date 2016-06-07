// 8fafabcf-9fd4-43c8-906e-9d779ef0eb7f

var app = angular.module('MyVocab', []);

// Main Word Controller ---------------------------------
app.controller('WordController', function($scope, Word, Audio) {
    $scope.data = {
      word: '',
      def: ''
    };
    
    $scope.allWords = [];   // Holds all of our words
    
    $scope.playWord = function( url ) {   // Plays a audio for this word
      Audio.play(url);
    };
    
    $scope.initLoadWords = function(){
      Word.GET()
        .then( function( res ){
          $scope.allWords = res;
        })
        .catch(function( err ) {
          console.error(err);
        });
    }();
    
    $scope.addWord = function( word ){
      if ( word ){            // Checks to make sure a word was submitted
        
        Word.API(word)        // Sends word through our API call
          
          .then(function(res){          
            var data = { 'word': word, 'def': null, 'pos': 'unknown', 'audio': 'http://www.fromtexttospeech.com/output/0703176001465334138/13504091.mp3' };  // Creates request object
            
            console.log('res.data: ', res.data); // Prints out full results
            
            // FINDS EXACT MATCH
            for ( var i = 0; i < res.data.results.length; i++ ) {                        // Iterates through all matching results
              // console.log(word.toLowerCase() + ' = ' + res.data.results[i].headword.toLowerCase() );
              if ( word.toLowerCase() === res.data.results[i].headword.toLowerCase() ){  // Finds an exact match
                // if ( res.data.results[i].senses[0].definition[0] &&           // Checks to make sure there is a definition
                //      res.data.results[i].part_of_speech &&                    // Checks to make sure there is a part of speech
                //      res.data.results[i].pronunciations[0].audio[0].url ) {   // Checks to make sure there is an audio url
                //   data.def = res.data.results[i].senses[0].definition[0];     // Assigns a real definition to our request object
                //   data.pos = res.data.results[i].part_of_speech;              // Assigns part of speech
                //   data.audio = 'https://api.pearson.com/' + res.data.results[i].pronunciations[0].audio[0].url; // Sets up audio link
                //   return data;    // Returns our complete data object to be posted
                // }
                
                if ( typeof res.data.results[i].senses[0].definition[0] !== undefined ) {          // Checks to make sure there is a definition
                  data.def = res.data.results[i].senses[0].definition[0];     // Assigns a real definition to our request object
                }
                if ( res.data.results[i].hasOwnProperty('part_of_speech') ){   // Checks to make sure there is a part of speech
                    data.pos = res.data.results[i].part_of_speech;             // Assigns part of speech
                }
                if ( res.data.results[i].hasOwnProperty('pronunciations') ) {  // Check if has property 'pronunciations' exists
                  // Checks to make sure there is an audio url
                  if ( typeof res.data.results[i].pronunciations[0].audio[0].url !== undefined ) {
                    // Sets up audio link
                    data.audio = 'https://api.pearson.com/' + res.data.results[i].pronunciations[0].audio[0].url;
                  }
                }
                return data;    // Returns our complete data object to be posted
                
                
              }
            }
            
            alert('Sorry that word could not be found. Try another.');
            return 'error';   // Sends error message
                        
            // data.def = res.data.results[0].senses[0].definition[0];     // Assigns a real definition to our request object
            // data.pos = res.data.results[0].part_of_speech;
            // data.audio = 'https://api.pearson.com/' + res.data.results[0].pronunciations[0].audio[0].url; // Sets up audio link
            // return data;
          })
          
          .then(function( data ){
            if ( data !== 'error'){             // Checks to make sure the data is not an error
              Word.POST( data )                 // Submits POST request
                .then(function(res){
                  $scope.allWords.push(res);    // Immediately pushes new word into allWords array
                  return res;
                })
                .catch(function( err ) {
                  console.error( err );
                });
              }
          })
          
          .catch(function(err){
            alert('Sorry that word could not be found. Try another.');
            console.error(err);
          })
        
        $scope.data.word = '';  // Clears word form
        $scope.data.def = '';   // Clears def forms
      } else {
        alert('Please enter a word.');
      }
    };
    
    $scope.deleteWord = function( id ){   // deleteWord sends id to factory > DELETE method
      var deleteSound = 'http://soundbible.com/mp3/Computer%20Error-SoundBible.com-1655839472.mp3';
      Audio.play(deleteSound);
      
      Word.DELETE( id )
        .then( function( res ){           // res.data = all remaining words from DB       
          $scope.allWords = res.data;     // Updates allWords array
        })
        .catch(function( err ) {
          console.error(err);
        });
    };
    
})

// Creates a Word factory --------------------------------
app.factory('Word', function ($http) {

  var GET = function(){
    return $http({
      method: 'GET',
      url: '/api/words'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var POST = function( data ){
    return $http({
      method: 'POST',
      url: '/api/words',
      data: data
    })
    .then(function(res) {
      return res.data;
    });
  };
  
  var API = function(word){
    return $http({
      method: 'GET',
      url: 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + word + '&apikey=3eTcdYG6PlG6GUTSw2H9FusPa7G1AMF5'
    })
    .then(function(res){
      return res; 
    });
  };
  
  var DELETE = function( data ){  
    return $http({
      method: 'DELETE',
      url: '/api/words/',
      data: { '_id': data },
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(function(res){
      return res;
    });
  };

  return {
    GET: GET,
    POST: POST,
    DELETE: DELETE,
    API: API
  };
  
})

app.factory('Audio', function( $document ){
  var audioElement = $document[0].createElement('audio');
  return {
    audioElement: audioElement,
    play: function( url ){
      audioElement.src = url;
      audioElement.play();
    }
  }
});

// Creates my routes -----------------------------------------
// app.config('appRoutes', function($routeProvider, $locationProvider) {

//   $routeProvider
    
//     .when('/words', {
//       templateUrl: 'views/words.html',
//       controller: 'WordController'
//     });

//   $locationProvider.html5Mode(true);

// });

