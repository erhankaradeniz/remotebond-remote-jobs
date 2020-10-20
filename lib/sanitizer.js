const entityMap = {
  "&quot;": "'",
  "&#39;": "'",
  '"': "'",
  "&rsquo;": "'",
  "&#x27;": "'",
}

export function sanitizeHtml(html) {
  return String(html)
    .replace(/&([^;]+);/gm, (key) => entityMap[key])
    .replace(/[&<>"\/]/g, (key) => entityMap[key])
}
