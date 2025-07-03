//timer
let timer;
let timeLeft = 60;
let timerElement = document.getElementById('timer')

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.innerHTML = `Time Left: ${minutes} : ${seconds < 10 ? "0" : ""} ${seconds}`;

        if (timeLeft <= 0) {
            
            clearInterval(timer);
            gameOver();
            
        }
    }, 1000)
}

/*function imageShuffled(images) {
    const newShufImages = [...images];
    for (let i = newShufImages.length - 1; i--) {
        const j  = Math.floor(Math.random() * (i + 1));
        [newShufImages[i], newShufImages[j]] = [newShufImages[j], newShufImages[i]]
    }
    return newShufImages
}

function generateRandomCouples (newShufImages) {
    const randomImages = imageShuffled(randomImages).slice(0, 8);

    const concatShuffleImg = [...randomImages, ...randomImages]
}*/


const cardsOnBoard = document.querySelectorAll('.card'); // sort a node list [] of all cards in htmlb

const images = [
 //   {img: './css/images/annie-lennox.jpg', alt: 'Annie Lennox', category: 'music'},
 //   {img: './css/images/cure.jpg', alt: 'The Cure', category: 'music'},
 //   {img: './css/images/david-bowie.jpg', alt: 'David Bowie', category: 'music'},
    {img: './css/images/freddie-mercury.jpg', alt: 'Freddie Mercury', category: 'music'},
    {img: './css/images/madonna.jpg', alt: 'Madonna' },
 //   {img: './css/images/siouxies.jpg', alt: 'Siouxie and the Banshees', category: 'music'},
 //   {img: './css/images/the-smiths.jpg', alt: 'The Smiths', category: 'music' },
    {img: './css/images/ian-curtis.jpg', alt: 'Ian Curtis', category: 'music' },
    {img: './css/images/cobain.jpg', alt: 'Kurt Cobain', category: 'music' },
//    {img: './css/images/bowie-mercury-jackson.jpg', alt: 'Bowie, Jackson, Mercury', category: 'music' },
    {img: './css/images/mccartney-jackson.jpg', alt: 'McCartney and Jackson', category: 'music' },
 //   {img: './css/images/bon-jovi.jpg', alt: 'Jon Bon Jovi', category: 'music'},
    {img: './css/images/bowie-d.jpg', alt: 'David Bowie', category: 'music'},
 //   {img: './css/images/elton-john.jpg', alt: 'Elton John', category: 'music'},
    {img: './css/images/gahan.jpg', alt: 'Dave Gahan', category: 'music'},
    {img: './css/images/laine.jpg', alt: 'Alice in Chains - Laine', category: 'music'},
 //   {img: './css/images/Prince.jpg', alt: 'Prince', category: 'music'},
]

const allImages = images.concat(images); //double images

//let cardClicked = [];

//make shuffle images (Fisher-Yates)
function shuffle(allImages) {
    for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]]
    }
    return allImages;
}
const shuffledPosition = shuffle(allImages)

//assign img to the tile

cardsOnBoard.forEach((cardToDisplay, i) => {
    cardToDisplay.dataset.img = shuffledPosition[i].img;
    cardToDisplay.dataset.alt = shuffledPosition[i].alt;
    //cardToDisplay.style.backgroundImage = '';

})

let flippedCards = []; //store flipped cards
let lockBoard = false; //avoid clicking more than 2 cards at a time

//flip on click

let timerStarted = false;
cardsOnBoard.forEach(card => {
    card.addEventListener('click', function () {

        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
        const clickSound = document.getElementById('click-sound')
        clickSound.currentTime = 0;
        clickSound.play();

        if (lockBoard) return;
        if (this.classList.contains('matched')) return;
        if (flippedCards.includes(this)) return;
        this.style.backgroundImage = `url('${card.dataset.img}')`;
        this.style.backgroundSize = 'cover';
        this.style.backgroundPosition = 'center';
        this.style.backgroundRepeat = 'no-repeat';

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch()
        }

    })

});


//match the cards


/*function flipCard(this.card) {
    this.card.classList.add('flipped');
    flippedCards.push[this.cardClicked];
    if (flippedCards.length === 2) {
        checkForMatch()
    }
}*/

//let pointCount = 0 



function checkForMatch() {
    if (flippedCards[0].dataset.alt === flippedCards[1].dataset.alt) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        flippedCards = []

        checkForWin();

        //pointCount++ for later maybe

    } else {
        lockBoard = true;
        setTimeout(() => {
            flippedCards[0].style.backgroundImage = '';
            flippedCards[1].style.backgroundImage = '';

            flippedCards = [];
            lockBoard = false;


        }, 1000);

    }

}
/*********************************************** toggle you won banner */
function checkForWin() {
    const cardFlipped = document.querySelectorAll('.matched');

    if (cardFlipped.length === 16) {
        wonMessage()
        clearInterval(timer)

    }
}
function wonMessage() {
    const youWon = document.getElementById('won');
    youWon.style.display = 'flex'

    const wonSound = document.getElementById('won-sound');
    wonSound.currentTime = 0;
    wonSound.play();

}

function gameOver () {
    if (document.querySelectorAll('.matched').length < 16 && timeLeft === 0) {
        gameOverMessage()
        lockBoard = true
        

    }
}

function gameOverMessage () {
    const isGameOver = document.getElementById('game-over');
    isGameOver.style.display = 'flex';

    const gameOverSound = document.getElementById('game-over-sound');
    gameOverSound.currentTime = 0;
    gameOverSound.play();


}
//restart button

document.getElementById('restart-game').addEventListener('click', restartGame);

function restartGame() {
    console.log('Restart function called');
    timerStarted = false;
    timeLeft = 60;
    timerElement.innerHTML = `Time Left: 01 : 00`; //reset timer
    clearInterval(timer);

    // reset background cards
    cardsOnBoard.forEach(card => {
        card.style.backgroundImage = '';
        card.classList.remove('matched');
    });

    // variables reset
    flippedCards = [];
    lockBoard = false;

    document.getElementById('won').style.display = 'none'; 
    //display won when restart game(or the button stay visible)
    document.getElementById('game-over').style.display= 'none';


    // new img array to shuffle
    const newAllPosition = images.concat(images);
    const newShuffledPosition = shuffle(newAllPosition);

    // reassign shuffled img
    cardsOnBoard.forEach((card, i) => {
        if (newShuffledPosition[i]) { // controlla che l'immagine esista
            card.dataset.img = newShuffledPosition[i].img;
            card.dataset.alt = newShuffledPosition[i].alt;
        }
    });

    console.log('Restart completed');
}