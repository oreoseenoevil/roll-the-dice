const dices = document.querySelector('.dice-container')
const dice = document.getElementById('dice')
const button = document.querySelector('.button')
let active = false
let currentX = 0
let currentY = 0
let initialX = 0
let initialY = 0
let xOffSet = 0
let yOffSet = 0

button.addEventListener('click', dragEnd)

function randomizeNumber () {
  const random = Math.floor((Math.random() * 6) + 1)
  return random
}

function rollDice (side) {
  const currentClass = dice.getAttribute('class')
  const newClass = `show-${side}`

  dice.removeAttribute('class')
  dice.classList.add(newClass)

  if (currentClass === newClass) {
    dice.classList.add('show-same')
  }
}

dices.addEventListener('touchstart', dragStart, false)
dices.addEventListener('touchend', dragEnd, false)
dices.addEventListener('touchmove', drag, false)

dices.addEventListener('mousedown', dragStart, false)
dices.addEventListener('mouseup', dragEnd, false)
dices.addEventListener('mousemove', drag, false)

function dragStart (e) {
  if (e.type === 'mousedown') {
    initialX = e.clientX - xOffSet
    initialY = e.clientY - yOffSet

    active = true
  }
}

function dragEnd (e) {
  const number = randomizeNumber()
  if (number === 1) {
    rollDice('front')
  } else if (number === 2) {
    rollDice('back')
  } else if (number === 3) {
    rollDice('right')
  } else if (number === 4) {
    rollDice('left')
  } else if (number === 5) {
    rollDice('top')
  } else if (number === 6) {
    rollDice('bottom')
  }

  initialX = currentX
  initialY = currentY

  active = false
}

function drag (e) {
  if (active) {
    e.preventDefault()

    if (e.type === 'mousemove') {
      currentX = e.clientX - initialX
      currentY = e.clientY - initialY
    }

    xOffSet = currentX
    yOffSet = currentY

    setTranslate(currentX, currentY, dices)
  }
}

function setTranslate (xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
}
