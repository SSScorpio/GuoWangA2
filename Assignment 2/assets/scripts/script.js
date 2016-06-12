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
var holesArray = [];


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

    // calls main_aminate and counter after a 1 second delay, generate holes after 2 seconds
    // speed for generating holes can be adjusted at the function generate_holes
    setTimeout(generate_holes, 2000);
    setTimeout(main_animate, 1000);
    setTimeout(counter, 1000);
    

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

// main animation
function main_animate() {
    
    // Always clear the canvas after drawing each frame, only clear below info bar
    window.ctx.clearRect(0, 41, 1000, 600);
    var newholearr = [];
    for (var i = 0; i < holesArray.length; i++) {
        //keep hole if it isnt full
        if (!should_disappear(holesArray[i])){
            newholearr.push(holesArray[i]);
        }
    }
    holesArray = newholearr;
    // draw remaining holes
    for (var i = 0; i < holesArray.length; i++) {
        draw_holes(holesArray[i][0], holesArray[i][1], holesArray[i][2]);
    }

    var dirx, diry, newx, newy, newobj, eaten, newarr = [];
    for (var i = 0; i < objectArray.length; i ++){
        eaten = false;
        dirx = border_check(objectArray[i])[0];
        diry = border_check(objectArray[i])[1];
        // new positions of object
        newx = objectArray[i][3] + dirx;
        newy = objectArray[i][4] + diry;
        //objectArray[i] = draw_object(objectArray[i][0], dirx, diry, newx, newy);

        newobj = [objectArray[i][0], dirx, diry, newx, newy];
        // checks if the new position of the object gets eaten
        for (var k = 0; k < holesArray.length; k++) {
            if (eaten_check(newobj, holesArray[k])){
                eaten = true;
            }
            if(!eaten){
                dirx = hole_check(newobj, holesArray[k])[0];
                newobj[1] = dirx;
                diry = hole_check(newobj, holesArray[k])[1];
                newobj[2] = diry;
            }

        }
        //redraws the object, adds to array if object is not eaten
        if (!eaten){

            newarr.push(draw_object(objectArray[i][0], dirx, diry, newx, newy));
        }        
    }
    // update score if necessary
    var diff;
    diff = newarr.length - objectArray.length;
    update_score(diff*50);
    // update objectArray
    objectArray = newarr;

    // This will run main_animate() every 33 ms
    setTimeout(main_animate, 33);
}

function update_score(num){
    score = score + num;
    window.ctx.clearRect(400, 0, 200, 39);
    ctx.fillText("Score: " + score, 400,30);
}

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
// function hole_check(objx, objy, directx, directy, holex, holey) {
//     if (objx - 25 > holex && objx - 25 < holex && objy - 25 > holey && objy - 25 < holey) {
//         directx = (holex - objx)/25;
//         directy = (holey - objy)/25;
//     }
//     else if (objx - 25 > holex && objx - 25 < holex && objy + 25 > holey && objy + 25 < holey) {
//         directx = (holex - objx)/25;
//         directy = (holey - objy)/25;
//     }
//     else if (objx + 25 > holex && objx + 25 < holex && objy - 25 > holey && objy - 25 < holey) {
//         directx = (holex - objx)/25;
//         directy = (holey - objy)/25;
//     }
//     else if (objx + 25 > holex && objx + 25 < holex && objy + 25 > holey && objy + 25 < holey) {
//         directx = (holex - objx)/25;
//         directy = (holey - objy)/25;
//     }
// }

//Checks if an object is within range of a black/purple/blue hole
// object has format [object, directionx, directiony, positionx, positiony]
// hole has format [hole, positionx, positiony, eventhorizon_topleft, eventhorizon_topright, eventhorizon_bottomright, eventhorizon_bottomleft, numeaten]
function hole_check(object, hole) {
    var directx = object[1];
    var directy = object[2];
    var eventhorizon_left, eventhorizon_right, eventhorizon_top, eventhorizon_bot;
    var obj_left = object[3];
    var obj_right = object[3] + 50;
    var obj_top = object[4];
    var obj_bot = object[4] + 50;
    var fix = 0;
    var speed;
    if (hole[0] <= 4) {
        // blue hole, slowest
        speed = 40;
    }
    else if (hole[0] <= 6){
        // purple
        speed = 25;
    }
    else if (hole[0] == 7) {
        // black hole, fastest
        speed = 10;
    }
    // if hole at the left of object
    if (hole[1] <= object[3]){
        eventhorizon_right = hole[4][0];
        if (obj_left <= eventhorizon_right){
            fix = fix + 1;
        }
    }else{
        eventhorizon_left = hole[3][0];
        if (obj_right >= eventhorizon_left){
            fix = fix + 1;
        }
    }
    //if hole at the top of object
    if (hole[2] <= object[4]){
        eventhorizon_bot = hole[5][1];
        if (obj_top <= eventhorizon_bot){
            fix = fix + 1;
        }
    }else{
        eventhorizon_top = hole[3][1];
        if (obj_bot >= eventhorizon_top){
            fix = fix + 1;
        }
    }
    if (fix == 2){
        // adjust number in denominator to adjust speed sucked into hole
        directx = (hole[1] - object[3])/speed;
        directy = (hole[2] - object[4])/speed; 
    }
    var dirs = [directx, directy]
    return dirs;

}

// check if hole can eat object, returns true if yes
// object has format [object, directionx, directiony, positionx, positiony]
// hole has format [hole, positionx, positiony, eventhorizon_topleft, eventhorizon_topright, eventhorizon_bottomright, eventhorizon_bottomleft, numeaten]
function eaten_check(object, hole){
    var hole_center_x = hole[1] + 25;
    var hole_center_y = hole[2] + 25;
    var obj_left = object[3];
    var obj_right = object[3] + 50;
    var obj_top = object[4];
    var obj_bot = object[4] + 50;
    var fix = 0;
    // if hole at the left of object
    if (hole[1] <= object[3]){
        if (obj_left <= hole_center_x){
            fix = fix + 1;
        }
    }else{
        if (obj_right >= hole_center_x){
            fix = fix + 1;
        }
    }
    // if hole at the top of object
    if (hole[2] <= object[4]){
        if (obj_top <= hole_center_y){
            fix = fix + 1;
        }
    }else{
        if (obj_bot >= hole_center_y){
            fix = fix + 1;
        }
    }
    if (fix == 2){
        hole[7] = hole[7] + 1;
        return true;
    }
    return false;
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

// Helper function used for checking if holes overlap
// returns 
function check_hole_repeat(newx, newy){
    var newleft = newx - 25;
    var newright= newx + 75;
    var newtop= newy - 25;
    var newbot= newy + 75;
    var eventhorizonleft, eventhorizonright, eventhorizontop, eventhorizonbot;
    var fix;
    for (var i = 0; i < holesArray.length; i++) {
        fix = 0;
        // if existing hole at the left
        if (holesArray[i][1] <= newx){
            eventhorizonright = holesArray[i][4][0];
            if (newleft < eventhorizonright){
                fix = fix + 1;
            }
        }else{
            eventhorizonleft = holesArray[i][3][0];
            if (newright > eventhorizonleft){
                fix = fix + 1;
            }
        }
        // if existing hole at the top
        if (holesArray[i][2] <= newy){
            eventhorizonbot = holesArray[i][5][1];
            if (newtop < eventhorizonbot){
                fix = fix + 1;
            }
        }else{
            eventhorizontop = holesArray[i][3][1];
            if (newbot > eventhorizontop){
                fix = fix + 1;
            }
        }
        if (fix == 2){
            return true;
        }
    } 
    return false;
}

//returns true if the hole should disappear
// hole has format [hole, positionx, positiony, eventhorizon_topleft, eventhorizon_topright, eventhorizon_bottomright, eventhorizon_bottomleft, numeaten]
function should_disappear(hole){
    if (hole[0] <= 4) {
        if (hole[7] == 3){
            return true;
        }
    }
    else if (hole[0] <= 6){
        if (hole[7] == 2){
            return true;
        }
    }
    else if (hole[0] === 7) {
        if (hole[7] == 1){
            return true;
        }
    }
    return false;
}

//Creates blue/purple/black holes
// 5/8 chance for blue, 2/8 for purple, 1/8 for black
function generate_holes() {
    var hole = Math.floor(Math.random()*8);
    
    var positionx = Math.floor(Math.random()*959);
    var positiony = Math.floor(Math.random()*560) + 40;
    while (check_hole_repeat(positionx, positiony)){
        positionx = Math.floor(Math.random()*959);
        positiony = Math.floor(Math.random()*560) + 40;
    }

    // // used for testing if check_hole_repeat works
    // var s = "";
    // for (var i = 0; i < holesArray.length; i++) {
    //     s = s + "left: " + holesArray[i][3][0] + " right: " +  holesArray[i][4][0] + " top: " +  holesArray[i][3][1] + " bot: " +  holesArray[i][5][1] + "\n";
    // }
    // alert(s);

    // draw_holesreturns list with information about the hole in the format
    // [hole, positionx, positiony, eventhorizon_topleft, eventhorizon_topright, eventhorizon_bottomright, eventhorizon_bottomleft]
    // eventhorizon_topleft is in the format [ xposition, yposition]
    var holeInfo = draw_holes(hole, positionx, positiony);
    // new holes and added into the array
    holesArray.push(holeInfo);
    // can change time to set hole frequency
    setTimeout(generate_holes, 10000);

    return holeInfo;
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


// load images outside of draw_holes function to stop flickering caused by loading every time
// inspired by https://stackoverflow.com/questions/9522341/how-to-redraw-canvas-every-250ms-without-flickering-between-each-redraw
var bluehole = new Image();
var blueholeLoaded = false;
bluehole.src = "assets/images/blue_hole.svg";

bluehole.onload = function(){
  blueholeLoaded = true;
}
var purplehole = new Image();
var Loaded = false;
purplehole.src = "assets/images/purple_hole.svg";

purplehole.onload = function(){
  purpleholeLoaded = true;
}
var blackhole = new Image();
var blackholeLoaded = false;
blackhole.src = "assets/images/black_hole.svg";

blackhole.onload = function(){
  blackholeLoaded = true;
}


//Draws the holes
function draw_holes(hole, positionx, positiony) {
    
    if (hole <= 4) {
        ctx.drawImage(bluehole , positionx, positiony);
    }
    else if (hole <= 6){
        ctx.drawImage(purplehole, positionx, positiony);
    }
    else if (hole === 7) {
        ctx.drawImage(blackhole, positionx, positiony);
    }
    //alert("hole: " + hole); //used to test if hole # and color on canvas matches
    var eventhorizon_topleft = [positionx - 25, positiony - 25];
    var eventhorizon_topright = [positionx + 75, positiony - 25];
    var eventhorizon_bottomright = [positionx + 75, positiony + 75];
    var eventhorizon_bottomleft = [positionx - 25, positiony + 75];
    var hole_details = [hole, positionx, positiony, eventhorizon_topleft, eventhorizon_topright, eventhorizon_bottomright, eventhorizon_bottomleft, 0];

    return hole_details;
}

//For creating objects
function base(x, y) {
    ctx.translate(x + 25, y + 25);
    //ctx.rotate(Math.PI/4);
    //ctx.rotate(-Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}
