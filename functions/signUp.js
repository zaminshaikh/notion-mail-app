import { notion, usersDatabaseId } from "../config";
import crypto from "crypto";

/**
 * Handles user sign-up by collecting email, name, and password.
 */
async function signUp(email, name, password) {
  try {
    // Hash the password using SHA-256
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Create a new page in the specified Notion database
    await notion.pages.create({
      parent: { database_id: usersDatabaseId },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        Name: { rich_text: [{ text: { content: name } }] },
        Password: { rich_text: [{ text: { content: hashedPassword } }] },
      },
    });
    console.log("Signed up successfully!");
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

export { signUp };