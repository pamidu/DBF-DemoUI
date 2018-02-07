var app = angular.module('loginapp', [
    'ui.router',
    'uiKernel'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signup');

    $stateProvider

        .state('signin', {
            url: '/signin',
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        }).state('signup', {
            url: '/signup?name',
            templateUrl: 'partials/signup.html',
            controller: 'SignupController'
        }).state('verify-mobile', {
            url: '/verify-mobile',
            params: {
                user: null
            },
            templateUrl: 'partials/verify-mobile.html',
            controller: 'VerifyMobileController'
        }).state('registration-success', {
            url: '/registration-success',
            templateUrl: 'partials/registration-success.html',
            controller: function ($scope) { }
        }).state('payment', {
            url: '/payment',
            templateUrl: 'partials/payment.html',
            controller: 'PaymentController'
        });

}

);

app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', mainController]);


function mainController($scope, $rootScope, $state, $timeout, $http) {
    console.log("login Application started");
}