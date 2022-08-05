const words = ['profit', '', 'smell', 'deserted', 'evasive', 'pull', 'share', 'achiever', 'ignore', 'pest', 'donkey', 'unbiased', 'confuse', 'bike', 'receptive', 'feeling', 'soak', 'sturdy', 'muddled', 'pump', 'room', 'stale', 'event', 'hospitable', 'claim', 'string', 'jellyfish', 'cover', 'equable', 'cute', 'cheap', 'efficacious', 'confused', 'neck', 'quickest', 'maid', 'zippy', 'hilarious', 'frail', 'supreme', 'phobic', 'welcome', 'buzz', 'axiomatic', 'telephone', 'daughter', 'vulgar', 'hateful', 'income', 'surround', 'curious', 'reading', 'fluttering', 'chalk', 'irritate', 'woozy', 'battle', 'ray', 'rat', 'tap', 'false', 'thunder', 'melted', 'pack', 'assorted', 'box', 'earth', 'committee', 'remarkable', 'memorize', 'jam', 'beginner', 'entertain', 'elfin', 'end', 'teeny', 'imminent', 'puzzled', 'near', 'yam', 'addition', 'picture', 'probable', 'painstaking', 'doctor', 'diligent', 'cynical', 'trade', 'half', 'burn', 'comparison', 'grade', 'few', 'productive', 'jelly', 'shaky', 'sort', 'action', 'materialistic', 'skin', 'little'];

let cards = [];

const StartTime = new Date().getTime();
//console.log(StartTime);

let activeCard = "";
const activeCards = [];

let gamePairs = 4;
let gameResult = 0;

let score = 0;

const buttonEasy = document.getElementById("button-easy");
buttonEasy.addEventListener('click', (e) => {
    gamePairs = 4;
    init();
});

const buttonHard = document.getElementById("button-hard");
buttonHard.addEventListener('click', (e) => {
    gamePairs = 8;
    init();
});




const clickCard = function () {
    console.log("kilk")
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove('hidden');
    //czy to pierwszy klik
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        console.log('1');
        return;
    }
    // czy to drugi klik
    else {
        console.log('2');
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrana")
                activeCards.forEach(card => card.classList.add('off'))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'))
                if (gameResult == gamePairs) {
                    console.log('WYGRANA GRA')
                    const EndTime = new Date().getTime();
                    const gameTime = (EndTime - StartTime) / 1000;
                    alert(`Udało się twoj wynik to: ${gameTime} sekund`)
                    location.reload();
                }
                
                 score = (gameResult/gamePairs)*gamePairs;
                 document.getElementById("game-score").innerHTML = `Brawo znalazłeś: ${score} par!!`;
            }
            else {
                console.log("przegrana")
                activeCards.forEach(card => card.classList.add('hidden'))

            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500)
    }
};
const init = function () {
    let gameBoardHtml = document.getElementById("game-board");
    while (gameBoardHtml.hasChildNodes()) {
        gameBoardHtml.removeChild(gameBoardHtml.firstChild);
    }
    

    const randomWords = [];
    for (let i = 0; i < gamePairs; i++) {
        const position = Math.floor(Math.random() * words.length);

        randomWords.push(words[position]);
        randomWords.push(words[position]);
        words.splice(position, 1);
    }

    const newWords = randomWords;
    for (let i = 0; i < 2 * gamePairs; i++) {
        const position = Math.floor(Math.random() * newWords.length);

        let gameCardHtml = document.createElement("div");
        gameCardHtml.insertAdjacentText('beforeend', newWords[position]);
        gameCardHtml.classList.add('game-card')
        gameCardHtml.classList.add(newWords[position])

        newWords.splice(position, 1);
        gameBoardHtml.appendChild(gameCardHtml);
    }

    cards = [...document.querySelectorAll(".game-card")];
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener('click', clickCard)
        })
    }, 500)
};

