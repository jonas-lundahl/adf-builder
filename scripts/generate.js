import { writeFile } from "fs/promises";
import { parseSchema } from "./generate-zod-schema.js";
import prettier from "prettier";
import { generateTypes } from "./generate-typescript-types.js";

const SCHEMA_URL = "https://go.atlassian.com/adf-json-schema";

const schema = await fetch(SCHEMA_URL)
  .then((res) => res.json())
  .catch(console.error);

await writeFile("./__generated__/schema.json", JSON.stringify(schema, null, 2));

// Zod Schema

const parsedSchemas = Object.entries(schema.definitions)
  .map(([name, def]) => parseSchema(def, name))
  .join("\n\n\n\n");

const parsedSchemasWithImports = `import {z} from 'zod';\n\n` + parsedSchemas;

const prettyParsedSchemasWithImports = await prettier.format(
  parsedSchemasWithImports,
  { parser: "typescript" },
);

await writeFile("./__generated__/schema.ts", prettyParsedSchemasWithImports);

// TypeScript types

const parsedTypes = Object.entries(schema.definitions)
  .map(([name, def]) => generateTypes(def, name))
  .join("\n\n\n\n");

const prettyParsedTypes = await prettier.format(parsedTypes, {
  parser: "typescript",
});

await writeFile("./__generated__/types.ts", prettyParsedTypes);
