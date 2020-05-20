"use strict";

// Klassen, um die Darstellung des Carts zu kontrollieren
class Item
{
    constructor(id, anz)
    {
        this.id = id;
        this.anz = anz;
    }
}

class Cart
{
    contents
    constructor()
    {
        this.contents = [];
    }
    addContent(id, anz)
    {
        let item = new Item(id, anz);
        this.contents.push(item);
    }
}

// my cart object!
let cart = new Cart();

// Waren dem Korb hinzufügen - wenn schon enthalten, nur Anzahl hochzählen
function addToCart(id, db_in = true)
{
    //space for xhr stuff: function add_db will be used within this function, the cart-js-object on this site
    //is synchronized with the cart in the db
    function add_db(the_id){
        //xhr part
        let xhr = new XMLHttpRequest();
        // Define what happens on successful data submission
        xhr.addEventListener( "load", function(event) {
            console.log('I\'ll show you the response text.');
            console.log(event.target.responseText);
        } );
        xhr.open( "POST", '/api/shoppingcart/' + the_id);
        console.log('trying to add ' + the_id + ' to cart.');
        xhr.send();
    }

    //now the handling of the cart-js-object!
    console.log("Funktion addToCart() mit id " + id);
    for (let i = 0; i < cart.contents.length; i++)
    {
        if (cart.contents[i].id == id)
        {
            if(db_in)
                add_db(id);
            cart.contents[i].anz++;
            drawCart();
            return;
        }
    }
    var item = new Item(id);
    cart.addContent(id, 1);
    drawCart();
    //console.log(cart.contents);
    // here the shoppingcart in the db is synchronized with the one on the site!
    if(db_in)
        add_db(id);
}

// Aus Warenkorb löschen - ebenfalls nachschauen ob schon enthalten und Wert auf 1
// je nach dem herunterzählen oder ganz löschen
// synchronize with db!
function deleteFromCart(id)
{
    //space for xhr stuff, to synchronize with db!
    function del_db(the_id){
        //xhr part
        let xhr = new XMLHttpRequest();
        // Define what happens on successful data submission
        xhr.addEventListener( "load", function(event) {
            console.log('I\'ll show you the response text.');
            console.log(event.target.responseText);
        } );
        xhr.open( "DELETE", '/api/shoppingcart/1/articles/' + the_id);
        console.log('trying to delete ' + the_id + ' from cart.');
        xhr.send();
    }

    // now handling of the cart-js-object
    console.log("Funktion deleteFromCart()");
    for (let i = 0; i < cart.contents.length; i++)
    {
        if (cart.contents[i].id == id)
        {
            if (cart.contents[i].anz == 1)
            {
                //synchronization with db
                del_db(id);
                //
                cart.contents.splice(i,1);
            }
            else
            {
                //synchronization with db
                del_db(id);
                //
                cart.contents[i].anz--;
            }
        }
    }
    drawCart();
    //console.log(cart.contents);
}

// Warenkorb holen
function getCart()
{
    return cart.contents;
}

function drawCart()
{
    // Nachschauen ob der Warenkorb schonmal gezeichnet wurde
    // wenn ja, löschen und neubauen
    let drawnCart = document.getElementById('placeHere');
    if (drawnCart != null)
    {
        drawnCart.innerHTML = '';
    }
    // Warenkorbdaten holen und Felder aufbauen
    let cartData = getCart();
    for (let i = 0; i < cartData.length; i++)
    {
        let tr = document.createElement("tr");
        tr.setAttribute('id', 'cart');

        let th = document.createElement("th");
        th.scope = "row";
        th.textContent = cartData[i].id;

        let td = document.createElement("td");
        td.scope = "row";
        td.textContent = cartData[i].anz;

        let tdButton = document.createElement("td");
        let button = document.createElement("button");
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-primary');
        button.setAttribute('onClick', 'deleteFromCart(' + cartData[i].id + ')');
        button.textContent = "-";
        tdButton.appendChild(button);

        tr.appendChild(th);
        tr.appendChild(td);
        tr.appendChild(tdButton);

        document.getElementById('placeHere').appendChild(tr);
    }
}

//fill cart with contents of a json...
function fillCart(obj_array) {
    let a = JSON.parse(obj_array);
    for(let i = 0; i < a.length; ++i) {
        addToCart(a[i].ab_article_id, false);
    }
}


//create/ask for the cart from the db if the_cart element is present!
if (document.getElementById('the_cart') != null){

//Mittels XHR Cart in der DB anlegen
    let cart_xhr = new XMLHttpRequest();

// Define what happens on successful data submission
    cart_xhr.addEventListener( "load", function(event) {
        console.log('I\'ll show you the response text to your shoppingcart request.');
        let answer = event.target.responseText;
        let txt = JSON.parse(answer).answer;
        if(txt == null){
            console.log('there already is a shoppingcart present and its contents are:');
            console.log(answer);
            // wenn ein alter shoppingcart vorhanden ist, befülle das cart-js-object
            fillCart(answer);
        }
        else{
            console.log(txt);
        }
    } );

// Define what happens in case of error
    cart_xhr.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

// Set up our request
    cart_xhr.open( "GET", '/api/shoppingcart');
    console.log('asking for a shoppingcart to be created in the DB.');
    cart_xhr.send();
// done with xhr for now!
}

