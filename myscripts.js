
function toCelsius(f) {
 debugger;
  return (5/9) * (f-32);
}
document.getElementById("demo").innerHTML = toCelsius(77);

function myCoolFunction() {
// debugger;
  document.getElementById("test_2").innerHTML = "I've just been modified.";
  document.getElementById("test_2").style.color = "orange";
  document.getElementById("test_2").style.background = "white";
}

// $(document).ready(function(){
  // $.toCelsius(f) = function(){
    // debugger;
    //  return (5/9) * (f-32);
  //  }
  // $("#demo").html(this.toCelsius(77));

// }
// )
