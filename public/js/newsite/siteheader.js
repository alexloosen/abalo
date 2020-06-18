Vue.component('siteheader',{
    data: function() {
        return {creator_id: 0}
    },
    // upon creation of this element, connect to server via socket and wait for messages
    // messages will be displayed in messafe-box
    created: function() {
        let serverUrl = 'ws://127.0.0.1:8001/demo';
        let socket = new WebSocket(serverUrl);
        socket.onopen = (msg) => {
            console.log('Connected');
        };
        socket.onmessage = (msg) => {
            console.log('Message received: ');
            console.log(msg.data);
            // id 1 is for developement messages
            if(JSON.parse(JSON.parse(msg.data).data).id == 1){
                let tmp = document.getElementById('message-box');
                tmp.setAttribute('class', 'col-2 m-3');
                tmp.setAttribute('style', 'background-color: indianred; text-align:center;');
                tmp.innerHTML = JSON.parse(JSON.parse(msg.data).data).text + '<p></p>';
                let tmp_button = document.createElement('button');
                tmp_button.setAttribute('v-on:click', 'noHTML');
                let symbol = document.createElement('i');
                symbol.setAttribute('class', 'fa fa-times');
                symbol.setAttribute('aria-hidden', 'true');
                tmp_button.appendChild(symbol);
                tmp.appendChild(tmp_button);}
            // id 3 is for sold messags
            if(JSON.parse(JSON.parse(msg.data).data).id == 3){
                let art_id = JSON.parse(JSON.parse(JSON.parse(msg.data).data).text).article;
                let art_name = JSON.parse(JSON.parse(JSON.parse(msg.data).data).text).name;
                let cret_id = JSON.parse(JSON.parse(JSON.parse(msg.data).data).text).creator;
                console.log('article with id ' + art_id + ' was sold, of creator ' + cret_id);
                if(cret_id == this.creator_id){
                    let tmp = document.getElementById('message-box');
                    tmp.setAttribute('class', 'col-2 m-3');
                    tmp.setAttribute('style', 'background-color: darkseagreen; text-align:center;');
                    tmp.innerHTML = 'Großartig! Ihr Artikel ' + art_name + ' wurde erfolgreich verkauft!';
                }
            }
        };
        socket.onclose = (msg) => {
            console.log('Connection was closed.');
        };
    },

    methods: {
        menuHandling: function () {
            this.$emit('menuevent', 'menu-component');
        },
        // to change creator, whom will receive sold-message!
        changeCreator: function (event) {
            this.creator_id = event.target.value;
            console.log('I am now creator ' + event.target.value);
        },
        // call the global java-script method to remove message in message-box
        noHTML: function (){
            noHTML();
        }
    },

    template: '<header>' +
        '<div class="row mt-3 mb-1">' +
        '<div class="col p-1 m-2">' +
        '<div class="row align-items-center">' +
        '<div class="col-md-auto ml-2"><button v-on:click="menuHandling"><i class="fas fa-bars" style="align-self: center; font-size:3rem; color:dimgray;"></i></button></div>' +
        '<div class="col">' +
        '<h1>Abalo</h1>' +
        '<p>Das ist unser Slogan.</p>' +
        '</div>' +
        '<div class="col"><label for="creator-id-head">Which creator (5,6 or 7)?</label>' +
        '<input type="text" v-on:keyup="changeCreator" id="creator-id-head"></div>' +
        '<div id="message-box" class="col m-3" style="background-color: indianred; text-align: center;"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</header>'
});

