///////////////////I-SECTION/////////////////////
function mesh_isec (m, solid_pid, a,b,c,d,e,f) 
{
	Message("Meshing I-Section")
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var web_thick = c;
	var flange_thick = d;

	// Height of the solid section
	var solid_height = e;

	//Elements through the thickness
	var element_base = f;

	////////////Mesh the Column
	//Mesh shells to be extruded//
	var shell_pid = 1;

	//Create Web Block
	var pid = shell_pid;
	var cx = 0;
	var cy = 0;
	var cz = 0;
	var len1 = web_thick;
	var len2 = sec_depth - 2*(flange_thick);
	var elem1 = element_base;
	var elem2 = Math.round( len2 / (web_thick/element_base) );
	var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)

	//Create Intersection Blocks
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = 0;
		var cy = i*( (sec_depth/2)-(flange_thick/2) ); 
		var cz = 0;
		var len1 = web_thick;
		var len2 = flange_thick;
		var elem1 = element_base;
		var elem2 = element_base;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	//Create Flange Blocks
	for(var i=-1; i<=1; i=i+2)
	{
		for(var j=-1; j<=1; j=j+2)
		{
			var pid = shell_pid;
			var cx = j*( ((sec_width-web_thick)/4) + (web_thick/2) );
			var cy = i*( (sec_depth/2)-(flange_thick/2) ); 
			var cz = 0;
			var len1 = (sec_width-web_thick)/2
			var len2 = flange_thick;
			var elem1 = Math.round( len1 / (flange_thick/element_base) );
			var elem2 = element_base;
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}

	//Merge Nodes
	PlayMacro(mac_dir+"merge_001.prm", { variables: { PID:shell_pid, TOL:0.0001} } );

	//Extrude the Shell Elements
	var solid_ele = Math.round( solid_height / (flange_thick/element_base) );
	if(solid_ele > 999) 
	{
		var solid_ele_split = Math.round( solid_height / (flange_thick/element_base) / 10);
		var solid_height_split = solid_height/10;

		var length = solid_height_split;
		var elem = solid_ele_split;
		var dir = 3;
		var emesh = extrude_mesh(m, shell_pid, solid_pid, length, elem, dir)

		var pids = [solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split;
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

	///////////Coat the solid elements
	var seg_coat = segment_coat(m, solid_pid, 1);
	var outer_set = Set.GetFromID(m, 1, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, segment_sid:outer_set.sid};
	return mids 
}
///////////////////I-SECTION CONCRETE ENCASED/////////////////////
function mesh_isec_encased (m, solid_pid, c_solid_pid, a,b,c,d,e,f,g,h) 
{
	Message("Meshing I-Section")
	// Section Properties
	var sec_width = a;
	var sec_depth = b;
	var web_thick = c;
	var flange_thick = d;
	
	// Height of the solid section
	var solid_height = e;

	//Elements through the thickness
	var element_base = f;

	var encase_width = g;
	var encase_depth = h;

	////////////Mesh the Column
	//Mesh shells to be extruded//
	var shell_pid = 1;
	var c_shell_pid = 3;

	//Steel
	//Create Web Block
	var pid = shell_pid;
	var cx = 0;
	var cy = 0;
	var cz = 0;
	var len1 = web_thick;
	var len2 = sec_depth - 2*(flange_thick);
	var elem1 = element_base;
	var elem2 = Math.round( len2 / (web_thick/element_base) );
	var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)

	//Create Intersection Blocks
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = 0;
		var cy = i*( (sec_depth/2)-(flange_thick/2) ); 
		var cz = 0;
		var len1 = web_thick;
		var len2 = flange_thick;
		var elem1 = element_base;
		var elem2 = element_base;
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	//Create Flange Blocks
	for(var i=-1; i<=1; i=i+2)
	{
		for(var j=-1; j<=1; j=j+2)
		{
			var pid = shell_pid;
			var cx = j*( ((sec_width-web_thick)/4) + (web_thick/2) );
			var cy = i*( (sec_depth/2)-(flange_thick/2) ); 
			var cz = 0;
			var len1 = (sec_width-web_thick)/2
			var len2 = flange_thick;
			var elem1 = Math.round( len1 / (flange_thick/element_base) );
			var elem2 = element_base;
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}

	// Concrete
	// Create In-fill Block
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = c_shell_pid;
		var cx = i*( ((sec_width-web_thick)/4) + (web_thick/2) );
		var cy = 0; 
		var cz = 0;
		var len1 = (sec_width-web_thick)/2
		var len2 = sec_depth - 2*(flange_thick);
		var elem1 = Math.round( len1 / (flange_thick/element_base) );
		var elem2 = Math.round( len2 / (web_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	// Create In-Fill Extension
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = c_shell_pid;
		var cx = i*( ((encase_width-sec_width)/4) + (sec_width/2) );
		var cy = 0; 
		var cz = 0;
		var len1 = (encase_width-sec_width)/2;
		var len2 = sec_depth - 2*(flange_thick);
		var elem1 = Math.round( len1 / (flange_thick/element_base) );
		var elem2 = Math.round( len2 / (web_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	// Create Flange End Extension
	for(var i=-1; i<=1; i=i+2)
	{
		for(var j=-1; j<=1; j=j+2)
		{
			var pid = c_shell_pid;
			var cx = i*( ((encase_width-sec_width)/4) + (sec_width/2) );
			var cy = j*( (sec_depth/2)-(flange_thick/2) ); 0; 
			var cz = 0;
			var len1 = (encase_width-sec_width)/2;
			var len2 = flange_thick;
			var elem1 = Math.round( len1 / (flange_thick/element_base) );
			var elem2 = element_base;
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}
	//Create Intersection Blocks Extension
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = c_shell_pid;
		var cx = 0;
		var cy = i*( ((encase_depth-sec_depth)/4) + (sec_depth/2) );
		var cz = 0;
		var len1 = web_thick;
		var len2 = (encase_depth-sec_depth)/2;
		var elem1 = element_base;
		var elem2 = Math.round( len2 / (flange_thick/element_base) );
		var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
	}

	// Create Flange Extension 
	for(var i=-1; i<=1; i=i+2)
	{
		for(var j=-1; j<=1; j=j+2)
		{
			var pid = c_shell_pid;
			var cx = i*( ((sec_width-web_thick)/4) + (web_thick/2) );
			var cy = j*( ((encase_depth-sec_depth)/4) + (sec_depth/2) ); 
			var cz = 0;
			var len1 = (sec_width-web_thick)/2
			var len2 = (encase_depth-sec_depth)/2;
			var elem1 = Math.round( len1 / (flange_thick/element_base) );
			var elem2 = Math.round( len2 / (flange_thick/element_base) );
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}

	// Create Corner In-Fill
	for(var i=-1; i<=1; i=i+2)
	{
		for(var j=-1; j<=1; j=j+2)
		{
			var pid = c_shell_pid;
			var cx = i*( ((encase_width-sec_width)/4) + (sec_width/2) );
			var cy = j*( ((encase_depth-sec_depth)/4) + (sec_depth/2) ); 
			var cz = 0;
			var len1 = (encase_width-sec_width)/2;
			var len2 = (encase_depth-sec_depth)/2;
			var elem1 = Math.round( len1 / (flange_thick/element_base) );
			var elem2 = Math.round( len2 / (flange_thick/element_base) );
			var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2)
		}
	}	

	//Merge Nodes
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	//Extrude the Shell Elements
	var solid_ele = Math.round( solid_height / (flange_thick/element_base) );
	if(solid_ele > 999) 
	{
		var solid_ele_split = Math.round( solid_height / (flange_thick/element_base) / 10);
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
		var tz = solid_height_split;
		var copy = 9;
		var ptran = translate_parts(m, pids, tx,ty,tz, copy)

		var pids = [c_solid_pid];
		var tx = 0;
		var ty = 0;
		var tz = solid_height_split;
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
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	//Delete shell elements
	var dflag = AllocateFlag();
	Shell.FlagAll(m, dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	///////////Coat the concrete solid (using temp solid part due to problem with external vs shared faces in JS solid properties)
	var dflag = AllocateFlag();

	var ptmp = new Part(m, 1000, 1000, 1000, 'Temp');
	ptmp.SetFlag(dflag);
	
	var solids = Solid.GetAll(m);
	for(var i=0; i<solids.length; i++)
	{
		var eid = Solid.NextFreeLabel(m);
		var s = new Solid(m, eid, ptmp.pid , solids[i].n1,  solids[i].n2,  solids[i].n3,  solids[i].n4,  solids[i].n5,  solids[i].n6,   solids[i].n7,  solids[i].n8);
		s.SetFlag(dflag);
	}

	var seg_coat = segment_coat(m, ptmp.pid, 1);
	
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);
	
	var outer_set = Set.GetFromID(m, 1, Set.SEGMENT);
	outer_set.title ="Outer Surface Segments";

	///////////////////////////

	Message("Finished Meshing")
	var mids = {solid_pid:solid_pid, segment_sid:outer_set.sid, c_solid_pid:c_solid_pid};
	return mids 
}
//////////////////////////////////////////
function shadow_isec (m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
{
	var sids = shadow_isec_gen(m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
	var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
	View.Show(View.ISO);
	View.Ac();
	sseg.Sketch();
	sseg.Sketch();

	var scheck = 0;
	while(scheck == 0)
	{
		var answer = Window.Question("Blast Segment Check", "Are the blast load segments correct\n Note: Blast shadowing is active for I-Sections");
		if (answer == Window.YES)
		{
			scheck = 1;
		}
		else if (answer == Window.NO)
		{
			angle_in = Window.GetNumber("Angle of Incidence", "Input new angle of incidence", angle_in);
			if(angle_in == null);
			else
			{
				// delete seg set
				var dflag = AllocateFlag();
				sseg.SetFlag(dflag);
				m.DeleteFlagged(dflag);
				ReturnFlag(dflag);

				// remake
				var sids = shadow_isec_gen(m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
				var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
				sseg.Sketch();
			}
		} 
	}
	return sids;
}
///////////////////////////////////////////////////
function shadow_isec_gen (m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
{
	var s_seg = Set.GetFromID(m, seg_id, Set.SEGMENT);

	var sec_width = a;
	var sec_depth = b;
	var web_thick = c;
	var flange_thick = d;

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

	var face_set = new Set(m, 200, Set.SEGMENT);
	var face_segments = new Object
	var fco = 0;


	for(i in segments)
	{
		// check if segement is on the top or bottom
		vvert = [0, 0, 1];
		var angle = dot_product_angle(segments[i].vnorm, vvert);

		if(angle.deg < 1 && angle.deg > -1 ) {}// ignore
		else if(angle.deg < 181 && angle.deg >179) {} // ignore
		else
		{
			tmp1 = cx - segments[i].cx; 
			tmp2 = cy - segments[i].cy; 
			tmp3 = 0;
			tmp4 = [tmp1, tmp2, tmp3];
			var vc = vec_norm(tmp4);

			//Message("VC: "+vc);
			//Message("VN: "+segments[i].vnorm);

			var angle = dot_product_angle(segments[i].vnorm, vc);
			//Message("Angle: "+angle.deg);

			if(angle.deg < angle_in) // facing charge
			{
				face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid, segments[i].n4.nid);
				fco = fco + 1;
				face_segments[fco] = new Object;
				face_segments[fco].id = i;
				face_segments[fco].cx = segments[i].cx;
				face_segments[fco].cy = segments[i].cy;
			}
		}
	}

	// Calculate Shadowed Segments
	var lines = new Object

	lines[1] = new Object
	lines[1].ax = -1*(sec_width/2);
	lines[1].ay = -1*(sec_depth/2);
	lines[1].bx = 1*(sec_width/2);
	lines[1].by = -1*(sec_depth/2);

	lines[2] = new Object
	lines[2].ax = 1*(sec_width/2);
	lines[2].ay = -1*(sec_depth/2);
	lines[2].bx = 1*(sec_width/2);
	lines[2].by = -1*(sec_depth/2)+flange_thick;

	lines[3] = new Object
	lines[3].ax = 1*(sec_width/2);
	lines[3].ay = -1*(sec_depth/2)+flange_thick;
	lines[3].bx = 1*(web_thick/2);
	lines[3].by = -1*(sec_depth/2)+flange_thick;

	lines[4] = new Object
	lines[4].ax = 1*(web_thick/2);
	lines[4].ay = -1*(sec_depth/2)+flange_thick;
	lines[4].bx = 1*(web_thick/2);
	lines[4].by = 1*(sec_depth/2)-flange_thick;

	lines[5] = new Object
	lines[5].ax = 1*(web_thick/2);
	lines[5].ay = 1*(sec_depth/2)-flange_thick;
	lines[5].bx = 1*(sec_width/2);
	lines[5].by = 1*(sec_depth/2)-flange_thick;

	lines[6] = new Object
	lines[6].ax = 1*(sec_width/2);
	lines[6].ay = 1*(sec_depth/2)-flange_thick;
	lines[6].bx = 1*(sec_width/2);
	lines[6].by = 1*(sec_depth/2);

	lines[7] = new Object
	lines[7].ax = 1*(sec_width/2);
	lines[7].ay = 1*(sec_depth/2);
	lines[7].bx = -1*(sec_width/2);
	lines[7].by = 1*(sec_depth/2);

	lines[8] = new Object
	lines[8].ax = -1*(sec_width/2);
	lines[8].ay = 1*(sec_depth/2);
	lines[8].bx = -1*(sec_width/2);
	lines[8].by = 1*(sec_depth/2)-flange_thick;

	lines[9] = new Object
	lines[9].ax = -1*(sec_width/2);
	lines[9].ay = 1*(sec_depth/2)-flange_thick;
	lines[9].bx = -1*(web_thick/2);
	lines[9].by = 1*(sec_depth/2)-flange_thick;

	lines[10] = new Object
	lines[10].ax = -1*(web_thick/2);
	lines[10].ay = 1*(sec_depth/2)-flange_thick;
	lines[10].bx = -1*(web_thick/2);
	lines[10].by = -1*(sec_depth/2)+flange_thick;

	lines[11] = new Object
	lines[11].ax = -1*(web_thick/2);
	lines[11].ay = -1*(sec_depth/2)+flange_thick;
	lines[11].bx = -1*(sec_width/2);
	lines[11].by = -1*(sec_depth/2)+flange_thick;

	lines[12] = new Object
	lines[12].ax = -1*(sec_width/2);
	lines[12].ay = -1*(sec_depth/2)+flange_thick;
	lines[12].bx = -1*(sec_width/2);
	lines[12].by = -1*(sec_depth/2);

	// check for intersect
	var load_set = new Set(m, 300, Set.SEGMENT, "Charge Facing & Shadowed Segement Set");
	for(i in face_segments)
	{
		var line1 = new Object;
		line1.ax = face_segments[i].cx;
		line1.ay = face_segments[i].cy;
		line1.bx = cx;
		line1.by = cy;

		var int_count = 0;
		for(j in lines)
		{
			//Message("Line: "+j);
			var intersect = line_intersect(line1, lines[j]) // 0= no intersection, 1= intersection
			int_count = int_count + intersect;
		}
		if(int_count < 2) // 1 intersect at starting point
		{
			var id = face_segments[i].id;
			load_set.Add(segments[id].n1.nid, segments[id].n2.nid, segments[id].n3.nid, segments[id].n4.nid);
		}
	}

	//Delete face segement set
	var dflag = AllocateFlag();
	face_set.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);

	return load_set.sid;
}
