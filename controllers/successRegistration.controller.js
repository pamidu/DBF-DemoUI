app.controller('SuccessRegistration', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', successRegistration]);

function successRegistration($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile) {
    console.log("registration successed.");

    $scope.user = {};

    if ($state.params && $state.params.user) {
      $scope.user = $state.params.user;
      BackToBot();
    }

    function BackToBot () {
      $http({
        method: "POST",
        url: $systemUrls.botConnector.facebook + "/" + ($scope.user.senderId || ""),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
        },
        data: {
          message: "You have successfully completed the registration.",
          token: "EAAQctctsh6UBANUX9Snmt7LB3ZAXXFZBOFsiZAIKUm0oIYoZCxMTjsjGXhcSgO4y492zriId3ceZAZBtliyPCvyNVmS7r3ShFuSZCd2TVQN10ZCQnUuOLhuByY9MruAOCpC8dbTaxZCPig9Y9ZC5dK2i9Tf2StYTWywPWAD8ZAc1tyVsAZDZD",
        }
      }).then(function (response, status) {
        if(response.data === "success"){
          console.log("registration success");
        }else {
            alert(response.data);
        }
      }, function (response, status) {
        alert(response.data);
      });
    }

}