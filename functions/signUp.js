import { usersDatabaseId } from "../config";

/**
 * Handles user sign-up by collecting username and generating an email.
 */
async function signUp(email, name, password) {
    try {
        // Create a new page in the specified Notion database
        await notion.pages.create({
          parent: { database_id: usersDatabaseId },
          properties: {
            // Set the message content as the page title
            Email: {
              title: [{ text: { content: email } }],
            },
            // Add sender information
            Name: { rich_text: [{ text: { content: name } }] },
            // Add recipient information
            Password: { rich_text: [{ text: { content: password } }] },
          },
        });
        console.log("Signed up successfully!");
      } catch (error) {
        console.error("Error signing up:", error);
      }
}