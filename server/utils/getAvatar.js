async function getAvatar(email) {
  try {
    const hashedEmail = Hasher(email);
    const endpoint = "https://www.gravatar.com/" + hashedEmail + ".json";
    const result = await fetch(endpoint, {
      method: "get",
    });
    let data = await result.json();
    return data.entry[0].thumbnailUrl || "";
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = getAvatar;
