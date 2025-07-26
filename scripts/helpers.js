export function parseSchema(schema = {}, name = "Root") {
  if (!schema) {
    return "";
  }

  if (schema.type === "object") {
    const properties = Object.entries(schema.properties)
      .map(([field, def]) => {
        const isRequired = schema.required?.includes(field);
        return `${field}: z.unknown()${isRequired ? `,` : `.optional(),`}`;
      })
      .join(" ");
    return `const ${name} = z.object({${properties}});`;
  }

  return `const ${name} = z.unknown();`;
}
