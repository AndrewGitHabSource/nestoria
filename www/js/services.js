angular.module('starter.services', [])

.factory('restService', ['$http', function($http) {
  return {
    getObjects: function(searchProperty, callbackSuccess, callbackError) {
      var url = "";

      function formedUrl() {
        var mainUrl = 'http://api.nestoria.co.uk/api?country=';

        url = mainUrl + searchProperty.country;

        for(var key in searchProperty){
          if(key == 'country') continue;

          url += '&' + key + '=' + searchProperty[key];
        }

        url += "&callback=JSON_CALLBACK";
      }

      formedUrl();

      $http({method: 'jsonp', url: url, cache:false})
          .then(
              callbackSuccess,
              callbackError
          );
    }
  };
}]);

angular.module('starter.services').factory('exchange', ['$http', function($http) {
  var value = '';
  return {
    updateValue: function(parameter) {
      value = parameter;
    },
    getValue: function() {
      return value;
    }
  }
}]);
