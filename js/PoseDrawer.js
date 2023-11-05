var MIN_SCORE = 0.4;

class PosDrawer {
  constructor(video, canvas) {
    this.width = canvas.width = video.videoWidth;
    this.height = canvas.height = video.videoHeight;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  draw(poses) {
    const ctx = this.ctx;

    // Don't draw pos if context has not yet been set.
    if (!ctx) return;
    // Draw your poses on the canvas (example: connecting body parts with lines).
    ctx.clearRect(0, 0, this.width, this.height);
    for (const pose of poses) {
      const keypoints = pose.keypoints;
      for (var i = 0; i < 1; i++) {
        ctx.strokeStyle = '#FF0000'; // Red color
        ctx.lineWidth = 3; // 3 pixels wide
        //ctx.fillRect(keypoints[0].x-5,keypoints[0].y-5,10,10);
        ctx.beginPath();
        // nose to left eye
        if (keypoints[0].score >= MIN_SCORE && keypoints[1].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[0].x, keypoints[0].y);
          ctx.lineTo(keypoints[1].x, keypoints[1].y);
        }
        // nose to right eye
        if (keypoints[0].score >= MIN_SCORE && keypoints[2].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[0].x, keypoints[0].y);
          ctx.lineTo(keypoints[2].x, keypoints[2].y);
        }
        // left eye to left ear
        if (keypoints[1].score >= MIN_SCORE && keypoints[3].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[1].x, keypoints[1].y);
          ctx.lineTo(keypoints[3].x, keypoints[3].y);
        }
        // right eye to right ear
        if (keypoints[2].score >= MIN_SCORE && keypoints[4].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[2].x, keypoints[2].y);
          ctx.lineTo(keypoints[4].x, keypoints[4].y);
        }
        // left shoulder to right shoulder
        if (keypoints[5].score >= MIN_SCORE && keypoints[6].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[5].x, keypoints[5].y);
          ctx.lineTo(keypoints[6].x, keypoints[6].y);
        }
        // left shoulder to left elbow
        if (keypoints[5].score >= MIN_SCORE && keypoints[7].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[5].x, keypoints[5].y);
          ctx.lineTo(keypoints[7].x, keypoints[7].y);
        }
        // right shoulder to right elbow
        if (keypoints[6].score >= MIN_SCORE && keypoints[8].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[6].x, keypoints[6].y);
          ctx.lineTo(keypoints[8].x, keypoints[8].y);
        }
        // left elbow to left wrist
        if (keypoints[7].score >= MIN_SCORE && keypoints[9].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[7].x, keypoints[7].y);
          ctx.lineTo(keypoints[9].x, keypoints[9].y);
        }
        // right elbow to right wrist
        if (keypoints[8].score >= MIN_SCORE && keypoints[10].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[8].x, keypoints[8].y);
          ctx.lineTo(keypoints[10].x, keypoints[10].y);
        }
        // left shoulder to left hip
        if (keypoints[5].score >= MIN_SCORE && keypoints[11].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[5].x, keypoints[5].y);
          ctx.lineTo(keypoints[11].x, keypoints[11].y);
        }
        // right shoulder to right hip
        if (keypoints[6].score >= MIN_SCORE && keypoints[12].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[6].x, keypoints[6].y);
          ctx.lineTo(keypoints[12].x, keypoints[12].y);
        }
        // left hip and right hip
        if (keypoints[11].score >= MIN_SCORE && keypoints[12].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[11].x, keypoints[11].y);
          ctx.lineTo(keypoints[12].x, keypoints[12].y);
        }
        // left hip to left knee
        if (keypoints[11].score >= MIN_SCORE && keypoints[13].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[11].x, keypoints[11].y);
          ctx.lineTo(keypoints[13].x, keypoints[13].y);
        }
        // right hip to right knee
        if (keypoints[12].score >= MIN_SCORE && keypoints[14].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[12].x, keypoints[12].y);
          ctx.lineTo(keypoints[14].x, keypoints[14].y);
        }
        // left knee to left ankle
        if (keypoints[13].score >= MIN_SCORE && keypoints[15].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[13].x, keypoints[13].y);
          ctx.lineTo(keypoints[15].x, keypoints[15].y);
        }
        // right knee to right ankle
        if (keypoints[14].score >= MIN_SCORE && keypoints[16].score >= MIN_SCORE) {
          ctx.moveTo(keypoints[14].x, keypoints[14].y);
          ctx.lineTo(keypoints[16].x, keypoints[16].y);
        }
        ctx.stroke();
      }
    }
  }
}