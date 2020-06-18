Vue.component('articles', {
    template: '<div>\n' +
        '            <a v-for="item in lastSearchTerms" title="item" v-on:click="setSearchTerm(item)"></a>\n\n' +
        '            <input v-if="lastSearchTerm" type="text" text="lastSearchTerm" v-on:keyup="handleIt">\n\n' +
        '            <input v-else="lastSearchTerm" type="text" v-on:keyup="handleIt">\n\n' +
        '            <table style="width:100%">\n' +
        '                <tr>\n' +
        '                    <th>Title</th>\n' +
        '                    <th style="width:10%">Creator</th>\n' +
        '                    <th>Created at</th>\n' +
        '                    <th style="width:5%">Price</th>\n' +
        '                    <th>Description</th>\n' +
        '                </tr>\n' +
        '                <tr v-for="item in objects">\n' +
        '                    <td>{{item.ab_name}}</td>\n' +
        '                    <td>{{item.ab_creator_id}}</td>\n' +
        '                    <td>{{item.ab_createdate}}</td>\n' +
        '                    <td style="text-align: center">{{item.ab_price}}</td>\n' +
        '                    <td>{{item.ab_description}}</td>\n\n' +
        '                    <td><button type="button" class="btn btn-danger" v-on:click="deleteArticle(item.id)">Delete Article</button></td>\n' +
        '                    <td><button type="button" class="btn btn-primary" v-on:click="addToCart(item.id)">Add to Cart</button></td>\n' +
        '                </tr>\n' +
        '            </table>\n' +
        '            <pagination class="pageArrow" :pages="parentpages" v-on:pageevent="queryDB"></pagination>\n' +
        '        </div>',
    data: function() {
        return {
            parentpages: 5,
            objects: [],
            have_all_articles: false,
            searchTerm: "",
            lastSearchTerm: "",
            lastSearchTerms: []
        }
    },
    created: function(){
        var event = new Event('build');
        this.handleIt(event);
    },
    methods: {
        setSearchTerm: function(event){
            this.lastSearchTerm = event.target.value;
            this.handleIt(event);
        },
        getLastSearchTerms: function(){
            console.log('Trying to get last searchTerms.');
            XHR.open( "GET", '/api/getLastSearchTerms');
            XHR.onload = () => {
                if (XHR.status === 200) {
                    let result = XHR.response;
                    this.lastSearchTerm = JSON.parse(result);
                } else {
                    console.log(XHR.response);
                    console.log('Could not query redis.');
                }
            }
            XHR.send();
        },
        handleIt: function (event) {
            if(event.target != null)
                this.searchTerm = event.target.value;
            const XHR = new XMLHttpRequest();
            if (this.searchTerm.length > 3 ) {
                this.have_all_articles = false;
                console.log('Trying to get count of searched articles.');
                XHR.open( "GET", '/api/articles/' + this.searchTerm );
                XHR.onload = () => {
                    if(XHR.status === 200){
                        let result = XHR.response;
                        let tmp = JSON.parse(result).num[0].count;
                        this.parentpages = Math.ceil(tmp/5);
                        console.log('In function for searched articles pages was:' + this.parentpages);
                    }
                    else{
                        console.log(XHR.response);
                        console.log('Could not query DB.');
                    }
                }
                XHR.send();
                console.log('searchTerm is ' + this.searchTerm);
                this.queryDB(0);
                this.getLastSearchTerms();
            } else {
                if(!this.have_all_articles){
                    this.have_all_articles = true;
                    console.log('Trying to get count for all articles.');
                    XHR.open( "GET", '/api/articles' );
                    XHR.onload = () => {
                        if(XHR.status === 200){
                            // Do something with data
                            let result = XHR.response;
                            let tmp = JSON.parse(result).num[0].count;
                            this.parentpages = Math.ceil(tmp/5);
                            console.log('In function pages was:' + this.parentpages);
                        }
                        else{
                            console.log('Could not querry DB.');
                        }
                    }
                    XHR.send();
                    this.queryDB(0);
                }
            }
        },
        queryDB: function (emitted){
            if(this.searchTerm.length > 3){
                // objects leeren, damit nicht die Ergebnisse mehrerer Suchanfragen aufgelistet werden
                this.objects = [];
                // Set up our request
                XHR.open("GET", '/api/articles/' + this.searchTerm + '/' + emitted);
                let str_2 = 'Trying to get a page for [\'search_term\' => ' + this.searchTerm + ']';
                console.log(str_2);
                XHR.onload =  () => {
                    let result = XHR.response;
                    let objs = JSON.parse(result).data;
                    for (let i = 0; i < objs.length; i++) {
                        this.objects.push({
                            id: objs[i].id,
                            ab_name: objs[i].ab_name,
                            ab_price: objs[i].ab_price,
                            ab_description: objs[i].ab_description,
                            ab_creator_id: objs[i].ab_creator_id,
                            ab_createdate: objs[i].ab_createdate,
                        });
                    }
                }
                XHR.send();
                console.log(this.objects);
            }
            else{
                XHR = new XMLHttpRequest();
                // objects leeren, damit nicht die Ergebnisse mehrerer Suchanfragen aufgelistet werden
                this.objects = [];
                // Set up our request
                XHR.open("GET", '/api/articlespage/' + emitted);
                let str_2 = 'Trying to get page of all articles';
                console.log(str_2);
                XHR.onload =  () => {
                    let result = XHR.response;
                    let objs = JSON.parse(result).data;
                    for (let i = 0; i < objs.length; i++) {
                        this.objects.push({
                            id: objs[i].id,
                            ab_name: objs[i].ab_name,
                            ab_price: objs[i].ab_price,
                            ab_description: objs[i].ab_description,
                            ab_creator_id: objs[i].ab_creator_id,
                            ab_createdate: objs[i].ab_createdate,
                        });
                    }
                }
                XHR.send();
                console.log(this.objects);
            }
        },
        deleteArticle: function (id){
            const XHR = new XMLHttpRequest();
            // Set up our request
            XHR.open( "DELETE", '/api/articles/' + id );
            let str = 'Trying to send (delete) [\'id\' => ' + id + ']';
            console.log(str);
            XHR.send();
            // Define what happens on successful data submission
            XHR.addEventListener( "load", function(event) {
                console.log('I\'ll show you the response text.');
                console.log(event.target.responseText);
                alert(event.target.responseText);
            } );
        },
        addToCart: function (id) {
            alert('I (' + id + ') would be added to the cart, if there was one.');
        }
    }
});
