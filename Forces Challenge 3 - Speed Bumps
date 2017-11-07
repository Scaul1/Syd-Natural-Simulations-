//declaring properties of the Skateboard
var Skateboard = function(x, m) {
    this.mass = m;
    this.position = new PVector(x, 0);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.width = this.mass*16;
    this.height = this.mass*16*2;
};

//applying the forces to the skateboard
Skateboard.prototype.applyForce = function(force) {
  var f = PVector.div(force, this.mass);
  this.acceleration.add(f);
};

//updating the position of the skateboard by changing the velocity, position and acceleration
Skateboard.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

//displaying  the skateboards
Skateboard.prototype.display = function() {
  stroke(0);
  
  fill(184, 184, 37);
  strokeWeight(1);
  ellipse(this.position.x, this.position.y+this.height/5, this.width/10, this.height/10);
  ellipse(this.position.x+this.width, this.position.y+this.height/5, this.width/10, this.height/10);
  ellipse(this.position.x, this.position.y+this.height*0.80, this.width/10, this.height/10);
  ellipse(this.position.x+this.width, this.position.y+this.height*0.80, this.width/10, this.height/10);
  
  fill(71, 71, 71);
  rect(this.position.x, this.position.y, this.width-2, this.height, 30);
};

//declaring properties of the speedbump
var SpeedBump = function(y, height) {
    this.x = 50;
    this.y = y;
    this.width = 300;
    this.height = height;
}; 

//dispalying the rectangle to be a speedbump
SpeedBump.prototype.display = function() {
    fill(40, 40, 40, 100);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
};

//to be used when the speedbump is under the skateboard
SpeedBump.prototype.isUnder = function(skateboard) {
    return skateboard.position.x >= this.x &&
        skateboard.position.x <= this.x + this.width &&
        skateboard.position.y >= this.y && 
        skateboard.position.y <= this.y + this.height;
};

//creating array of skateboards
var boards = [];
//adding new skateboards to the array
boards.push(new Skateboard(100, 1.5));
boards.push(new Skateboard(240, 0.8));
boards.push(new Skateboard(155, 1.7));
boards.push(new Skateboard(300, 1.2));

//creating position of speed bump
var bump = new SpeedBump(200, 60);

draw = function() {
    background(6, 97, 21);
    fill(140, 140, 140);
    rect(50, 0, 300, height);
    fill(255, 255, 255);
    rect(190, 0, 10, height);
    
    //loop to apply methods to every skateboard element in the array
    for (var i = 0; i < boards.length; i++) {
        var accel = new PVector(0, 0.1*boards[i].mass);
        
        var c = 0.01;       // Coefficient of friction
        //increasing friction when skateboards go over speedbump
        if (bump.isUnder(boards[i])){
            c = 0.4;
        }
        //applying forces
        var normal = 1;
        var frictionMag = c * normal;
        var friction = boards[i].velocity.get();
        friction.mult(-1);
        friction.normalize();
        friction.mult(frictionMag); 
        boards[i].applyForce(friction);
        
        boards[i].applyForce(accel);
        boards[i].update();
        //displaying boards and bump
        boards[i].display();
        bump.display();
    }
};
