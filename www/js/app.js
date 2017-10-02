var app = angular.module('starter', ['ionic','ngCordova']);
 
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }



		/*	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/alarma.mp3', 1, 1, 0, function(msg){
				console.log('ok');
				console.log(msg);
			}, function(msg){
			console.log( 'error: ' + msg );
			});
*/


    });
});



app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//$ionicConfigProvider.backButton.text('');


  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'temCtrl'
  })

     .state('app.deteccionCaida', {
    url: '/deteccionCaida',
    views: {
      'menuContent': {
        templateUrl: 'templates/deteccionCaida.html'
      }
    }
  })

          .state('app.confirmacionPresencia', {
    url: '/confirmacionPresencia',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmacionPresencia.html'
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
        templateUrl: 'templates/search.html'
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
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  }
}]);

app.controller('temCtrl', function($scope, $localstorage, $ionicPlatform, $cordovaDeviceMotion) {

	//$scope.mode = {};
	$scope.cambioModo = function(modo){

		

		$localstorage.set('modo2', modo);
	console.log($localstorage.get('modo2'));

}




});


app.controller('peligroCtrl', function($scope, $localstorage, $ionicPlatform, $cordovaDeviceMotion) {

	console.log('mm');
/*	window.plugins.NativeAudio.preloadComplex( 'music', 'audio/alarma.mp3', 1, 1, 0, function(msg){
				console.log('ok');
				console.log(msg);
			}, function(msg){

			console.log( 'error: ' + msg );
			});*/


window.plugins.NativeAudio.preloadSimple( 'click', 'audio/alarma.mp3', function(msg){
	console.log( 'ok ' );
    }, function(msg){
        console.log( 'error: ' + msg );
    });
 


//	window.plugins.NativeAudio.loop('music');
window.plugins.NativeAudio.play( 'click' );
	//$scope.mode = {};
	$scope.cambioModo = function(modo){

		

		$localstorage.set('modo2', modo);
	console.log($localstorage.get('modo2'));

}


	$scope.pararAlarma = function(){

			
window.plugins.NativeAudio.stop( 'music' );
console.log('parar alarma');

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

