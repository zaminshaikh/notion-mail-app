import { notion, mailDatabaseId } from "../config.js";

/**
 * Reads messages sent by the specified user from the Notion database.
 *
 * @param {string} userEmail - The email address of the user to read sent messages for.
 */
async function readSentMail(userEmail) {
  try {
    // Query the database for messages where the Sender property matches the user
    const response = await notion.databases.query({
      database_id: mailDatabaseId,
      filter: {
        property: "Sender",
        rich_text: { equals: userEmail },
      },
      sorts: [
        {
          property: "Time",
          direction: "descending",
        },
      ],
    });

    // Check if any sent messages were found
    if (response.results.length === 0) {
      console.log("No sent messages found.");
      return;
    }

    console.log(`Sent Messages (${response.results.length}):\n`);

    // Loop through each sent message and display the recipient, content, and timestamp
    response.results.forEach((page) => {
      // Extract recipient information
      const recipient =
        page.properties.Recipient.rich_text[0]?.text?.content || "Unknown";

      // Extract message content
      const message =
        page.properties.Message.title[0]?.text?.content || "No content";

      // Extract timestamp
      const time =
        new Date(page.properties.Time.created_time).toString() || "No timestamp";

      console.log(`To: ${recipient}\nMessage: ${message}\nSent At: ${time}\n`);
    });
  } catch (error) {
    console.error("Error reading sent mail:", error);
  }
}

export { readSentMail };