
function toCelsius(f) {
  //  debugger;
  return (5 / 9) * (f - 32);
}

function getWidth(a) {
  debugger;
  console.log(a);
  var aval = $(a).css("width");
  return aval;

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
    $(this).html("I've just been modified via jQuery.")
      .css({ "color": "orange", "background": "white", "width": "200px" });
 
      getWidth(this);

      // $(this).css({"color": "orange", "background": "white", "width": "200px"});
  });
});

$(document).ready(function () {
  // debugger;
  $("#demo").click(function () {
    // debugger;
    $(this).html(toCelsius(77));

  });
});
