"use strict";
let vm = new Vue({
    el: "#search",
    data: {
        value: 5,
        objects: [],
        noSearch: true
    },
    methods: {
        handleIt:function(event){
            vm.objects = [];
            vm.noSearch = true;
            let searchTerm = event.target.value;
            if (searchTerm.length > 3){
                vm.noSearch = false;
                const XHR_2 = new XMLHttpRequest();

                // Define what happens on successful data submission
                XHR_2.addEventListener( "load", function(event) {
                    console.log('I\'ll show you the response text.');
                    console.log(event.target.responseText);
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
                    console.log(vm.objects);
                } );

                // Define what happens in case of error
                XHR_2.addEventListener( "error", function( event ) {
                    alert( 'Oops! Something went wrong.' );
                } );

                // Set up our request
                XHR_2.open( "GET", '/api/articles/' + searchTerm );
                let str = 'Trying to send [\'id\' => ' + searchTerm + ']';
                console.log(str);
                XHR_2.send();
            }
        }}
});
