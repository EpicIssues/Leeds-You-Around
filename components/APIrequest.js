import axios from 'axios'
// const fs = require("fs/promises");

// fs.readFile("./eiffel64.txt", "utf-8").then((image64) => {
  async function recognizeLandmark(image64) {
    const apiKey = "AIzaSyAkQ-hRmHMICwik4Br4j9cgeJIz2xanR3g";
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestData = {
      requests: [
        {
          image: {
            content: image64,
          },
          features: [
            {
                  type: "LANDMARK_DETECTION",
                //   maxResults: 1
            },
          ],
        },
      ],
    };
    try {
      const response = await axios.post(apiUrl, requestData);
      const landmark = response.data.responses[0];

      // << List of Potential Landmarks >>
      // if (landmark.landmarkAnnotations) {
      //   console.log("")
      //   console.log("(Potential Matches Start:)")
      //   landmark.landmarkAnnotations.forEach((potentialLandmark) => {
      //     console.log(potentialLandmark.description)
      //   })
      //   console.log("(Potential Matches End")
      //   console.log("")
      // }
      // else {
      //   console.log("")
      //   console.log("no matched landmarks")
      //   console.log("")
      // }

      return landmark
    } catch (error) {
      console.error("Error:", error);
    }
  }

  export default recognizeLandmark
