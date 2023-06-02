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


/**
 * 
 * @param {Model} m - Model
 * @param {Number} nid1 - Node id of node 1
 * @param {Number} nid2 - Node id of node 2
 * @returns 		 An object containing the unit vector, distance, and orientation.
 *                   - unitVector: The unit vector representing the direction between the nodes.
 *                   - distance: The Euclidean distance between the nodes.
 *                   - orientation: The orientation of the unit vector (x-axis, y-axis, z-axis, or oblique).
 */
function unitVectorByTwoNodes(m, nid1, nid2) {

	// Define a tolerance for testing orientation
	var tolerance = 1e-4;


	// Get the node coordinates
	var n1 = Node.GetFromID(m, nid1);
    var n2 = Node.GetFromID(m, nid2);

	var node1 = [n1.x, n1.y, n1.z];
	var node2 = [n2.x, n2.y, n2.z];

	// Calculate the vector between node 1 and node 2
	const vector = [
	  node2[0] - node1[0],
	  node2[1] - node1[1],
	  node2[2] - node1[2]
	];
  
	// Calculate the distance between node 1 and node 2 using the Euclidean formula
	const distance = Math.sqrt(
	  Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
	);
  
	// Calculate the unit vector by dividing the vector by its magnitude
	const unitVector = [
	  vector[0] / distance,
	  vector[1] / distance,
	  vector[2] / distance
	];
  
	// Determine the orientation based on the unit vector
	let orientation;
	if (
	  Math.abs(unitVector[0] - 1) <= tolerance && Math.abs(unitVector[1]) <= tolerance && Math.abs(unitVector[2]) <= tolerance
	) {
	  orientation = "x-axis";
	} else if (
	  Math.abs(unitVector[0]) <= tolerance && Math.abs(unitVector[1] - 1) <= tolerance && Math.abs(unitVector[2]) <= tolerance
	) {
	  orientation = "y-axis";
	} else if (
	  Math.abs(unitVector[0]) <= tolerance && Math.abs(unitVector[1]) <= tolerance && Math.abs(unitVector[2] - 1) <= tolerance
	) {
	  orientation = "z-axis";
	} else {
	  orientation = "oblique";
	}
  
	return {
	  unitVector: unitVector,
	  distance: distance,
	  orientation: orientation
	};
  }

 /**
 * Calculates the cross product of two vectors and returns the cross product vector and its unit vector.
 *
 * @param {number[]} v1 - The coordinates of the first vector as an array [x1, y1, z1].
 * @param {number[]} v2 - The coordinates of the second vector as an array [x2, y2, z2].
 * @returns			 An object containing the cross product vector and its unit vector.
 *                   - crossProduct: The cross product vector of v1 and v2.
 *                   - unitVector: The unit vector representing the direction of the cross product.
 */
  function calculateCrossProduct(v1, v2) {
	// Calculate the cross product of v1 and v2
	const crossProduct = [
	  v1[1] * v2[2] - v1[2] * v2[1],
	  v1[2] * v2[0] - v1[0] * v2[2],
	  v1[0] * v2[1] - v1[1] * v2[0]
	];
  
	// Calculate the magnitude of the cross product
	const magnitude = Math.sqrt(
	  Math.pow(crossProduct[0], 2) + Math.pow(crossProduct[1], 2) + Math.pow(crossProduct[2], 2)
	);
  
	// Calculate the unit vector by dividing the cross product by its magnitude
	const unitVector = [
	  crossProduct[0] / magnitude,
	  crossProduct[1] / magnitude,
	  crossProduct[2] / magnitude
	];
  
	return {
	  crossProduct: crossProduct,
	  unitVector: unitVector
	};
  }

/**
 * Finds the numbers in a given list that do not have duplicates.
 *
 * @param {number[]} list - The list of numbers.
 * @returns {number[]} An array containing the numbers that do not have duplicates.
 */
function findUniqueNumbers(list) {
const frequency = {};
const uniqueNumbers = [];

// Count the frequency of each number
for (const num of list) {
	if (frequency[num]) {
	frequency[num]++;
	} else {
	frequency[num] = 1;
	}
}

// Check for numbers with frequency = 1
for (const num of list) {
	if (frequency[num] === 1) {
	uniqueNumbers.push(num);
	}
}

return uniqueNumbers;
}