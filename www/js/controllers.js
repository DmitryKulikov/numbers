angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, Records) {

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  var computerNumber,
      counter,
      settings;

  settings = {
    range: 10,
    atempts: 5
  };

  function init() {
    $scope.stopPlaying = true;
    $scope.newGame = true;
    $scope.counter = settings.atempts;
  }

  $scope.counter = settings.atempts;

  function getNumber() {
    $scope.computerNumber = Math.ceil(Math.random()*settings.range);  
    console.log($scope.computerNumber);
  }
  
  getNumber();

  

  function gameOver() {
    init();
    $scope.message = "Вы проиграли";    
  }

  function win() {
    init();
    $scope.message = "Вы выйграли";
    $scope.modal.show(); 
  }



  function playGame(number) {
      $scope.counter--
      if (number == $scope.computerNumber) {
        win();
      } else {
        if ($scope.computerNumber > number) {
          $scope.message = "Мое число больше";
        } else {
          $scope.message = "Мое число меньше";
        }
      }

      if ($scope.counter == 0) {
          gameOver();
      }
  }

  function checkUserInput(number) {
      if (number > settings.range || !number) {
        $scope.message = "Введите число от 0 до " + settings.range; 
        return false
      } else {
        $scope.message = "";
        playGame(number);
      }
  }  

  $scope.startGame = function(){
    getNumber();
    $scope.message = "";
    $scope.stopPlaying = false;
    $scope.newGame = false;
  }

  $scope.getNumber = function(number){
      checkUserInput(number);    
  };

  $scope.insertToTable = function(name){
    if (name) {
      Records.setRecords(name, $scope.counter);
      $scope.modal.hide();
    }
  }

})

.controller('ChatsCtrl', function($scope, Records, $window) {
  console.log($window.localStorage.getItem('myKey'));
  $scope.records = Records.getRecords();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
