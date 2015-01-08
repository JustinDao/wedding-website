$(document).ready(function() {

  $.stellar({
    horizontalScrolling: false,
    responsive: true,
  });

  var pswpElement = document.querySelectorAll('.pswp')[0];

  $(".gallery-link").click(function(e) {
    e.preventDefault();

    var thisImage = $(this);
    var index = -1;
    var items = [];

    $(".gallery-link").each(function(i, val) {
      // http://stackoverflow.com/questions/2639070/get-the-full-uri-from-the-href-property-of-a-link
      if (val.href == thisImage.get(0).href) {
        index = i;
      }

      //http://stackoverflow.com/questions/8636857/get-the-width-of-an-image-specified-by-an-url-jquery
      var tmpImg = new Image();
      tmpImg.src = val.href;

      var width = val.dataset.width;
      var height = val.dataset.height;

      items.push({
        src: val.href,
        w: width,
        h: height,
      });      
    });
   
    // define options (if needed)
    var options = {
        index: index
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

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