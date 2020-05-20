<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue2</title>
</head>
<body>
<div id="app">
    <button v-on:click="objects.push({name: 'Radio-UKW', price: 45})">Click me!</button>
    <table>
        <tr><th>name</th><th>price</th></tr>
        <tr v-for="item in objects"><td>{{item.name}}</td><td>{{item.price}}</td></tr>
    </table>
</div>

<script
    src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
</script>

<script>
    new Vue(
        {
            el: "#app",
            data: {
                objects : [
                    {name: "Reifen", price: 8290},
                    {name: "Antenne drehbar. Leicht geknickt", price: 1400},
                    {name: "Opel Kadett C 1992 - wie neu", price: 150000},
                ]
            }
        }
    )
</script>

</body>
</html>
