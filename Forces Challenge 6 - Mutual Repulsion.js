var G = 1;

//mover function containing properties of the circles
var Mover = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//applying forces to change acceleration of movers
Mover.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

//updating mover by changing velocity, position and acceleration
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//dispalying the circles
Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 255, 255, 127);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
};

//calculating the negative attraction so that they repulse instead of attract each other
Mover.prototype.calculateAttraction = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = -1*(G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

//declaring array for new movers
var movers = [];
//creating new movers at randomized locations
for (var i = 0; i < 5; i++) {
    movers[i] = new Mover(random(0.1, 2), random(width), random(height));
}

draw = function() {
    background(50, 50, 50);
    //looping through all of the movers
    for (var i = 0; i < movers.length; i++) {
        //loop to make each mover be attracted to all other movers
        for (var j = 0; j < movers.length; j++) {
            //making sure the mover is not attracted to itself
            if (i !== j) {
                var force = movers[j].calculateAttraction(movers[i]);
                //applying the repulsion
                movers[i].applyForce(force);
            }
        }
        //calling the update and display functions
        movers[i].update();
        movers[i].display();
    }
};

