export function blockComment(comment = "") {
  if (!comment || typeof comment !== "string") {
    return "";
  }

  const lines = comment.split("\n");

  let str = "/**";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    str += `\n* ${line}`;
  }
  str += `\n*/`;

  return str;
}
