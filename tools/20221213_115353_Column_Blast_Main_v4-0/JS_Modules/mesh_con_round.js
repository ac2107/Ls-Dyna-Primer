//////////////////CONCRETE ROUND/////////////////////
function mesh_con_round(m, solid_pid, rebar_v_pid, rebar_h_pid, a,b,c,d,e,f,g,h)
{
	Message("Meshing Round Section")
	// Section Properties
	var sec_rad = a;
	var cover_thick = b;
	var rebar_num = c; 
	var rebar_dia_v =  d;
	var rebar_dia_h =  e;
	var hoop_space = f;

	// Height of the solid section
	var column_s_height = g;

	//Elements through the thickness
	var element_base = h;

	// Rebar Pitch Circle Radius
	rebar_v_pc_rad = sec_rad - cover_thick - rebar_dia_h - (rebar_dia_v/2); 
	rebar_h_pc_rad = sec_rad - cover_thick - (rebar_dia_h/2);
	rebar_gap = rebar_h_pc_rad - rebar_v_pc_rad; 

	//Meshing Shell to be extruded//
	var shell_out_pid = 1000;
	var shell_mid_pid = 2000;

	//Create Base
	var ele_size = (sec_rad - rebar_h_pc_rad)  / element_base;

	var ele_out_circum = rebar_num * Math.round( (2*rebar_h_pc_rad) * Math.PI / ele_size / rebar_num );
	var ele_in_circum = 8 * Math.round( (2*rebar_h_pc_rad) * Math.PI / ele_size / 8); // Must be a factor of 8
	var angle_out = 360/ele_out_circum;
	var angle_in = 360/ele_in_circum;

	// Outer Ring 1
	var label = Node.NextFreeLabel(m);
	var cn1 = new Node(m, label, 0, rebar_h_pc_rad, 0);
	var cn2 = new Node(m, label+1, 0, sec_rad, 0);

	var nodes = [cn1, cn2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = 1;
	var nrot = rotate_node(m, nodes, ax, ay, az, axis, angle, copy);	

	var pid = shell_out_pid;
	var n1 = Node.GetFromID(m, label);
	var n2 = Node.GetFromID(m, label+1);
	var n3 = Node.GetFromID(m, label+3);
	var n4 = Node.GetFromID(m, label+2);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2)
	
	// Outer Ring 2
	var label = Node.NextFreeLabel(m);
	var cn1 = new Node(m, label, 0, rebar_v_pc_rad, 0);
	var cn2 = new Node(m, label+1, 0, rebar_h_pc_rad , 0);

	var nodes = [cn1, cn2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = 1;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);	

	var pid = shell_out_pid;
	var n1 = Node.GetFromID(m, label);
	var n2 = Node.GetFromID(m, label+1);
	var n3 = Node.GetFromID(m, label+3);
	var n4 = Node.GetFromID(m, label+2);
	var elem1 = 1;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2)

	var pids = [shell_out_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = ele_out_circum - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)

	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	//Trans Ring
	var ele_diff = ele_out_circum - ele_in_circum;

	var out_label = Node.NextFreeLabel(m);
	var cn1 = new Node(m, out_label, 0, (rebar_v_pc_rad), 0);
	
	if(ele_diff > 0)
	{
		var nodes = [cn1];
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = -angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);	

		var pids = [shell_out_pid];
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = -angle_out/2
		var copy = 0;
		var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)
	}
	else if(ele_diff < 0)
	{
		var nodes = [cn1];
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);	 

		var pids = [shell_out_pid];
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = angle_out/2
		var copy = 0;
		var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)
	}

	var nodes = [cn1];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = ele_out_circum;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);	

	var in_label = Node.NextFreeLabel(m);
	var cn2 = new Node(m, in_label, 0, (rebar_v_pc_rad - ele_size), 0);

	var nodes = [cn2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_in;
	var copy = ele_in_circum;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);

	var ele_diff = ele_out_circum - ele_in_circum;

	if(ele_diff > 0)
	{
		var step = Math.ceil(ele_out_circum / ele_diff);
		Message("Diff: "+ele_diff);
		Message("Step: "+step);

		var s_count = 1;
		var o_count = 0;
		var i_count = 0;
		
		for(i=1; i<=ele_out_circum; i++)
		{
			if(s_count == 1)
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, shell_mid_pid, out_label+o_count, out_label+o_count+1, in_label+i_count);

				o_count = o_count + 1;
			}
			else
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, shell_mid_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
				
				o_count = o_count + 1;
				i_count = i_count + 1;
			}

			if(s_count == step) s_count = 1;
			else s_count = s_count+1;
		}
		
		PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	}
	else if (ele_diff < 0)
	{
		var step = -1 * Math.floor(ele_in_circum / ele_diff);
		Message("Diff: "+ele_diff);
		Message("Step: "+step);

		var s_count = 1;
		var o_count = 0;
		var i_count = 0;
		
		for(i=1; i<=ele_in_circum; i++)
		{
			if(s_count == 1)
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, shell_mid_pid, out_label+o_count, in_label+i_count+1, in_label+i_count);

				i_count = i_count + 1;
			}
			else
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, shell_mid_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
				
				o_count = o_count + 1;
				i_count = i_count + 1;
			}

			if(s_count == step) s_count = 1;
			else s_count = s_count+1;
		}

		PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	}
	else
	{
		for(i=1; i<=ele_out_circum; i++)
		{
			var slabel = Shell.NextFreeLabel(m);
			var s = new Shell(m, slabel, shell_mid_pid, out_label+i-1, out_label+i, in_label+i, in_label+i-1);
		}
		PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	}

	//// Center Fill ////

	// Radius
	var rad = rebar_v_pc_rad - ele_size;

	// Element in radius
	var element_rad = ele_in_circum/4;

	//Meshing Shell to be extruded//
	var shell_pid = 3000;

	//Inner to Outer ratio
	var ra = 1.4;
	var rb = 1.1;
	var rc = ra - rb;

	var cn = new Node(m, 1000000, ra*rad/2, 0, 0);

	var nodes = [cn]
	var tx = (-rc*rad/2) / (element_rad/2);
	var ty = (rb*rad/2) / (element_rad/2);
	var tz = 0;
	var copy = element_rad/2;
	var ntran = translate_node(m, nodes, tx,ty,tz, copy)	

	var cn = new Node(m, 2000000, rad, 0, 0);

	var nodes = [cn]
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = 45 / (element_rad/2) ;
	var copy = element_rad/2;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);
	
	var pid = shell_pid;
	var nset1 = new Array();
	var nset2 = new Array();
	for(var i=0; i<=element_rad/2; i++)
	{
		nset1.push( Node.GetFromID(m, 1000000+i) );
		nset2.push( Node.GetFromID(m, 2000000+i) );
	}
	var elems = Math.round(element_rad/4);
	var rmesh = ruled_mesh(m, pid, nset1, nset2, elems);

	var pids = [shell_pid];
	var coord = 0;
	var axis = 1;
	var copy = 1;
	var mprt = reflect_parts(m, pids, coord, axis, copy);

	var cn1 = new Node(m, 3000001, 0, 0, 0);
	var cn2 = new Node(m, 3000002, ra*rad/2, 0, 0);
	var cn3 = new Node(m, 3000003, rad/2*rb, rad/2*rb, 0);
	var cn4 = new Node(m, 3000004, 0, ra*rad/2, 0);

	var pid = shell_pid;
	var n1 = cn1;
	var n2 = cn2;
	var n3 = cn3;
	var n4 = cn4;
	var elem1 = Math.round(element_rad/2);
	var elem2 = Math.round(element_rad/2);
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2);

	var pids = [shell_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = 90;
	var copy = 3;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy);

	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	
	// Tidy up shell parts
	Shell.ForEach(m, test);
	function test(s)
	{
		s.pid = 1;
	}
	var dflag = AllocateFlag();
	var p1 = Part.GetFromID(m, 1000);
	p1.SetFlag(dflag);
	var p2 = Part.GetFromID(m, 2000);
	p2.SetFlag(dflag);
	var p3 = Part.GetFromID(m, 3000);
	p3.SetFlag(dflag);
	m.DeleteFlagged(dflag);

	// Create Solid Elements - Extrude the Shell Elements
	var solid_size =  hoop_space / Math.round( hoop_space / ele_size);
	var solid_num =  Math.round(column_s_height / solid_size);
	var solid_height = solid_size * solid_num;

	var solid_num_hoop = Math.round(hoop_space / ele_size);

	var shell_pid = 1;
	var solid_pid = solid_pid;
	var length = hoop_space;
	var elem = solid_num_hoop;
	var dir = 3;
	var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)

	// Create Vertical Rebar
	var beam_len = solid_size;
	var label = Node.NextFreeLabel(m);

	var cn1 = new Node(m, label, 0, rebar_v_pc_rad, 0);
	var cn2 = new Node(m, label+1, 0, rebar_v_pc_rad , beam_len);
	var cn3 = new Node(m, label+2, ele_size/2, rebar_v_pc_rad, 0);

	if(ele_diff > 0)
	{
		var nodes = [cn1, cn2, cn3]
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = -angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);
	}
	else if(ele_diff < 0)
	{
		var nodes = [cn1, cn2, cn3]
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);
	}

	var blabel = Beam.NextFreeLabel(m);
	var rbeam = new Beam(m, blabel, rebar_v_pid, label, label+1, label+2);

	var pids = [rebar_v_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = 360/rebar_num;
	var copy = rebar_num-1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy);

	var pids = [rebar_v_pid];
	var tx = 0;
	var ty = 0;
	var tz = beam_len;
	var copy = solid_num_hoop - 1;
	translate_parts(m, pids, tx,ty,tz, copy)

	// Create Hoop Rebar
	var label = Node.NextFreeLabel(m);
	var cn1 = new Node(m, label, 0, rebar_h_pc_rad, hoop_space);
	if(ele_diff > 0)
	{
		var nodes = [cn1]
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = -angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);
	}
	else if(ele_diff < 0)
	{
		var nodes = [cn1]
		var ax = 0;
		var ay = 0;
		var az = 0;
		var axis = 3;
		var angle = angle_out/2;
		var copy = 0;
		var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);
	}

	var nodes = [cn1]
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = 1;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy);

	var cn3 = new Node(m, label+2, 0, rebar_h_pc_rad, hoop_space+(ele_size/2) );

	var blabel = Beam.NextFreeLabel(m);
	var rbeam = new Beam(m, blabel, rebar_h_pid, label, label+1, label+2);

	var pids = [rebar_h_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = angle_out;
	var copy = ele_out_circum - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy);

	// Copy all elements
	var pids = [solid_pid, rebar_v_pid, rebar_h_pid];
	var tx = 0;
	var ty = 0;
	var tz = hoop_space;
	var copy = Math.ceil(solid_height / hoop_space) - 1;
	translate_parts(m, pids, tx,ty,tz, copy)

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

	var rflag = AllocateFlag();
	Node.FlagAll(m, rflag);
	Solid.FlagAll(m, rflag);
	Beam.FlagAll(m, rflag);
	m.RenumberFlagged(rflag, 1);
	ReturnFlag(rflag);

	//Delete Shell Elements
	var dflag = AllocateFlag();
	var p1 = Part.GetFromID(m, 1);
	var dflag = AllocateFlag();
	p1.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	///////////Coat the solid elements
	var seg_coat = segment_coat(m, solid_pid, 1);
	var outer_set = Set.GetFromID(m, 1, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, rebar_v_pid:rebar_v_pid, rebar_h_pid:rebar_h_pid, segment_sid:outer_set.sid};
	return mids;
}
