Vue.component('sitebody',{
    // curComponent is main component and will be changed as soon as another link in menuComponent was chosen.
    //menuComponent is triggered in siteheader
    data: function() {
        return {
            curComponent: 'start-text',
            menuComponent: 'div',
        }
    },
    methods: {
        showMe: function (emitted) {
            this.curComponent = emitted;
        },
        showMenu: function(emitted){
            if(this.menuComponent != emitted)
                this.menuComponent = emitted;
            else
                this.menuComponent = 'div';
        }
    },
    template:'<body>' +
        '<div class="container" style="margin:0px; max-width: 100%;">' +
        '<siteheader v-on:menuevent="showMenu"></siteheader>' +
        '<div class="row mt-1 mb-1">' +
        '<component v-bind:is="menuComponent" v-on:childevent="showMe"></component>' +
        '<div class="col p-1 m-2">' +
        '<component v-bind:is="curComponent" id="1"></component>' +
        '</div>' +
        '</div>' +
        '<sitefooter v-on:childevent="showMe"></sitefooter>' +
        '</div>' +
        '</body>'
});
