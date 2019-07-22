/** 
 Initial data definition into todo list
 @var {tableData}
*/
var tableData = [
    { id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' },
    { id: '5', title: 'Mary-a', action: 'Delete', actionTwo: 'Edit' },
    { id: '02', title: 'July Augustine', action: 'Delete', actionTwo: 'Edit' }
];

/**
 * @function triggerChange
 * @param {id}
 * filters id and related text field based on the input in the filter field
 */
function triggerChange(id) {

    console.log("trigger element by id ", id);
    var filterItem = $("#" + id).val().trim().replace(/\s\s+/g, ' ');
    console.log(filterItem);
    var pa = getPassedArray(tableData, filterItem);
    renderTable(pa);
}

/**
 * @function getPassedArray
 * @param {object} inArray - input array
 * @param {string} inSubstr - part of a title string 
 */
function getPassedArray(inArray, inSubStr) {

    var outArr = [];
    for (var i = 0; i < inArray.length; i++) {
        // if (tableData[i]["id"] > max) { max = tableData[i]["id"]; }
        if (inArray[i]["title"].toLowerCase().indexOf(inSubStr.toLowerCase()) > -1) {
            outArr.push(inArray[i]);
        }
    }
    return outArr;

}

/**
 * @function pasteFunction
 * @param {event}
 */
function pasteFunction(event) {

    console.log("pasted");
    setTimeout(function () {
        triggerChange(event.id);
    }, 0);
}

/**
 * @function renderTable
 */
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

/**
 * @function processDropdown
 * display table rows based on checked/not checked value
 */
function processDropdown(scopeD) {
    // 
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


/**
 * @function isSomethingChecked
 * 
 */
function isSomethingChecked() {

    var checkedOrNot = $("#data_table tbody tr input.del-checkbox:checked").length;
    if (checkedOrNot > 0) {
        return true;
    } else {
        return false;
    }
    // return $("#data_table tbody tr input.del-checkbox:checked").length > 0 ? true : false;
}


/**
 * @function getChecked
 */
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


/**
 * @function deleteItem
 * @param {number} id - id of a row in the data table
 * @param {object} inTable - input table
 */
function deleteItem(id,inTable) {

    for (var i = 0; i < inTable.length; i++) {
        if (inTable[i]["id"] == id) {
            inTable.splice(i, 1);
        }
    }
}


/**
 * @function editItem
 * @param {number} id
 * @param {string} newValTitle - edited  title value
 * @param {object} inTable - input table 
 */
function editItem(id, newValTitle, inTable) {
   
    for (var i = 0; i < inTable.length; i++) {
        if (inTable[i]["id"] == id) {
            inTable[i]["title"] = newValTitle;
        }
    }
    renderTable(inTable);
}


/**
 * @function showTopBottomButtons
 * 
 */
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

/**
* @function showHideDeleteAll
*/
function showHideDeleteAll() {
    if (isSomethingChecked()) {
        $("#delSel").show();
    } else {
        $("#delSel").hide();
    }

};

/**
* @function enableDisableShowSelected
*/
function enableDisableShowSelected() {

    if (isSomethingChecked()) {
        $("#showSel").removeAttr('disabled');
    } else {
        $("#showSel").attr('disabled', true);
    }
};


/**
* @function isScrolledIntoView
* @param {string} elem - string selector - check if the string selector is visible - 
*/
function isScrolledIntoView(elem) {

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};



/**
 * @function maxID
 */
function maxID() {
    var max = 0;

    for (var i = 0; i < tableData.length; i++) {
        if (tableData[i]["id"] > max) { max = tableData[i]["id"]; }
    }

    return max;
}

/**
* @function unifyNumbers
* @param {number} num
*/
function unifyNumbers(num) {
    return Number(num);
}

/**
* @function unifyIDNumbers
*/
function unifyIDNumbers() {

    for (var i = 0; i < tableData.length; i++) {
        tableData[i]["id"] = unifyNumbers(tableData[i]["id"]);
    }
}


/**
 * @function sortTableData
 * @param {object} data - data table
 * @param {number} field - field from the input table
 * @param {string} way - ascending or descending
 */
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



$(document).ready(function () {

    var gWay = 'asc';
    var fieldID = 'id';

    unifyIDNumbers();
    showTopBottomButtons();
    showHideDeleteAll();
    enableDisableShowSelected();
    sortTableData(tableData, fieldID, gWay);

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
            if (isScrolledIntoView("#selectAll") == false) {

                $("#lower-button").fadeIn();
                $("#upper-button").fadeIn();
            } else if (isScrolledIntoView("#selectAll") == true) {
                $("#lower-button").hide();
                $("#upper-button").hide();
            };


        }
    });



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
        deleteItem(clickID,tableData);
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
            editItem(clickID, $input.val(),tableData);
        }

    });

   

    $(document).on('click', '#selectAll', function () {

        var isAllChecked = $(this).prop('checked');

        $("#data_table tbody tr input.del-checkbox").prop("checked", isAllChecked);
        showHideDeleteAll();
        enableDisableShowSelected();

    });


    $('#delSel').click(function () {

        var iter = getChecked();

        for (var i = 0; i < iter.length; i++) {
            deleteItem(iter[i], tableData);
        }
        renderTable(tableData);
        showHideDeleteAll();
        enableDisableShowSelected();
        if (isScrolledIntoView("#selectAll") == false) {

            $("#lower-button").fadeIn();
            $("#upper-button").fadeIn();
        } else if (isScrolledIntoView("#selectAll") == true) {
            $("#lower-button").hide();
            $("#upper-button").hide();
        };

    });

    $(document).on('click', '.del-checkbox', function () {
        showHideDeleteAll();
        enableDisableShowSelected();
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
        processDropdown(this);
    });

    $("#filter-item").on('keyup', function (e) {
        triggerChange($(this).attr("id"));
    });

});