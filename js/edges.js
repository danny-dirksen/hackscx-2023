const EDGES = [
  // [0, 1], // nose to left eye
  // [0, 2], // nose to right eye
  // [1, 3], // left eye to left ear
  // [2, 4], // right eye to right ear
  [5, 6], // left shoulder to right shoulder
  [5, 7], // left shoulder to left elbow
  [6, 8], // right shoulder to right elbow
  [7, 9], // left elbow to left wrist
  [8, 10], // right elbow to right wrist
  [5, 11], // left shoulder to left hip
  [6, 12], // right shoulder to right hip
  [11, 12], // left hip and right hip
  [11, 13], // left hip to left knee
  [12, 14], // right hip to right knee
  [13, 15], // left knee to left ankle
  [14, 16], // right knee to right ankle
];
const MIN_SCORE = 0.3;