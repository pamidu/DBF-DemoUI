/* use strickt */

app.controller('SignupController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', signupController]);

function signupController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile) {
    console.log("signup page loaded");
    
    $scope.user = {};
    $scope.processing = true;
    $scope.lockEmail = false;

    if ($state.params || $state.params.name) {
        var name = $state.params.name.split(" ");
        $scope.user.fname = name[0] || "";
        $scope.user.lname = name[1] || "";
        //getProfile($state.params.name);
    }

    $scope.authenticate = function () {
        $otp.send($scope.user.mobile).then(function (response, status) {
            if (response.data.IsSuccess) {
                $state.go("verify-mobile", {user: $scope.user});
                $scope.user = {};
            } else {
                alert(response.data.Error);
                $scope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $scope.processing = false;
        });
        
    }

    $scope.signupUser = function (user) {
        $scope.processing = true;
        var userDetails = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "nicPassport": user.nicPassport,
            "mobile": user.mobile,
            "email": user.email,
            "password": user.password
        }
        $http({
            method: "POST",
            url: $systemUrls.userService,
            data: userDetails,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response, status) {
            debugger
            if (response.data.IsSuccess) {

                $scope.sendVerificationEmail(user.email, user.mobile);
                $scope.user = {};
            } else {
                alert("There was an error: " + response.data.Error);
                $scope.processing = false;
            }
        }, function (response, status) {
            console.log(response, status);
            $scope.processing = false;
        });
    }


    function getProfile (name) {
        $http({
            method: "GET",
            url: $systemUrls.invoiceService + "/GetProfile/" + (name || ""),
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            if (response.data.IsSuccess) {
                var profile = response.data.Result;
                $scope.user = {
                    fname: profile.first_name,
                    lname: profile.last_name,
                    email: profile.email_addr
                };
                $scope.loading = false;
            } else {
                alert(response.data.CustomMessage);
                $scope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $scope.processing = false;
        });
    }

}