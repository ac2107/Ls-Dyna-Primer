//
// Generic functions not related to Oasys Primer JS API
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
	var tolerance = 1e-5;


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
	  Math.abs(Math.abs(unitVector[0]) - 1) <= tolerance && Math.abs(unitVector[1]) <= tolerance && Math.abs(unitVector[2]) <= tolerance
	) {
	  orientation = "x-axis";
	} else if (
	  Math.abs(unitVector[0]) <= tolerance && Math.abs(Math.abs(unitVector[1]) - 1) <= tolerance && Math.abs(unitVector[2]) <= tolerance
	) {
	  orientation = "y-axis";
	} else if (
	  Math.abs(unitVector[0]) <= tolerance && Math.abs(unitVector[1]) <= tolerance && Math.abs(Math.abs(unitVector[2]) - 1) <= tolerance
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

/**
 * Generates a curve of time vs amplitude based on the provided points and parameters.
 * The curve consists of three parts defined by four points:
 * [t0, a0], [t1, a1], [t2, a1], and [t3, a2].
 * 
 * @param {Model} m Model 
 * @param {number} t1 - Time value for the start of the second part of the curve.
 * @param {number} t2 - Time value for the start of the third part of the curve.
 * @param {number} t3 - Time value for the end of the curve.
 * @param {number} a1 - Amplitude value for the first and second part of the curve.
 * @param {number} a2 - Amplitude value for the third part of the curve.
 * @param {number} nmax - Number of data points between each part of the curve.
 * @param {boolean} bool - default is false, return array of points [t, a]; if true, return a CURVE object; 
 * @returns Array of time and amplitude points [t, a] or a CURVE object.
 */
function smoothStepCurve(m, t1, t2, t3, a1, a2, nmax, bool = false) {
	var t0 = 0.0;
	var a0 = 0.0;
  
	var crv;

	var curve = [];
  
	// Helper function for smooth interpolation at the start of the step
	function smoothStepStart(t) {
		return t * t;
	}

	// Curve from [t0, a0] to [t1, a1]
	for (var i = 0; i < nmax; i++) {
		var t = t0 + (t1 - t0) * (i / nmax);
		var a = a0 + (a1 - a0) * smoothStepStart(i / nmax);
		curve.push([t, a]);
	}

	// Flat line from [t1, a1] to [t2, a1]
	curve.push([t1, a1]);

	// Curve from [t2, a1] to [t3, a2]
	for (var i = 0; i <= nmax; i++) {
		var t = t2 + (t3 - t2) * (i / nmax);
		var a = a1 + (a2 - a1) * smoothStepStart(i / nmax);
		curve.push([t, a]);
	}
	crv = curve;
	// 
	if (bool == true){

		let LOAD_CURVE = new Curve(Curve.CURVE, m, Curve.NextFreeLabel(m));
		LOAD_CURVE.heading = "LOAD_CURVE";
		for (let c of curve) {LOAD_CURVE.AddPoint(c[0], c[1])}

		crv = LOAD_CURVE

	}

	return crv;
  }

/**
 * Generate a smooth curve between a set of points.
 * @param {Array} pts An array of points, where each point is a list of two numbers `[t, a]`.
 * @param {Number} nmax The number of points to generate between each pair of points in `pts`.
 * @returns 
 */
function smoothStepCurveGeneric(pts, nmax) {
	
	let curve = [];
  
	for (let i = 0; i < pts.length - 1; i++) {
	  const t0 = pts[i][0];
	  const a0 = pts[i][1];
	  const t1 = pts[i + 1][0];
	  const a1 = pts[i + 1][1];
  
	  if (a0 !== a1) {
		for (let t = t0; t <= t1; t += (t1 - t0) / nmax) {
		  const a = a0 + (a1 - a0) * ((t - t0) / (t1 - t0)) * ((t - t0) / (t1 - t0)) * ((t - t0) / (t1 - t0));
		  curve.push([t, a]);
		}
	  } else {
		curve.push([t0, a0]);
	  }
	}
  
	// Ensure that the last point of the curve is the same as the input.
	curve.push([pts[pts.length - 1][0], pts[pts.length - 1][1]]);
  
	return curve;
  }

/**
 * 
 * @param {*} pts 
 */
function switchStepCurve(pts){





}




/**
 * Computes the unit vector perpendicular from the line segment (n1, n2) to n3.
 *
 * @param {Array<number>} n1 - The [x, y, z] coordinates of the first node.
 * @param {Array<number>} n2 - The [x, y, z] coordinates of the second node.
 * @param {Array<number>} n3 - The [x, y, z] coordinates of the third node.
 * @return {Array<number>} - The [x, y, z] components of the unit normal vector.
 */
function unitVectorLineToPoint(n1, n2, n3) {
  // Step 1: Create vector v = n3 - n1
  let v = [n3[0]-n1[0], n3[1]-n1[1], n3[2]-n1[2]];
  
  // Step 2: Create line vector d = n2 - n1
  let d = [n2[0]-n1[0], n2[1]-n1[1], n2[2]-n1[2]];

  // Step 3: Compute the projection of v onto d, subtract it from v
  let dotProduct = (v[0]*d[0] + v[1]*d[1] + v[2]*d[2]) / (d[0]*d[0] + d[1]*d[1] + d[2]*d[2]);
  let proj = [dotProduct*d[0], dotProduct*d[1], dotProduct*d[2]];
  let res = [v[0]-proj[0], v[1]-proj[1], v[2]-proj[2]];
  
  // Step 4: Normalize the resulting vector to get the unit vector
  let magnitude = Math.sqrt(res[0]*res[0] + res[1]*res[1] + res[2]*res[2]);
  let unitVevtor = [res[0]/magnitude, res[1]/magnitude, res[2]/magnitude];

  return unitVevtor;
}

  
/**
 * Rotates a vector around an axis by a specified angle.
 *
 * This function uses quaternion rotation to perform the rotation.
 * 
 * @param {Array<number>} v - The vector to rotate. This should be a 3-element array 
 * representing the vector in 3D space, in the form [x, y, z].
 *
 * @param {Array<number>} axis - The axis to rotate around. This should also be a 
 * 3-element array representing the vector in 3D space, in the form [x, y, z].
 *
 * @param {number} theta - The angle by which to rotate the vector, in degrees. The
 * direction of rotation follows the right-hand rule, with positive angles 
 * representing counterclockwise rotation when the axis of rotation points towards 
 * the observer.
 *
 * @returns {Array<number>} A 3-element array representing the rotated vector, in 
 * the form [x, y, z].
 *
 * @example
 * let v1 = [1, 0, 0];
 * let v2 = [0, 1, 0];
 * let theta = 45;  // Rotation of 45 degrees
 *
 * let result = rotateVector(v1, v2, theta);
 * console.log(result);  // Output: Rotated vector [x, y, z]
 */
function rotateVector(v, axis, theta) {
    // Convert theta from degrees to radians
    theta = theta * (Math.PI / 180);

    // Normalizing axis
    let axisMagnitude = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);
    let u = [axis[0]/axisMagnitude, axis[1]/axisMagnitude, axis[2]/axisMagnitude];

    // Creating quaternion representation of v
    let v_quat = [0].concat(v);

    // Creating quaternion for rotation
    let axis_quat = [Math.cos(theta/2)].concat(u.map(i => i*Math.sin(theta/2)));

    // Creating inverse of quaternion for rotation
    let axis_quat_inv = [axis_quat[0], -axis_quat[1], -axis_quat[2], -axis_quat[3]];

    // Quaternion multiplication: q1*q2
    let temp1 = [
        axis_quat[0]*v_quat[0] - axis_quat[1]*v_quat[1] - axis_quat[2]*v_quat[2] - axis_quat[3]*v_quat[3],
        axis_quat[0]*v_quat[1] + axis_quat[1]*v_quat[0] + axis_quat[2]*v_quat[3] - axis_quat[3]*v_quat[2],
        axis_quat[0]*v_quat[2] + axis_quat[2]*v_quat[0] + axis_quat[3]*v_quat[1] - axis_quat[1]*v_quat[3],
        axis_quat[0]*v_quat[3] + axis_quat[3]*v_quat[0] + axis_quat[1]*v_quat[2] - axis_quat[2]*v_quat[1]
    ];

    // Quaternion multiplication: temp1*axis_quat_inv
    let v_rot_quat = [
        temp1[0]*axis_quat_inv[0] - temp1[1]*axis_quat_inv[1] - temp1[2]*axis_quat_inv[2] - temp1[3]*axis_quat_inv[3],
        temp1[0]*axis_quat_inv[1] + temp1[1]*axis_quat_inv[0] + temp1[2]*axis_quat_inv[3] - temp1[3]*axis_quat_inv[2],
        temp1[0]*axis_quat_inv[2] + temp1[2]*axis_quat_inv[0] + temp1[3]*axis_quat_inv[1] - temp1[1]*axis_quat_inv[3],
        temp1[0]*axis_quat_inv[3] + temp1[3]*axis_quat_inv[0] + temp1[1]*axis_quat_inv[2] - temp1[2]*axis_quat_inv[1]
    ];

    // Extracting vector part of quaternion
    let v_rot = v_rot_quat.slice(1);

    return v_rot;
}

function vec_norm(v)
{
	var mag = Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2) + Math.pow(v[2],2));
	var vnorm = new Array ;
	vnorm[0] = v[0]/mag;
	vnorm[1] = v[1]/mag;
	vnorm[2] = v[2]/mag;
	return vnorm;
}













