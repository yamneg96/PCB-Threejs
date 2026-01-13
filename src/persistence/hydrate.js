import { createPads } from "../primitives/Pads";

export function hydrate(data, material) {
  const pads = data.components.filter(c =>
    c.type.startsWith("smd")
  );
  return createPads(pads, material);
}
// export function dehydrate(objects) {
//   const components = objects.map(obj => ({
//     type: obj.userData.type,
//     position: obj.position.toArray(),
//     rotation: obj.rotation.toArray()
//   }));
//   return { components };
// }