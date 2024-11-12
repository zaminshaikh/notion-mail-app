import { notion, usersDatabaseId } from "../config.js";
import crypto from "crypto";

/**
 * Handles user sign-up by collecting email, name, and password.
 */
async function signUp(username, name, password) {
  try {
    // Hash the password using SHA-256
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    
    const email = username + "@notion.com";

    // Create a new page in the specified Notion database
    await notion.pages.create({
      parent: { database_id: usersDatabaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: {
            rich_text: [{ text: { content: email } }],
        },
        Password: { rich_text: [{ text: { content: hashedPassword } }] },
      },
    });
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

export { signUp };