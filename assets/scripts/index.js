//import utils from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Star {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
            x: (Math.random() - 2) * 0.000025,
            y: (Math.random() - 2) * 0.000025,
        }
        this.radians = Math.random() * Math.PI * 2;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.shadowColor = '#E3EAEF'
        c.shadowBlur = 20
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()


        //When ball hits bottom of screen
        // if(this.y - this.radius > canvas.height) {
        // this.y += Math.random() * canvas.height
        // this.x += Math.random() * canvas.width
        //   this.radius = Math.random(10) * 10;
        // }

        //circular motion

        this.y += this.velocity.y + Math.sin(this.radians);
        this.x += this.velocity.x + Math.cos(this.radians);

    }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')
let ticker = 0;
let stars
let backgroundStars
let randomSpawnRate = 75

function init() {
    stars = []
    backgroundStars = []

    // for (let i = 0; i < 1; i++) {
    //   stars.push(new Star(canvas.width / 2, canvas.height / 2, 10, 'white'));
    // }

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3
        backgroundStars.push(new Star(x, y, radius, 'white'))

    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)


    stars.forEach(Star => {
        Star.update()
    })

    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw();
    })

    ticker++

    if (ticker % randomSpawnRate == 0) {
        const y = Math.random() * canvas.height
        const x = Math.random() * canvas.width
        const radius = Math.random() * 3
        stars.push(new Star(x, y, radius, 'white'))
        randomSpawnRate = randomIntFromRange(75, 300)
    }

}

init()
animate()