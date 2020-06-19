Vue.component('articles', {
    data: function() {
        return {
            parentpages: 5,
            objects: [],
            have_all_articles: false,
            searchTerm: "",
            lastSearchTerm: "",
            lastSearchTerms: [],
            // alerts contains all discounted, shown articles
            alerts: [],
        }
    },
    // create a socket which will react upon discount alert (id = 2)
    created: function(){
        let serverUrl = 'ws://127.0.0.1:8001/demo';
        let socket = new WebSocket(serverUrl);
        socket.onopen = (msg) => {
            console.log('Connected to check articles.');
        };
        socket.onmessage = (msg) => {
            console.log('I received a message for articles.');
            if(JSON.parse(JSON.parse(msg.data).data).id == 2){
                console.log('And it was meant for me!');
                let loc_id = JSON.parse(JSON.parse(msg.data).data).text;
                for (var i = 0; i < this.objects.length; i++) {
                    if(this.objects[i].id == loc_id){
                        this.alerts.push({
                            name: this.objects[i].ab_name
                        });
                    }
                }
            }
        }
        socket.onclose = (msg) => {
            console.log('Disconnected from articles-socket.')
        }
        var event = new Event('build');
        this.handleIt(event);
    },

    methods: {
        setSearchTerm: function(event){
            console.log(event);
            this.lastSearchTerm = event;
            this.handleIt(event);
        },
        getLastSearchTerms: function(){
            let XHR = new XMLHttpRequest();
            console.log('Trying to get last searchTerms.');
            XHR.open( "GET", '/api/getLastSearchTerms');
            XHR.onload = () => {
                if (XHR.status === 200) {
                    let result = XHR.response;
                    this.lastSearchTerms = JSON.parse(result);
                    //console.log(result);
                    //console.log(JSON.parse(result));
                } else {
                    console.log(XHR.response);
                    console.log('Could not query redis.');
                }
            }
            XHR.send();
        },
        handleIt: function (event) {
//            if(event.target != null)
//                this.searchTerm = event.target.value;
            if (event.type == 'keyup')
                this.searchTerm = event.target.value;
            else
                if (event.type != 'build')
                    this.searchTerm = event;
            let XHR = new XMLHttpRequest();
            if (this.searchTerm.length > 3 ) {
                this.have_all_articles = false;
                //console.log('Trying to get count of searched articles.');
                XHR.open( "GET", '/api/articles/' + this.searchTerm );
                XHR.onload = () => {
                    if(XHR.status === 200){
                        let result = XHR.response;
                        let tmp = JSON.parse(result).num[0].count;
                        this.parentpages = Math.ceil(tmp/5);
                        //console.log('In function for searched articles pages was:' + this.parentpages);
                    }
                    else{
                        console.log(XHR.response);
                        console.log('Could not query DB to show articles.');
                    }
                }
                XHR.send();
                //console.log('searchTerm is ' + this.searchTerm);
                this.queryDB(0);
                this.getLastSearchTerms();
            } else {
                if(!this.have_all_articles){
                    this.have_all_articles = true;
                    //console.log('Trying to get count for all articles.');
                    XHR.open( "GET", '/api/articles' );
                    XHR.onload = () => {
                        if(XHR.status === 200){
                            // Do something with data
                            let result = XHR.response;
                            let tmp = JSON.parse(result).num[0].count;
                            this.parentpages = Math.ceil(tmp/5);
                            //console.log('In function pages was:' + this.parentpages);
                        }
                        else{
                            console.log('Could not query DB to show articles.');
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
                this.alerts = [];
                // Set up our request
                XHR.open("GET", '/api/articles/' + this.searchTerm + '/' + emitted);
                let str_2 = 'Trying to get a page for [\'search_term\' => ' + this.searchTerm + ']';
                //console.log(str_2);
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
                //console.log(this.objects);
            }
            else{
                XHR = new XMLHttpRequest();
                // objects leeren, damit nicht die Ergebnisse mehrerer Suchanfragen aufgelistet werden
                this.objects = [];
                this.alerts = [];
                // Set up our request
                XHR.open("GET", '/api/articlespage/' + emitted);
                let str_2 = 'Trying to get page of all articles';
                //console.log(str_2);
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
                //console.log(this.objects);
            }
        },
        deleteArticle: function (id){
            let XHR = new XMLHttpRequest();
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
        // sending a request to show sold-notification
        sell: function (id) {
            axios.post('/api/articles/' + id + '/sold')
                .then(response => {
                    console.log('axios send selling request.');
                })
                .catch(reason => {
                    console.log('axios failed selling!');
                    console.log(reason);
                });
        }
    },
    template: '<div>' +
        '<a style="margin-right: 1em" v-for="item in lastSearchTerms" v-on:click="setSearchTerm(item)"">{{item}}</a><br/>\n' +
        '<input v-if="lastSearchTerm" type="text" text="lastSearchTerm" v-on:keyup="handleIt">\n' +
        '<input v-else="lastSearchTerm" type="text" v-on:keyup="handleIt">\n\n' +
        '<table style="width:100%">' +
        '<tr>' +
        '<th>Title</th>' +
        '<th style="width:10%">Creator</th>' +
        '<th>Created at</th>' +
        '<th style="width:5%">Price</th>' +
        '<th>Description</th>' +
        '</tr>' +
        '<tr v-for="item in objects">' +
        '<td>{{item.ab_name}}</td>' +
        '<td>{{item.ab_creator_id}}</td>' +
        '<td>{{item.ab_createdate}}</td>' +
        '<td style="text-align: center">{{item.ab_price}}</td>' +
        '<td>{{item.ab_description}}</td>' +
        '<td><button type="button" class="btn btn-danger" v-on:click="deleteArticle(item.id)">Delete Article</button></td>' +
        '<td><button type="button" class="btn btn-primary" v-on:click="sell(item.id)">Sell</button></td>' +
        '</tr>' +
        '</table>' +
        '<p v-for="msg in alerts" style="background-color: aquamarine">' +
        'Der Artikel {{msg.name}} wird nun günstiger angeboten! Greifen Sie schnell zu.' +
        '</p>' +
        '<pagination class="pageArrow" :pages="parentpages" v-on:pageevent="queryDB"></pagination>' +
        '</div>',
});
