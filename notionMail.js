require("dotenv").config();
const { Client } = require("@notionhq/client");
const readlineSync = require("readline-sync");

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function sendMail(sender, recipient, message) {
  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Message: {
          title: [{ text: { content: message } }]
        },
        Sender: { rich_text: [{ text: { content: sender } }] },
        Recipient: { rich_text: [{ text: { content: recipient } }] }
      }
    });
    console.log("Mail sent successfully!");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

async function main() {
  console.log("Welcome to NotionMail!");
  const action = readlineSync.question("Select an action (send/read): ").trim().toLowerCase();

  if (action === "send") {
    const sender = readlineSync.question("Sender: ");
    const recipient = readlineSync.question("Recipient: ");
    const message = readlineSync.question("Message: ");
    await sendMail(sender, recipient, message);
  } else if (action === "read") {
    const user = readlineSync.question("User: ");
    // TODO: Read mail here
  } else {
    console.log("Invalid action. Please choose 'send' or 'read'.");
  }
}

main();