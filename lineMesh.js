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
 * Creates a series of equally spaced lines within a rectangle in the X direction.
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
 * Creates a series of equally spaced lines within a rectangle in the Y direction.
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
 * @param {Number} ele Beam element eid (number), array of beam element eids (object - array of numbers), or array of beam element objects (object - array of beam element objects)
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