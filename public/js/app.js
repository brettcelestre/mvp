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
            var data = { 'word': word, 'def': null, 'pos': null, 'audio': null };                 // Creates request object
            data.def = res.data.results[0].senses[0].definition[0];  // Assigns a real definition to our request object
            data.pos = res.data.results[0].part_of_speech;
            data.audio = 'https://api.pearson.com/' + res.data.results[0].pronunciations[0].audio[0].url; // Sets up audio link
            return data;
          })
          
          .then(function( data ){
            Word.POST( data )                          // Submits POST request
              .then(function(res){
                $scope.allWords.push(res);             // Immediately pushes new word into allWords array
                return res;
              })
              .catch(function( err ) {
                console.error( err );
              });
          })
          
          .catch(function(err){
            console.error(err);
          })
        
        $scope.data.word = '';  // Clears word form
        $scope.data.def = '';   // Clears def forms
      } else {
        alert('Please enter a word.');
      }
    };
    
    $scope.deleteWord = function( id ){
      console.log('deleteWord ran: ', id);
      var id = { '_id': id };
      
      Word.DELETE( id )
      
        .then( function( res ){
          console.log('DELETE res: ', res);
        })
        .catch(function( err ) {
          console.error(err);
        });
      
      // Update allWords: either invoke the function or do another GET and reassign the array
      
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
  
  var DELETE = function( id ){
    console.log('Factory > DELETE: ', id);
    return $http({
      method: 'DELETE',
      url: '/api/words',
      // data: JSON.stringify(word)
      data: id
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

