import readlineSync from "readline-sync";
import { sendMail } from "./functions/sendMail.js";
import { readMail } from "./functions/readMail.js";
import { signUp } from "./functions/signUp.js";
import { login } from "./functions/login.js";

/**
 * Main function that runs the NotionMail application.
 * Handles user authentication and provides options to send or read mail.
 */
async function notionMail() {
  console.log("Welcome to NotionMail!");

  let isAuthenticated = false; // Tracks if the user is authenticated
  let userEmail = ""; // Stores the authenticated user's email
  let isRunning = true; // Controls the main application loop

  // Main application loop
  while (isRunning) {
    // Authentication loop: runs until the user is authenticated or exits
    while (!isAuthenticated) {
      // Prompt user for authentication choice
      const choice = readlineSync
        .question("Do you want to (login/signup/exit): ")
        .trim()
        .toLowerCase();

      if (choice === "signup") {
        // Handle user sign-up
        const name = readlineSync.question("Enter your name: ");
        const email = readlineSync.question("Enter your email: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true, // Hides password input
        });
        const confirmPassword = readlineSync.question(
          "Confirm your password: ",
          { hideEchoBack: true }
        );

        // Check if passwords match
        if (password !== confirmPassword) {
          console.log("Passwords do not match. Please try again.");
          continue; // Restart the authentication loop
        }

        // Call the signUp function to register the user
        await signUp(email, name, password);
        console.log("Sign-up successful! You can now log in.");
      } else if (choice === "login") {
        // Handle user login
        const email = readlineSync.question("Enter your email: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true, // Hides password input
        });

        // Call the login function to authenticate the user
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          isAuthenticated = true; // Update authentication status
          userEmail = email; // Store the authenticated user's email
          console.log(`Welcome back, ${email}!`);
        } else {
          console.log("Invalid email or password. Please try again.");
        }
      } else if (choice === "exit") {
        // Handle application exit
        console.log("Exiting the application. Goodbye!");
        isRunning = false; // Update running status to terminate loops
        break; // Exit the authentication loop
      } else {
        // Handle invalid authentication choices
        console.log("Invalid option. Please choose 'login', 'signup', or 'exit'.");
      }
    }

    if (!isRunning) break; // Exit the main application loop if not running

    // Main menu loop: available after successful authentication
    while (isAuthenticated && isRunning) {
      // Prompt user for action choice
      const action = readlineSync
        .question("Select an action (send/read/logout/exit): ")
        .trim()
        .toLowerCase();

      if (action === "send") {
        // Handle sending a message
        const recipient = readlineSync.question("Recipient Email: ");
        const message = readlineSync.question("Message: ");
        await sendMail(userEmail, recipient, message); // Call sendMail function
      } else if (action === "read") {
        // Handle reading messages
        await readMail(userEmail); // Call readMail function
      } else if (action === "logout") {
        // Handle user logout
        isAuthenticated = false; // Update authentication status
        userEmail = ""; // Clear the stored user email
        console.log("Logged out successfully.");
      } else if (action === "exit") {
        // Handle application exit from the main menu
        console.log("Exiting the application. Goodbye!");
        isRunning = false; // Update running status to terminate loops
        break; // Exit the main menu loop
      } else {
        // Handle invalid action choices
        console.log("Invalid action. Please choose 'send', 'read', 'logout', or 'exit'.");
      }
    }
  }
}

// Invoke the main function to start the application
notionMail();