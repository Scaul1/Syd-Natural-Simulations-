var Walker = function() {
    this.x = width/2;
    this.y = height/2;
};

Walker.prototype.display = function() {
    stroke(0, 0, 0);
    point(this.x, this.y);
};

// Randomly move right, left, down or up
Walker.prototype.walk = function() {
    var r = random(1);
     
    if (r < 0.1) {
      this.x++;
    } else if (r < 0.2) {
      this.x--;
    } else if (r < 0.4) {
      this.y++;
    } else {
      this.y--;
    }
};

var w = new Walker();

draw = function() {
    w.walk();
    w.display();
};
