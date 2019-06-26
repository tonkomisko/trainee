$(document).ready(function () {

    $("#things").keyup(function (evt) {
        console.log(evt.which)
    });

    $("#things").keyup(function (evt) {
        if (evt.which == 13) {
            var newListItem = $("#things").val();

            if (newListItem == '') {
                window.alert("Please, enter a task!");
            } else {
                var now = new Date($.now());
                var formatted = now.getDate() + ". " + (now.getMonth() + 1) + "., " + now.getHours() + ":" + now.getMinutes();
                var newRow = "<tr><td>1+</td><td>" + newListItem + "</td><td>  <button type= button class=editMe data-toggle=modal data-target= #myModal> Edit </button><input type=button class=removeMe onClick=$(this).closest('tr').remove(); value=Remove></td><td>" + formatted + "</td>"
                $("#table-body").append(newRow);
                $("#things").val("");

            }

        }

    });

    $("#add").click(function () {
        var newListItem = $("#things").val();

        if (newListItem == '') {
            window.alert("Please, enter something!");

        }
        else if (newListItem.length < 3) {
            return false;
        }
        else {

            var now = new Date($.now());
            var formatted = now.getDate() + ". " + (now.getMonth() + 1) + "., " + now.getHours() + ":" + now.getMinutes();
            var newRow = "<tr><td>1+</td><td>" + newListItem + "</td><td>  <button type= button class=editMe data-toggle=modal data-target= #myModal> Edit </button><input type=button class=removeMe onClick=$(this).closest('tr').remove(); value=Remove></td><td>" + formatted + "</td>"
            $("#table-body").append(newRow);
            $("#things").val("");
        }
    });


    //save the edits 

    $("#saveEdits").click(function () {
        var newEditItem = $("#taskEdits").val();

        if (newEditItem == '') {
            window.alert("Please, edit the task!");

        }
        else if (newEditItem.length < 3) {
            return false;
        }
        else {

            var now = new Date($.now());
            var formatted = now.getDate() + ". " + (now.getMonth() + 1) + "., " + now.getHours() + ":" + now.getMinutes();
            var newRow = "<tr><td>1+</td><td>" + newEditItem + "</td><td>  <button type= button class=editMe data-toggle=modal data-target= #myModal> Edit </button><input type=button class=removeMe onClick=$(this).closest('tr').remove(); value=Remove></td><td>" + formatted + "</td>"
            $("#table-body").append(newRow);
            $("#things").val("");
        }
    });


    $('.editMe').click(function () {
        $('#myModal').modal('show');

    });
    // $(".removeMe").click(function () {
    //     $(this).closest('tr')remove();
    // });

});


