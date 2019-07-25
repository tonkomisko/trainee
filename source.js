// import {$,jQuery} from 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js';

/** 
 Initial data definition into todo list
 @var {tableData}
*/

export const tableData = [{ "id": "21", "title": "Janko Hrasko", "action": "Delete", "actionTwo": "Edit" }];

export var loadDataM = $.getJSON('data.json', function(data, status) {
    if (status == "success"){
        console.log('status success');
    }else if (status == "timeout"){
        console.log('status timeout connection error');
    }else if (status == "error" || status == "parsererror" ){
        console.log('status error or parsing error');
    }else{
        console.log('status else');
    }    
    console.log('First call from source.js');
    tableData.push(...data);
 });

// export var jqxhr = $.getJSON( "data.json", function() {
//     console.log( "success" );
//   })
//     .done(function() {
//       console.log( "second success" );
//     })
//     .fail(function() {
//       console.log( "error" );
//     })
//     .always(function() {
//       console.log( "complete" );
//     });
  