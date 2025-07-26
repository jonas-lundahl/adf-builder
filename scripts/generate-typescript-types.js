import { typeName } from "./variable-name.js";

export function generateTypes(schema = {}, name = "Root") {
  return `export type ${typeName(name)} = ${parseNode(schema)};`;
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
    `unknown`
  );
}

function parseObject(schema = {}) {
  if (schema.type !== "object") return "";

  const entries = Object.entries(schema.properties || {}).map(
    ([key, value]) => {
      const isRequired = (schema.required || []).includes(key);
      return `${key}${isRequired ? "" : "?"}: ${parseNode(value)};`;
    },
  );

  const additionalProps = schema.additionalProperties
    ? `[key: string]: unknown;`
    : "";

  return `{ ${entries.join(" ")} ${additionalProps} }`;
}

function parseArray(schema = {}) {
  if (schema.type !== "array") return "";
  return `(${parseNode(schema.items)})[]`;
}

function parseBoolean(schema = {}) {
  return schema.type === "boolean" ? "boolean" : "";
}

function parseNumber(schema = {}) {
  return schema.type === "number" ? "number" : "";
}

function parseString(schema = {}) {
  return schema.type === "string" ? "string" : "";
}

function parseEnum(schema = {}) {
  if (!Array.isArray(schema.enum)) return "";
  return schema.enum.map((v) => JSON.stringify(v)).join("|");
}

function parseAnyOf(schema = {}) {
  if (!Array.isArray(schema.anyOf)) return "";
  return schema.anyOf.map(parseNode).join("|");
}

function parseAllOf(schema = {}) {
  if (!Array.isArray(schema.allOf)) return "";
  return schema.allOf.map(parseNode).join("&");
}

function parseRef(schema = {}) {
  if (!schema.$ref) return "";
  return typeName(schema.$ref.replace("#/definitions/", ""));
}

function parseTuple(schema = []) {
  if (!Array.isArray(schema)) return "";
  return `[${schema.map(parseNode).join(", ")}]`;
}
