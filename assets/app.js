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
var map, infoWindow, pos, startLatitude, startLongitude, endLatitude, endLongitude;


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
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  map = new google.maps.Map(document.getElementById('googlemaps'), {
    center: { lat: 40, lng: -100 },
    zoom: 5,
    mapTypeId: 'roadmap'
  });
  directionsDisplay.setMap(map);

  infoWindow = new google.maps.InfoWindow;
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();


    places.forEach(function (place) {
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
      //console.log("newLat: " + place.geometry.location.lat());
      //console.log("newLng: " + place.geometry.location.lng());
      endLatitude = (place.geometry.location.lat());
      endLongitude = (place.geometry.location.lng());
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

    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var selectedMode = "DRIVING";
      directionsService.route({
        origin: {lat: startLatitude, lng: startLongitude},  // Current location
        destination: {lat: endLatitude, lng: endLongitude},  // Destination
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
          infoWindow.close();
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    };
  });

  // Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent("Your Location");
    infoWindow.open(map);
    map.setCenter(pos);
    startLatitude = (pos.lat);
    startLongitude = (pos.lng);
  }, function () {
    handleLocationError(true, infoWindow, map.getCenter());
  });

}

else {
  // Browser doesn’t support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}
}





// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         ‘Error: The Geolocation service failed.’ :
//                         ’Error: Your browser doesn\‘t support geolocation.’);
//   infoWindow.open(map);
// }

//UBER API info



//Calling the function when uber button is clicked
$(document).ready(function () {
  initAutocomplete();
  $("#uberBtn").click(function (e) {
    e.preventDefault();

    console.log("startLat: " + startLatitude);
    console.log("startLng: " + startLongitude);
    console.log("endLat: " + endLatitude);
    console.log("endLng: " + endLongitude);

    var queryURLETA = "https://api.uber.com/v1.2/estimates/time?start_latitude=" + startLatitude + "&start_longitude=" + startLongitude + "&end_latitude=" + endLatitude + "&end_longitude=" + endLongitude + "&server_token=CYeYg4Brhv5cRtRYESfcC9iRKG9TCDCfZhxASEaS";
    var queryURLPrice = "https://api.uber.com/v1.2/estimates/price?start_latitude=" + startLatitude + "&start_longitude=" + startLongitude + "&end_latitude=" + endLatitude + "&end_longitude=" + endLongitude + "&server_token=CYeYg4Brhv5cRtRYESfcC9iRKG9TCDCfZhxASEaS";
    // console.log("THis is the URL for ETA " + queryURLETA);


    jQuery.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    //Function for Uber AJAX Prices

    function uberTestPrice() {



      jQuery.ajax({
        type: "GET",
        url: queryURLPrice,
        crossDomain: true,
        //beforeSend: setHeader, 


      }).then(function (response) {
        console.log("Price");

        //Looping through all the prices objects
        for (var i = 0; i < response.prices.length; i++) {


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
        //beforeSend: setHeader, 


      }).then(function (response) {
        console.log("ETA");

        //Looping through all the ETA objects
        for (var i = 0; i < response.times.length; i++) {
          console.log(response.times[i].estimate);
        }
      });

    }

    //Function to set the header for the authorization key
    // function setHeader(xhr) {

    //Calling the function
    uberTestPrice();
    uberTestETA();

  });
});


// LYFT API and JS -------------------------------------------------------------------------------------

//store username and passcode
//



var bearerTK;
var authO;

$(document).on('click', '#lyftBtn', function () {
  event.preventDefault();
  costEstimate();
  rideETA();

});
//Lyft ajax method
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.lyft.com/oauth/token",
  "method": "POST",
  "headers": {
    "authorization": "Basic YzEzRFA2MVNUN2lnOk1MRVR3VVg1THFaNm1XMXhDRjl0elBvb0JSSThtT1lr",
    "content-type": "application/json"
  },
  "processData": false,
  "data": "{\"grant_type\": \"client_credentials\", \"scope\": \"public\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

// //ETA estimates for your ride
function rideETA() {
  var settings = {
    "async": true,
    "crossDomain": true,
    //uses google current location that was stored into lat and long variables
    "url": "https://api.lyft.com/v1/eta?lat=" + startLatitude + "&lng=" + startLongitude,
    "method": "GET",
    "headers": {
      "authorization": "Bearer OKDZrlmIJ/Lt2N6Fe67Rc6YA/7N2L+d1H5jY0hWFGHEew7icwqjeJGss9iTVlyrfJEIeNBF3QXuWNO7iNo16yRNwgBDZOINWgt/P/Ac+zY3AYCb4aAL/zM8="
    }
  };

  $.ajax(settings).then(function (response) {
    console.log(response);
    //code for pickup ETA
    console.log("ETA: " + response.eta_estimates[0].eta_seconds);
  });

};


//cost estimates for your ride
function costEstimate() {
  var settings = {
    "async": true,
    "crossDomain": true,
    //uses google current location that was stored into lat and long variables..... uses destination info from user input
    "url": "https://api.lyft.com/v1/cost?start_lat=" + startLatitude + "&start_lng=" + startLongitude + "&end_lat=" + endLatitude + "&end_lng=" + endLongitude,
    "method": "GET",
    "headers": {
      "authorization": "Bearer OKDZrlmIJ/Lt2N6Fe67Rc6YA/7N2L+d1H5jY0hWFGHEew7icwqjeJGss9iTVlyrfJEIeNBF3QXuWNO7iNo16yRNwgBDZOINWgt/P/Ac+zY3AYCb4aAL/zM8="
    }
  }

  $.ajax(settings).then(function (response) {
    console.log(response)
    //code for cost estimate range
    console.log("Cost range: " + response.cost_estimates[0].estimated_cost_cents_min + "-" + response.cost_estimates[0].estimated_cost_cents_max);

  });
};



//THIS IS A CODE TO REQUEST A NEW TOKEN
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.lyft.com/oauth/token",
//     "method": "POST",
//     "headers": {
//       "authorization": "Basic YzEzRFA2MVNUN2lnOktDQVc4WE51X3VBUWJCcjVJczRaZzhLOGNXZGNhRVpV",
//       "content-type": "application/json"
//     },
//     "data": "{\"grant_type\": \"refresh_token\", \"refresh_token\": <refresh_token>}"
//   }

//   $.ajax(settings).then(function (response) {
//     console.log(response);
//   });