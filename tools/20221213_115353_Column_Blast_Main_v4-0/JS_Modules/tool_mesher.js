
/////////////////Area Mesh///////////////////
function area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2)
{
	// pid: part id for new elements
	// n1,n2,n3,n4: corner nodes of the area
	// elem1: elements along n1-n2 edge
	// elem2: elements along n2-n3 edge

	// Create Nodes
	var nodes = new Array;
	for(var i=0; i<=elem1; i++)
	{
		nodes[i] = new Array;

		for(var j=0; j<=elem2; j++)
		{
			//Use given nodes for the corners
			if(i==0 && j==0) nodes[i][j] = n1;
			else if(i==elem1 && j==0) nodes[i][j] = n2;
			else if(i==elem1 && j==elem2) nodes[i][j] = n3;
			else if(i==0 && j==elem2) nodes[i][j] = n4;

			//Create other nodes
			else
			{
				var x_start = n1.x + (n4.x - n1.x)/elem2 *(j);
				var x_end = n2.x + (n3.x - n2.x)/elem2 *(j);
				var x_len = x_end - x_start;
				var x = x_start + (x_len /elem1) * i;

				var y_start = n1.y + (n4.y - n1.y)/elem2 *(j);
				var y_end = n2.y + (n3.y - n2.y)/elem2 *(j);
				var y_len = y_end - y_start;
				var y = y_start + (y_len /elem1) * i;

				var z_start = n1.z + (n4.z - n1.z)/elem2 *(j);
				var z_end = n2.z + (n3.z - n2.z)/elem2 *(j);
				var z_len = z_end - z_start;
				var z = z_start + (z_len /elem1) * i;

				var label = Node.NextFreeLabel(m);
				nodes[i][j] = new Node(m, label, x, y, z);
			}

			//Create shell elements when not doing first row or column
			if(i>0 && j>0)
			{
				var slab = Shell.NextFreeLabel(m);
				var s = new Shell( m, slab, pid, nodes[i-1][j-1].nid, nodes[i][j-1].nid, nodes[i][j].nid, nodes[i-1][j].nid );
			}
		}
	}
}
/////////////////Extrude Mesh///////////////////
function extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)
{
	// shell_pid: shell part to extrude
	// solid_pid: solid part to create elements in 
	// length: distance to extrude the solids
	// elem: elements along length
	// dir: direction to extrude 1=X, 2=Y, 3=Z
	
	//calulate layer height
	var offset = length / elem;

	// flag the nodes and element on the parts
	var tflag = AllocateFlag();
	var p = Part.GetFromID(m, shell_pid);
	p.SetFlag(tflag);
	m.PropagateFlag(tflag);
	
	var nodes = Node.GetFlagged(m, tflag);
	var shells = Shell.GetFlagged(m, tflag);

	for(var i=0; i<elem; i++)
	{
		if(i==0) var node_lookup1 = new Object; // if first layer then setup lower lookup array
		var node_lookup2 = new Object;
		
		//create new node layer
		for(var j=0; j<nodes.length; j++)
		{
			if(i==0) node_lookup1[nodes[j].nid] = nodes[j].nid; // if first layer then populate lower lookup array

			// caclulate node offset
			if(dir == 1) // X direction
			{
				var x_new = (offset*(i+1)) + nodes[j].x;
				var y_new = nodes[j].y;
				var z_new = nodes[j].z;
			}
			else if(dir == 2) // Y direction
			{
				var x_new = nodes[j].x;
				var y_new = (offset*(i+1)) + nodes[j].y;
				var z_new = nodes[j].z;
			}
			else if(dir == 3) // Z direction
			{
				var x_new = nodes[j].x;
				var y_new = nodes[j].y;
				var z_new = (offset*(i+1)) + nodes[j].z;
			}

			// create new nodes
			var label = Node.NextFreeLabel(m);
			var node = new Node(m, label, x_new, y_new, z_new);
			node_lookup2[nodes[j].nid] = label;
		}
		// create solid elements
		for(var j=0; j<shells.length; j++)
		{
			var shell = shells[j];

			//Shell normal vector in the extrude direction
			if(dir==1) shell_n_comp = shell.NormalVector()[0];
			else if(dir==2) shell_n_comp = shell.NormalVector()[1];
			else if(dir==3) shell_n_comp = shell.NormalVector()[2];

			if(shell.nodes == 3) // tri element
			{
				if(Math.sign(shell_n_comp) == Math.sign(length) ) // shell normal in extrude direction
				{
					var n1_new = node_lookup1[shell.n2];
					var n2_new = node_lookup1[shell.n1];
					var n3_new = node_lookup2[shell.n1];
					var n4_new = node_lookup2[shell.n2];

					var n5_new = node_lookup1[shell.n3];
					var n6_new = node_lookup1[shell.n3];
					
					var n7_new = node_lookup2[shell.n3];
					var n8_new = node_lookup2[shell.n3];
				}
				else // shell normal opposite direction to extrude dimension
				{
					var n1_new = node_lookup1[shell.n1];
					var n2_new = node_lookup1[shell.n2];
					var n3_new = node_lookup2[shell.n2];
					var n4_new = node_lookup2[shell.n1];

					var n5_new = node_lookup1[shell.n3];
					var n6_new = node_lookup1[shell.n3];
					
					var n7_new = node_lookup2[shell.n3];
					var n8_new = node_lookup2[shell.n3];
				}
			}
			else // quad element
			{
				if(Math.sign(shell_n_comp) == Math.sign(length) ) // shell normal in extrude direction
				{
					var n1_new = node_lookup1[shell.n1];
					var n2_new = node_lookup1[shell.n2];
					var n3_new = node_lookup1[shell.n3];
					var n4_new = node_lookup1[shell.n4];
					
					var n5_new = node_lookup2[shell.n1];
					var n6_new = node_lookup2[shell.n2];
					var n7_new = node_lookup2[shell.n3];
					var n8_new = node_lookup2[shell.n4];
				}
				else // shell normal opposite direction to extrude dimension
				{
					var n1_new = node_lookup1[shell.n1];
					var n2_new = node_lookup1[shell.n4];
					var n3_new = node_lookup1[shell.n3];
					var n4_new = node_lookup1[shell.n2];
					
					var n5_new = node_lookup2[shell.n1];
					var n6_new = node_lookup2[shell.n4];
					var n7_new = node_lookup2[shell.n3];
					var n8_new = node_lookup2[shell.n2];
				}
			}

			var label = Solid.NextFreeLabel(m);
			var solid_new = new Solid(m, label, solid_pid, n1_new, n2_new, n3_new, n4_new, n5_new, n6_new, n7_new, n8_new);
		}
		var node_lookup1 = node_lookup2;
	}
	ReturnFlag(tflag);
}
/////////////////Line Mesh///////////////////
function line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
{
	// pid: part id for new elements
	// x1,y1,z1: start of the beam line 
	// x2,y2,z2: end of the beam line
	// vx,vy,vz: beam normal vector (i.e third node plane) 
	// elem: elements along the line

	// Element length
	var elem_len = (Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2) + Math.pow(z2-z1,2)) ) / elem;

	//Find beam normal vector 
	vex = x2-x1;
	vey = y2-y1;
	vez = z2-z1;
	
	vcx = vey*vz - vez*vy;
	vcy = vez*vx - vex*vz;
	vcz = vex*vy - vey*vx;
	
	vnx = vey*vcz - vez*vcy;
	vny = vez*vcx - vex*vcz;
	vnz = vex*vcy - vey*vcx;

	//Normalize the vector
	var vmag = Math.sqrt(Math.pow(vnx,2) + Math.pow(vny,2) + Math.pow(vnz,2));
	var vnx = vnx/vmag;
	var vny = vny/vmag;
	var vnz = vnz/vmag;

	// Create Nodes and Beams
	var nodes = new Array;
	for(var i=0; i<=elem; i++)
	{
		nodes[i] = new Array;

		var x_len = x2 - x1;
		var x = x1 + (x_len /elem) * i;

		var y_len = y2 - y1;
		var y = y1 + (y_len /elem) * i;

		var z_len = z2 - z1;
		var z = z1 + (z_len /elem) * i;

		var label = Node.NextFreeLabel(m);
		nodes[i] = new Node(m, label, x, y, z);

		//Create beam elements after first node
		if(i>0)
		{
			// Setup third node based on normal vector
			var n3x = nodes[i-1].x + (vnx*elem_len/2); 
			var n3y = nodes[i-1].y + (vny*elem_len/2); 
			var n3z = nodes[i-1].z + (vnz*elem_len/2);
			var label = Node.NextFreeLabel(m);
			var n3 = new Node(m, label, n3x, n3y, n3z); 

			var blab = Beam.NextFreeLabel(m);
			var b = new Beam( m, blab, pid, nodes[i-1].nid, nodes[i].nid, n3.nid);
		}
	}
}
/////////////////Plate Mesh///////////////////
function plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
{
	// pid: part id for new elements
	// cx,cy,cz: center of the plate
	// len1: x length
	// len2: y length
	// elem1: elements along x length
	// elem2: elements along y length

	//Create corner coordinates
	var n1 = new Object
	n1.x = cx - (len1/2);
	n1.y = cy - (len2/2);
	n1.z = cz;
	var n2 = new Object
	n2.x = cx + (len1/2);
	n2.y = cy - (len2/2);
	n2.z = cz;
	var n3 = new Object
	n3.x = cx + (len1/2);
	n3.y = cy + (len2/2);
	n3.z = cz;
	var n4 = new Object
	n4.x = cx - (len1/2);
	n4.y = cy + (len2/2);
	n4.z = cz;


	// Create Nodes and Shells
	var nodes = new Array;
	for(var i=0; i<=elem1; i++)
	{
		nodes[i] = new Array;

		for(var j=0; j<=elem2; j++)
		{
			var x_start = n1.x + (n4.x - n1.x)/elem2 *(j);
			var x_end = n2.x + (n3.x - n2.x)/elem2 *(j);
			var x_len = x_end - x_start;
			var x = x_start + (x_len /elem1) * i;

			var y_start = n1.y + (n4.y - n1.y)/elem2 *(j);
			var y_end = n2.y + (n3.y - n2.y)/elem2 *(j);
			var y_len = y_end - y_start;
			var y = y_start + (y_len /elem1) * i;

			var z_start = n1.z + (n4.z - n1.z)/elem2 *(j);
			var z_end = n2.z + (n3.z - n2.z)/elem2 *(j);
			var z_len = z_end - z_start;
			var z = z_start + (z_len /elem1) * i;

			var label = Node.NextFreeLabel(m);

			nodes[i][j] = new Node(m, label, x, y, z);

			//Create shell elements when not doing first row or column
			if(i>0 && j>0)
			{
				var slab = Shell.NextFreeLabel(m);
				var s = new Shell( m, slab, pid, nodes[i-1][j-1].nid, nodes[i][j-1].nid, nodes[i][j].nid, nodes[i-1][j].nid );
			}
		}
	}
}
/////////////////Ruled Mesh///////////////////
function ruled_mesh(m, pid, nset1, nset2, elems)
{
	// pid: part id for new elements
	// nset1, nset2: array of node object - two row of nodes to mesh between
	// elems: number of elements to mesh

	if(nset1.length != nset2.length) return // nset length are not the same

	// Create Nodes
	var nodes = new Array;

	for(var i=0; i<nset1.length; i++)
	{
		nodes[i] = new Array;

		for(var j=0; j<=elems; j++)
		{
			//Use given nodes for first and last rows
			if(j==0) nodes[i][j] = nset1[i];
			else if(j==elems) nodes[i][j] = nset2[i];

			//Create other nodes
			else
			{
				var x_start = nset1[i].x;
				var x_end = nset2[i].x;
				var x_len = x_end - x_start;
				var x = x_start + (x_len /elems) * j;

				var y_start = nset1[i].y;
				var y_end = nset2[i].y; 
				var y_len = y_end - y_start;
				var y = y_start + (y_len /elems) * j;

				var z_start = nset1[i].z;
				var z_end = nset2[i].z;
				var z_len = z_end - z_start;
				var z = z_start + (z_len /elems) * j;

				var label = Node.NextFreeLabel(m);
				nodes[i][j] = new Node(m, label, x, y, z);
			} 

			//Create shell elements when not doing first row or column
			if(i>0 && j>0)
			{
				var slab = Shell.NextFreeLabel(m);
				var s = new Shell( m, slab, pid, nodes[i-1][j-1].nid, nodes[i][j-1].nid, nodes[i][j].nid, nodes[i-1][j].nid );
			}
		}
	}
}
///////////////////////////////////////////////////////////////