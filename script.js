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

// function carChange () {
//   debugger;
//   var car = document.getElementById("cars").value;
//   document.getElementById("message").innerText = "You selected " + car;
// }

$(document).ready(function () {
  var origWidth = getWidth('#yellow');
  $('#yellow').click(function () {
    // var origWidth = getWidth(this);
    $('body').css("background", "yellow");
    debugger;
    getWidth(this);
    // var bigger = 2 * getWidth(this);
    // var bigger = 2 * $(this).width();
    $(this).css({ "background": "yellow", "color": "red" });
    $(this).css({ "width": setDoubleWidth(this) });

    // $(this).width(bigger);

  });

  $('#cars').change(function () {
    // var car = $(this).children("option:selected").val();
    var car = $(this).val();
    $('#message').text("You selected " + car);
  });


  function method1() {
    var num = $('#sel1').val();
    $("#p-tag .p-class").remove();
    for (var i = 0; i < num; i++) {
      var pi = i + 1;
      $("#p-tag").append("<p class='p-class'>" + pi + " text</p>");
    }

    // setTimeout(function () { 
    //   $(".p-class").addClass("dd-class"); 
    // }, 5000);
  }


  method1();


  $('#sel1').change(function () {
    method1();
  });

  $('#deletion').click(function () {
    $("#p-tag").empty();
  });



  $('#white').click(function () {
    $('body').css("background", "white");
    $('#yellow').width(setTripleWidth(origWidth));
  });

  $('#default').click(function () {
    $('body').css("background", "chartreuse");
    $('#yellow').width(origWidth).css({ "background": "buttonface", "color": "buttontext" });
  });

  $("#p-tag").on("click", ".p-class", function() {
    var text_alert = $(this).text();
    $("#alert_1").show('fade');
    debugger;
    $('#msgAlert').text(text_alert);
  });

  $('#linkClose').click(function () {
    var str = $('#msgAlert').text();
    
    $('#alert_1').hide('fade');
    // $('#msgAlert').replace(str,'');
  })

});