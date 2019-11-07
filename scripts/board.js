//----------------------------------------------------------------------------//
//---------------------------Globals------------------------------------------//

let redCheckerArray = []
let blackCheckerArray = []
let checkerBoardArray = [
	[], [], [], [], [], [], [], []
]
let checkersPerTeam = 12
let numberOfSquare = 64
let grid = 8
let borderWidth = 4

let player1Pieces = 12
let player2Pieces = 12
let playerTurn  = 'black'

let firstMouseClick = true

let firstClickedPiece = null
let firstClickX = 0
let firstClickY = 0

let c=document.getElementById("myCanvas");
// "2d" gives a two-dimensional rendering context.
let ctx=c.getContext("2d");

//----------------------------------------------------------------------------//
//---------------------------First starting out-------------------------------//

document.addEventListener("DOMContentLoaded", () => {
	boardCreate()
	plaster()
	paint()
	putPieces()
	pieceUpdate(checkersPerTeam)
})

//----------------------------------------------------------------------------//
//---------------------------Data Structures----------------------------------//

//0 has no piece
//1 has player 1 piece
//2 has player 2 piece
let square = function(color, x, y){
	this.dimen = 70
	this.color = color
	this.coordX = x
	this.coordY = y
	this.active = false
	this.piece = -1
	this.pieceColor = null
}

let checker = function(color, x, y){
	this.color = color
	this.king = false
	this.active = true
	this.coordX = x
	this.coordY = y
}
// black becomes king at x = 0 and red hits king at x = 7

//----------------------------------------------------------------------------//
//---------------------------Mouse Event--------------------------------------//

c.addEventListener('mouseup', function(e){
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
				let canvas = c.getBoundingClientRect()

				//the math is for figuring relative mouse location to the canvas
        masterUpdate(e.clientX-canvas.left-borderWidth, e.clientY-canvas.top-borderWidth)
				//console.log('Left button clicked.')
        break;
      case 1:
				//console.log('Middle button clicked.')
        break;
      case 2:
				//console.log('Right button clicked.')
        break;
      default:
        log.textContent = `Unknown button code: ${e.button}`;
    }
  }
})

//----------------------------------------------------------------------------//
//---------------------------Game Loop----------------------------------------//

masterUpdate = function(x,y){
	// console.log("x position " + x)
	// console.log("y position " + y)

	let gridX = Math.floor(x/70)
	let gridY = Math.floor(y/70)


	if(firstMouseClick)
		firstClick(gridX, gridY)
	else
		secondClick(gridX, gridY)

	paint()
	pieceUpdate(checkersPerTeam)
}

//----------------------------------------------------------------------------//
//---------------------------Functions----------------------------------------//

//the values coming in are grid values
firstClick = function(gridX,gridY){
	if(checkerBoardArray[gridX][gridY].active == false){
		console.log("Tried to click inactive square")
	}
	else if(checkerBoardArray[gridX][gridY].pieceColor != playerTurn){
		console.log("Wrong player color")
	}



	if(checkerBoardArray[gridX][gridY].active == true){
		if(checkerBoardArray[gridX][gridY].pieceColor == playerTurn){
			firstClickX = gridX
			firstClickY = gridY
			firstClickIndex = checkerBoardArray[gridX][gridY].piece
			firstMouseClick = false
			console.log("First click successful")
		}
	}
}


// A lot of if statements here, I tried to make them clear
secondClick = function(gridX, gridY){

	//see if the clicked square is currently active, if so the move fails always
	if(checkerBoardArray[gridX][gridY].active){
		console.log("Tried to move onto another piece")
		firstMouseClick = true
	}
	else if(checkerBoardArray[gridX][gridY].color == 'white'){
		console.log("Tried to move onto white space")
		firstMouseClick = true
	}

	else{
		console.log("Successful move")
		checkerBoardArray[gridX][gridY].active = true
		checkerBoardArray[gridX][gridY].piece = firstClickIndex
		checkerBoardArray[gridX][gridY].pieceColor = playerTurn

		checkerBoardArray[firstClickX][firstClickY].active = false
		checkerBoardArray[firstClickX][firstClickY].piece = -1
		checkerBoardArray[firstClickX][firstClickY].pieceColor = null

		firstMouseClick = true


		if(playerTurn == 'red'){
			redCheckerArray[firstClickIndex].coordX = gridX
			redCheckerArray[firstClickIndex].coordY = gridY

			playerTurn = 'black'
		}
		else{
			blackCheckerArray[firstClickIndex].coordX = gridX
			blackCheckerArray[firstClickIndex].coordY = gridY

			playerTurn = 'red'
		}
	}
}

clear = function(square){
	this.active = false
	this.piece = null
}

boardCreate = function(){
	ctx.fillStyle = 'grey'
	for(let i = 0 ; i < grid ; i++){
		for(let j = 0 ; j < grid ; j++){
			ctx.moveTo(0,70*j);
			ctx.lineTo(560,70*j);
			ctx.stroke();

			ctx.moveTo(70*i,0);
			ctx.lineTo(70*i,560);
			ctx.stroke();
		}
	}
}

putPieces = function(){
	let index = 0
	for(let i = 0 ; i < 3 ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j<grid ; j+=2){
			redCheckerArray[index] = new checker('red', j, i)
			index++
		}
	}
	index = 0
	for(let i = 5 ; i < grid ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j<grid ; j+=2){
			blackCheckerArray[index] = new checker('black', j, i)
			index++
		}
	}
}

plaster = function(){
	let grey = false
	let color = 'white'

	for(let i = 0 ; i < grid ; i++){
		if(i % 2 == 0) grey = false
		else grey = true
		for(let j = 0 ; j < grid ; j++){

			if(grey==true){
				color = 'grey'
				grey = false
			}
			else{
				color = 'white'
				grey = true
			}

			checkerBoardArray[i][j] = new square(color, (j*70), (i*70))
		}
	}
}

paint = function(){
	for(let i = 0 ; i < grid ; i++){
		for(let j = 0 ; j < grid ; j++){
			ctx.fillStyle = checkerBoardArray[i][j].color

			ctx.fillRect(checkerBoardArray[i][j].coordX,
				checkerBoardArray[i][j].coordY,
				checkerBoardArray[i][j].dimen,
				checkerBoardArray[i][j].dimen)
		}
	}
}

pieceUpdate = function(numCheckers){
	ctx.fillStyle = 'black'
	let X = 0
	let Y = 0
	let R = 30
	let sAngle = 0
	let eAngle = 2 * Math.PI

	for(let i = 0 ; i < numCheckers ; i++){

		if(redCheckerArray[i].active == true){
			X = redCheckerArray[i].coordX * 70
			Y = redCheckerArray[i].coordY * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'red'
			ctx.fill()
			checkerBoardArray[redCheckerArray[i].coordX][redCheckerArray[i].coordY].active = true
			checkerBoardArray[redCheckerArray[i].coordX][redCheckerArray[i].coordY].piece = i
			checkerBoardArray[redCheckerArray[i].coordX][redCheckerArray[i].coordY].pieceColor = 'red'
		}

		if(blackCheckerArray[i].active == true){
			X = blackCheckerArray[i].coordX * 70
			Y = blackCheckerArray[i].coordY * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'black'
			ctx.fill()
			checkerBoardArray[blackCheckerArray[i].coordX][blackCheckerArray[i].coordY].active = true
			checkerBoardArray[blackCheckerArray[i].coordX][blackCheckerArray[i].coordY].piece = i
			checkerBoardArray[blackCheckerArray[i].coordX][blackCheckerArray[i].coordY].pieceColor = 'black'
		}
	}
}
