angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.campanas', {
    url: '/campanas',
    views: {
      'tab1': {
        templateUrl: 'templates/campanas.html',
        controller: 'campanasCtrl'
      }
    }
  })

  .state('tabsController.campana', {
    url: '/campana/1',
    views: {
      'tab1': {
        templateUrl: 'templates/campana.html',
        controller: 'campanaCtrl'
      }
    }
  })

  .state('tabsController.sincronizar', {
    url: '/sync',
    views: {
      'tab2': {
        templateUrl: 'templates/sincronizar.html',
        controller: 'sincronizarCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.cartel', {
    url: '/publicidad',
    views: {
      'tab1': {
        templateUrl: 'templates/cartel.html',
        controller: 'cartelCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});