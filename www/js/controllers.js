angular.module('app.controllers', [])

.controller('auditoriasCtrl',
	function ($scope, $stateParams,Carteles,Auditorias) {

		var cId = $stateParams.cartel;

		$scope.campana={};
		$scope.auditorias={};
		$scope.cartel={};
		//pido el cartel
		Carteles.getById(cId).then(function(cartel){
			$scope.cartel=cartel;
			//pido las auditorias

			Auditorias.getByCartel(cartel.id).then(function(auditorias){
				$scope.auditorias=auditorias;
				
			});

		});
	}).controller('auditoriaCtrl',
	function ($scope, $stateParams,Auditorias,Estados,Soportes,Empresas_publi,Campana,Clientes) {

		var aId = $stateParams.auditoria;

		
		$scope.auditoria={};
		$scope.cliente={};
		$scope.soporte={};
		$scope.empresa={};
		$scope.estado={};
		$scope.campana={};
		//pido el cartel
		Auditorias.getById(aId).then(function(auditoria){
			$scope.auditoria=auditoria;
			Soportes.getById(auditoria.soporte_id).then(function(soporte){
				$scope.soporte=soporte;
			});

			Empresas_publi.getById(auditoria.empresa_id).then(function(empresa){

				$scope.empresa=empresa;
			});
			Estados.getById(auditoria.estado_id).then(function(estado){

				$scope.estado=estado;
			});
			Campana.getById(auditoria.campana_id).then(function(auditoria){
				$scope.campana=auditoria;

			});
			Clientes.getById(auditoria.cliente_id).then(function(cliente){
				$scope.cliente=cliente;

			});
		});

	})
	.controller('sincronizandoCtrl',
		function ($scope, $stateParams,Campana) {
			

		}).controller('campanasCtrl',
		function ($scope, $stateParams,Campana) {
			$scope.campanas={};
			Campana.all().then(function(campanas){
				$scope.campanas=campanas;
				$scope.campanas_total=campanas.length;
				$scope.$apply();
			});

		})

		.controller('campanaCtrl',
			function ($scope, $stateParams,Campana,Clientes,Carteles) {

				$scope.itemButtons = [
				{
					text: 'Edit',
					type: 'button-assertive',
					onTap: function(item) {
						alert('Edit Item: ' + item.id);
					}
				},
				{
					text: 'Share',
					type: 'button-calm',
					onTap: function(item) {
						alert('Share Item: ' + item.id);
					}
				}
				];

				var cId = $stateParams.campana;
				$scope.campana={};
				$scope.cliente={};
				$scope.carteles={};
		//pido la campaña
		Campana.getById(cId).then(function(campana){
			//pido el cliente
			$scope.campana=campana;
			
			Clientes.getById(campana.cliente_id).then(function(cliente){
				$scope.cliente=cliente;

			});
			//pido los carteles

			Carteles.getByCampana(campana.id).then(function(carteles){
				$scope.carteles=carteles;
			});

		});
		

	})

		.controller('sincronizarCtrl',
			function ($scope, $stateParams,$state,$http,Campana,Carteles,Clientes,Soportes,Empresas_publi,Estados,Auditorias) {
				$scope.data={sincronizando:false};


				$scope.download=function(){


					Campana.deleteAll().then(function(campanas){

						$http.get(base_url+'/api/campanas/')
						.success(function(data, status, headers,config){
							for(j=0;j<data.length;j++){
			//meto las campanas
			Campana.insert(data[j]);
		}
	})
						.error(function(data, status, headers,config){
							console.log('error');
							console.log(data);
							console.log(status);
							console.log('error');

						});								
					});



			//pido lo que tengo en carteles
			Carteles.deleteAll().then(function(campanas){
				
				$http.get(base_url+'/api/carteles/')
				.success(function(data, status, headers,config){
					for(j=0;j<data.length;j++){
					//meto los carteles
					Carteles.insert(data[j]);
				}
			})
				.error(function(data, status, headers,config){
					console.log('error');
					console.log(data);
					console.log(status);
					console.log('error');

				});								
			});
			//meto los carteles
			
			//pido lo que tengo en Clientes
			Clientes.deleteAll().then(function(campanas){
				
				$http.get(base_url+'/api/clientes/')
				.success(function(data, status, headers,config){
					for(j=0;j<data.length;j++){
					//meto los carteles
					Clientes.insert(data[j]);
				}
			})
				.error(function(data, status, headers,config){
					console.log('error');
					console.log(data);
					console.log(status);
					console.log('error');

				});								
			});
			//meto los Clientes
			//
			//pido lo que tengo en Estados
			Estados.deleteAll().then(function(campanas){
				
				$http.get(base_url+'/api/estados/')
				.success(function(data, status, headers,config){
					for(j=0;j<data.length;j++){
					//meto los carteles
					Estados.insert(data[j]);
				}
			})
				.error(function(data, status, headers,config){
					console.log('error');
					console.log(data);
					console.log(status);
					console.log('error');

				});								
			});
			//meto los Clientes
			//pido lo que tengo en Empresas_publi
			Empresas_publi.deleteAll().then(function(campanas){
				
				$http.get(base_url+'/api/empresas_publis/')
				.success(function(data, status, headers,config){
					for(j=0;j<data.length;j++){
					//meto los carteles
					Empresas_publi.insert(data[j]);
				}
			})
				.error(function(data, status, headers,config){
					console.log('error');
					console.log(data);
					console.log(status);
					console.log('error');

				});								
			});
			//meto los Empresas_publi
			//pido lo que tengo en Soportes
			Soportes.deleteAll().then(function(campanas){
				
				$http.get(base_url+'/api/soportes/')
				.success(function(data, status, headers,config){
					for(j=0;j<data.length;j++){
					//meto los carteles
					Soportes.insert(data[j]);
				}
			})
				.error(function(data, status, headers,config){
					console.log('error');
					console.log(data);
					console.log(status);
					console.log('error');

				});								
			});
			//meto los Soportes
		}

		$scope.upload=function(){
			$scope.data.sincronizando=true;
			Auditorias.getNews().then(function(auditorias){
				var total=auditorias.length;
				var actual=1;
				for(var j=0;j<auditorias.length;j++){
					
					var win = function (r) {
					
						if(r.responseCode==201){
							audit=data.config.data;
							//actualizo la campana subida
							audit.ws_status=1;
							audit.ws_sync_date=new Date().toISOString().slice(0, 19).replace('T', ' ');
							Auditorias.update(audit);
						}
						total++;
						if(actual==total){
							$scope.data.sincronizando=false;

						}
					}

					var fail = function (error) {
						alert("An error has occurred: Code = " + error.code);
						alert("An error has occurred: upload error target = " + error.target);
						alert("An error has occurred: "+error);
						console.log("upload error source " + error.source);
						console.log("upload error target " + error.target);
					}
					fileURL=auditorias[j].foto_uri;
					var options = new FileUploadOptions();
					options.fileKey = "file";
					options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
					options.mimeType = "image/jpeg";

					var params = auditorias[j];
					
					options.params = params;

					var ft = new FileTransfer();
					ft.upload(fileURL, encodeURI(base_url+'/api/auditorias/'), win, fail, options);

				}
				// for(var j=0;j<auditorias.length;j++){

				// 	$http.post(base_url+'/api/auditorias/', auditorias[j]).then(function(data, status, headers,config){
				// 		audit=data.config.data;
				// 		//actualizo la campana subida
				// 		audit.ws_status=1;
				// 		audit.ws_sync_date=new Date().toISOString().slice(0, 19).replace('T', ' ');
				// 		Auditorias.update(audit);
				// 	}, function(data, status, headers,config){
				// 		console.log('error');
				// 		console.log(data);
				// 		console.log(status);
				// 		console.log('error');

				// 	});

				

			});
			

			

		}

	})

.controller('menuCtrl',
	function ($scope, $stateParams,$state,$http) {
		$scope.logOut=function(){

			$http.get(base_url+'/api/users/logout/')
			.success(function(data, status, headers,config){
				localStorage.removeItem("id");
				localStorage.removeItem("ip_address");
				localStorage.removeItem("username");
				localStorage.removeItem("password");
				localStorage.removeItem("email");
				localStorage.removeItem("active");
				localStorage.removeItem("first_name");
				localStorage.removeItem("last_name");
				$state.go('login');
			})
			.error(function(data, status, headers,config){
				console.log('error');

				console.log(data);
				console.log(status);
				console.log('error');

			});


		};

	})

.controller('loginCtrl',function ($scope,$state, $stateParams,$http) {
	$scope.data={
		mail:'',
		pass:'',
		status:0
	};

	$scope.login=function (){
		localStorage.setItem("email", $scope.data.mail);
		localStorage.setItem("password", $scope.data.pass);
		$scope.checkLogin();

	};

	$scope.checkLogin=function(){

		if(localStorage.getItem('active')==1){
			$state.go('tabsController.sincronizar');
			return true;
		}
		u=localStorage.getItem('email');
		p=localStorage.getItem('password');
		

		$http.get(base_url+'/api/users/login/'+u+'/'+p)
		.success(function(data, status, headers,config){

			$state.go('tabsController.sincronizar');

	      	$scope.data = data; // for UI

	      	$scope.guardaLogin();
	      })
		.error(function(data, status, headers,config){
			console.log('error');

			console.log(data);
			console.log(status);
			console.log('error');
			$scope.data={
				mail:'',
				pass:'',
				status:0
			};
		});


		// {"id":"2","ip_address":"90.0.0.105","username":"srok","password":"$2y$08$Zn9Um.iX0Y9m\/Mcl.VlEqOXHpZ5eiHfDYf\/tSRIIbzcJzc0FK90GW","salt":"","email":"srok@srok.com.ar","activation_code":null,"forgotten_password_code":null,"forgotten_password_time":null,"remember_code":null,"created_on":"1479488243","last_login":"1481561764","active":"1","first_name":"srok","last_name":"desarrollos","company":null,"phone":"","user_id":"2"}
	};

	$scope.logOut=function(){
		localStorage.removeItem("id");
		localStorage.removeItem("ip_address");
		localStorage.removeItem("username");
		localStorage.removeItem("password");
		localStorage.removeItem("email");
		localStorage.removeItem("active");
		localStorage.removeItem("first_name");
		localStorage.removeItem("last_name");
	};

	$scope.guardaLogin= function() {
		if ($scope.data.active == 1) {

			localStorage.setItem("id", $scope.data.id);
			localStorage.setItem("ip_address", $scope.data.ip_address);
			localStorage.setItem("username", $scope.data.username);
			localStorage.setItem("password", $scope.data.password);
			localStorage.setItem("email", $scope.data.email);
			localStorage.setItem("active", $scope.data.active);
			localStorage.setItem("first_name", $scope.data.first_name);
			localStorage.setItem("last_name", $scope.data.last_name);

			
			return true;

		} else {

			localStorage.removeItem("uid");
			localStorage.removeItem("mail");
			localStorage.removeItem("nombre");
			localStorage.removeItem("apellido");
			localStorage.removeItem("direccion");
			localStorage.removeItem("telefono");
			localStorage.removeItem("pass");
			localStorage.removeItem("status");
			return false;

		}
	};


	$scope.checkLogin();


})

.controller('cartelCtrl',
	function ($scope,  $stateParams,$ionicHistory,Campana,Clientes,Carteles,Soportes,Empresas_publi,Estados,Auditorias) {


		var campanaId = $stateParams.campana;
		var cartelId = $stateParams.cartel;
		$scope.auditoria={};
		$scope.campana={};
		$scope.cliente={};
		$scope.cartel={};
		$scope.soporte={};
		$scope.empresa={};
		$scope.estados={};
		//pido la campaña
		Campana.getById(campanaId).then(function(campana){
			//pido el cliente
			$scope.campana=campana;
			
			Clientes.getById(campana.cliente_id).then(function(cliente){
				$scope.cliente=cliente;

			});
			//pido los carteles

			Carteles.getById(cartelId).then(function(cartel){
				$scope.cartel=cartel;

				Soportes.getById(cartel.soporte_id).then(function(soporte){
					$scope.soporte=soporte;
				});

				Empresas_publi.getById(cartel.empresa_id).then(function(empresa){

					$scope.empresa=empresa;
				});

			});

			Estados.all().then(function(estados){
				$scope.estados=estados;
			});

		});

		$scope.guardarAuditoria= function() {
			$scope.auditoria={
				cliente_id:$scope.cliente.id,
				cartel_id:$scope.cartel.id,
				campana_id:$scope.campana.id,
				fecha_max:$scope.cartel.fecha_max,
				direccion:$scope.cartel.direccion,
				cartel_lat:$scope.cartel.cartel_lat,
				cartel_long:$scope.cartel.cartel_long,
				soporte_id:$scope.cartel.soporte_id,
				empresa_id:$scope.cartel.empresa_id,
				estado_id:$scope.auditoria.estado.id,
				observaciones:$scope.auditoria.observaciones,
				foto_uri:$scope.image_src,
				foto_lat:$scope.lat,
				foto_long:$scope.long,
				fecha:new Date().toISOString().slice(0, 19).replace('T', ' '),
				ws_status:0,
				ws_sync_date:null,

			}

			Auditorias.insert($scope.auditoria);
			$ionicHistory.backView();
		};

		//aca arranca lo de la foto y la geoposicionacióncita:

		$scope.image_src='';

		$scope.takePicture= function() {
			//$scope.image_src='http://placehold.it/1024x768';
			$scope.lat='';
			$scope.long='';
		navigator.geolocation.getCurrentPosition(function(location){//exito
			$scope.lat=location.coords.latitude;
			$scope.long=location.coords.longitude;
			$scope.$apply();
		},
		function (error){
			alert(error);
		});

		navigator.camera.getPicture( function( NATIVE_URI ) {
			
			$scope.image_src=NATIVE_URI;

			
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

})
