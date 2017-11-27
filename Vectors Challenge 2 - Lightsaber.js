//creating variable to be modified for the lightsaber
var  v = new PVector(50, 75);

//function with the charactersitics of the lightsaber
var drawSaber = function() {
    background(0, 0, 0);
    // glow
    strokeWeight(8);
    stroke(107, 206, 219, 150);
    line(0, 400, v.x, 400-v.y);
    // blade
    stroke(255, 255, 255);
    strokeWeight(4);
    line(0, 400, v.x, 400-v.y);
};

//function that is called if they are pressing a key
keyPressed = function(){
    //if user presses the up key, the lightsaber's length multiplies by 2
    if (keyCode === UP){
        v.mult(2);
    }
    //if user presses the down key, the lightsaber's length cuts in half
    else if (keyCode === DOWN){
        v.div(2);
    }
    //calling the function to draw the lightsaber with the new length
    drawSaber();
};
