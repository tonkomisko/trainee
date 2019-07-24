import {tableData} from './source.js';
import {
    triggerChange,
    deleteItem,
    renderTable,
    processDropdown,
    getChecked,
    editItem,
    showTopBottomButtons,
    showHideDeleteAll,
    enableDisableShowSelected,
    isScrolledIntoView,
    maxID,
    unifyIDNumbers,
    sortTableData
} from './utilities.js';


$(document).ready(function () {

    var gWay = 'asc';
    var fieldID = 'id';

    unifyIDNumbers(tableData);
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
                    tableData.unshift({ id: maxID(tableData) + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
                } else if (gWay == 'asc') {
                    tableData.push({ id: maxID(tableData) + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
                }
            } else if (fieldID == 'title') {
                tableData.push({ id: maxID(tableData) + 1, title: newTitle, action: 'delete', actionTwo: 'Edit' });
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
        triggerChange($(this).attr("id"),tableData);
    });

});