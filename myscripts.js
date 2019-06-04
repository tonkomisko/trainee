
function toCelsius(f) {
  debugger;
  return (5 / 9) * (f - 32);
}

function getWidth(a) {
  debugger;
  return $(a).css("width");

}

function setDoubleWidth(b) {
  debugger;
  return parseInt(getWidth(b), 10) * 2 + "px";
}

function setTripleWidth(c) {
  debugger;
  return parseInt(c, 10) * 3;

}
// document.getElementById("demo").innerHTML = toCelsius(77);

// function myCoolFunction() {
// // debugger;
//   document.getElementById("test_2").innerHTML = "I've just been modified.";
//   document.getElementById("test_2").style.color = "orange";
//   document.getElementById("test_2").style.background = "white";
// }
//jquery rewrite 
$(document).ready(function () {
  $("button#test_2").click(function () {
    var origin_width = getWidth(this);
    debugger;
    $(this).html("I've just been modified via jQuery.")
      .css({ "color": "orange", "background": "white", "width": "200px" });
    debugger;

    $(this).css({ "width": setDoubleWidth(this) });
    // $(this).width(parseInt(origin_width,10) * 3);  
    $(this).width(setTripleWidth(origin_width));
    
    // width: function( index, value ) {
    debugger;
    $(this).css({"width": setTripleWidth(origin_width) + "px"});
      
      
      // return parseFloat( new_width ) * 2;
    // },
    // debugger;
    // $(this).css("width:").val(aval * 2);
    // $(this).css({"color": "orange", "background": "white", "width": "200px"});
  });
});

// newFunction();

// $(document).ready(function(){
//   $("button").click(function(){
//     $("input:text").val("Glenn Quagmire");
//   });
// });


$(document).ready(function () {
  // debugger;
  $("#demo").click(function () {
    // debugger;
    $(this).html(toCelsius(77));
  });
});


