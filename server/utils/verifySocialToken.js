// apple auth
const verifyAppleToken = require("verify-apple-id-token").default;

const appleTokenVerifier = await verifyAppleToken({
  idToken: "yourIdToken",
  clientId: "yourAppleClientId",
  nonce: "nonce", // optional
});

// google auth
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
async function googleTokenVerifier() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return payload;
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);

module.exports = { appleTokenVerifier, googleTokenVerifier };
