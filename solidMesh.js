
function extrudeShellsToSolids(m, pid, shells, Lz, dz) {
  const solids = [];

  // Determine the number of layers based on the given extrusion length and layer thickness.
  let numLayers = Math.round(Lz / dz);

  // Adjust dz to ensure total extrusion length is respected.
  dz = Lz / numLayers;

  // Create a list of the current layer's shell nodes. Initially, this will be the same as the input shells.
  let currentLayerShells = shells.map(shell => {
      return {
          n1: shell.n1,
          n2: shell.n2,
          n3: shell.n3,
          n4: shell.n4
      };
  });

  for (let layer = 0; layer < numLayers; layer++) {
      const extrudedNodeIdMap = {};

      // Create new nodes in the Z direction for the current layer
      for (let shell of currentLayerShells) {
          for (let nid of [shell.n1, shell.n2, shell.n3, shell.n4]) {
              if (!extrudedNodeIdMap[nid]) {
                  const originalNode = Node.GetFromID(m, nid);
                  const newNode = new Node(m, Node.NextFreeLabel(m), originalNode.x, originalNode.y, originalNode.z + dz);
                  extrudedNodeIdMap[nid] = newNode.nid;
              }
          }
      }

      // Create solids using the current layer's and new (extruded) nodes
      for (let i = 0; i < currentLayerShells.length; i++) {
          const shell = currentLayerShells[i];
          const n1 = shell.n1;
          const n2 = shell.n2;
          const n3 = shell.n3;
          const n4 = shell.n4;

          const n5 = extrudedNodeIdMap[n1];
          const n6 = extrudedNodeIdMap[n2];
          const n7 = extrudedNodeIdMap[n3];
          const n8 = extrudedNodeIdMap[n4];

          const solid = new Solid(m, Solid.NextFreeLabel(m), pid, n1, n2, n3, n4, n5, n6, n7, n8);
          solids.push(solid);

          // Update the currentLayerShells for the next iteration.
          currentLayerShells[i] = {
              n1: n5,
              n2: n6,
              n3: n7,
              n4: n8
          };
      }
  }

  return solids;
}