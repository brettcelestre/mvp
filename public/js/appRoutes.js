
angular.module('appRoutes', [])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/words', {
      templateUrl: 'views/words.html',
      controller: 'WordController'
    });

  $locationProvider.html5Mode(true);

}]);