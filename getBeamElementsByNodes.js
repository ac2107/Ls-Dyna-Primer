// function 
function removeDuplicate(arr)
{
	//remove duplcate items in an array
	// Message("...start removeing duplicate item in array");
	
	var uniqueArr = []

	// push the first item of "arr" into "uniqueArr", 
	// as the fist item can never be a duplicate
	uniqueArr.push(arr[0]);


	for (var i = 1; i < arr.length; i++) // loop from the second item in "arr"
	{
		// Message("arr["+ i + "] = " +arr[i]);

		var flag = true;

		// check for duplicate item
		for (var j = 0; j < uniqueArr.length; j++)
		
		{
			// Message("arr["+ i + "] = " +arr[i] + " vs " + "uniqueArr["+ j + "] = " +uniqueArr[j] );
			// Message("uniqueArr["+ j + "] = " +uniqueArr[j]);

			if (arr[i] != uniqueArr[j]) // not a duplicate
			{
				flag = true
				// Message("true");
			}                
			else
			{
				flag = false
				// Message("false");
				break
			}
		}   

	if (flag === true)
	{
		// Message("It is True")
		// push arr[i] into "uniqArr" if not duplciate is found in above loop of j
		uniqueArr.push(arr[i]);
	}
	// else
	// {
	//     // Message("It is False")
	// }

	}

	// for debugging
	// uniqueArr = arr

	return uniqueArr
}


/**
 * find all nodes and get beam elements between two nodes [n1, n2]
 * @param {Model} m 	Model id
 * @param {Number} n1 	Node id
 * @param {Number} n2 	Node id
 * @returns 
 */
function getBeamElementsByNodes(m, n1, n2,) {
	// find all nodes and get beam elements between two nodes [n1, n2]
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	//
	// Message(">>> select node and beam elements by two end nodes")
	// Message("N1 = " + n1 + "; N2 = " + n2)

	var node_list = [] // contain the node list within the line segment
	var beam_list = [] // contain the shell elements within the line segment

	var node1 = Node.GetFromID(m, n1);
	var node2 = Node.GetFromID(m, n2);

	// collect nodes
	var data = {x1: node1.x, y1: node1.y, z1: node1.z, x2: node2.x, y2: node2.y, z2: node2.z, tol: 1e-4}
	Node.ForEach(m, find_nodes, data);
	function find_nodes(n, data)
	{
		// n is Node object (NOT nid)
		// Find distance of point P from both line ends points A, B. 
		// If AB = AP+ PB, then P lies on the line segment AB.
		var x = n.x, y = n.y, z = n.z;		
		var AB = Math.sqrt((data.x2-data.x1)*(data.x2-data.x1)+(data.y2-data.y1)*(data.y2-data.y1)+(data.z2-data.z1)*(data.z2-data.z1));
		var AP = Math.sqrt((x-data.x1)*(x-data.x1)+(y-data.y1)*(y-data.y1)+(z-data.z1)*(z-data.z1));
		var PB = Math.sqrt((data.x2-x)*(data.x2-x)+(data.y2-y)*(data.y2-y)+(data.z2-z)*(data.z2-z));
		if(AB > AP + PB - data.tol && AB < AP + PB + data.tol){
			// Message(">>> Node is on the line: " + n.nid)
			node_list.push(n.nid)
			// Message(['check data: ',data.x1])
			// Message("P = " + n.nid + "; AP = " + AP + "; PB = " + PB + "; AB = " + AB)

		}
	}

	// collect beam elements (exclude beam elements Xreffed by 3rd node)
	// create a new node list excluding 3rd node
	var new_node_list = []
	for (var i = 0; i < node_list.length; i++) 
	{
		// Message(node_list[i])
		var n = Node.GetFromID(m, node_list[i]);
		// Message("Node: " + n.nid)
		var xrefs = n.Xrefs();
		// get all connected beam element id
		var num = xrefs.GetTotal("BEAM");
		//		
		for (var ref=0; ref<num; ref++)
		{
			var beam_id = xrefs.GetItemID("BEAM", ref);
			// Message("BEAM" + " " + beam_id);
			
			// is the node a 3rd node for the beam element Xreffed?
			// get the beam element from beam_id
			var b = Beam.GetFromID(m, beam_id);
			// Message([b.n1, b.n2, b.n3])

			if (node_list[i] != b.n3) { // this node is NOT a 3rd node for the beam element
				beam_list.push(beam_id) // push the beam element into the list
				new_node_list.push(node_list[i])
			}
			else {						// if this node is a 3rd node for the beam element
				continue				// ignore the beam element
			}			
		}
		// if (i >= 0) {
		// 	break
		// }
	}

	// remove duplicate node ids
	var new_node_list = removeDuplicate(new_node_list)

	// remove beam elements not enclosed by the two end node -> exclusive
	// exclusive = beam element with node 1 and node 2 between the two end nodes
	// exclusive 
	var exclusive_beam_list = []

	// Message(new_node_list);
	// Message(beam_list);

	for (var i = 0; i < beam_list.length; i++) {

		// Message(new_node_list[i]);

		var b = Beam.GetFromID(m, beam_list[i]);

		var index1 = new_node_list.indexOf(b.n1);
		var index2 = new_node_list.indexOf(b.n2);

		// Message([b.n1, b.n2]);
		// Message([index1, index2]);
		// Message(" ")
	
		if ((index1 == -1) || (index2 == -1)) {
			// beam element to be excluded - do nothing
			continue
		}
		else {
			// push into the exclusive_beam_list
			exclusive_beam_list.push(beam_list[i])
		}	
	}

	// remove duplicate beam ids
	var new_beam_list = removeDuplicate(beam_list)
	var exclusive_beam_list = removeDuplicate(exclusive_beam_list)

	// return
	var list = {node: new_node_list, beam: exclusive_beam_list, beamAll: beam_list}

	return list 
}

/**
 * Get beam elemens by two nodes and (optional) node set to define the nodes to be operated; 
 * Same as getBeamElementByNodes, with extra ability to looping a specific node set for faster operation
 * @param {*} m 
 * @param {*} n1 
 * @param {*} n2 
 * @param {*} nsid 
 * @returns 
 */
function getBeamElementsByNodesSet(m, n1, n2, nsid){

	// find all nodes and get beam elements between two nodes [n1, n2]
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment

	var m = arguments[0];
	var n1 = arguments[1];
	var n2 = arguments[2];
	var nsid = arguments[3];

	var node_list = [] // contain the node list within the line segment
	var beam_list = [] // contain the shell elements within the line segment

	var node1 = Node.GetFromID(m, n1);
	var node2 = Node.GetFromID(m, n2);

	// if 3 arguments are given: (m, n1, n2)
    if (arguments.length == 3) {  
     	// Message('... >>> Get beam elements by considering all nodes in the model')

		// loop all nodes
		var data = {x1: node1.x, y1: node1.y, z1: node1.z, x2: node2.x, y2: node2.y, z2: node2.z, tol: 1e-4}
		Node.ForEach(m, find_nodes, data);
		function find_nodes(n, data)
		{
			// n is Node object (NOT nid)
			// Find distance of point P from both line ends points A, B. 
			// If AB = AP+ PB, then P lies on the line segment AB.
			var x = n.x, y = n.y, z = n.z;		
			var AB = Math.sqrt((data.x2-data.x1)*(data.x2-data.x1)+(data.y2-data.y1)*(data.y2-data.y1)+(data.z2-data.z1)*(data.z2-data.z1));
			var AP = Math.sqrt((x-data.x1)*(x-data.x1)+(y-data.y1)*(y-data.y1)+(z-data.z1)*(z-data.z1));
			var PB = Math.sqrt((data.x2-x)*(data.x2-x)+(data.y2-y)*(data.y2-y)+(data.z2-z)*(data.z2-z));
			if(AB > AP + PB - data.tol && AB < AP + PB + data.tol) node_list.push(n.nid)
		}		
    }
	
	// if 4 argeuments are given: (m, n1, n2. nsid)
	else if (arguments.length == 4) {
		// Message('... >>> Get beam elements by considering node set (nsid) in the model')
		var data = {x1: node1.x, y1: node1.y, z1: node1.z, x2: node2.x, y2: node2.y, z2: node2.z, tol: 1e-4}
		var node_set = Set.GetFromID(m, nsid, Set.NODE);
		// Message(node_set.title);
		var nid;
		node_set.StartSpool();
		while((nid = node_set.Spool())){

			var n = Node.GetFromID(m, nid);
			var x = n.x, y = n.y, z = n.z;		
			var AB = Math.sqrt((data.x2-data.x1)*(data.x2-data.x1)+(data.y2-data.y1)*(data.y2-data.y1)+(data.z2-data.z1)*(data.z2-data.z1));
			var AP = Math.sqrt((x-data.x1)*(x-data.x1)+(y-data.y1)*(y-data.y1)+(z-data.z1)*(z-data.z1));
			var PB = Math.sqrt((data.x2-x)*(data.x2-x)+(data.y2-y)*(data.y2-y)+(data.z2-z)*(data.z2-z));
			if(AB > AP + PB - data.tol && AB < AP + PB + data.tol) node_list.push(n.nid)
		}
	}

	else {
	
		Message('...>>> Incorrect number of arguments are given')

	}

	// collect beam elements (exclude beam elements Xreffed by 3rd node)
	// create a new node list excluding 3rd node
	var new_node_list = []
	for (var i = 0; i < node_list.length; i++) 
	{
		// Message(node_list[i])
		var n = Node.GetFromID(m, node_list[i]);
		// Message("Node: " + n.nid)
		var xrefs = n.Xrefs();
		// get all connected beam element id
		var num = xrefs.GetTotal("BEAM");
		//		
		for (var ref=0; ref<num; ref++)
		{
			var beam_id = xrefs.GetItemID("BEAM", ref);
			// Message("BEAM" + " " + beam_id);
			
			// is the node a 3rd node for the beam element Xreffed?
			// get the beam element from beam_id
			var b = Beam.GetFromID(m, beam_id);
			// Message([b.n1, b.n2, b.n3])

			if (node_list[i] != b.n3) { // this node is NOT a 3rd node for the beam element
				beam_list.push(beam_id) // push the beam element into the list
				new_node_list.push(node_list[i])
			}
			else {						// if this node is a 3rd node for the beam element
				continue				// ignore the beam element
			}			
		}
		// if (i >= 0) {
		// 	break
		// }
	}

	// remove duplicate node ids
	new_node_list = removeDuplicate(new_node_list)

	// remove beam elements not enclosed by the two end node -> exclusive
	// exclusive = beam element with node 1 and node 2 between the two end nodes
	// exclusive 
	var exclusive_beam_list = []

	// Message(new_node_list);
	// Message(beam_list);

	for (var i = 0; i < beam_list.length; i++) {

		// Message(new_node_list[i]);

		var b = Beam.GetFromID(m, beam_list[i]);

		var index1 = new_node_list.indexOf(b.n1);
		var index2 = new_node_list.indexOf(b.n2);

		// Message([b.n1, b.n2]);
		// Message([index1, index2]);
		// Message(" ")
	
		if ((index1 == -1) || (index2 == -1)) {
			// beam element to be excluded - do nothing
			continue
		}
		else {
			// push into the exclusive_beam_list
			exclusive_beam_list.push(beam_list[i])
		}	
	}

	// remove duplicate beam ids
	// var new_beam_list = removeDuplicate(beam_list)
	var exclusive_beam_list = removeDuplicate(exclusive_beam_list)

	// return
	var list = {node: new_node_list, beam: exclusive_beam_list, beamAll: beam_list}

	return list 

}





