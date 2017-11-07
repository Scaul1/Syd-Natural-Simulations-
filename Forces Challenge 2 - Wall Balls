//function declaring properties of balls
var Ball = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.color = color(random(255), random(255), random(255), 127);
};

//applying the forces to change acceleration
Ball.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

//updating position of ball by changing acceleration, velocity and position
Ball.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//displaying the different balls
Ball.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
};

//making the balls bounce off the sides of the canvas
Ball.prototype.calculateWallForce = function() {
    var xForce = 0;
    var yForce = 0;
    //if ball goes off canvas on the right
    if (this.position.x > width) {
        xForce = -1;
    }
    //else if ball goes off canvas on the left
     else if (this.position.x < 0) {
        xForce = 1;
    }
    //if ball goes off canvas on bottom
    if (this.position.y > height) {
        yForce = -1;
    }
    //else if the ball goes off the canvas on the top
     else if (this.position.y < 0) {
        yForce = 1;
    }
    //returning new bouncing force
    return new PVector (xForce, yForce);
    
};

//declaring array of different balls
var balls = [];

//assinging new random preoperties to the balls
for (var i = 0; i < 20; i++) {
    balls[i] = new Ball(random(0.1, 5), 0, 0);
}

//wind and gravity force vectors
var wind = new PVector(0.01, 0);
var gravity = new PVector(0, 0.1);

draw = function() {
    background(255, 255, 255);
    
    //applying all of the forces then updating and displaying the balls in the array
    for (var i = 0; i < balls.length; i++) {
        balls[i].applyForce(wind);
        balls[i].applyForce(gravity);
        balls[i].applyForce(balls[i].calculateWallForce());
        balls[i].update();
        balls[i].display();
    }
};
