
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1tZ0V983FSdADD8TTjq7bjLC0AaR_HA4",
    authDomain: "project1-ac08d.firebaseapp.com",
    databaseURL: "https://project1-ac08d.firebaseio.com",
    projectId: "project1-ac08d",
    storageBucket: "",
    messagingSenderId: "611644065697"
};
firebase.initializeApp(config);

var database = firebase.database();

// //-----------------------------------------

// // get the google maps url and API key from firebase

// database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
//     var data = snapshot.val();
//     var mapKey = data.url;
//     console.log(mapKey);
//     $("#googleMapsHead").attr("src", mapKey);
//     //need to not run the showGoogleMaps func until the data is retrieved
//     //from the firebase. ›
// });
//$.when(getAPI()).done(showGoogleMaps);

//------------------------------------------

//   This example adds a search box to a map, using the Google Place Autocomplete
//   feature. People can enter geographical searches. The search box will return a
//   pick list containing a mix of places and predicted search terms.

//   This example requires the Places library. Include the libraries=places
//   parameter when you first load the API. For example:

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('googlemaps'), {
      center: {lat: 40, lng: -100},
      zoom: 5,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}

// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos);
      infoWindow.setPosition(pos);
      infoWindow.setContent("Your Location");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn’t support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         ‘Error: The Geolocation service failed.’ :
//                         ’Error: Your browser doesn\‘t support geolocation.’);
//   infoWindow.open(map);
// }


  // Initialize Firebase for Uber
  var config = {
    apiKey: "AIzaSyC1tZ0V983FSdADD8TTjq7bjLC0AaR_HA4",
    authDomain: "project1-ac08d.firebaseapp.com",
    databaseURL: "https://project1-ac08d.firebaseio.com",
    projectId: "project1-ac08d",
    storageBucket: "project1-ac08d.appspot.com",
    messagingSenderId: "611644065697"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var queryURLETA = "https://api.uber.com/v1.2/estimates/time?start_latitude=" + startLatitude + "&start_longitude=" + startLongitude + "&end_latitude=" + endLatitude + "&end_longitude=" + endLongitude + "&server_token=CYeYg4Brhv5cRtRYESfcC9iRKG9TCDCfZhxASEaS";
  var queryURLPrice = "https://api.uber.com/v1.2/estimates/price?start_latitude=" + startLatitude + "&start_longitude=" + startLongitude + "&end_latitude=" + endLatitude + "&end_longitude=" + endLongitude + "&server_token=CYeYg4Brhv5cRtRYESfcC9iRKG9TCDCfZhxASEaS";

  

//Function for Uber AJAX Prices
function uberTestPrice() {

    jQuery.ajax({
                type: "GET",
                url: queryURLPrice, 
                crossDomain: true,
                beforeSend: setHeader, 
                 
    
            }).then(function(response){
                console.log(response);
    
                //Looping through all the prices objects
                for ( var i = 0; i < response.prices.length; i++){
                
                
                console.log(response.prices[i].low_estimate);
    
                }
            });
    
    }
    //Function calling the Uber ETA for Times
    function uberTestETA() {
    
    jQuery.ajax({
                type: "GET",
                url: queryURLETA, 
                crossDomain: true,
                beforeSend: setHeader, 
                 
    
            }).then(function(response){
                console.log(response);
    
                 //Looping through all the ETA objects
                 for ( var i = 0; i < response.times.length; i++){
                    console.log(response.times[i].estimate);
                 }
            });
    
    }
    //Function to set the header for the authorization key
    function setHeader(xhr) {
    
        database.ref().on("value", function(snapshot){
          var token = (snapshot.val().Uber.UberKey);
    
          xhr.setRequestHeader("Authorization", + token);
          xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    
        })
    }
    
    //Calling the function
    uberTestPrice();
    uberTestETA();
