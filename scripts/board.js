document.addEventListener("DOMContentLoaded", () => {
    init()
})

let c=document.getElementById("myCanvas");

// "2d" gives a two-dimensional rendering context.
let ctx=c.getContext("2d");
c.addEventListener('mouseup', logMouseButton);

function logMouseButton(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        update()
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

init = function(){
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){

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
	var left = 0;

	for(var a=0;a<8;a++) {
		for(var b=0; b<8;b+=2) {
			startX = b * 70;
			if(a%2==0) startX = (b+1) * 70;
			ctx.fillRect(startX + left,(a*70) ,70,70);
		}
	}
}
