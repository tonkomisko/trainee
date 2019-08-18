$(document).ready(function(){
    $("#add").click(function(){
        var newListItem = $("#things").val();
        if(newListItem.length<2){ return false; }
            $("#todolist").append("<li>" + newListItem + "</li>");
            $("#things").val("");
        }
    });

    $('#add').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            alert('Enter pressed: Submitting the form....');
        }
    });

});