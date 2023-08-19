
const newDeckBtn = document.getElementById('new-deck-btn')
const drawBtn = document.getElementById('draw-btn')
let computerScore = 0
let yourScore = 0
let deckId

function getDeck(){
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            updateRemainingCards(data.remaining)
        })
}

function drawCards(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            let count = 0
            const containerChildren = document.getElementById('cards-container').children
            for (let child of containerChildren){
            child.innerHTML = `<img src='${data.cards[count].image}'/>`
            count++
            }
            document.getElementById('verdict').textContent = winner(data.cards)
            updateRemainingCards(data.remaining)
        })
}


function winner(cardsArray){
    const valuesArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1 = valuesArray.indexOf(cardsArray[0].value)
    const card2 = valuesArray.indexOf(cardsArray[1].value)

    if(card1 > card2){
        computerScore++
        document.getElementById('computer-score').textContent = computerScore
        return 'Computer wins!'
    }else if(card1 < card2){
        yourScore++
        document.getElementById('your-score').textContent = yourScore
        return 'You Win!'
    }else{
        return "It's a War!!"
    }
}

document.getElementById('computer-score').textContent = computerScore
document.getElementById('your-score').textContent = yourScore

function updateRemainingCards(remaining){
    document.getElementById('remaining-cards').textContent = ' ' + remaining
    if(remaining === 0){
        drawBtn.disabled = true;
        theWinner()
    }
}

function theWinner(){
    if (computerScore > yourScore){
        document.getElementById('verdict').textContent = 'Computer Wins the Game!'
    }else{
        document.getElementById('verdict').textContent = 'You Win the Game!'
    }

    setInterval(() => location.reload(), 3000)
}



newDeckBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', drawCards)