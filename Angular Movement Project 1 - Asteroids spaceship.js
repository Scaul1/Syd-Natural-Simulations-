//use the left and right arrow keys to turn the spaceship and press the z key to speed up

//based on code from "Turning car" in Khan Academy

//changing angle mode to radians instead of degrees
angleMode = "radians";

//function declaring properties of spaceship
var Spaceship = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, -0.5);
    this.acceleration = new PVector(0, 0);
    this.color = color(random(255), random(255), random(255), 127);
    this.topspeed = 6;
    this.xoff = 1000;
    this.yoff = 0;
    this.r = 10;
};

//applying the forces to change acceleration
Spaceship.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

//function to rotate the spaceship to the left
Spaceship.prototype.rotateLeft = function(){
    var left = this.velocity.get();
    left.rotate(-PI/4);
    this.applyForce(left);
};

//function to rotate the spaceship to the right
Spaceship.prototype.rotateRight = function(){
    var right = this.velocity.get();
    right.rotate(PI/4);
    this.applyForce(right);
};

//function to speed up the spaceship
Spaceship.prototype.speedUp = function(){
    var force = this.velocity.get();
    force.normalize();
    force.mult(2);
    this.applyForce(force);
};

//increasing speed by adding acceleration, and changing the position using the new speed
Spaceship.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//displaying the spaceship
Spaceship.prototype.display = function() {
    var angle = this.velocity.heading();
    
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(angle + PI/2);
    triangle(20, 100, 60, 100, 40, 57);
    rect(24, 100, 10, 8);
    rect(44, 100, 10, 8);
    
    popMatrix();
};

//making the spaceship stay on the cavnas
Spaceship.prototype.checkEdges = function() {
    var xForce = 0;
    var yForce = 0;
    //if spaceship goes off canvas on the right
    if (this.position.x > width) {
        this.position.x = 0;
    }
    //else if spaceship goes off canvas on the left
     else if (this.position.x < 0) {
        this.position.x = width;
    }
    //if spaceship goes off canvas on bottom
    if (this.position.y > height) {
        this.position.y = 0;
    }
    //else if the spaceship goes off the canvas on the top
     else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//creating new spaceship variable to be updated
var spaceship = new Spaceship();

//calls different movement functions depending on which key is being pressed
keyPressed = function(){
    if (keyCode === LEFT){
        spaceship.rotateLeft();
    }
    else if (keyCode === RIGHT){
        spaceship.rotateRight();
    }
    //90 is the z key
    else if (keyCode === 90){
        spaceship.speedUp();
    }
    
};

draw = function() {
    background(159, 190, 242);
    
    //updating and displaying the spaceship and checking it's edges to keep it on the canvas
    spaceship.update();
    spaceship.display();
    spaceship.checkEdges();
};
