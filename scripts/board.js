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
let firstClickCol = 0
let firstClickRow = 0

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
let square = function(color, row, col){
	this.dimen = 70
	this.color = color
	this.col = col
	this.row = row
	this.active = false
	this.piece = -1
	this.pieceColor = null
}

let checker = function(color, row, col){
	this.color = color
	this.king = false
	this.active = true
	this.col = col
	this.row = row
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

masterUpdate = function(col,row){

	console.log("Player Turn: " + playerTurn)


	col = Math.floor(col/70)
	row = Math.floor(row/70)

	console.log("col: " + col)
	console.log("row: " + row)


	if(firstMouseClick)
		firstClick(row, col)
	else
		secondClick(row, col)

	paint()
	pieceUpdate(checkersPerTeam)
}

//----------------------------------------------------------------------------//
//---------------------------Functions----------------------------------------//

//the values coming in are grid values
firstClick = function(row, col){

	if(checkerBoardArray[row][col].active == false){
		console.log("Tried to click inactive square")
	}
	else if(checkerBoardArray[row][col].pieceColor != playerTurn){
		console.log("Wrong player color")
	}



	if(checkerBoardArray[row][col].active == true){
		if(checkerBoardArray[row][col].pieceColor == playerTurn){
			firstClickCol = col
			firstClickRow = row
			firstClickIndex = checkerBoardArray[row][col].piece
			firstMouseClick = false
			console.log("First click successful")
		}
	}
}


// A lot of if statements here, I tried to make them clear
secondClick = function(row, col){
	let success = true
	//see if the clicked square is currently active, if so the move fails always
	if(checkerBoardArray[row][col].active){
		console.log("Tried to move onto another piece")
		firstMouseClick = true
		success = false
	}
	else if(checkerBoardArray[row][col].color == 'white'){
		console.log("Tried to move onto white space")
		firstMouseClick = true
		success = false
	}
	//black, non king backwards move
	//Remember, up is down
	else if(playerTurn == 'black' && row > firstClickRow && !blackCheckerArray[firstClickIndex].king){
		console.log("Tried to move backwards")
		firstMouseClick = true
		success = false
	}

	//red, non king backwards move
	//Remember, up is down
	else if(playerTurn == 'red' && row < firstClickRow && !redCheckerArray[firstClickIndex].king){
		console.log("Tried to move backwards")
		firstMouseClick = true
		success = false
	}

	//out o bounds
	//doesn't happen my dude with the current grid click setup

	//jump?
	//success is in here incase one of the more obvious cases failed above
	if(playerTurn == 'black' && row < firstClickRow && success){

		if(row == firstClickRow - 2){ //  || (col == firstClickCol + 2 && blackCheckerArray[firstClickIndex].king)

			//jump upLeft
			//up is to subtract from firstClickRow
			//left is to subtract from firstClickCol
			if(col == firstClickCol - 2){

				//successful jump :)
				//need to clear the jumped piece
				if(checkerBoardArray[firstClickRow - 1][firstClickCol - 1].active && checkerBoardArray[firstClickRow - 1][firstClickCol - 1].pieceColor == 'red'){
					let indexToDelete = checkerBoardArray[firstClickRow - 1][firstClickCol - 1].piece
					checkerBoardArray[firstClickRow - 1][firstClickCol - 1].active = false
					checkerBoardArray[firstClickRow - 1][firstClickCol - 1].piece = -1
					checkerBoardArray[firstClickRow - 1][firstClickCol - 1].pieceColor = null

					redCheckerArray[indexToDelete].active = false
				}
			}
			//jump upRight
			//up is to subtract from firstClickRow
			//right is to add to firstClickCol
			else if(col == firstClickCol + 2){

				//successful jump :)
				//need to clear the jumped piece
				if(checkerBoardArray[firstClickRow - 1][firstClickCol + 1].active && checkerBoardArray[firstClickRow - 1][firstClickCol + 1].pieceColor == 'red'){
					let indexToDelete = checkerBoardArray[firstClickRow - 1][firstClickCol + 1].piece
					checkerBoardArray[firstClickRow - 1][firstClickCol + 1].active = false
					checkerBoardArray[firstClickRow - 1][firstClickCol + 1].piece = -1
					checkerBoardArray[firstClickRow - 1][firstClickCol + 1].pieceColor = null

					redCheckerArray[indexToDelete].active = false
				}
			}
		}
	}

	if(playerTurn == 'red' && row > firstClickRow && success){

		if(row == firstClickRow + 2){ //  || (col == firstClickCol + 2 && blackCheckerArray[firstClickIndex].king)

			//jump downLeft
			//down is to add from firstClickRow
			//left is to subtract from firstClickCol
			if(col == firstClickCol - 2){

				//successful jump :)
				//need to clear the jumped piece
				if(checkerBoardArray[firstClickRow + 1][firstClickCol - 1].active && checkerBoardArray[firstClickRow + 1][firstClickCol - 1].pieceColor == 'red'){
					let indexToDelete = checkerBoardArray[firstClickRow + 1][firstClickCol - 1].piece
					checkerBoardArray[firstClickRow + 1][firstClickCol - 1].active = false
					checkerBoardArray[firstClickRow + 1][firstClickCol - 1].piece = -1
					checkerBoardArray[firstClickRow + 1][firstClickCol - 1].pieceColor = null

					redCheckerArray[indexToDelete].active = false
				}
			}
			//jump upRight
			//down is to add from firstClickRow
			//right is to add to firstClickCol
			else if(col == firstClickCol + 2){

				//successful jump :)
				//need to clear the jumped piece
				if(checkerBoardArray[firstClickRow + 1][firstClickCol + 1].active && checkerBoardArray[firstClickRow + 1][firstClickCol + 1].pieceColor == 'red'){
					let indexToDelete = checkerBoardArray[firstClickRow + 1][firstClickCol + 1].piece
					checkerBoardArray[firstClickRow + 1][firstClickCol + 1].active = false
					checkerBoardArray[firstClickRow + 1][firstClickCol + 1].piece = -1
					checkerBoardArray[firstClickRow + 1][firstClickCol + 1].pieceColor = null

					redCheckerArray[indexToDelete].active = false
				}
			}
		}
	}



	if(success){
		console.log("Successful move")
		checkerBoardArray[row][col].active = true
		checkerBoardArray[row][col].piece = firstClickIndex
		checkerBoardArray[row][col].pieceColor = playerTurn

		checkerBoardArray[firstClickRow][firstClickCol].active = false
		checkerBoardArray[firstClickRow][firstClickCol].piece = -1
		checkerBoardArray[firstClickRow][firstClickCol].pieceColor = null

		firstMouseClick = true


		if(playerTurn == 'red'){
			redCheckerArray[firstClickIndex].row = row
			redCheckerArray[firstClickIndex].col = col

			playerTurn = 'black'
		}
		else{
			blackCheckerArray[firstClickIndex].row = row
			blackCheckerArray[firstClickIndex].col = col

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
	for(let row = 0 ; row < grid ; row++){
		for(let col = 0 ; col < grid ; col++){
			ctx.moveTo(0,70*col);
			ctx.lineTo(560,70*col);
			ctx.stroke();

			ctx.moveTo(70*row,0);
			ctx.lineTo(70*row,560);
			ctx.stroke();
		}
	}
}

putPieces = function(){
	let index = 0
	for(let row = 0 ; row < 3 ; row++){
		let col = 0
		if(row%2==0) col = 1
		for(col ; col<grid ; col+=2){
			redCheckerArray[index] = new checker('red', row, col)
			index++
		}
	}
	index = 0
	for(let row = 5 ; row < grid ; row++){
		let col = 0
		if(row%2==0) col = 1
		for(col ; col<grid ; col+=2){
			blackCheckerArray[index] = new checker('black', row, col)
			index++
		}
	}
}

plaster = function(){
	let grey = false
	let color = 'white'

	for(let row = 0 ; row < grid ; row++){
		if(row % 2 == 0) grey = false
		else grey = true
		for(let col = 0 ; col < grid ; col++){

			if(grey==true){
				color = 'grey'
				grey = false
			}
			else{
				color = 'white'
				grey = true
			}

			checkerBoardArray[row][col] = new square(color, (col*70), (row*70))
		}
	}
}

paint = function(){
	for(let row = 0 ; row < grid ; row++){
		for(let col = 0 ; col < grid ; col++){
			ctx.fillStyle = checkerBoardArray[row][col].color

			ctx.fillRect(checkerBoardArray[row][col].col,
				checkerBoardArray[row][col].row,
				checkerBoardArray[row][col].dimen,
				checkerBoardArray[row][col].dimen)
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
			X = redCheckerArray[i].col * 70
			Y = redCheckerArray[i].row * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'red'
			ctx.fill()
			checkerBoardArray[redCheckerArray[i].row][redCheckerArray[i].col].active = true
			checkerBoardArray[redCheckerArray[i].row][redCheckerArray[i].col].piece = i
			checkerBoardArray[redCheckerArray[i].row][redCheckerArray[i].col].pieceColor = 'red'
		}

		if(blackCheckerArray[i].active == true){
			X = blackCheckerArray[i].col * 70
			Y = blackCheckerArray[i].row * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'black'
			ctx.fill()
			checkerBoardArray[blackCheckerArray[i].row][blackCheckerArray[i].col].active = true
			checkerBoardArray[blackCheckerArray[i].row][blackCheckerArray[i].col].piece = i
			checkerBoardArray[blackCheckerArray[i].row][blackCheckerArray[i].col].pieceColor = 'black'
		}
	}
}
