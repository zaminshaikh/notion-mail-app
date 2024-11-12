// notionMail.js

import readlineSync from "readline-sync";
import { sendMail } from "./functions/sendMail.js";
import { readMail } from "./functions/readMail.js";
import { signUp } from "./functions/signUp.js";
import { login } from "./functions/login.js";

/**
 * Main function that runs the NotionMail application.
 * Handles authentication, then allows sending and reading mail.
 */
async function notionMail() {
  console.log("Welcome to NotionMail!");

  let isAuthenticated = false;
  let userEmail = "";

  // Authentication loop
  while (!isAuthenticated) {
    const choice = readlineSync.question("Do you want to (login/signup): ").trim().toLowerCase();

    if (choice === "signup") {
      const name = readlineSync.question("Enter your name: ");
      const email = readlineSync.question("Enter your email: ");
      const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });
      const confirmPassword = readlineSync.question("Confirm your password: ", { hideEchoBack: true });

      if (password !== confirmPassword) {
        console.log("Passwords do not match. Please try again.");
        continue;
      }

      await signUp(email, name, password);
      console.log("Sign-up successful! You can now log in.");
    } else if (choice === "login") {
      const email = readlineSync.question("Enter your email: ");
      const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });

      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        isAuthenticated = true;
        userEmail = email;
        console.log(`Welcome back, ${email}!`);
      } else {
        console.log("Invalid email or password. Please try again.");
      }
    } else {
      console.log("Invalid option. Please choose 'login' or 'signup'.");
    }
  }

  // Main application loop
  let action = "";
  while (action !== "logout") {
    action = readlineSync.question("Select an action (send/read/logout): ").trim().toLowerCase();

    if (action === "send") {
      const recipient = readlineSync.question("Recipient Email: ");
      const message = readlineSync.question("Message: ");
      await sendMail(userEmail, recipient, message);
    } else if (action === "read") {
      await readMail(userEmail);
    } else if (action === "logout") {
      console.log("Logging out...");
    } else {
      console.log("Invalid action. Please choose 'send', 'read', or 'logout'.");
    }
  }

  console.log("Goodbye!");
}

notionMail();