export function schemaName(name) {
  return `${pascalCase(name)}Schema`;
}

export function typeName(name) {
  return `${pascalCase(name)}Type`;
}

function pascalCase(name) {
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
