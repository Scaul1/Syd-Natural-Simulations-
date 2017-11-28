//converting mode to degrees
angleMode = "radians";

//displaying the slinky on the canvas
var drawSlinky = function(centerX, startY, endY) {
    noFill();
    colorMode(HSB);
    strokeWeight(2);
    ellipseMode(CENTER);
    var overlap = 0.8;
    var space = (endY/overlap - startY)/30;
    for (var i = 0; i < 30; i++) {
        stroke(i*9, 200, 255);
        ellipse(centerX, i*space*overlap + startY, 60, space);
    }
};

draw = function() {
    background(255);
    //applying simple harmonic motion (oscillating)
    var y = sin(TWO_PI *  frameCount /80);
    var m = map(y, -1, 1, 200, 400);
    drawSlinky(width/2, 10, m);
};
