

var app = angular.module('MyVocab', []);

// Main Word Controller
app.controller('WordController', function($scope, Word) {
    $scope.data = {
      word: '',
      def: ''
    };
    
    $scope.addWord = function( data ){
      console.log('1) addName ran: ', data);
      
      Word.POST( data )
        .then(function(response){
          console.log('5) Word.POST data = : ', data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    };

})

// Creates a Word factory
app.factory('Word', function ($http) {

  var GET = function(){
    return $http({
      method: 'GET',
      url: '/api/words'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var POST = function( data ){
    console.log('2) Word factory POST method data: ', data);
    
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
