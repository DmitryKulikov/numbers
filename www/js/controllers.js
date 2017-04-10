angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  
  var computerNumber,
      counter,
      settings;

  settings = {
    range: 10,
    atempts: 5
  };

  $scope.counter = settings.atempts;

  function getNumber() {
    $scope.computerNumber = Math.ceil(Math.random()*settings.range);  
    console.log($scope.computerNumber);
  }
  
  getNumber();

  

  function gameOver() {
    $scope.stopPlaying = true;
    $scope.newGame = true;
    $scope.counter = settings.atempts;    
  }

  function win() {
    $scope.stopPlaying = true;
    $scope.newGame = true;
    $scope.counter = settings.atempts; 
  }



  function playGame(number) {
      $scope.counter--
      if (number == $scope.computerNumber) {
        $scope.message = "Вы выйграли";
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
    $scope.stopPlaying = false;
    $scope.newGame = false;
  }

  $scope.getNumber = function(number){
      checkUserInput(number);    
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
