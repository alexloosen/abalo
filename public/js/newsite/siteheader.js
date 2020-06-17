Vue.component('siteheader',{
    template: '<header>\n' +
        '        <div class="row mt-3 mb-1">\n' +
        '            <div class="col p-1 m-2">\n' +
        '                <div class="row align-items-center">\n' +
        '                    <div class="col-md-auto ml-2"><button v-on:click="menuHandling"><i class="fas fa-bars" style="align-self: center; font-size:3rem; color:dimgray;"></i></button></div>\n' +
        '                    <div class="col">\n' +
        '                        <h1>Abalo</h1>\n' +
        '                        <p>Das ist unser Slogan.</p>\n' +
        '                    </div>' +
        '                    <div id="message-box" class="col m-3" style="background-color: indianred; text-align: center;"></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </header>',
    created: function() {
        let serverUrl = 'ws://127.0.0.1:8001/demo';
        let socket = new WebSocket(serverUrl);
        socket.onopen = (msg) => {
            console.log('Connected');
        };
        socket.onmessage = (msg) => {
            console.log('Message received: ' + JSON.parse(msg.data).data);
            let tmp = document.getElementById('message-box');
            tmp.setAttribute('class', 'col-2 m-3');
            tmp.setAttribute('style', 'background-color: indianred; text-align:center;');
            tmp.innerHTML = JSON.parse(msg.data).data + '<p></p>';
            let tmp_button = document.createElement('button');
            tmp_button.setAttribute('onclick', 'noHTML');
            let symbol = document.createElement('i');
            symbol.setAttribute('class', 'fa fa-times');
            symbol.setAttribute('aria-hidden', 'true');
            tmp_button.appendChild(symbol);
            tmp.appendChild(tmp_button);
        };
        socket.onclose = (msg) => {
            console.log('Connection was closed.');
        };
    },
    methods: {
        menuHandling: function () {
            this.$emit('menuevent', 'menu-component');
        }
    }
});

