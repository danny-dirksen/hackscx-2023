function comparePoses(currentPoses, referencePoses, MIN_SCORE) {
    // Check if there are no poses detected
    if (currentPoses.length === 0 || referencePoses.length === 0) {
      return "No Poses Detected"; // No similarity when no poses are detected
    }
  
    // // Assuming that both currentPoses and referencePoses contain normalized keypoints data
    const currentPose = currentPoses[0]; // Assuming a single pose
    const referencePose = referencePoses[0]; // Assuming a single reference pose
  
    // Calculate a similarity score based on the angles at corresponding joints
    const similarityScore = calculatePoseSimilarity(currentPose.keypoints, referencePose.keypoints);
  
    return similarityScore;
  }
  
  function calculatePoseSimilarity(currentKeypoints, referenceKeypoints) {
 
    // Implement a function to calculate the similarity score based on keypoints
    // You'll need to compare corresponding joint angles and compute a similarity score
  
    // For example, you could calculate the mean absolute difference between joint angles
    // and normalize it to a value between 0 and 1 (1 indicating perfect similarity)
  
    // Specify the joint indices you want to measure angles for (e.g., shoulder, elbow, and wrist)
    const jointIndices = [[5, 7, 9], [6, 8, 10], [5, 11, 13], [6, 12, 14], [12, 14, 16], [11, 13, 15], [14, 12, 11], [13, 11, 12], [11, 5, 7], [12, 6, 8]];

    const numKeypoints = Math.min(currentKeypoints.length, referenceKeypoints.length);
    let totalAngleDifference = 0;
    let count = 0;  //counts the number of jointIndices it will calculate

    for (const jointIndex of jointIndices) {
        let currentProb = currentKeypoints[jointIndex[0]].score >= MIN_SCORE && currentKeypoints[jointIndex[1]].score >= MIN_SCORE && currentKeypoints[jointIndex[2]].score >= MIN_SCORE;
        let referenceProb = referenceKeypoints[jointIndex[0]].score >= MIN_SCORE && referenceKeypoints[jointIndex[1]].score >= MIN_SCORE && referenceKeypoints[jointIndex[2]].score >= MIN_SCORE;
        const currentAngle = 0;
        const referenceAngle = 0;
        if (currentProb == 1 && referenceProb == 1){
            const currentAngle = calculateAngle(currentKeypoints, jointIndex[0], jointIndex[1], jointIndex[2]);
            const referenceAngle = calculateAngle(referenceKeypoints, jointIndex[0], jointIndex[1], jointIndex[2]);
            count++;
        }
        totalAngleDifference += Math.abs(currentAngle - referenceAngle);
    }
  
    // Normalize the total difference to a range between 0 and 1
    const maxPossibleAngleDifference = 180;
    const maxPossibleDifference = count * maxPossibleAngleDifference; // Define max possible difference
    // console.log("TotalAngleDiff: " + totalAngleDifference);
    // console.log("maxPoss: " + maxPossibleDifference);
    // console.log("Divide: " + (totalAngleDifference / maxPossibleDifference))
    const similarityScore = 0;
    if (maxPossibleDifference != 0) {
        const similarityScore = 1 - (totalAngleDifference / maxPossibleDifference);
    }
    // console.log("Print: " + similarityScore);
  
    return similarityScore;
  }

  function calculateAngle(keypoints, index1, index2, index3) {
    // Get the positions of the three keypoints
    // console.log(keypoints);
    const joint1 = keypoints[index1];
    const joint2 = keypoints[index2];
    const joint3 = keypoints[index3];
  
    // Calculate vectors between the keypoints
    const vector1 = [joint1.x - joint2.x, joint1.y - joint2.y];
    const vector2 = [joint3.x - joint2.x, joint3.y - joint2.y];
  
    // Calculate the dot product of the two vectors
    const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
  
    // Calculate the magnitudes of the vectors
    const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
    const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);
  
    // Calculate the cosine of the angle between the vectors
    const cosine = dotProduct / (magnitude1 * magnitude2);
  
    // Calculate the angle in radians and then convert it to degrees
    const angleInRadians = Math.acos(cosine);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    //console.log(angleInDegrees);
  
    return angleInDegrees;
  }
  