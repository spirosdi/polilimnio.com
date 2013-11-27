'use strict';
// global variable attached to $window
var searchText = 'polilimnio';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'ngRoute',
        'ngAnimate',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.when('/listWebsites', {templateUrl: 'partials/listWebsites.html', controller: 'ListWebsitesCtrl'});
        $routeProvider.when('/website/:websiteId', {templateUrl: 'partials/website.html', controller: 'WebsiteCtrl'});
        $routeProvider.otherwise({redirectTo: '/listWebsites'});
    }]);

