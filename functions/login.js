import { notion, usersDatabaseId } from "../config.js";
import crypto from "crypto";

/**
 * Handles user login by verifying email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} - Returns true if login is successful, false otherwise.
 */
async function login(email, password) {
  try {
    // Hash the provided password using SHA-256
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Query the users database for a matching email and password
    const response = await notion.databases.query({
      database_id: usersDatabaseId,
      filter: {
        and: [
          {
            property: "Email",
            title: {
              equals: email,
            },
          },
          {
            property: "Password",
            rich_text: {
              equals: hashedPassword,
            },
          },
        ],
      },
    });

    if (response.results.length > 0) {
      console.log("Login successful!");
      return true; // Login successful
    } else {
      console.log("Invalid email or password.");
      return false; // Login failed
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
}

export { login };