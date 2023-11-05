var detector;
var posDrawer;
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#overlayCanvas");

// Setup video and drawing canvas
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}

async function estimatePose() {
  const poses = await detector.estimatePoses(video);
  posDrawer.draw(poses);
  // console.log(poses);
  requestAnimationFrame(estimatePose); // Continuously estimate poses
}

// Promise that waits for video to load.
const videoLoad = new Promise((resolve, reject) => {
  video.onloadeddata = () => {
    resolve(video);
  };
});

async function init() {
  //const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
  detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER });
  await videoLoad;
  posDrawer = new PosDrawer(video, canvas);
  estimatePose();
}

init();