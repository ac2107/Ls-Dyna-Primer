//
// Any scripts do not belong to specific group
//


function Sphere3D(m, pid, charge_mass, loc){

	// parameter "loc" can be defined by below:
	// const charge_locations = {V5: [-115, -11, 23.5]};

	var charge_rad = Math.pow(3.0 * charge_mass / (4.0 * Math.PI * 1630.0), 1 / 3);
	mesh_sphere(m, pid, loc[0], loc[1], loc[2], charge_rad, 16);

	function mesh_sphere(m, shell_pid, cx, cy, cz, radius, ele) {
		Message("Meshing Sphere");
		PlayMacro(mac_dir + "sphere_001.prm", {
			variables: {
				PID: shell_pid,
				CEN_X: cx,
				CEN_Y: cy,
				CEN_Z: cz,
				RAD: radius,
				ELE: ele
			}
		});
	}
}


/**
 * Write coordinates for creating signle solid element from four nodes
 * @param {Model} m Model
 * @param {Array} node_list List of nodes 
 */
function writeTextFileSolidElement(m, node_list, name){
	var file_node_coords = new File(js_dir + "solid_"+ name +".txt", File.WRITE);
	

	if (node_list.length == 4) {

		var n1 = Node.GetFromID(m, node_list[0]);
		var n2 = Node.GetFromID(m, node_list[1]);
		var n3 = Node.GetFromID(m, node_list[2]);
		var n4 = Node.GetFromID(m, node_list[3]);
	
		file_node_coords.Writeln('[	[' + n1.x + ',' + n1.y + ',' + 'zCoords.LEVEL_0' + '], [' + n2.x + ',' + n2.y + ',' + 'zCoords.LEVEL_0' + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + 'zCoords.LEVEL_0' + '], [' + n4.x + ',' + n4.y + ',' + 'zCoords.LEVEL_0' + '],');
		file_node_coords.Writeln('  [' + n1.x + ',' + n1.y + ',' + 'zCoords.CONCORUSE' + '], [' + n2.x + ',' + n2.y + ',' + 'zCoords.CONCORUSE' + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + 'zCoords.CONCORUSE' + '], [' + n4.x + ',' + n4.y + ',' + 'zCoords.CONCORUSE' + '],');
		file_node_coords.Writeln('],')

	}

	else if (node_list.length == 8) {

		var n1 = Node.GetFromID(m, node_list[0]);
		var n2 = Node.GetFromID(m, node_list[1]);
		var n3 = Node.GetFromID(m, node_list[2]);
		var n4 = Node.GetFromID(m, node_list[3]);
		var n5 = Node.GetFromID(m, node_list[4]);
		var n6 = Node.GetFromID(m, node_list[5]);
		var n7 = Node.GetFromID(m, node_list[6]);
		var n8 = Node.GetFromID(m, node_list[7]);

		file_node_coords.Writeln('[	[' + n1.x + ',' + n1.y + ',' + n1.z + '], [' + n2.x + ',' + n2.y + ',' + n2.z + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + n3.z + '], [' + n4.x + ',' + n4.y + ',' + n4.z + '],');
		file_node_coords.Writeln('  [' + n5.x + ',' + n5.y + ',' + n5.z + '], [' + n6.x + ',' + n6.y + ',' + n6.z + '],');
		file_node_coords.Writeln('  [' + n7.x + ',' + n7.y + ',' + n7.z + '], [' + n8.x + ',' + n8.y + ',' + n8.z + '],');
		file_node_coords.Writeln('],')


	}

	file_node_coords.Close();
}

/**
 * Test if a node is a 3rd node of beam element
 * @param {Model} m Model 
 * @param {*} nd Node (Object) or Node id (Number)
 */
function isThirdNode(m, nd){
	// >>> boolean flag for 3rd node
	// >>> default is false, i.e. not 3rd node
	var bool = false;
	if (typeof nd == 'number') {
			var node = Node.GetFromID(m, nd)
	} else {var node = nd;}
	// Message(['3rd Node -> ' , node.nid, num]);
	// >>> get all xrefs of the node 
	var xrefs = node.Xrefs();
	
	// >>> get total number of beam elements connected to the node
	var num = xrefs.GetTotal('BEAM');

	// >>> loop through the beam elements to check if the node is a 3rd node, if true break the loop
	for (var i=0; i<num; i++){
		var bid = xrefs.GetItemID('BEAM', i);
		var beam = Beam.GetFromID(m, bid);
		if (beam.n3 == node.nid) {bool = true}
		// Message(['beam ->', bid, '3rd = ', beam.n3]);
	}
	return bool	
}

/**
 * Generates an array of nodes between two given nodes.
 *
 * @param {Model} m - Model 
 * @param {Number} startNodeID - The coordinates of the starting node [x, y, z].
 * @param {Number} endNodeID - The coordinates of the ending node [x, y, z].
 * @param {number} num - The number of nodes to generate in between the start and end nodes.
 * @returns {Array} - An array of node ids, starting with the startNode, followed by the in-between nodes sorted by distance, and ending with the endNode.
 */
function createNodesBetween(m, startNodeID, endNodeID, num) {
	
	var startNode = Node.GetFromID(m, startNodeID);
	var endNode = Node.GetFromID(m, endNodeID);

	// Calculate the distance between startNode and endNode
	const distance = Math.sqrt(
	  Math.pow(endNode.x - startNode.x, 2) +
	  Math.pow(endNode.y - startNode.y, 2) +
	  Math.pow(endNode.z - startNode.z, 2)
	);
  
	// Calculate the increment for each coordinate
	const incrementX = (endNode.x - startNode.x) / (num + 1);
	const incrementY = (endNode.y - startNode.y) / (num + 1);
	const incrementZ = (endNode.z - startNode.z) / (num + 1);
  
	const nodes = [startNode]; // Start with the first input node
  
	// Generate nodes in between
	for (let i = 1; i <= num; i++) {
	  const x = startNode.x + incrementX * i;
	  const y = startNode.y + incrementY * i;
	  const z = startNode.z + incrementZ * i;
	  var newNode = new Node(m, Node.NextFreeLabel(m), x, y, z);
	  nodes.push(newNode);
	}
  
	nodes.push(endNode); // Finish with the second input node
  
	// Sort nodes by distance from the first node
	nodes.sort((a, b) => {
	  const distanceA = Math.sqrt(
		Math.pow(a.x - startNode.x, 2) +
		Math.pow(a.y - startNode.y, 2) +
		Math.pow(a.z - startNode.z, 2)
	  );
  
	  const distanceB = Math.sqrt(
		Math.pow(b.x - startNode.x, 2) +
		Math.pow(b.y - startNode.y, 2) +
		Math.pow(b.z - startNode.z, 2)
	  );
  
	  return distanceA - distanceB;
	});
  
	var nids = [];
	for (n of nodes){nids.push(n.nid)}

	return nids;
}


/**
 * Generates an array of points between two given points.
 *
 * @param {Array} startPoint - The coordinates of the starting point [x, y, z].
 * @param {Array} endPoint - The coordinates of the ending point [x, y, z].
 * @param {number} num - The number of nodes to generate in between the start and end points.
 * @returns {Array} - An array of points, starting with the startPoint, followed by the in-between points sorted by distance, and ending with the endPoint.
 */
function createPointsBetween(startPoint, endPoint, num) {
	// Calculate the distance between startNode and endNode
	const distance = Math.sqrt(
	  Math.pow(endPoint[0] - startPoint[0], 2) +
	  Math.pow(endPoint[1] - startPoint[1], 2) +
	  Math.pow(endPoint[2] - startPoint[2], 2)
	);
  
	// Calculate the increment for each coordinate
	const incrementX = (endPoint[0] - startPoint[0]) / (num + 1);
	const incrementY = (endPoint[1] - startPoint[1]) / (num + 1);
	const incrementZ = (endPoint[2] - startPoint[2]) / (num + 1);
  
	const points = [startPoint]; // Start with the first input node
  
	// Generate nodes in between
	for (let i = 1; i <= num; i++) {
	  const x = startPoint[0] + incrementX * i;
	  const y = startPoint[1] + incrementY * i;
	  const z = startPoint[2] + incrementZ * i;
	  points.push([x, y, z]);
	}
  
	points.push(endPoint); // Finish with the second input node
  
	// Sort nodes by distance from the first node
	points.sort((a, b) => {
	  const distanceA = Math.sqrt(
		Math.pow(a[0] - startPoint[0], 2) +
		Math.pow(a[1] - startPoint[1], 2) +
		Math.pow(a[2] - startPoint[2], 2)
	  );
  
	  const distanceB = Math.sqrt(
		Math.pow(b[0] - startPoint[0], 2) +
		Math.pow(b[1] - startPoint[1], 2) +
		Math.pow(b[2] - startPoint[2], 2)
	  );
  
	  return distanceA - distanceB;
	});
  
	return points;
}



