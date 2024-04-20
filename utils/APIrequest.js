import axios from 'axios'

import {LANDMARK_API_URL} from "react-native-dotenv"

async function recognizeLandmark(image64) {
    
    const apiUrl = LANDMARK_API_URL

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
        try {
          if (landmark.landmarkAnnotations.length !==0)
            return landmark.landmarkAnnotations.map((potentialLandmark) => potentialLandmark.description)

        }
        catch {
          return []
        }
      //   console.log("(Potential Matches End")
      //   console.log("")
      // }
      // else {
      //   console.log("")
      //   console.log("no matched landmarks")
      //   console.log("")
      // }
      
    } catch (error) {
      console.log(error,'===============error');
      console.error("Error:", error);
    }
  }

  export default recognizeLandmark
