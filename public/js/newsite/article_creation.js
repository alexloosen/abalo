Vue.component('article-creation', {
    // array articles contains all articles of chosen creator
    data: function(){
        return {
            articles: []
        }
    },
    methods: {
        //for creating an article
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
        },
        // to fill the table with articles of chosen creator (in event)
        fillTable: function(event){
            const XHR = new XMLHttpRequest();
            XHR.open( "GET", '/api/creator/articles/' + event.target.value);
            XHR.onload = () => {
                if(XHR.status === 200){
                    this.articles = [];
                    let result = XHR.response;
                    let objs = JSON.parse(result).data;
                    for (let i = 0; i < objs.length; i++) {
                        this.articles.push({
                            ab_name: objs[i].ab_name,
                            id: objs[i].id
                        });
                    }
                }
                else{
                    console.log('Could not query DB for "fillTable".');
                }
            }
            XHR.send();
        },
        // for when an article was chosen for discount
        discount: function (id) {
            axios.post('/api/articles/discount/' + id)
                .then(response => {
                    console.log('axios send discount request.');
                })
                .catch(reason => {
                    console.log('axios failed discount!');
                    console.log(reason);
                });
        }
    },
    // template contains a form to create article + a text field to chose creator and a table to show the creator's
    // articles, which may be discounted.
    template:
        '<div><form v-on:submit.prevent="sendMe" id="the_form">' +
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
        '</form>' +
        '<p></p>' +
        '<label for="creator-id">Articles of creator 5,6 or 7?</label>' +
        '<input type="text" v-on:keyup="fillTable" id="creator-id"> ' +
        '<table>' +
        '<tr>' +
        '<th>Title</th><th>ID</th>' +
        '</tr>' +
        '<tr v-for="item in articles">' +
        '<td>{{item.ab_name}}</td>' +
        '<td>{{item.id}}</td>' +
        '<td><button type="button" class="btn btn-primary" v-on:click="discount(item.id)">Artikel jetzt als Angebot anbieten</button></td></tr>\n' +
        '</table></div>'
});
