document.addEventListener ("DOMContentLoaded"), () =>{
const squares = document.querySelectorAll(".grid div")
const scoreDisplay= document.querySelectorAll("span")
const startBtn = document.querySelectorAll (".start")

const width = 10
let currentIndex = 0  // este sera el primer div en nuestro grid
let appleIndex = 0 // nuestro primer div en nuestro grid
let currentSnake = [2,1,0] //Esto es el valor inicial de nuestra serpiente (2 para la cabeza, 0 siendo el final y el 1 siendo el cuerpo por ahora ya que como veremos luego se aumentará con el tiempo)
let direction = 1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0

//Para empezar y reiniciar el juego.


function startGame() {
  currentSnake.forEach (index => squares [index].classList.remove("snake"))
  squares [appleIndex].classList.remove("apple")
  clearInterval(interval)
  score = 0

  //ahora como hacemos para poner una manzana en un sitio random.
  direction =1
  scoreDisplay.innerText = score
  intervalTime = 1000
  currentSnake = [2,1,0]
  currentIndex = 0
  currentSnake.forEach(index => squares [index].classList.add("snake"))
  interval = setInterval(moveOutcomes, intervalTime)
}



//Que es lo que pasa con todos los outcomes de la Snake.

function moveOutcomes () {

//Que es lo que pasa cuando la serpiente toca el borde o se da a si misma

if (

  (currentSnake[0] + width >= ( width * width) && direction === width)  || //si la serpiente se da abajo
  (currentSnake [0] % width === width -1 && direction ===1) || // si la serpiente se da en la derecha
  (currentSnake [0] % width === 0 && direction ===-1 ) || // si la serpiente se da en la izquierda
  (currentSnake [0] -width < 0 && direction === -width) || // si la serpiente se da arriba
  squares [currentSnake[0] + direction].classList.contains("snake") // si la serpiente se come a si misma.
) {
  return clearInterval(interval) // esto limpiara el intervalo si cualquiera de las cosas de arriba pasa
}

const tail = currentSnake.pop() //elimina el ultimo ite del array y lo enseña
squares[tail]. classList.remove("snake") // quita la class del snake de la cola
currentSnake.unshift(currentSnake[0] + direction) // le da direccion al array de la cabeza


//Que es lo que pasa cuando la serpiente se come una manzana.

if (squares [currentSnake[0]].classList.contains("apple")) {
squares [currentSnake[0]].classList.remove("apple")
squares[tail].classList.add("snake")
currentSnake.push(tail)

// manzana random

score ++
scoreDisplay.textContent = score
clearInterval(interval)
intervalTime = intervalTime * speed
interval = setInterval (moveOutcomes, intervalTime)
}

squares[currentSnake[0]].classList.add("snake")

}

// ahora vamos a asignar las funciones a los keycodes.

function control (e) {

  squares [currentIndex].classList.remove("snake") //quitamos la clase de la snake

  if (e.keyCode ===39) {
    direction = 1 // cuando presionemos la tecla de la derecha, la snake ira en esta dirección.
  } else if ( e.keyCode === 38) { // si presionamos la tecla de arriba, ira arriba
    direction = -width
   }else if ( e.keyCode ===37) { // si presionamos esta tecla ira para la izquierda
     direction = -1
   } else if (e.keyCode ===40){
     direction = +width  // si presionamos esta tecla, ira para abajo.
   }
}

document.addEventListener("keyup", control)
startBtn.addEventListener("click", startGame)

});
