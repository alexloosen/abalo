Vue.component('articles', {
    template: '#for-articles',
    data: function() {
        return {
            parentpages: 5,
            objects: [],
            have_all_articles: false,
            searchTerm: ""
        }
    },
    created: function(){
        var event = new Event('build');
        this.handleIt(event);
    },
    methods: {
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
                        console.log('Could not querry DB.');
                    }
                }
                XHR.send();
                console.log('searchTerm is ' + this.searchTerm);
                this.queryDB(0);
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
