
/**
 * @function deleteItem
 * @param {number} id - id of a row in the data table
 * @param {object} inTable - input table
 */
export function deleteItem(id, inTable) {

    for (var i = 0; i < inTable.length; i++) {
        if (inTable[i]["id"] == id) {
            inTable.splice(i, 1);
        }
    }
}

/**
 * @function triggerChange
 * @param {id}
 * filters id and related text field based on the input in the filter field
 */
export function triggerChange(id, inTable) {

    console.log("trigger element by id ", id);
    var filterItem = $("#" + id).val().trim().replace(/\s\s+/g, ' ');
    console.log(filterItem);
    var pa = getPassedArray(inTable, filterItem);
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
 * @function renderTable
 */

export function renderTable(inTable) {
    var allFields = "";

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
 * @function pasteFunction
 * @param {event}
 */
function pasteFunction(event) {

    console.log("pasted");
    setTimeout(function () {
        triggerChange(event.id, tableData);
    }, 0);
}

/**
 * @function processDropdown
 * display table rows based on checked/not checked value
 */

export function processDropdown(scopeD) {
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
export function getChecked() {

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
 * @function editItem
 * @param {number} id
 * @param {string} newValTitle - edited  title value
 * @param {object} inTable - input table 
 */
export function editItem(id, newValTitle, inTable) {

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
export function showTopBottomButtons() {

    var numOfRows = $("#data_table tbody tr").length;
    if (numOfRows < 15) {
        $("#lower-button").hide();
        $("#upper-button").hide();
    } else if (numOfRows > 15) {
        $("#lower-button").fadeIn();
        $("#upper-button").fadeIn();
    }


}

/**
* @function showHideDeleteAll
*/
export function showHideDeleteAll() {
    if (isSomethingChecked()) {
        $("#delSel").show();
    } else {
        $("#delSel").hide();
    }

}

/**
* @function enableDisableShowSelected
*/
export function enableDisableShowSelected() {

    if (isSomethingChecked()) {
        $("#showSel").removeAttr('disabled');
    } else {
        $("#showSel").attr('disabled', true);
    }
}

/**
* @function isScrolledIntoView
* @param {string} elem - string selector - check if the string selector is visible - 
*/
export function isScrolledIntoView(elem) {

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

/**
 * @function maxID
 */
export function maxID(inTable) {
    var max = 0;

    for (var i = 0; i < inTable.length; i++) {
        if (inTable[i]["id"] > max) { max = inTable[i]["id"]; }
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
export function unifyIDNumbers(inTable) {

    for (var i = 0; i < inTable.length; i++) {
        inTable[i]["id"] = unifyNumbers(inTable[i]["id"]);
    }
}

/**
 * @function sortTableData
 * @param {object} data - data table
 * @param {number} field - field from the input table
 * @param {string} way - ascending or descending
 */
export function sortTableData(data, field, way) {

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
}

export function showLogin() {
    $('#todo_page').hide();
    $('#login_page').show();
}

export function showToDo() {
    $('#todo_page').show();
    $('#login_page').hide();
}


