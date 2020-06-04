Vue.component('menu-component', {
    template: '<div style="border: 2px solid darkgrey; padding: .25rem; margin: .5rem; margin-right: 0px;" class="col-md-auto">' +
        '<ul><li><a v-on:click="goHome">Home</a></li>' +
        '<li><a v-on:click="goKategorien">Kategorien</a></li>' +
        '<li><a v-on:click="goVerkaufen">Verkaufen</a></li>' +
        '<li><a href="#">Unternehmen</a>' +
        '<ul><a href="#">Philosophie</a></ul>' +
        '<ul><a v-on:click="goComp">Karriere</a></ul></li></ul>' +
        '</div>',
    methods: {
        goHome: function(){
            this.$emit('childevent', 'start-text')
        },
        goKategorien: function(){
            this.$emit('childevent', 'articles')
        },
        goVerkaufen: function () {
            this.$emit('childevent', 'article-creation')
        },
        goComp: function (){
            this.$emit('childevent','example-component')
        }
    }
});
