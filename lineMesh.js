/**
 * Create beam elements between two end nodes
 * @param {Model} m - Model
 * @param {Number} pid - Pard id
 * @param {Number} lennum - Element length or number of elements; element length if > 0 and number of elements if < 0  
 * @param {Number} n1 - Node id of first node
 * @param {Number} n2 - Node if of second node
 */
function lineMeshByNodes(m, pid, lennum, n1, n2) {

    // Get the two node objects
    var Node1 = Node.GetFromID(m, n1);
    var Node2 = Node.GetFromID(m, n2);

    // Find the unit vector between the two nodes
    var unitVector = unitVectorByTwoNodes(m, n1, n2);


    // Determine number of in-between nodes
    var nnum = 1 // number of in-between nodes
    // number of elements is provided
    if (lennum < 0){nnum = Math.max(1, Math.abs(lennum) - 1)}
    // element length is provided
    else if (lennum > 0) { nnum = Math.max(1, Math.floor(unitVector.distance/lennum))}
    else {nnum = 0}
    // Create in-between nodes
    var newNodes = createNodesBetween(m, n1, n2, nnum);

    // Create beam elements
    var newBeams = [];
    var vec_r = [];
    var vec_s = [];
    var vec_t = [];
    for (var i = 0; i<newNodes.length-1; i++){
        
        var blabel = Beam.NextFreeLabel(m);
        var b = new Beam(m, blabel, pid, newNodes[i], newNodes[i+1], 0);
    
        // Turn on orientation vector for the beam; 0 - off; 1 - on
        b.orientation = 1;         
    
        // Define the orientation vector
        // If the unit vector is in global z-axis direction
        
        // Message(unitVector.orientation);
        // Message(unitVector.unitVector);

        if (unitVector.orientation === 'z-axis') {vec_s = [1.0, 0, 0]}
        // If the unit vector is not in global z-axis direction
        else {
            vec_t = [0, 0, 1.0];
            vec_r = unitVector.unitVector;
            vec_s = calculateCrossProduct(vec_t, vec_r).unitVector;
        }

        // Set the beam orientation vector
        b.vx = vec_s[0];
        b.vy = vec_s[1];
        b.vz = vec_s[2];

        // Push beam id into list newBeams
        newBeams.push(blabel)
    }

    return {nids: newNodes, bids: newBeams}
}

/**
 * Create a group of main reinforcement bars (beam elements) in XY plane, extending in Z direction
 *  - Similar to how AdSec reinforcement type "line" works
 *  - Define the positions of the line group by two ponts in the XY plane
 *  - Define the length of the reiforcement bars in Z direction
 *  - Coordiantes of starting and ending bars centroid should be used
 *  - If N = 1, "Point" mode, create single rebar by (x0, y0), (x1, y1) will be ignored
 * @param {Model} m Model 
 * @param {Number} pid Part id
 * @param {Number} N Number of reinforecements between starting and ending points
 * @param {Array} p0 Starting point x coordiante
 * @param {Array} p1 Starting point y coordiante
 * @param {Array} z Ending point x coordiante
 * @param {Number} bsize Beam element size
 * @returns 
 */
function lineReinfMesh(m, pid, N, p0, p1, z, bsize){
    
    if (N < 1) {
        ErrorMessage("N should be greater than 0");
        throw new Error("N should be greater than 0");
    }

    else if (N == 1) {

        let nodes = [];
        let beams = [];

        var node0 = new Node(m, Node.NextFreeLabel(m), p0[0], p0[1], z[0]);
        var node1 = new Node(m, Node.NextFreeLabel(m), p0[0], p0[1], z[1]);
        var beam = lineMeshByNodes(m, pid, bsize, node0.nid, node1.nid);

        beams = beam.bids;

        WarningMessage('lineReinfGroupMesh() in POINT model')

        return {nodes, beams};
    }

    else {

        // Calculate step intervals
        const stepX = (p1[0] - p0[0]) / (N - 1);

        const points = [];
        for (let i = 0; i < N; i++) {
            const currentX = p0[0] + stepX * i;
            const currentY = p0[1] + ((p1[1] - p0[1]) / (p1[0] - p0[0])) * (currentX - p0[0]);
            points.push([currentX, currentY]);
        }

        // Create meshed reinforcement beam group
        let nodes = [];
        let beams = [];
        for (var pt of points){

            Message(pt);
            
            var node0 = new Node(m, Node.NextFreeLabel(m), pt[0], pt[1], z[0]);
            var node1 = new Node(m, Node.NextFreeLabel(m), pt[0], pt[1], z[1]);
            var beam = lineMeshByNodes(m, pid, bsize, node0.nid, node1.nid);

        } 

        WarningMessage('lineReinfGroupMesh() in LINE model')

        return {points, nodes, beams};
    
    }

}

/**
 * Create a group of line segments in the XY plane (i.e. on element section) and populate into the spanning direction (Z) of the lement
 * - Primarily used for creating closed or open shear links/ties for a RC element
 * @param {Model} m Model id
 * @param {Number} pid Part id
 * @param {Array} points Array of points [x, y], defining the line segments on XY plane
 * @param {Array} spacing Array of parameters [start, end, spc] for spacing of the line segments in the element spanning direction,
 *                        start = starting distance, end = ending distance, spc = spacing between each sets of line segments
 * @param {Number} bsize Beam element size
 * @param {String} option Option to set "CLOSED" or "OPEN" line segments, "CLOSED" means the last point is connected to the first point
 */
function lineReinfSegMesh(m, pid, points, spacing, bsize, option){

    let s = spacing[0];

    while ( s < spacing[1]){
        
        let nodes = []

        for (var pt of points){
            let node = new Node(m, Node.NextFreeLabel(m), pt[0], pt[1], s);
            nodes.push(node);
        }

        for (let i = 0; i < nodes.length-1; i++) lineMeshByNodes(m, pid, bsize, nodes[i].nid, nodes[i+1].nid);

        if (option == 'CLOSED'){

            let len = nodes.length;
            lineMeshByNodes(m, pid, bsize, nodes[0].nid, nodes[len-1].nid);
        }

        s = s + spacing[2];

    }
}


/**
 * Creates a series of equally spaced lines within a rectangle in the X direction in the XY plane
 *
 * @param {number} x1 - The x-coordinate of the first point defining the rectangle.
 * @param {number} y1 - The y-coordinate of the first point defining the rectangle.
 * @param {number} x2 - The x-coordinate of the second point defining the rectangle.
 * @param {number} y2 - The y-coordinate of the second point defining the rectangle.
 * @param {number} z - The z-coordinate of the rectangle.
 * @param {number} numLines - The number of lines to create within the rectangle.
 * @returns {Array} - An array of arrays representing the start and end points of each line.
 */
function createLinesInRectangleX(x1, y1, x2, y2, z, numLines) {
	var width = Math.abs(x2 - x1);
	var height = Math.abs(y2 - y1);
	var lineSpacing = width / (numLines - 1);
  
	var lines = [];
  
	for (var i = 0; i < numLines; i++) {
	  var lineX = x1 + i * lineSpacing;
	  var lineStart = [lineX, y1, z];
	  var lineEnd = [lineX, y2, z];
	  lines.push([lineStart, lineEnd]);
	}
  
	return lines;
}

/**
 * Creates a series of equally spaced lines within a rectangle in the Y direction in the XY plane. 
 *
 * @param {number} x1 - The x-coordinate of the first point defining the rectangle.
 * @param {number} y1 - The y-coordinate of the first point defining the rectangle.
 * @param {number} x2 - The x-coordinate of the second point defining the rectangle.
 * @param {number} y2 - The y-coordinate of the second point defining the rectangle.
 * @param {number} z - The z-coordinate of the rectangle.
 * @param {number} numLines - The number of lines to create within the rectangle.
 * @returns {Array} - An array of arrays representing the start and end points of each line.
 */
function createLinesInRectangleY(x1, y1, x2, y2, z, numLines) {
var width = Math.abs(x2 - x1);
var height = Math.abs(y2 - y1);
var lineSpacing = height / (numLines - 1);

var lines = [];

for (var i = 0; i < numLines; i++) {
    var lineY = y1 + i * lineSpacing;
    var lineStart = [x1, lineY, z];
    var lineEnd = [x2, lineY, z];
    lines.push([lineStart, lineEnd]);
}

return lines;
}



/**
 * Split beam element
 * Delete the beam element and then create new beam elements with given element size
 * @param {Model} m Model, object
 * @param {*} ele Beam element eid (number), array of beam element eids (object - array of numbers), or array of beam element objects (object - array of beam element objects)
 * @param {Number} len Element length or number of elements; element length if > 0 and number of elements if < 0
 */
function splitBeamElement(m, ele, len){
	var flag_bdel = AllocateFlag();
	// case 1 - input "ele" is a number (signle beam element id)
	if (typeof ele == 'number'){

		// Message('...spliting beam element ' + ele);
		var beam = Beam.GetFromID(m, ele);
		beam.SetFlag(flag_bdel)
		lineMeshByNodes(m, beam.pid, len, beam.n1, beam.n2);

	// case 2 - input "ele" is an array of numbers (a list of beam element ids)
	} else if (typeof ele == 'object' && typeof ele[0] == 'number'){

		for (var bid of ele) {
			// Message('...spliting beam element ' + bid);
			var beam = Beam.GetFromID(m, bid);
			beam.SetFlag(flag_bdel)
			lineMeshByNodes(m, beam.pid, len, beam.n1, beam.n2);
		}

	// case 3 - input "ele" is an array of beam element objects
	} else if (typeof ele == 'object' && typeof ele[0] == 'object') {
		for (var bm of ele) {
			// Message('...spliting beam element ' + bm.eid);
			bm.SetFlag(flag_bdel)
			lineMeshByNodes(m, beam.pid, len, beam.n1, beam.n2);
		}

	}
	// delete all original beam elements using flag
	m.DeleteFlagged(flag_bdel, false);
	ReturnFlag(flag_bdel);

	// merge nodes as lineMesh() create new nodes
	// var flag_node_merge = AllocateFlag();
	// Node.FlagAll(m, flag_node_merge);
	// Node.Merge(m, flag_node_merge, 1e-5);
	// ReturnFlag(flag_node_merge)

}

/**
 * Combine multiple beam elements into one element
 * 
 * @param {Model} m - Model 
 * @param {Array} blist - list of beam ids 
 */
function combineBeamElement(m, blist){

    // Create flag to deleting beam elements
    var flag_del = AllocateFlag();

    // 
    var nidList = [];
    var nidListUnique = []; 

    // Get all the node ids belong to the beam elements to be merged
    // Get beam part id
    var pid = 0;
    for (var b of blist){
        
        var beam = Beam.GetFromID(m, b);

        nidList.push(beam.n1);
        nidList.push(beam.n2);

        beam.SetFlag(flag_del);

        pid = beam.pid;
    }

    // Find the starting and ending node of the new beam element 
    nidListUnique = findUniqueNumbers(nidList);

    // Delete beams to be merged
    m.DeleteFlagged(flag_del, true);

    // Create new beam element
    if (nidListUnique.length === 2){
        var newBeam = lineMeshByNodes(m, pid, 0, nidListUnique[0], nidListUnique[1]);
    }

    // Message(blist);
    // Message(nidList);
    // Message(nidListUnique);

    ReturnFlag(flag_del);

    // return newBeam
}

/**
 * 
 * @param {Model} m model
 * @param {Array} blist list of beam ids
 * @param {Number} theta angle of rotation about beam axial axis, follow right hand rule
 */
function rotateBeamElement(m, blist, theta=0){

    for (var bid of blist){

        let beam = Beam.GetFromID(m, bid);

        if (beam.orientation ==0) {

            let node1 = Node.GetFromID(m, beam.n1);
            let node2 = Node.GetFromID(m, beam.n2);
            let node3 = Node.GetFromID(m, beam.n3);
    
            let n1 = [node1.x, node1.y, node1.z];
            let n2 = [node2.x, node2.y, node2.z];
            let n3 = [node3.x, node3.y, node3.z];
    
            let unitVevtor = unitVectorLineToPoint(n1, n2, n3);

            let axis = unitVectorByTwoNodes(m, beam.n1, beam.n2).unitVector;
            let unitVevtor_rot = rotateVector(unitVevtor, axis, theta);

            beam.orientation = 1;

            beam.vx = unitVevtor_rot[0];
            beam.vy = unitVevtor_rot[1];
            beam.vz = unitVevtor_rot[2];

            beam.n3 = 0;

        }

        else {

            WarningMessage("Complete implementation of the function...")

        }
    }
}





