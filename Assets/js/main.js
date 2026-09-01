//---------Menu connexion/création compte :
let button = document.querySelector("#connectButton");
let menuConnexion = document.querySelector("#connexion");

button.addEventListener("click", function(){
    console.log('boutton clické');
    menuConnexion.classList.toggle("toggle");
})