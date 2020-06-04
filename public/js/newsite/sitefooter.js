Vue.component('sitefooter', {
    template: '<footer>\n' +
        '        <div class="row mt-1 mb-3">\n' +
        '            <div class="col p-1 m-2">\n' +
        '                <p>Copyright<a v-on:click="goToImpressum" style="margin-left: 3rem">Impressum</a></p>' +
        '            </div>\n' +
        '        </div>\n' +
        '    </footer>',
    methods: {
        goToImpressum: function () {
            this.$emit('childevent', 'impressum');
        }
    }
});
