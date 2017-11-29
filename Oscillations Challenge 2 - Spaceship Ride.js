//setting angle mode to radians instead of degrees
angleMode = "radians";

//defining spaceship variable
var Spaceship = function() {
    this.a = 0;
    this.angVelocity = 0;
    
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
};

//applying oscillating motion
Spaceship.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
    var distance = this.position.mag();
    this.angVelocity += distance / 100000;
    this.angVelocity = constrain(this.angVelocity, 0, 0.1);
    this.a += this.angVelocity;
};

//displaying spaceship
Spaceship.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(181, 63, 0);
    strokeWeight(9);
    line(0, 0, this.position.x, this.position.y);
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.a);
    image(getImage("space/octopus"),
        0, 0,
        80, 100);
    popMatrix();
};

//creating multiple versions of spaceships
var ships = [];
for (var i = 0; i < 10; i++) {
    ships.push(new Spaceship());
}

draw = function() {
    background(174, 218, 232);
    for (var i = 0; i < ships.length; i++) {
        ships[i].oscillate();
        ships[i].display();
    }
};
