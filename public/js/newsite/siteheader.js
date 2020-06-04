Vue.component('siteheader',{
    template: '<header>\n' +
        '        <div class="row mt-3 mb-1">\n' +
        '            <div class="col p-1 m-2">\n' +
        '                <div class="row align-items-center">\n' +
        '                    <div class="col-md-auto ml-2"><button v-on:click="menuHandling"><i class="fas fa-bars" style="align-self: center; font-size:3rem; color:dimgray;"></i></button></div>\n' +
        '                    <div class="col">\n' +
        '                        <h1>Abalo</h1>\n' +
        '                        <p>Das ist unser Slogan.</p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </header>',
    methods: {
        menuHandling: function () {
            this.$emit('menuevent', 'menu-component');
        }
    }
});
