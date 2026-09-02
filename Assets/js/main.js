//---------Import depuis les bibliothèques JS :
import { sanitizeInput } from "./sanitizer.js";

//---------Menu connexion/création compte :
let button = document.querySelector("#connectButton");
let menuConnexion = document.querySelector("#connexion");

button.addEventListener("click", function(){
    if (menuConnexion.getAttribute("class") === null) {
        menuConnexion.setAttribute("class","d-flex flex-column mx-auto mt-5 text-center row-gap-3");
    } else {
        menuConnexion.removeAttribute("class");
    }
    console.log(menuConnexion.getAttribute("class"));
})