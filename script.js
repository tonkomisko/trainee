function toCelsius(fahrenheit) {
    return (5/9) * (fahrenheit-32);
  }
  document.getElementById("demo").innerHTML = toCelsius(100);

  $(document).ready(function(){
    $('#yellow').click(function () { 
        $('body').css("background", "yellow");
        
    });

    $('#white').click(function () { 
        $('body').css("background", "white");
        
    });

    $('#default').click(function () { 
      $('body').css("background", "chartreuse");
      
  });

});