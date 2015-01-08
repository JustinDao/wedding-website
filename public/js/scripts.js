$(document).ready(function() {
  // http://stackoverflow.com/questions/18153745/bootstrap-3-hide-dropdown-menu-on-menu-item-click
  $(".navbar li a").click(function(event) {
    $(".navbar-collapse").removeClass("in").addClass("collapse");
  });

  // http://markdalgleish.com/2012/10/mobile-parallax-with-stellar-js/
  var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

  if (isMobileWebkit) {
    $('html').addClass('mobile');
  }

  $(function(){
    // only show parallax on non-mobile
    if (!isMobileWebkit) {
      $.stellar({
        horizontalScrolling: false,
        responsive: true,
      });
    }
  });
 
  var slider = $('.gallery-wrapper').slick({
    autoplay: true,
    dots: true,
  });

  var pswpElement = document.querySelectorAll('.pswp')[0];

  $(".gallery-link").click(function(e) {
    e.preventDefault();

    var thisImage = $(this);
    var count = 0;
    var items = [];

    $(".gallery-link").each(function(i, val) {
      if ($(this).parent().parent().hasClass('slick-cloned')) {
        // http://api.jquery.com/jquery.each/
        return true; //same as continue
      }

      // http://stackoverflow.com/questions/2639070/get-the-full-uri-from-the-href-property-of-a-link
      if (val.href == thisImage.get(0).href) {
        index = count;
      }
      else {
        count += 1;
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
        index: index,
        bgOpacity: 0.5,
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

    // https://github.com/kenwheeler/slick/issues/731
    slider.slickPause();
    slider.find('.slick-list').off('mouseleave.slick');

    gallery.listen('close', function() { 
      slider.slickPlay();
      slider.find('.slick-list').on('mouseleave.slick', function() {
        slider.slickPlay();
      });
    });

    gallery.init();   

  });

  function slideShow(pswp) {
    pswp.next();
    setTimeout(slideShow(pswp), 5000);
  }

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