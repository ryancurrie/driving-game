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

function renderCar() {
  const $car = document.createElement('img')
  $car.setAttribute('src', 'red-car.png')
  $car.setAttribute('id', 'player-car')
  return $car
}

const $game = document.querySelector('#game')
const player = new Car('n', 20, [0, 0])
let keyDown = false

$game.appendChild(renderCar())

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
