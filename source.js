/** 
 Initial data definition into todo list
 @var {tableData}
*/
$.ajax({
    url: 'data.json',
    async: false,
    dataType: 'json',
    success: function (response) {
    debugger; 
    }
  });

export const tableData = [
    { id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' },
    { id: '5', title: 'Mary-a', action: 'Delete', actionTwo: 'Edit' },
    { id: '02', title: 'July Augustine', action: 'Delete', actionTwo: 'Edit' }
];



// $.getJSON('./data.json', function (data) {

//     debugger;
//     var something = data;
//     tableData.push({ id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' });
//     // tableData = data;
// }).done(function(){
//     debugger;
// });

export function loadResource(){
    debugger;
    // setTimeout(function () {
    //     tableData.push({ id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' });
    // }, 1000);
    
    return $.getJSON('./data.json', function (data) {

        debugger;
        var something = data;
        return tableData.push({ id: 1, title: 'John Jacob Astor', action: 'Delete', actionTwo: 'Edit' });
        // tableData = data;
    }).done(function(){
        debugger;
    });

};