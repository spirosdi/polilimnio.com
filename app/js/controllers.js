'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', [function() {

    }])
    .controller('MyCtrl2', [function() {

    }])
    .controller('ListWebsitesCtrl', ['$scope', '$http',function($scope, $http) {
        $http.get('websites/websites.json').success(function(data) {
            $scope.websites = data;
        });
    }]);