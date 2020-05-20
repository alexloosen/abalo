"use strict";

// a simple xhr, which tries to delete an article...
function deleteArticle(id){
    const XHR_2 = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR_2.addEventListener( "load", function(event) {
        console.log('I\'ll show you the response text.');
        console.log(event.target.responseText);
        alert(event.target.responseText);
    } );

    // Define what happens in case of error
    XHR_2.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR_2.open( "DELETE", '/api/articles/' + id );
    let str = 'Trying to send (delete) [\'id\' => ' + id + ']';
    console.log(str);
    XHR_2.send();
}

