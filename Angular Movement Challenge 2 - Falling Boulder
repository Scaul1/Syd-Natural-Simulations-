//setting mode to radians isntead of degrees
angleMode = "radians";

//declaring properties of the boulder
var Boulder = function(m, x, y) {
    this.position = new PVector(x, y);
    this.mass = m;
    this.width = this.mass * 10;
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//applying forces to the boulder
Boulder.prototype.applyForce = function(force) {
    if (force instanceof PVector) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
    }
};

//updating boulder by changing the velocity, position and acceleration
Boulder.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    
    this.aAcceleration = this.acceleration.x / 10.0;
    
    this.aVelocity += this.aAcceleration;
    
    this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
    
    this.angle += this.aVelocity;
    
    this.acceleration.mult(0);
    
};

//rotating and translating the boulder
Boulder.prototype.display = function () {
    pushMatrix();
    translate(this.position.x, this.position.y);
    image(getImage("creatures/Hopper-Jumping"), this.width*0.25, this.width*0.3, 45, 55);
    rotate(this.angle);
    this.drawShape();
    popMatrix();
};

//drawing the boulder on the canvas
Boulder.prototype.drawShape = function() {
    ellipseMode(CENTER);
    fill(82, 82, 82);
    ellipse(0, 0, this.width, this.width);
    noStroke();
    var from = color(102, 102, 102, 40);
    var to = color(148, 148, 148, 40);
    var gradientBars = 20;
    for (var i = 0; i < gradientBars; i++) {
        var interA = lerpColor(from, to, i*1/gradientBars);
        var sWidth = (gradientBars-i)*this.width/gradientBars;
        fill(interA);
        ellipse(i, 0, sWidth, sWidth);
    }
    var from = color(102, 102, 102, 40);
    var to = color(94, 94, 94, 40);
    var gradientBars = 20;
    for (var i = 0; i < gradientBars; i++) {
        var interA = lerpColor(from, to, i*1/gradientBars);
        var sWidth = (gradientBars-i)*this.width/gradientBars;
        fill(interA);
        ellipse(-i, 0, sWidth, sWidth);
    }
};

//new boulder variable to be modified
var boulder = new Boulder(6, 10, 10);
//force of gravity
var gravity = new PVector (0.5, 0.5);
//force of Hopper 
var push = new PVector (-1, -1);

draw = function() {
    background(215, 245, 245);
    
    // draw mountain
    fill(181, 181, 181);
    stroke(150, 150, 150);
    triangle(0, 40, width-40, height, 0, height);
    
    // draw boulder
    //applying Hopper's pushing force if mouse is pressed
    if (mouseIsPressed){
        boulder.applyForce(push);
    }
    //applying gravity force
    boulder.applyForce(gravity);
    //updating boulder
    boulder.update();
    //displaying boulder
    boulder.display();
};
