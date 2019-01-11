
var position = [38.899154, -94.726126];

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);

    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);

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