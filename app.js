// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

});

// Services
weatherApp.service('cityService', function () {
    this.city = "London,us";
});

// Controllers
weatherApp.controller('homeController', [
    '$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', [
    '$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {

        $scope.city = cityService.city;

        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast");

        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 2, APPID: ""});

        console.log($scope.weatherResult);
}]);