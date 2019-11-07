document.addEventListener("DOMContentLoaded", () => {
	boardCreate()
	rePaint()
	putPieces()
	pieceUpdate()
})

let c=document.getElementById("myCanvas");

let redCheckerArray = []
let blackCheckerArray = []


//0 has no piece
//1 has player 1 piece
//2 has player 2 piece

let boardArray = [
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0],
]

let piecesArray = [
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,2,0,2,0,2,0,2],
	[2,0,2,0,2,0,2,0]
]

let checker = function(color, x, y){
	this.color = color
	this.king = false
	this.active = true
	this.coordX = x
	this.coordY = y
}
checker.prototype.movePos = function(x,y){
	this.coordX = x
	this.coordY = y
}
// black becomes king at x = 0 and red hits king at x = 7
checker.prototype.isKing = function(){
	if(this.color == 'black'){
		this.king = true
	}
	if(this.color = 'red'){
		this.king = true
	}
}

let player1Pieces = 8
let player2Pieces = 8
let playerTurn  = 1

// "2d" gives a two-dimensional rendering context.
let ctx=c.getContext("2d");

c.addEventListener('mouseup', logMouseButton);

function logMouseButton(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        masterUpdate(e.clientX, e.clientY)
				console.log('Left button clicked.')
        break;
      case 1:
        update()
				console.log('Middle button clicked.')
        break;
      case 2:
        update()
				console.log('Right button clicked.')
        break;
      default:
        log.textContent = `Unknown button code: ${e.button}`;
    }
  }
}

masterUpdate = function(x,y){
	console.log("x position " + x)
	console.log("y position " + y)

	rePaint()
	pieceUpdate()
}



boardCreate = function(){
	ctx.fillStyle = 'grey'
	for(let i = 0 ; i < 8 ; i++){
		for(let j = 0 ; j < 8 ; j++){
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
	for(let i = 0 ; i < 2 ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j<8 ; j+=2){
			redCheckerArray[index] = new checker('red', j, i)
			index++
		}
	}
	index = 0
	for(let i = 6 ; i < 8 ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j<8 ; j+=2){
			blackCheckerArray[index] = new checker('black', j, i)
			index++
		}
	}
}

rePaint = function(){
	let left = 0;
	let startX = 0;
	ctx.fillStyle = 'grey'

	for(let i = 0 ; i < 8 ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j < 8 ; j+=2){

			//should be an unnecessary check if the math is Right
			//but if we should want to extend later on this might be useful
			if(boardArray[i][j] == 1){
				startX = j * 70;
				ctx.fillRect(startX + left,(i*70) ,70,70);
			}
			else;
		}
	}
}

pieceUpdate = function(){
	ctx.fillStyle = 'black'
	let X = 0
	let Y = 0
	let R = 30
	let sAngle = 0
	let eAngle = 2 * Math.PI


	for(let i = 0 ; i < 8 ; i++){

		if(redCheckerArray[i].active == true){
			console.log("redCheckerArrayX " + i + "= " + redCheckerArray[i].coordX)
			X = redCheckerArray[i].coordX * 70
			Y = redCheckerArray[i].coordY * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'red'
			ctx.fill()
		}

		if(blackCheckerArray[i].active == true){
			X = blackCheckerArray[i].coordX * 70
			Y = blackCheckerArray[i].coordY * 70
			ctx.beginPath()
			ctx.arc(X+35, Y+35, R, sAngle, eAngle)
			ctx.fillStyle = 'black'
			ctx.fill()
		}
	}




}
