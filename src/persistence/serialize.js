export function serializePCB(scene) {
  const pcbData = {
    board: { width: 100, height: 80, thickness: 1.6 }, // Default board spec [cite: 37]
    components: []
  };

  scene.traverse((obj) => {
    if (obj.userData.id) {
      pcbData.components.push({
        id: obj.userData.id,
        type: obj.userData.type,
        pos: obj.position.toArray(),
        size: obj.userData.size || [1, 1],
        layer: obj.userData.layer || "top"
      });
    }
  });

  return JSON.stringify(pcbData, null, 2);
}