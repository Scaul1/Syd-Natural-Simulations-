//Biggest possible PVector that fits in the canvas
var maxDir = PVector.sub (new PVector (0, 0), new PVector (width-1, height-1));

//Magnitude of that vector
var maxMag = maxDir.mag();

//function containing original position, velocity and acceleration
var Mover = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//updated circle with new position, velocity and acceleration based on mouse's position
Mover.prototype.update = function() {
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    var closeness = (maxMag - dir.mag()) / maxMag;
    dir.normalize();
    dir.mult(closeness);
    
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

//displaying new circle
Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
};

//function to bring cirlce back onto the canvas on the other side if it leaves the canvas
Mover.prototype.checkEdges = function() {
  //if it leaves canvas on the right
  if (this.position.x > width) {
    this.position.x = 0;
  //if it leaves canvas on the left
  } else if (this.position.x < 0) {
    this.position.x = width;
  }
  //if it leaves canvas on the top
  if (this.position.y > height) {
    this.position.y = 0;
  //if it leaves canvas on the bottom
  } else if (this.position.y < 0) {
    this.position.y = height;
  }
};

//variable to be modified
var mover = new Mover();

//draw function to repeatedly draw a new circle
draw = function() {
    //drawing background every time to erase old circle
    background(255, 255, 255);
    
    mover.update();
    mover.checkEdges();
    mover.display(); 
};



