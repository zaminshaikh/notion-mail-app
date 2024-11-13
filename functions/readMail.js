import { notion, mailDatabaseId } from "../config.js";

/**
 * Reads messages addressed to the specified user from the Notion database.
 *
 * @param {string} userEmail - The email address of the user to read messages for.
 */
async function readMail(userEmail) {
  try {
    // Query the database for messages where the Recipient property matches the user
    const response = await notion.databases.query({
      database_id: mailDatabaseId,
      filter: {
        property: "Recipient",
        rich_text: { equals: userEmail },
      },
      sorts: [
        {
          property: "Time",
          direction: "descending",
        },
      ],
    });

    // Check if any messages were found
    if (response.results.length === 0) {
      console.log("No messages found.");
      return;
    }

    console.log(`Messages (${response.results.length}):\n`);

    // Loop through each message and display the sender, content, and timestamp
    response.results.forEach((page) => {
      // Extract sender information
      const sender =
        page.properties.Sender.rich_text[0]?.text?.content || "Unknown";
      // Extract message content
      const message =
        page.properties.Message.title[0]?.text?.content || "No content";
      // Extract timestamp
      const time =
        Date(page.properties.Time.created_time).toString()
          ?? "No timestamp";

      console.log(`From: ${sender}\nMessage: ${message}\nSent At: ${time}\n`);
    });
  } catch (error) {
    console.error("Error reading mail:", error);
  }
}

export { readMail };