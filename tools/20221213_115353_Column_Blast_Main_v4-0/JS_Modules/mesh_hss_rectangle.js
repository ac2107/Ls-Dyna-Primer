//////////////////HSS RECTANGLE/////////////////////
function mesh_hss_rectangle(m, solid_pid, a,b,c,d,e) 
{
	Message("Meshing Square/Rectangle Section")
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var sec_thick = c;

	// Height of the solid section
	var solid_height = d;

	//Elements through the thickness
	var element_base = e;

	//////////// Mesh Column///////////////
	//Meshing Shell to be extruded//
	var shell_pid = 1;

	//Create Corner Block
	var corner11 = (sec_width/2)-sec_thick;
	var corner12 = (sec_width/2)-(2*sec_thick);

	var corner21 = (sec_depth/2)-sec_thick;
	var corner22 = (sec_depth/2)-(2*sec_thick);


	var ele_size = sec_thick / element_base
	var ele_corner = Math.round( ( 2*(sec_thick*1.5) * Math.PI / 4) / ele_size);
	var angle = -1*(90/ele_corner);

	var cn1 = new Node(m, 1, corner12, corner21, 0);
	var cn2 = new Node(m, 2, corner12, (sec_depth/2), 0);

	var nodes = [cn1, cn2];
	var ax = corner12;
	var ay = corner22;
	var az = 0;
	var axis = 3;
	var copy = 1;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy)	

	var pid = shell_pid;
	var n1 = Node.GetFromID(m,1);
	var n2 = Node.GetFromID(m,2);
	var n3 = Node.GetFromID(m,4);
	var n4 = Node.GetFromID(m,3);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2);

	var pids = [shell_pid];
	var ax = corner12;
	var ay = corner22;
	var az = 0;
	var axis = 3;
	var copy = ele_corner - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy);
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	var pids = [shell_pid];
	var coord = 0;
	var axis = 1;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	var pids = [shell_pid];
	var coord = 0;
	var axis = 2;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	//Create Side Blocks 1
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = i*( (sec_width/2)-(sec_thick/2) );
		var cy = 0;
		var cz = 0;
		var len1 = sec_thick;
		var len2 = sec_depth - (4*sec_thick);
		var elem1 = element_base;
		var elem2 = Math.round( len2 / (sec_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}
	//Create Side Blocks 2
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = 0;
		var cy = i*( (sec_depth/2)-(sec_thick/2) );
		var cz = 0;
		var len1 = sec_width - (4*sec_thick);
		var len2 = sec_thick;
		var elem1 = Math.round( len1 / (sec_thick/element_base) );
		var elem2 = element_base;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	//Merge Nodes
	PlayMacro(mac_dir+"merge_001.prm", { variables: { PID:shell_pid, TOL:0.0001} } );

	//Extrude the Shell Elements
	var solid_ele = Math.round( solid_height / (sec_thick/element_base) );
	if(solid_ele > 999) 
	{
		var solid_ele_split = Math.round( solid_height / (sec_thick/element_base) / 10 );
		var solid_height_split = solid_height/10;
		
		var length = solid_height_split;
		var elem = solid_ele_split;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)

		var pids = [solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split ;
		var copy = 9;
		var ptran = translate_parts(m, pids, tx,ty,tz, copy)

		PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );
	}
	else
	{
		var length = solid_height;
		var elem = solid_ele;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)
	}

	//Delete shell elements
	var dflag = AllocateFlag();
	Shell.FlagAll(m, dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	//////////Coat the solid elements//////////////////////////////////////////////////////
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

	// Section Center
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
//////////////////HSS RECTANGLE FILLED /////////////////////
function mesh_hss_rectangle_fill(m, solid_pid, c_solid_pid, a,b,c,d,e) 
{
	Message("Meshing Square/Rectangle Section - Filled")
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var sec_thick = c;

	// Height of the solid section
	var solid_height = d;

	//Elements through the thickness
	var element_base = e;

	//////////// Mesh Column///////////////
	//Meshing Shell to be extruded//
	var shell_pid = 1;
	var c_shell_pid = 3;

	//Create Corner Block
	var corner11 = (sec_width/2)-sec_thick;
	var corner12 = (sec_width/2)-(2*sec_thick);

	var corner21 = (sec_depth/2)-sec_thick;
	var corner22 = (sec_depth/2)-(2*sec_thick);


	var ele_size = sec_thick / element_base
	var ele_corner = Math.round( ( 2*(sec_thick*1.5) * Math.PI / 4) / ele_size);
	var angle = -1*(90/ele_corner);

	var cn1 = new Node(m, 1, corner12, corner21, 0);
	var cn2 = new Node(m, 2, corner12, (sec_depth/2), 0);

	var nodes = [cn1, cn2];
	var ax = corner12;
	var ay = corner22;
	var az = 0;
	var axis = 3;
	var copy = 1;
	var nrot = rotate_node(m, nodes, ax,ay,az, axis, angle, copy)	

	var pid = shell_pid;
	var n1 = Node.GetFromID(m,1);
	var n2 = Node.GetFromID(m,2);
	var n3 = Node.GetFromID(m,4);
	var n4 = Node.GetFromID(m,3);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2);

	var pids = [shell_pid];
	var ax = corner12;
	var ay = corner22;
	var az = 0;
	var axis = 3;
	var copy = ele_corner - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy);
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	var pids = [shell_pid];
	var coord = 0;
	var axis = 1;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	var pids = [shell_pid];
	var coord = 0;
	var axis = 2;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	//Create Side Blocks 1
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = i*( (sec_width/2)-(sec_thick/2) );
		var cy = 0;
		var cz = 0;
		var len1 = sec_thick;
		var len2 = sec_depth - (4*sec_thick);
		var elem1 = element_base;
		var elem2 = Math.round( len2 / (sec_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}
	//Create Side Blocks 2
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = 0;
		var cy = i*( (sec_depth/2)-(sec_thick/2) );
		var cz = 0;
		var len1 = sec_width - (4*sec_thick);
		var len2 = sec_thick;
		var elem1 = Math.round( len1 / (sec_thick/element_base) );
		var elem2 = element_base;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	//Merge Nodes
	PlayMacro(mac_dir+"merge_001.prm", { variables: { PID:shell_pid, TOL:0.0001} } );

	///////// Concrete Fill

	// Inner concrete
	var new_rad = sec_thick;
	var angle_off = 0;

	var rings = element_base-1;
	var ele_in_circum = ele_corner;
	var drop_sum = 0
	var drop_count = ele_corner-2;


	for(j=1; j<=rings+1; j++)
	{
		var out_rad = new_rad;
		var in_rad = out_rad - ele_size;

		if(j==rings+1) // center - single quad elements
		{
			var ele_out_circum = 2;
			var angle_out = 90/ele_out_circum;

			var out_label = Node.NextFreeLabel(m);
			for(k=0; k<=ele_out_circum; k++)
			{
				var label = Node.NextFreeLabel(m);
				var xcoord = out_rad * Math.sin( -1* ( (k*angle_out))/180*Math.PI );
				var ycoord = out_rad * Math.cos( -1* ( (k*angle_out))/180*Math.PI );
				var on = new Node(m, label, xcoord, ycoord, 0);
			}

			var in_label = Node.NextFreeLabel(m);
			var on = new Node(m, in_label, 0, 0, 0);
			
			var slabel = Shell.NextFreeLabel(m);
			var s = new Shell(m, slabel, c_shell_pid, out_label, out_label+1, out_label+2, in_label);
		}
		else // other rings
		{
			if(j==rings) // last ring - single quad element to line up with tri center
			{
				var ele_out_circum = ele_in_circum;
				var ele_in_circum =  2;
			}
			else
			{
				ele_out_circum = ele_in_circum;
				
				if(drop_sum >= ele_corner-2)
				{
					var reduction = 0;
				}
				else
				{
					var reduction = Math.min(  Math.ceil( (ele_out_circum-2)/2),  Math.ceil(drop_count / (rings-j)) );
				}
				ele_in_circum = ele_in_circum - reduction;

				drop_sum = drop_sum + reduction;
				drop_count = drop_count - reduction;
			}
			
			var angle_out = 90/ele_out_circum;
			var angle_in = 90/ele_in_circum;
			
			var ele_diff = ele_out_circum - ele_in_circum;

			var out_label = Node.NextFreeLabel(m);
			for(k=0; k<=ele_out_circum; k++)
			{
				var label = Node.NextFreeLabel(m);
				var xcoord = out_rad * Math.sin( -1* ( (k*angle_out))/180*Math.PI );
				var ycoord = out_rad * Math.cos( -1* ( (k*angle_out))/180*Math.PI );
				var on = new Node(m, label, xcoord, ycoord, 0);
			}

			var in_label = Node.NextFreeLabel(m);
			for(k=0; k<=ele_in_circum; k++)
			{
				var label = Node.NextFreeLabel(m);
				var xcoord = in_rad * Math.sin( -1* ( (k*angle_in))/180*Math.PI );
				var ycoord = in_rad * Math.cos( -1* ( (k*angle_in))/180*Math.PI );
				var on = new Node(m, label, xcoord, ycoord, 0);
			}

			if(ele_out_circum == ele_in_circum) // no reduction - quad elements only
			{
				var o_count = 0;
				var i_count = 0;
				
				for(i=1; i<=ele_out_circum; i++)
				{
					var slabel = Shell.NextFreeLabel(m);
					var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
					
					o_count = o_count + 1;
					i_count = i_count + 1;
				}
			}
			else // mixture of tris and quads
			{
				if(ele_out_circum > 2) // More than 2 elements - can start and end with a quad
				{
					var step = Math.round( (ele_in_circum-2) / ele_diff);
					var remain = (ele_in_circum-2) - (step * ele_diff);

					if(remain == 0) var rstep = 1e20; // ignore
					else if(remain < 0) var rstep = -1*Math.floor(ele_diff / remain); 
					else if(remain > 0) var rstep = Math.floor(ele_diff / remain);  
					
					var s_count = 1;
					var t_count = 0;
					var e_count = 0;

					var o_count = 0;
					var i_count = 0;

					var mid = Math.max(1, Math.floor((step+1)/2) );

					// Create starting quad
					var slabel = Shell.NextFreeLabel(m);
					var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
					o_count = o_count + 1;
					i_count = i_count + 1;

					for(i=2; i<ele_out_circum; i++)
					{
						if(s_count == mid  && e_count < rstep)
						{
							var slabel = Shell.NextFreeLabel(m);
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count);

							o_count = o_count + 1;
							t_count = t_count + 1;
							e_count = e_count + 1;
						}
						else if(s_count == mid  && e_count == rstep && remain > 0)  /// add in extra quad
						{
							var slabel = Shell.NextFreeLabel(m);
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
							
							o_count = o_count + 1;
							i_count = i_count + 1;

							e_count = 0;
							s_count = step+1;
						}
						else if (s_count == mid+1  && e_count == rstep && remain < 0) /// miss a quad
						{
							e_count = 0;
							i = i - 1;
						}
						else
						{
							var slabel = Shell.NextFreeLabel(m);
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
							
							o_count = o_count + 1;
							i_count = i_count + 1;
						}
						if(s_count == (step+1) && t_count < ele_diff) s_count = 1;
						else s_count = s_count+1;
					}

					// Create finising quad
					var slabel = Shell.NextFreeLabel(m);
					var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
				}
				else // less than 3 elements - can't start and end with a quad
				{
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
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count);

							o_count = o_count + 1;
							t_count = t_count + 1;
							e_count = e_count + 1;
						}
						else if(s_count == 1 && e_count == rstep && remain > 0)  /// add in extra quad
						{
							var slabel = Shell.NextFreeLabel(m);
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
							
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
							var s = new Shell(m, slabel, c_shell_pid, out_label+o_count, out_label+o_count+1, in_label+i_count+1, in_label+i_count);
							
							o_count = o_count + 1;
							i_count = i_count + 1;
						}
						if(s_count == (step+1) && t_count < ele_diff) s_count = 1;
						else s_count = s_count+1;
					}
				}
			}
		}
		new_rad = in_rad;
	}

	var pids = [c_shell_pid];
	var tx = -1*( (sec_width/2)-(sec_thick*2) ); 
	var ty = (sec_depth/2)-(sec_thick*2); 
	var tz = 0;
	var copy = 0;
	var ptran = translate_parts(m, pids, tx,ty,tz, copy);

	var pids = [c_shell_pid];
	var axis = 2;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy);

	var pids = [c_shell_pid];
	var axis = 1;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy);

	//Create Side Blocks 1
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = c_shell_pid;
		var cx = i*( (sec_width/2)-(sec_thick*1.5) );
		var cy = 0;
		var cz = 0;
		var len1 = sec_thick;
		var len2 = sec_depth - (4*sec_thick);
		var elem1 = element_base;
		var elem2 = Math.round( len2 / (sec_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2);
	}
	//Create Side Blocks 2
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = c_shell_pid;
		var cx = 0;
		var cy = i*( (sec_depth/2)-(sec_thick*1.5) );
		var cz = 0;
		var len1 = sec_width - (4*sec_thick);
		var len2 = sec_thick;
		var elem1 = Math.round( len1 / (sec_thick/element_base) );
		var elem2 = element_base;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2);
	}

	//Create center block
	var pid = c_shell_pid;
	var cx = 0;
	var cy = 0;
	var cz = 0;
	var len1 = sec_width - (4*sec_thick);
	var len2 = sec_depth - (4*sec_thick);
	var elem1 = Math.round( len1 / (sec_thick/element_base) );
	var elem2 = Math.round( len2 / (sec_thick/element_base) );
	var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2);
	
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
		
		var length = solid_height_split;
		var elem = solid_ele_split;
		var dir = 3;
		var emesh = extrude_mesh(m, c_shell_pid, c_solid_pid, length, elem, dir)

		var pids = [solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split ;
		var copy = 9;
		var ptran = translate_parts(m, pids, tx,ty,tz, copy);

		var pids = [c_solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split ;
		var copy = 9;
		var ptran = translate_parts(m, pids, tx,ty,tz, copy)
	}
	else
	{
		var length = solid_height;
		var elem = solid_ele;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)
		
		var length = solid_height;
		var elem = solid_ele;
		var dir = 3;
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

