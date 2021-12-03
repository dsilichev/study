const board = document.querySelector('#board')
const colors = ['#e49696', '#dce496', '#96e4b6', '#96bee4', '#c596e4', '#e496ad', '#c2e496']
const SQUARE_NUMBER = 600

for (let i = 0; i < SQUARE_NUMBER; i++) {
  const square = document.createElement('div')
  square.classList.add('square')

  square.addEventListener('mouseover', () =>
  setColor(square))

  square.addEventListener('mouseleave', () =>
  removeColor(square))

  board.append(square)
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
  element.style.backgroundColor = '#1d1d1d'
  element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}