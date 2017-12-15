//setting angle to radians instead of degrees
angleMode = "radians";

//defining properties of a particle
var Particle = function(position) {
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(0, -1));
    this.position = position.get();
    this.timeToLive = 255.0;
};

//function that calls both update and display functions, puts them in one spot
Particle.prototype.run = function() {
    this.update();
    this.display();
};

//updating particles by changing belocity based on acceleration and position based on velocity
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //decreasing their time to live so that they can eventually be removed from array
    this.timeToLive -= 2;
};

//displaying particles
Particle.prototype.display = function() {
    stroke(0, 0, 0, this.timeToLive);
    strokeWeight(2);
    fill(255, 0, 0, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

//if particle's time to live is lower than zero than it will be removed from array
Particle.prototype.isDead = function(){
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//creating Smoke function that is an instance of a particle
var Smoke = function(position){
    Particle.call(this, position);
};

//creating smoke object with same prototypes as particle
Smoke.prototype = Object.create(Particle.prototype);
Smoke.constructor = Smoke;

//displaying smoke
Smoke.prototype.display = function(){
    noStroke();
    fill(60, 61, 61, this.timeToLive);
    ellipse(this.position.x, this.position.y, 17, 17);
};

//creating star object with same prototypes as particle
var Star = function(position){
    Particle.call(this, position);
    this.size = random(6, 12);
};

//creating smoke object with same prototypes as particle
Star.prototype = Object.create(Particle.prototype);
Star.constructor = Star;

//displaying smoke
Star.prototype.display = function(){
    var m = getImage("cute/Star");
    image(getImage("cute/Star"), this.position.x, this.position.y, (this.size * m.width) / 60, (this.size * m.height) / 80);
};

//using origin to get a position for the particles 
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

//randomly adding smoke and star particles
ParticleSystem.prototype.addParticle = function() {
    var r = random(1);
    if (r < 0.5){
        //add smoke particles
        this.particles.push(new Smoke(this.origin));
    }
    else {
        //add star particles
        this.particles.push(new Star(this.origin));
    }
};

//using splice to delete dead particles
ParticleSystem.prototype.run = function(){
	for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
        this.particles.splice(i, 1);
    }
  }
};

//creating new variable for the a system of particles
var particleSystem = new ParticleSystem(new PVector(width/2, 280));

draw = function() {
    background(72, 7, 105);
    particleSystem.addParticle();
    particleSystem.run();
  
    // The magical cauldron
    fill(36, 36, 36);
    var cauldronX1 = 150;
    var cauldronX2 = 250;
    var cauldronY = 285;
    bezier(cauldronX1, cauldronY,
           cauldronX1-100, cauldronY+145,
           cauldronX2+100, cauldronY+145,
           cauldronX2, cauldronY);
};
