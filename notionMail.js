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


async function readMail(user) {
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Recipient",
          rich_text: { equals: user }
        }
      });
  
      if (response.results.length === 0) {
        console.log("No messages found.");
        return;
      }
  
      console.log(`Messages (${response.results.length}):`);
      response.results.forEach((page) => {
        const sender = page.properties.Sender.rich_text[0]?.text.content || "Unknown";
        const message = page.properties.Message.title[0]?.text.content || "No content";
        console.log(`From: ${sender}\nMessage: ${message}\n`);
      });
    } catch (error) {
      console.error("Error reading mail:", error);
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
    await readMail(user);
  } else {
    console.log("Invalid action. Please choose 'send' or 'read'.");
  }
}

main();