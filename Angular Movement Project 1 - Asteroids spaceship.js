angleMode = "radians";

//function declaring properties of balls
var Spaceship = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.turn = new PVector (0, 0);
    this.color = color(random(255), random(255), random(255), 127);
    this.topspeed = 4;
    this.xoff = 10500;
    this.yoff = 0;
    this.r = 10;
};

//updating position of ball by changing acceleration, velocity and position
Spaceship.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    //this.acceleration.mult(0);
};

//applying the forces to change acceleration
Spaceship.prototype.applyForce = function(force) {
    //this.acceleration.add(force);
};

Spaceship.prototype.rotateLeft = function(){
    var left = PVector.get(this.velocity);
    left.rotate(-PI/10);
    this.applyForce(left);
};

Spaceship.prototype.rotateRight = function(){
    var right = PVector.get(this.velocity);
    right.rotate(PI/10);
    this.applyForce(right);
};

//displaying the spaceship
Spaceship.prototype.display = function() {
    var angle = this.velocity.heading();
    println(angle);
    
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    
    pushMatrix();
    translate(this.position.x, this.position.y);
    //rotate(angle);
    triangle(20, 100, 60, 100, 40, 57);
    rect(24, 100, 10, 8);
    rect(44, 100, 10, 8);
    
    popMatrix();
};


//making the balls bounce off the sides of the canvas
Spaceship.prototype.checkEdges = function() {
    var xForce = 0;
    var yForce = 0;
    //if ball goes off canvas on the right
    if (this.position.x > width) {
        this.position.x = 0;
    }
    //else if ball goes off canvas on the left
     else if (this.position.x < 0) {
        this.position.x = width;
    }
    //if ball goes off canvas on bottom
    if (this.position.y > height) {
        this.position.y = 0;
    }
    //else if the ball goes off the canvas on the top
     else if (this.position.y < 0) {
        this.position.y = height;
    }
    //returning new bouncing force
    return new PVector (xForce, yForce);
    
};

var spaceship = new Spaceship();


keyPressed = function(){
    if (keyCode === LEFT){
        spaceship.rotateLeft();
    }
    else if (keyCode === RIGHT){
        spaceship.rotateRight();
    }
    
};


draw = function() {
    background(159, 190, 242);
    
    if (keyIsPressed && keyCode === UP){
        spaceship.acceleration.set(0, -0.05);
    }
    else {
        while (spaceship.velocity.y > 0)
        {
            spaceship.acceleration.set(0, 0.1);
        }
        spaceship.acceleration.set(0, 0);
    }
    
    //applying all of the forces then updating and displaying the balls in the array
    spaceship.applyForce(spaceship.checkEdges());
    spaceship.update();
    spaceship.display();    
};
