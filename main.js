const $game = document.querySelector('#game')

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
    setInterval(() => {
      car.move()
    }, 200)
  }
}

function renderCar() {
  const $car = document.createElement('img')
  $car.setAttribute('src', 'red-car.png')
  $car.setAttribute('id', 'player-car')
  return $car
}

$game.appendChild(renderCar())
