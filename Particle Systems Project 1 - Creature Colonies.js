//original code based on my Creature comforts and critter jitters project

//includes ladybugs that oscillate around a flower
//has a system of water drops and winstons that inherit their properties from a particle

//CLICK IN THE CLOUDS TO MAKE IT RAIN WINSTONS!!!!

//setting angle mode to radians instead of degrees
angleMode = "radians";

//defining the properties of the flower
var Flower = function(){
    this.position = new PVector(width/2, height-100);
    this.mass = 40;
};

//displaying the Flower
Flower.prototype.display = function(){
    //four pedals
    fill(255, 0, 242);
    ellipse(this.position.x+13, this.position.y-89, 16, 16);
    ellipse(this.position.x, this.position.y-102, 16, 16);
    ellipse(this.position.x, this.position.y-76, 16, 16);
    ellipse(this.position.x-10, this.position.y-89, 16, 16);
    //center of flower
    fill(255, 247, 0);
    ellipse(this.position.x, this.position.y-89, 10, 10);
    //flower stem
    stroke(11, 122, 37);
    strokeWeight(4);
    line(this.position.x, this.position.y+100, this.position.x, this.position.y-65);
};

//defining particles
var Particle = function(position){
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 250;
};

//function to call both update and display functions on particles in one spot
Particle.prototype.run = function() {
    this.update();
    this.display();
};

//updating particles by changing velocity based on acceleration and position based on velocity
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //decreasing time to live by 2 so that it disappears around the time it reaches the ground
    this.timeToLive -= 2;
};

//displaying particles
Particle.prototype.display = function() {
    noStroke();
    fill(156, 237, 255, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

//determining if particle is dead 
Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//creating Water function that is an instance of a particle
var Water = function(position){
    Particle.call(this, position);
};

//creating Water object with same prototypes as particle
Water.prototype = Object.create(Particle.prototype);
Water.constructor = Water;

//displaying Water
Water.prototype.display = function(){
    noStroke();
    fill(156, 237, 255, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

//creating Winston function that is an instance of a particle
var Winston = function(position){
    Particle.call(this, position);
};

//creating Winston object with same prototypes as particle
Winston.prototype = Object.create(Particle.prototype);
Winston.constructor = Winston;


//displaying Winston
Winston.prototype.display = function(){
    noStroke();
    fill(60, 61, 61, this.timeToLive);
    image(getImage("creatures/Winston"), this.position.x, this.position.y, 10, 10);
};

//defining particle system based on origin and creating an array of particles
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

//adding new particles
ParticleSystem.prototype.addParticle = function() {
    //always adding water praticles
    this.particles.push(new Water(this.origin));
    //adding winston particles if mouse is pressed
    if (mouseIsPressed){
        this.particles.push(new Winston(this.origin));
    }
};

//running particle system
ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
            for (var i = this.particles.length-1; i >= 0; i--)    {
            var p = this.particles[i];
            p.run();
            //removing dead particles
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
  }
        
};

//creating array of particleSystem
var particleSystem  = [];
//variable for the x value of the particle origin
var w = 25;
//adding new particle systems to the array
for (var i = 0; i < 4; i++){
        particleSystem.push(new ParticleSystem (new PVector(w, 0)));
        //increasing x value of origin
        w = w+100;
    }

//defining the properties of the ladybug
var Bug = function() {
    this.a = 0;
    this.angVelocity = 0;
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
};

//oscillating the ladybugs
Bug.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
    var distance = this.position.mag();
    this.angVelocity += distance / 1000000;
    this.angVelocity = constrain(this.angVelocity, 0, 0.1);
    this.a += this.angVelocity;
};

//displaying the ladybugs
Bug.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(20, 1, 1);
    strokeWeight(4);
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.a);
    //ladybug
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(0, 0, 0);
    //head
    ellipse(-28, 0, 20, 20);
    fill(255, 0, 0);
    //body
    ellipse(0, 0, 48, 48);
    fill(0, 0, 0);
    //center line
    line(-23, 0, 23, 0);
    //spots
    ellipse(-13, -7, 10, 8);
    ellipse(0, -15, 10, 8);
    ellipse(13, -7, 10, 8);
    ellipse(-13, 9, 10, 8);
    ellipse(0, 7, 10, 8);
    ellipse(13, 12, 10, 8);
    popMatrix();
};

//new flower variable 
var flower = new Flower();

//declaring array for new bugs
var bug = [];
//creating new bugs at randomized locations
for (var i = 0; i < 2; i++) {
    bug[i] = new Bug(random(0.1, 2), random(width), random(height));
}

draw = function() {
    
    //sky
    background(203, 206, 207);
    
    //looping through array of particle systems 
    for (var i = 0; i < particleSystem.length; i++){
        particleSystem[i].addParticle();
        particleSystem[i].run();
        
    }
    
    
    //clouds
    fill(153, 148, 148);
    noStroke();
    ellipse(66, 18, 158, 137);
    ellipse(181, 18, 158, 107);
    ellipse(279, 18, 158, 100);
    ellipse(351, 18, 158, 120);
    
    //grass
    for (var grassPos = 0; grassPos <= 400; grassPos += 100){
        image(getImage("cute/GrassBlock"), grassPos, 376, 113, 119);
    }
    
    //looping through all the bugs and displaying and oscillating them
    for (var i = 0; i < bug.length; i++){
        bug[i].display();
        bug[i].oscillate();
    }
    
    //displaying flower
    flower.display();
};

