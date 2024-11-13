# NotionMail

NotionMail is a command-line application that simulates a basic email system using Notion as a database. Users can sign up, log in, send messages to other users, read messages addressed to them and read messages they sent. All data is stored and managed through the Notion API.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)
- [Future Improvements](#future-improvements)
- [Technical Choices](#technical-choices)

## Description

NotionMail allows users to create accounts, send messages to other users, and read received messages. It uses the Notion API to store user credentials and messages within Notion databases. The application handles user authentication, message creation, and retrieval.

## Installation

### Steps

> **Note:** This setup assumes that you have two Notion databases with API integrations linked.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/zaminshaikh/notion-mail-app.git

2. **Navigate to the Project Directory:**

    ```bash
    cd notion-mail-app

3. **Install Dependencies:**

    ```bash
    npm install

4. **Configure Environment Variables:**

    ### Configure Environment Variables

    1. **Create a `.env` File:**

        In the project root directory, create a file named `.env`.

    2. **Add the Following Variables:**

        ```env
        NOTION_API_KEY=your_notion_api_key
        USERS_DATABASE_ID=your_users_database_id
        MAIL_DATABASE_ID=your_mail_database_id
        ```

    3. **Save the `.env` File:**

        Ensure the file is saved to apply the environment variables.

    ## Usage

    ### Running the Application

    1. **Start the Application:**

        ```bash
        npm start
        ```

    2. **Sign Up:**

        Follow the prompts to create a new account.

    3. **Log In:**

        Enter your credentials to access your mailbox.

    4. **Send a Message:**

        Use the `send` command to compose and send a message to another user.

    5. **Read Messages:**

        Use the `read` command to view messages addressed to you.
    
    6. **Read Sent Messages:**

        Use the `read-sent` command to view messages you sent.

    ### Commands

    - `signup`: Create a new user account.
    - `login`: Log into your account.
    - `send`: Send a new message.
    - `read`: Read your received messages.
    - `read-sent`: Read your sent messages.
    - `exit`: Exit the application.

    ## References

    - [README.md Writing Tool](https://readme.so/)
    - [Notion API Documentation](https://developers.notion.com/docs/create-a-notion-integration#getting-started)
    - [Crypto SHA256 Documentation](https://nodejs.org/api/crypto.html)
    - [Notion Property Values](https://developers.notion.com/reference/property-value-object#title-property-values)
    - [Node.js](https://nodejs.org/)
    - [npm](https://www.npmjs.com/)

    ### Additional Improvements

    - **User Authentication:** Users must be authenticated to send messages and to read their own messages. A user may not access emails of another user
    - **Sent Message Section:** Users can view messages they sent to others.
    - **Timestamp for Messages:** Messages now include a timestamp indicating when they were sent. This is achieved by utilizing Notion's `created_time` property, which records the creation time of each page (message). This way we do not have to parse any time strings ourselves, it is taken care of by Notion's properties within the returned object.
    - **Exit Command:** An `exit` command has been added to allow users to terminate the application gracefully from any point in the interaction loop.

    ## Future Improvements

    - **Form Validation:** Ensure the recipient is a valid email address, and the user inputs a full name when signing up
    - **UX Enhancements:** If the user enters an incorrect password, it should prompt them for it again instead of returning them back to the login/signup loop. 
    - **Support for Attachments:** Allow the user to attach a file (max size to be determined) to their messages since Notion database supports file uploads
    - **Unread Messages:** Allow the user to read and filter messages by unread or not.
    - **Search Functionality:** Allow users to search through their messages.
    - **Replies:** Allow users to reply to messages

    ## Technical Choices

    - **JavaScript/Node.js:** Chosen because Notion's official SDK is in JavaScript. Since I was building around the API, I wanted to choose an language and framework that matched the API I was using. Always pick the best suited tool for the job
    - **Modulation:** Modulated functions into separate folder to enhance readability and help with debugging.
    - **SHA256 Hashing:** For security, no one should have access to the password literals. Using SHA256 hashing, we ensure the user's data is protected in the case of a data breach since hashing is a one way function.
