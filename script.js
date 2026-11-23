/* Calcolo e stampa della data odierna tramite array */
console.log("Avvio applicazione Coding&Color");

let oggi = new Date();
let giorniSettimana = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
let mesiAnno = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

let testoData = giorniSettimana[oggi.getDay()] + " " + oggi.getDate() + " " + mesiAnno[oggi.getMonth()] + " " + oggi.getFullYear();
console.log("Data corrente: " + testoData);
document.getElementById("dataOggi").innerText = "Oggi è " + testoData;

/* Array per l'RGB e funzione di composizione colore */
let rgbValori = [];

function rgb(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

/* Input, gestione array RGB e aggiornamento interfaccia */
function elabora() {
    let valoreInput = document.getElementById("inNumber").value.trim();
    let testoUtente = document.getElementById("inText").value.trim();
    let pErrore = document.getElementById("error");
    let pOutput = document.getElementById("outText");

    let numero = Number(valoreInput);
    if (valoreInput === "" || isNaN(numero) || !Number.isInteger(numero) || numero < 0 || numero > 255) {
        pErrore.innerText = "Errore: inserisci un numero intero compreso tra 0 e 255.";
        return;
    }

    /* Pulisce mesaggi di errore */
    pErrore.innerText = "";

    /* Se i 3 numeri precedentemente inseriti erano già completi, riavvia da capo per un nuovo colore */
    if (rgbValori.length === 3) {
        rgbValori = [];
        document.getElementById("valG").innerText = "G: --";
        document.getElementById("valB").innerText = "B: --";
    }

    /* Salva il numero in memoria */
    rgbValori.push(numero);
    document.getElementById("inNumber").value = "";

    /* Aggiornamento numeri R, G, B inseriti finora */
    if (rgbValori.length >= 1) document.getElementById("valR").innerText = "R: " + rgbValori[0];
    if (rgbValori.length >= 2) document.getElementById("valG").innerText = "G: " + rgbValori[1];
    if (rgbValori.length === 3) document.getElementById("valB").innerText = "B: " + rgbValori[2];

    let rTesto = rgbValori[0] !== undefined ? rgbValori[0] : "--";
    let gTesto = rgbValori[1] !== undefined ? rgbValori[1] : "--";
    let bTesto = rgbValori[2] !== undefined ? rgbValori[2] : "--";
    document.getElementById("codiceRgb").innerText = "rgb(" + rTesto + ", " + gTesto + ", " + bTesto + ")";
    pOutput.innerText = "Valore aggiunto: " + numero;

    /* Mostra il colore */
    if (rgbValori.length === 3) {
        console.log("Valori RGB completati: " + rgbValori.join(", "));

        let coloreFinale = rgb(rgbValori[0], rgbValori[1], rgbValori[2]);
        document.getElementById("anteprimaColore").style.backgroundColor = coloreFinale;
        pOutput.style.color = coloreFinale;

        if (testoUtente === "") {
            pOutput.innerText = "Testo colorato (" + coloreFinale + ")";
        } else {
            pOutput.innerText = testoUtente;
        }
    }
}

/* Ripristino completo dei campi, dell'anteprima e dell'array */
function reset() {
    document.getElementById("inNumber").value = "";
    document.getElementById("inText").value = "";
    document.getElementById("error").innerText = "";

    document.getElementById("valR").innerText = "R: --";
    document.getElementById("valG").innerText = "G: --";
    document.getElementById("valB").innerText = "B: --";

    document.getElementById("anteprimaColore").style.backgroundColor = "#dddddd";
    document.getElementById("outText").innerText = "Output";
    document.getElementById("outText").style.color = "#222222";
    document.getElementById("codiceRgb").innerText = "rgb(--, --, --)";

    rgbValori = [];
}