
//validation function for later
function validate(){
    let main = document.forms["the_form"];
    //name shall not be null!
    let x = main["name"].value;
    if(x == ""){
        alert("Bitte geben Sie Ihrem Artikel einen Titel!");
        return false;
    }
    x = main["price"].value;
    if(x <= 0 || isNaN(parseInt(x,10))){
        alert("Bitte weisen Sie Ihrem Artikel einen gültigen Preis (größer 0) zu!");
        return false;
    }
    return true;
}

if(document.getElementById("2") != null){

    //Form erstellen
    let my_form = document.createElement('form');
    my_form.setAttribute("method","POST");
    my_form.setAttribute("action","articles");
    my_form.setAttribute("onsubmit","return validate()");
    my_form.setAttribute("name","the_form");

    my_form.innerHTML = '<?php @csrf ?>';

    //Input name
    let one_elem = document.createElement('div');
    one_elem.setAttribute("class", "form-group");
    let tmp = document.createElement('label');
    tmp.setAttribute("for","name");
    tmp.innerText = 'Titel Ihres Artikels:';
    one_elem.appendChild(tmp);
    tmp = document.createElement('input');
    tmp.setAttribute("type","text");
    tmp.setAttribute("name","ab_name");
    tmp.setAttribute("id","name");
    one_elem.appendChild(tmp);
    my_form.appendChild(one_elem);

    //Input price
    one_elem = document.createElement('div');
    one_elem.setAttribute("class", "form-group");
    tmp = document.createElement('label');
    tmp.setAttribute("for","price");
    tmp.innerText = 'Preis in €:';
    one_elem.appendChild(tmp);
    tmp = document.createElement('input');
    tmp.setAttribute("type","text");
    tmp.setAttribute("name","ab_price");
    tmp.setAttribute("id","price");
    one_elem.appendChild(tmp);
    my_form.appendChild(one_elem);

    //Input description
    one_elem = document.createElement('div');
    one_elem.setAttribute("class", "form-group");
    tmp = document.createElement('label');
    tmp.setAttribute("for","description");
    tmp.innerText = 'Beschreibung:';
    one_elem.appendChild(tmp);
    tmp = document.createElement('textarea');
    tmp.setAttribute("name","ab_description");
    tmp.setAttribute("id","description");
    one_elem.appendChild(tmp)
    my_form.appendChild(one_elem);

    //Input hidden creator id
    one_elem = document.createElement('input');
    one_elem.setAttribute("type","hidden");
    one_elem.setAttribute("value","1");
    one_elem.setAttribute("name","ab_creator_id");
    my_form.append(one_elem);

    //Submit button
    one_elem = document.createElement('button');
    one_elem.setAttribute("type","submit");
    one_elem.setAttribute("class","btn btn-secondary");
    one_elem.setAttribute("style","margin-left: 200px;");
    one_elem.innerText = 'Anzeige aufgeben';
    my_form.appendChild(one_elem);


    //Give form to DOM
    document.getElementById("2").appendChild(my_form);
}
