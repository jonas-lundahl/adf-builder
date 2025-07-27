function extractRefs(schema) {
  const refs = new Set();

  function walk(node) {
    if (node && typeof node === "object") {
      if (node.$ref) {
        refs.add(node.$ref.replace("#/definitions/", ""));
      }

      for (const key in node) {
        walk(node[key]);
      }
    }
  }

  walk(schema);
  return refs;
}

export function sortSchemas(definitions) {
  const graph = new Map();

  for (const [name, schema] of Object.entries(definitions)) {
    graph.set(name, extractRefs(schema));
  }

  const visited = new Set();
  const result = [];
  const cycles = new Set();

  function visit(name, stack = new Set()) {
    if (visited.has(name)) {
      return;
    }
    if (stack.has(name)) {
      console.error("Cyclic dependency detected for " + name);
      cycles.add(name);
      return;
    }

    stack.add(name);
    for (const dep of graph.get(name) || []) {
      visit(dep, stack);
    }
    stack.delete(name);

    visited.add(name);
    result.push(name);
  }

  for (const name of Object.keys(definitions)) {
    visit(name);
  }

  return result.map((name) => ({
    name,
    definition: definitions[name],
    cyclic: cycles.has(name),
  }));
}
