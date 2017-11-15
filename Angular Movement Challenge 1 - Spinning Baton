//making the mode radians
angleMode = "radians";	
//declaring variable that dictates how much to spin it by
var spin = 0;

draw = function() {
    background(255);
    
    pushMatrix();
    //translating baton to the middle
    translate(200, 200);
    //rotating baton
    rotate(PI+spin);
    //increasing the value of spin
    spin += 0.1;
    //drawing baton
    fill(127, 127, 127);
    stroke(0, 0, 0);
    line(-50, 0, 50, 0);
    strokeWeight(2);
    ellipse(-50, 0, 16, 16);
    ellipse(50, 0, 16, 16);
    popMatrix();
};
