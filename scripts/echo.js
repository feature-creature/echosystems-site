var _strokeCol = 245;
var _strokeChange = -1;
var canvas;
var boids = [];
var black = false;
var img0, img1,img2,img3,img4,img5,img6,img9,img8,img9;
var imgarr = [];


function setup() {
    canvas = createCanvas($(".info-container").width(), $(window).height());
    canvas.parent('canvas-container');
    // if($('.header-logo').height() * 1.25 > windowHeight){
    //     resizeCanvas(windowWidth, $('.header-logo').height() * 1.25);
    // }


    background(255);
    frameRate(60);

    var p = 10;
    img0 = loadImage("./scripts/stampTool_566.png");
    img1 = loadImage("./scripts/stampTool_713.png");
    img2 = loadImage("./scripts/stampTool_738.png");
    img3 = loadImage("./scripts/stampTool_905.png");
    img4 = loadImage("./scripts/stampTool_1025.png");
    img5 = loadImage("./scripts/stampTool_1085.png");
    img6 = loadImage("./scripts/stampTool_1474.png");
    img7 = loadImage("./scripts/stampTool_2025.png");
    img8 = loadImage("./scripts/stampTool_7652.png");
    img9 = loadImage("./scripts/stampTool_5966.png");

    imgarr[0] = img0;
    imgarr[1] = img1;
    imgarr[2] = img2;
    imgarr[3] = img3;
    imgarr[4] = img4;
    imgarr[5] = img5;
    imgarr[6] = img6;
    imgarr[7] = img7;
    imgarr[8] = img8;
    imgarr[9] = img9;


    for (var i = 0; i < p; i++) {
            boids[i] = new Boid(random(width/2 - 25, width/2 + 25), random(height/2.5 - 25, height/2.5 + 25),imgarr[i]);
    }
}



function draw() {
    // Run all the boids
    for (var i = 0; i < boids.length; i++) {
        boids[i].run(boids);
    }
}



function windowResized() {
        resizeCanvas($(".info-container").width(),500);

}



// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x, y,i) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 700/12;
    this.maxspeed = .75;    // Maximum speed
    this.maxforce = 2; // Maximum steering force
    this.img = i;
}




Boid.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
}



// Forces go into acceleration
Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}



// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
    var sep = this.separate(boids); // Separation
    var ali = this.align(boids);    // Alignment
    var coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
}



// Method to update location
Boid.prototype.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
}



// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
}



// Draw boid as an image
Boid.prototype.render = function() {
    var r = this.img.height/24;

    image(this.img, this.position.x - this.img.width/12, this.position.y - this.img.width/12, this.img.width/6, this.img.height/6);
}



// Wraparound
Boid.prototype.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
}



// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
    var desiredseparation = _strokeCol;
    var steer = createVector(0, 0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
    }
    // Average -- divide by how many
    if (count > 0) {
            steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
    }
    return steer;
}



// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
    var neighbordist = 5;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
    }

    if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
    } else {
            return createVector(0, 0);
    }
}



// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
    var neighbordist = 1;
    var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
            }
    }
    if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
    } else {
            return createVector(0, 0);
    }
}
