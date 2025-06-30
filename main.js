

const cardsOnBoard = document.querySelectorAll('.card'); // sort a node list []

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
        const j = Math.floor(Math.random() * (i+1));
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

let flippedCards = [] //store flipped cards
let lockBoard = false //avoid clicking more than 2 cards at a time

//flip on click

cardsOnBoard.forEach(card => {
    card.addEventListener('click', function () {

        if (lockBoard) return;
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
    if(flippedCards[0].dataset.alt === flippedCards[1].alt) {
        //flippedCards[0].add.classList('flipped');
       // flippedCards[1].add.classList('flipped');
        flippedCards = []

        //pointCount++ for later maybe

    } else 
    lockBoard = true;
    setTimeout (() => {
        flippedCards[0].style.backgroundImage = '';
        flippedCards[1].style.backgroundImage = '';
        //flippedCards[0].remove.classList('flipped');
        //flippedCards[1].remove.classList('flipped');
        lockBoard = false;
        flippedCards = [];

    }, 1000)

}




