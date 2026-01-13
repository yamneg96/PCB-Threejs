export function serialize(board, components) {
  return JSON.stringify({ board, components }, null, 2);
}
