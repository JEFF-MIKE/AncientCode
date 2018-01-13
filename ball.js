(function(){
    var ball,
	canvas,
	ctx,
	ak,
	cw,
        ch;
    window.setTimeout(init,400);
    function init() {
      canvas = document.querySelector('canvas');
      ctx = canvas.getContext('2d');
      cw = canvas.width;
      ch = canvas.height;
      draw();
      console.log(ball);
      ball = { xPos : getRandom(40,cw -40),
	         yPos : getRandom(40,ch - 40),
	         r : 20,
	         velocity : 2
	        }
      }
   
     function draw() {
       ctx.clearRect(0,0,cw,ch);
       ctx.beginPath;
       ctx.arc(ball.xPos,ball.yPos,ball.r,0,2 * Math.PI,false);
       ctx.fillStyle = 'red';
       ctx.fill();
    }
      
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
}());