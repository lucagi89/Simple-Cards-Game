
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
        })
}




newDeckBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', drawCards)