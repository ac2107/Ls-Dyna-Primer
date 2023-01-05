function getBeamElementsByNodes(m, n1, n2) {
	// find all nodes and get beam elements between two nodes [n1, n2]
	// https://stackoverflow.com/questions/7050186/find-if-point-lays-on-line-segment
	// parpameter are node number of two nodes

	// function 
	function removeDuplicate(arr)
	{
		//remove duplcate items in an array
		// Message("...start removeing duplicate item in array");
		
		var uniqueArr = []
	
		// push the first item of "arr" into "uniqueArr", 
		// as the fist item can never be a duplicate
		uniqueArr.push(arr[0]);
	
	
		for (i = 1; i < arr.length; i++) // loop from the second item in "arr"
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

	//
	// Message(">>> select node and beam elements by two end nodes")
	// Message("N1 = " + n1 + "; N2 = " + n2)

	var node_list = [] // contain the node list within the line segment
	var beam_list = [] // contain the shell elements within the line segment

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
		var tol = 1e-4
		if(AB > AP + PB - tol && AB < AP + PB + tol){
			// Message(">>> Node is on the line: " + n.nid)
			node_list.push(n.nid)
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
