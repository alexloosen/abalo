<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue5</title>
</head>

<body>

<div id="app" v-html="myhtml">
    {{myhtml}}
</div>

<script
        src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
</script>

<script>
    new Vue({
            el: "#app",
            data:{
                myhtml: "<b>Vielen Dank</b>, für Ihren Einkauf bei <i>Abalo</i>"
            }
        }
    );
</script>

</body>
</html>