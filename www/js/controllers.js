angular.module('app.controllers', [])

.controller('campanasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('campanaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sincronizarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('cartelCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,  $stateParams) {

	$scope.image_src='';

	$scope.takePicture= function() {
		$scope.image_src='http://placehold.it/1024x768';
		$scope.lat='';
		$scope.long='';
		navigator.camera.getPicture( function( NATIVE_URI ) {
			alert(NATIVE_URI);
			$scope.image_src=NATIVE_URI;

			navigator.geolocation.getCurrentPosition(function(location){//exito
				$scope.lat=location.coords.altitude;
				$scope.long=location.coords.longitude;
			},
                                        function (error){
                                        	alert(error);
                                        });

			$scope.$apply();
		},
		function( message ) {
			alert( message );
		},
		{
			quality: 50,
			destinationType: Camera.DestinationType.NATIVE_URI
		});
	};

}])
