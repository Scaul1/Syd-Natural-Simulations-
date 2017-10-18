//declaring variables
var generator = new Random(1);
var standardDeviation = 6;
var mean = 0; 
    
    //function containing starting point for splatter
    var paint = function() {
            this.x = 200;
            this.y = 200;
    };
    
    //displaying the ellipses with different shades of green
    paint.prototype.display = function() {
        //randomizing circle size
        var diameter = random(12);
        noStroke();
        //randomizing the colour
        var fillR = generator.nextGaussian()*15;
        var red = standardDeviation * fillR + mean;
        fill(red, 189, 138);
        //creating circles
        ellipse(this.x, this.y, diameter, diameter);
    };

//using Gaussian to randomize the direction the next paint drop goes in
paint.prototype.splatter = function() {
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    var xMove = standardDeviation * numX + mean;
    var yMove = standardDeviation * numY + mean;
    
    
    this.x += xMove;
    this.y += yMove;
    
    //if the x value is off the canvas then the paint restarts in the middle
    if (this.x > 400 || this.x < 0)
    {
        this.x = 200;
    }
    
    //if the y value is off the canvas then the paint restarts in the middle
    if (this.y > 400 || this.y < 10)
    {
        this.y = 200;
    }
};

//creating new paint function to be modified each time
var p = new paint();

//repeating the display and splatter functions so that the paint is continuously being put on the canvas
draw = function() {
    p.splatter();
    p.display();
};
