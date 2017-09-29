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
        this.location[1] -= this.speed
        break
      case 's':
        this.location[1] += this.speed
        break
      case 'e':
        this.location[0] -= this.speed
        break
      case 'w':
        this.location[0] += this.speed
    }
  }
  static start(car) {
    car.timerGo = setInterval(() => {
      car.move()
    }, 16)
  }
  static stop(car) {
    if (car.timerGo) {
      clearInterval(car.timerGo)
    }
  }
  static boost(car) {
    car.accelerate(5)
    car.boosted = true
  }
  static noBoost(car) {
    car.boosted = false
    car.speed = 5
  }
}

function renderCar(car) {
  const $car = document.createElement('img')
  if (car.boosted) {
    $car.setAttribute('src', 'red-car.png')
  }
  else {
    $car.setAttribute('src', 'blue-car.png')
  }
  $car.setAttribute('id', 'player-car')
  $car.style.left = car.location[0] + 'px'
  $car.style.top = car.location[1] + 'px'

  switch (car.direction) {
    case 'e':
      $car.style.transform = 'rotate(-90deg)'
      break
    case 'w':
      $car.style.transform = 'rotate(90deg)'
      break
    case 'n':
      $car.style.transform = 'rotate(0)'
      break
    case 's':
      $car.style.transform = 'rotate(180deg)'
      break
  }
  return $car
}

function renderTrack() {
  const $track = document.createElement('img')
  $track.setAttribute('src', 'track.png')
  $track.setAttribute('id', 'track')
  return $track
}

const $game = document.querySelector('#game')
const player = new Car('n', 5, [79.5, 598])
$game.appendChild(renderCar(player))
$game.appendChild(renderTrack())

let keyDown = false

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 66) {
    console.log('boost')
    Car.boost(player)
  }
})

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 66) {
    Car.noBoost(player)
  }
})

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
      break
    case 39:
      player.turn('w')
      break
    case 38:
      player.turn('n')
      break
    case 40:
      player.turn('s')
      break
  }
})

setInterval(function () {
  $game.innerHTML = ''
  const $track = renderTrack()
  const $car = renderCar(player)
  $game.appendChild($track)
  $game.appendChild($car)
}, 16)
