angular.module('starter.controllers', [])
    .controller('mainController', ['$scope', '$rootScope', 'restService', 'constCollection', 'exchange', function ($scope,
               $rootScope, restService, constCollection, exchange) {
        var searchParameters = constCollection.parameters,
            countSearchResult = 3;

        $rootScope.objects = {};
        $scope.searchRequest = {search: ""};
        $scope.recentSearches = [];
        $scope.recentSearchesSwitch = true;

        $scope.search = search;
        $scope.goUserLocation = goUserLocation;


        /* Functions */

        init();

        function init() {
            $scope.recentSearches = localStorage.getItem("recentSearches") ? JSON.parse(localStorage.getItem("recentSearches")) : [];
        }

        function success(response) {
            var length = 0;

            $scope.recentSearchesSwitch = false;

            if (response.data.response.listings) {
                $rootScope.objects = response.data.response.listings;
                length = response.data.response.listings.length;

                exchange.updateValue($rootScope.objects);
            }

            if ($scope.recentSearches.length < countSearchResult) {
                $scope.recentSearches.push({
                    'request': $scope.searchRequest.search,
                    'length': length
                });
            }
            else {
                $scope.recentSearches = $scope.recentSearches.slice(-2);
                $scope.recentSearches.push({
                    'request': $scope.searchRequest.search,
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
            searchParameters.place_name = $scope.searchRequest.search;

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
    .controller('detailController', ['$rootScope', '$scope', 'restService',
    'constCollection', '$stateParams', 'exchange',
        function ($rootScope, $scope, restService, constCollection, $stateParams, exchange) {
            var temp = exchange.getValue();

            $scope.objectDetails = temp[$stateParams.id];

            $scope.addFavorite = addFavorite();


            /* Add object to favorites */
            function addFavorite() {
                var favorite = [];

                if(localStorage.getItem('favoriteStorage')){
                    favorite = JSON.parse(localStorage.getItem('favoriteStorage'));
                }

                console.log(favorite);

                localStorage.setItem("favoriteStorage", JSON.stringify(temp[$stateParams.id]));
            }
        }])

    .controller('favoriteController', ['$scope', '$rootScope', '$stateParams', 'exchange', function ($scope, $rootScope, $stateParams, exchange) {
        $scope.favorites = [];

        if(localStorage.getItem('favoriteStorage')){
            $scope.favorites = JSON.parse(localStorage.getItem('favoriteStorage'));
        }

        // console.log($scope.favorites);

    }]);

