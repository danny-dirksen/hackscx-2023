// Load the reference video.
var ref_video = document.querySelector("#ref-video");
var ref_canvas = document.querySelector("#ref-overlay-cvs");

// Start tracking the reference video
const ref_tracker = new Tracker(ref_video, ref_canvas, draw=true);
ref_tracker.startTracking();

// Load the webcam.
var cam_video = document.querySelector("#cam-video");
var cam_canvas = document.querySelector("#cam-overlay-cvs");

// Make the cam_video element get continual input from the camera.
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      cam_video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}

// Start tracking the webcam.
const cam_tracker = new Tracker(cam_video, cam_canvas, referenceTracker=ref_tracker, draw=true);
cam_tracker.startTracking();



// Make video speed adjustable.
let speedSelector = document.getElementById("speed-select");
speedSelector.onchange = function() {
  ref_video.playbackRate = this.value;
}
ref_video.playbackRate = speedSelector.value;

async function loadData() {
  const query = Object.fromEntries(
    window.location.search
    .split("?")[1]
    .split("&")
    .map((pair) => pair.split("="))
  );
  if ('plan' in query) {
    const planId = parseInt(query['plan']) || null;
    const workoutIndex = parseInt(query['workout']) || 0;

    const plansResp = await fetch("/data/plans.json");
    const plans = await plansResp.json();
    const plan = plans.find((p) => p.id == planId);
    const workoutsResp = await fetch("/data/workouts.json");
    const workouts = await workoutsResp.json();
    const workoutId = plan.workoutIds[workoutIndex];
    const workout = workouts.find((w) => w.workoutId == workoutId);

    const planNameEl = document.getElementById("plan-name");
    const workoutNameEl = document.getElementById("workout-name");
    const tipsEl = document.getElementById("tips-list");

    planNameEl.textContent = plan.name;
    workoutNameEl.textContent = workout.name;
    tipsEl.innerHTML = workout.tips.map((tip) => `<li>${tip}</li>`).join("");
    ref_video.src = `/data/workout-videos/${workoutId}.mp4`;
  }
}
loadData();