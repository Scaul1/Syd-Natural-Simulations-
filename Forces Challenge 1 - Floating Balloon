//function declaring original properties of the balloon
var Balloon = function() {
    this.mass = 1;
    this.height = 100;
    this.width = 70;
    this.position = new PVector(width/2, height-this.height/2-10);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//applying forces on balloon
Balloon.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

//updating location of balloon by modifying velocity, position and acceleration
Balloon.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//displaying balloon
Balloon.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    //string
    line(this.position.x, this.position.y, this.position.x, this.position.y + this.height*2);
    //balloon
    ellipse(this.position.x, this.position.y, this.width, this.height);
};

//making balloon bounce off the ceiling
Balloon.prototype.checkEdges = function() {
    
    if (this.position.y<this.height/2){
        this.velocity.y *= -1;
    }
};

//adding a helium force that makes the balloon go up
var helium = new PVector (0, -0.2);

//new version of balloon to be modified
var m = new Balloon(); 

//applying helium force
m.applyForce(helium);

//function to repeatedly draw new balloon at new location
draw = function() {
    background(224, 224, 224);
    
    m.update();
    m.display();
    m.checkEdges();
};

