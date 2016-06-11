window.onload = function() {
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    document.getElementById("start").onclick = "PlayTime";
    //box(100, 100);
    //planet(100, 100);
    //ship(100, 100);
    //satellite(100, 100);
    //moon(100, 100);
    //ufo(100, 100);
    //satellite2(100, 100);
    //star(100, 100);
    //junk(100, 100);
}

function PlayTime() {
    var objects_float = [];
    for(var a = 0; a < 10; a = a + 1){
        objects_float[a] = Math.floor(Math.random()*8);
    }
}

//Draws out a box for testing purposes
function box(x, y){
    ctx.translate(x + 25, y + 25);
    ctx.strokeStyle = "#000000";
    ctx.moveTo(-25, -25);
    ctx.lineTo(25, -25);
    ctx.lineTo(25, 25);
    ctx.lineTo(-25, 25);
    ctx.lineTo(-25, -25);
    ctx.stroke();
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
    ctx.stroke();
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
    ctx.translate(-x - 25, - y - 25);
}

//Draws a ufo
function ufo(x, y){
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
    ctx.fill();
    ctx.stroke();
    ctx.translate(-x - 25, - y - 25);
}

//Draws a satellite version 2
function satellite2(x, y) {
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
    ctx.translate(-x - 25, - y - 25);
}

//Changes the direction of objects if it touches the border
function border_check(objx, objy, directx, directy){
    if (objx - 25 <= 0 || objx + 25 >= 1000) {
        directx = -directx;
    }
    if (objy - 25 <= 0 || objy + 25 >= 640) {
        directy = -directy;
    } 
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

//Creates an object
function generate_object(object) {
    var directionx = Math.floor(Math.random()*10) + 1;
    var directiony = Math.floor(Math.random()*10) + 1;
    var positionx = Math.floor(Math.random()*999) + 1;
    var positiony = Math.floor(Math.random()*639) + 1;
    if (object === 0) {
        planet(positionx, positiony);
    }
    else if (object === 1) {
        ship(positionx,positiony)
;    }
    else if (object === 2) {
        satellite(positionx, positiony);
    }
    else if (object === 3) {
        moon(positionx, positiony);
    }
    else if (object === 4) {
        ufo(positionx, positiony);
    }
    else if (object === 5) {
        satellite2(positionx, positiony);
    }
    else if (object === 6) {
        star(positionx, positiony);
    }
    else if (object === 7) {
        junk(positionx, positiony);
    }
}

function create_hole(x, y) {
    ctx.translate(x + 25, y + 25);
    var choice = Math.floor(Math.random()*3);
    if (choice === 0) {
        ctx.drawImage("black hole.svg", 0, 0, 50, 50, 0, 0, 50, 50);
    }
    else if (choice === 1) {
        ctx.drawImage("blue hole.svg", 0, 0, 50, 50, 0, 0, 50, 50);
    }
    else if (choice === 2) {
        ctx.drawImage("purple hole.svg", 0, 0, 50, 50, 0, 0, 50, 50);
    }
    ctx.translate(-x - 25, - y - 25);
    
}

//For creating objects
function base(x, y) {
    ctx.translate(x + 25, y + 25);
    //ctx.rotate(Math.PI/4);
    ctx.translate(-x - 25, - y - 25);
}