//setting angle to radians instead of degrees
angleMode = "radians";

//declaring original car function
var Car = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(3, 0);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 4;
    this.xoff = 1000;
    this.yoff = 0;
    this.r = 16;
};

//updating car by changing velocity, position and acceleration
Car.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//applying forces to car
Car.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

//force applied if car is turning left
Car.prototype.turnLeft = function() {
    var left = PVector.get(this.velocity);
    left.rotate(-PI/2);
    this.applyForce(left);
};

//force applied if car is turning right
Car.prototype.turnRight = function() {
    var right = PVector.get(this.velocity);
    right.rotate(PI/2);
    this.applyForce(right);
};

//displaying the car
Car.prototype.display = function () {
    // Step 3:
    var angle = this.velocity.heading();
    
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(127, 127, 127);
    pushMatrix();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    // Step 3:
    rotate(angle);
    // draw the car
    fill(255, 0, 0);
    rect(0, 0, 70, 30);
    rect(0, 0, 29, 30);
    fill(79, 79, 79);
    ellipse(-15, -18, 20, 8);
    ellipse(-15, 18, 20, 8);
    ellipse(15, 18, 20, 8);
    ellipse(15, -18, 20, 8);
    rect(21, 0, 11, 26);
    popMatrix();
};

//making car stay on the canvas
Car.prototype.checkEdges = function () {
    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//new car variable to be modified
var car = new Car();

//if key is pressed
keyPressed = function(){
    //if left key is being pressed, call the turnLeft function
    if (keyCode === LEFT){
        car.turnLeft();
    }
    //if right key is being pressed, cal the turnRight function
    else if (keyCode === RIGHT){
        car.turnRight();
    }
};

draw = function() {
    //background of canvas
    background(102, 209, 104);
    
    car.update();
    car.checkEdges();
    car.display();
};
