Vue.component('pagination',{
    props: ['pages'],
    data: function () {
        return {
            curPage: 1
        }
    },
    template: '<div><span v-on:click="pageBack"><</span>{{curPage}}<span v-on:click="pageForward">></span></div>',
    methods: {
        pageBack: function () {
            if(this.curPage > 1){
                this.curPage--;
                this.$emit('pageevent', (this.curPage - 1)*5);
            }
        },
        pageForward: function () {
            if(this.curPage < this.$props.pages){
                this.curPage++;
                this.$emit('pageevent', (this.curPage - 1)*5);
            }
        }
    }
});
