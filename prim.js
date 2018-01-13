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

document.addEventListener("DOMContentLoaded",init,false);

function init(){
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	for(var i = 0; i < 30; i++){
		var p = {
				size : 5,
				xPos : getRandomNumber(-10,width),
				yPos: getRandomNumber(-10,height),
				hue: getRandomNumber(1,359)
				};
		vertices.push(p);
		}
	hue = getRandomNumber(1,359)
	canvas.addEventListener("click",drawLine);
	draw();
	full_Length = vertices.length;
}

console.log(vertices);
function draw(){
	for(var i = 0; i < vertices.length; i++){
		ctx.beginPath();
		ctx.arc(vertices[i].xPos, vertices[i].yPos, vertices[i].size, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'hsl(' + vertices[i].hue + ',100%,50%)';
		ctx.fill();
	}
}
// draw function is just for the vertices, lines are from drawLine function

function drawLine(event) {
	var shortest_distance = 1442;
	var begin_point;
	var current_distance;
		if (counter < full_Length) {
		for (var i = 0;i < vertices.length;i++){
			//console.log("loop I has been completed!");
			for (var j =0;j < vertices.length;j++){
				//console.log("Loop J has been completed!");
				current_distance = Math.sqrt(Math.pow(vertices[i].xPos - vertices[j].xPos,2) + Math.pow(vertices[i].yPos - vertices[j].yPos,2));
				if (current_distance != 0){
				console.log("current_distance = ", current_distance);
				if(current_distance < shortest_distance) {
					shortest_distance = current_distance;
					start_Point_x = vertices[i].xPos;
					start_Point_y = vertices[i].yPos;
					end_Point_x = vertices[j].xPos;
					end_Point_y = vertices[j].yPos;
					begin_point = i;
					}
				}
			}
		
		}
			ctx.strokeStyle = "white"
			ctx.beginPath();
			ctx.moveTo(start_Point_x,start_Point_y);
			ctx.lineTo(end_Point_x,end_Point_y);
			ctx.closePath();
			ctx.stroke();
			console.log("Shortest line has been drawn! It was dot number " + begin_point + 1 + "With a measurement of", shortest_distance);
			counter++;
			vertices.splice(begin_point,1);
		}
		
		else{
			console.log("Dots have been successfully connected!")
		}
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