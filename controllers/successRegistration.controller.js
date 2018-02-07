app.controller('SuccessRegistration', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', '$recipt', successRegistration]);

function successRegistration($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile, $recipt) {
    console.log("registration successed.");

    $scope.user = {};

    if ($state.params || $state.params.user) {
      $scope.user = $state.params.user;
    }

    $scope.start = function () {
      $http({
        method: "POST",
        url: $systemUrls.botConnector.facebook + "/" + ($scope.user.senderId || ""),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
        },
        data: {
          message: "You have successfully completed the registration.",
          token: "EAACrf9lRwr0BAMbZAB3e76BeOKrJbmyBblpPdsvSlZBMP6AWELC61CZCqHd1PHP7cin08zCMMWdEF7AjeEZBtcn0flfuJXvflreDU3xsFS7ZAD2d08eITpS7uF3m8mwdmKu2dybOn0CADqD003ShiB14wGpl8COceH3nkrPlwhofTYgPyq5OK",
        }
      }).then(function (response, status) {
        if(response.data === "success"){
          window.close();
        }else {
            alert(response.data);
        }
      }, function (response, status) {
        alert(response.data);
      });
    }

}