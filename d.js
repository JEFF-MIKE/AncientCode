(function(){
	var canvas,
		ctx,
		cw,
		ch,
		vertices = [],
		startV,  // starting point
		endV,  // end point
		spT = [],
		tD = [], // tentative distance!
		step = 1, // must be global for a step by step
		lowest_dis = Infinity; // needs to be a global for the re-assignment
	document.addEventListener("DOMContentLoaded",init,false);
	
	function init(){
		var vertex;
		canvas = document.querySelector("canvas");
		ctx = canvas.getContext('2d');
		cw = canvas.width;
		cl = canvas.height;
		for(var i = 0; i < 10; i++ ){
			var v = { size : 5,
					  hue : getRandomNumber(1, 359),
					  xPos : getRandomNumber(50, cw-50),
					  yPos : getRandomNumber(50, cl-50),
					  connected_to : [],
					  d : [],
					  vertex_count:getRandomNumber(1,2)
					  };
					for (var g = 0,glen = v.vertex_count; g < glen; g++) {
						vertex = getRandomNumber(0,9); // list indexes
						if (vertex === i) {
							while (vertex === i ) {
								vertex = getRandomNumber(0,9);
								if (!(vertex === i )){
									break;
									}
								}
							}
						if (v.connected_to.indexOf(vertex) === - 1) { 
						v.connected_to.push(vertex);
							}
						}
			vertices.push(v);
			vertices[i].vertex_count = vertices[i].connected_to.length;
			//console.log(vertices[i].vertex_count);
			//console.log(vertices[i].connected_to);
			}
		startV = getRandomNumber(0,9);
		endV = getRandomNumber(0,9);
		if (startV === endV) {
			while (startV ===endV) {
				startV = getRandomNumber}
			}
		console.log(startV + " This is startV");
		console.log(endV + " This is endV");
		graphConnector();
		canvas.addEventListener("click", Djikstra);
		//connecting_graph();
		}

	function graphConnector() {
		console.log('New connected to arrays');
		var selected; // for the vertex in the connected_to array
		for (var f = 0,max = vertices.length; f < max;f++) {
			for (var r = 0;r < vertices[f].connected_to.length; r++) {
				selected = vertices[f].connected_to[r];
				if (vertices[selected].connected_to.indexOf(f) === -1) {
					vertices[selected].connected_to.push(f);
					}
				}
				 //vertices[f]["vertex_count"] = vertices[f].connected_to.length; // this should be outside this loop
				//console.log(vertices[f].vertex_count);
				//console.log(f,vertices[f].connected_to);
			}
			Distance();
		}
		
	function Distance() {
		var distance;
		var ver;
		console.log('Distance function');
		for (var i = 0,max = vertices.length; i < max; i++) {
			for (var j = 0; j < vertices[i].connected_to.length; j++) {
				ver = vertices[i].connected_to[j];
				distance = Math.sqrt(Math.pow(vertices[i].xPos - vertices[ver].xPos,2) + Math.pow(vertices[i].yPos - vertices[ver].yPos,2));
				//vertices[i].d.push(distance);
				vertices[i].d.push(Math.floor(distance/30));
				}
			//console.log(vertices[i].vertex_count); this is bogus, as stated above
			console.log(i,vertices[i].connected_to);
			console.log(vertices[i].d);
			}
		drawGraph();
		}
	
	// draws out the base graph, represented by multicolored circles and lines acting as vertices and edges respectively
	function drawGraph() {
		ctx.clearRect(0,0,cw,cl);
		var sel;
		for (var i = 0, max = vertices.length; i < max; i++){
			ctx.beginPath();
			ctx.arc(vertices[i].xPos, vertices[i].yPos, vertices[i].size, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'hsl(' + vertices[i].hue + ',100%,50%)';
			ctx.fill();
			ctx.font = "15px Arial";
			ctx.fillText(i,vertices[i].xPos,vertices[i].yPos + -20);
			for (var g = 0; g < vertices[i].connected_to.length; g++){
				sel = vertices[i].connected_to[g];
				ctx.strokeStyle = 'white';
				ctx.beginPath();
				ctx.moveTo(vertices[i].xPos,vertices[i].yPos);
				ctx.lineTo(vertices[sel].xPos,vertices[sel].yPos);
				ctx.closePath();
				ctx.stroke();
				}
			}
		Setup();
		}
		
	function Setup() {
		// setups the spT array
		tD.push(0);
		for (var h = 0, max = (vertices.length - 1); h < max; h++ ) {
			tD.push(Infinity);
			}
		spT.push(startV);
		//Djikstra();
		}
	
	function Djikstra() {
		var	newV, // for adding to spT.
			sP, // only for the drawing!!!
			cd, // current distance.
			meme,
			lowest_dis = Infinity;
		if (step < vertices.length) {
			for (var j = 0, max = spT.length; j < max; j++) {
				meme = spT[j];
				for (var e = 0; e < vertices[meme].connected_to.length; e++) { 	
					cd = vertices[meme].d[e];
					if ( cd < lowest_dis && (spT.indexOf(vertices[meme].connected_to[e]) === -1)) { // and if states if the vertex is already in spT, don't perform if statement
						newV = vertices[meme].connected_to[e]; // what vertex is chosen and going to be entered into the spT
						lowest_dis = cd;
						sP = meme; // "Where did the vertex come from?" for further drawings
						}
					}
				}
			spT.push(newV);
			// for loop to update the distance (tentative distance mode!)
			for (var f = 0,fLen = vertices[newV].connected_to.length; f < fLen; f++) {
				if (spT.indexOf(vertices[newV].connected_to[f]) === -1) {
					vertices[newV].d[f] = vertices[newV].d[f] + lowest_dis;
					}
				}
			ctx.strokeStyle = 'green';
			ctx.beginPath();
			ctx.moveTo(vertices[sP].xPos,vertices[sP].yPos);
			ctx.lineTo(vertices[newV].xPos,vertices[newV].yPos);
			ctx.closePath();
			ctx.stroke();
			step += 1;
			}
		else {
			console.log("algorithm complete,congrats!");
			}
		}
	
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
    }
	
	}());
/* 		for (var j = 0 ; j < max; j++) {
			for (var key in vertices[i].connected_to){
				if (vertices[i].connected_to.hasOwnProperty(key)){
					if (j in vertices[i].connected_to) {
						console.log("If statement has been reached!")
						ctx.strokeStyle = 'white';
						ctx.beginPath();
						ctx.moveTo(vertices[i].xPos,vertices[i].yPos);
						ctx.lineTo(vertices[j].xPos,vertices[j].yPos);
						ctx.closePath();
						ctx.stroke();
						console.log("connection complete!")
							}
						}
					}
				}


				for (var g = 0; g < max; g++){
					if (g in vertices[j].connected_to) {
						distance = Math.sqrt(Math.pow(vertices[j].xPos - vertices[vertex].xPos,2) + Math.pow(vertices[j].yPos - vertices[vertex].yPos,2)); // max connected vertex and distance
						vertices[vertex].connected_to[j] = distance;
						//console.log(vertices[j].connected_to);
						}
					else {
						distance = Math.sqrt(Math.pow(vertices[j].xPos - vertices[vertex].xPos,2) + Math.pow(vertices[j].yPos - vertices[vertex].yPos,2)); // max connected vertex and distance
						vertices[j].connected_to[vertex] = distance;
						} // if and else to counter edge problem
					}
					
					function connecting_graph() {
		var vertex,
			distance,
			num_connections;
		for(var j = 0,max = vertices.length; j < max; j++) {
			//console.log("j loop works");
			num_connections = getRandomNumber(1, 3); // for edges
			for(var e = 0; e < num_connections; e++) {
				vertex = getRandomNumber(0, max - 1); // just picks a vertex from the list
				if (j === vertex){
					console.log("J was equal to vertex, rerolling");
					vertex = getRandomNumber(0,max - 1);
					}
				if (!(j in vertices[vertex].connected_to)) {
						vertices[vertex].connected_to.push(j) // pushes the j vertex to the selected vertex's list
						distance = Math.sqrt(Math.pow(vertices[j].xPos - vertices[vertex].xPos,2) + Math.pow(vertices[j].yPos - vertices[vertex].yPos,2)); // max connected vertex and distance
						vertices[vertex].d.push(distance); // pushes the distance from the selected vertex to the j vertex
					}
				if (!(vertex in vertices[j].connected_to)){
						vertices[j].connected_to.push(vertex) // pushes the selected vertex to j connected_to list
						distance = Math.sqrt(Math.pow(vertices[j].xPos - vertices[vertex].xPos,2) + Math.pow(vertices[j].yPos - vertices[vertex].yPos,2)); // max connected vertex and distance
						vertices[j].d.push(distance); // pushes the distance to the j vertex from beginning loop}
					}
					console.log(j)
					console.log("connected_to: " + " " + vertices[j].connected_to);
					console.log("distance" + " " + vertices[j].d);
				}
			console.log(j)
			console.log("connected_to: " + " " + vertices[j].connected_to);
			console.log("distance" + " " + vertices[j].d);	
				
			}
			drawGraph();
		}
		
	// connecting_graph used to store where each vertex connects to,and what the distance is
	function connecting_graph() {
		var vertex,
			distance,
			num_connections,
			conLen;
		for(var j = 0,max = vertices.length; j < max; j++) {
			for(var f = 0; f < vertices[j].vertex_count; f++){
				vertex = getRandomNumber(0,max - 1)
				conLen = vertices[j].connected_to.length;
				if(conLen === 0) {
					vertices[j].connected_to.push(vertex);
					vertices[vertex].connected_to.push(j);						
					}
				else
				for (var e = 0; e < conLen; e++ ) {
					if (vertex !== vertices[j].connected_to[e]) {
						vertices[j].connected_to.push(vertex);
						}
					if (j !== vertices[vertex].connected_to[e]) {
						vertices[vertex].connected_to.push(j);						
						}
					} 
				}
			console.log(j,vertices[j].connected_to);
		}
	}
	*/