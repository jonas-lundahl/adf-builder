import { schemaName } from "./variable-name.js";

export function parseSchema(schema = {}, name = "Root") {
  return `const ${schemaName(name)} = z.lazy( () => ${parseNode(schema)});`;
}

function parseNode(schema = {}) {
  return (
    parseArray(schema) ||
    parseBoolean(schema) ||
    parseNumber(schema) ||
    parseString(schema) ||
    parseObject(schema) ||
    parseRef(schema) ||
    parseAnyOf(schema) ||
    parseAllOf(schema) ||
    parseEnum(schema) ||
    parseTuple(schema) ||
    `z.unknown()`
  );
}

function parseObject(schema = {}) {
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
      return `${field}:${parseNode(def)}${isRequired ? `,` : `.optional(),`}`;
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

  return `z.union([${schema.anyOf.map((node) => parseNode(node)).join(",")}])`;
}

function parseAllOf(schema = {}) {
  if (!schema.allOf) {
    return "";
  }

  return `z.intersection(${schema.allOf.map((node) => parseNode(node)).join(",")})`;
}

function parseEnum(schema = {}) {
  if (!schema.enum) {
    return "";
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

  return `z.lazy(() => z.tuple([${schema.map((node) => parseNode(node)).join(",")}]))`;
}
