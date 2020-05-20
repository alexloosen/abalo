<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue4</title>
</head>

<body>

<div id="app">
    {{ inputdata }}<br>
    <input type="text" v-model="inputdata">
</div>

<script
        src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
</script>

<script>
    new Vue({
            el: "#app",
            data:{
                inputdata: "default"
            }
        }
    );
</script>

</body>
</html>
