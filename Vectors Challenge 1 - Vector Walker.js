//declaring the position of the original point using PVector 
var Walker = function() {
    this.position = new PVector (width/2, height/2);
};

//displaying points
Walker.prototype.display = function() {
    //size and colour
    strokeWeight(3);
    stroke(0, 0, 0);
    //creating point and the correct position
    point(this.position.x, this.position.y);
};

//adding random values to the next point to represent "walking"
Walker.prototype.walk = function() {
    //randomizing and x and y value and holding it as PVector
    var velocity = new PVector(random(-5, 5), random(-5, 5));
    //adding the velocity to change the position of the new point
    this.position.add(velocity);
};

//variable for the new dot
var w = new Walker();

//draw function to continuously display dots
draw = function() {
    w.walk();
    w.display();
};
