/**
 * 
 * @param {Model} m Model
 * @param {Number} n1 Node id
 * @param {Number} n2 node id
 * @returns 
 */
function getNodesBetweenTwoNodes(m, n1, n2) {
	// get all nodes on the linear line defined by Node n1 and n2, excluding 3rd node of any beam elements
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	var node_list = [] 			// list of nodes between n1 and n2
	var node_list_sorted = [] 	// sorted list of node nids
	var node_obj = [];			// list of node objects to be sorted
	
	var node1 = Node.GetFromID(m, n1);
	var node2 = Node.GetFromID(m, n2);

	// >>> collect nodes
	Node.ForEach(m, find_nodes);
	function find_nodes(n)
	{
		// >>> n is Node object (NOT nid)
		// >>> Find distance of point P from both line ends points A, B. 
		// >>> If AB = AP+ PB, then P lies on the line segment AB.
		var x = n.x, y = n.y, z = n.z;
		var x1 = node1.x, y1 = node1.y, z1 = node1.z;
		var x2 = node2.x, y2 = node2.y, z2 = node2.z;
		
		var AB = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
		var AP = Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)+(z-z1)*(z-z1));
		var PB = Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)+(z2-z)*(z2-z));
		var tol = 1e-3
		if(AB > AP + PB - tol && AB < AP + PB + tol){
			// Message(">>> Node is on the line: " + n.nid)
			node_list.push(n.nid)
			// Message("P = " + n.nid + "; AP = " + AP + "; PB = " + PB + "; AB = " + AB)

		}
	}

	// >>> create a list of node objects for sorting
	for (var nid of node_list){
		// >> get node
		var node = Node.GetFromID(m, nid);
		// >> work out distance to the first node n1
		var dist = unitVectorByTwoNodes(m, n1, nid).distance;
		// >> add the distance as property to a NODE object
		node.dist = dist;
		// >> push the node obj to the list
		node_obj.push(node);

	}

	// 	>>> sorting the node list by property "dist"
	node_obj.sort((a, b) => (a.dist > b.dist) ? 1 : -1)

	for (var node of node_obj){
		// Message([node.nid, node.dist]);
		if (isThirdNode(m, node)){}
		else {
			node_list_sorted.push(node.nid)
		}
	}
	return node_list_sorted
}

function getNodesBetweenTwoNodesFlagged(m, n1, n2, flag) {
	// get all flagged nodes on the linear line defined by Node n1 and n2, excluding 3rd node of any beam elements
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	var node_list = [] 			// list of nodes between n1 and n2
	var node_list_sorted = [] 	// sorted list of node nids
	var node_obj = [];			// list of node objects to be sorted
	
	var node1 = Node.GetFromID(m, n1);
	var node2 = Node.GetFromID(m, n2);

	// >>> collect flagged nodes
	var nodes_flagged = Node.GetFlagged(m, flag);
	// >>> loop through all flagged nodes
	for (var n of nodes_flagged)
	{
		// >>> n is Node object (NOT nid)
		// >>> Find distance of point P from both line ends points A, B. 
		// >>> If AB = AP+ PB, then P lies on the line segment AB.
		var x = n.x, y = n.y, z = n.z;
		var x1 = node1.x, y1 = node1.y, z1 = node1.z;
		var x2 = node2.x, y2 = node2.y, z2 = node2.z;
		
		var AB = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
		var AP = Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)+(z-z1)*(z-z1));
		var PB = Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)+(z2-z)*(z2-z));
		var tol = 1e-3
		if(AB > AP + PB - tol && AB < AP + PB + tol){
			// Message(">>> Node is on the line: " + n.nid)
			node_list.push(n.nid)
			// Message("P = " + n.nid + "; AP = " + AP + "; PB = " + PB + "; AB = " + AB)

		}
	}

	// >>> create a list of node objects for sorting
	for (var nid of node_list){
		// >> get node
		var node = Node.GetFromID(m, nid);
		// >> work out distance to the first node n1
		var dist = unitVectorByTwoNodes(m, n1, nid).distance;
		// >> add the distance as property to a NODE object
		node.dist = dist;
		// >> push the node obj to the list
		node_obj.push(node);

	}

	// 	>>> sorting the node list by property "dist"
	node_obj.sort((a, b) => (a.dist > b.dist) ? 1 : -1)

	for (var node of node_obj){
		// Message([node.nid, node.dist]);
		if (isThirdNode(m, node)){}
		else {
			node_list_sorted.push(node.nid)
		}
	}
	return node_list_sorted
}

function getNodesBetweenTwoNodesPart(m, n1, n2, pid) {
	// get all nodes, belongs to part pid, on the linear line defined by Node n1 and n2, 
	
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	var flag_part = AllocateFlag();
	var part = Part.GetFromID(m, pid);
	part.SetFlag(flag_part);
	m.PropagateFlag(flag_part);

	var node_list = [] // contain the node list within the line segment
	var node_list_sorted = [] 	// sorted list of node nids
	var node_obj = [];			// list of node objects to be sorted
	
	var node1 = Node.GetFromID(m, n1);
	var node2 = Node.GetFromID(m, n2);
	
	// collect nodes
	Node.ForEach(m, find_nodes);
	function find_nodes(n)
	{
		// n is Node object (NOT nid)
		// Find distance of point P from both line ends points A, B. 
		// If AB = AP+ PB, then P lies on the line segment AB.
		var x = n.x, y = n.y, z = n.z;
		var x1 = node1.x, y1 = node1.y, z1 = node1.z;
		var x2 = node2.x, y2 = node2.y, z2 = node2.z;
		
		var AB = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
		var AP = Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)+(z-z1)*(z-z1));
		var PB = Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)+(z2-z)*(z2-z));
		var tol = 1e-3
		if(AB > AP + PB - tol && AB < AP + PB + tol){
			// Message(">>> Node is on the line: " + n.nid)
			if(n.Flagged(flag_part)){node_list.push(n.nid)};
			// Message("P = " + n.nid + "; AP = " + AP + "; PB = " + PB + "; AB = " + AB)

		}
	}

	ReturnFlag(flag_part);

	// >>> create a list of node objects for sorting
	for (var nid of node_list){
		// >> get node
		var node = Node.GetFromID(m, nid);
		// >> work out distance to the first node n1
		var dist = unitVectorByTwoNodes(m, n1, nid).distance;
		// >> add the distance as property to a NODE object
		node.dist = dist;
		// >> push the node obj to the list
		node_obj.push(node);

	}
	
	// 	>>> sorting the node list by property "dist"
	node_obj.sort((a, b) => (a.dist > b.dist) ? 1 : -1)

	for (var node of node_obj){
		// Message([node.nid, node.dist]);
		if (isThirdNode(m, node)){}
		else {
			node_list_sorted.push(node.nid)
		}
	}

	return node_list_sorted

}
