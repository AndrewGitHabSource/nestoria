angular.module('starter.controllers', [])

    .controller('mainController', ['$scope', '$rootScope', 'objectsFactory', 'constCollection', '$state', function ($scope,
               $rootScope, objectsFactory, constCollection, $state) {
        var searchParameters = constCollection.parameters,
            promiseObject;

        $rootScope.objects = {};
        $scope.searchRequest = {search: ""};
        $scope.recentSearches = [];
        $scope.recentSearchesSwitch = true;

        $scope.search = search;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;
        $scope.goUserLocation = goUserLocation;
        $scope.openSearch = openSearch;



        init();




        /* Functions */

        function init() {
            $scope.recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
            $scope.showLoader = false;
        }

        function getObjectFromServer(response) {
            $rootScope.objects = response;
            objectsFactory.setRecentSearches(response, $scope.searchRequest.search);
            $scope.recentSearchesSwitch = false;
            $scope.showLoader = false;
        }

        /* search objects in nestoria */
        function search(searchForm, triger) {
            triger = triger || false;
            searchParameters.page = 1;
            delete searchParameters.centre_point;
            searchParameters.place_name = $scope.searchRequest.search;

            if (searchForm.$valid || triger) {
                $scope.showLoader = true;
                promiseObject = objectsFactory.getObjects(searchParameters);
                promiseObject.then(getObjectFromServer, function (err) {

                }, function (progress) {
                    $scope.showLoader = true;
                });
            }
        }

        function openSearch(elem){
            $scope.searchRequest.search = elem.request;
            $scope.search(elem.request, true);
        }

        function nextPage(){
             searchParameters.page++;

             $scope.showLoader = true;
             promiseObject = objectsFactory.getObjects(searchParameters);
             promiseObject.then(getObjectFromServer);
        }

        function prevPage(){
            if(searchParameters.page > 1){
                searchParameters.page--;

                $scope.showLoader = true;
                promiseObject = objectsFactory.getObjects(searchParameters);
                promiseObject.then(getObjectFromServer);
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

                    promiseObject = objectsFactory.getObjects(searchParameters);
                    promiseObject.then(getObjectFromServer);
                });
            }
        }
    }])

    .controller('detailController', ['$rootScope', '$scope', 'objectsFactory',
        'constCollection', '$stateParams', 'favoriteFactory',
        function ($rootScope, $scope, objectsFactory, constCollection, $stateParams, favoriteFactory) {
            $scope.objectDetails = objectsFactory.getItemById([$stateParams.id]);

            $scope.addFavorite = addFavorite;

            /* Add object to favorites */
            function addFavorite() {
                favoriteFactory.saveFavorite();
            }
        }])

    .controller('favoriteController', ['$scope', 'favoriteFactory', 'objectsFactory', '$stateParams', function ($scope,
               favoriteFactory, objectsFactory, $stateParams) {
        $scope.favorites = favoriteFactory.getFavorites($stateParams.id);

        $scope.objectDetails = favoriteFactory.get([$stateParams.id]);
    }]);