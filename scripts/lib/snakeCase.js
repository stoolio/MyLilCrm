export default function snakeCase(str) {
  return str
    .replace(/[A-Z]/g, ' $1')
    .replace(/\s/g, '_')
    .toLowerCase();
}
