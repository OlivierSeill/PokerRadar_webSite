//---------Import depuis les bibliothèques JS :
import { sanitizeInput } from "./sanitizer.js";

//---------Fonction de tri par date :
function sortByDate(tab) {
    for(let i=0; i<tab.length; i++) {
        for(let j=0; j<tab.length-1; j++) {
            if (tab[j].date.year > tab[j+1].date.year) {
                let n = tab[j];
                tab[j] = tab[j+1];
                tab[j+1] = n;
            }
        }
    }
    for(let i=0; i<tab.length; i++) {
        for(let j=0; j<(tab.length-1); j++) {
            if (tab[j].date.month > tab[j+1].date.month) {
                let n = tab[j];
                tab[j] = tab[j+1];
                tab[j+1] = n;
            }
        }
    }
    for(let i=0; i<tab.length; i++) {
        for(let j=0; j<(tab.length-1); j++) {
            if (tab[j].date.day > tab[j+1].date.day) {
                let n = tab[j];
                tab[j] = tab[j+1];
                tab[j+1] = n;
            }
        }
    }
}


//Fonctionnalité:
//--Récolte, tri et affichage des données tournois :
let cardContainer = document.querySelector("#card_container");

async function displayDatas(requestLimit) {
    //--------await pour attendre la retour de notre requete :
    try {
        const response = await fetch("assets/json/exemple_tournois.json");

        if (!response.ok) {
            throw new Error('Erreur HTTP :'+response.status);
        }
    
    //--------await pour la traduction de la reponse en données json exploitable :
        const data = await response.json();

    //--------Sécurité si rien à afficher :
        if (data.tournois.length == 0) {
            let card = document.createElement('div');
            card.setAttribute("class","card text-center");
            card.innerText = `Aucun tournoi à venir!` ;
            cardContainer.appendChild(card);
        } else {

    //--------Tri des données par date :
            sortByDate(data.tournois);

    //--------Sinon on affiche les 3 prochains tournois:
            for(let i=0;i<requestLimit;i++) {
                let card = document.createElement('div');
                card.setAttribute("class","card col-12 col-lg-5 col-xxl-3 px-0");

        //--------On assure l'affichage d'une img générale si pas d'affiche officielle :
                let coverImg = "";
                if (data.tournois[i].poster.length == 0) {
                    coverImg="assets/img/tournoi_mock.png"
                } else {
                    coverImg=`${data.tournois[i].poster}`;
                }
                
                let tournamentName = sanitizeInput(data.tournois[i].name.toUpperCase());
                let variante = sanitizeInput(data.tournois[i].variante);
                let fee = sanitizeInput(data.tournois[i].fee);
                let date = `${sanitizeInput(data.tournois[i].date.day)}/${sanitizeInput(data.tournois[i].date.month)}/${sanitizeInput(data.tournois[i].date.year)}`;
                let link=sanitizeInput(data.tournois[i].url);

        //--------On affiche les données du tournoi :
                card.innerHTML = `
                <div class="card_img">
                    <img src="${coverImg}" class="card-img-top" alt="affiche du tournoi">
                </div>
                <div class="card-body">
                    <h3 class="card_title">${tournamentName}</h3>
                    <p class="card_text">Tournoi ${variante}.<br />
                    Inscription: ${fee}€.<br />
                    Début le ${date}.</p>
                    <a href="${link}" class="btn" target="_blank">En savoir plus</a>
                </div>`;

                cardContainer.appendChild(card);
            }
        }

    } catch (error) {
        let card = document.createElement('div');
        card.setAttribute("class","card text-center");
        card.innerText = `Aucun tournoi à venir!` ;
        cardContainer.appendChild(card);
        console.error("Un problème est survenu : "+error.message);
    }
}

if (location.pathname == "/index.html" || location.href == "http://127.0.0.1:5500/index.html#" ) {
    displayDatas(3);
}
if (location.pathname == "/tournois.html" || location.href == "http://127.0.0.1:5500/tournois.html#" ) {
    displayDatas(4);
}