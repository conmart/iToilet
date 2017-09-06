console.log("app.js connected");

$(document).ready(function () {


console.log('jQuery connected');


  $('.modal').modal();

  function initMap() {
    console.log('initMap running');
    let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(37.78, -122.44),
        });
        console.log('end')
  }

  initMap();


  // end of document ready
})
