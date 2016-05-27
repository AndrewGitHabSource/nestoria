angular.module('starter.controllers', [])
    .controller('mainController', ['$scope', '$rootScope', 'restService', 'constCollection', function ($scope,
                                                                                                       $rootScope, restService, constCollection) {
        var searchParameters = constCollection.parameters,
            countSearchResult = 3;

        $rootScope.objects = {};
        $rootScope.searchRequest = {search: ""};
        $scope.recentSearches = [];
        $scope.recentSearchesSwitch = true;

        $scope.search = search;
        $scope.goUserLocation = goUserLocation;


        /* Functions */

        init();

        function init() {
            $scope.recentSearches = localStorage.getItem("recentSearches") ? JSON.parse(localStorage.getItem("recentSearches")) : [];

            // if($stateParams.id){
            //     $scope.detailObject = $scope.objects[$stateParams.id];
            //     console.log($scope.detailObject);
            // }
        }

        function success(response) {
            console.log(response);
            var length = 0;

            $scope.recentSearchesSwitch = false;

            if (response.data.response.listings) {
                $rootScope.objects = response.data.response.listings;
                length = response.data.response.listings.length;
            }

            if ($scope.recentSearches.length < countSearchResult) {
                $scope.recentSearches.push({
                    'request': $rootScope.searchRequest.search,
                    'length': length
                });
            }
            else {
                $scope.recentSearches = $scope.recentSearches.slice(-2);
                $scope.recentSearches.push({
                    'request': $rootScope.searchRequest.search,
                    'length': length
                });
            }
            localStorage.setItem('recentSearches', JSON.stringify($scope.recentSearches.reverse()));
        }

        function error(response) {
            // console.error(response);
        }

        /* search objects in nestoria */
        function search(searchForm) {
            delete searchParameters.centre_point;
            searchParameters.place_name = $rootScope.searchRequest.search;

            if (searchForm.$valid) {
                restService.getObjects(searchParameters, success, error);
            }
        }

        /* set location of user location coordinate */
        function goUserLocation() {
            var latitude = null,
                longitude = null;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;

                    delete searchParameters.place_name;
                    searchParameters.centre_point = latitude + ',' + longitude;

                    restService.getObjects(searchParameters, success, error);
                });
            }
        }
    }])

    .controller('detailController', ['$rootScope', '$scope', 'restService', 'constCollection', '$stateParams',
        function ($rootScope, $scope, restService, constCollection, $stateParams) {
            if ($rootScope.objects) {
                $scope.objectDetails = $rootScope.objects[$stateParams.id];
            }
        }]);
