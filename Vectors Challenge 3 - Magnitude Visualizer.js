mouseMoved = function() {
    //vector using position of mouse
    var mouse = new PVector(mouseX, mouseY);
    
    //calculating the distance of canvas
    var distance = dist(0, 0, width, height);
    //magnitude of vector
    var m = mouse.mag();
    //using magnitude to change background colour
    var a = map(m, 0, distance, 0, 255);
    background(a, a, a);
    
    //displaying the line
    stroke(255, 0, 0);
    strokeWeight(3);
    line(0, 0, mouse.x, mouse.y);
    
    //displaying text with 
    fill(255, 0, 0);
    text(m, mouse.x, mouse.y);
};
