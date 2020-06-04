Vue.component('article-creation', {
    methods: {
        sendMe: function(emitted){
            //validation time
            if(this.$refs.ab_name.value == ""){
                alert("Bitte geben Sie Ihrem Artikel einen Titel!");
                return;
            }
            if(this.$refs.ab_price.value <= 0 || isNaN(parseInt(this.$refs.ab_price.value,10))){
                alert("Bitte weisen Sie Ihrem Artikel einen gültigen Preis (größer 0) zu!");
                return;
            }
            //validation successful
            //make XHRequest
            const XHR = new XMLHttpRequest();
            XHR.open( "POST", '/api/articles' );
            const fd = new FormData(emitted.target);
            XHR.send(fd);
            XHR.addEventListener( "load", function(event) {
                console.log('I\'ll show you the response text.');
                console.log(event.target.responseText);
                alert( event.target.responseText );
            } );
        }
    },
    template:
        '<form v-on:submit.prevent="sendMe" id="the_form">' +
        '<div class="form-group">' +
        '<label for="name">Titel Ihres Artikels:</label>' +
        '<input type="text" ref="ab_name" name="ab_name"></div>' +
        '<div class="form-group">' +
        '<label for="price">Preis in €:</label>' +
        '<input type="text" ref="ab_price" name="ab_price"></div>' +
        '<div class="form-group">' +
        '<label for="description">Beschreibung:</label>' +
        '<textarea ref="ab_description" name="ab_description"></textarea></div>' +
        '<input type="hidden" value="1" ref="ab_creator_id" name="ab_creator_id">' +
        '<button type="submit" class="btn btn-secondary" style="margin-left: 200px;">Anzeige aufgeben</button>' +
        '</form>'
});
