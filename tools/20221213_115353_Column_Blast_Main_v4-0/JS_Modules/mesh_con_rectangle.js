///////////// Concrete Rectangle with Stirrups ///////
function mesh_con_rect_stir(m, solid_pid, rebar_v_pid, rebar_h_pid, rebar_sx_pid, rebar_sy_pid, a,b,c,d,e,f,g,h,i,sx,sy,j,k,l)
{
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var cover_thick = c ;
	
	var rebar_num_w = d; 
	var rebar_num_d = e; 
	var stirrup_x_list = f;
	var stirrup_y_list = g;
	var rebar_dia_v =  h;
	var rebar_dia_h =  i;
	var rebar_dia_sx =  sx;
	var rebar_dia_sy =  sy;

	var hoop_space = j;

	var column_s_height = k;
	var element_base = l;

	// Edge distance to hoop rebar
	var edge_h_dist = cover_thick + (rebar_dia_h/2); 

	// Edge distance to vert rebar
	var edge_v_dist = cover_thick + rebar_dia_h + (rebar_dia_v/2); 

	// Distance (gap) between hoop and vert rebar
	var  h_v_dist = (rebar_dia_h/2) + (rebar_dia_v/2); 

	// Element Size - based on element through cover thickness
	var ele_size = edge_h_dist / element_base;

	// Column Height - adjusted to be a certain number of hoop spacings
	var hoop_num = Math.round(column_s_height/hoop_space);
	var column_height = hoop_space * hoop_num;

	var solid_num_hoop = Math.round( (hoop_space-2*h_v_dist) / ele_size);
	var solid_size =  hoop_space / solid_num_hoop;

	//90deg hook length
	if(rebar_dia_sx < (0.75*0.0254) ) var hook1_len_sx = Math.max( (3*0.0254), (6*rebar_dia_sx) ); // smaller than #6 bars
	else var hook1_len_sx = 12 * rebar_dia_sx;

	if(rebar_dia_sy < (0.75*0.0254) ) var hook1_len_sy = Math.max( (3*0.0254), (6*rebar_dia_sy) ); // smaller than #6 bars
	else var hook1_len_sy = 12 * rebar_dia_sy;
	
	//135deg hook length
	var hook2_len_sx = Math.max( (3*0.0254), (6*rebar_dia_sx) ); 
	var hook2_len_sy = Math.max( (3*0.0254), (6*rebar_dia_sy) );

	// Reverse Y Stirrup array
	stirrup_y_list.reverse();

	//////Shell Elements for Extrusion /////////////
	//Create Blocks by Width
	// Outer Blocks
	var shell_pid = 1;
	var y_loc = (sec_depth/2)-(edge_h_dist/2);
	var y_size = edge_h_dist;
	var y_num = element_base;
	block_width(y_loc, y_size, y_num, shell_pid);
	block_width(-1*y_loc, y_size, y_num, shell_pid);

	var y_loc = (sec_depth/2)-edge_h_dist-(h_v_dist/2);
	var y_size = h_v_dist;
	var y_num = 1;
	block_width(y_loc, y_size, y_num, shell_pid);
	block_width(-1*y_loc, y_size, y_num, shell_pid);

	// Middle Blocks
	var rebar_space_d = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1) 
	var elem_rebar_d = Math.round( rebar_space_d / ele_size );
	var count = rebar_num_d-2;

	for(var i=0; i<=count-1; i++)
	{
		var offset = rebar_space_d*i

		var y_loc = (sec_depth/2) - edge_v_dist - offset - ( (rebar_space_d - h_v_dist)/2 );
		var y_size = rebar_space_d - h_v_dist;
		var y_num = elem_rebar_d;
		block_width(y_loc, y_size, y_num, shell_pid);

		var y_loc = (sec_depth/2) - edge_v_dist - offset - rebar_space_d + (h_v_dist/2);
		var y_size = h_v_dist;
		var y_num = 1;
		block_width(y_loc, y_size, y_num, shell_pid);

		var fin_count = i;
	}

	// Last Block
	var offset = rebar_space_d * (fin_count+1)
	var y_loc = (sec_depth/2) - edge_v_dist - offset - (rebar_space_d/2);
	var y_size = rebar_space_d;
	var y_num = elem_rebar_d;
	block_width(y_loc, y_size, y_num, shell_pid);

	//Merge Nodes
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	////////////Solid Elements//////////////////////////////////////////////
	// Create Solid Elements - Extrude the Shell Elements
	var solid_size =  hoop_space / Math.round( hoop_space / ele_size);
	var solid_num =  Math.round(column_s_height / solid_size);
	var solid_height = solid_size * solid_num; 

	// Lower Layers
	var pid = 1;
	var length = 2*h_v_dist; 
	var elem = 2;
	var dir = 3;
	var pext = extrude_mesh(m, pid, solid_pid, length, elem, dir)

	// Upper Layers
	var pid = 1;
	var length = -1*(hoop_space-2*h_v_dist); 
	var elem = solid_num_hoop;
	var dir = 3;
	var pext = extrude_mesh(m, pid, solid_pid, length, elem, dir)

	// Delete Shell Elements
	var dflag = AllocateFlag();
	var p1 = Part.GetFromID(m, shell_pid);
	var dflag = AllocateFlag();
	p1.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	////////////////// REBAR  /////////////////////////////////
	// Create Vertical Rebar
	var rebar_w_pid = 3000;
	var beam_len = solid_size;
	var rebar_w_spacing = (sec_width - (2*edge_v_dist))/(rebar_num_w-1);

	var pid = rebar_w_pid;
	var x1 = -1*((sec_width/2)-edge_v_dist);
	var y1 = (sec_depth/2)-edge_v_dist;
	var z1 = 0;
	var x2 = -1*((sec_width/2)-edge_v_dist);
	var y2 = (sec_depth/2)-edge_v_dist;
	var z2 = 2*h_v_dist;
	var vx = 0;
	var vy = 1;
	var vz = 0;
	var elem = 2;
	var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
	var mline = line_mesh(m, pid, x1,(-1*y1),z1, x2,(-1*y2),z2, vx,vy,vz, elem);

	var pid = rebar_w_pid;
	var x1 = -1*((sec_width/2)-edge_v_dist);
	var y1 = (sec_depth/2)-edge_v_dist;
	var z1 = 0;
	var x2 = -1*((sec_width/2)-edge_v_dist);
	var y2 = (sec_depth/2)-edge_v_dist;
	var z2 = -1*(hoop_space-2*h_v_dist); 
	var vx = 0;
	var vy = 1;
	var vz = 0;
	var elem = solid_num_hoop;
	var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
	var mline = line_mesh(m, pid, x1,(-1*y1),z1, x2,(-1*y2),z2, vx,vy,vz, elem);

	var pids = [rebar_w_pid];
	var tx = rebar_w_spacing 
	var ty = 0;
	var tz = 0;
	var copy = rebar_num_w - 1;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy)

	if(rebar_num_d > 2)
	{
		var rebar_d_pid = 4000;
		var beam_len = solid_size;
		var rebar_d_spacing = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1);

		var pid = rebar_d_pid;
		var x1 = (sec_width/2)-edge_v_dist;
		var y1 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z1 = 0;
		var x2 = (sec_width/2)-edge_v_dist;
		var y2 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z2 = 2*h_v_dist;
		var vx = 0;
		var vy = 1;
		var vz = 0;
		var elem = 2;
		var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
		var mline = line_mesh(m, pid, (-1*x1),y1,z1, (-1*x2),y2,z2, vx,vy,vz, elem);

		var pid = rebar_d_pid;
		var x1 = (sec_width/2)-edge_v_dist;
		var y1 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z1 = 0;
		var x2 = (sec_width/2)-edge_v_dist;
		var y2 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z2 = -1*(hoop_space-2*h_v_dist); 
		var vx = 0;
		var vy = 1;
		var vz = 0;
		var elem = solid_num_hoop;
		var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
		var mline = line_mesh(m, pid, (-1*x1),y1,z1, (-1*x2),y2,z2, vx,vy,vz, elem);

		if(rebar_num_d > 3)
		{
			var pids = [rebar_d_pid];
			var tx = 0;
			var ty = rebar_d_spacing 
			var tz = 0;
			var copy = rebar_num_d - 3;
			var ptran = translate_parts(m, pids, tx,ty,tz, copy)
		}
	}

	Beam.ForEach(m, bpid);
	function bpid(b)
	{
		b.pid = rebar_v_pid;
	}

	var dflag = AllocateFlag();
	var p3 = Part.GetFromID(m, rebar_w_pid);
	p3.SetFlag(dflag);
	if(rebar_num_d > 2)
	{
		var p4 = Part.GetFromID(m, rebar_d_pid);
		p4.SetFlag(dflag);
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	// Create Hoop Rebar
	//Corners
	var rebar_h1_pid = 5000;

	var pid = rebar_h1_pid;
	var x1 = (sec_width/2)-edge_h_dist;
	var y1 = (sec_depth/2)-edge_h_dist;
	var z1 = 0;
	var x2 = (sec_width/2)-edge_h_dist - h_v_dist;
	var y2 = (sec_depth/2)-edge_h_dist;
	var z2 = 0;
	var vx = 0;
	var vy = 0;
	var vz = 1;
	var elem = 1;
	var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);

	var pid = rebar_h1_pid;
	var x1 = (sec_width/2)-edge_h_dist;
	var y1 = (sec_depth/2)-edge_h_dist;
	var z1 = 0;
	var x2 = (sec_width/2)-edge_h_dist;
	var y2 = (sec_depth/2)-edge_h_dist - h_v_dist;
	var z2 = 0;
	var vx = 0;
	var vy = 0;
	var vz = 1;
	var elem = 1;
	var mline = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);

	var pids = [rebar_h1_pid];
	var axis = 1;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)
	
	var pids = [rebar_h1_pid];
	var axis = 2;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	// Depth Middle 
	var rebar_h2_pid = 6000;
	var rebar_space_d = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1) 
	var elem_rebar_d = Math.round( rebar_space_d / ele_size );
	var side_count = rebar_num_d-2;

	var count = rebar_inner2( (sec_width/2)-edge_h_dist, (sec_depth/2)-edge_v_dist, 0, 0, rebar_space_d, 0, h_v_dist, side_count, elem_rebar_d, rebar_h2_pid );
	var count = rebar_inner1( (sec_width/2)-edge_h_dist, (sec_depth/2)-edge_v_dist-(rebar_space_d*count), 0, 0, rebar_space_d, 1, elem_rebar_d, rebar_h2_pid );

	var count = rebar_inner2( (-1*sec_width/2)+edge_h_dist, (sec_depth/2)-edge_v_dist, 0, 0, rebar_space_d, 0, h_v_dist, side_count, elem_rebar_d, rebar_h2_pid );
	var count = rebar_inner1( (-1*sec_width/2)+edge_h_dist, (sec_depth/2)-edge_v_dist-(rebar_space_d*count), 0, 0, rebar_space_d, 1, elem_rebar_d, rebar_h2_pid );

	// Width Middle 
	var rebar_h3_pid = 7000;
	var rebar_space_w = (sec_width - (2*edge_v_dist))/(rebar_num_w-1) 
	var elem_rebar_w = Math.round( rebar_space_w / ele_size );
	var side_count = rebar_num_w-2;

	var count = rebar_inner2( (sec_width/2)-edge_v_dist, (sec_depth/2)-edge_h_dist, 0, rebar_space_w, 0, h_v_dist, 0, side_count, elem_rebar_w, rebar_h3_pid );
	var count = rebar_inner1( (sec_width/2)-edge_v_dist-(rebar_space_w*count), (sec_depth/2)-edge_h_dist, 0, rebar_space_w, 0, 1, elem_rebar_w, rebar_h3_pid );

	var count = rebar_inner2( (sec_width/2)-edge_v_dist, (-1*sec_depth/2)+edge_h_dist, 0, rebar_space_w, 0, h_v_dist, 0, side_count, elem_rebar_w, rebar_h3_pid );
	var count = rebar_inner1( (sec_width/2)-edge_v_dist-(rebar_space_w*count), (-1*sec_depth/2)+edge_h_dist, 0, rebar_space_w, 0, 1, elem_rebar_w, rebar_h3_pid );

	//Tidy Parts
	var mflag = AllocateFlag();
	var p5 = Part.GetFromID(m, rebar_h1_pid);
	p5.SetFlag(mflag);
	var p6 = Part.GetFromID(m, rebar_h2_pid);
	p6.SetFlag(mflag);
	var p7 = Part.GetFromID(m, rebar_h3_pid);
	p7.SetFlag(mflag);
	m.PropagateFlag(mflag);
	var hb = Beam.GetFlagged(m, mflag);
	for(i=0; i<hb.length; i++)
	{
		hb[i].pid = rebar_h_pid;
	}
	ReturnFlag(mflag);

	var dflag = AllocateFlag();
	p5.SetFlag(dflag);
	p6.SetFlag(dflag);
	p7.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	/// Stirrup Rebar ///////
	var rebar_space_w = (sec_width - (2*edge_v_dist))/(rebar_num_w-1) 
	var elem_rebar_w = Math.round( rebar_space_w / ele_size );
	var side_count_w = rebar_num_w-2;

	var rebar_space_d = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1) 
	var elem_rebar_d = Math.round( rebar_space_d / ele_size );
	var side_count_d = rebar_num_d-2;

	var hook = 1;
	for(var i=0; i<=side_count_d-1; i++)
	{
		if(stirrup_x_list[i] == 1)
		{
			var offset = rebar_space_d*i
			var y = (sec_depth/2) - edge_v_dist - rebar_space_d + h_v_dist - offset; 
			var z = h_v_dist;
			if(hook == -1) hook = 1;
			else if(hook == 1) hook = -1;
			if(i==side_count_d-1) var mid = 1;
			else var mid = 0;
			Stirrup_Width(y,z, rebar_space_w, rebar_space_d, elem_rebar_w, elem_rebar_d, side_count_w, rebar_sx_pid, mid, hook, hook1_len_sx, hook2_len_sx);
		}
	}

	var hook = 1;
	for(var i=0; i<=side_count_w-1; i++)
	{
		if(stirrup_y_list[i] == 1)
		{
			var offset = rebar_space_w*i
			var y = (sec_width/2) - edge_v_dist - rebar_space_w + h_v_dist - offset; 
			var z = 2*h_v_dist;
			if(hook == -1) hook = 1;
			else if(hook == 1) hook = -1;
			if(i==side_count_w-1) var mid = 1;
			else var mid = 0;
			Stirrup_Depth(y,z, rebar_space_d, rebar_space_w, elem_rebar_d, elem_rebar_w, side_count_d, rebar_sy_pid, mid, hook, hook1_len_sy, hook2_len_sy);
		}
	}

	/////////// Build Full Column /////////////////////////////////////////

	// Copy Base Block Upwards
	var pids = [solid_pid, rebar_v_pid, rebar_h_pid, rebar_sx_pid, rebar_sy_pid];
	var tx = 0;
	var ty = 0;
	var tz = hoop_space;
	var copy = hoop_num;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy)

	// Move Base Block Upwards
	var pids = [solid_pid, rebar_v_pid,rebar_h_pid, rebar_sx_pid, rebar_sy_pid];tx
	var tx = 0;
	var ty = 0;
	var tz = hoop_space - (2*h_v_dist);
	var copy = 0;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy)

	//find beam and solids with center above solid height, flag and delete
	var dflag = AllocateFlag();
	var s = Solid.GetAll(m);
	for(var i=0; i<s.length; i++)
	{	 
		var scen = find_solid_center(m, s[i]);
		if(scen.z > solid_height) s[i].SetFlag(dflag);
	}
	var b = Beam.GetAll(m);
	for(var i=0; i<b.length; i++)
	{	
		var bcen = find_beam_center(m, b[i]);
		if(bcen.z > solid_height) b[i].SetFlag(dflag);
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	///////////// Set up Beam Third Nodes /////////////////////////
	var dflag = AllocateFlag();
	Beam.ForEach(m, third_node);
	function third_node(b)
	{
		var n3 = Node.GetFromID(m, b.n3);
		n3.SetFlag(dflag);
		var label = Node.NextFreeLabel(m);
		var n3_new = new Node(m, label, n3.x, n3.y, n3.z);
		b.n3 = n3_new.nid;
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	/// Renumber nodes and elements
	var rflag = AllocateFlag();
	Node.FlagAll(m, rflag);
	Solid.FlagAll(m, rflag);
	Beam.FlagAll(m, rflag);
	m.RenumberFlagged(rflag, 1);
	ReturnFlag(rflag);

	///////////Coat the solid elements
	var seg_coat = segment_coat(m, solid_pid, 1);
	var outer_set = Set.GetFromID(m, 1, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, rebar_v_pid:rebar_v_pid, rebar_h_pid:rebar_h_pid, rebar_sx_pid:rebar_sx_pid, rebar_sy_pid:rebar_sy_pid, segment_sid:outer_set.sid};
	return mids;


	////////////////////////////////////
	function block_width(y_loc, y_size, y_num, pid)
	{
		var rebar_space_w = (sec_width - (2*edge_v_dist))/(rebar_num_w-1) 
		var elem_rebar_w = Math.round( rebar_space_w / ele_size );

		var side_count_r = rebar_num_w-2;

		// Outer
		var cx = (sec_width/2) - (edge_h_dist/2) ;
		var cy = y_loc;
		var cz = 0;
		var len1 = edge_h_dist;
		var len2 = y_size;
		var elem1 = element_base;
		var elem2 = y_num;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		var pmash = plate_mesh(m, pid,(-1*cx),cy,cz,len1,len2,elem1,elem2)

		var cx = (sec_width/2) - edge_h_dist - (h_v_dist/2) ;
		var cy = y_loc;
		var cz = 0;
		var len1 = h_v_dist;
		var len2 = y_size;
		var elem1 = 1;
		var elem2 = y_num;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		var pmash = plate_mesh(m, pid,(-1*cx),cy,cz,len1,len2,elem1,elem2)

		// Right Side
		for(var i=0; i<=side_count_r-1; i++)
		{
			var offset = rebar_space_w*i

			var cx = (sec_width/2) -edge_v_dist - offset - ( (rebar_space_w- h_v_dist)/2) ;
			var cy = y_loc;
			var cz = 0;
			var len1 = rebar_space_w - h_v_dist;
			var len2 = y_size;
			var elem1 = elem_rebar_w;
			var elem2 = y_num;
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)

			var cx = (sec_width/2) -edge_v_dist - offset - rebar_space_w + (h_v_dist/2) ;
			var cy = y_loc;
			var cz = 0;
			var len1 = h_v_dist;
			var len2 = y_size;
			var elem1 = 1;
			var elem2 = y_num;
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)

			var fin_count = i;
		}
		// Last Block
		var offset = rebar_space_w*(fin_count+1);
		var cx = (sec_width/2) -edge_v_dist - offset - ( rebar_space_w/2) ;
		var cy = y_loc;
		var cz = 0;
		var len1 = rebar_space_w;
		var len2 = y_size;
		var elem1 = elem_rebar_w;
		var elem2 = y_num;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}
	///////////////////////////////////
	function rebar_inner1(start_x, start_y, start_z, spacing_x, spacing_y, count, elem_num, pid)
	{
		Message("C "+count);
		for(var i=0; i<=count-1; i++)
		{
			var offset_x = spacing_x*i
			var offset_y = spacing_y*i

			var x1 = start_x - offset_x;
			var y1 = start_y - offset_y;
			var z1 = start_z;
			var x2 = start_x - offset_x - spacing_x;
			var y2 = start_y - offset_y - spacing_y;
			var z2 = start_z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = elem_num;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
		return i
	}
	///////////////////////////////////
	function rebar_inner2(start_x, start_y, start_z, spacing_x, spacing_y, gap_x, gap_y, count, elem_num, pid)
	{
		for(var i=0; i<=count-1; i++)
		{
			var offset_x = spacing_x*i
			var offset_y = spacing_y*i

			var x1 = start_x - offset_x;
			var y1 = start_y - offset_y;
			var z1 = start_z;
			var x2 = start_x - offset_x - spacing_x + gap_x;
			var y2 = start_y - offset_y - spacing_y + gap_y;
			var z2 = start_z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = elem_num;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
				
			var x1 = start_x - offset_x - spacing_x + gap_x;
			var y1 = start_y - offset_y - spacing_y + gap_y;
			var z1 = start_z;
			var x2 = start_x - offset_x - spacing_x;
			var y2 = start_y - offset_y - spacing_y;
			var z2 = start_z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
		return i
	}
	////////////////////////////////////////////
	function Stirrup_Width(y,z, rebar_space_w, rebar_space_d, elem_rebar_w, elem_rebar_d, side_count, pid, mid, hook, hook1_len, hook2_len)
	{
		var count = rebar_inner2( (sec_width/2)-edge_v_dist, y, z, rebar_space_w, 0, h_v_dist, 0, side_count, elem_rebar_w, pid );
		var count = rebar_inner1( (sec_width/2)-edge_v_dist-(rebar_space_w*count), y, z, rebar_space_w, 0, 1, elem_rebar_w, pid );

		//Ends
		var x1 = (sec_width/2)-edge_h_dist;
		var y1 = y;
		var z1 = z;
		var x2 = (sec_width/2)-edge_h_dist - h_v_dist;
		var y2 = y;
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		var lmesh = line_mesh(m, pid, (-1*x1),y1,z1, (-1*x2),y2,z2, vx,vy,vz, elem)

		//Hook 1 - Straight
		if(mid==0) var elem_len = (rebar_space_d -h_v_dist) / elem_rebar_d;
		else if(mid == 1) var elem_len = (rebar_space_d) / elem_rebar_d;
		var steps = Math.max(1, Math.floor(hook1_len/elem_len) );

		var x1 = hook*( (-1*sec_width/2)+edge_h_dist );
		var y1 = y;
		var z1 = z;
		var x2 = hook*( (-1*sec_width/2)+edge_h_dist );
		var y2 = y - h_v_dist;
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)

		var base_y = y - h_v_dist;
		for(var i=0; i<steps; i++)
		{
			var y1 = base_y - (i * elem_len);
			var y2 = y1 - elem_len;
			
			var x1 = hook*( (-1*sec_width/2)+edge_h_dist );
			var z1 = z;
			var x2 = hook*( (-1*sec_width/2)+edge_h_dist );
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
		
		var stub_len = hook1_len-(elem_len*steps);
		if(stub_len > 0.005) // 5mm
		{
			var x1 = hook*( (-1*sec_width/2)+edge_h_dist );
			var y1 = y2 ;
			var z1 = z;
			var x2 = hook*( (-1*sec_width/2)+edge_h_dist );
			var y2 = y2 - stub_len;
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}

		//Hook 2 - Bent
		if(hook==1) var elem_len_x = (rebar_space_w-h_v_dist) / elem_rebar_w ;
		else if(hook==-1) var elem_len_x = (rebar_space_w) / elem_rebar_w ;

		if(mid==0) var elem_len_y = (rebar_space_d -h_v_dist) / elem_rebar_d ;
		else if(mid == 1) var elem_len_y = (rebar_space_d) / elem_rebar_d ;
		
		var elem_len = Math.sqrt( Math.pow(elem_len_x,2) + Math.pow(elem_len_y,2) ); 
		var first_ang = Math.atan(elem_len_y / (elem_len_x+h_v_dist) );
		var first_len = (elem_len_x + h_v_dist) / Math.cos(first_ang); 

		var steps = Math.max(1, 1+(Math.floor( (hook2_len-first_len) /elem_len)) );
		
		var x1 = hook*( (sec_width/2)-edge_h_dist );
		var y1 = y;
		var z1 = z;
		var x2 = hook*( (sec_width/2)-edge_h_dist );
		var y2 = y - h_v_dist;
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)

		var base_x = (sec_width/2)-edge_h_dist;
		var base_y = y - h_v_dist;

		for(var i=0; i<steps; i++)
		{
			var y1 = base_y - (i * elem_len_y);
			var y2 = y1 - elem_len_y;
			
			if(i==0)
			{
				var x1 = hook*( base_x );
				var x2 = x1 - hook*( h_v_dist + elem_len_x );
			}
			else
			{
				var x1 = hook*( base_x - h_v_dist - (i*elem_len_x) );
				var x2 = x1 - hook*( elem_len_x );
			}
			
			var z1 = z;
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
		
		var stub_len = hook2_len - first_len - ( elem_len*(steps-1) );
		var stub_ang = Math.atan(elem_len_y / elem_len_x);
		var stub_len_x = Math.cos(stub_ang) * stub_len;
		var stub_len_y = Math.sin(stub_ang) * stub_len;

		if(stub_len > 0.005) //5mm
		{
			var x1 = x2 ;
			var y1 = y2;
			var z1 = z;
			var x2 = x1 - hook*(stub_len_x) ;
			var y2 = y2 - stub_len_y ;
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
	}
	////////////////////////////////////////////
	function Stirrup_Depth(x,z, rebar_space_d, rebar_space_w, elem_rebar_d, elem_rebar_w, side_count, pid, mid, hook, hook1_len, hook2_len)
	{
		var count = rebar_inner2( x, (sec_depth/2)-edge_v_dist, z, 0, rebar_space_d, 0, h_v_dist, side_count, elem_rebar_d, pid );
		var count = rebar_inner1( x, (sec_depth/2)-edge_v_dist-(rebar_space_d*count), z, 0, rebar_space_d, 1, elem_rebar_d, pid );

		//Ends
		var x1 = x;
		var y1 = (sec_depth/2)-edge_h_dist;
		var z1 = z;
		var x2 = x;
		var y2 = (sec_depth/2)-edge_h_dist - h_v_dist;
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		var lmesh = line_mesh(m, pid, x1,(-1*y1),z1, x2,(-1*y2),z2, vx,vy,vz, elem)

		//Hook 1 - Straight
		if(mid==0) var elem_len = (rebar_space_w -h_v_dist) / elem_rebar_w;
		else if(mid == 1) var elem_len = (rebar_space_w) / elem_rebar_w;
		var steps = Math.max(1, Math.floor(hook1_len/elem_len) );

		var x1 = x;
		var y1 = hook*( (-1*sec_depth/2)+edge_h_dist );
		var z1 = z;
		var x2 = x - h_v_dist;
		var y2 = hook*( (-1*sec_depth/2)+edge_h_dist );
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)

		var base_x = x - h_v_dist;
		for(var i=0; i<steps; i++)
		{
			var x1 = base_x - (i * elem_len);
			var x2 = x1 - elem_len;
			
			var y1 = hook*( (-1*sec_depth/2)+edge_h_dist );
			var z1 = z;
			var y2 = hook*( (-1*sec_depth/2)+edge_h_dist );
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}
		
		var stub_len = hook1_len-(elem_len*steps);
		if(stub_len > 0.005) // 5mm
		{
			var x1 = x2;
			var y1 = hook*( (-1*sec_depth/2)+edge_h_dist );
			var z1 = z;
			var x2 = x2-stub_len;
			var y2 = hook*( (-1*sec_depth/2)+edge_h_dist );
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}

		//Hook 2 - Bent
		if(hook==1) var elem_len_y = (rebar_space_d - h_v_dist) / elem_rebar_d ;
		else if(hook==-1) var elem_len_y = (rebar_space_d) / elem_rebar_d ;

		if(mid==0) var elem_len_x = (rebar_space_w - h_v_dist) / elem_rebar_w ;
		else if(mid == 1) var elem_len_x = (rebar_space_w) / elem_rebar_w ;
		
		var elem_len = Math.sqrt( Math.pow(elem_len_x,2) + Math.pow(elem_len_y,2) ); 
		var first_ang = Math.atan(elem_len_x / (elem_len_y+h_v_dist) );
		var first_len = (elem_len_y + h_v_dist) / Math.cos(first_ang); 

		var steps = Math.max(1, 1+(Math.floor( (hook2_len-first_len) /elem_len)) );

		var x1 = x;
		var y1 = hook*( (sec_depth/2)-edge_h_dist );
		var z1 = z;
		var x2 = x - h_v_dist;
		var y2 = hook*( (sec_depth/2)-edge_h_dist );
		var z2 = z;
		var vx = 0;
		var vy = 0;
		var vz = 1;
		var elem = 1;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)

		var base_x = x - h_v_dist;
		var base_y = (sec_depth/2)-edge_h_dist;

		for(var i=0; i<steps; i++)
		{
			var x1 = base_x - (i * elem_len_x);
			var x2 = x1 - elem_len_x;
			
			if(i==0)
			{
				var y1 = hook*( base_y );
				var y2 = y1 - hook*( h_v_dist + elem_len_y );
			}
			else
			{
				var y1 = hook*( base_y - h_v_dist - (i*elem_len_y) );
				var y2 = y1 - hook*( elem_len_y );
			}
			
			var z1 = z;
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}

		var stub_len = hook2_len - first_len - ( elem_len*(steps-1) );
		var stub_ang = Math.atan(elem_len_x / elem_len_y);
		var stub_len_y = Math.cos(stub_ang) * stub_len;
		var stub_len_x = Math.sin(stub_ang) * stub_len;

		if(stub_len > 0.005) //5mm
		{
			var x1 = x2 ;
			var y1 = y2;
			var z1 = z;
			var x2 = x2 - stub_len_x ;
			var y2 = y1 - hook*(stub_len_y) ;
			var z2 = z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = 1;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem)
		}

	}
}
//// Concrete Rectangle - No Stirrups ///////////////////
function mesh_con_rect(m, solid_pid, rebar_v_pid, rebar_h_pid, a,b,c,d,e,f,g,h,i,j)
{
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var cover_thick = c ;
	
	var rebar_num_w = d; 
	var rebar_num_d = e; 
	var rebar_dia_v =  f;
	var rebar_dia_h =  g;

	var hoop_space = h;

	var column_s_height = i;
	var element_base = j;

	// Edge distance to hoop rebar
	var edge_h_dist = cover_thick + (rebar_dia_h/2); 

	// Edge distance to vert rebar
	var edge_v_dist = cover_thick + rebar_dia_h + (rebar_dia_v/2); 

	// Distance (gap) between hoop and vert rebar
	var  h_v_dist = (rebar_dia_h/2) + (rebar_dia_v/2); 

	// Element Size - based on element through cover thickness
	var ele_size = edge_h_dist / element_base;

	// Column Height - adjusted to be a certain number of hoop spacings
	var hoop_num = Math.round(column_s_height/hoop_space);

	var solid_num_hoop = Math.round( (hoop_space / ele_size) );
	var solid_size =  hoop_space / solid_num_hoop;

	var solid_num =  Math.round(column_s_height / solid_size);
	var solid_height = solid_size * solid_num; 

	//////Shell Elements for Extrusion /////////////
	//Create Blocks by Width
	// Outer Blocks
	var shell_pid = 1;
	var y_loc = (sec_depth/2)-(edge_h_dist/2);
	var y_size = edge_h_dist;
	var y_num = element_base;
	block_width(y_loc, y_size, y_num, shell_pid);
	block_width(-1*y_loc, y_size, y_num, shell_pid);

	var y_loc = (sec_depth/2)-edge_h_dist-(h_v_dist/2);
	var y_size = h_v_dist;
	var y_num = 1;
	block_width(y_loc, y_size, y_num, shell_pid);
	block_width(-1*y_loc, y_size, y_num, shell_pid);

	// Middle Blocks
	var rebar_space_d = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1) 
	var elem_rebar_d = Math.round( rebar_space_d / ele_size );
	var count = rebar_num_d-1;

	for(var i=0; i<=count-1; i++)
	{
		var offset = rebar_space_d*i

		var y_loc = (sec_depth/2) - edge_v_dist - offset - (rebar_space_d/2);
		var y_size = rebar_space_d;
		var y_num = elem_rebar_d;
		block_width(y_loc, y_size, y_num, shell_pid);
	}

	//Merge Nodes
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	////////////Solid Elements//////////////////////////////////////////////
	// Create Solid Elements - Extrude the Shell Elements

	// Upper Layers
	var pid = 1;
	var length = hoop_space; 
	var elem = solid_num_hoop;
	var dir = 3;
	var pext = extrude_mesh(m, pid, solid_pid, length, elem, dir)

	// Delete Shell Elements
	var dflag = AllocateFlag();
	var p1 = Part.GetFromID(m, shell_pid);
	var dflag = AllocateFlag();
	p1.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);


	////////////////// REBAR  /////////////////////////////////
	// Create Vertical Rebar
	var rebar_w_pid = 3000;
	var beam_len = solid_size;
	var rebar_w_spacing = (sec_width - (2*edge_v_dist))/(rebar_num_w-1);

	var pid = rebar_w_pid;
	var x1 = -1*((sec_width/2)-edge_v_dist);
	var y1 = (sec_depth/2)-edge_v_dist;
	var z1 = 0;
	var x2 = -1*((sec_width/2)-edge_v_dist);
	var y2 = (sec_depth/2)-edge_v_dist;
	var z2 = hoop_space; 
	var vx = 0;
	var vy = 1;
	var vz = 0;
	var elem = solid_num_hoop;
	var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
	var lmesh = line_mesh(m, pid, x1,(-1*y1),z1, x2,(-1*y2),z2, vx,vy,vz, elem);

	var pids = [rebar_w_pid];
	var tx = rebar_w_spacing;
	var ty = 0;
	var tz = 0;
	var copy = rebar_num_w - 1;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy);

	if(rebar_num_d > 2)
	{
		var rebar_d_pid = 4000;
		var beam_len = solid_size;
		var rebar_d_spacing = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1);

		var pid = rebar_d_pid;
		var x1 = (sec_width/2)-edge_v_dist;
		var y1 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z1 = 0;
		var x2 = (sec_width/2)-edge_v_dist;
		var y2 = -1*((sec_depth/2)-edge_v_dist - rebar_d_spacing);
		var z2 = hoop_space; 
		var vx = 0;
		var vy = 1;
		var vz = 0;
		var elem = solid_num_hoop;
		var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
		var lmesh = line_mesh(m, pid, (-1*x1),y1,z1, (-1*x2),y2,z2, vx,vy,vz, elem);

		if(rebar_num_d > 3)
		{
			var pids = [rebar_d_pid];
			var tx = 0;
			var ty = rebar_d_spacing;
			var tz = 0;
			var copy = rebar_num_d - 3;
			var ptran = translate_parts(m, pids, tx,ty,tz, copy);
		}
	}

	Beam.ForEach(m, bpid);
	function bpid(b)
	{
		b.pid = rebar_v_pid;
	}

	var dflag = AllocateFlag();
	var p3 = Part.GetFromID(m, rebar_w_pid);
	p3.SetFlag(dflag);
	if(rebar_num_d > 2)
	{
		var p4 = Part.GetFromID(m, rebar_d_pid);
		p4.SetFlag(dflag);
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	// Create Hoop Rebar
	//Corners
	var rebar_h1_pid = 5000;

	var pid = rebar_h1_pid;
	var x1 = (sec_width/2)-edge_h_dist;
	var y1 = (sec_depth/2)-edge_h_dist;
	var z1 = 0;
	var x2 = (sec_width/2)-edge_h_dist - h_v_dist;
	var y2 = (sec_depth/2)-edge_h_dist;
	var z2 = 0;
	var vx = 0;
	var vy = 0;
	var vz = 1;
	var ele = 1;
	var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
	
	var pid = rebar_h1_pid;
	var x1 = (sec_width/2)-edge_h_dist;
	var y1 = (sec_depth/2)-edge_h_dist;
	var z1 = 0;
	var x2 = (sec_width/2)-edge_h_dist;
	var y2 = (sec_depth/2)-edge_h_dist - h_v_dist;
	var z2 = 0;
	var vx = 0;
	var vy = 0;
	var vz = 1;
	var ele = 1;
	var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);

	var pids = [rebar_h1_pid];
	var axis = 1;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)
	
	var pids = [rebar_h1_pid];
	var axis = 2;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	// Depth Middle 
	var rebar_h2_pid = 6000;
	var rebar_space_d = (sec_depth - (2*edge_v_dist))/(rebar_num_d-1) 
	var elem_rebar_d = Math.round( rebar_space_d / ele_size );
	var side_count = rebar_num_d-1;

	var count = rebar_inner1( (sec_width/2)-edge_h_dist, (sec_depth/2)-edge_v_dist, 0, 0, rebar_space_d, side_count, elem_rebar_d, rebar_h2_pid );
	var count = rebar_inner1( (-1*sec_width/2)+edge_h_dist, (sec_depth/2)-edge_v_dist, 0, 0, rebar_space_d, side_count, elem_rebar_d, rebar_h2_pid );

	// Width Middle 
	var rebar_h3_pid = 7000;
	var rebar_space_w = (sec_width - (2*edge_v_dist))/(rebar_num_w-1) 
	var elem_rebar_w = Math.round( rebar_space_w / ele_size );
	var side_count = rebar_num_w-1;

	var count = rebar_inner1( (sec_width/2)-edge_v_dist, (sec_depth/2)-edge_h_dist, 0, rebar_space_w, 0, side_count, elem_rebar_w, rebar_h3_pid );
	var count = rebar_inner1( (sec_width/2)-edge_v_dist, (-1*sec_depth/2)+edge_h_dist, 0, rebar_space_w, 0, side_count, elem_rebar_w, rebar_h3_pid );

	//Tidy Parts
	var mflag = AllocateFlag();
	var p5 = Part.GetFromID(m, rebar_h1_pid);
	p5.SetFlag(mflag);
	var p6 = Part.GetFromID(m, rebar_h2_pid);
	p6.SetFlag(mflag);
	var p7 = Part.GetFromID(m, rebar_h3_pid);
	p7.SetFlag(mflag);
	m.PropagateFlag(mflag);
	var hb = Beam.GetFlagged(m, mflag);
	for(i=0; i<hb.length; i++)
	{
		hb[i].pid = rebar_h_pid;
	}
	ReturnFlag(mflag);

	var dflag = AllocateFlag();
	p5.SetFlag(dflag);
	p6.SetFlag(dflag);
	p7.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	/////////// Build Full Column /////////////////////////////////////////

	// Copy Base Block Upwards
	var pids =  [solid_pid, rebar_v_pid, rebar_h_pid];
	var tx = 0;
	var ty = 0;
	var tz = hoop_space;
	var copy = hoop_num;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy);

	//find beam and solids with center above solid height, flag and delete
	var dflag = AllocateFlag();
	var s = Solid.GetAll(m);
	for(var i=0; i<s.length; i++)
	{	 
		var scen = find_solid_center(m, s[i]);
		if(scen.z > solid_height) s[i].SetFlag(dflag);
	}
	var b = Beam.GetAll(m);
	for(var i=0; i<b.length; i++)
	{	
		var bcen = find_beam_center(m, b[i]);
		if(bcen.z > solid_height) b[i].SetFlag(dflag);
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	///////////// Set up Beam Third Nodes /////////////////////////
	var dflag = AllocateFlag();
	Beam.ForEach(m, third_node);
	function third_node(b)
	{
		var n3 = Node.GetFromID(m, b.n3);
		n3.SetFlag(dflag);
		var label = Node.NextFreeLabel(m);
		var n3_new = new Node(m, label, n3.x, n3.y, n3.z);
		b.n3 = n3_new.nid;
	}
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	/// Renumber nodes and elements
	var rflag = AllocateFlag();
	Node.FlagAll(m, rflag);
	Solid.FlagAll(m, rflag);
	Beam.FlagAll(m, rflag);
	m.RenumberFlagged(rflag, 1);
	ReturnFlag(rflag);

	///////////Coat the solid elements
	var seg_coat = segment_coat(m, solid_pid, 1);
	var outer_set = Set.GetFromID(m, 1, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, rebar_v_pid:rebar_v_pid, rebar_h_pid:rebar_h_pid, segment_sid:outer_set.sid};
	return mids;

	////////////////////////////////////
	function block_width(y_loc, y_size, y_num, pid)
	{
		var rebar_space_w = (sec_width - (2*edge_v_dist))/(rebar_num_w-1) 
		var elem_rebar_w = Math.round( rebar_space_w / ele_size );

		var side_count_r = rebar_num_w-1;

		// Outer
		var cx = (sec_width/2) - (edge_h_dist/2) ;
		var cy = y_loc;
		var cz = 0;
		var len1 = edge_h_dist;
		var len2 = y_size;
		var elem1 = element_base;
		var elem2 = y_num;
		plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		plate_mesh(m, pid,(-1*cx),cy,cz,len1,len2,elem1,elem2)

		var cx = (sec_width/2) - edge_h_dist - (h_v_dist/2) ;
		var cy = y_loc;
		var cz = 0;
		var len1 = h_v_dist;
		var len2 = y_size;
		var elem1 = 1;
		var elem2 = y_num;
		plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		plate_mesh(m, pid,(-1*cx),cy,cz,len1,len2,elem1,elem2)

		// Right Side
		for(var i=0; i<=side_count_r-1; i++)
		{
			var offset = rebar_space_w*i

			var cx = (sec_width/2) -edge_v_dist - offset - (rebar_space_w/2) ;
			var cy = y_loc;
			var cz = 0;
			var len1 = rebar_space_w;
			var len2 = y_size;
			var elem1 = elem_rebar_w;
			var elem2 = y_num;
			plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}
	///////////////////////////////////
	function rebar_inner1(start_x, start_y, start_z, spacing_x, spacing_y, count, elem_num, pid)
	{
		Message("C "+count);
		for(var i=0; i<=count-1; i++)
		{
			var offset_x = spacing_x*i
			var offset_y = spacing_y*i

			var x1 = start_x - offset_x;
			var y1 = start_y - offset_y;
			var z1 = start_z;
			var x2 = start_x - offset_x - spacing_x;
			var y2 = start_y - offset_y - spacing_y;
			var z2 = start_z;
			var vx = 0;
			var vy = 0;
			var vz = 1;
			var elem = elem_num;
			var lmesh = line_mesh(m, pid, x1,y1,z1, x2,y2,z2, vx,vy,vz, elem);
		}
		return i
	}
}