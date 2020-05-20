"use strict";
if (document.getElementById('search') != null){
    let vm = new Vue({
        el: "#search",
        data: {
            value: 5,
            objects: [],
        },
        methods: {
            handleIt:function(event){
                let searchTerm = event.target.value;
                if (searchTerm.length > 3 ){
                    // objects leeren, damit nicht die Ergebnisse mehrerer Suchanfragen aufgelistet werden
                    vm.objects = [];
                    const XHR_2 = new XMLHttpRequest();

                    // Define what happens on successful data submission
                    XHR_2.addEventListener( "load", function(event) {
                        let result = event.target.responseText;
                        let data = JSON.parse(result).data;
                        for(let i = 0; i < data.length; i++){
                            vm.objects.push({
                                id: data[i].id,
                                ab_name: data[i].ab_name,
                                ab_price: data[i].ab_price,
                                ab_description: data[i].ab_description,
                                ab_creator_id: data[i].ab_creator_id,
                                ab_createdate: data[i].ab_createdate,
                            })
                        }
                        console.log('In objects sind jetzt folgende Daten enthalten (und werden angezeigt):')
                        console.log(vm.objects);
                    } );

                    // Define what happens in case of error
                    XHR_2.addEventListener( "error", function( event ) {
                        alert( 'Oops! Something went wrong.' );
                    } );

                    // Set up our request
                    XHR_2.open( "GET", '/api/articles/' + searchTerm );
                    let str_2 = 'Trying to send [\'search_term\' => ' + searchTerm + ']';
                    console.log(str_2);
                    XHR_2.send();
                }
            },
            deleteArticle:function(id) { deleteArticle(id);},
            addToCart:function(id) {addToCart(id);}
        }
    });

    const XHR_3 = new XMLHttpRequest();

// Define what happens on successful data submission
    XHR_3.addEventListener( "load", function(event) {
        console.log('I\'ll show you the response text to your articles request.');
        let result = event.target.responseText;
        let data = JSON.parse(result).data;
        for(let i = 0; i < data.length; i++){
            vm.objects.push({
                id: data[i].id,
                ab_name: data[i].ab_name,
                ab_price: data[i].ab_price,
                ab_description: data[i].ab_description,
                ab_creator_id: data[i].ab_creator_id,
                ab_createdate: data[i].ab_createdate,
            })
        }
        console.log('In objects sind jetzt folgende Daten enthalten (und werden angezeigt):')
        console.log(vm.objects);
    } );

// Define what happens in case of error
    XHR_3.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

// Set up our request
    XHR_3.open( "GET", '/api/articles' );
    let str = 'Trying to get all articles!';
    console.log(str);
    XHR_3.send();
}
