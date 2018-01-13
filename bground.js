(function(){
var width; // canvas width
var height; // canvas height
var vertices = []; // list to store individual vertex objects
var size = 2; // size of the squares
var canvas;
var ctx;
var hue;
var counter = 1;
var start_Point_x;
var start_Point_y;
var end_Point_x;
var end_Point_y;
var full_Length; // for the initial length of the vertices
var current_Vertex; // This is for djikstra's algorithm. This is dynamic
var end_Vertex; // This is static

document.addEventListener("DOMContentLoaded",init,false);

function init(){
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	for(var i = 0; i < 40; i++){
		var p = {
				size : 5,
				xPos : getRandomNumber(0,width),
				yPos: getRandomNumber(0,height),
				hue: getRandomNumber(1,359),
				prev_Vertex: undefined,
				speed: getRandomNumber(2,5),
				xDirection: getRandomNumber(0,1),
				yDirection: getRandomNumber(0,1)
				};
		vertices.push(p);
	}                              // list of vertices of Djikstra
	hue = getRandomNumber(1,359)
	current_Vertex = getRandomNumber(0,29); // we use current_Vertex here to pick a beginning spot
	end_Vertex = getRandomNumber(0,29); // end_Vertex
	while(current_Vertex === end_Vertex){
		current_Vertex = getRandomNumber(0,29);
		end_Vertex = getRandomNumber(0,29);
	} 
	// should only execute if the current_Vertex and end_Vertices are equal
	window.setInterval(draw,6.944444);
}

console.log(vertices);
function draw(){
	ctx.clearRect(0,0,1800,1020);
	for(var i = 0,max = vertices.length; i < max; i++){
		ctx.beginPath();
		ctx.arc(vertices[i].xPos, vertices[i].yPos, vertices[i].size, 0, 2 * Math.PI, false);
		//ctx.fillStyle = 'hsl(' + vertices[i].hue + ',100%,50%)';
		ctx.fillStyle = "red";
		ctx.fill();
		if (vertices[i].xPos < 0 || vertices[i].xPos > 640){
			vertices[i].xDirection = (vertices[i].xDirection + 1) % 2;
		}
		if (vertices[i].yPos < 0 || vertices[i].yPos > 480){
			vertices[i].yDirection = (vertices[i].yDirection + 1) % 2;
		}
		switch(vertices[i].xDirection){
		case 0 :
			vertices[i].xPos += vertices[i].speed;
			break;
		case 1 :
			vertices[i].xPos -= vertices[i].speed;
			break;
		default :
			console.log('this is the beginning value for x');
			break;
		}
		switch(vertices[i].yDirection){
		case 0 :
			vertices[i].yPos += vertices[i].speed;
			break;
		case 1 :
			vertices[i].yPos -= vertices[i].speed;
			break;
		default :
			console.log('This is the beginning value for y');
			break;
		}
		for (var j = 0;j < vertices.length;j++){
			ctx.strokeStyle = 'hsl(' + vertices[j].hue + 1  + ',100%,50%)';
			//ctx.strokeStyle = 'red';
			ctx.beginPath();
			ctx.moveTo(vertices[i].xPos,vertices[i].yPos);
			ctx.lineTo(vertices[j].xPos,vertices[j].yPos);
			ctx.closePath();
			ctx.stroke();
			
		}
	}
/*
	ctx.font = "30px Impact";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("How it feels to chew 5 Gum", canvas.width/2, canvas.height/2); 
*/
}
function getRandomNumber(min, max) {
return Math.round(Math.random() * (max - min)) + min;
}
				/*nextVertex : function(){
					console.log(i, 'This is the current loop number');
					if (vertices.length > 0){
						distance = Math.sqrt(Math.pow(vertices[i].xPos - vertices[i-1].xPos,2)+ Math.pow(vertices[i].yPos - vertices[i-1].yPos,2));
						}
					else{
					distance = 0;};		
					}
					*/


})();