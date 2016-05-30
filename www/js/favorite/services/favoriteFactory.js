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