import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(_: any, res: any ) {
  try {
    const response = await notion.databases.query({
      database_id: "4d9d91d1fde54f67af7eaecce0fef166",
    });
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}