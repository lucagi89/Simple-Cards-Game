
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
            const card1 = data.cards[0].image
            const card2 = data.cards[1].image
            document.getElementById('card1').innerHTML = `<img src ='${card1}'/>`
            document.getElementById('card2').innerHTML = `<img src ='${card2}'/>`
        })
}




newDeckBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', drawCards)