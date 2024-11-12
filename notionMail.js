const readlineSync = require("readline-sync");
const { sendMail } = require("./functions/sendMail");
const { readMail } = require("./functions/readMail");
/**
 * Main function that runs the NotionMail application.
 * Prompts the user to send or read messages and calls the appropriate functions.
 */
async function main() {
    console.log("Welcome to NotionMail!");
    let action = "";
    // Prompt the user to select an action
    while (action !== "quit") {
        action = readlineSync
            .question("Select an action (send/read/quit): ")
            .trim()
            .toLowerCase();

        if (action === "send") {
            // Prompt for sender, recipient, and message content
            const sender = readlineSync.question("Sender: ");
            const recipient = readlineSync.question("Recipient: ");
            const message = readlineSync.question("Message: ");
            // Send the message
            await sendMail(sender, recipient, message);
        } else if (action === "read") {
            // Prompt for the user whose messages should be read
            const user = readlineSync.question("User: ");
            // Read messages for the specified user
            await readMail(user);
        } else if (action !== "quit") {
            console.log("Invalid action. Please choose 'send', 'read', or 'quit'.");
        }
        console.log(action)
    }
}

main();