export function getSlug(id: string) {
  return id.replace(/^(th|en)\//, "").replace(/\.md$/, "");
}
