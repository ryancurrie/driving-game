class Car {
  constructor(direction, speed, location) {
    this.direction = direction
    this.speed = speed
    this.location = location
  }

  turn(direction) {
    this.direction = direction
  }

  accelerate(amount) {
    this.speed += amount
  }

  move() {
    switch (this.direction) {
      case 'n':
        this.location[1] += this.speed
        break
      case 's':
        this.location[1] -= this.speed
        break
      case 'e':
        this.location[0] += this.speed
        break
      case 'w':
        this.location[0] -= this.speed
    }
  }
  static start(car) {
    car.timerId = setInterval(() => {
      car.move()
      console.log(car.location)
    }, 200)
  }
  static stop(car) {
    if (car.timerId) {
      clearInterval(car.timerId)
    }
  }
}

function renderCar(car) {
  const $car = document.createElement('img')
  $car.setAttribute('src', 'red-car.png')
  $car.setAttribute('id', 'player-car')
  $car.style.left = car.location[0] + 'px'
  $car.style.top = car.location[1] + 'px'
  return $car
}

function renderTrack() {
  const $track = document.createElement('img')
  $track.setAttribute('src', 'track.png')
  $track.setAttribute('id', 'track')
  return $track
}

const $game = document.querySelector('#game')
const player = new Car('n', 20, [189.5, 1152])
$game.appendChild(renderCar(player))
$game.appendChild(renderTrack())

const $playerCar = document.querySelector('#player-car')
const $carStyle = $playerCar.style

let keyDown = false

window.addEventListener('keydown', (e) => {
  if (keyDown) return
  keyDown = true
  if (e.keyCode === 32) {
    Car.start(player)
  }
})

window.addEventListener('keyup', (e) => {
  keyDown = false
  if (e.keyCode === 32) {
    Car.stop(player)
  }
})

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 37:
      player.turn('e')
      $carStyle.transform = 'rotate(-90deg)'
      break
    case 39:
      player.turn('w')
      $carStyle.transform = 'rotate(90deg)'
      break
    case 38:
      player.turn('n')
      $carStyle.transform = 'rotate(0)'
      break
    case 40:
      player.turn('s')
      $carStyle.transform = 'rotate(180deg)'
      break
  }
})
