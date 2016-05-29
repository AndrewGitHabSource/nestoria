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

            set: function (replace) {
                objects = replace;
            },

            getItemById: function (id) {
                return objects[id];
            },

            getObjects: function (searchProperty) {
                var deferred = $q.defer();
                rest.get(constCollection, searchProperty, {}, success, error);

                function success(data) {
                    objects = data.data.response.listings;
                    deferred.resolve(data.data.response.listings);
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
    function (restService, objectsFactory, $q, $stateParams){
        var favorite = [];

        if (localStorage.getItem('favoriteStorage')) {
            favorite = JSON.parse(localStorage.getItem('favoriteStorage'));
        }

        return {
            saveFavorite: function(){
                favorite.push(objectsFactory.getItemById($stateParams.id));

                localStorage.setItem("favoriteStorage", JSON.stringify(favorite));
            }
        }
}]);