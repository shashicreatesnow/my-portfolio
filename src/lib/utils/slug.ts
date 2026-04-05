export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function makeUniqueSlug(base: string, existing: string[]) {
  if (!existing.includes(base)) {
    return base;
  }

  let counter = 2;
  let candidate = `${base}-${counter}`;

  while (existing.includes(candidate)) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  return candidate;
}
