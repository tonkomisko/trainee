// function toCelsius(fahrenheit) {
//   return (5 / 9) * (fahrenheit - 32);
// }
// document.getElementById("demo").innerHTML = toCelsius(100);

function getWidth(a) {
  return $(a).css("width");
}

function setDoubleWidth(b) {
  return parseInt(getWidth(b), 10) * 2 + "px";
}

function setTripleWidth(c) {
  return parseInt(c, 10) * 3;
}

$(document).ready(function () {
  var origWidth = getWidth('#yellow');
  $('#yellow').click(function () {
    // var origWidth = getWidth(this);
    $('body').css("background", "yellow");
    debugger;
    getWidth(this);
    // var bigger = 2 * getWidth(this);
    // var bigger = 2 * $(this).width();
    $(this).css({"background": "yellow", "color": "red"});
    $(this).css({"width": setDoubleWidth(this)});

    // $(this).width(bigger);

  });

  $('#white').click(function () {
    $('body').css("background", "white");
    $('#yellow').width(setTripleWidth(origWidth));
  });

  $('#default').click(function () {
    $('body').css("background", "chartreuse");
    $('#yellow').width(origWidth).css({"background": "buttonface", "color": "buttontext"});    

  });

});