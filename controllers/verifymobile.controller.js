app.controller('VerifyMobileController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', '$recipt', verifyMobileController]);

function verifyMobileController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile, $recipt) {
    console.log("verify mobile page loaded");

    $scope.user = {};

    if ($state.params || $state.params.user) {
      $scope.user = $state.params.user;
    }

    $scope.checkVerification = function (mobile, code) {
        $otp.verify(mobile, code).then(function (response, status) {
            if (response.data.IsSuccess) {
                registerProfileOnCloudcharge($scope.user).then(function () {
                    $recipt.create($scope.user, 10000).then(function () {
                        $state.go("registration-success");
                        $scope.user = {};
                    });
                });
            } else {
                alert("There was an error: " + response.data.CustomMessage);
                $scope.processing = false;
            }
        }, function (response, status) {
            console.log(response, status);
            $scope.processing = false;
        });
    }

    function registerProfileOnCloudcharge (profile) {
        return Promise.all([
            $profile.onCloudcharge.registerWithBank(profile), 
            $profile.onCloudcharge.registerWithMerchant(profile), 
            $profile.onCloudcharge.registerWithTelecommunicationProvider(profile),
            $profile.onCloudcharge.registerWithUtilityProvider(profile)
        ]);
    }

    function registerProfileOnFacetone (profile) {

    }

}