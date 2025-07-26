import { writeFile } from "fs/promises";

const SCHEMA_URL = "https://go.atlassian.com/adf-json-schema";

const schema = await fetch(SCHEMA_URL)
  .then((res) => res.json())
  .catch(console.error);

await writeFile("./__generated__/schema.json", JSON.stringify(schema, null, 2));
