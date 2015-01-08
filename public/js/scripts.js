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

  // var pswpElement = document.querySelectorAll('.pswp')[0];

  // // build items array
  // var items = [
  //     {
  //         src: 'https://placekitten.com/600/405',
  //         w: 600,
  //         h: 400
  //     },
  //     {
  //         src: 'https://placekitten.com/1200/900',
  //         w: 1200,
  //         h: 900
  //     }
  // ];

  // // define options (if needed)
  // var options = {
  //     // optionName: 'option value'
  //     // for example:
  //     index: 0 // start at first slide
  // };

  // // Initializes and opens PhotoSwipe
  // var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  // gallery.init();

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