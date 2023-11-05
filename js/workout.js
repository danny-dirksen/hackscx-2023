var ref_video = document.querySelector("#ref-video");
var ref_canvas = document.querySelector("#ref-overlay-cvs");
const ref_tracker = new Tracker(ref_video, ref_canvas, draw=true);
ref_tracker.startTracking();

// Load webcam and start tracking it
var cam_video = document.querySelector("#cam-video");
var cam_canvas = document.querySelector("#cam-overlay-cvs");

// Make the cam_video element use the webcam stream
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      cam_video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}

// Load webcam and start tracking it
const cam_tracker = new Tracker(cam_video, cam_canvas, referenceTracker=ref_tracker, draw=true);
cam_tracker.startTracking();

// Get score from webcam error
var error_score = cam_tracker.getError();
let text = document.getElementById("comparison-result");
if(error >= 0 && error < 0.2){
  text.textContent = "Bad";
  text.style.color = "red";
} else if(error >= 0.2 && error < 0.4){
  text.textContent = "Ok";
  text.style.color = "lightred";
} else if(error >= 0.4 && error < 0.6){
  text.textContent = "Good";
  text.style.color = "white";
} else if(error >= 0.6 && error < 0.8){
  text.textContent = "Very Good";
  text.style.color = "lightgreen";
} else if(error >= 0.8 && error <= 1.0){
  text.textContent = "Prefect";
  text.style.color = "green";
}
