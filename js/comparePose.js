function comparePoses(currentPoses, referencePoses) {
    // Check if there are no poses detected
    if (currentPoses.length === 0 || referencePoses.length === 0) {
      return "No Poses Detected"; // No similarity when no poses are detected
    }
  
    // // Assuming that both currentPoses and referencePoses contain normalized keypoints data
    const currentPose = currentPoses[0]; // Assuming a single pose
    const referencePose = referencePoses[0]; // Assuming a single reference pose
  
    // Calculate a similarity score based on the angles at corresponding joints
    let similarityScore = calculatePoseSimilarity(currentPose.keypoints, referencePose.keypoints);
  
    return similarityScore;
  }
  
  function calculatePoseSimilarity(currentKeypoints, referenceKeypoints) {

    // console.log(currentKeypoints);
    // console.log(referenceKeypoints);
    let dataCurrKeyPoints = [];
    let sumCurrProb = 0;
    let dataRefKeyPoints = [];
    let sumRefProb = 0;

    for (let keyPoint of currentKeypoints){
        let data = l2Normalize(keyPoint);
        dataCurrKeyPoints.push(data[0]);
        dataCurrKeyPoints.push(data[1]);
    }
    for (let keyPoint of currentKeypoints){
        dataCurrKeyPoints.push(keyPoint.score);
        sumCurrProb += keyPoint.score;
    }
    dataCurrKeyPoints.push(sumCurrProb);

    for (let keyPoint of referenceKeypoints){
        let data = l2Normalize(keyPoint);
        dataRefKeyPoints.push(data[0]);
        dataRefKeyPoints.push(data[1]);
    }
    for (let keyPoint of referenceKeypoints){
        dataRefKeyPoints.push(keyPoint.score);
        sumRefProb += keyPoint.score;
    }
    dataRefKeyPoints.push(sumRefProb);

    let similarityScore =  weightedDistanceMatching(dataCurrKeyPoints, dataRefKeyPoints);

    return similarityScore;

 
    // // Implement a function to calculate the similarity score based on keypoints
    // // You'll need to compare corresponding joint angles and compute a similarity score
  
    // // For example, you could calculate the mean absolute difference between joint angles
    // // and normalize it to a value between 0 and 1 (1 indicating perfect similarity)
  
    // // Specify the joint indices you want to measure angles for (e.g., shoulder, elbow, and wrist)
    // const jointIndices = [[5, 7, 9], [6, 8, 10], [5, 11, 13], [6, 12, 14], [12, 14, 16], [11, 13, 15], [14, 12, 11], [13, 11, 12], [11, 5, 7], [12, 6, 8]];

    // const numKeypoints = Math.min(currentKeypoints.length, referenceKeypoints.length);
    // let totalAngleDifference = 0;
    // let count = 0;  //counts the number of jointIndices it will calculate

    // let currentAngle = 0;
    // let referenceAngle = 0;


    // for (const jointIndex of jointIndices) {
    //     let currentProb = currentKeypoints[jointIndex[0]].score >= MIN_SCORE && currentKeypoints[jointIndex[1]].score >= MIN_SCORE && currentKeypoints[jointIndex[2]].score >= MIN_SCORE;
    //     let referenceProb = referenceKeypoints[jointIndex[0]].score >= MIN_SCORE && referenceKeypoints[jointIndex[1]].score >= MIN_SCORE && referenceKeypoints[jointIndex[2]].score >= MIN_SCORE;
    //     if (currentProb == 1 && referenceProb == 1){
    //         currentAngle = calculateAngle(currentKeypoints, jointIndex[0], jointIndex[1], jointIndex[2]);
    //         referenceAngle = calculateAngle(referenceKeypoints, jointIndex[0], jointIndex[1], jointIndex[2]);
    //         count++;
    //     }
    //     totalAngleDifference += Math.abs(currentAngle - referenceAngle);
    // }
  
    // // Normalize the total difference to a range between 0 and 1
    // const maxPossibleAngleDifference = 180;
    // const maxPossibleDifference = count * maxPossibleAngleDifference; // Define max possible difference
    // // console.log("TotalAngleDiff: " + totalAngleDifference);
    // // console.log("maxPoss: " + maxPossibleDifference);
    // // console.log("Divide: " + (totalAngleDifference / maxPossibleDifference));
    // let similarityScore = 0;
    // if (maxPossibleDifference != 0) {
    //     similarityScore = 1 - (totalAngleDifference / maxPossibleDifference);
    // }
    // //console.log("Print: " + similarityScore);
  
    // return similarityScore;
  }

//   function calculateAngle(keypoints, index1, index2, index3) {
//     // Get the positions of the three keypoints
//     // console.log(keypoints);
//     const joint1 = keypoints[index1];
//     const joint2 = keypoints[index2];
//     const joint3 = keypoints[index3];
  
//     // Calculate vectors between the keypoints
//     const vector1 = [joint1.x - joint2.x, joint1.y - joint2.y];
//     const vector2 = [joint3.x - joint2.x, joint3.y - joint2.y];
  
//     // Calculate the dot product of the two vectors
//     const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
  
//     // Calculate the magnitudes of the vectors
//     const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
//     const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);
  
//     // Calculate the cosine of the angle between the vectors
//     const cosine = dotProduct / (magnitude1 * magnitude2);
  
//     // Calculate the angle in radians and then convert it to degrees
//     const angleInRadians = Math.acos(cosine);
//     const angleInDegrees = (angleInRadians * 180) / Math.PI;

//     //console.log(angleInDegrees);
  
//     return angleInDegrees;
//   }

  function l2Normalize(vector) {
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return [vector.x / length, vector.y / length];
  }
  
  function weightedDistanceMatching(poseVector1, poseVector2) {
    let vector1PoseXY = poseVector1.slice(0, 34);
    let vector1Confidences = poseVector1.slice(34, 51);
    let vector1ConfidenceSum = poseVector1.slice(51, 52);
  
    let vector2PoseXY = poseVector2.slice(0, 34);
  
    // First summation
    let summation1 = 1 / vector1ConfidenceSum;
  
    // Second summation
    let summation2 = 0;
    for (let i = 0; i < vector1PoseXY.length; i++) {
      let tempConf = Math.floor(i / 2);
      let tempSum = vector1Confidences[tempConf] * Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
      summation2 = summation2 + tempSum;
    }

    // console.log(summation1 * summation2);
    return summation1 * summation2;
  }