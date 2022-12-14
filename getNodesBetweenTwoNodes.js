function getNodesBetweenTwoNodes(n1, n2) {
	// get all nodes on the linear line defined by Node n1 and n2
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	var node_list = [] // contain the node list within the line segment
	
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
			node_list.push(n.nid)
			// Message("P = " + n.nid + "; AP = " + AP + "; PB = " + PB + "; AB = " + AB)

		}
	}
	return node_list
}

function getNodesBetweenTwoNodesPart(n1, n2, pid) {
	// get all nodes, belongs to part pid, on the linear line defined by Node n1 and n2, 
	
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	var flag_part = AllocateFlag();
	var part = Part.GetFromID(m, pid);
	part.SetFlag(flag_part);
	m.PropagateFlag(flag_part);

	var node_list = [] // contain the node list within the line segment
	
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

	return node_list
}
