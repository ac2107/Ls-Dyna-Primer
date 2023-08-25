//////////////////HSS ROUND/////////////////////
function mesh_hss_round(m, solid_pid, a,b,c,d) 
{
	Message("Meshing Round Section")

	// Section Properties
	var sec_outer_rad = a;
	var sec_thick = b;

	// Height of the solid section
	var solid_height = c;

	//Elements through the thickness
	var element_base = d;

	////////////////Mesh Column///////////////////////////////////////////////
	//Meshing Shell to be extruded//
	var shell_pid = 1;

	//Create Base
	var ele_size = sec_thick / element_base
	var ele_circum = 4 * Math.round( ((2*sec_outer_rad) - sec_thick ) * Math.PI / ele_size / 4);
	var angle = 360/ele_circum;

	var cn1 = new Node(m, 1, 0, (sec_outer_rad - sec_thick), 0);
	var cn2 = new Node(m, 2, 0, sec_outer_rad, 0);

	var nodes = [cn1,cn2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var rangle = angle;
	var copy = 1;
	var rnode = rotate_node(m, nodes, ax,ay,az, axis, rangle, copy)

	var pid = shell_pid;
	var n1 = Node.GetFromID(m,1);
	var n2 = Node.GetFromID(m,2);
	var n3 = Node.GetFromID(m,4);
	var n4 = Node.GetFromID(m,3);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2)

	var pids = [shell_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var rangle = angle;
	var copy = ele_circum - 1;
	var rpart = rotate_parts(m, pids, ax,ay,az, axis, rangle, copy)
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	//Extrude the Shell Elements
	var solid_ele = Math.round( solid_height / (sec_thick/element_base) );
	if(solid_ele > 999) 
	{
		var sh_pid = shell_pid;
		var so_pid = solid_pid;
		var length = solid_height_split
		var elem = solid_ele_split;
		var dir = 3;
		var emesh = extrude_mesh(m, sh_pid, so_pid, length, elem, dir)

		var pids = [solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split;
		var copy = 9;
		var tpar = translate_parts(m, pids, tx,ty,tz, copy)

		PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	}
	else
	{
		var sh_pid = shell_pid;
		var so_pid = solid_pid;
		var length = solid_height;
		var elem = solid_ele;
		var dir = 3;
		var emesh = extrude_mesh(m, sh_pid, so_pid, length, elem, dir)
	}

	//Delete shell elements
	var dflag = AllocateFlag();
	Shell.FlagAll(m, dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	///////////Coat the solid elements//////////////////////////////////////////////////////
	var seg_coat = segment_coat(m, solid_pid, 1);

	// Find outer surface segments
	var s_seg = Set.GetFromID(m, 1, Set.SEGMENT);
	var segments = new Object;
	var sco = 0;

	s_seg.StartSpool();
	while (id = s_seg.Spool() )
	{
		//Message("Array:"+id);
		sco = sco + 1;
		segments[sco] = new Object;
		segments[sco].n1 = Node.GetFromID(m, id[0]);
		segments[sco].n2 = Node.GetFromID(m, id[1]);
		segments[sco].n3 = Node.GetFromID(m, id[2]);
		segments[sco].n4 = Node.GetFromID(m, id[3]);
		
		segments[sco].cx = (segments[sco].n1.x + segments[sco].n2.x + segments[sco].n3.x + segments[sco].n4.x)/4; 
		segments[sco].cy = (segments[sco].n1.y + segments[sco].n2.y + segments[sco].n3.y + segments[sco].n4.y)/4; 
		segments[sco].cz = (segments[sco].n1.z + segments[sco].n2.z + segments[sco].n3.z + segments[sco].n4.z)/4; 

		var tmp1 = segments[sco].n2.x - segments[sco].n1.x; 
		var tmp2 = segments[sco].n2.y - segments[sco].n1.y;
		var tmp3 = segments[sco].n2.z - segments[sco].n1.z;
		var v1 = [tmp1, tmp2, tmp3];
		segments[sco].v1 = vec_norm(v1);
		//Message("V1: "+v1);

		var tmp1 = segments[sco].n3.x - segments[sco].n1.x; 
		var tmp2 = segments[sco].n3.y - segments[sco].n1.y; 
		var tmp3 = segments[sco].n3.z - segments[sco].n1.z; 
		var v2 = [tmp1, tmp2, tmp3];  
		segments[sco].v2 = vec_norm(v2);
		//Message("V2: "+v2);

		var vnorm = x_product(v1, v2)
		segments[sco].vnorm = vec_norm(vnorm);
		//Message("VN: "+segments[sco].vnorm)
	}

	var outer_set = new Set(m, 200, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";
	for(i in segments)
	{
		tmp1 = segments[i].cx; 
		tmp2 = segments[i].cy; 
		tmp3 = 0;
		var vc = [tmp1, tmp2, tmp3];

		//Message("VC: "+vc);
		//Message("VN: "+segments[i].vnorm);

		var angle = dot_product_angle(segments[i].vnorm, vc);
		//Message("Angle: "+angle.deg);

		if(angle.deg < 90) outer_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid, segments[i].n4.nid); // outer surface
	}
	
	//Delete base segement set
	var dflag = AllocateFlag();
	s_seg.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	outer_set.sid = 1;

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, segment_sid:outer_set.sid};
	return mids
}
//////////////////HSS ROUND FIllED///////////////////
function mesh_hss_round_fill(m, solid_pid, c_solid_pid, a,b,c,d) 
{
	Message("Meshing Round Section")

	// Section Properties
	var sec_outer_rad = a;
	var sec_thick = b;

	// Height of the solid section
	var solid_height = c;

	//Elements through the thickness
	var element_base = d;

	////////////////Mesh Column///////////////////////////////////////////////
	//Meshing Shell to be extruded//
	var shell_pid = 1;
	var c_shell_pid = 3;

	//Dimensions
	var ele_size = sec_thick / element_base
	var ele_circum = 4 * Math.round( ((2*sec_outer_rad) - sec_thick ) * Math.PI / ele_size / 4);
	var e_angle = 360/ele_circum;

	// Inner concrete
	var new_rad = sec_outer_rad - sec_thick;
	var angle_off = 0;
	var c_shell_pid1 = 100;
	var c_shell_pid2 = 200;

	var rings = Math.round( 0.6 * (new_rad / ele_size) );
	for(j=0; j<=rings; j++)
	{
		var out_rad = new_rad;
		var in_rad = out_rad - ele_size;

		if(j==0)
		{
			var ele_out_circum = ele_circum;
			var ele_in_circum = Math.round( (Math.PI * 2 *in_rad) / ele_size) ;
		}
		else if(j==rings)
		{
			var ele_out_circum = Math.round( (Math.PI * 2 *out_rad) / ele_size);
			var ele_in_circum = 8 * Math.round( (Math.PI * 2 *in_rad) / ele_size/8);
		}
		else
		{
			var ele_out_circum = Math.round( (Math.PI * 2 *out_rad) / ele_size);
			var ele_in_circum = Math.round( (Math.PI * 2 *in_rad) / ele_size);
		}
		
		var angle_out = 360/ele_out_circum;
		var angle_in = 360/ele_in_circum;
		
		var ele_diff = ele_out_circum - ele_in_circum;

		var out_label = Node.NextFreeLabel(m);
		for(k=0; k<=ele_out_circum; k++)
		{
			var label = Node.NextFreeLabel(m);
			var xcoord = out_rad * Math.sin( -1* ( (k*angle_out)+angle_off)/180*Math.PI );
			var ycoord = out_rad * Math.cos( -1* ( (k*angle_out)+angle_off)/180*Math.PI );
			var on = new Node(m, label, xcoord, ycoord, 0);
		}

		var in_label = Node.NextFreeLabel(m);
		for(k=0; k<=ele_in_circum; k++)
		{
			var label = Node.NextFreeLabel(m);
			var xcoord = in_rad * Math.sin( -1* ( (k*angle_in)+angle_off+(angle_in/2) )/180*Math.PI );
			var ycoord = in_rad * Math.cos( -1* ( (k*angle_in)+angle_off+(angle_in/2) )/180*Math.PI );
			var on = new Node(m, label, xcoord, ycoord, 0);
		}

		var step = Math.round(ele_in_circum / ele_diff);
		var remain = ele_in_circum - (step * ele_diff);

		if(remain == 0) var rstep = 1e20; // ignore
		else if(remain < 0) var rstep = -1*Math.floor(ele_diff / remain); 
		else if(remain > 0) var rstep = Math.floor(ele_diff / remain);  
		
		var s_count = 1;
		var t_count = 0;
		var e_count = 0;

		var o_count = 0;
		var i_count = 0;

		for(i=1; i<=ele_out_circum; i++)
		{
			if(s_count == 1 && e_count < rstep)
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, c_shell_pid1, out_label+o_count, out_label+o_count+1, in_label+i_count);

				o_count = o_count + 1;
				t_count = t_count + 1;
				e_count = e_count + 1;
			}
			else if(s_count == 1 && e_count == rstep && remain > 0)  /// add in extra quad
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, c_shell_pid1, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
				
				o_count = o_count + 1;
				i_count = i_count + 1;

				e_count = 0;
				s_count = step+1;
			}
			else if (s_count == 2 && e_count == rstep && remain < 0) /// miss a quad
			{
				e_count = 0;
				i = i - 1;
			}
			else
			{
				var slabel = Shell.NextFreeLabel(m);
				var s = new Shell(m, slabel, c_shell_pid1, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
				
				o_count = o_count + 1;
				i_count = i_count + 1;
			}


			if(s_count == (step+1) && t_count < ele_diff) s_count = 1;
			else s_count = s_count+1;
		}

		new_rad = in_rad;
		angle_off = angle_off + (1.5*angle_in);
	}
	var angle_final = angle_off - angle_in;

	//// Concrete Center Fill ////
	// Radius
	var rad = in_rad;

	// Element in radius
	var element_rad = ele_in_circum/4;

	//Inner to Outer ratio
	var ra = 1.4;
	var rb = 1.1;
	var rc = ra - rb;

	var cn = new Node(m, 10000000, ra*rad/2, 0, 0);

	var nodes = [cn];
	var copy = element_rad/2;
	var tx = (-rc*rad/2) / (element_rad/2);
	var ty = (rb*rad/2) / (element_rad/2);
	var tz = 0;
 	var ntran = translate_node(m, nodes, tx,ty,tz, copy)

	var cn = new Node(m, 20000000, rad, 0, 0);

	var nodes = [cn];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = 45 / (element_rad/2) ;
	var copy = element_rad/2;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy)


	var pid = c_shell_pid2;
	var nset1 = new Array();
	var nset2 = new Array();
	for(var i=0; i<=element_rad/2; i++)
	{
		nset1.push( Node.GetFromID(m, 10000000+i) );
		nset2.push( Node.GetFromID(m, 20000000+i) );
	}
	var elems = Math.round(element_rad/4);
	var rmesh = ruled_mesh(m, pid, nset1, nset2, elems);

	var pids =[c_shell_pid2];
	var axis = 1;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy) 

	var n1 = new Node(m, 30000001, 0, 0, 0);
	var n2 = new Node(m, 30000002, ra*rad/2, 0, 0);
	var n3 = new Node(m, 30000003, rad/2*rb, rad/2*rb, 0);
	var n4 = new Node(m, 30000004, 0, ra*rad/2, 0);
	var elem1 = element_rad/2;
	var elem2 = element_rad/2;
	var amesh = area_mesh(m, c_shell_pid2, n1, n2, n3, n4, elem1, elem2)

	var pids =[c_shell_pid2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var copy = 3;
	var angle = 90; 
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)

	var pids =[c_shell_pid2];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var copy = 0;
	var angle = angle_final; 
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)

	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	Shell.ForEach(m, spid);
	function spid(s)
	{
		s.pid = c_shell_pid;
	}

	var dflag = AllocateFlag();
	var p1 = Part.GetFromID(m, c_shell_pid1);
	p1.SetFlag(dflag);
	var p2 = Part.GetFromID(m, c_shell_pid2);
	p2.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	// Outer Steel Ring
	var cn1 = new Node(m, 40000001, 0, (sec_outer_rad - sec_thick), 0);
	var cn2 = new Node(m, 40000002, 0, sec_outer_rad, 0);

	var nodes = [cn1, cn2]; 
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var copy = 1;
	var angle = e_angle;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy)

	var n1 = Node.GetFromID(m,40000001);
	var n2 = Node.GetFromID(m,40000002);
	var n3 = Node.GetFromID(m,40000004);
	var n4 = Node.GetFromID(m,40000003);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, shell_pid, n1, n2, n3, n4, elem1, elem2)

	var pids =[shell_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = e_angle;
	var copy = (ele_circum/4) - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	var pids =[shell_pid];
	var ax = 0;
	var ay = 0;
	var az = 0;
	var axis = 3;
	var angle = 90;
	var copy = 3;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)


	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	//Extrude the Shell Elements
	var solid_ele = Math.round( solid_height / (sec_thick/element_base) );
	if(solid_ele > 999) 
	{
		var solid_ele_split = Math.round( solid_height / (sec_thick/element_base) /10 );
		var solid_height_split = solid_height/10;

		var length = solid_height_split;
		var elem = solid_ele_split;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)
		var emesh = extrude_mesh(m, c_shell_pid, c_solid_pid, length, elem, dir)

		var pids1 =[solid_pid];
		var pids2 =[c_solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split;
		var copy = 9;
		var ptran = translate_parts(m, pids1, tx,ty,tz, copy); 
		var ptran = translate_parts(m, pids2, tx,ty,tz, copy); 
	}
	else
	{
		var length = solid_height;
		var elem = solid_ele;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)
		var emesh = extrude_mesh(m, c_shell_pid, c_solid_pid, length, elem, dir)
	}

	//Delete shell elements
	var dflag = AllocateFlag();
	Shell.FlagAll(m, dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	var sh_coat = shell_coat(m, solid_pid, shell_pid);
	var sh_coat = shell_coat(m, c_solid_pid, shell_pid);

	PlayMacro(mac_dir+"merge_001.prm", { variables: { PID:shell_pid, TOL:0.0001} } );

	//Delete shell elements
	var dflag = AllocateFlag();
	Shell.FlagAll(m, dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	///////////Coat the solid elements//////////////////////////////////////////////////////
	var seg_coat = segment_coat(m, solid_pid, 1);
	var seg_set_sid = 1;

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, segment_sid:seg_set_sid, c_solid_pid:c_solid_pid};
	return mids
}
  
