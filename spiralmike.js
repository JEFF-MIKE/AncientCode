(function(){
	var x; // co-ords
	var y; // co-ords
	var canvas;  // canvas
	var context; // for js canvas manipulation
	var width; // width of canvas
	var height; // height of canvas
	var size = 5; // size of square
	var direction;
	var i = 0;
	var n = 1;
	document.addEventListener("DOMContentLoaded",init,false);
	function init() {
		canvas = document.querySelector("canvas");
		context = canvas.getContext("2d");
		width = canvas.width;
		height = canvas.height;
		window.setInterval(draw,20);
		x = getRandomNumber(0,width);
		y = getRandomNumber(0,height);
	}
	setTimeout(declaration,100);
	
	function declaration(){
	direction = "up";
	}

	function draw(){
	context.fillStyle = "blue";
	context.fillRect(x,y,size,size);
	switch(direction){
	case "right":
		x += size;
	//	console.log("I moved right!");
		break;
	case "down":
		y += size;
	//	console.log("I moved down!");
		break;
	case "left":
		x -= size;
	//	console.log("I moved left!");
		break;
	case "up":
		y -= size;
	//	console.log("I moved up!");
		break;
	default:
		console.log("default case is being executed");
		break;
}
	if(direction === "up"){
		if (i === 0){
		i = n;
		direction = "right";
		}
		else{
		i -= 1;
		console.log(i);
		}
}
	if (direction ==="right"){
		if (i === 0) {
			direction = "down";
			n += 1;
			i = n;
			}
		else{
		//console.log(i);
		i -= 1;
		}
}
	if (direction === "down"){
		if(i === 0){
		direction = "left";
		i = n;
		}
		else{
		i -= 1;
		}
}
	if (direction === "left"){
		if(i === 0){
			direction = "up";
			n += 1;
			i = n;
			i -= 1;
		//	console.log(direction,i,n);
			}
		else{
		i -= 1;
		}
}
}	
	
	    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

}());
