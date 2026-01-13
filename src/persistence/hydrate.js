import { createBoard } from "../engine/Board";
import { createPads } from "../primitives/Pads";
import { createTrace } from "../primitives/Traces";

export function hydratePCB(json, engine, material) {
  const data = typeof json === "string" ? JSON.parse(json) : json;

  // 1. Reconstruct Board
  const board = createBoard(data.board);
  engine.scene.add(board);

  // 2. Filter and Reconstruct Components
  const padsData = data.components.filter(c => c.type.includes("smd"));
  const tracesData = data.components.filter(c => c.type === "path");

  if (padsData.length > 0) {
    const pads = createPads(padsData, material);
    engine.scene.add(pads);
  }

  tracesData.forEach(t => {
    const trace = createTrace({ points: t.points, width: t.width }, material);
    engine.scene.add(trace);
  });
}