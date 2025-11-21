export function validateId(raw) {
  const id = Number(raw);
  if (Number.isNaN(id) || id <= 0) return null;
  return id;
}
