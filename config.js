require("dotenv").config();
const { Client } = require("@notionhq/client");

export const notion = new Client({ auth: process.env.NOTION_KEY });
export const mailDatabaseId = process.env.MAIL_DATABASE_ID;
export const usersDatabaseId = process.env.USER_DATABASE_ID;