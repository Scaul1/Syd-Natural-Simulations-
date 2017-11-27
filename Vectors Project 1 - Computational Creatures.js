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

//updated ladybug with new position, velocity and acceleration based a randomized new PVector
Mover.prototype.update = function() {
    
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

//displaying new ladybug and plants
Mover.prototype.display = function() {
    //regular leaves
    image(getImage("avatars/leaf-green"), 10, 256, 101, 160);
    image(getImage("avatars/leaf-green"), 266, 257, 103, 157);
    //venus fly trap
    fill(120, 245, 120);
    //head
    arc(202, 304, 105, 98, 336, 656);
    fill(255, 0, 0);
    //tongue
    triangle(202, 304, 250, 285, 254, 301);
    fill(245, 228, 228);
    //teeth
    triangle(202, 304, 212, 293, 213, 303);
    triangle(220, 303, 227, 288, 231, 300);
    triangle(240, 303, 245, 292, 248, 303);
    triangle(213, 289, 219, 276, 222, 286);
    triangle(231, 269, 220, 269, 224, 262);
    strokeWeight(8);
    stroke(31, 156, 26);
    line(200, 400, 200, 354);
    
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

//function to bring ladybug away from venus fly trap if it gets too close
Mover.prototype.checkEdges = function() {
  //if it approaches venus fly trap from the left
  if ((this.position.x>150) && (this.position.x<202) && (this.position.y>250)){
        this.position.x = 100;
        this.position.y = 240;
  }
  //if it approaches venus fly trap from the right
  else if ((this.position.x<255) && (this.position.x > 202) && (this.position.y>250)){
      this.position.x = 350;
      this.position.y = 240;
  }
};

//variable to be modified
var mover = new Mover();

//draw function to repeatedly draw a new ladybug
draw = function() {
    //drawing background every time to erase old ladybug
    background(194, 249, 252);
    
    mover.update();
    mover.checkEdges();
    mover.display(); 
};
