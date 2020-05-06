class Menu{
    constructor(the_array){
        this._array = the_array;
        this._links = new Array(this._array.length);
        for(let i = 0; i < this._links.length; ++i){
            this._links[i] = new Array(this._array[i].length);
            for(let j = 0; j < this._links[i].length; ++j) {
                this._links[i][j] = "#";
            }
        }
    }
     get links(){return this._links;}
     get array(){return this._array;}

    getMenu() {
        //create the menu-element
        let the_menu = document.createElement('ul');
        let tmp;
        for(let i = 0; i < this._array.length; ++i){
            for(let j = 0; j < this._array[i].length; ++j) {
                if(j == 0){
                    tmp = document.createElement('li');
                    let second_tmp = document.createElement('a');
                    second_tmp.setAttribute("href", this._links[i][j]);
                    second_tmp.innerText = this._array[i][j];
                    tmp.appendChild(second_tmp);
                } else{
                    let other_tmp = document.createElement('ul');
                    let second_tmp = document.createElement('a');
                    second_tmp.setAttribute("href", this._links[i][j]);
                    second_tmp.innerText = this._array[i][j];
                    other_tmp.appendChild(second_tmp);
                    tmp.appendChild(other_tmp);
                }
            }
            the_menu.appendChild(tmp);
            tmp = undefined;
        }
        return the_menu;
    }

    setLink(link_name,route_name) {
        for(let i = 0; i < this._array.length; ++i) {
            let pos = this._array[i].indexOf(link_name);
            if(pos != -1){
                this._links[i][pos] = route_name;
                return;
            }
        }
        console.error("tried to assign route to nonexistent link.");
        return;
    }

     showMenu(){   // create the area in which menu is shown + show it
        let the_bar = document.createElement('div');
        the_bar.setAttribute("id","menu-bar");
        the_bar.setAttribute("style","border: 2px solid darkgrey; padding: .25rem; margin: .5rem; margin-right: 0px;");
        the_bar.setAttribute("class","col-md-auto");
        the_bar.appendChild(this.getMenu());
        document.getElementById("1").appendChild(the_bar);
    }
    hideMenu(){
        document.getElementById("menu-bar").remove();
    }

    addMainCat(value){
        let tmp = new Array(1);
        tmp[0] = value;
        this._array.push(tmp);
        tmp[0] = "#";
        this._links.push(tmp);
    }
    addSecondaryCat(main,second){
        for(let i = 0; i < this._array.length; ++i) {
            let pos = this._array[i].indexOf(main);
            if(pos != -1){
                this._array[i].push(second);
                this._links[i].push("#");
                return;
            }
        }
    }
}
// END OF CLASS MENU!!!

// one dimensional array
let my_arr = new Array(4);
// loop to make 2 dimensional
for(let i = 0; i < my_arr.length; ++i){
    my_arr[i] = new Array(1);
}
// fill array
my_arr[0][0] = "Home";
my_arr[1][0] = "Kategorien";
my_arr[2][0] = "Verkaufen";
my_arr[3][0] = "Unternehmen";
my_arr[3].push("Philosophie");
my_arr[3].push("Karriere");
// set links
let my_menu = new Menu(my_arr);
my_menu.setLink('Home','start');
my_menu.setLink('Kategorien','articles');
my_menu.setLink('Verkaufen','sell');

//function for menu-button
function menuHandling(){
    let tmp = document.getElementById("menu-bar");
    if(tmp != undefined){
        my_menu.hideMenu();
    } else {
        my_menu.showMenu();
    }
}

