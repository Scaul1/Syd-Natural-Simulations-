//global variable as gravity force
var force = 1;

//Biggest possible PVector that fits in the canvas
var maxDir = PVector.sub (new PVector (0, 0), new PVector (width-1, height-1));

//Magnitude of that vector
var maxMag = maxDir.mag();

//defining the properties of the flower
var Flower = function(){
    this.position = new PVector(width/2, height-100);
    this.mass = 40;
};

//function that calculates the attraction of the flower on the bugs
Flower.prototype.calculateAttraction = function(m){
    //direction of the force
    var forceOfR = PVector.sub(this.position, m.position);
    //how far away the objects are
    var distance = forceOfR.mag();
    //keeping distance within reasonable size
    distance = constrain(distance, 5, 50);  
    forceOfR.normalize();
    //calculating gravity
    var strength = (this.force * this.mass * m.mass) / (distance * distance);
    forceOfR.mult(strength);
    return forceOfR;
};

//displaying the Flower
Flower.prototype.display = function(){
    //four pedals
    fill(255, 0, 242);
    ellipse(this.position.x+11, this.position.y, 16, 16);
    ellipse(this.position.x-11, this.position.y, 16, 16);
    ellipse(this.position.x, this.position.y-11, 16, 16);
    ellipse(this.position.x, this.position.y+11, 16, 16);
    //center of flower
    fill(255, 247, 0);
    ellipse(this.position.x, this.position.y, 10, 10);
    //flower stem
    stroke(11, 122, 37);
    strokeWeight(4);
    line(this.position.x, this.position.y+100, this.position.x, this.position.y+20);
};


//bug function containing properties of the ladybugs
var Bug = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(1, 0);
    this.acceleration = new PVector(0, 0);
};

//updating bugs by changing velocity, position and acceleration
Bug.prototype.update = function() {
    var m = new PVector(random(400), random(400));
    var dir = PVector.sub(m, this.position);
    var closeness = (maxMag - dir.mag()) / maxMag;
    dir.normalize();
    //adding 1 to closeness to create more of a "buzzing" effect, aka the bug is not moving in such a direct straight line
    dir.mult(closeness+1);
    
    this.acceleration = dir;
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

//dispalying the bugs
Bug.prototype.display = function() {
    //ladybug
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(0, 0, 0);
    //head
    ellipse(this.position.x-28, this.position.y, 20, 20);
    fill(255, 0, 0);
    //body
    ellipse(this.position.x, this.position.y, 48, 48);
    fill(0, 0, 0);
    //center line
    line(this.position.x-24, this.position.y, this.position.x+23, this.position.y);
    //spots
    ellipse(this.position.x-13, this.position.y-7, 10, 8);
    ellipse(this.position.x, this.position.y-15, 10, 8);
    ellipse(this.position.x+13, this.position.y-7, 10, 8);
    ellipse(this.position.x-13, this.position.y+9, 10, 8);
    ellipse(this.position.x, this.position.y+7, 10, 8);
    ellipse(this.position.x+13, this.position.y+12, 10, 8);
};

//calculating attraction between bugs
Bug.prototype.calculateAttraction = function(m) {
    var forceOfA = PVector.sub(this.position, m.position);
    var distance = forceOfA.mag();
    distance = constrain(distance, 5.0, 25.0);
    forceOfA.normalize();
    var strength = (force * this.mass * m.mass) / (distance * distance);
    forceOfA.mult(strength);
    return forceOfA;
};


//applying forces to change acceleration of bugs
Bug.prototype.applyForce = function(forces) {
    var f = PVector.div(forces, this.mass);
    this.acceleration.add(f);
};

var flower = new Flower();

//declaring array for new bugs
var bug = [];
//creating new bugs at randomized locations
for (var i = 0; i < 2; i++) {
    bug[i] = new Bug(random(0.1, 2), random(width), random(height));
}

draw = function() {
    background(190, 246, 247);
    
    //grass
    for (var grassPos = 0; grassPos <= 400; grassPos += 100){
        image(getImage("cute/GrassBlock"), grassPos, 360, 100, 40);
    }
    
    //looping through all of the movers
    for (var i = 0; i < bug.length; i++) {
        
        var forceOfF = flower.calculateAttraction(bug[i]);
        bug[i].applyForce(forceOfF);
        
        //loop to make each mover be attracted to all other movers
        for (var j = 0; j < bug.length; j++) {
            //making sure the mover is not attracted to itself
            if (i !== j) {
                var forceOfA = bug[j].calculateAttraction(bug[i]);
                //applying the repulsion
                bug[i].applyForce(forceOfA);
            }
        }
        //calling the update and display functions
        flower.display();
        bug[i].update();
        bug[i].display();
    }
};
