document.addEventListener("DOMContentLoaded", () => {
    init()
})

let c=document.getElementById("myCanvas");


//0 has no piece
//1 has player 1 piece
//2 has player 2 piece

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

let player1Pieces = 8
let player2Pieces = 8
let playerTurner  = 1

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



	update()
}



init = function(){
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
	update()
}

update = function(){
	let left = 0;
	let startX = 0;
	ctx.fillStyle = 'grey'

	for(let i = 0 ; i < 8 ; i++){
		for(let j = 0 ; j < 8 ; j += 2){
			startX = j * 70;
			if(i%2==0) startX = (j+1) * 70;
			ctx.fillRect(startX + left,(i*70) ,70,70);
		}
	}
	pieceUpdate()
}

pieceUpdate = function(){
	ctx.fillStyle = 'black'
	let X = 0
	let Y = 0
	let R = 30
	let sAngle = 0
	let eAngle = 2 * Math.PI


	for(let i = 0 ; i < 8 ; i++){
		let j = 0
		if(i%2==0) j = 1
		for(j ; j < 8 ; j+=2){
			//no pieces
			let piece = piecesArray[i][j]
			if(piece == 0);
			else {
				X = j * 70
				Y = i * 70
				ctx.beginPath()
				ctx.arc(X+35, Y+35, R, sAngle, eAngle)
				if(piece == 1)
					ctx.fillStyle = 'red'
				else if(piece == 2)
					ctx.fillStyle = 'black'
				else
					ctx.fillStyle = 'grey'
			}
			ctx.fill()
		}
	}
}
