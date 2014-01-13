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


        $scope.show=true;
        $scope.searchText = 'polilimnio';
        $scope.showSearch = function() {
            $scope.show=true;
        }
        $scope.update = function() {
            $scope.show=false;
        var pageNum=1;
        var urlListPhotos='';
        var urlPhoto='';
        var photoUrls=[];
        $scope.loading=false;
        // function to loadMore photos infinite scrolling
        $scope.loadMore = function() {
            if($scope.loading==false){
                pageNum++;
                console.log('load more');
                console.log($scope.searchText);

                $scope.loading=true;
                $http.get(urlListPhotos+$scope.searchText, {params: {page:pageNum}}).success(function(data) {

                    switch($routeParams.websiteId)
                    {
                        case 'flickr':
                            console.log('load from flickr');
                            handleFlickrResponse(data, urlPhoto );
                            break;
                        default:
                            console.log('website handler has not been added')
                    }
                }).error(function(data){
                        console.log('no more');
                        $scope.loading=false;
                    });
            }



        };
        // function to handle response when website is Flickr
        function handleFlickrResponse(data, urlPhoto){
            console.log(data);
            data.photos.photo.forEach(function(entry) {
                // http get to get single photo data
                $http.get(urlPhoto+entry.id).success(function(data) {
                    photoUrls.push(data);
                    $scope.loading=false;
                }).error(function(data){

                });
            });
            if(data.photos.photo.length==0){
                console.log('no more');
                $scope.loading=false;
            }
            $scope.photoUrls = photoUrls;
        }
        $scope.loading=true;
        // http get to get local Website JSON object
        $http.get('websites/'+$routeParams.websiteId+'.json').success(function(localWebsiteData) {

            urlListPhotos = localWebsiteData[0].urlListPhotos;
            urlPhoto = localWebsiteData[0].urlPhoto;

            $http.get(urlListPhotos+$scope.searchText, {params: {page:pageNum}}).success(function(data) {
                switch($routeParams.websiteId)
                {
                    case 'flickr':
                        handleFlickrResponse(data, urlPhoto );
                        break;
                    default:
                        console.log('website handler has not been added')
                }
            }).error(function(data){
                    console.log('no more');
                    $scope.loading=false;
                });
        });
        }
    }]);
