const axios = require("axios");
const md5 = require("md5");

async function getAvatar(email) {
  try {
    const hashedEmail = md5(email.trim().toLowerCase());
    const endpoint = "https://www.gravatar.com/" + hashedEmail + ".json";
    const response = await axios.get(endpoint);

    console.log("getAvatar || response", response);

    return response.data.entry[0].thumbnailUrl || "";
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = getAvatar;
