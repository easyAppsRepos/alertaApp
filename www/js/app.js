var app = angular.module('starter', ['ionic','ngCordova']);
 




app.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
cordova.plugins.backgroundMode.enable();
console.log( 'resdd ' );

if( window.plugins && window.plugins.NativeAudio ) {
	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/alarma.mp3', 1, 1, 0, function(msg){
				console.log('ok');
				console.log(msg);
			}, function(msg){
			console.log( 'error: ' + msg );
			});

}



window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(status) {
    //alert("Battery Level Low " + status.level + "%");

	 navigator.notification.beep(2);
/*     navigator.notification.alert(
            'Nivel bajo de bateria ',  // message
            function(){console.log('batteryLow')},
            'Alerta',            // title
            'Entiendo'                  // buttonName
        );*/

 		
}




		

/*    window.plugins.NativeAudio.preloadSimple( 'click', 'audio/alarma.mp3', function(msg){
	console.log( 'ok ' );
    }, function(msg){
        console.log( 'error: ' + msg );
    });*/

        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }


		


    });
});



app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//$ionicConfigProvider.backButton.text('');
$ionicConfigProvider.backButton.text('atras').icon('ion-ios-arrow-back');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

     .state('app.deteccionCaida', {
    url: '/deteccionCaida',
    views: {
      'menuContent': {
        templateUrl: 'templates/deteccionCaida.html',
          controller: 'temCtrl'
      }
    }
  })

          .state('app.confirmacionPresencia', {
    url: '/confirmacionPresencia',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmacionPresencia.html',
         controller: 'temCtrl'
      }
    }
  })
          .state('app.config', {
    url: '/config',
    views: {
      'menuContent': {
        templateUrl: 'templates/config.html',
         controller: 'temCtrl'
      }
    }
  })

           .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
         controller: 'temCtrl'
      }
    }
  })
.state('app.addUsuario', {
    url: '/addUsuario',
    views: {
      'menuContent': {
        templateUrl: 'templates/addUsuario.html',
         controller: 'addUsuarioCtrl'
      }
    }
  })

       

          .state('app.peligro', {
    url: '/peligro',
    views: {
      'menuContent': {
        templateUrl: 'templates/peligro.html',
        controller: 'peligroCtrl'
      }
    }
  })
         

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'temCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');

 // $ionicConfigProvider.views.transition('none');
});

app.factory('$localstorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    setObjectElement: function (key, value) {

 
    	 var old = JSON.parse($window.localStorage[key] || '[]');

    	old.push(value);

      $window.localStorage[key] = JSON.stringify(old);

    },

    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },

    getObjectElement: function (key,dni) {

		//var dds=$localstorage.getObject('xdALPusarr');
		var usuariosT= JSON.parse($window.localStorage[key] || '[]');
		console.log(usuariosT);
		console.log(dni);
		var indexOfStevie = usuariosT.findIndex(i => i.dni == dni);


		//console.log(indexOfStevie);


      return usuariosT[indexOfStevie] || -1;
    },

    setSMS: function (key,dni,sms) {

		//var dds=$localstorage.getObject('xdALPusarr');
		var usuariosT= JSON.parse($window.localStorage[key] || '[]');

		var indexOfStevie = usuariosT.findIndex(i => i.dni == dni);

		usuariosT[indexOfStevie].sms.push(sms);

		console.log(indexOfStevie);
		$window.localStorage[key] = JSON.stringify(usuariosT);

      return usuariosT[indexOfStevie] || -1;
    },

        setEMAIL: function (key,dni,sms) {

		//var dds=$localstorage.getObject('xdALPusarr');
		var usuariosT= JSON.parse($window.localStorage[key] || '{}');

		var indexOfStevie = usuariosT.findIndex(i => i.dni == dni);

		usuariosT[indexOfStevie].email.push(sms);

		//console.log(indexOfStevie);
		$window.localStorage[key] = JSON.stringify(usuariosT);

      return usuariosT[indexOfStevie] || -1;
    },
deleteSMS: function (key,dni,indexSMS) {

		//var dds=$localstorage.getObject('xdALPusarr');
		var usuariosT= JSON.parse($window.localStorage[key] || '{}');

		var indexOfStevie = usuariosT.findIndex(i => i.dni == dni);

		usuariosT[indexOfStevie].sms.splice(indexSMS, 1);

		//console.log(indexOfStevie);
		$window.localStorage[key] = JSON.stringify(usuariosT);

      return usuariosT[indexOfStevie] || -1;
    },

    deleteEmail: function (key,dni,indexSMS) {

		//var dds=$localstorage.getObject('xdALPusarr');
		var usuariosT= JSON.parse($window.localStorage[key] || '{}');

		var indexOfStevie = usuariosT.findIndex(i => i.dni == dni);

		usuariosT[indexOfStevie].email.splice(indexSMS, 1);

		//console.log(indexOfStevie);
		$window.localStorage[key] = JSON.stringify(usuariosT);

      return usuariosT[indexOfStevie] || -1;
    },



    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  }
}]);






app.factory('peligroFactory', function($rootScope, $localstorage, $cordovaSms, $ionicLoading, $timeout, $window, $state){
    
    	var counter = $localstorage.get('tiempoAlerta',30);
    	var paraAlerta = false;

    	



			var montar = function(){
				if( window.plugins && window.plugins.NativeAudio ) {
					window.plugins.NativeAudio.unload('music');
					window.plugins.NativeAudio.preloadComplex('music', 'audio/alarma.mp3', 1, 1, 0, function(msg){
					console.log('ok');
					console.log(msg);
					}, function(msg){
					console.log( 'error: ' + msg );
					});
				}
			}





		var reset= function(){

			counter = $localstorage.get('tiempoConfirmacion','300');

				}

		var pararAlarma = function(){

		paraAlerta = true;
		window.plugins.NativeAudio.stop('music');
		//window.plugins.NativeAudio.unload( 'music' );
		console.log('parar alarma');
		montar();
		}


				sendSMS = function(usuario,numero) {

				var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
				intent: '' // send SMS with the native android SMS messaging
				//intent: '' // send SMS without open any other app
				//intent: 'INTENT' // send SMS inside a default SMS app
				}
				}



				$cordovaSms
				  .send(numero, 'Alerta activada por el usuario '+usuario, options)
				  .then(function() {
				    console.log('smsSend');
				  }, function(error) {
				  	console.log(error);
				  });
				}



				 var sendMensaje= function(numbers, texy) {
        var number = numbers;
        var message = texy;
      //  console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
        console.log(number + '-' + message);
        console.log(sms.send);

        var success = function () { console.log('Message sent successfully'); };
        var error = function (e) {  console.log('Message Failed:' + e); };
       // sms.send(number, message, options, success, error);
    }



			var onTimeout = function(){
			counter--;
			console.log(counter);
			if (counter > 0 && !paraAlerta) {
			mytimeout = $timeout(onTimeout,1000);
			}
			else {
			if(!paraAlerta){

			console.log("enviar mensajes y llamar");
			//var nombreDelUsuario = $localstorage.get('tiempoConfirmacion','300');

			var dni =$localstorage.get('userSelected', '1');
			var userActivo=$localstorage.getObjectElement('xdALPusarr', dni);

			console.log("Response -> " + userActivo.Nombre);
			console.log("Response -> " + userActivo.email);
/*

sendSMS = function(usuario,numero) {
				if(window.plugins && window.plugins.emailComposer) {
				window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
				console.log("Response -> " + result);
				},
				"Alerta activada", // Subject
				"Se ha activado la alarma con el usuario "+userActivo.Nombre,                      // Body
				userActivo.email,    // To
				null,                    // CC
				null,                    // BCC
				false,                   // isHTML
				null,                    // Attachments
				null);                   // Attachment Data
				}
*/
				

				for (i = 0; i < userActivo.sms.length; i++) { 
				//text += cars[i] + "<br>";
				//console.log()[]
				var texto='Alarma activada por el usuario '+userActivo.Nombre;
				//sendMensaje(userActivo.sms[i],texto);
				sendSMS(userActivo.Nombre, userActivo.sms[i]);
				
				}





			}

			}
			}
			//var mytimeout = $timeout(onTimeout,1000);


    return {

    	resetF: function () {
	      reset();
	    },


iniciarAlarma: function () {

	//cordova.plugins.backgroundMode.unlock();

	if(paraAlerta==true){
		//cordova.plugins.backgroundMode.unlock();
		//	cordova.plugins.backgroundMode.moveToForeground();
		counter = $localstorage.get('tiempoAlerta',30);
		paraAlerta=false;
		if( window.plugins && window.plugins.NativeAudio ) {
			window.plugins.NativeAudio.loop('music');
			}

		mytimeout = $timeout(onTimeout,1000);
	}
	else{
		if(counter == $localstorage.get('tiempoAlerta',30)){

			//cordova.plugins.backgroundMode.unlock();
			//cordova.plugins.backgroundMode.moveToForeground();
			if( window.plugins && window.plugins.NativeAudio ) {
			window.plugins.NativeAudio.loop('music');
			}


			mytimeout = $timeout(onTimeout,1000);
		}
	}
	//else{}
	      
		
	    },


	    getCounter: function () {
	      return counter;
	    },
	    getEstado: function () {
	      return paraAlerta;
	    },

	    pararA:function(){
	    	pararAlarma();
	    	return true;
	    }
		}
});


app.factory('counterHandler', function($rootScope, $localstorage, $ionicLoading, $timeout, $window, $state){
    
    	var modo =$window.localStorage['modo3'] == 'true' ? true : false ;
		var counter= $window.localStorage['tiempoConfirmacion'] || '300';

		var reset= function(){

			if(counter<=0){
				if(modo){
					counter = $localstorage.get('tiempoConfirmacion','300');
					var mytimeout = $timeout(onTimeout,1000);
				}	

			}
			else{
				counter = $localstorage.get('tiempoConfirmacion','300');
			}
			



				}


	var onTimeout = function(){


				if(modo){
				counter--;
				console.log(counter);
				if (counter > 0) {
				mytimeout = $timeout(onTimeout,1000);
				}

				else {
					//iniciarAlarma
					//cordova.plugins.backgroundMode.wakeUp();
					$state.go('app.peligro');
				}
			}

			}
	if(modo){var mytimeout = $timeout(onTimeout,1000);}	



    return {

    	resetF: function () {
	      reset();
	    },


	    getCounter: function () {
	      return counter;
	    },

	    cambiarEstado:function(modoVar){
	    	console.log(modoVar);
		$localstorage.set('modo3', modoVar);
		modo=modoVar;

		
		if(!modoVar){

console.log('notHhere');
			reset();
			$ionicLoading.show();
			
			$timeout($ionicLoading.hide,500);
		}
		else{
			//mytimeout = $timeout($scope.onTimeout,1000);
			console.log('here');
			counter = $localstorage.get('tiempoConfirmacion','300');

			mytimeout = $timeout(onTimeout,1000);
		}
		
		



	    }
	}
});





app.controller('temCtrl', function($scope, $rootScope, counterHandler, $ionicPopup, $ionicLoading, $timeout, $state, $localstorage, $ionicPlatform, $cordovaDeviceMotion) {
	
	$scope.config={};
	//$scope.userOn={};

	  $scope.$on('$ionicView.enter', function() {
     // Code you want executed every time view is opened
    $scope.usuariosR=$localstorage.getObject('xdALPusarr');

    if($scope.usuariosR.length == 0){
			console.log('noU');
			$scope.noUsuarios=true;
	}
	else{
		console.log('U');
		$scope.noUsuarios=false;
	}



  })


	

		
	
	$scope.config.tiempoAlerta=$localstorage.get('tiempoAlerta','30');
	$scope.config.dni=$localstorage.get('userSelected', '1');
	$scope.userActivo=$localstorage.getObjectElement('xdALPusarr', $scope.config.dni);


if($scope.userActivo == -1){
	$scope.NoUserSelected=true;
}
else{
	$scope.NoUserSelected=false;
}

		$scope.modos={};
	$scope.modos.modo3=$localstorage.get('modo3', false) == 'true' ? true : false ;

	
$scope.$watch(
  function() { return counterHandler.getCounter(); },
  function(newVal) {
    //console.log(newVal);
    $scope.counter = newVal;

  }, 
  true
);
		
				//if(!$scope.modos.modo3){
				//	$scope.counter = $localstorage.get('tiempoConfirmacion','300');

					//}
				

				$scope.paraAlerta = false;

				$scope.onTimeout = function(){


					if($scope.modos.modo3){
				$scope.counter--;
				console.log($scope.counter);
				if ($scope.counter > 0) {
				mytimeout = $timeout($scope.onTimeout,1000);
				}

				else {
					//cordova.plugins.backgroundMode.wakeUp();
					$state.go('app.peligro');

				}
			}

			}


				if($scope.modos.modo3){

				//	var mytimeout = $timeout($scope.onTimeout,1000);

				
		}



	//$scope.config.tiempoConfirmacion=$localstorage.get('tiempoConfirmacion','300');
	//$scope.mode = {};
	
	
		$scope.getMinutes = function(num){
			return Math.floor(num/60);

		}

		$scope.vvb = function(num){
		alert(cordova.plugins.backgroundMode.isActive() );

		}



		$scope.asignarUsuario = function(dni){

			
			$localstorage.set('userSelected', dni);
			//console.log($localstorage.get('userSelected', '0'));
			$scope.userActivo=$localstorage.getObjectElement('xdALPusarr', dni);

			if($scope.userActivo == -1){
			$scope.NoUserSelected=true;
			}
			else{
			$scope.NoUserSelected=false;
			}


			console.log($scope.userActivo);

		}


$scope.data={};



		$scope.bajaEmail = function(index){

			console.log(index);
			$scope.userActivo=$localstorage.deleteEmail('xdALPusarr', $scope.userActivo.dni, index);
		}



		$scope.asignarEmail = function(){

			$ionicPopup.show({
			template: "<style>.popup { width:500px; }</style><input ng-model='data.addemail' type='text'>",
			title: 'Agregar email',
			subTitle: 'Agrega el correo electronico',
			scope: $scope,
			buttons: [
			{ text: 'cancelar' },
			{
			text: '<b>Ok</b>',
			type: 'button-positive',
			onTap: function() {

			 	
			 
				 if($scope.data.addemail){

				 	console.log($scope.data.addemail);
				 	$scope.userActivo=$localstorage.setEMAIL('xdALPusarr', $scope.userActivo.dni, $scope.data.addemail);
				 	$scope.data.addemail='';
				 }

				 else{
				 	alert('Datos incorrectos');
				 	$scope.data.addemail='';
				 }

				 

			  }
			}
			]
			});

		}


		$scope.bajaSMS = function(index){

			console.log(index);
			$scope.userActivo=$localstorage.deleteSMS('xdALPusarr', $scope.userActivo.dni, index);
		}



		$scope.asignarSMS = function(tiempo){

			$ionicPopup.show({
			template: "<style>.popup { width:500px; }</style><input ng-model='data.addsms' type='text'>",
			title: 'Agregar numero',
			subTitle: 'Agrega el numero movil',
			scope: $scope,
			buttons: [
			{ text: 'cancelar' },
			{
			text: '<b>Ok</b>',
			type: 'button-positive',
			onTap: function() {

			 	
			 
				 if($scope.data.addsms){

				 	console.log($scope.data.addsms);
				 	$scope.userActivo=$localstorage.setSMS('xdALPusarr', $scope.userActivo.dni, $scope.data.addsms);
				 	$scope.data.addsms='';
				 }

				 else{
				 	alert('Datos incorrectos');
				 	$scope.data.addsms='';
				 }

				 

			  }
			}
			]
			});

		}



		$scope.asignarTiempo = function(tiempo){
		$localstorage.set('tiempoAlerta', tiempo);
		}

		$scope.asignarTiempoP = function(tiempo){
		$localstorage.set('tiempoConfirmacion', tiempo);
		}


		

		$scope.reset= function(){


counterHandler.resetF()
				//$scope.counter = $localstorage.get('tiempoConfirmacion','300');
			//	mytimeout = $timeout($scope.onTimeout,1000);
				}





		$scope.asignarModo3 = function(modo){

			counterHandler.cambiarEstado(modo);
			}




});



app.controller('addUsuarioCtrl', function($scope, $ionicPopup, $state, $localstorage, $timeout, $ionicPlatform) {

	$scope.registroUsuario=function(usuario){

	//	mensajeAlerta(2,'Usuario creado correctamente');
	

	usuario.contra='123456789';
		if(usuario && usuario.Nombre && usuario.dni && usuario.empresa && usuario.centro && usuario.puesto && usuario.contra){

			var verificador = $localstorage.getObjectElement('xdALPusarr', usuario.dni);

			if(verificador == -1){

				usuario.sms=[];
				usuario.email=[];
				console.log(usuario);
				$localstorage.setObjectElement('xdALPusarr', usuario);
				mensajeAlerta(2,'Usuario creado correctamente');

			}
			else{

				
				mensajeAlerta(1,'El DNI ya esta en uso');
				//console.log('NO SE ENTRA');
			}

		}
		else{
			mensajeAlerta(1,'Datos incompletos');

		}
		}


		  function mensajeAlerta(tipo, mensaje){

    var ima ='excla.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#444; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:#444; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};
             $state.go('app.perfil');

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}



});



app.controller('peligroCtrl', function($scope, peligroFactory, $localstorage, $timeout, $ionicPlatform, $cordovaDeviceMotion) {

	//console.log('mm');
/*	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/alarma.mp3', 1, 1, 0, function(msg){
				console.log('ok');
				console.log(msg);
			}, function(msg){

			console.log( 'error: ' + msg );
			});
console.log(peligroFactory.getEstado());
	if(peligroFactory.getEstado()){
		    peligroFactory.iniciarAlarma();

	}
	*/
   // $scope.counter = $localstorage.get('tiempoAlerta',30);
    //$scope.paraAlerta = false;

    //var mytimeout = $timeout($scope.onTimeout,1000);
    
peligroFactory.iniciarAlarma();

    $scope.pararAlarma= function(){
        peligroFactory.pararA();
    }


    $scope.reset= function(){
        $scope.counter = 5;
        mytimeout = $timeout($scope.onTimeout,1000);
    }

    $scope.$watch(
  function() { return peligroFactory.getCounter(); },
  function(newVal) {
    //console.log(newVal);
    $scope.counter = newVal;

  }, 
  true
);


            
	

	





//window.plugins.NativeAudio.play( 'click' );
	//$scope.mode = {};
	$scope.cambioModo = function(modo){
		$localstorage.set('modo2', modo);
	console.log($localstorage.get('modo2'));

}








});



app.controller('MotionController', function($scope, $ionicPlatform, $cordovaDeviceMotion) {

	// watch Acceleration
	$scope.options = { 
		frequency: 200, // Measure every 100ms
        deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
	};

	// Current measurements
	$scope.measurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}

	// Previous measurements	
	$scope.previousMeasurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}	
	
	// Watcher object
	$scope.watch = null;
	
	// Start measurements when Cordova device is ready
 
		
		//Start Watching method
		$scope.startWatching = function() {		
console.log('hhh');
		    // Device motion configuration
			$scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
			
			// Device motion initilaization
			$scope.watch.then(null, function(error) {

				console.log('Error');
				console.log(error);
			  },function(result) {
				 // console.log(result);
				// Set current data  
				$scope.measurements.x = result.x;
				$scope.measurements.y = result.y;
				$scope.measurements.z = result.z;
				$scope.measurements.timestamp = result.timestamp;				  
				  
				// Detecta shake  
				$scope.detectShake(result);  
				  				
			});		
		};		
		
		// Stop watching method
		$scope.stopWatching = function() {	
			$scope.watch.clearWatch();
        }		
		

			function squareIt(number) {
			return number * number;
			}


function onSuccess(heading) {
    console.log('Heading: ' + heading.magneticHeading);
};

function onError(error) {
    console.log('CompassError: ' + error.code);
};



		// Detect shake method		
		$scope.detectShake = function(result) {	


		navigator.compass.getCurrentHeading(onSuccess, onError);

			//Calcular SV_tot
			var SVtot = Math.sqrt((squareIt(result.x)+squareIt(result.y)+squareIt(result.z))); 

			if(SVtot < 6){console.log('START OF A FALL');}

			console.log(SVtot);
		
		    //Object to hold measurement difference between current and old data
            //var measurementsChange = {};
			
			// Calculate measurement change only if we have two sets of data, current and old
/*			if ($scope.previousMeasurements.x !== null) {
				measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
				measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
				measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
			}
			
			// If measurement change is bigger then predefined deviation
			if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
				$scope.stopWatching();  // Stop watching because it will start triggering like hell
                console.log('Shake detected'); // shake detected
				setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sex
				
				// Clean previous measurements after succesfull shake detection, so we can do it next time
				$scope.previousMeasurements = { 
					x: null, 
					y: null, 
					z: null
				}				
				
			} else {
				// On first measurements set it as the previous one
				$scope.previousMeasurements = {
					x: result.x,
					y: result.y,
					z: result.z
				}
			}*/			
			
        }		
		

	
	$scope.$on('$ionicView.beforeLeave', function(){
	    $scope.watch.clearWatch(); // Turn off motion detection watcher
	});	
	
});

