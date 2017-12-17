//changing angle mode to radians instead of degrees
angleMode = "radians";

//defining the repeller properties
var Repeller = function(x, y) {
    this.power = 200;
    this.position = new PVector(x, y);
};

//function to display the rocks
Repeller.prototype.display = function() {
    image(getImage("cute/Rock"), this.position.x, this.position.y-50, 60, 80);
};

//calculating the repel force of rocks on water
Repeller.prototype.calculateRepelForce = function(p) {
    var dir = PVector.sub(this.position, p.position);
    var d = dir.mag();
    dir.normalize();
    d = constrain(d, 1, 100);    
    var force = -1 * this.power/ (d * d);          
    dir.mult(force);                                  
    return dir;
};

//defining water particles
var Particle = function(position) {
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(random(0, 1), random(-0.1, 0.1));
    this.position = position.get();
    this.timeToLive = 255.0;
    this.mass = 10;
};

//run function that displays and updates the water particles
Particle.prototype.run = function() {
    this.update();
    this.display();
};

//applying forces on the water particles
Particle.prototype.applyForce = function(force) {
    var f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
};

//updating water particles by changing velocity based on acceleration and position based on the new velocity
Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.timeToLive -= 2.0;
};

//displaying water particles
Particle.prototype.display = function() {
    noStroke();
    fill(204, 241, 255, 100);
    ellipse(this.position.x, this.position.y, 12, 12);
};

//function to determine if water particles are dead and need to be removed from array
Particle.prototype.isDead = function(){
    if (this.timeToLive < 0.0 || this.position.x > width || this.position.y < 0 || this.position.y > height) {
        return true;
    } else {
        return false;
    }
};

//defining system of particles
var ParticleSystem = function(origin, height) {
    this.origin = origin.get();
    this.height = height;
    this.particles = [];
};

//adding water particles to the system of particles
ParticleSystem.prototype.addParticle = function() {
    for (var i = 0; i < 10; i++) {
      var startPos = new PVector(this.origin.x,
            this.origin.y + random(-this.height/2, this.height/2));
        this.particles.push(new Particle(startPos));  
    }
};

//applying force to the entire system
ParticleSystem.prototype.applyForce = function(f){
    for(var i = 0; i < this.particles.length; i++){
        this.particles[i].applyForce(f);
    }
};

//applying rock's repulsion to system of water particles
ParticleSystem.prototype.applyRepeller = function(r) {
    for(var i = 0; i < this.particles.length; i++){
        var p = this.particles[i];
        var force = r.calculateRepelForce(p);
        p.applyForce(force);
    }
};

ParticleSystem.prototype.run = function(){
	for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        //removing dead water particles from array
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};


// Set up water pressure, particle system, and repeller
var pressure = new PVector(0.4, 0);
var particleSystem = new ParticleSystem(new PVector(0, height/2), 200);
var repeller = new Repeller(width/2, height/2);

//creating array of repellers
var repellers = [];
//adding rocks to array
for (var i = 0; i < 4; i++){
    repellers.push(new Repeller( random(0,width), random(40,height-40)));
}

//adding rocks when mouse is clicked
mouseClicked = function(){
    repellers.push(new Repeller (mouseX, mouseY));
};

draw = function() {

    // Draw ground
    for (var i = 0; i < 10; i++) {
        image(getImage("cute/DirtBlock"), i*95, -50);
        image(getImage("cute/DirtBlock"), i*95, 268);
    }
    
    // Draw river
    noStroke();
    fill(163, 230, 255);
    rect(0, 86, width, 233);
    
    // Update particle system
    particleSystem.applyForce(pressure);
    for (var i = 0; i < repellers.length; i++){
        particleSystem.applyRepeller(repellers[i]);
        repellers[i].display();
    }
      
    particleSystem.addParticle();
    particleSystem.run();
};
