angular.module('starter.services', [])

    .factory('objectsFactory', ['restService', 'constCollection', '$q', function (restService, constCollection, $q) {
        var rest = new restService(),
            objects = [],
            countSearchResult = 3,
            recentSearches = [];

        return {

            get: function () {
                return objects;
            },

            getItemById: function (id) {
                return objects[id];
            },

            getObjects: function (searchProperty) {
                var deferred = $q.defer();
                rest.get(constCollection, searchProperty, {}, success, error);

                function success(data) {
                    objects = data.data.response.listings;
                    deferred.resolve(objects);
                }

                function error(data) {
                    deferred.reject(data);
                }

                return deferred.promise;
            },

            setRecentSearches: function (response, searchRequest) {
                var length = 0;

                recentSearches = localStorage.getItem("recentSearches") ? JSON.parse(localStorage.getItem("recentSearches")) : [];

                if (response) {
                    length = response.length;
                }

                if (recentSearches.length < countSearchResult) {
                    recentSearches.push({
                        'request': searchRequest,
                        'length': length
                    });
                }
                else {
                    recentSearches.unshift({
                        'request': searchRequest,
                        'length': length
                    });
                    recentSearches.pop();
                }
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            }
        };
    }]);

angular.module('starter.services').factory('favoriteFactory', ['restService', 'objectsFactory', '$q', '$stateParams',
    function (restService, objectsFactory, $q, $stateParams) {
        var favorites = [];

        if (localStorage.getItem('favoriteStorage')) {
            favorites = JSON.parse(localStorage.getItem('favoriteStorage'));
        }

        return {
            get: function(id){
                return favorites[id];
            },

            saveFavorite: function () {
                favorites.push(objectsFactory.getItemById($stateParams.id));

                localStorage.setItem("favoriteStorage", JSON.stringify(favorites));
            },

            getFavorites: function () {
                if (localStorage.getItem('favoriteStorage')) {
                    favorites = JSON.parse(localStorage.getItem('favoriteStorage'));
                }
                return favorites;
            }
        }
    }]);