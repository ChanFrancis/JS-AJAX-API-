"use strict";
var xhr = new XMLHttpRequest();
var lien;

// Cacher le cadre film lorqu'il est vide
document.getElementById('cadreFilm').style.display = "none";

// Prendre les inputs
document.getElementById('rechercheForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Enregistrement des inputs dans les variables
    const film = document.getElementById('filmRecherche').value;
    const annee = document.getElementById('anneeRecherche').value;

    // Lien vers le url
    lien = "http://www.omdbapi.com/?type=movie&t=" + film + "&apikey=5fae0f09&y=" + annee

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            if (!JSON.parse(xhr.responseText).Title) {
                // En cas d'erreur, film non trouvé
                document.getElementById('cadreFilm').style.display = "none";
                document.getElementById("titre").innerHTML = null
                document.getElementById("année").innerHTML = null
                document.getElementById("para").innerHTML = null
                document.getElementById("actor").innerHTML = null
                document.getElementById("poster").innerHTML = null
                document.getElementById("rating1").innerHTML = null
                document.getElementById("rating2").innerHTML = null
                document.getElementById("ratingCount").innerHTML = null

                document.getElementById("erreur").innerHTML = "Error : Movie not found"
            } else {
                // Afficher le cadre film
                document.getElementById('cadreFilm').style.display = "flex";

                document.getElementById("titre").innerHTML = JSON.parse(xhr.responseText).Title
                document.getElementById("année").innerHTML = "Broadcast year = " +
                    JSON.parse(xhr.responseText).Year
                document.getElementById("para").innerHTML = JSON.parse(xhr.responseText).Plot
                document.getElementById("actor").innerHTML = "Actors : " + JSON.parse(xhr.responseText).Actors
                document.getElementById("poster").innerHTML = "<img src=" + JSON.parse(xhr.responseText).Poster +
                    " alt=''>"

                // Convertissement de la note en étoiles
                let rating = JSON.parse(xhr.responseText).imdbRating
                rating = Math.round(rating / 2)
                let emptyStar = 5 - rating

                document.getElementById("rating1").innerHTML = "<img src='./img/star.png' alt='' class='star'></img>".repeat(rating)
                document.getElementById("rating2").innerHTML = "<img src='./img/emptyStar.png' alt='' class='star'></img>".repeat(emptyStar)
                document.getElementById("ratingCount").innerHTML = JSON.parse(xhr.responseText).imdbVotes + " votes"

                document.getElementById("erreur").innerHTML = null;
            }
        }

    }

    // Cacher le formulaire et l'ombrage lorsqu'on Submit
    document.getElementById("Prompt").style.display = "none"
    document.getElementById("shadow").style.display = "none"


    xhr.open("get", lien, true);
    xhr.send(null);
});


// Faire apparaître le formulaire et l'ombrage lorsque l'on clique sur Search
document.getElementById('Search').addEventListener('click', function (event) {
    event.preventDefault();

    // Retirer la class "hidden" de la page
    document.getElementById("Prompt").style.display = "block"
    document.getElementById("shadow").style.display = "flex"
});


// Si l'utilisateur clique ailleur que dans le formulaire, retirer le formulaire
document.getElementById('shadow').addEventListener('click', function (event) {
    event.stopPropagation();
    const insideClick = document.getElementById('Prompt').contains(event.target)

    if (!insideClick) {

        // Retirer la class "hidden" de la page
        document.getElementById("Prompt").style.display = "none"
        document.getElementById("shadow").style.display = "none"
    }


});
