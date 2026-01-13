export function serialize(boardConfig, components) {
  return JSON.stringify(
    { board: boardConfig, components },
    null,
    2
  );
}
// export function deserialize(data) {
//   const parsed = JSON.parse(data);
//   return {
//     boardConfig: parsed.board,
//     components: parsed.components
//   };
// }