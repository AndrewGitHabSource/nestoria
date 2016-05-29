angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'mainController'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.detail', {
                url: '/detail/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/detail-object.html',
                        controller: 'detailController'
                    }
                }
            })

            .state('app.detail-favorite', {
                url: '/detail-favorite/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/detail-object.html',
                        controller: 'favoriteController'
                    }
                }
            })

            .state('app.favorites', {
                url: '/favorites',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/favorites.html',
                        controller: 'favoriteController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/search');
    });