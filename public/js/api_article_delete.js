window.addEventListener( "load", function () {
    function sendData() {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const FD = new FormData( form );

        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
            console.log('I\'ll show you the response text.');
            console.log(event.target.responseText);
            alert( event.target.responseText );
        } );

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
            alert( 'Oops! Something went wrong.' );
        } );

        // Set up our request
        XHR.open( "DELETE", '/api/articles' );

        // The data provided by the form
        XHR.send( FD );
    }

    // Access the form element...
    const form = document.getElementById( "delete-request" );

    // ...and take over its submit event.
    form.addEventListener( "submit", function ( event ) {

        console.log('I am about to send Data or to \'prevent default\'.');
        event.preventDefault();

        sendData();
        console.log('Data was send!');
    } );

} );
