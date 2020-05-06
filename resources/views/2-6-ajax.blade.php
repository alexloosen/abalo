<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>2-6-ajax</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

</head>
<body>
<div class="container">
    <div class="row">
        <div class="col" id="1">

        </div>
    </div>
</div>
</body>
<script type="text/javascript">
    let xhr = new XMLHttpRequest();
    let the_file;
    xhr.open("GET","/static/message.json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                the_file = JSON.parse(xhr.responseText);
                console.log(the_file);
                let the_elem = document.getElementById('1');
                the_elem.innerText = the_file.message;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send();
</script>
</html>
