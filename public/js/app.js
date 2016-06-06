

var app = angular.module('MyVocab', []);

// Main Word Controller ---------------------------------
app.controller('WordController', function($scope, Word) {
    $scope.data = {
      word: '',
      def: ''
    };
    
    $scope.allWords = [];
    
    $scope.initLoadWords = function(){
      Word.GET()
        .then( function( res ){
          $scope.allWords = res;
        })
        .catch(function( err ) {
          console.error(err);
        });
    }();
    
    $scope.addWord = function( word, def ){
      if ( word && def ){                          // Checks to make sure the forms are filled out
        var data = { 'word': word, 'def': def };   // Creates req object
        Word.POST( data )                          // Submits POST request
          .then(function(res){
            $scope.allWords.push(res);             // Immediately pushes new word into allWords array
            return res;
          })
          .catch(function( err ) {
            console.error( err );
          });
        $scope.data.word = '';  // Clears word form
        $scope.data.def = '';   // Clears def forms
      } else {
        alert('Please enter a word a definition.');
      }
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
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    GET: GET,
    POST: POST
  };
  
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

