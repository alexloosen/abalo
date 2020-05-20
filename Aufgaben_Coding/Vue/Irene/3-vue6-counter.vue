<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue6</title>
</head>

<body>

<div id="app">
    <button v-on:click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times.</p>
</div>

<script
        src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
</script>

<script>
    new Vue({
        el: '#app',
        data: {
            counter: 0
        }
    });
</script>

</body>
</html>

