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
                registerProfileOnCloudcharge($scope.user).then(function (response) {
                    $recipt.create($scope.user, 1000000).then(function () {
                        $profile.onFacetone.registerProfile($scope.user).then(function (response, status) {
                            if (response.data.IsSuccess) {
                                $state.go("registration-success", {user: $scope.user});
                                $scope.user = {};
                            }else {
                                alert(response.data.CustomMessage);
                            }
                        }, function(response, status) {
                            alert(response.data.CustomMessage);
                        });
                    });
                }, function (response) {
                    alert(response);
                });
            } else {
                alert(response.data.CustomMessage);
                $scope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
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