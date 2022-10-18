const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown"
];

let matched_colors = []


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function flipCards(){
  const cards = document.querySelectorAll('#game div')
  for (let c of cards){
    if (!matched_colors.includes(c.style.backgroundColor)){
      c.style.backgroundColor = 'gray'
    }
  }
  while (1){
    let card_to_flip = Math.floor(Math.random() * cards.length)
    const card = cards[card_to_flip]
    if (!matched_colors.includes(card.style.backgroundColor)){
      card.style.backgroundColor = card.getAttribute('data-color')
      break
    }
  }  
  seconds_count ++
  document.querySelector('h2').innerText = seconds_count
}

let shuffledColors = shuffle(COLORS);
let flippingProcessID = -1
let seconds_count = 0

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 0
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = "card" + i
    newDiv.setAttribute('data-color', color)
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    i ++
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  
  event.target.style.background = event.target.getAttribute('data-color')

  if (flippingProcessID === -1){
    flippingProcessID = setInterval(flipCards, 2000)
  } else {
    const cards = document.querySelectorAll('#game div')
    for (let i = 0; i < cards.length; i ++){
      if (cards[i].style.backgroundColor === event.target.style.backgroundColor && cards[i].id != event.target.id) {
        matched_colors.push(event.target.style.backgroundColor)
      }
    }
  }

  if (matched_colors.length === COLORS.length / 2){
    clearInterval(flippingProcessID)
    document.querySelector('h2').innerText = 'Game Over ! ' + seconds_count + ' Seconds'
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
