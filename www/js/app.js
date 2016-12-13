// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var base_url='https://90.0.0.1/identhya/audit/back-end';

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services',])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform,DB) {
  DB.init();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
   
  });
})

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])


angular.module('app.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'carteles',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'campana_id', type: 'integer'},
                {name: 'fecha_max', type: 'text'},
                {name: 'direccion', type: 'text'},
                {name: 'cartel_lat', type: 'text'},
                {name: 'cartel_long', type: 'text'},
                {name: 'soporte_id', type: 'integer'},
                {name: 'empresa_id', type: 'integer'},
                {name: 'ws_status', type: 'text'},
                {name: 'ws_sync_date', type: 'text'},
            ]
        },
        {
            name: 'auditorias',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'cliente_id', type: 'integer'},
                {name: 'campana_id', type: 'integer'},
                {name: 'cartel_id', type: 'integer'},
                {name: 'fecha_max', type: 'text'},
                {name: 'direccion', type: 'text'},
                {name: 'cartel_lat', type: 'text'},
                {name: 'cartel_long', type: 'text'},
                {name: 'soporte_id', type: 'integer'},
                {name: 'empresa_id', type: 'integer'},
                {name: 'estado_id', type: 'integer'},
                {name: 'observaciones', type: 'text'},
                {name: 'foto_uri', type: 'text'},
                {name: 'foto_lat', type: 'text'},
                {name: 'foto_long', type: 'text'},
                {name: 'fecha', type: 'text'},
                {name: 'ws_status', type: 'text'},
                {name: 'ws_sync_date', type: 'text'},
            ]
        },
        {
            name: 'campanas',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'cliente_id', type: 'integer'},
                {name: 'nombre', type: 'text'},
            ]
        },
        {
            name: 'estados',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'nombre', type: 'text'},
            ]
        },
        {
            name: 'empresas_publi',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'nombre', type: 'text'},
            ]
        },
        {
            name: 'soportes',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'nombre', type: 'text'},
            ]
        },
        {
            name: 'clientes',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'razon_social', type: 'text'},
            ]
        }
    ]
});