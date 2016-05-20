   
(function () {
    var module = angular.module("WellMap", ["google-maps"]);
}());

function WellMapController ($scope, $http, $filter) {
	
  $http.get('json/WellMap.json').success(function(data) {
	$scope.places = data;
    $scope.markersProperty = data;
    $scope.filteredMarkersProperty = $scope.markersProperty;
    var wells = [];
	
	for (var i = 0; i < data.length; i++){
		wells[i] = data[i].desc;
	}
    
    var sorted_wells = wells.sort();
    
    $scope.wellList = [];
	for (var i = 0; i < wells.length; i++){
		if (sorted_wells[i+1] != sorted_wells[i]){
			$scope.wellList.push(sorted_wells[i]);
		}
	}
    


  }); 
  
    $scope.$watch( 'orderProp', function ( val ) {
        $scope.filteredMarkersProperty = $filter('filter')($scope.markersProperty, val);
        $scope.zoomProperty = 11;
        calcFocus();
    });

    $scope.showAll = function($event){
        $scope.orderProp ="0";
        $scope.filteredMarkersProperty = $scope.places;
        $scope.zoomProperty = 4;
        calcFocus();

    }

     $scope.select = function($event){
        var theName = $event.desc;
        var lat = $event.latitude;
        var lng = $event.longitude;
        $scope.filteredMarkersProperty = [$event];
        $scope.centerProperty.lat = lat;
        $scope.centerProperty.lng = lng;
        $scope.zoomProperty = 14;
        calcFocus();

     }
    function calcFocus(){
        var lats = [], longs = [], counter = [];

        for(i=0; i<$scope.filteredMarkersProperty.length; i++)
        {
            lats[i] = $scope.filteredMarkersProperty[i].latitude;
            longs[i] = $scope.filteredMarkersProperty[i].longitude;
        }

        var latCount = 0;
        var longCount = 0;

        for (i=0; i<lats.length; i++){
            latCount += lats[i];
            longCount += longs[i];
        }

        latCount = latCount / lats.length;
        longCount = longCount / longs.length;
        $scope.centerProperty.lat = latCount;
        $scope.centerProperty.lng = longCount;
    };


    angular.extend($scope, {

        /** the initial center of the map */
        centerProperty: {
            lat:40.0000,
            lng:-98.0000
        },

        /** the initial zoom level of the map */
        zoomProperty: 4,

        /** list of markers to put in the map */

        markersProperty : [],

        // These 2 properties will be set when clicking on the map - click event
        clickedLatitudeProperty: null,  
        clickedLongitudeProperty: null
    });
    

}


