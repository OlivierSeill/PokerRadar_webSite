//---------Import depuis les bibliothèques JS :
import { sanitizeInput } from "./sanitizer.js";

//Fonctionnalité 1 : 
//--Toggle Menu connexion/création compte :
let button = document.querySelector("#connectButton");
let menuConnexion = document.querySelector("#connexion");

button.addEventListener("click", function(){
    if (menuConnexion.getAttribute("class") === null) {
        menuConnexion.setAttribute("class","d-flex flex-column mx-auto mt-5 text-center row-gap-3");
    } else {
        menuConnexion.removeAttribute("class");
    }
})

//Fonctionnalité 2 :
//--Récolte, tri et affichage des données tournois :
let cardContainer = document.querySelector("#card_container");

async function afficherDonnees() {
    //--------Await pour attendre la retour de notre requete :
    try {
        const response1 = await fetch(`https://jsonplaceholder.typicode.com/albums`);
        const response2 = await fetch(`https://jsonplaceholder.typicode.com/photos`)

    //--------await pour la traduction de la reponse en données json exploitable :
        const data = await response1.json();
        const coverImg = await response2.json();

        for(let i=0;i<3;i++) {
            let card = document.createElement('div');
            card.setAttribute("class","card col-md-5 col-xxl-3 px-0");
            card.innerHTML = `<div class="card_img"><img src="${coverImg[i].url}" class="card-img-top" alt="exemple tournoi"></div><div class="card-body"><h3 class="card_title">${data[i].title.toUpperCase()}</h3><p class="card_text">Du ${data[i].id} au ${data[i].id+4} octobre 2026</p><a href="tournois.html" class="btn">En savoir plus</a></div>` ;
            cardContainer.appendChild(card);
        }

        console.log(data);
        console.log(coverImg);

    } catch (error) {
        let card = document.createElement('div');
        card.setAttribute("class","card col-md-5 col-xxl-3 px-0");
        card.innerText = `Aucun tournoi à venir!` ;
        cardContainer.appendChild(card);
        console.log("Un problème est survenu : "+error);
    }
}

afficherDonnees();


/*<div class="card col-md-5 col-xxl-3 px-0">
                <div class="card_img">
                    <img src="Assets/img/Exemple_tournoi.jpeg" class="card-img-top" alt="exemple tournoi">
                </div>
                <div class="card-body">
                    <h3 class="card_title">CARD TITLE</h3>
                    <p class="card_text">Some quick example text to build on the card title and make up the bulk of the
                        card’s
                        content.</p>
                    <a href="#" class="btn">Go somewhere</a>
                </div>
            </div>
            */