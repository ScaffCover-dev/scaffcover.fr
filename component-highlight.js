// Material-only highlights: source materials and geometry remain untouched.
export function createComponentHighlight() {
  const active = new Map();
  const list = material => Array.isArray(material) ? material : [material];
  function restore(mesh, entry) {
    list(mesh.material).forEach(material => material.dispose());
    mesh.material = entry.original;
    active.delete(mesh);
  }
  function set(selected, hovered) {
    const desired = new Map();
    for (const [item, state] of [[hovered, 'hover'], [selected, 'selected']]) {
      item?.objects.forEach(object => object.traverse(mesh => {
        if (mesh.isMesh) desired.set(mesh, state);
      }));
    }
    for (const [mesh, entry] of active) {
      if (!desired.has(mesh)) restore(mesh, entry);
    }
    for (const [mesh, state] of desired) {
      let entry = active.get(mesh);
      if (!entry) {
        entry = { original: mesh.material, state };
        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map(material => material.clone()) : mesh.material.clone();
        active.set(mesh, entry);
      }
      entry.state = state;
    }
  }
  function tick(time, reducedMotion = false) {
    const wave = reducedMotion ? 0.5 : (1 - Math.cos(time * Math.PI * 2 / 1000)) / 2;
    for (const [mesh, entry] of active) {
      list(mesh.material).forEach((material, index) => {
        const original = list(entry.original)[index];
        // Colour the surface itself so pale panels do not wash the highlight out.
        if (material.color) material.color.set(0xbe001b);
        if (material.emissive) {
          material.emissive.set(0xff001a);
          material.emissiveIntensity = 0.18 + 0.16 * wave;
        }

      });
    }
  }
  return { set, tick, clear: () => set(null, null), get size() { return active.size; } };
}
