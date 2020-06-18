Vue.component('sitefooter', {
    methods: {
        goToImpressum: function () {
            this.$emit('childevent', 'impressum');
        }
    },
    template: '<footer>' +
        '<div class="row mt-1 mb-3">' +
        '<div class="col p-1 m-2">' +
        '<p>Copyright<a v-on:click="goToImpressum" style="margin-left: 3rem">Impressum</a></p>' +
        '</div>' +
        '</div>' +
        '</footer>'
});
