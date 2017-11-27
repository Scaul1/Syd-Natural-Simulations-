//third variable to animate
var zOff = 0.0;

draw = function() {
    //x-value for the shade
    var xOff = 0.0;
    //loop for each pixel horizontally
    for (var x = 0; x < 100; x++) {
        //y-value for the shade
        var yOff = 0.0;
        //loop for each pixel vertically
        for (var y = 0; y < 100; y++) {
            //using noise to create a shade
            var bright = map(noise(xOff, yOff, zOff), 0, 1, 0, 255);
            //creating the point
            stroke(bright, bright, bright);
            point(x, y);
            
            yOff += 0.01;
        }
    xOff += 0.01;
    }
    zOff += 0.01;
};
