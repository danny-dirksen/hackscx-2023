// All trackers share the same detector. Initialized the first time its used.
let detector = null;

class Tracker {
  // Creates tracker and starts tracking.
  constructor(video, canvas, referenceTracker=null, draw=true) {
    this.video = video;
    this.canvas = canvas;
    this.referenceTracker = referenceTracker;
    this.edgeErrors = null;
    this.avgError = 0;
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
  
  /**
   * Runs every animation frame to detect pos, calculate errors, and render.
   */
  async tick() {
    this.poses = await detector.estimatePoses(this.video);
    if (this.referenceTracker && this.referenceTracker.poses) {
      this.updateError(0.1);
      
      if (isNaN(this.avgError)) {
        this.avgError = 0;
      }
      // Get score from webcam error
      let text = document.getElementById("comparison-result");
      if(this.avgError >= 0 && this.avgError < 0.3) {
        text.textContent = "Perfect Form!";
        text.style.color = "light-green";
        this.referenceTracker.video.play();
      } else if (this.avgError < 0.5){
        text.textContent = "Nice Form!";
        text.style.color = "white";
        this.referenceTracker.video.play();
      } else if (this.avgError < 0.8){
        text.textContent = "OK...";
        text.style.color = "yellow";
        // play video
        this.referenceTracker.video.play();
      } else {
        text.textContent = "Keep Adjusting";
        text.style.color = "orange";
        // pause video if they are too far off
        this.referenceTracker.video.pause();
      }
    }
    if (this.draw) {
      this.poseDrawer.draw(this.poses, this.edgeErrors);
    }
    requestAnimationFrame(this.tick.bind(this)); // Continuously estimate poses
  }

  /**
   * Recalculates error, mixing the new error with the old error.
   * @param {*} factor How much of the new error to mix in. 0 = no new error, 1 = all new error.
   */
  updateError(factor=1) {
    const [newEdgeErrors, newAvgError] = calculateEdgeErrors(this.poses, this.referenceTracker.poses);
    // If error can't be calculated, don't update error.
    if (!newEdgeErrors || newAvgError === null) return;
    // If this is the first time, just set the error.
    if (!this.edgeErrors) {
      this.edgeErrors = newEdgeErrors;
      this.avgError = newAvgError;
      return;
    }
    for (let i = 0; i < this.edgeErrors.length; i++) {
      this.edgeErrors[i] = this.edgeErrors[i] * (1 - factor) + newEdgeErrors[i] * factor;
    }
    this.avgError = this.avgError * (1 - factor) + newAvgError * factor;
  }
}