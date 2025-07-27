# ADF Builder

Build and validate Atlassian documents using Zod schemas.

## Schemas

Schemas are generated using the JSON schema [provided by Atlassian](https://go.atlassian.com/adf-json-schema), version 50.0.1.

## Installation

```bash
npm install @jonas-lundahl/adf-builder
```

## Usage

```ts
import { DocNodeSchema, type DocNodeType } from "@jonas-lundahl/adf-builder";

const adfDocument: DocNodeType = {
  type: "doc",
  content: [],
  version: 1,
};

const parseResult = DocNodeSchema.safeParse(adfDocument);

if (parseResult.success) {
  console.log("Document is valid!");
} else {
  console.error("Invalid document:", parseResult.error);
}
```
