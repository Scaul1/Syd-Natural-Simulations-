//function containing properties of the attractor
var Attractor = function() {
    this.position = new PVector(width/2, height/2);
    this.mass = 20;
    this.G = 1;
};


Attractor.prototype.calculateAttraction = function(m) {
    //direction of the force
    var force = PVector.sub(this.position, m.position);
    //how far away the objects are
    var distance = force.mag();
    //keeping distance within reasonable size
    distance = constrain(distance, 5, 25);  
    force.normalize();
    //calculating gravity
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

//displaying the attractor
Attractor.prototype.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
};

//function containing properteis of the mover
var Mover = function(mass, x, y, colour) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(1, 0);
    this.acceleration = new PVector(0, 0);
    this.mass = mass;
    this.colour = colour;
};

//applying acceleration forces to mover
Mover.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
};

//updating mover by changing velocity, position and acceleration
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//dispalying the movers
Mover.prototype.display = function() {
    noStroke();
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
};

//declaring array to hold new movers
var movers = [];
//adding new attractors
var attractor = new Attractor();

for (var i = 0; i < 10; i++) {
    //randomizing colours
    var randomC = random(color(0, 255));
    movers[i] = new Mover(random(0.1, 2), random(width), random(height), color(randomC, 176, 176));
}

draw = function() {
    //applying forces, updating and displaying every mover
    for (var i = 0; i < movers.length; i++) {
        var force = attractor.calculateAttraction(movers[i]);
        movers[i].applyForce(force);

        movers[i].update();
        movers[i].display();
    }
};
