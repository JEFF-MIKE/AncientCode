(function() {


var hue;
var c;
var ctx;
var starLst = []; // list for the particles
document.addEventListener("DOMContentLoaded",init,false);

function init() {
	c = document.querySelector("canvas");
	ctx = c.getContext("2d");
	for(var i = 0; i < 200; i++){
		var p =  {
			size : getRandomNumber(2,4),
			x : getRandomNumber(10,990),
			y : getRandomNumber(5,795),
			speed : getRandomNumber(1,13) + Math.random(1,5),
			hue : getRandomNumber(1,359)
		};
		starLst.push(p);
	}
	console.log(starLst);
	window.setInterval(draw,6.9444444444);
	
};
function draw(){
	console.log('I am drawing!!');
	ctx.clearRect(0,0,1000,800);	
	for(var i = 0; i < starLst.length; i++){
		
		ctx.beginPath();
		ctx.arc(starLst[i].x,starLst[i].y,starLst[i].size,0,2 * Math.PI,false);
		//ctx.fillStyle = 'white';
		ctx.fillStyle = 'hsl(' + starLst[i].hue + ',100%,50%)';
		ctx.fill();
		//ctx.fillRect(starLst[i].x,starLst[i].y,starLst[i].size,starLst[i].size);
		// Doing circles instead of rectangles here	
		starLst[i].y += starLst[i].speed;
		if(starLst[i].y > 800){
				starLst[i].y = 0;
				//starLst[i].hue = (starLst[i].hue+50) % 360;
				}
	
	}
	

			
			}
	
	
	
	function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
	// integer random number gen (floors a random number) 
})();

