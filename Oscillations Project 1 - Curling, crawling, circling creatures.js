//original code based on my Creature comforts and critter jitters project

//includes ladybugs that oscillate around a flower

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
    background(174, 218, 232);
    
    //grass
    for (var grassPos = 0; grassPos <= 400; grassPos += 100){
        image(getImage("cute/GrassBlock"), grassPos, 376, 113, 48);
    }
    
    //looping through all the bugs and displaying and oscillating them
    for (var i = 0; i < bug.length; i++){
        bug[i].display();
        bug[i].oscillate();
    }
    
    //displaying flower
    flower.display();
};
