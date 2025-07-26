export function parseSchema(schema = {}, name = "Root") {
  if (!schema) {
    return "";
  }

  if (schema.type === "object") {
    return `const ${name} = z.object({${parseObject(schema)}});`;
  }

  return `const ${name} = z.unknown();`;
}

function parseObject(schema = {}, name) {
  if (!schema) {
    return "";
  }
  return Object.entries(schema.properties)
    .map(([field, def]) => {
      const isRequired = schema.required?.includes(field);
      return `${field}: z.unknown()${isRequired ? `,` : `.optional(),`}`;
    })
    .join(" ");
}
