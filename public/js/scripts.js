$(document).ready(function() {

  $.stellar({
    horizontalScrolling: false,
    responsive: true,
  });

  // $(".jump-anchor").click(function(e) {
  //   e.preventDefault();
  //   console.log($(this).attr('href'));
  //   $('body').scrollTo($(this).attr('href'));
  // });

  function initialize() {
    var mapCanvas = document.getElementById('map_canvas');

    var mapOptions = {
      center: new google.maps.LatLng(38.062358, -78.728313),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(38.062358, -78.728313),
      map: map
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
});