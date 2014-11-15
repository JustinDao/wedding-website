$(document).ready(function() {
  $("#prev").click(function(){
    var background = $("body").css('background-image');
    var start = background.indexOf("kfv/") + 4;
    var end = background.length - 1;
    var picture_path = background.substring(start, end);
    var num  = parseInt(picture_path.match(/\d+/)[0]);
    var new_num = num - 1;

    if(new_num == 0)
    {
      new_num = 34;
    }

    $("body").css('background-image', 'url(../kfv/KFV' + new_num + '.jpg)');
  });

  $("#next").click(function(){
    var background = $("body").css('background-image');
    var start = background.indexOf("kfv/") + 4;
    var end = background.length - 1;
    var picture_path = background.substring(start, end);
    var num  = parseInt(picture_path.match(/\d+/)[0]);
    var new_num = num + 1;

    if(new_num == 35)
    {
      new_num = 1;
    }

    $("body").css('background-image', 'url(../kfv/KFV' + new_num + '.jpg)');
  });
});