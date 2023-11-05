function comparePoses(currentPoses, referencePoses) {
    // Check if there are no poses detected
    if (currentPoses.length === 0 || referencePoses.length === 0) {
      return "No Poses Detected"; // No similarity when no poses are detected
    }
  
    // // Assuming that both currentPoses and referencePoses contain normalized keypoints data
    // const currentPose = currentPoses[0]; // Assuming a single pose
    // const referencePose = referencePoses[0]; // Assuming a single reference pose
  
    // Calculate a similarity score based on the angles at corresponding joints
    const similarityScore = calculatePoseSimilarity(currentPose.keypoints, referencePose.keypoints);
  
    return similarityScore;
  }
  
  function calculatePoseSimilarity(currentKeypoints, referenceKeypoints) {
    // Implement a function to calculate the similarity score based on keypoints
    // You'll need to compare corresponding joint angles and compute a similarity score
  
    // For example, you could calculate the mean absolute difference between joint angles
    // and normalize it to a value between 0 and 1 (1 indicating perfect similarity)
  
    const numKeypoints = Math.min(currentKeypoints.length, referenceKeypoints.length);
    let totalDifference = 0;
  
    for (let i = 0; i < numKeypoints; i++) {
      // Calculate the absolute difference between joint angles (you may need to consider the type of normalization used)
      const angleDifference = Math.abs(currentKeypoints[i].angle - referenceKeypoints[i].angle);
      totalDifference += angleDifference;
    }
  
    // Normalize the total difference to a range between 0 and 1
    const maxPossibleDifference = numKeypoints * maxPossibleAngleDifference; // Define max possible difference
    const similarityScore = 1 - (totalDifference / maxPossibleDifference);
  
    return similarityScore;
  }