angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, backandService, logService) {

  var log = logService.log;
  log('DashCtrl init');

  var counter = 0;
  $scope.allItems = [];
  $scope.item = {
    name: 'hello world'
  };
  $scope.message = "hello World";

  // will run on init
  function init() {
    $scope.itemName = '';
    backandService.getTodos().then(function(d) {
      log('list received', d);
      $scope.allItems = d.data.data;
    });
  }

  $scope.addItem = function() {
    var txt = $scope.item.name;
    log(txt)
    backandService.addTodo({
      name: txt + '-' + counter++
    }).then(function(d) {
      log('object added: ', d);
      init();
    });
  }

  init();
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
})

.controller('PluginsCtrl', function($scope, logService, /*$cordovaCamera,*/ $cordovaGeolocation) {

  var log = logService.log;
  log('PluginsCtrl init');

  // defaults for camera
  $scope.picture = null;
  $scope.cameraOptions = {
    quality: 50,
    /*destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,*/
    allowEdit: true,
    //encodingType: Camera.EncodingType.JPEG,
    targetWidth: 800,
    targetHeight: 600,
    //popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // defaults for position
  $scope.posOptions = {
    timeout: 5000,
    enableHighAccuracy: true
  };


  $scope.pictureClick = function() {
    log('pictureClick()');

    //$cordovaCamera
    navigator.camera.getPicture($scope.cameraOptions).then(function(imageData) {
      var image = document.getElementById('cameraImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
  };

  $scope.getLocation = function() {
    log('getLocation()');

    // show wait message
    $scope.gettingLocation = true;

    $cordovaGeolocation.getCurrentPosition($scope.posOptions).then(function(locationData) {
      log('getCurrentPosition success', locationData);
      $scope.result = locationData.coords.latitude + ", " + locationData.coords.longitude + " | accuracy: " + locationData.coords.accuracy;
      log($scope.result);
      $scope.gettingLocation = false;
    }, function(err) {
      log('getCurrentPosition error', err);
      $scope.result = err;
      log($scope.result);
      $scope.gettingLocation = false;
    });
  };

})

.controller('LogCtrl', function($scope, logService) {

  logService.listen(function(logs) {
    $scope.logs = logs;
  });

  logService.log('test log', {
    field1: 1,
    field2: 'two'
  });

  $scope.message = "Log!";

});