$(document).ready(function () {
    var tableData = [
        { id: 1, title: 'John', action: 'delete', actionTwo: 'edit' },
        { id: '5', title: 'Mary', action: 'delete', actionTwo: 'edit' },
        { id: '02', title: 'July', action: 'delete', actionTwo: 'edit' }
    ];

    var gWay = 'asc';
    var fieldID = 'id';

    unifyIDNumbers();

    function maxID() {
        var max = 0;

        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] > max) { max = tableData[i]["id"]; }
        }
        debugger;
        return max;
    }

    function unifyNumbers(num) {
        return Number(num);
    }

    function unifyIDNumbers() {
        debugger;
        for (var i = 0; i < tableData.length; i++) {
            tableData[i]["id"] = unifyNumbers(tableData[i]["id"]);
        }
    }

    function renderTable() {
        allFields = "";

        for (var i = 0; i < tableData.length; i++) {
            var idField = "<td>" + "<input type='checkbox' name='delCheckbox' class= 'del-checkbox'>" + tableData[i]["id"] + "</td>";
            var titleField = "<td>" + "<span>" + tableData[i]["title"] + "</span>"
                + "<input class='hidden editTitle' type='text' name='editTitle'  value='" + tableData[i]["title"] + "'>" +
                "</td>";

            var actionField = "<td>"
                + "<button type='button' class='btn btn-danger delete-cls'>" + tableData[i]["action"] + "</button>"
                + "<button type='button' class='btn btn-primary edit-cls'>" + tableData[i]["actionTwo"] + "</button>" + "</td>";
            allFields = allFields + "<tr id='" + tableData[i]["id"] + "'>" + idField + titleField + actionField + "</tr>";
        };
        debugger;
        $('#data_table tbody').html(allFields);
    }

    sortTableData(tableData, fieldID, gWay);
    renderTable();

    // check if the input is empty and show a modal window. If input is not empty, add the input to the array, and display the new appended table
    $('#add').click(function () {
        debugger;
        var newTitle = $('#item').val();
        if (newTitle == "" || newTitle == undefined) {
            $('#myModal').modal('show');
        } else {
            debugger;
            if (fieldID == 'id') {
                if (gWay == 'desc') {
                    tableData.unshift({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'edit' });
                } else if (gWay == 'asc') {
                    tableData.push({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'edit' });
                }
            } else if (fieldID == 'title') {
                tableData.push({ id: maxID() + 1, title: newTitle, action: 'delete', actionTwo: 'edit' });
                sortTableData(tableData, fieldID, gWay);
            }

            $('#item').val('');
            renderTable();
        }


    });
    //sort the table
    function sortTableData(data, field, way) {
        debugger;
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
        debugger;

        if (gWay == '' || gWay == 'desc') {
            gWay = 'asc';
        } else {
            gWay = 'desc';
        }

        sortTableData(tableData, fieldID, gWay);
        renderTable();
    });


    $(document).on('click', '.delete-cls', function () {
        debugger;
        var clickID = $(this).closest('tr').attr('id');
        deleteItem(clickID);
    });

    $(document).on('click', '.edit-cls', function () {
        debugger;
        var clickID = $(this).closest('tr').attr('id');
        $(this).toggleClass("btn-primary btn-success");

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
        renderTable();
    }


    function deleteItem(id) {
        debugger;
        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] == id) {
                tableData.splice(i, 1);
            }
        }
        renderTable();
    }



    $(document).on('click', '#delAll', function () {
        debugger;
        var isAllChecked = $(this).prop('checked');
        var table_tr = $("#data_table tbody tr");
        
        $("#data_table tbody tr input.del-checkbox").prop("checked",isAllChecked);

                 

    });

});

