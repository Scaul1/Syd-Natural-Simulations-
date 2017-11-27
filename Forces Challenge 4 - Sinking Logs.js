//function containing properties of the liquid
var Liquid = function(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
};

//checking if the liquid contains the logs
Liquid.prototype.contains = function(m) {
    var l = m.position;
    return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;
};

//calculating the drag force the liquid is applying on the logs
Liquid.prototype.calculateDrag = function(m) {
    //magnitude of force
    var speed = m.velocity.mag();
    var dragMagnitude = this.c * speed * speed*m.width*0.02;
    //direction of force, which is opposite direction of velocity
    var dragForce = m.velocity.get();
    dragForce.mult(-1);

    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
};

//displaying liquid
Liquid.prototype.display = function() {
    noStroke();
    fill(126, 138, 242);
    rect(this.x, this.y, this.w, this.h);
};

//function containing properties of logs
var Log = function(w, x, y) {
    this.mass = 1;
    this.width = w;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//applying forces on logs
Log.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

//updating new logs by changing acceleration, position and velocity
Log.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//displaying logs
Log.prototype.display = function() {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(184, 150, 55);
    rect(this.position.x, this.position.y, this.width, this.mass*16);
};

//checking to see if the logs have reached bottom of canvas
Log.prototype.checkEdges = function() {
    if (this.position.y > height) {
        this.velocity.y *= -1;
        this.position.y = height;
    }
};

//declaring array for new logs to be stored
var logs = [];
//properties of liquid
var liquid = new Liquid(0, height/2, width, height/2, 0.1);

//adding new logs as elements in the log array with randomized widths
for (var i = 0; i < 5; i++) {
    logs[i] = new Log(random(10, 40), 20+i*width/5, 0);
}
    
draw = function() {
    background(235, 254, 255);
    liquid.display();
    
    //loop to apply all forces and updates to every log
    for (var i = 0; i < logs.length; i++) {
        var gravity = new PVector(0, 0.1*logs[i].mass);
        if (liquid.contains(logs[i])){
            var waterDrag = liquid.calculateDrag(logs[i]);
            logs[i].applyForce(waterDrag);
        }
        logs[i].applyForce(gravity);
        
        logs[i].update();
        logs[i].display();
        logs[i].checkEdges();
    }
};
