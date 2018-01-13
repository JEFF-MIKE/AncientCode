(function() {


var hue;
var c;
var ctx;
var starLst = []; // list for the particles
var direction;
document.addEventListener("DOMContentLoaded",init,false);

function init() {
	c = document.querySelector("canvas");
	ctx = c.getContext("2d");
	for(var i = 0; i < 200; i++){
		var p =  {
			size : getRandomNumber(1,3),
			x : getRandomNumber(10,990),
			y : 0,
			speed : getRandomNumber(1,15),
			hue : getRandomNumber(1,359),
			xDirection : getRandomNumber(0,1),
			yDirection : getRandomNumber(0,1)
		};
		starLst.push(p);
	}
	console.log(starLst);
	window.setInterval(draw,15);
	
};
console.log("I WORK EXCUSE ME");
function draw(){
	console.log('I am drawing!!');
	ctx.clearRect(0,0,1000,800);	
	for(var i = 0; i < starLst.length; i++){
		ctx.fillStyle = 'hsl(' + starLst[i].hue + ',100%,50%)';
		ctx.fillRect(starLst[i].x,starLst[i].y,starLst[i].size,starLst[i].size);
		if(starLst[i].y > 801 || starLst[i].y < 0){
				starLst[i].yDirection = (starLst[i].yDirection + 1) % 2;
				//starLst[i].hue = (starLst[i].hue+50) % 360;
			}
		if(starLst[i].x > 1000 || starLst[i].x < 0){
				starLst[i].xDirection = (starLst[i].xDirection + 1) % 2;
				//starLst[i].hue = (starLst[i].hue+1) % 360;
			}
		switch(starLst[i].xDirection){
		case 0 :
			starLst[i].x += starLst[i].speed;
			starLst[i].hue = (starLst[i].hue+1) % 360;
			break;
		case 1 :
			starLst[i].x -= starLst[i].speed;
			starLst[i].hue = (starLst[i].hue+1) % 360;
			break;
		default :
			console.log('This the default xDirection swap');
			break;
			
		}
		switch(starLst[i].yDirection){
		case 0:
			starLst[i].y += starLst[i].speed;
			starLst[i].hue = (starLst[i].hue+1) % 360;
			break;
		case 1:
			starLst[i].y -= starLst[i].speed;
			starLst[i].hue = (starLst[i].hue+1) % 360;
			break;
		default:
			console.log('This is the default yDirection swap');
			break;
		}
		
	}
		
	

			
	}
	
	
	
	function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

})();