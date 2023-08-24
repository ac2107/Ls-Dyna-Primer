/**
 * Create one way null shell elements spanning two rows (lists) of nodes
 * @param {Model} m Model
 * @param {Number} pid Part id
 * @param {Array} narray1 [n1, n2] start and end nodes of first list
 * @param {Array} narray2 [n1, n2] start and end nodes of second list
 * @param {Boolean} reverse boolean to control if the shell normal should be reversed or not
 */
function oneWayBlastFace(m, pid, narray1, narray2, reverse){

	// >>> these are sorted list of nodes
	var nlist1 = getNodesBetweenTwoNodes(m, narray1[0], narray1[1]);
	var nlist2 = getNodesBetweenTwoNodes(m, narray2[0], narray2[1]);

	// >>> 
	if (nlist1.length == nlist2.length){
	
		// Message(nlist1);
		// Message(nlist2);

		//>> loop list nlist1 to create shell elements
		for (var i=0; i<nlist1.length-1; i++){
			var sh = new Shell(m, Shell.NextFreeLabel(m), pid, 
									nlist1[i], nlist1[i+1], nlist2[i+1], nlist2[i]
			);
			// Message(['shell ->', nlist1[i], nlist1[i+1], nlist2[i+1], nlist2[i]]);

			// > reverse the direction of the shell elements
			if(reverse) sh.ReverseNormal();

		}
	} else { ErrorMessage('... length of first list is NOT equal to the second list')
			// Message(nlist1);
			// Message(nlist2);
		}
}

/**
 * Create a mesh of shells between 2 lines of nodes
 * @param {Model} m Model
 * @param {Number} pid Part id
 * @param {Number} n1 start node of line 1
 * @param {Number} n2 end node of  line 1
 * @param {Number} n3 start node of line 2
 * @param {Number} n4 end node of line 2
 * @param {Number} num number of equally spaced shells between line 1 and 2; if = -1, use the existing nodes between n1-n3 and n2-n4
 * @param {Boolean} reverse boolean to control if the shell normal should be reversed or not
 * @param {Flag} flag only use flagged nodes, flag = 0 if use all nodes
 */
function meshRuledFlagged(m, pid, n1, n2, n3, n4, num, reverse, flag){

	// >>> these are sorted list of nodes
	if (flag == 0){
		var nlist1 = getNodesBetweenTwoNodes(m, n1, n2);
		var nlist2 = getNodesBetweenTwoNodes(m, n3, n4);
		var nlist3 = getNodesBetweenTwoNodes(m, n1, n3);
		var nlist4 = getNodesBetweenTwoNodes(m, n2, n4);
	} else {
		var nlist1 = getNodesBetweenTwoNodesFlagged(m, n1, n2, flag);
		var nlist2 = getNodesBetweenTwoNodesFlagged(m, n3, n4, flag);
		var nlist3 = getNodesBetweenTwoNodesFlagged(m, n1, n3, flag);
		var nlist4 = getNodesBetweenTwoNodesFlagged(m, n2, n4, flag);
	}
	
	var len1 = nlist1.length;
	var len2 = nlist2.length;
	var len3 = nlist3.length;
	var len4 = nlist4.length

	// >>> create shell elements
	if (nlist1.length == nlist2.length && num > 0){
		
		// Create equally spaced shell elements between line1(n1-n2) and line2(n3-n4

		// Message(nlist1);
		// Message(nlist2);

		// Create 2d array of nodes for shell mesh
		var nodeArray = []

		// Create in-between nodes between each pair of nodes in line1(n1-n2) and line2(n3-n4)
		for (var i=0; i<len1; i++){

			var newNodes = createNodesBetween(m, nlist1[i], nlist2[i], num-1);

			nodeArray.push(newNodes)
		}
		
		// Create shell mesh from nodeArray
		for (var i=0; i<nodeArray.length-1; i++){
			
			// Message(nodeArray[i])

			for (var j=0; j<num; j++){

				// Message(' ');
				// Message([nodeArray[i+1][j]])

				var sh = new Shell(m, Shell.NextFreeLabel(m), pid, 
								   nodeArray[i][j], nodeArray[i][j+1], nodeArray[i+1][j+1], nodeArray[i+1][j]
				);
			}
		}

	} else if(nlist1.length == nlist2.length && num == -1) {

		// Search for nodes between n1-n3 and n2-n4 and create shell elements using the nodes between n1-n3 and n2-n4

		// Create 2d array of nodes for shell mesh
		var nodeArray = []

		// Create in-between nodes between each pair of nodes in line1(n1-n2) and line2(n3-n4), exlcuing the starting and ending pair
		for (var i=1; i<len1-1; i++){

			var newNodes = createNodesBetween(m, nlist1[i], nlist2[i], len3-2);

			nodeArray.push(newNodes)
		}
		
		// Update nodeArray for nodes between n1-n3 and n2-n4
		nodeArray.unshift(nlist3);
		nodeArray.push(nlist4);

		// Create shell mesh from nodeArray
		for (var i=0; i<nodeArray.length-1; i++){
			
			// Message(nodeArray[i])

			for (var j=0; j<len3-1; j++){

				// Message(' ');
				// Message([nodeArray[i+1][j]])

				var sh = new Shell(m, Shell.NextFreeLabel(m), pid, 
								   nodeArray[i][j], nodeArray[i][j+1], nodeArray[i+1][j+1], nodeArray[i+1][j]
				);
			}
		}

	} else { ErrorMessage('... list length not equal OR num < -1')
			Message(nlist1);
			Message(nlist2);
		}

	// Message(nlist1);
	// Message(nlist2);

	return nodeArray
}

/**
 * Generates a quad mesh for a rectangular 2D surface.
 *
 * @param {Model} m - Model
 * @param {number} Lx - Dimension of the rectangle in the x-direction (in meters).
 * @param {number} Ly - Dimension of the rectangle in the y-direction (in meters).
 * @param {number} size_x - Element size in the x-direction (in meters).
 * @param {number} size_y - Element size in the y-direction (in meters).
 * @param {number} x0 - x-coordinate of the bottom-left corner of the rectangle (in meters).
 * @param {number} y0 - y-coordinate of the bottom-left corner of the rectangle (in meters).
 * @param {number} pid - Part ID for shell elements (default value is 1).

 * @example
 * // Example usage:
 * var Lx = 1.0;
 * var Ly = 2.0;
 * var size_x = 0.2;
 * var size_y = 0.2;
 * var x0 = 0.0;
 * var y0 = 0.0;
 * var pid = 1;
 * var ID_node = 1;
 * var ID_shell = 1;
 *
 * var result = quadMeshRectangle(Lx, Ly, size_x, size_y, x0, y0, pid, ID_node, ID_shell);
 * console.log(result.nodes); // Array of nodes
 * console.log(result.shells); // Array of shells
 */
function quadMeshRectangle(m, pid, Lx, Ly, size_x, size_y, x0 = 0, y0 = 0) {
	// Calculate num_x and num_y based on Lx and Ly
	var num_x = Math.ceil(Lx / size_x);
	var num_y = Math.ceil(Ly / size_y);

	// Adjust size_x and size_y to ensure Lx and Ly are strictly respected
	size_x = Lx / num_x;
	size_y = Ly / num_y;

	var ID_node = Node.NextFreeLabel(m);

	var ID_part = pid;
	var ID_node_next = Node.NextFreeLabel(m);
	var ID_shell_next = Shell.NextFreeLabel(m);
    
	// Create nodes
	var nodes = [];
  
	for (var iy = 0; iy < num_y + 1; iy++) {
	  for (var ix = 0; ix < num_x + 1; ix++) {
		var x = x0 + ix * size_x;
		var y = y0 + iy * size_y;
		var z = 0.0;
		var node = new Node(m, ID_node_next, x, y, z); // Assuming you have a Node constructor
		nodes.push(node);
		ID_node_next++;
	  }
	}
  
	// Create shells
	var shells = [];
  
	for (var iy = 0; iy < num_y; iy++) {
	  for (var ix = 0; ix < num_x; ix++) {
		var ix1 = ID_node + ix + (num_x + 1) * iy;
		var ix2 = ix1 + 1;
		var ix3 = ix2 + num_x + 1;
		var ix4 = ix3 - 1;
		var shell = new Shell(m, ID_shell_next, ID_part, ix1, ix2, ix3, ix4); // Assuming you have a Shell constructor
		shells.push(shell);
		ID_shell_next++;
	  }
	}
  
	return { nodes, shells };
  }

/**
 * Create a circle meshed with quad elements in XY plane
 * @param {Model} m Model
 * @param {Number} pid Part id 
 * @param {Number} R Circle radius [m] 
 * @param {Number} cx Circle centre x coordiante
 * @param {Number} cy Circle centre y coordiante
 * @param {Number} esize Nominal element size 
 */
function quadMeshCircle(m, pid, R, cx, cy, esize){

	const z = 0;
	const fR = 0.35;

	var num = Math.ceil(fR*R/esize);

	let node1 = new Node(m, Node.NextFreeLabel(m), 0, 0, z);
	let node2 = new Node(m, Node.NextFreeLabel(m), fR*R, fR*R, z);
	let node3 = new Node(m, Node.NextFreeLabel(m), fR*R, 0, z);
	let node4 = new Node(m, Node.NextFreeLabel(m), fR*R, -fR*R, z);
	let node5 = new Node(m, Node.NextFreeLabel(m), 0, -fR*R, z);
	let node6 = new Node(m, Node.NextFreeLabel(m), -fR*R, -fR*R, z);
	let node7 = new Node(m, Node.NextFreeLabel(m), -fR*R, 0, z);
	let node8 = new Node(m, Node.NextFreeLabel(m), -fR*R, fR*R, z);
	let node9 = new Node(m, Node.NextFreeLabel(m), 0, fR*R, z);

	let node10 = new Node(m, Node.NextFreeLabel(m), 0, R, z);
	let node11 = new Node(m, Node.NextFreeLabel(m), Math.sqrt(R*R/2.0), Math.sqrt(R*R/2.0), z);
	let node12 = new Node(m, Node.NextFreeLabel(m), R, 0, z);
	let node13 = new Node(m, Node.NextFreeLabel(m), Math.sqrt(R*R/2.0), -Math.sqrt(R*R/2.0), z);
	let node14 = new Node(m, Node.NextFreeLabel(m), 0, -R, z);
	let node15 = new Node(m, Node.NextFreeLabel(m), -Math.sqrt(R*R/2.0), -Math.sqrt(R*R/2.0), z);
	let node16 = new Node(m, Node.NextFreeLabel(m), -R, 0, z);
	let node17 = new Node(m, Node.NextFreeLabel(m), -Math.sqrt(R*R/2.0), Math.sqrt(R*R/2.0), z);

	let node_list = [node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12,
	node13, node14, node15, node16, node17];

	_meshRectangle(node1, node3, node2, node9, num, num);
	_meshRectangle(node7, node1, node9, node8, num, num);
	_meshRectangle(node5, node4, node3, node1, num, num);
	_meshRectangle(node6, node5, node1, node7, num, num);

	// let nodes_arc1 = _computeNodes(node11, node10, R, num-1);
	// let nodes_arc2 = _computeNodes(node12, node11, R, num-1);
	// let nodes_arc3 = _computeNodes(node13, node12, R, num-1);
	// let nodes_arc4 = _computeNodes(node14, node13, R, num-1);
	// let nodes_arc5 = _computeNodes(node15, node14, R, num-1);
	// let nodes_arc6 = _computeNodes(node16, node15, R, num-1);
	// let nodes_arc7 = _computeNodes(node17, node16, R, num-1);
	// let nodes_arc8 = _computeNodes(node10, node17, R, num-1);

	let flag_merge = AllocateFlag();
	let _p = Part.GetFromID(m, pid);
	_p.SetFlag(flag_merge);
	m.PropagateFlag(flag_merge);
	for (var node of node_list) node.SetFlag(flag_merge);
	m.MergeNodes(flag_merge, 1e-5);
	ReturnFlag(flag_merge);
	
	let edge_line1 = getNodesBetweenTwoNodesPart(m, node2.nid, node9.nid, pid);
	// let edge_line2 = getNodesBetweenTwoNodes(m, node3.nid, node2.nid);
	// let edge_line3 = getNodesBetweenTwoNodes(m, node4.nid, node3.nid);
	// let edge_line4 = getNodesBetweenTwoNodes(m, node5.nid, node4.nid);
	// let edge_line5 = getNodesBetweenTwoNodes(m, node6.nid, node5.nid);
	// let edge_line6 = getNodesBetweenTwoNodes(m, node7.nid, node6.nid);
	// let edge_line7 = getNodesBetweenTwoNodes(m, node8.nid, node7.nid);
	// let edge_line8 = getNodesBetweenTwoNodes(m, node9.nid, node8.nid);
	
	Message(edge_line1);

	// _generateCurvedShellMesh(nodes_arc1, edge_line1, num);
	// _generateCurvedShellMesh(nodes_arc2, edge_line2, num);
	// _generateCurvedShellMesh(nodes_arc3, edge_line3, num);
	// _generateCurvedShellMesh(nodes_arc4, edge_line4, num);
	// _generateCurvedShellMesh(nodes_arc5, edge_line5, num);
	// _generateCurvedShellMesh(nodes_arc6, edge_line6, num);
	// _generateCurvedShellMesh(nodes_arc7, edge_line7, num);
	// _generateCurvedShellMesh(nodes_arc8, edge_line8, num);





	function _meshRectangle(node1, node2, node3, node4, numX, numY) {

		let shells = [];
		let nodes = [];

		// Calculate the increment in x and y direction based on the number of divisions
		let deltaX = (node2.x - node1.x) / numX;
		let deltaY = (node3.y - node2.y) / numY;

		// Generate nodes for each subdivision
		for (let i = 0; i <= numY; i++) {
			for (let j = 0; j <= numX; j++) {
				nodes.push(new Node(m, Node.NextFreeLabel(m), node1.x + j * deltaX, node1.y + i * deltaY, 0));
			}
		}

		// Define shell elements using nodes of each subdivision
		for (let i = 0; i < numY; i++) {
			for (let j = 0; j < numX; j++) {
				
				let n1 = nodes[i * (numX + 1) + j];
				let n2 = nodes[i * (numX + 1) + j + 1];
				let n3 = nodes[(i + 1) * (numX + 1) + j + 1];
				let n4 = nodes[(i + 1) * (numX + 1) + j];

				shells.push(new Shell(m, Shell.NextFreeLabel(m), 999, n1.nid, n2.nid, n3.nid, n4.nid));
			}
		}

	    return shells;
	}


	function _computeNodes(nodeA, nodeB, R, N) {

		const theta = Math.acos((nodeA.x * nodeB.x + nodeA.y * nodeB.y) / (R * R));
		const deltaTheta = theta / (N + 1);
	
		const alpha = Math.atan2(nodeA.y, nodeA.x);  // Starting angle of node A
	
		const nodes= [];
	
		for (let i = 1; i <= N; i++) {
			const x = R * Math.cos(alpha + i * deltaTheta);
			const y = R * Math.sin(alpha + i * deltaTheta);
			let newNode = new Node(m, Node.NextFreeLabel(m), x, y, 0);
			nodes.push(newNode.nid);
		}
	
		// Prepend nodeA and append nodeB
		nodes.unshift(nodeA.nid);
		nodes.push(nodeB.nid);
		


		return nodes;
	}

	function _generateMeshNodes(nodeA, nodeB, M) {
		const interpolatedNodes = [];
	
		for (let i = 1; i <= M; i++) {
			const t = i / (M + 1);
			const x = nodeA.x + t * (nodeB.x - nodeA.x);
			const y = nodeA.y + t * (nodeB.y - nodeA.y);
			
			interpolatedNodes.push(new Node(m, Node.NextFreeLabel(m), x, y, z));
		}
	
		return interpolatedNodes;
	}

	function _generateCurvedShellMesh(list1, list2, M) {
		const shells = [];

		const allNodes = [];
	
		// Generate nodes for all node pairs
		for (let i = 0; i < list1.length; i++) {
			const nodesBetween = _generateMeshNodes(Node.GetFromID(m, list1[i]), Node.GetFromID(m, list2[i]), M);
			allNodes.push([list1[i]].concat(nodesBetween.map(n => n.nid)).concat([list2[i]]));
		}
	
		// Generate shell elements
		for (let i = 0; i < list1.length - 1; i++) {
			for (let j = 0; j < allNodes[i].length - 1; j++) {
				const nid1 = allNodes[i+1][j];
				const nid2 = allNodes[i+1][j+1];
				const nid3 = allNodes[i][j+1];
				const nid4 = allNodes[i][j];
				
				shells.push(new Shell(m, Shell.NextFreeLabel(m), pid, nid1, nid2, nid3, nid4));
			}
		}
	
		return shells;
	}

	return 0
  }


