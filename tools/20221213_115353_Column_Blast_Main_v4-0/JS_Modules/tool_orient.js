 /////////////////Reflect Parts ///////////////////
function reflect_parts(m, pids, coord, axis, copy)
{
	// pids: part id array
	// coord: location of mirror plane
	// axis: x=1, y=2, z=3
	// copy: 0=move, n=num of copies

	// setup reflect matrix
	var rot_m  = new Array;
	if(axis == 1)  // x axis - YZ Plane
	{
		rot_m[0] = [-1,0,0];
		rot_m[1] = [0,1,0]; 
		rot_m[2] = [0,0,1]; 

		var ax = coord; 
		var ay = 0; 
		var az = 0; 
	}
	else if(axis == 2)  // y axis  - XZ Plane
	{
		rot_m[0] = [1,0,0]; 
		rot_m[1] = [0,-1,0];
		rot_m[2] = [0,0,1]; 

		var ax = 0; 
		var ay = coord; 
		var az = 0; 
	}
	else if(axis == 3)  // z axis  - XY Plane
	{
		rot_m[0] = [1,0,0]; 
		rot_m[1] = [0,1,0]; 
		rot_m[2] = [0,0,-1];

		var ax = 0; 
		var ay = 0; 
		var az = coord; 
	}

	// flag the nodes and element on the part
	var tflag = AllocateFlag();
	for(var i=0; i<pids.length; i++) // cycle through the parts
	{
		var p = Part.GetFromID(m, pids[i]);
		p.SetFlag(tflag);
	}
	m.PropagateFlag(tflag);

	// Process the nodes
	var nodes = Node.GetFlagged(m, tflag);
	var node_lookup = new Object;

	if(copy == 0) //just move node
	{
		for(var i=0; i<nodes.length; i++)
		{
			var x = nodes[i].x;
			var y = nodes[i].y;
			var z = nodes[i].z;

			var x_off = x - ax;
			var y_off = y - ay;
			var z_off = z - az;

			var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
			var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
			var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);

			var x_new = x_rot + ax; 
			var y_new = y_rot + ay; 
			var z_new = z_rot + az;

			nodes[i].x = x_new;
			nodes[i].y = y_new;
			nodes[i].z = z_new;
		}
	}
	else // copies nodes
	{
		for(var i=0; i<nodes.length; i++)
		{
			node_lookup[nodes[i].nid] = new Object;
			var node = nodes[i];

			for(var j=1; j<=copy; j++)
			{
				var x = node.x;
				var y = node.y;
				var z = node.z;

				var x_off = x - ax;
				var y_off = y - ay;
				var z_off = z - az;

				var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
				var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
				var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);

				var x_new = x_rot + ax; 
				var y_new = y_rot + ay; 
				var z_new = z_rot + az;

				var label = Node.NextFreeLabel(m);
				var node = new Node(m, label, x_new, y_new, z_new);
				node_lookup[nodes[i].nid][j] = label;
			}
		}
		for(var k=0; k<pids.length; k++) // cycle the parts
		{
			var p = Part.GetFromID(m, pids[k]);
			Message("Part: "+p.pid+"  Type: "+p.element_type);
			
			var t2flag = AllocateFlag();
			p.SetFlag(t2flag);
			m.PropagateFlag(t2flag);

			// beams
			if(p.element_type == "BEAM")
			{
				var beams = Beam.GetFlagged(m, t2flag);
				for(var i=0; i<beams.length; i++)
				{
					var beam = beams[i]
					var epid = beam.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[beam.n1][j];
						var n2_new = node_lookup[beam.n2][j];
						var n3_new = node_lookup[beam.n3][j];

						var label = Beam.NextFreeLabel(m);
						var b_new = new Beam(m, label, epid, n1_new, n2_new, n3_new);
					}
				}
			}
			// shells
			if(p.element_type == "SHELL")
			{
				var shells = Shell.GetFlagged(m, t2flag);
				for(var i=0; i<shells.length; i++)
				{
					var shell = shells[i];
					var epid = shell.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[shell.n2][j];
						var n2_new = node_lookup[shell.n1][j];
						var n3_new = node_lookup[shell.n4][j];
						var n4_new = node_lookup[shell.n3][j];

						var label = Shell.NextFreeLabel(m);
						var s_new = new Shell(m, label, epid, n1_new, n2_new, n3_new, n4_new);
					}
				}
			}
			// solids
			if(p.element_type == "SOLID")
			{
				var solids = Solid.GetFlagged(m, t2flag);
				for(var i=0; i<solids.length; i++)
				{
					var solid = solids[i];
					var epid = solid.pid;
					for(var j=1; j<=copy; j++)
					{
						if(solid.nodes == 4)
						{
							var n1_new = node_lookup[solid.n2][j];
							var n2_new = node_lookup[solid.n1][j];
							var n3_new = node_lookup[solid.n3][j];
							var n4_new = node_lookup[solid.n4][j];
							var n5_new = node_lookup[solid.n4][j];
							var n6_new = node_lookup[solid.n4][j];
							var n7_new = node_lookup[solid.n4][j];
							var n8_new = node_lookup[solid.n4][j];
						}
						else
						{
							var n1_new = node_lookup[solid.n2][j];
							var n2_new = node_lookup[solid.n1][j];
							var n3_new = node_lookup[solid.n4][j];
							var n4_new = node_lookup[solid.n3][j];
							var n5_new = node_lookup[solid.n6][j];
							var n6_new = node_lookup[solid.n5][j];
							var n7_new = node_lookup[solid.n8][j];
							var n8_new = node_lookup[solid.n7][j];
						}

						var label = Solid.NextFreeLabel(m);
						var s_new = new Solid(m, label, epid, n1_new, n2_new, n3_new, n4_new, n5_new, n6_new, n7_new, n8_new);
					}
				}
			}
			ReturnFlag(t2flag);
		}
	}
	ReturnFlag(tflag);
}
///////////////////////////////////////////////////////////
////////////////Rotate Node//////////////////
function rotate_node(m, nodes, ax,ay,az, axis, angle, copy)
{
	// nodes: array of nodes to rotate
	// ax,ay,az: center of rotation
	// axis: x=1, y=2, z=3
	// angle: rotation angle in degrees
	// copy: 0=move, n=num of copies

	var cos_ang = Math.cos(angle /180 * Math.PI);
	var sin_ang = Math.sin(angle /180 * Math.PI);

	// setup rotaton matrix
	var rot_m  = new Array;
	if(axis == 1)  // x axis
	{
		rot_m[0] = [1,0,0];
		rot_m[1] = [0,cos_ang,-sin_ang]; 
		rot_m[2] = [0,sin_ang,cos_ang]; 
	}
	else if(axis == 2)  // y axis
	{
		rot_m[0] = [cos_ang,0,sin_ang]; 
		rot_m[1] = [0,1,0];
		rot_m[2] = [-sin_ang,0,cos_ang]; 
	}
	else if(axis == 3)  // z axis
	{
		rot_m[0] = [cos_ang,-sin_ang,0]; 
		rot_m[1] = [sin_ang,cos_ang,0]; 
		rot_m[2] = [0,0,1];
	}

	// Cycle through the nodes
	for(var i=0; i<nodes.length; i++)
	{
		if(copy == 0) // move node
		{
			var x = nodes[i].x;
			var y = nodes[i].y;
			var z = nodes[i].z;

			var x_off = x - ax;
			var y_off = y - ay;
			var z_off = z - az;

			var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
			var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
			var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);

			var x_new = x_rot + ax; 
			var y_new = y_rot + ay; 
			var z_new = z_rot + az;

			nodes[i].x = x_new;
			nodes[i].y = y_new;
			nodes[i].z = z_new;
		}
		else // copies nodes
		{
			var node = nodes[i];

			for(var j=1; j<=copy; j++)
			{
				var x = node.x;
				var y = node.y;
				var z = node.z;

				var x_off = x - ax;
				var y_off = y - ay;
				var z_off = z - az;
				
				var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
				var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
				var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);
				
				var x_new = x_rot + ax; 
				var y_new = y_rot + ay; 
				var z_new = z_rot + az;
				
				var label = Node.NextFreeLabel(m);
				var node = new Node(m, label, x_new, y_new, z_new);
			}
		}
	}
}
///////////////////////////////////////////////////////////
/////////////////Rotate Parts///////////////////
function rotate_parts(m, pids, ax,ay,az, axis, angle, copy)
{
	// pids: part id array
	// ax,ay,az: center of rotation
	// axis: x=1, y=2, z=3
	// angle: rotation angle in degrees
	// copy: 0=move, n=num of copies

	var cos_ang = Math.cos(angle /180 * Math.PI);
	var sin_ang = Math.sin(angle /180 * Math.PI);

	// setup rotaton matrix
	var rot_m  = new Array;
	if(axis == 1)  // x axis
	{
		rot_m[0] = [1,0,0];
		rot_m[1] = [0,cos_ang,-sin_ang]; 
		rot_m[2] = [0,sin_ang,cos_ang]; 
	}
	else if(axis == 2)  // y axis
	{
		rot_m[0] = [cos_ang,0,sin_ang]; 
		rot_m[1] = [0,1,0];
		rot_m[2] = [-sin_ang,0,cos_ang]; 
	}
	else if(axis == 3)  // z axis
	{
		rot_m[0] = [cos_ang,-sin_ang,0]; 
		rot_m[1] = [sin_ang,cos_ang,0]; 
		rot_m[2] = [0,0,1];
	}

	// flag the nodes and element on the part
	var tflag = AllocateFlag();
	for(var i=0; i<pids.length; i++) // cycle through the parts
	{
		var p = Part.GetFromID(m, pids[i]);
		p.SetFlag(tflag);
	}
	m.PropagateFlag(tflag);

	// Process the nodes
	var nodes = Node.GetFlagged(m, tflag);
	var node_lookup = new Object;

	if(copy == 0) //just move node
	{
		for(var i=0; i<nodes.length; i++)
		{
			var x = nodes[i].x;
			var y = nodes[i].y;
			var z = nodes[i].z;

			var x_off = x - ax;
			var y_off = y - ay;
			var z_off = z - az;

			var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
			var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
			var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);

			var x_new = x_rot + ax; 
			var y_new = y_rot + ay; 
			var z_new = z_rot + az;

			nodes[i].x = x_new;
			nodes[i].y = y_new;
			nodes[i].z = z_new;
		}
	}
	else // copies nodes
	{
		for(var i=0; i<nodes.length; i++)
		{
			node_lookup[nodes[i].nid] = new Object;
			var node = nodes[i];

			for(var j=1; j<=copy; j++)
			{
				var x = node.x;
				var y = node.y;
				var z = node.z;

				var x_off = x - ax;
				var y_off = y - ay;
				var z_off = z - az;

				var x_rot = (rot_m[0][0]*x_off) + (rot_m[0][1]*y_off) + (rot_m[0][2]*z_off);
				var y_rot = (rot_m[1][0]*x_off) + (rot_m[1][1]*y_off) + (rot_m[1][2]*z_off);
				var z_rot = (rot_m[2][0]*x_off) + (rot_m[2][1]*y_off) + (rot_m[2][2]*z_off);

				var x_new = x_rot + ax; 
				var y_new = y_rot + ay; 
				var z_new = z_rot + az;

				var label = Node.NextFreeLabel(m);
				var node = new Node(m, label, x_new, y_new, z_new);
				node_lookup[nodes[i].nid][j] = label;
			}
		}
		for(var k=0; k<pids.length; k++) // cycle the parts
		{
			var p = Part.GetFromID(m, pids[k]);
			Message("Part: "+p.pid+"  Type: "+p.element_type);

			var t2flag = AllocateFlag();
			p.SetFlag(t2flag);
			m.PropagateFlag(t2flag);

			// beams
			if(p.element_type == "BEAM")
			{
				var beams = Beam.GetFlagged(m, t2flag);
				for(var i=0; i<beams.length; i++)
				{
					var beam = beams[i];
					var epid = beam.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[beam.n1][j];
						var n2_new = node_lookup[beam.n2][j];
						var n3_new = node_lookup[beam.n3][j];

						var label = Beam.NextFreeLabel(m);
						var b_new = new Beam(m, label, epid, n1_new, n2_new, n3_new);
					}
				}
			}
			// shells
			if(p.element_type == "SHELL")
			{
				var shells = Shell.GetFlagged(m, t2flag);
				for(var i=0; i<shells.length; i++)
				{
					var shell = shells[i];
					var epid = shell.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[shell.n1][j];
						var n2_new = node_lookup[shell.n2][j];
						var n3_new = node_lookup[shell.n3][j];
						var n4_new = node_lookup[shell.n4][j];

						var label = Shell.NextFreeLabel(m);
						var s_new = new Shell(m, label, epid, n1_new, n2_new, n3_new, n4_new);
					}
				}
			}
			// solids
			if(p.element_type == "SOLID")
			{
				var solids = Solid.GetFlagged(m, t2flag);
				for(var i=0; i<solids.length; i++)
				{
					var solid = solids[i];
					var epid = solid.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[solid.n1][j];
						var n2_new = node_lookup[solid.n2][j];
						var n3_new = node_lookup[solid.n3][j];
						var n4_new = node_lookup[solid.n4][j];
						var n5_new = node_lookup[solid.n5][j];
						var n6_new = node_lookup[solid.n6][j];
						var n7_new = node_lookup[solid.n7][j];
						var n8_new = node_lookup[solid.n8][j];

						var label = Solid.NextFreeLabel(m);
						var s_new = new Solid(m, label, epid, n1_new, n2_new, n3_new, n4_new, n5_new, n6_new, n7_new, n8_new);
					}
				}
			}
			ReturnFlag(t2flag);
		}
	}
	ReturnFlag(tflag);
}
///////////////////////////////////////////////////////////
///////////////Translate Node///////////////
function translate_node(m, nodes, tx,ty,tz, copy)
{
	// nodes: array of nodes to rotate
	// tx,ty,az: offset
	// copy: 0=move, n=num of copies

	// Cycle through the nodes
	for(var i=0; i<nodes.length; i++)
	{
		if(copy == 0) // move node
		{
			nodes[i].x = nodes[i].x + tx;
			nodes[i].y = nodes[i].y + ty;
			nodes[i].z = nodes[i].z + tz;
		}
		else // copies nodes
		{
			var node = nodes[i];
			for(var j=1; j<=copy; j++)
			{
				var x_new = node.x + tx;
				var y_new = node.y + ty;
				var z_new = node.z + tz;

				var label = Node.NextFreeLabel(m);
				var node = new Node(m, label, x_new, y_new, z_new);
			}
		}
	}
}
///////////////////////////////////////////////////////////
////////////////Translate Part//////////////
function translate_parts(m, pids, tx,ty,tz, copy)
{
	// pids: part id array
	// tx,ty,az: offset
	// copy: 0=move, n=num of copies

	// flag the nodes and element on the parts
	var tflag = AllocateFlag();
	for(var i=0; i<pids.length; i++) // cycle through the parts
	{
		var p = Part.GetFromID(m, pids[i]);
		p.SetFlag(tflag);
	}
	m.PropagateFlag(tflag);

	// Process the nodes
	var nodes = Node.GetFlagged(m, tflag);
	var node_lookup = new Object;

	if(copy == 0) // just move the flagged node
	{
		for(var i=0; i<nodes.length; i++)
		{
			nodes[i].x = nodes[i].x + tx;
			nodes[i].y = nodes[i].y + ty;
			nodes[i].z = nodes[i].z + tz;
		}
	}
	else // copy the nodes & elements
	{
		for(var i=0; i<nodes.length; i++)
		{
			node_lookup[nodes[i].nid] = new Object;
			
			var node = nodes[i];
			for(var j=1; j<=copy; j++)
			{
				var x_new = node.x + tx;
				var y_new = node.y + ty;
				var z_new = node.z + tz;

				var label = Node.NextFreeLabel(m);
				var node = new Node(m, label, x_new, y_new, z_new);
				node_lookup[nodes[i].nid][j] = label;
			}
		}

	// Process Elements (Copy only)
		for(var k=0; k<pids.length; k++) // cycle the parts
		{
			var p = Part.GetFromID(m, pids[k]);
			Message("Part: "+p.pid+"  Type: "+p.element_type);

			var t2flag = AllocateFlag();
			p.SetFlag(t2flag);
			m.PropagateFlag(t2flag);

			// beams
			if(p.element_type == "BEAM")
			{
				var beams = Beam.GetFlagged(m, t2flag);
				for(var i=0; i<beams.length; i++)
				{
					var beam = beams[i];
					var epid = beam.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[beam.n1][j];
						var n2_new = node_lookup[beam.n2][j];
						var n3_new = node_lookup[beam.n3][j];

						var label = Beam.NextFreeLabel(m);
						var b_new = new Beam(m, label, epid, n1_new, n2_new, n3_new);
					}
				}
			}
			// shells
			if(p.element_type == "SHELL")
			{
				var shells = Shell.GetFlagged(m, t2flag);
				for(var i=0; i<shells.length; i++)
				{
					var shell = shells[i];
					var epid = shell.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[shell.n1][j];
						var n2_new = node_lookup[shell.n2][j];
						var n3_new = node_lookup[shell.n3][j];
						var n4_new = node_lookup[shell.n4][j];

						var label = Shell.NextFreeLabel(m);
						var s_new = new Shell(m, label, epid, n1_new, n2_new, n3_new, n4_new);
					}
				}
			}
			// solids
			if(p.element_type == "SOLID")
			{
				var solids = Solid.GetFlagged(m, t2flag);
				for(var i=0; i<solids.length; i++)
				{
					var solid = solids[i]
					var epid = solid.pid;
					for(var j=1; j<=copy; j++)
					{
						var n1_new = node_lookup[solid.n1][j];
						var n2_new = node_lookup[solid.n2][j];
						var n3_new = node_lookup[solid.n3][j];
						var n4_new = node_lookup[solid.n4][j];
						var n5_new = node_lookup[solid.n5][j];
						var n6_new = node_lookup[solid.n6][j];
						var n7_new = node_lookup[solid.n7][j];
						var n8_new = node_lookup[solid.n8][j];

						var label = Solid.NextFreeLabel(m);
						var s_new = new Solid(m, label, epid, n1_new, n2_new, n3_new, n4_new, n5_new, n6_new, n7_new, n8_new);
					}
				}
			}
			ReturnFlag(t2flag);
		}
	}
	ReturnFlag(tflag);
}
///////////////////////////////////////////////////////////
