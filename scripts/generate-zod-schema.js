import { schemaName, typeName } from "./variable-name.js";
import { blockComment } from "./comment.js";

export function parseSchema(name, definition, cyclic) {
  return [
    createComment(definition, name),
    `export const ${schemaName(name)}: z.ZodType<T.${typeName(name)}> = (`,
    parseNode(definition, cyclic),
    `)`,
  ].join("\n");
}

function parseNode(schema = {}, cyclic = false) {
  return (
    parseArray(schema) ||
    parseBoolean(schema) ||
    parseNumber(schema) ||
    parseString(schema) ||
    parseObject(schema, cyclic) ||
    parseRef(schema) ||
    parseAnyOf(schema) ||
    parseAllOf(schema) ||
    parseEnum(schema) ||
    parseTuple(schema) ||
    `z.unknown()`
  );
}

function parseObject(schema = {}, cyclic = false) {
  if (schema.type !== "object") {
    return "";
  }

  let str = "";
  if (Boolean(schema.additionalProperties)) {
    str += `z.object({`;
  } else {
    str += `z.strictObject({`;
  }

  str += Object.entries(schema.properties)
    .map(([field, def]) => {
      const isRequired = schema.required?.includes(field);
      const children = parseNode(def);

      if (children.includes("Schema") && cyclic) {
        return `get ${field}() {return ${children}${isRequired ? `;}` : `.optional();}`}`;
      } else {
        return `${field}:${children}${isRequired ? `,` : `.optional(),`}`;
      }
    })
    .join(" ");

  str += `})`;

  return str;
}

function parseArray(schema = {}) {
  if (schema.type !== "array") {
    return "";
  }

  let str = `z.array(${parseNode(schema.items)})`;

  if (schema.minItems) {
    str += `.min(${schema.minItems})`;
  }

  if (schema.maxItems) {
    str += `.max(${schema.maxItems})`;
  }

  return str;
}

function parseBoolean(schema = {}) {
  if (schema.type !== "boolean") {
    return "";
  }

  return `z.boolean()`;
}

function parseNumber(schema = {}) {
  if (schema.type !== "number") {
    return "";
  }

  let str = `z.number()`;

  if (schema.minimum) {
    str += `.min(${schema.minimum})`;
  }

  if (schema.maximum) {
    str += `.max(${schema.maximum})`;
  }

  return str;
}

function parseRef(schema = {}) {
  if (!schema.$ref) {
    return "";
  }

  return schemaName(schema.$ref.replace("#/definitions/", ""));
}

function parseAnyOf(schema = {}) {
  if (!schema.anyOf) {
    return "";
  }

  if (schema.anyOf.length === 1) {
    return parseNode(schema.anyOf[0]); // simplify if only one member
  }

  return `z.union([${schema.anyOf.map((node) => parseNode(node)).join(",")}])`;
}

function parseAllOf(schema = {}) {
  if (!schema.allOf) {
    return "";
  }

  if (schema.allOf.length === 1) {
    return parseNode(schema.allOf[0]); // simplify if only one member
  }

  return `z.intersection(${schema.allOf.map((node) => parseNode(node)).join(",")})`;
}

function parseEnum(schema = {}) {
  if (!schema.enum) {
    return "";
  }

  if (schema.enum.length === 1) {
    return `z.literal(${JSON.stringify(schema.enum[0])})`; // simplify if only one member
  }

  return `z.union([${schema.enum.map((element) => `z.literal(${JSON.stringify(element)})`).join(",")}])`;
}

function parseString(schema = {}) {
  if (schema.type !== "string") {
    return "";
  }

  let str = `z.string()`;

  if (schema.pattern) {
    str += `.regex(/${schema.pattern}/)`;
  }

  if (schema.minLength) {
    str += `.min(${schema.minLength})`;
  }

  if (schema.maxLength) {
    str += `.max(${schema.maxLength})`;
  }

  return str;
}

function parseTuple(schema = []) {
  if (!Array.isArray(schema)) {
    return "";
  }

  if (schema.length === 1) {
    return parseNode(schema[0]); // simplify if only one member
  }

  return `z.tuple([${schema.map((node) => parseNode(node)).join(",")}])`;
}

function createComment(schema = {}, name) {
  const lines = [
    `Definition: <code>${name}</code>`,
    ``,
    `<pre>`,
    JSON.stringify(schema, null, 2),
    `</pre>`,
    ``,
    `@see T.${typeName(name)}`,
  ];
  return blockComment(lines.join("\n"));
}
