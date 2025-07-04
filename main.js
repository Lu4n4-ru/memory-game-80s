let timer;
let timeLeft = 45;
let timerElement = document.getElementById('timer');

const images = [
    { img: './css/images/annie-lennox.jpg', alt: 'Annie Lennox', category: 'music' },
    { img: './css/images/cure.jpg', alt: 'The Cure', category: 'music' },
    { img: './css/images/david-bowie.jpg', alt: 'David Bowie', category: 'music' },
    { img: './css/images/freddie-mercury.jpg', alt: 'Freddie Mercury', category: 'music' },
    { img: './css/images/madonna.jpg', alt: 'Madonna' },
    { img: './css/images/siouxies.jpg', alt: 'Siouxie and the Banshees', category: 'music' },
    { img: './css/images/the-smiths.jpg', alt: 'The Smiths', category: 'music' },
    { img: './css/images/ian-curtis.jpg', alt: 'Ian Curtis', category: 'music' },
    { img: './css/images/cobain.jpg', alt: 'Kurt Cobain', category: 'music' },
    { img: './css/images/bowie-mercury-jackson.jpg', alt: 'Bowie, Jackson, Mercury', category: 'music' },
    { img: './css/images/mccartney-jackson.jpg', alt: 'McCartney and Jackson', category: 'music' },
    { img: './css/images/bon-jovi.jpg', alt: 'Jon Bon Jovi', category: 'music' },
    { img: './css/images/bowie-d.jpg', alt: 'David Bowie', category: 'music' },
    { img: './css/images/elton-john.jpg', alt: 'Elton John', category: 'music' },
    { img: './css/images/gahan.jpg', alt: 'Dave Gahan', category: 'music' },
    { img: './css/images/laine.jpg', alt: 'Alice in Chains - Laine', category: 'music' },
    { img: './css/images/Prince.jpg', alt: 'Prince', category: 'music' },
];

//randomize images fn
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//new image selection at the start of the game
window.onload = function () {
    const cardsOnBoard = document.querySelectorAll('.card');
    let flippedCards = [];
    let lockBoard = false;
    let timerStarted = false;
//assign random images
    function assignRandomImages() {
        const shuffled = [...images].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 8);
        const allImages = shuffle([...selected, ...selected]);
        cardsOnBoard.forEach((card, i) => {
            card.dataset.img = allImages[i].img;
            card.dataset.alt = allImages[i].alt;
            card.style.backgroundImage = '';
            card.classList.remove('matched');
        });
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerHTML = `Time Left: ${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameOver();
            }
        }, 1000);
    }

    function checkForMatch() {
        if (flippedCards[0].dataset.alt === flippedCards[1].dataset.alt) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            flippedCards = [];
            checkForWin();
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

    function checkForWin() {
        const cardFlipped = document.querySelectorAll('.matched');
        if (cardFlipped.length === 16) {
            wonMessage();
            clearInterval(timer);
        }
    }

    function wonMessage() {
        const youWon = document.getElementById('won');
        youWon.style.display = 'flex';
        const wonSound = document.getElementById('won-sound');
        if (wonSound) {
            wonSound.currentTime = 0;
            wonSound.play();
        }
    }

    function gameOver() {
        if (document.querySelectorAll('.matched').length < 16 && timeLeft === 0) {
            gameOverMessage();
            lockBoard = true;
        }
    }

    function gameOverMessage() {
        const isGameOver = document.getElementById('game-over');
        isGameOver.style.display = 'flex';
        const gameOverSound = document.getElementById('game-over-sound');
        if (gameOverSound) {
            gameOverSound.currentTime = 0;
            gameOverSound.play();
        }
    }

    function restartGame() {
        timerStarted = false;
        timeLeft = 45;
        timerElement.innerHTML = `Time Left: 01 : 00`;
        clearInterval(timer);
        assignRandomImages();
        flippedCards = [];
        lockBoard = false;
        document.getElementById('won').style.display = 'none';
        document.getElementById('game-over').style.display = 'none';
    }

    // Event listener for the restart
    document.getElementById('restart-game').addEventListener('click', restartGame);

    // random image from the pool when restart
    assignRandomImages();

    // Event listener click on cards
    cardsOnBoard.forEach(card => {
        card.addEventListener('click', function () {
            if (!timerStarted) {
                startTimer();
                timerStarted = true;
            }
            const clickSound = document.getElementById('click-sound');
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
            if (lockBoard) return;
            if (this.classList.contains('matched')) return;
            if (flippedCards.includes(this)) return;
            this.style.backgroundImage = `url('${card.dataset.img}')`;
            this.style.backgroundSize = 'cover';
            this.style.backgroundPosition = 'center';
            this.style.backgroundRepeat = 'no-repeat';
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                checkForMatch();
            }
        });
    });
};