const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendTextMessage = async (body, phoneNumber) => {
  try {
    const response = await client.messages.create({
      body: body,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: phoneNumber,
    });
    console.log("sendTextMessage | response:", response);
  } catch (error) {
    console.log("sendTextMessage|error", error);
  }
};
