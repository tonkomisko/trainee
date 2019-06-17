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

  $("#p-tag").on("click", ".p-class", function () {
    var text_alert = $(this).text();
    $("#alert_1").show('fade');
    debugger;
    $('.msgAlert').text(text_alert);
    $('#myModal').modal('show');
  });

  $('#linkClose').click(function () {
    var str = $('.msgAlert').text();

    $('#alert_1').hide('fade');
    // $('#msgAlert').replace(str,'');
  })



  // btn modal

  $('#btnShow').click(function () {
    $('#myModal').modal('show');

  });

  $('#btnHide').click(function () {
    $('#myModal').modal('hide');

  });


  function sortTableData(data,field,way) {
    // var outputData = [];
    debugger;
    if (way = 'asc') {
      return data.sort((a,b) => (a[field] > b[field]) ? 1 : -1);
    } else if (way = 'desc') {
      return data.sort((a,b) => (a[field] < b[field]) ? 1 : -1);
    }
    // return outputData;
  };
  // table


  var tableData = [
    { id: 1, name: 'John', lastName: 'Doe', email: 'john@example.com	', age: 25324532 },
    { id: 2, name: 'Mary', lastName: 'Moe', email: 'mary@example.com	', age: 25324532 },
    { id: 3, name: 'July', lastName: 'Dooley', email: 'john@example.com	', age: 25324532 }
  ];
  console.log(tableData);
  // var res = sortTableData(tableData,fieldID,"desc");
  debugger;
  // console.log(res);
  var allFields = "";
  
  function renderTable() {
    debugger;
    allFields = "";
  
  for (var i = 0; i < tableData.length; i++) {
    var idField = "<td>" + tableData[i]["id"] + "</td>";
    var nameField = "<td>" + tableData[i]["name"] + "</td>";
    var lastNameField = "<td>" + tableData[i]["lastName"] + "</td>";
    var emailField = "<td>" + tableData[i]["email"] + "</td>";
    var ageField = "<td>" + tableData[i]["age"] + "</td>";
    allFields = allFields + "<tr>" + idField + nameField + lastNameField + emailField + ageField + "</tr>";

  // $('#data_table').append("<tr>" + idField + nameField + lastNameField + emailField + ageField + "</tr>");
  };
  $('#data_table tbody').html(allFields);
}

renderTable();

  debugger;
  // $('#data_table tbody').html(allFields);

  $('#data_table th').click(function(){
    var fieldID = $(this).attr('id');
    debugger;
    var res = sortTableData(tableData,fieldID,"asc");
    renderTable();
  });
});