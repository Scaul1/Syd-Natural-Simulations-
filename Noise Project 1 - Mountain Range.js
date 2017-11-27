//blue sky
background(117, 0, 128);
//sun
fill(230, 180, 71);
noStroke();
ellipse(0, 0, 120, 120);


////////// using noise to make hazy clouds /////////

//x-value for the shade
    var xOff = 0;
    //loop for each pixel horizontally
    for (var x = 0; x < width; x+= 2) {
        //y-value for the shade
        var yOff = 0.0;
        //loop for each pixel vertically
        for (var y = 0; y < 180; y+=2) {
            //using noise to create a shade
            var bright = map(noise(xOff, yOff), 0, 1, -200, 283);
            //creating the point
            stroke(255, 255, 255, bright);
            point(x, y);
            
            yOff += 0.1;
        }
        xOff += 0.01;
    }

//creating three different mountain ranges
var drawRange = function() {
    stroke(38, 37, 37);
    var incAmount = 0.01;
    for (var t = 0; t < (incAmount*width)+10; t += incAmount) {
        var n = noise(t);
        var y = map(n, 1.4, 0.55, 0, height/2);
        rect(t*50, height-y, 1, y);
    }
};
var drawRange2 = function(){
    stroke(138, 131, 131);
    var incAmount = 0.01;
    for (var t = 0; t < (incAmount*width)+10; t += incAmount) {
        var n = noise(t);
        var y = map(n, 1.4, 0.2, -4, height/2);
        rect(t*100, height-y, 1, y);
    }
};
var drawRange3 = function(){
    stroke(179, 177, 177);
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t);
        var y = map(n, 1.1, -0.5, -4, height/2);
        rect(t*200, height-y, 1, y);
    }
};

//calling mountain functions
drawRange();
drawRange2();
drawRange3();

/////////////// making birds //////////////////
var generator = new Random(1);
var standardDeviation = 50;
var mean = 0;
var count = 0;

var bird = function() {
    this.x = 350;
    this.y = 100;
};

bird.prototype.display = function() {
    noFill();
    strokeWeight(2);
    stroke(0, 0, 0);
    arc(this.x, this.y, 10, 6, 180, 360);
    arc(this.x+10, this.y, 10, 6, 180, 360);
    
};

// Randomly move up, down, left, right, or stay in one place
bird.prototype.move = function() {
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    var xStepSize = standardDeviation * numX + mean;
    var yStepSize = standardDeviation * numY + mean;
  
    this.x += xStepSize;
    this.y += yStepSize;
    
    if (this.y > 150)
    {
        this.y = 20;
    }
};

var b = new bird();

/////////////// making trees //////////////////

var tree = function() {
    this.x = 200;
    this.y = 350;
};

tree.prototype.display = function() {
    strokeWeight(3);
    stroke(0, 0, 0);
    stroke(89, 50, 11);
    line(this.x, this.y, this.x, this.y-10);
    noStroke();
    var fillR = generator.nextGaussian()*2;
    var red = standardDeviation * fillR + mean;
    fill(red, 143, 61);
    if (this.y>350)
    {
        triangle(this.x-20, this.y-10, this.x, this.y-30, this.x+20, this.y-10);
    }
    else if (this.y > 300){
        triangle(this.x-16, this.y-10, this.x, this.y-24, this.x+16, this.y-10);
    }
    else if (this.y > 250){
        triangle(this.x-10, this.y-10, this.x, this.y-18, this.x+10, this.y-10);
    }
    else {
        triangle(this.x-6, this.y-10, this.x, this.y-14, this.x+6, this.y-10);
    }
};

// Randomly move up, down, left, right, or stay in one place
tree.prototype.walk = function() {
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    var xStepSize = standardDeviation * numX + mean;
    var yStepSize = standardDeviation * numY + mean;
  
    this.x += xStepSize;
    this.y += yStepSize;
    
    if (this.y < 220)
    {
        this.y = 350;
    }
};

//new tree variable to be modified
var t = new tree();

//loop to display multiple trees and birds
for (var i = 0; i<200; i++){
    //displaying the trees
    t.walk();
    t.display();
    //displaying the birds
    b.move();
    b.display();
}
