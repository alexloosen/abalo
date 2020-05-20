<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>vue3</title>
</head>

<body>

<div id="app">
    <p v-if="serverdown">{{msg}}</p>
</div>

<script
        src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
</script>

<script>
    new Vue({
            el: "#app",
            data:{
                msg: "Der Webserver ist zur Zeit nicht erreichbar",
                serverdown: true
            }
        }
    );
</script>

</body>
</html>
