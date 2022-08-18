song="";
status="";
objects=[];

function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Person is Detected";
}
function preload(){
    song= loadSound("song.mp3");
}
function modelLoaded(){
    console.log("Model Loaded!")
    status="true";
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object= results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status !="")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i= 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Person is Detected";
            fill(r, g, b);
            percent= floor(object[i].confidence * 100);
            text(object[i].label+"" +percent+"%" , object[i].x , object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
            if(objects[i].label == person)
            {
                document.getElementById("status_of_baby").innerHTML="Baby found";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("status_of_baby").innerHTML="Baby  not found";
                console.log("start");
                song.start();
            }
            if(objects[i].label == 0)
            {
                document.getElementById("status_of_baby").innerHTML="Baby not found";
                console.log("start");
                song.st();
            }
        }
    }
}