//defining variables
var r = 0;
var theta = 0;

draw = function() {

    pushMatrix();
    translate(width/2, height/2);
    
    //switching the type of coordinate
    var x = r * cos(theta);
    var y = r * sin(theta);
    
    fill(0, 0, 0);
    ellipse(x, y, 10, 10);
    popMatrix();
    
    //increasing the angle
    theta += 1;
    //increasing radius of circle being drawn
    r += 0.1;
};
