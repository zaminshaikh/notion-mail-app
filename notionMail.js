require("dotenv").config();
const { Client } = require("@notionhq/client");
const readlineSync = require("readline-sync");

// Initialize Notion client with authentication token from environment variables
const notion = new Client({ auth: process.env.NOTION_KEY });

// Notion database ID where messages are stored
const mailDatabaseId = process.env.MAIL_DATABASE_ID;

/**
 * Sends a message by creating a new page in the Notion database.
 *
 * @param {string} sender - The name of the sender.
 * @param {string} recipient - The name of the recipient.
 * @param {string} message - The content of the message.
 */
async function sendMail(sender, recipient, message) {
  try {
    // Create a new page in the specified Notion database
    await notion.pages.create({
      parent: { database_id: mailDatabaseId },
      properties: {
        // Set the message content as the page title
        Message: {
          title: [{ text: { content: message } }],
        },
        // Add sender information
        Sender: { rich_text: [{ text: { content: sender } }] },
        // Add recipient information
        Recipient: { rich_text: [{ text: { content: recipient } }] },
      },
    });
    console.log("Mail sent successfully!");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

/**
 * Reads messages addressed to the specified user from the Notion database.
 *
 * @param {string} user - The name of the user to read messages for.
 */
async function readMail(user) {
  try {
    // Query the database for messages where the Recipient property matches the user
    const response = await notion.databases.query({
      database_id: mailDatabaseId,
      filter: {
        property: "Recipient",
        rich_text: { equals: user },
      },
    });

    // Check if any messages were found
    if (response.results.length === 0) {
      console.log("No messages found.");
      return;
    }

    console.log(`Messages (${response.results.length}):`);

    // Loop through each message and display the sender and content
    response.results.forEach((page) => {
      // Extract sender information
      const sender =
        page.properties.Sender.rich_text[0]?.text.content || "Unknown";
      // Extract message content
      const message =
        page.properties.Message.title[0]?.text.content || "No content";
      console.log(`From: ${sender}\nMessage: ${message}\n`);
    });
  } catch (error) {
    console.error("Error reading mail:", error);
  }
}

/**
 * Main function that runs the NotionMail application.
 * Prompts the user to send or read messages and calls the appropriate functions.
 */
async function main() {
    console.log("Welcome to NotionMail!");
    let action = "";
    // Prompt the user to select an action
    while (action !== "quit") {
        action = readlineSync
            .question("Select an action (send/read/quit): ")
            .trim()
            .toLowerCase();

        if (action === "send") {
            // Prompt for sender, recipient, and message content
            const sender = readlineSync.question("Sender: ");
            const recipient = readlineSync.question("Recipient: ");
            const message = readlineSync.question("Message: ");
            // Send the message
            await sendMail(sender, recipient, message);
        } else if (action === "read") {
            // Prompt for the user whose messages should be read
            const user = readlineSync.question("User: ");
            // Read messages for the specified user
            await readMail(user);
        } else if (action !== "quit") {
            console.log("Invalid action. Please choose 'send', 'read', or 'quit'.");
        }
        console.log(action)
    }
}

main();