//---------Import depuis les bibliothèques JS :
import { sanitizeInput } from "./sanitizer.js";

//Fonctionnalité:
//1---------Calculateur de côte :--------------------------------
const moreOuts = document.querySelector('#plus');
const fieldOuts = document.querySelector('fieldset');
const optOuts = fieldOuts.querySelectorAll('input');
const form = document.querySelector('#pot-odds');
const result = document.getElementById('potOddResult');
const answerFields = result.querySelectorAll('.button');

//--Ajout dynamique de l'option plus d'Outs :
let clickCount=0;

//--Apparition du champ pour selectionner une valeur suppérieure :
moreOuts.addEventListener("click",function(){
    if (clickCount%2 == 0){
        let nbOuts=document.createElement('input');
        nbOuts.type = 'number';
        nbOuts.style.display = 'block'
        fieldOuts.appendChild(nbOuts);
        clickCount++;
    } else {
        fieldOuts.removeChild(fieldOuts.lastElementChild);
        clickCount++;
    }
})

//--Disparition du champ :
for (let i=0; i<6; i++) {
    optOuts[i].addEventListener('click',function(){
        if (clickCount%2 == 1) {
            fieldOuts.removeChild(fieldOuts.lastElementChild);
            clickCount++;
        }
    })
};

//--Envoie du formulaire
const potSize = document.querySelector('#potSize');
const betSize = document.querySelector('#betSize');
const flop = document.querySelector('#flop'); 
const turn = document.querySelector('#turn'); 
const outsOptions = fieldOuts.querySelectorAll('input');

//--La fonction qui injecte la réponse dans la page :
function sendAnswer(event) {
    event.preventDefault();
    let outsIn = false;
    let numberOfOuts=0;
    //--Vérification des champs optionnels :
    outsOptions.forEach((element) => {
        if (element.checked) {
            outsIn = true;
            if (element.value == "+") {
                numberOfOuts = Math.abs(fieldOuts.lastElementChild.value);
            } else {
                numberOfOuts = element.value;
            }
        }
    });
    let odd = Math.abs(betSize.valueAsNumber)/(Math.abs(potSize.valueAsNumber)+Math.abs(betSize.valueAsNumber))*100;
    //--Code à exécuter avec options :
    if ((flop.checked || turn.checked) && outsIn)  {
        let equity = numberOfOuts*2
        if (flop.checked) {
            equity *= 2;
        }
        answerFields[1].innerText =`Équité estimée (Outs) : ${equity}%`;
        if (equity >= odd) {
            answerFields[1].style.backgroundColor ="var(--contrast-color)";
        } else {
            answerFields[1].style.backgroundColor ="var(--UI-color)";
        }
    
        //--Code à éxécuter dans tous les cas :
    }
    answerFields[0].innerText =`Équité requise : ${Math.trunc(odd)}%`;
}

//--La fonction qui reset le formulaire :
function resetAnswer(event) {
    event.preventDefault();
    answerFields[0].innerText ="Équité requise :";
    answerFields[1].innerText ="Équité estimée (Outs) :";
    answerFields[1].style.backgroundColor ="var(--primary-color)";
}

//--Appel des fonctions au click des bouttons :
form.addEventListener('submit', sendAnswer);
form.addEventListener('reset', resetAnswer);

//1---------Calculateur d'équité :--------------------------------
