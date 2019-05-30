function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
document.getElementById("demo").innerHTML = toCelsius(100);

function getWidth(a) {
  debugger;
  console.log(a);
  var aval = $(a).css("width");
}

$(document).ready(function () {
  $('#yellow').click(function () {
    $('body').css("background", "yellow");
    debugger;
    // var bigger = 2 * getWidth(this);
    var bigger = 2 * $(this).width();
    $(this).css({"background": "yellow", "color": "red", "width": bigger});
    // $(this).width(bigger);

  });

  $('#white').click(function () {
    $('body').css("background", "white");

  });

  $('#default').click(function () {
    $('body').css("background", "chartreuse");

  });

});