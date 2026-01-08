// -------------------------------------------- CONNECTION AVEC LE DOM -------------------------------------------- //
// récupération des éléments HTML (DOM)
const imageAffichee = document.getElementById("photo");
const texteCompteur = document.getElementById("counter");
const boutonPrecedent = document.getElementById("prevBtn");
const boutonSuivant = document.getElementById("nextBtn");
const boutonLike = document.getElementById("likeBtn");
const texteLikes = document.getElementById("likesInfo"); 
const boutonsFiltres = document.querySelectorAll("#filters button");


// -------------------------------------------- IDENTIFICATION DES IMAGES POUR APPLIQUÉ LE FILTRE -------------------------------------------- //
// création de la liste des 20 images
const listeImages = [];
for (let numeroImage = 1; numeroImage <= 20; numeroImage++) {

    let nomPersonne = "";
    if (numeroImage <= 5) nomPersonne = "Antoine"; //Mes images sont dans l'ordre 
    else if (numeroImage <= 10) nomPersonne = "Paul";
    else if (numeroImage <= 15) nomPersonne = "Clementine";
    else nomPersonne = "Mehdi";


    listeImages.push({              // Ajoute une image dans la liste des images
        personne: nomPersonne,
        source: "img" + numeroImage + " - Petite.jpeg",
        likes: 0,
        estLikee: false
    });
}

// -------------------------------------------- BOUTON D'INTERACTION -------------------------------------------- //

// écoute pour capté si on clique sur les flèches pour naviguer
boutonPrecedent.addEventListener("click", function () {
    indexImageAffichee--; // on enleve 1 a l'index de l'image affiché pour revenir a l'image précedente
    if (indexImageAffichee < 0) indexImageAffichee = listeFiltre.length - 1; // boucle
    afficherCarrousel();
});

boutonSuivant.addEventListener("click", function () {
    indexImageAffichee++; // pareil que avant mais pour allez a l'image suivante
    if (indexImageAffichee >= listeFiltre.length) indexImageAffichee = 0; 
    afficherCarrousel();
});

// Bouton j'aime 
boutonLike.addEventListener("click", function () {
    const imageCourante = listeFiltre[indexImageAffichee];

    imageCourante.estLikee = !imageCourante.estLikee;
    if (imageCourante.estLikee) imageCourante.likes++;
    else imageCourante.likes--;

    afficherCarrousel();
});



// -------------------------------------------- UTILISATION DU FILTRE -------------------------------------------- //

// appliqué le filtre choisi 
function appliquerFiltre() {
    if (filtreActuel === "Toutes") {
        listeFiltre = listeImages;
    } else {
        listeFiltre = [];
        for (let k = 0; k < listeImages.length; k++) {
            if (listeImages[k].personne === filtreActuel) {
                listeFiltre.push(listeImages[k]);
            }
        }
    }

    indexImageAffichee = 0; // on repart à la première image du filtre
}


// Sélectionné le filtre 
for (let b = 0; b < boutonsFiltres.length; b++) {
    boutonsFiltres[b].addEventListener("click", function () {

        // enlève "active" sur tous les boutons
        for (let x = 0; x < boutonsFiltres.length; x++) {
            boutonsFiltres[x].classList.remove("active");
        }

        // ajoute "active" sur le bouton cliqué
        this.classList.add("active");

        // récupère le filtre dans data-filter du bouton
        filtreActuel = this.getAttribute("data-filter");

        appliquerFiltre();
        afficherCarrousel();
    });
}



// -------------------------------------------- AFFICHAGE ET LANCEMENT -------------------------------------------- //
// affiché l'image & les infos
function afficherCarrousel() {
    const imageCourante = listeFiltre[indexImageAffichee];

    imageAffichee.src = imageCourante.source;  // change l'image
    texteCompteur.textContent =
        (indexImageAffichee + 1) + " / " + listeFiltre.length + " (" + imageCourante.personne + ")";

    boutonLike.textContent = imageCourante.estLikee ? "Liké" : "J'aime";
    texteLikes.textContent = "Likes : " + imageCourante.likes;
}

// ce qu'on affiché a l'écran
let filtreActuel = "Toutes";                // photos de qui ont veut voir
let listeFiltre = listeImages;              // selectionne les photos de celui dont on veut voir 
let indexImageAffichee = 0;                 // indice de l'image qu'on veut filtré



// Lancement du programme sinon la premiere image est pas chargé 
appliquerFiltre();
afficherCarrousel();
