Vue.component('sitebody',{
    data: function() {
        return {
            curComponent: 'start-text',
            menuComponent: 'div',
        }
    },
    template:'<body>\n' +
        '<div class="container" style="margin:0px; max-width: 100%;">' +
        '<siteheader v-on:menuevent="showMenu"></siteheader>' +
        '<div class="row mt-1 mb-1">\n' +
        '        <component v-bind:is="menuComponent" v-on:childevent="showMe"></component>\n' +
        '        <div class="col p-1 m-2">\n' +
        // hier kommt der content hin
        '<component v-bind:is="curComponent" id="1"></component>' +
        //
        '        </div>\n' +
        '    </div>' +
        '<sitefooter v-on:childevent="showMe"></sitefooter>' +
        '</div>\n' +
        '</body>\n',
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
    }
});
