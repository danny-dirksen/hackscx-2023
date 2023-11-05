// All trackers share the same detector. Initialized the first time its used.
let detector = null;

class Tracker {
  // Creates tracker and starts tracking.
  constructor(video, canvas, draw=true) {
    this.video = video;
    this.canvas = canvas;
    this.draw = draw;
    console.log(this.video.id)
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
    //const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
    if (!detector) {
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
      );
    }
    await this.waitForVideoToLoad();
    this.poseDrawer = new PosDrawer(this.video, this.canvas);
    this.tick();
  }
  
  async tick() {
    const poses = await detector.estimatePoses(this.video);
    if (this.draw) {
      this.poseDrawer.draw(poses);
    }
    requestAnimationFrame(this.tick.bind(this)); // Continuously estimate poses
  }
}