//setting angle mode to radians instead of degrees
angleMode = "radians";

//defining the fire particles
var Particle = function(position) {
    //negative acceleration so that fire goes up
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 100;
};

//function to call both update and display functions on fire particles in one spot
Particle.prototype.run = function() {
    this.update();
    this.display();
};

//updating fire particles
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 2;
};

//displaying fire particles
Particle.prototype.display = function() {
    noStroke();
    //using hue to make fire colours
    colorMode(HSB);
    var hue = (100-this.timeToLive) * 0.5;
    fill(hue, 255, 255, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

//if fire particle is dead 
Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//defining particle system based on origin and creating an array of fire particles
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

//adding new fire particles
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

//running particle system
ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        
        var p = this.particles[i];

        try {   // Let's try, but don't freak out if it fails
            p.run();    // Trying to run particle
        } catch (e) {   // Dammit, something went wrong
            throw ({    // Hack Oh Noes and tell the user
                message: "Make sure the values you pass to the fill() function are always positive. " + e
            });
        }
        
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

// We start off with an empty systems array
var systems = [];
systems.push(new ParticleSystem(new PVector(width/2, height/2)));

// We fill up the leaves array with positions
var leaves = [];
for (var i = 0; i < 100; i++) {
    leaves.push(new PVector(random(0, width), random(0, height)));
}

//adding fire particle systems when mouse is dragged
mouseDragged = function() {
    systems.push(new ParticleSystem(new PVector(mouseX, mouseY)));
};

draw = function() {
    colorMode(RGB);
    background(66, 57, 11);
    //adding new leaves to array
    for (var i = 0; i < leaves.length; i++) {
        image(getImage("avatars/leaf-orange"), leaves[i].x, leaves[i].y, 30, 30);
    }
    for (var i = 0; i < systems.length; i++){
        systems[i].addParticle();
        systems[i].run();
    }
};

