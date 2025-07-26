import { writeFile } from "fs/promises";
import { parseSchema } from "./parser.js";
import prettier from "prettier";

const SCHEMA_URL = "https://go.atlassian.com/adf-json-schema";

const schema = await fetch(SCHEMA_URL)
  .then((res) => res.json())
  .catch(console.error);

await writeFile("./__generated__/schema.json", JSON.stringify(schema, null, 2));

const generate = Object.entries(schema.definitions)
  .map(([name, def]) => parseSchema(def, name))
  .join("\n\n\n\n");

const ts = `import {z} from 'zod';\n\n` + generate;

const prettyTs = await prettier.format(ts, { parser: "typescript" });

await writeFile("./__generated__/schema.ts", prettyTs);
