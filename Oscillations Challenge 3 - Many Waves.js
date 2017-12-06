//changing angle mode from degrees to radians
angleMode = "radians";

//defining the properties of the wave
var Wave = function(amplitude, period, color) {
    this.startAngle = 0;
    this.amplitude = amplitude;
    this.period = period;
    this.color = color;
    this.angleVel = (TWO_PI / this.period) * 5;
};

//updating the angle that it starts on the left side of the screen
Wave.prototype.update = function() {
    this.startAngle += TWO_PI / this.period;
};

//drawing the circles
Wave.prototype.draw = function() {
    var angle = this.startAngle;
    fill(this.color);
    
    for (var x = 0; x<= width; x+= 19){
        var y = this.amplitude * sin(angle);
        ellipse(x, y+height/2, 42, 42);
        angle+= this.angleVel;
    }
};

//declaring first wave
var wave = new Wave(200, 175, color(255, 0, 0, 100));

translate(0, height/2);

//declaring second wave
var wave1 = new Wave(126, width-60, color(145, 230, 224));

//function to update and draw waves
draw = function() {
    background(255);
    wave.update();
    wave.draw();
    wave1.update();
    wave1.draw();
};

