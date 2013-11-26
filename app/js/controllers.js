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
    }])
    /*controller of Website view*/
    .controller('WebsiteCtrl', ['$scope','$routeParams', '$http','$window',function($scope, $routeParams, $http, $window) {

        // function to handle response when website is Flickr
        function handleFlickrResponse(data, urlPhoto){
            var photoUrls=[];
            data.photos.photo.forEach(function(entry) {
                console.log(entry);
                // http get to get single photo data
                $http.get(urlPhoto+entry.id).success(function(data) {
                    photoUrls.push(data);
                });
            });
            $scope.photoUrls = photoUrls;
        }

        // http get to get local Website JSON object
        $http.get('websites/'+$routeParams.websiteId+'.json').success(function(localWebsiteData) {

            var urlListPhotos = localWebsiteData[0].urlListPhotos
            var urlPhoto = localWebsiteData[0].urlPhoto;

            $http.get(urlListPhotos+$window.searchText).success(function(data) {
                switch($routeParams.websiteId)
                {
                    case 'flickr':
                        handleFlickrResponse(data, urlPhoto );
                        break;
                    default:
                        console.log('website handler has not been added')
                }
            });
        });

    }]);
