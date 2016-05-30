angular.module('starter').directive('loader', ['$rootScope', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/loader.html',
        scope: {
            show: "="
        },
        link: function ($scope) {

            angular.element(document).ready(function () {

            });
        }
    }
}]);