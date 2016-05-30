angular.module('starter.controllers').controller('favoriteController', ['$scope', 'favoriteFactory', 'objectsFactory', 
    '$stateParams', function ($scope, favoriteFactory, objectsFactory, $stateParams) {
    $scope.favorites = favoriteFactory.getFavorites($stateParams.id);

    $scope.objectDetails = favoriteFactory.get([$stateParams.id]);
}]);