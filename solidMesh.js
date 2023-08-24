/**
 * Extrudes a quad meshed rectangular surface in the z-direction to create multiple layers of 8-noded solid elements.
 *
 * @param {Object} m - The model object where the nodes and solids will be created.
 * @param {Array} nodes - An array of nodes representing the quad mesh.
 * @param {Array} shells - An array of shell elements representing the quad mesh.
 * @param {number} pid_solid - Part ID for the solid elements.
 * @param {number} size_z - Element size for extrusion of each layer in the z-direction (in meters).
 * @param {number} Lz - Total length of the extrusion (in meters).
 *
 * @example
 * // Example usage:
 * var m = ...; // Create a model object using the appropriate function
 * var nodes = ...; // An array of nodes from the quad meshed rectangle
 * var shells = ...; // An array of shell elements from the quad meshed rectangle
 * var pid_solid = 2; // Part ID for the solid elements
 * var size_z = 0.05; // Element size for extrusion of each layer in the z-direction (in meters)
 * var Lz = 0.3; // Total length of the extrusion (in meters)
 *
 * var extrudedLayers = extrudeQuadMeshRectangle(m, nodes, shells, thickness, pid_solid, size_z, Lz);
 */
function extrudeQuadMeshRectangle (m, nodes, shells, pid_solid, size_z, Lz) {
  // Calculate the number of layers based on Lz and size_z
  var num_layers = Math.ceil(Lz / size_z);

  // Calculate the actual size_z to ensure uniform elements
  size_z = Lz / num_layers;

  // Create an array to store the extruded nodes and solids for each layer
  var extrudedLayers = [];

  // Loop through each layer and extrude the mesh
  for (var layer = 0; layer < num_layers; layer++) {
    // Calculate the z-coordinate for the current layer
    var zLayer = layer * size_z;

    // Create nodes for the current layer
    var nodesExtruded = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var x = node.x;
      var y = node.y;
      var z = node.z + zLayer + Math.min(size_z, Lz - zLayer);
      var nodeExtruded = new Node(m, Node.NextFreeLabel(m), x, y, z); // Assuming you have a Node constructor
      nodesExtruded.push(nodeExtruded);
    }

    // Create 8-noded solid elements for the current layer
    var solids = [];
    for (var i = 0; i < shells.length; i++) {
      var shell = shells[i];
      var ix1 = shell.n1 + layer * nodes.length;
      var ix2 = shell.n2 + layer * nodes.length;
      var ix3 = shell.n3 + layer * nodes.length;
      var ix4 = shell.n4 + layer * nodes.length;
      var ix5 = ix1 + nodes.length;
      var ix6 = ix2 + nodes.length;
      var ix7 = ix3 + nodes.length;
      var ix8 = ix4 + nodes.length;

      var solid = new Solid(m, Solid.NextFreeLabel(m), pid_solid, ix1, ix2, ix3, ix4, ix5, ix6, ix7, ix8); // Assuming you have a Solid constructor
      solids.push(solid);
    }

    // Save the extruded nodes and solids for this layer
    extrudedLayers.push({ nodesExtruded, solids });
  }

  return extrudedLayers;
}


// function extrudeShellsToSolids(m, pid, shells, zOffset) {
//   const solids = [];

//   // This map keeps track of the extruded versions of nodes.
//   const extrudedNodeIdMap = {};

//   // Create new nodes in the Z direction, if not already extruded
//   for (let shell of shells) {
//       for (let nid of [shell.n1, shell.n2, shell.n3, shell.n4]) {
//           if (!extrudedNodeIdMap[nid]) {
//               const originalNode = Node.GetFromID(m, nid);
//               const newNode = new Node(m, Node.NextFreeLabel(m), originalNode.x, originalNode.y, originalNode.z + zOffset);
//               extrudedNodeIdMap[nid] = newNode.nid;
//           }
//       }
//   }

//   // Create solids using original and new (extruded) nodes
//   for (let shell of shells) {
//       const n1 = shell.n1;
//       const n2 = shell.n2;
//       const n3 = shell.n3;
//       const n4 = shell.n4;
      
//       const n5 = extrudedNodeIdMap[n1];
//       const n6 = extrudedNodeIdMap[n2];
//       const n7 = extrudedNodeIdMap[n3];
//       const n8 = extrudedNodeIdMap[n4];

//       const solid = new Solid(m, Solid.NextFreeLabel(m), pid, n1, n2, n3, n4, n5, n6, n7, n8);
//       solids.push(solid);
//   }

//   return solids;
// }

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