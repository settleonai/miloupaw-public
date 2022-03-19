const path = require("path");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
// const ejs = require("ejs");
const { htmlToText } = require("html-to-text");
const { DateTime } = require("luxon");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// tutorial at:
// https://app.sendgrid.com/guide/integrate/langs/nodejs/

exports.sendMail = async (
  templateName,
  to,
  tags,
  personalizedSubject,
  subject
) => {
  try {
    const year = DateTime.now().year;
    const date = DateTime.now().toFormat("cccc, LLL dd");
    const toBlock = to.map((receptor) => ({
      to: {
        email: receptor[0],
        name: receptor[1],
      },
      substitutions: { ...tags, year, date },
      subject: personalizedSubject || subject,
    }));
    const body = await msgMaker(templateName, toBlock, subject);
    await sgMail.send(body);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

const msgMaker = async (templateName, toBlock, subject) => {
  try {
    const templatePath = path.join(
      __dirname,
      `../email/templates/${templateName}.html`
    );
    const template = fs.readFileSync(templatePath, "utf-8");
    const text = htmlToText(template);

    const msg = {
      personalizations: toBlock,
      from: {
        email: "support@miloupaw.com",
        name: "MILOUPAW",
      },
      reply_to: {
        email: "support@miloupaw.com",
        name: "MILOUPAW",
      },
      content: [
        {
          type: "text/plain",
          value: text,
        },
        {
          type: "text/html",
          value: template,
        },
      ],
    };
    if (subject) msg.subject = subject;
    return msg;
  } catch (e) {}
};
