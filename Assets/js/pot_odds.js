//---------Import depuis les bibliothèques JS :
import { sanitizeInput } from "./sanitizer.js";

//Fonctionnalité:
//--Calculateur d'équité :
let moreOuts = document.querySelector('#plus');
let form = document.querySelector('fieldset');
let optOuts = form.querySelectorAll('input');

let clickCount=0;

moreOuts.addEventListener("click",function(){
    if (clickCount%2 == 0){
        let nbOuts=document.createElement('input');
        nbOuts.type = 'number';
        nbOuts.style.display = 'block'
        form.appendChild(nbOuts);
        clickCount++;
    } else {
        form.removeChild(form.lastElementChild);
        clickCount++;
    }
})

// ----------------------attention pb
for (let i=0; i<6; i++) {
    optOuts[i].addEventListener('click',function(){
        if (clickCount%2 == 1) {
            form.removeChild(form.lastElementChild);
        }
    })
};


console.log(moreOuts);