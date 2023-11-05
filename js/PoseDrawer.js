const PI2 = Math.PI * 2;
const SAMPLE_EDGE_ERRORS = EDGES.map(_ => 0);

class PosDrawer {
  constructor(video, canvas) {
    this.width = canvas.width = video.videoWidth;
    this.height = canvas.height = video.videoHeight;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  draw(poses, edgeErrors=SAMPLE_EDGE_ERRORS) {
    const ctx = this.ctx;
    // Don't draw pos if context has not yet been set.
    if (!ctx) return;
    // Draw your poses on the canvas (example: connecting body parts with lines).
    ctx.clearRect(0, 0, this.width, this.height);
    for (const pose of poses) {
      this.drawPos(pose, edgeErrors);
    }
  }

  drawPos(pose, edgeErrors) {
    edgeErrors = edgeErrors || SAMPLE_EDGE_ERRORS;
    const radius = 3;
    const keypoints = pose.keypoints;
    const ctx = this.ctx;
    // Draw connecting lines
    for (let i = 0; i < EDGES.length; i++) {
      const p1 = keypoints[EDGES[i][0]];
      const p2 = keypoints[EDGES[i][1]];
      const error = edgeErrors[i];
      if (p1.score >= MIN_SCORE && p2.score >= MIN_SCORE) {
        const [color, width] = this.styleFromError(error);
        this.line(ctx, p1, p2, color, width);
      }
    }
    // Draw joint circles
    for (var point of keypoints) {
      if (point.score >= MIN_SCORE) {
        this.circle(ctx, point, radius, "white", "white", 2);
      }
    }
  }

  /**
   * Draws a line between two points.
   * @param {RenderingContext} ctx 
   * @param {Point} p1 
   * @param {Point} p2 
   * @param {string} color 
   * @param {number} width 
   */
  line(ctx, p1, p2, color="red", width=3) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  /**
   * Get the color and width for a line based on the error.
   * @param {number} error 
   * @returns [color (string), width (number)]
   */
  styleFromError(error) {
    if(error < 0.8){
      return ["white", 1];
    } else if (error < 1.8){
      return ["pink", 2];
    } else {
      return ["red", 3];
    }
  }

  /**
   * Draws a circle at a point.
   * @param {RenderingContext} ctx 
   * @param {Point} p 
   * @param {number} radius 
   * @param {string} color 
   * @param {number} width 
   */
  circle(ctx, p, radius=3, stroke="red", fill="green", width=3) {
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, PI2);
    ctx.fill();
    ctx.stroke();
  }
}