//changing angle mode to radians instead of degrees
angleMode = "radians";

//declaring properties of the pendulum
var Pendulum  = function(origin, armLength, angle) {
    this.origin = origin;
    this.armLength = armLength;
    this.position = new PVector();
    this.angle = angle;
    
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995;
    this.ballRadius = 25.0;      
    this.dragging = false;
};

//function called to update and display the pendulums
Pendulum.prototype.go = function() {
    this.update();
    this.display();
};

//updating the velocity and acceleration
Pendulum.prototype.update = function() {
    // As long as we aren't dragging the pendulum, let it swing!
    if (!this.dragging) {
        // Arbitrary constant
        var gravity = 0.4;
        // Calculate acceleration
        this.aAcceleration = (-1 * gravity / this.armLength) * sin(this.angle);
        // Increment velocity
        this.aVelocity += this.aAcceleration;
        // Arbitrary damping
        this.aVelocity *= this.damping;
        // Increment angle
        this.angle += this.aVelocity;                         
    }
};

//displaying the pendulums on the canvas
Pendulum.prototype.display = function() {
    if (this.origin instanceof PVector){
        this.currentOrigin = this.origin;
    }
    else {
        this.currentOrigin = this.origin.position;
    }
    
    this.position = new PVector(
       this.armLength * sin(this.angle),
       this.armLength * cos(this.angle));
    this.position.add(this.currentOrigin);
    stroke(0, 0, 0);
    strokeWeight(3);
    line(this.currentOrigin.x, this.currentOrigin.y, this.position.x, this.position.y);
    fill(224, 194, 134);
    if (this.dragging) {
        fill(143, 110, 44);
    }
    ellipse(this.position.x, this.position.y, this.ballRadius, this.ballRadius);
};

Pendulum.prototype.handleClick = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballRadius) {
        this.dragging = true;
    }
};

//when mouse is done dragging
Pendulum.prototype.stopDragging = function() {
    this.aVelocity = 0;
    this.dragging = false;
};

//when mouse is dragging
Pendulum.prototype.handleDrag = function(mx, my) {
    if (this.dragging) {
      var diff = PVector.sub(this.currentOrigin, new PVector(mx, my));
      this.angle = atan2(-1*diff.y, diff.x) - radians(90);
    }
};

//defining all limb variables
var limbLength = 75;
var leftArm1 = new Pendulum(new PVector(width/2-50, 110), limbLength, 0);
var leftArm2 = new Pendulum(leftArm1, limbLength, 0);
var rightArm1 = new Pendulum(new PVector(width/2+50, 110), limbLength, 0);
var rightArm2 = new Pendulum(rightArm1, limbLength, 0);
var leftLeg1 = new Pendulum(new PVector(width/2+40, 230), limbLength, 0);
var leftLeg2 = new Pendulum(leftLeg1, limbLength, 0);
var rightLeg1 = new Pendulum(new PVector(width/2-40, 230), limbLength, 0);
var rightLeg2 = new Pendulum(rightLeg1, limbLength, 0);

var limbs = [leftLeg1, leftLeg2,
                 rightLeg1, rightLeg2,
                 leftArm1, leftArm2,
                 rightArm1, rightArm2];

draw = function() {
    background(255);

    // Draw the body
    strokeWeight(4);
    line(width/2-50, 110, width/2+50, 110);
    line(width/2, 110, width/2, 230);
    line(width/2-40, 230, width/2+40, 230);
    fill(224, 194, 134);
    rect(width/2-25, 39, 50, 64, 30);
    for (var i = 0; i < limbs.length; i++){
        limbs[i].go();
    }
};

//when mouse is pressed
mousePressed = function() {
    for (var i = 0; i < limbs.length; i++){
        limbs[i].handleClick(mouseX, mouseY);
    }
    };

//when mouse is dragged
mouseDragged = function() {
   for (var i = 0; i < limbs.length; i++){
       limbs[i].handleDrag(mouseX, mouseY);
   }
};

//when mouse is released
mouseReleased = function() {
    for (var i = 0; i < limbs.length; i++){
        limbs[i].stopDragging();
    }
};
