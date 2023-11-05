/**
 * Compares currentPoses with referencePoses and returns error metrics.
 * @param {Array} currentPoses List of poses detected in the current frame.
 * @param {Array} referencePoses List of poses detected in the reference frame.
 * @returns {Array} [edge errors (Array of numbers), average error (number)]
 */
function calculateEdgeErrors(currentPoses, referencePoses) {
  // Check if there are no poses detected
  if (currentPoses.length === 0 || referencePoses.length === 0) {
    return [null, null]; // No similarity when no poses are detected
  }

  // Assuming that both currentPoses and referencePoses contain normalized keypoints data
  const currentPts = currentPoses[0].keypoints; // Assuming a single pose
  const referencePts = referencePoses[0].keypoints; // Assuming a single reference pose

  const edgeErrors = [];
  let totalError = 0;
  let numValidEdges = 0;

  // Calculate a similarity score based on the angles at corresponding joints
  // let edgeErrors = calculateEdgeError(currentPts, referencePts);
  for (let [i1, i2] of EDGES) {
    const cp1 = currentPts[i1];
    const cp2 = currentPts[i2];
    const rp1 = referencePts[i1];
    const rp2 = referencePts[i2];
    // Don't count edges where one or both points are too uncertain.
    if (!validpt(cp1) || !validpt(cp2) || !validpt(rp1) || !validpt(rp2)) continue;
    const error = calculateEdgeError(cp1, cp2, rp1, rp2);
    edgeErrors.push(error);
    totalError += error;
    numValidEdges++;
  }
  // No similarity when no valid edges are detected
  if (numValidEdges == 0) {
    return [null, null];
  }
  const avgError = totalError / numValidEdges;
  return [ edgeErrors, avgError ];
}

/**
 * Checks if point has high enough confidence to be considered valid
 * @param {*} pt 
 * @returns boolean indicating if point is valid
 */
function validpt(pt) {
  return pt.score >= MIN_SCORE;
}

/**
 * Given a pair of corresponding edges, calculate the error between the two angles.
 * @param {Point} cp1 Vertex 1 of current pose edge
 * @param {Point} cp2 Vertex 2 of current pose edge
 * @param {Point} rp1 Vertex 1 of reference pose edge
 * @param {Point} rp2 Vertex 2 of reference pose edge
 * @returns 
 */
function calculateEdgeError(cp1, cp2, rp1, rp2) {
  const cAngle = calculateAngle(cp1, cp2);
  const rAngle = calculateAngle(rp1, rp2);
  const diff = Math.abs(cAngle - rAngle);
  const diffWrappable = Math.PI - Math.abs(Math.abs(diff) - Math.PI);
  const error = diffWrappable
  return error;
}

/**
 * Given two points, calculate the angle of the vector between them.
 * @param {Point} p1 
 * @param {Point} p2 
 * @returns The angle in radians.
 */
function calculateAngle(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angle = Math.atan2(dy, dx);
  return angle;
}

// function calculateJointAngle(keypoints, index1, index2, index3) {
//   // Get the positions of the three keypoints
//   // console.log(keypoints);
//   const joint1 = keypoints[index1];
//   const joint2 = keypoints[index2];
//   const joint3 = keypoints[index3];

//   // Calculate vectors between the keypoints
//   const vector1 = [joint1.x - joint2.x, joint1.y - joint2.y];
//   const vector2 = [joint3.x - joint2.x, joint3.y - joint2.y];

//   // Calculate the dot product of the two vectors
//   const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];

//   // Calculate the magnitudes of the vectors
//   const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
//   const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);

//   // Calculate the cosine of the angle between the vectors
//   const cosine = dotProduct / (magnitude1 * magnitude2);

//   // Calculate the angle in radians and then convert it to degrees
//   const angleInRadians = Math.acos(cosine);
//   const angleInDegrees = (angleInRadians * 180) / Math.PI;
//   //console.log(angleInDegrees);

//   return angleInDegrees;
// }

//   function l2NormalizeCam(vector) {
//     var length = Math.sqrt((vector.x - camVideoTopLeftX) * (vector.x - camVideoTopLeftX) + (vector.y - camVideoTopLeftY) * (vector.y - camVideoTopLeftY));
//     return [(vector.x - camVideoTopLeftX) / length, (vector.y - camVideoTopLeftY) / length];
//   }

//   function l2NormalizeRef(vector) {
//     var length = Math.sqrt((vector.x - refVideoTopLeftX) * (vector.x - refVideoTopLeftX) + (vector.y - refVideoTopLeftY) * (vector.y - refVideoTopLeftY));
//     return [(vector.x) / length, (vector.y) / length];
//   }
  
//   function weightedDistanceMatching(poseVector1, poseVector2) {
//     let vector1PoseXY = poseVector1.slice(0, 34);
//     let vector1Confidences = poseVector1.slice(34, 51);
//     let vector1ConfidenceSum = poseVector1.slice(51, 52);
  
//     let vector2PoseXY = poseVector2.slice(0, 34);
  
//     // First summation
//     let summation1 = 1 / vector1ConfidenceSum;
  
//     // Second summation
//     let summation2 = 0;
//     for (let i = 0; i < vector1PoseXY.length; i++) {
//       let tempConf = Math.floor(i / 2);
//       let tempSum = vector1Confidences[tempConf] * Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
//       summation2 = summation2 + tempSum;
//     }
//     console.log("Top-left position of cam-video (x, y):", camVideoTopLeftX, camVideoTopLeftY);
//     console.log("Top-left position of ref-video (x, y):", refVideoTopLeftX, refVideoTopLeftY);

//     // console.log(summation1 * summation2);
//     return (summation1 * summation2);
//   }