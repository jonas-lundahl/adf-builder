export function parseSchema(schema = {}, name = "Root") {
  if (!schema) {
    return "";
  }

  if (schema.type === "object") {
    const properties = Object.entries(schema.properties)
      .map(([field, def]) => `${field}?: unknown;`)
      .join("\n");
    return `type ${name} = {${properties}};`;
  }

  return `type ${name} = unknown;`;
}
