// All trackers share the same detector. Initialized the first time its used.
let detector = null;
const smooth = 0;

class Tracker {
  // Creates tracker and starts tracking.
  constructor(video, canvas, referenceTracker=null, draw=true) {
    this.video = video;
    this.canvas = canvas;
    this.referenceTracker = referenceTracker;
    this.error = 0;
    this.draw = draw;
  }

  waitForVideoToLoad() {
    return new Promise((resolve) => {
      // If video metadata is already loaded, resolve immediately.
      if (this.video.readyState >= 3) {
        resolve(this.video);
        return;
      }
      // Otherwise wait for the video to load enough metadata to determine video
      this.video.onloadeddata = () => resolve(this.video);
    });
  }

  async startTracking() {
    if (!detector) {
      //detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER}
      );
    }
    await this.waitForVideoToLoad();
    this.poseDrawer = new PosDrawer(this.video, this.canvas);
    this.tick();
  }
  
  async tick() {
    var slider = document.getElementById("myRange");
    this.video.playbackRate = slider.value / 100;
    this.poses = await detector.estimatePoses(this.video);
    if (this.referenceTracker && this.referenceTracker.poses) {
      // console.log(this.poses);
      // console.log(this.referenceTracker.poses)
      this.error = (this.error*smooth + comparePoses(this.poses, this.referenceTracker.poses))/(smooth+1);
      if (isNaN(this.error)) {
        this.error = 0;
      }
      console.log(this.error);
      // Get score from webcam error
      let text = document.getElementById("comparison-result");
      if(this.error >= 0 && this.error < 0.2){
        text.textContent = "Bad";
        text.style.color = "red";
      } else if(this.error >= 0.2 && this.error < 0.4){
        text.textContent = "Ok";
        text.style.color = "lightred";
      } else if(this.error >= 0.4 && this.error < 0.6){
        text.textContent = "Good";
        text.style.color = "white";
      } else if(this.error >= 0.6 && this.error < 0.8){
        text.textContent = "Very Good";
        text.style.color = "lightgreen";
      } else if(this.error >= 0.8 && this.error <= 1.0){
        text.textContent = "Prefect";
        text.style.color = "green";
      }
    }
    if (this.draw) {
      this.poseDrawer.draw(this.poses);
    }
    requestAnimationFrame(this.tick.bind(this)); // Continuously estimate poses
  }
}