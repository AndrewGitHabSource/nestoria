angular.module('starter.controllers')
    .controller('detailController', ['$rootScope', '$scope', 'objectsFactory',
        'constCollection', '$stateParams', 'favoriteFactory',
        function ($rootScope, $scope, objectsFactory, constCollection, $stateParams, favoriteFactory) {
            $scope.objectDetails = objectsFactory.getItemById([$stateParams.id]);

            $scope.addFavorite = addFavorite;

            /* Add object to favorites */
            function addFavorite() {
                favoriteFactory.saveFavorite();
            }
        }]);
