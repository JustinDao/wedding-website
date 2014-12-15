$(document).ready(function() {

  var minPicutreNum = 1;
  var maxPictureNum = 7;
  var timeToChange = 60000;

  setTimeout(changeBackground, timeToChange);

  var rand = getRandom(minPicutreNum, maxPictureNum);
  $("body:not(#body-login)").css('background-image', 'url(../kfv/KFV' + rand + '.jpg)');

  function changeBackground() {
    var background = $("body").css('background-image');
    var start = background.indexOf("kfv/") + 4;
    var end = background.length - 1;
    var picture_path = background.substring(start, end);
    var num  = parseInt(picture_path.match(/\d+/)[0]);
    var new_num = num;

    while(new_num == num)
    {
      new_num = getRandom(minPicutreNum, maxPictureNum);
    }

    $("body").css('background-image', 'url(../kfv/KFV' + new_num + '.jpg)');

    setTimeout(changeBackground, timeToChange)
  }

  // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
  function getRandom(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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