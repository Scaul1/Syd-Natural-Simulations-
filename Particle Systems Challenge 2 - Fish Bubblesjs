//defining bubbles
var Particle = function(position) {
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 200;
};

//run function to call both the update and display functions 
Particle.prototype.run = function() {
    this.update();
    this.display();
};

//updating bubbles by changing velocity based on acceleration and then the position based on the velocity
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 2;
};

//displaying the bubbles
Particle.prototype.display = function() {
    stroke(255, 255, 255, 100);
    strokeWeight(2);
    fill(255, 255, 255, 50);
    //increasing radius of bubbles
    var radius = (height - this.position.y) /10;
    ellipse(this.position.x, this.position.y, radius, radius);
};

//if bubble is dead and therefore needs to be deleted from array
Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//defining particle system
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

//adding new bubbles to particles array
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

//calling run funciton on bubbles and deleting bubbles that need to be removed from array
ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

//defining fish
var Fish = function(position) {
    this.position = position.get();
    this.width = 100;
    this.height = 60;
};

//increasing x position of fish to make it move
Fish.prototype.swim = function() {
    this.position.x += 1;
    if (this.position.x > 450){
        this.position.x = -60;
    }
};

//displaying fish
Fish.prototype.display = function() {
    noStroke();
    fill(255, 191, 0);
    ellipse(this.position.x, this.position.y, this.width, this.height);
    triangle(this.position.x-this.width/2+10, this.position.y,
             this.position.x-this.width*0.75, this.position.y+this.height/3,
             this.position.x-this.width*0.75, this.position.y-this.height/3);
    fill(255, 191, 0);
    triangle(this.position.x+this.width/2+10, this.position.y-this.height/12,
             this.position.x+this.width/2-2, this.position.y+this.height/8,
             this.position.x+this.width/2-2, this.position.y-this.height/8);
    triangle(this.position.x+this.width/2+10, this.position.y-this.height/12+18,
             this.position.x+this.width/2-10, this.position.y+this.height/8+10,
             this.position.x+this.width/2-12, this.position.y-this.height/8+10);
    fill(255, 255, 255);
    ellipse(this.position.x+this.width/2-10, this.position.y-11, 15, 20);
    fill(0, 0, 0);
    ellipse(this.position.x+this.width/2-7, this.position.y-10, 6, 6);
};

//getting the position of the mouth to be origin of particle system
Fish.prototype.getMouthPosition = function() {
    return new PVector(this.position.x+this.width/2+10, this.position.y);
};

//creating new fish and bubbles variable
var fish = new Fish(new PVector(width/2, height/2));
var bubbles = new ParticleSystem(fish.getMouthPosition());

draw = function() {
    background(17, 78, 117);
    //spanning out bubbles
    if (frameCount % 8 === 1){
        bubbles.addParticle();
    }
    //displaying and updating fish and bubbles from fish's mouth
    bubbles.origin.set(fish.getMouthPosition());
    bubbles.run();
    fish.swim();
    fish.display();
};
