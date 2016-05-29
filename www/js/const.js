angular.module('starter.controllers').constant("constCollection", {
    "parameters": {
        "country": "uk",
        "pretty": 1,
        "action": "search_listings",
        "encoding": "json",
        "listing_type": "buy",
        "page": "1",
        "place_name": "",
        "centre_point": "",
        "callback" : "JSON_CALLBACK"
    },
    "url": "http://api.nestoria.co.uk/api"
});