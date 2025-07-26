# ADF Builder

Build and validate Atlassian documents using Zod schemas.

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

if (result.success) {
  console.log("Document is valid!");
} else {
  console.error("Invalid document:", result.error);
}
```
