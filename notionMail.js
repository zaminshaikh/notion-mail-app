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
  let isRunning = true;

  // Authentication loop
  while (isRunning) {
    while (!isAuthenticated) {
      const choice = readlineSync
        .question("Do you want to (login/signup/exit): ")
        .trim()
        .toLowerCase();

      if (choice === "signup") {
        const name = readlineSync.question("Enter your name: ");
        const email = readlineSync.question("Enter your email: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true,
        });
        const confirmPassword = readlineSync.question(
          "Confirm your password: ",
          { hideEchoBack: true }
        );

        if (password !== confirmPassword) {
          console.log("Passwords do not match. Please try again.");
          continue;
        }

        // Optional password validation can be added here

        await signUp(email, name, password);
        console.log("Sign-up successful! You can now log in.");
      } else if (choice === "login") {
        const email = readlineSync.question("Enter your email: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true,
        });

        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          isAuthenticated = true;
          userEmail = email;
          console.log(`Welcome back, ${email}!`);
        } else {
          console.log("Invalid email or password. Please try again.");
        }
      } else if (choice === "exit") {
        console.log("Exiting the application. Goodbye!");
        isRunning = false;
        break;
      } else {
        console.log("Invalid option. Please choose 'login', 'signup', or 'exit'.");
      }
    }

    if (!isRunning) break;

    // Main application loop
    while (isAuthenticated && isRunning) {
      const action = readlineSync
        .question("Select an action (send/read/logout/exit): ")
        .trim()
        .toLowerCase();

      if (action === "send") {
        const recipient = readlineSync.question("Recipient Email: ");
        const message = readlineSync.question("Message: ");
        await sendMail(userEmail, recipient, message);
      } else if (action === "read") {
        await readMail(userEmail);
      } else if (action === "logout") {
        isAuthenticated = false;
        userEmail = "";
        console.log("Logged out successfully.");
      } else if (action === "exit") {
        console.log("Exiting the application. Goodbye!");
        isRunning = false;
        break;
      } else {
        console.log("Invalid action. Please choose 'send', 'read', 'logout', or 'exit'.");
      }
    }
  }
}

notionMail();