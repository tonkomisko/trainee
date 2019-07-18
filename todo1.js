function triggerChange(id) {
    debugger;
    console.log("trigger element by id ", id);
    var filterItem = $("#" + id).val().trim().replace(/\s\s+/g, ' ');
    console.log(filterItem);
    var pa = getPassedArray(tableData, filterItem);
    renderTable(pa);
};

function getPassedArray (inArray, inSubStr) {
    debugger;
    var outArr = [];
    for (var i = 0; i < inArray.length; i++) {
        // if (tableData[i]["id"] > max) { max = tableData[i]["id"]; }
        if (inArray[i]["title"].toLowerCase().indexOf(inSubStr.toLowerCase()) > -1 ) {
            outArr.push(inArray[i]);
        }
    }
    return outArr;

}


function pasteFunction(event) {
    debugger;
    console.log("pasted");
    setTimeout(function () {
        triggerChange(event.id);
    }, 0);
}

var tableData = [
    { id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' },
    { id: '5', title: 'Mary-a', action: 'Delete', actionTwo: 'Edit' },
    { id: '02', title: 'July Augustine', action: 'Delete', actionTwo: 'Edit' }
];

function renderTable(inTable) {
    allFields = "";

    for (var i = 0; i < inTable.length; i++) {
        var idField = "<td>" + "<input type='checkbox' name='delCheckbox' class= 'del-checkbox'>" + inTable[i]["id"] + "</td>";
        var titleField = "<td>" + "<span>" + inTable[i]["title"] + "</span>"
            + "<input class='hidden editTitle' type='text' name='editTitle'  value='" + inTable[i]["title"] + "'>" +
            "</td>";

        var actionField = "<td>"
            + "<button type='button' class='btn btn-danger delete-cls'>" + inTable[i]["action"] + "</button>"
            + "<button type='button' class='btn btn-primary edit-cls'>" + inTable[i]["actionTwo"] + "</button>" + "</td>";
        allFields = allFields + "<tr id='" + inTable[i]["id"] + "'>" + idField + titleField + actionField + "</tr>";
    };

    $('#data_table tbody').html(allFields);
}

$(document).ready(function () {    

    var gWay = 'asc';
    var fieldID = 'id';

    unifyIDNumbers();

    function showTopBottomButtons() {
        
        var numOfRows = $("#data_table tbody tr").length;
        if (numOfRows < 15) {
            $("#lower-button").hide();
            $("#upper-button").hide();
        } else if (numOfRows > 15) {
            $("#lower-button").fadeIn();
            $("#upper-button").fadeIn();
        }


    };

    function showHideDeleteAll() {
        if (isSomethingChecked()) {
            $("#delSel").show();
        } else {
            $("#delSel").hide();
        }
        
    };

    function enableDisableShowSelected() {
        
        if (isSomethingChecked()) {
            $("#showSel").removeAttr('disabled');
        } else {
            $("#showSel").attr('disabled', true);
        }
    };





    function isScrolledIntoView(elem) {

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };


    

    showTopBottomButtons();
    showHideDeleteAll();
    enableDisableShowSelected();
    if (isScrolledIntoView("#selectAll") == false) {
       
        $("#lower-button").fadeIn();
        $("#upper-button").fadeIn();
    } else if (isScrolledIntoView("#selectAll") == true) {
        $("#lower-button").hide();
        $("#upper-button").hide();
    };
    


    setTimeout(function () {
        processDropdown('select#dropDown');
    }, 0);





    function maxID() {
        var max = 0;

        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] > max) { max = tableData[i]["id"]; }
        }

        return max;
    }

    function unifyNumbers(num) {
        return Number(num);
    }

    function unifyIDNumbers() {

        for (var i = 0; i < tableData.length; i++) {
            tableData[i]["id"] = unifyNumbers(tableData[i]["id"]);
        }
    }

    // function renderTable(inTable) {
    //     allFields = "";

    //     for (var i = 0; i < inTable.length; i++) {
    //         var idField = "<td>" + "<input type='checkbox' name='delCheckbox' class= 'del-checkbox'>" + inTable[i]["id"] + "</td>";
    //         var titleField = "<td>" + "<span>" + inTable[i]["title"] + "</span>"
    //             + "<input class='hidden editTitle' type='text' name='editTitle'  value='" + inTable[i]["title"] + "'>" +
    //             "</td>";

    //         var actionField = "<td>"
    //             + "<button type='button' class='btn btn-danger delete-cls'>" + inTable[i]["action"] + "</button>"
    //             + "<button type='button' class='btn btn-primary edit-cls'>" + inTable[i]["actionTwo"] + "</button>" + "</td>";
    //         allFields = allFields + "<tr id='" + inTable[i]["id"] + "'>" + idField + titleField + actionField + "</tr>";
    //     };

    //     $('#data_table tbody').html(allFields);
    // }

    sortTableData(tableData, fieldID, gWay);
    renderTable(tableData);

    // check if the input is empty and show a modal window. If input is not empty, add the input to the array, and display the new appended table
    $('#add').click(function () {

        var newTitle = $('#item').val();
        if (newTitle == "" || newTitle == undefined) {
            $('#myModal').modal('show');
        } else {

            if (fieldID == 'id') {
                if (gWay == 'desc') {
                    tableData.unshift({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
                } else if (gWay == 'asc') {
                    tableData.push({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
                }
            } else if (fieldID == 'title') {
                tableData.push({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
                sortTableData(tableData, fieldID, gWay);
            }

            $('#item').val('');
            renderTable(tableData);
            isScrolledIntoView(elem);
        }


    });
    //sort the table
    function sortTableData(data, field, way) {

        if (way == 'asc') {
            if (field == 'id' || field == 'action') {
                return data.sort((a, b) => (a[field] > b[field]) ? 1 : -1);
            } else if (field == 'title') {
                return data.sort((a, b) => (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : -1);
            }

        } else if (way == 'desc') {
            if (field == 'id' || field == 'action') {
                return data.sort((a, b) => (a[field] < b[field]) ? 1 : -1);
            } else if (field == 'title') {
                return data.sort((a, b) => (a[field].toLowerCase() < b[field].toLowerCase()) ? 1 : -1);
            }

        }
    };
    // sort the table when clicking on the header column names, when clicking again, sort back
    $('#data_table th').click(function () {
        fieldID = $(this).attr('id');


        if (gWay == '' || gWay == 'desc') {
            gWay = 'asc';
        } else {
            gWay = 'desc';
        }

        sortTableData(tableData, fieldID, gWay);
        renderTable(tableData);
    });


    $(document).on('click', '.delete-cls', function () {

        var clickID = $(this).closest('tr').attr('id');
        deleteItem(clickID);
        renderTable(tableData);
    });

    $(document).on('click', '.edit-cls', function () {

        var clickID = $(this).closest('tr').attr('id');
        $(this).toggleClass("btn-primary btn-success");
        $(this).text('Save');

        var $span = $(this).closest('tr').find('span');
        var $input = $(this).closest('tr').find('input.editTitle');
        $span.toggleClass("hidden");
        $input.toggleClass("hidden");

        if ($input.hasClass("hidden")) {
            editItem(clickID, $input.val());
        }

    });

    function testSave(id, value) {
        console.log(id, value);
    }

    function editItem(id, newValTitle) {
        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] == id) {
                tableData[i]["title"] = newValTitle;
            }
        }
        renderTable(tableData);
    }


    function deleteItem(id) {

        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] == id) {
                tableData.splice(i, 1);
            }
        }
    }



    $(document).on('click', '#selectAll', function () {

        var isAllChecked = $(this).prop('checked');

        $("#data_table tbody tr input.del-checkbox").prop("checked", isAllChecked);
        showHideDeleteAll();
        enableDisableShowSelected();
        // enableDisableDropDown();



    });

    function getChecked() {
        
        var res = [];
        var rr = $("#data_table tbody tr input.del-checkbox").prop("checked");
        // var chkBox = $("#data_table tbody tr input.del-checkbox");
        var checkboxChecked = $("#data_table tbody tr input.del-checkbox:checked").closest('tr');
        for (var i = 0; i < checkboxChecked.length; i++) {
            res.push($(checkboxChecked[i]).attr('id'));
        }
        return res;
    }

    $('#delSel').click(function () {
        
        var iter = getChecked();

        for (var i = 0; i < iter.length; i++) {
            deleteItem(iter[i]);
        }
        renderTable(tableData);
        showHideDeleteAll();
        enableDisableShowSelected();
        isScrolledIntoView(elem);
        // enableDisableDropDown();
    });
    
   
    




    function isSomethingChecked() {
        
        var checkedOrNot = $("#data_table tbody tr input.del-checkbox:checked").length;
        if (checkedOrNot > 0) {
            return true;
        } else {
            return false;
        }
        // return $("#data_table tbody tr input.del-checkbox:checked").length > 0 ? true : false;
    }

    $(document).on('click', '.del-checkbox', function () {
        showHideDeleteAll();
        enableDisableShowSelected();
        // enableDisableDropDown();

    });

    var shownSelected = false;

    $('#showSel').click(function () {
        if (shownSelected == false) {
            $("#data_table tbody tr input.del-checkbox").not(':checked').closest('tr').hide();
            $(this).text('Show All');
            shownSelected = true;
        } else if (shownSelected == true) {
            $("#data_table tbody tr input.del-checkbox").not(':checked').closest('tr').show();
            $(this).text('Show Selected');
            shownSelected = false;
        }


    });



    $('select#dropDown').on('change', function () {

        // debugger;
        processDropdown(this);
        

    });

    function processDropdown(scopeD) {
        // debugger;
        var selectValue = $(scopeD).val();

        if (selectValue == 'showChecked') {
            $("#data_table tbody tr input.del-checkbox").not(':checked').closest('tr').hide();
            $("#data_table tbody tr input.del-checkbox:checked").closest('tr').show();
        } else if (selectValue == 'showUnchecked') {
            $("#data_table tbody tr input.del-checkbox").not(':checked').closest('tr').show();
            $("#data_table tbody tr input.del-checkbox:checked").closest('tr').hide();
        } else if (selectValue == 'showAll') {
            $("#data_table tbody tr input.del-checkbox").closest('tr').show();
        }
    }

    $("#filter-item").on('keyup', function (e) {
        // e.type is the type of event fired
        // debugger;
        // 
        triggerChange($(this).attr("id"));
    });




});