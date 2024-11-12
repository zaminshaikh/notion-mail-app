const { notion, mailDatabaseId } = require("../config");

/**
 * Reads messages addressed to the specified user from the Notion database.
 *
 * @param {string} user - The name of the user to read messages for.
 */
export async function readMail(user) {
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

  export { readMail };