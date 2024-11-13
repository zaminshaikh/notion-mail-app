import { notion, mailDatabaseId } from "../config.js";

/**
 * Sends a message by creating a new page in the Notion database.
 *
 * @param {string} sender - The email address of the sender.
 * @param {string} recipient - The email address of the recipient.
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

export { sendMail };