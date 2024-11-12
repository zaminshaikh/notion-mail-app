require("dotenv").config();
const { Client } = require("@notionhq/client");
const readlineSync = require("readline-sync");

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function main() {
  console.log("Welcome to NotionMail!");
  const action = readlineSync.question("Select an action (send/read): ").trim().toLowerCase();

  if (action === "send") {
    const sender = readlineSync.question("Sender: ");
    const recipient = readlineSync.question("Recipient: ");
    const message = readlineSync.question("Message: ");
    // TODO: Send mail here
  } else if (action === "read") {
    const user = readlineSync.question("User: ");
    // TODO: Read mail here
  } else {
    console.log("Invalid action. Please choose 'send' or 'read'.");
  }
}

main();