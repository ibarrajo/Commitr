// Declare app level module which depends on filters, and services
'use strict';

angular.module('commitr', [
	'ngRoute',
	'commitr.filters',
	'commitr.services',
	'commitr.directives',
	'commitr.controllers'
])


 .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/about', {
        templateUrl: 'fragments/about.html',
        controller: 'AboutCtrl'
    })
    .when('/contact', {
	    templateUrl: 'fragments/contact.html',
        controller: 'ContactCtrl'
    })
	.otherwise({
        templateUrl: 'fragments/main.html',
        controller: 'MainCtrl'
    });
}]);
