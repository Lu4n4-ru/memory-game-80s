
//timer
let timer;
let timeLeft = 30;
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


const cardsOnBoard = document.querySelectorAll('.card'); // sort a node list [] of all cards in htmlb

const images = [
    { img: './css/images/annie-lennox.jpg', alt: 'Annie Lennox' },
    { img: './css/images/cure.jpg', alt: 'The Cure' },
    { img: './css/images/david-bowie.jpg', alt: 'David Bowie' },
    { img: './css/images/freddie-mercury.jpg', alt: 'Freddie Mercury' },
    { img: './css/images/madonna.jpg', alt: 'Madonna' },
    { img: './css/images/siouxies.jpg', alt: 'Siouxie and the Banshees' }
]

const allImages = images.concat(images); //double images

//let cardClicked = [];

//make shuffle images
function shuffle(allImages) {
    for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]]
    }
    return allImages;
}
const shuffledImages = shuffle(allImages)

//assign img to the tile

cardsOnBoard.forEach((cardToDisplay, i) => {
    cardToDisplay.dataset.img = shuffledImages[i].img;
    cardToDisplay.dataset.alt = shuffledImages[i].alt;
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
/*********************************************** toggle you won button */
function checkForWin() {
    const cardFlipped = document.querySelectorAll('.matched');

    if (cardFlipped.length === 12) {
        wonMessage()

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
    if (document.querySelectorAll('.matched').length < 12 && timeLeft === 0) {
        gameOverMessage()

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
    timeLeft = 30;
    timerElement.innerHTML = `Time Left: 00 : 30`; //reset timer
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
    const newAllImages = images.concat(images);
    const newShuffledImages = shuffle(newAllImages);

    // reassign shuffled img
    cardsOnBoard.forEach((card, i) => {
        if (newShuffledImages[i]) { // controlla che l'immagine esista
            card.dataset.img = newShuffledImages[i].img;
            card.dataset.alt = newShuffledImages[i].alt;
        }
    });

    console.log('Restart completed');
}
