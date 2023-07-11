const axios = require("axios");

async function createImageBufferFromLink(url) {
  try {
    console.log("--------url------",url)
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating image buffer:", error);
    throw error;
  }
}

module.exports = {
  createImageBufferFromLink,
};
