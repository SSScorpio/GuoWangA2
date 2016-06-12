window.onload = function(){
    
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier


    //box(200, 50);
    //planet(100, 100);
    //ship(100, 100);
    //satellite(100, 100);
    //moon(100, 100);
    //ufo(100, 100);
    //satellite2(100, 100);
    //star(100, 100);
    // junk(100, 100);

}

// button on start page brings up canvas
document.getElementById("startButton").onclick = function() {
    
    //hide start screen elements
    var $sections = $('section');
    $sections.addClass( 'hidden');

    //show canvas
    var $canvas = $('canvas');
    $canvas.removeClass( 'hidden');

    initiate_canvas();

}


//global variables
var count = 60;
var timeup = false;
var score = 200;
var level = 1;
var object;
var objectArray = [];


function initiate_canvas(){

    //draw info bar line
    ctx.beginPath();
    ctx.moveTo(0,40); // starting position; x, y
    ctx.lineTo(1000,40); // x, y
    ctx.stroke();

    // info bar content
    ctx.font = "italic 20px Arial";
    ctx.fillText("Level " + level,10,30); // text, x, y
    ctx.fillText("Score: " + score, 400,30);
    ctx.fillText("Pause",700,30);
    // creating a coundown, at stage start
    //need a countdown here
    ctx.fillText("Timer: " + count ,850,30);

    // initiate objects and store them in the array list
    // each object stores [object, dirx, diry, posx, posy]
    for (var i = 0; i < 10; i ++){
        object = generate_object();
        objectArray[i] = object;
    }

    // clls object_animate and counter after a 2 second delay
    setTimeout(object_animate, 2000);
    setTimeout(counter, 2000);

}

// Counting down the timer, sets timeup to true when count is 0
function counter(){

    if (count > 0){
        window.ctx.clearRect(850, 0, 150, 39);
        count = count - 1;
        ctx.fillText("Timer: " + count ,850,30);
    }
    else{
        timeup = true;
    }
    setTimeout(counter, 1000);

}

// object animation
function object_animate() {
    
    // Always clear the canvas after drawing each frame, only clear below info bar
    window.ctx.clearRect(0, 41, 1000, 600);

    var dirx, diry, newx, newy;
    for (var i = 0; i < 10; i ++){
        dirx = border_check(objectArray[i])[0];
        diry = border_check(objectArray[i])[1];
        // right now speed is divided by 2, adjust this to change object speed
        newx = objectArray[i][3] + dirx;
        newy = objectArray[i][4] + diry;
        //redraws the object
        objectArray[i] = draw_object(objectArray[i][0], dirx, diry, newx, newy);
    }
  
    // This will run animate() every 33 ms
    setTimeout(object_animate, 33);
}

//Draws out a box for testing purposes
function box(x, y){
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/4);
    ctx.strokeStyle = "#000000";
    ctx.moveTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(25, 25);
    ctx.lineTo(-25, 25);
    ctx.lineTo(-25, -25);
    ctx.stroke();
    ctx.rotate(-Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a planet, Saturn
function planet(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/8);
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(0, 0, 16, 0, 6.28, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#7777ee";
    ctx.scale(2, 1);
    ctx.arc(0, 0, 12, 0, 6.28, false);
    ctx.scale(1/2, 1);
    ctx.stroke();
    ctx.rotate(-Math.PI/8);
    ctx.translate(- x - 25, - y - 25);
}

//Draws a spaceship
function ship(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/4);
    ctx.fillStyle = "#585858";
    ctx.fillRect(- 10, - 10, 20, 25);
    ctx.beginPath();
    ctx.strokeStyle = "#585858";
    ctx.arc(0, - 12, 10, 0, 6.28, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#585858";
    ctx.moveTo(- 10, 15);
    ctx.lineTo(- 15, 15);
    ctx.lineTo(- 10, 0);
    ctx.fill();
    ctx.stroke();
    ctx.moveTo(10, 15);
    ctx.lineTo(15, 15);
    ctx.lineTo(10, 0);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(- 7, 15, 5, 3);
    ctx.fillRect(2, 15, 5, 3);
    ctx.rotate(-Math.PI/4);
    ctx.translate(- x - 25, - y - 25);
}

//Draws a satellite version 1
function satellite(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(5*Math.PI/4);
    ctx.fillStyle = "#000050";
    ctx.strokeStyle = "#000050";
    ctx.fillRect(-20, -10, 14, 8);
    ctx.fillRect(6, -10, 14, 8);
    ctx.fillRect(-6, -7, 12, 3);
    ctx.fillRect(-4, -13, 8, 15);
    ctx.fillRect(-1, 2, 2, 5);
    ctx.beginPath();
    ctx.arc(0, 7, 3, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 7, 6, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 7, 9, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 7, 12, 0, Math.PI, false);
    ctx.stroke();
    ctx.rotate(-5*Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a quarter moon, note that if background color changes, this needs to be changed
function moon(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(-Math.PI/4);
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(5, 0, 17, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.rotate(Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a ufo
function ufo(x, y){
    ctx.strokeStyle = "#000000";
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/8);
    ctx.beginPath();
    ctx.scale(2, 1);
    ctx.arc(0, 0, 10, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.scale(1/2, 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(0, -5, 10, 0, Math.PI, true);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.scale(2, 1);
    ctx.arc(0, -6, 5, 0, Math.PI, false);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.scale(1/2, 1);
    ctx.stroke();
    ctx.rotate(-Math.PI/8);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a satellite version 2
function satellite2(x, y) {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.translate(x + 25, y + 25);
    ctx.rotate(3*Math.PI/4);
    ctx.fillRect(-20, -11, 4, 4);
    ctx.fillRect(-15, -11, 4, 4);
    ctx.fillRect(-10, -11, 4, 4);
    ctx.fillRect(-20, -6, 4, 4);
    ctx.fillRect(-15, -6, 4, 4);
    ctx.fillRect(-10, -6, 4, 4);
    ctx.fillRect(-20, -1, 4, 4);
    ctx.fillRect(-15, -1, 4, 4);
    ctx.fillRect(-10, -1, 4, 4);
    
    ctx.fillRect(6, -11, 4, 4);
    ctx.fillRect(11, -11, 4, 4);
    ctx.fillRect(16, -11, 4, 4);
    ctx.fillRect(6, -6, 4, 4);
    ctx.fillRect(11, -6, 4, 4);
    ctx.fillRect(16, -6, 4, 4);
    ctx.fillRect(6, -1, 4, 4);
    ctx.fillRect(11, -1, 4, 4);
    ctx.fillRect(16, -1, 4, 4);
    
    ctx.fillRect(-4, -13, 8, 22);
    ctx.fillRect(-2, 8, 4, 8);
    
    ctx.beginPath();
    ctx.arc(0, 17, 3, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 17, 6, 0, Math.PI, false);
    ctx.stroke();
    ctx.rotate(-3*Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a 4-pointed star
function star(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/16);
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 20);
    ctx.lineTo(-5, 5);
    ctx.lineTo(-20, 0);
    ctx.lineTo(-5, -5);
    ctx.lineTo(0, -20);
    ctx.lineTo(5, -5);
    ctx.lineTo(20, 0);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(-Math.PI/16);
    ctx.translate(-x - 25, - y - 25);
}

//Draws a refrigerator
function junk(x, y) {
    ctx.translate(x + 25, y + 25);
    ctx.rotate(Math.PI/4);
    ctx.fillRect(-10,-15, 20, 15);
    ctx.fillRect(-10, 1, 20, 18);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(5, -10, 2, 5);
    ctx.fillRect(5, 5, 2, 5);
    ctx.fillStyle = "#000000";
    ctx.rotate(-Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}

//Changes the direction of objects if it touches the border
function border_check(obj){
    var newdx = obj[1];
    var newdy = obj[2];
    //adjust border values (ie. 45 in obj[3] + 45) to fine tune border check
    if (((obj[3]) <= 0  && obj[1] <= 0) || ((obj[3] + 45) >= 1000 && obj[1] >= 0)) {
        newdx = -obj[1];
    }
    if (((obj[4]) <= 40 && obj[2] <= 0) || ((obj[4] + 45) >= 640 && obj[2] >= 0)){
        newdy = -obj[2];
    }
    var dir = [newdx, newdy];
    return dir;
}


//Checks if an object is within range of a black/purple/blue hole
function hole_check(objx, objy, directx, directy, holex, holey) {
    if (objx - 25 > holex && objx - 25 < holex && objy - 25 > holey && objy - 25 < holey) {
        directx = (holex - objx)/25;
        directy = (holey - objy)/25;
    }
    else if (objx - 25 > holex && objx - 25 < holex && objy + 25 > holey && objy + 25 < holey) {
        directx = (holex - objx)/25;
        directy = (holey - objy)/25;
    }
    else if (objx + 25 > holex && objx + 25 < holex && objy - 25 > holey && objy - 25 < holey) {
        directx = (holex - objx)/25;
        directy = (holey - objy)/25;
    }
    else if (objx + 25 > holex && objx + 25 < holex && objy + 25 > holey && objy + 25 < holey) {
        directx = (holex - objx)/25;
        directy = (holey - objy)/25;
    }
}


// used for testing, generates an object at random location
// result: drawings with rotate and scale will produce strange results, commented out rotate and scale
function generate_box() {
    var directionx = Math.floor(Math.random()*10) - 5;
    var directiony = Math.floor(Math.random()*10) - 5;
    var positionx = Math.floor(Math.random()*949) + 1;
    var positiony = Math.floor(Math.random()*549) + 40;
    satellite2(positionx, positiony);
}

//Creates an object
function generate_object() {
    //Determines what object to create
    var object = Math.floor(Math.random()*8);
    
    //Sets a direction for the objects to use, between -3 and 3, except 0
    var directionx = Math.ceil(Math.random()*7) - 4;
    var directiony = Math.ceil(Math.random()*7) - 4;
    while (directionx == 0){
        directionx = Math.ceil(Math.random()*7) - 4;
    }
    while (directiony == 0){
        directiony = Math.ceil(Math.random()*7) - 4;
    }
    
    //Selects a random spot to place the object
    var positionx = Math.floor(Math.random()*949) + 1;
    var positiony = Math.floor(Math.random()*549) + 40;
    
    return draw_object(object, directionx, directiony, positionx, positiony);;
}

//Creates blue/purple/black holes
function generate_holes() {
    var hole = Math.floor(Math.random()*3);
    
    var positionx = Math.floor(Math.random()*959);
    var positiony = Math.floor(Math.random()*639);
    
    return draw_holes(hole, positionx, positiony);
}

//Creates the object based on the variable object
function draw_object(object, directionx, directiony, positionx, positiony){
    if (object === 0) {
        junk(positionx, positiony);
    }
    else if (object === 1) {
        ship(positionx,positiony);
    }
    else if (object === 2) {
        star(positionx, positiony);     
    }
    else if (object === 3) {
        moon(positionx, positiony);
    }
    else if (object === 4) {
        ufo(positionx, positiony);
    }
    else if (object === 5) {
        planet(positionx, positiony);
    }
    else if (object === 6) {
        satellite(positionx, positiony);
    }
    else if (object === 7) {
        satellite2(positionx, positiony);
    }
    var objectInfo = [object, directionx, directiony, positionx, positiony];
    return objectInfo;
}

//Draws the holes
function draw_holes(hole, positionx, positiony) {
    var object_hole = new Image();
    context.drawImage(object_hole,positionx, positiony);
    if (hole === 0) {
        object_hole = "assets/images/blue hole.svg";
    }
    else if (hole === 1){
        object_hole = "assets/images/purple hole.svg";
    }
    else if (hole === 2) {
        object_hole = "assets/images/black hole.svg";
    }
    var hole_details = [hole, positionx, positiony];
    return hole_details;
}

//For creating objects
function base(x, y) {
    ctx.translate(x + 25, y + 25);
    //ctx.rotate(Math.PI/4);
    //ctx.rotate(-Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}
