import { createPads } from "../primitives/Pads";

export function hydrate(data, material) {
  const pads = data.components.filter(c =>
    c.type.startsWith("smd")
  );
  return createPads(pads, material);
}
