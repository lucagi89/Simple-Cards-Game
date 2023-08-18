
const newDeckBtn = document.getElementById('new-deck-btn')
const drawBtn = document.getElementById('draw-btn')
let deckId

function getDeck(){
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
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
            winner(data.cards)
        })
}


function winner(cardsArray){
    const valuesArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1 = valuesArray.indexOf(cardsArray[0].value)
    const card2 = valuesArray.indexOf(cardsArray[1].value)

    if(card1 > card2){
        console.log('card 1 wins!')
    }else if(card1 < card2){
        console.log('card 2 wins!')
    }else{
        console.log("it's a draw!")
    }

    

}



newDeckBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', drawCards)