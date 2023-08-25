///////////////////////////////////////////////////
function end_nodes(m, pid1, pid2)
{
	var pflag = AllocateFlag();

	var p = Part.GetFromID(m, pid1);
	p.SetFlag(pflag);

	if(pid2 != null)
	{
		var p = Part.GetFromID(m, pid2);
		p.SetFlag(pflag);
	}
	
	m.PropagateFlag(pflag);

	var nodes = Node.GetFlagged(m, pflag);
	ReturnFlag(pflag);

	var max = -1e20;
	var min = 1e20;
	var tol = 1e-4; // tolerance

	// Find Z extents of the model

	for(i=0; i<nodes.length; i++)
	{
		var max = Math.max(nodes[i].z, max);
		var min = Math.min(nodes[i].z, min);
	}

	// Setup node sets
	var s_top = new Set(m, 100, Set.NODE, "Top Nodes");
	var s_bot = new Set(m, 101, Set.NODE, "Bottom Nodes");

	// Sort the nodes
	for(i=0; i<nodes.length; i++)
	{
		if(nodes[i].z < (max+tol) && nodes[i].z > (max-tol) )  s_top.Add(nodes[i].nid); // top node
		if(nodes[i].z < (min+tol) && nodes[i].z > (min-tol) ) s_bot.Add(nodes[i].nid);  // bottom node
	}
	var nset_id = {top:s_top.sid, bottom:s_bot.sid, max_z:max};
	return nset_id
}

