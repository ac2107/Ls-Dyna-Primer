//////////////////CHANNEL C-Section/////////////////////
function mesh_channel(m, solid_pid, a,b,c,d,e) 
{
	Message("Meshing C-Section")
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
	var n1 = Node.GetFromID(m, 1);
	var n2 = Node.GetFromID(m, 2);
	var n3 = Node.GetFromID(m, 4);
	var n4 = Node.GetFromID(m, 3);
	var elem1 = element_base;
	var elem2 = 1;
	var amesh = area_mesh(m, pid, n1, n2, n3, n4, elem1, elem2);

	var pids = [shell_pid];
	var ax = corner12;
	var ay = corner22;
	var az = 0;
	var axis = 3;
	var copy = ele_corner - 1;
	var prot = rotate_parts(m, pids, ax,ay,az, axis, angle, copy)
	
	PlayMacro(mac_dir+"merge_all_001.prm", { variables: { TOL:0.0001} } );

	var pids = [shell_pid];
	var axis = 2;
	var coord = 0;
	var copy = 1;
	var pref = reflect_parts(m, pids, coord, axis, copy)

	//Create Side Blocks 1
	var pid = shell_pid;
	var cx = (sec_width/2)-(sec_thick/2);
	var cy = 0;
	var cz = 0;
	var len1 = sec_thick;
	var len2 = sec_depth - (4*sec_thick);
	var elem1 = element_base;
	var elem2 = Math.round( len2 / (sec_thick/element_base) );
	var pmesh = plate_mesh(m, pid,cx,cy,cz,len1,len2,elem1,elem2);

	//Create Side Blocks 2
	for(var i=-1; i<=1; i=i+2)
	{
		var pid = shell_pid;
		var cx = -1*sec_thick;
		var cy = i*( (sec_depth/2)-(sec_thick/2) );
		var cz = 0;
		var len1 = sec_width - (2*sec_thick);
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
		extrude_mesh(m, shell_pid, solid_pid, length, elem, dir);

		var pids = [solid_pid];
		var tx =0;
		var ty =0;
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
		extrude_mesh(m, shell_pid, solid_pid, length, elem, dir);
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
//////////////////////////////////////////
function shadow_csec (m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
{
	var sids = shadow_csec_gen(m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
	var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
	View.Show(View.ISO);
	View.Ac();
	sseg.Sketch();
	sseg.Sketch();

	var scheck = 0;
	while(scheck == 0)
	{
		var answer = Window.Question("Blast Segment Check", "Are the blast load segments correct\n Note: Blast shadowing is active for C-Sections");
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
				var sids = shadow_csec_gen(m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
				var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
				sseg.Sketch();
			}
		} 
	}
	return sids;
}
///////////////////////////////////////////////////
function shadow_csec_gen (m, seg_id, a,b,c,d, cx,cy,cz, angle_in)
{
	var s_seg = Set.GetFromID(m, seg_id, Set.SEGMENT);

	var sec_width = a;
	var sec_depth = b;
	var thick = c;
	var element_base = d;

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
	var ele_size = thick / element_base
	var ele_corner = Math.round( ( 2*(thick*1.5) * Math.PI / 4) / ele_size);
	var angle = 90/ele_corner;

	var lines = new Object

	var k=1; 

	lines[k] = new Object
	lines[k].ax = -1*(sec_width/2);
	lines[k].ay = -1*(sec_depth/2);
	lines[k].bx = 1*(sec_width/2) - (2*thick);
	lines[k].by = -1*(sec_depth/2);

	for(i=0; i<ele_corner; i++)
	{
		var step = i;
		var angle1 = (90+(step*angle))/180*Math.PI;
		var angle2 = (90+((step+1)*angle))/180*Math.PI;

		k=k+1;
		lines[k] = new Object
		lines[k].ax = 1*(sec_width/2)  - (2*thick) + ( Math.sin(angle1) *2*thick ) ;
		lines[k].ay = -1*(sec_depth/2) + (2*thick) + ( Math.cos(angle1) *2*thick ) ;
		lines[k].bx = 1*(sec_width/2)  - (2*thick) + ( Math.sin(angle2) *2*thick ) ;
		lines[k].by = -1*(sec_depth/2) + (2*thick) + ( Math.cos(angle2) *2*thick ) ;
	}

	k=k+1;
	lines[k] = new Object
	lines[k].ax = 1*(sec_width/2);
	lines[k].ay = -1*(sec_depth/2) + (2*thick);
	lines[k].bx = 1*(sec_width/2);
	lines[k].by = 1*(sec_depth/2) - (2*thick);

	for(i=0; i<ele_corner; i++)
	{
		var step = i;
		var angle1 = (0+(step*angle))/180*Math.PI;
		var angle2 = (0+((step+1)*angle))/180*Math.PI;

		k=k+1;
		lines[k] = new Object
		lines[k].ax = 1*(sec_width/2) - (2*thick) + ( Math.sin(angle1) *2*thick ) ;
		lines[k].ay = 1*(sec_depth/2) - (2*thick) + ( Math.cos(angle1) *2*thick ) ;
		lines[k].bx = 1*(sec_width/2) - (2*thick) + ( Math.sin(angle2) *2*thick ) ;
		lines[k].by = 1*(sec_depth/2) - (2*thick) + ( Math.cos(angle2) *2*thick ) ;
	}

	k=k+1;
	lines[k] = new Object
	lines[k].ax = 1*(sec_width/2) - (2*thick);
	lines[k].ay = 1*(sec_depth/2);
	lines[k].bx = -1*(sec_width/2);
	lines[k].by = 1*(sec_depth/2);

	k=k+1;
	lines[k] = new Object
	lines[k].ax = -1*(sec_width/2);
	lines[k].ay = 1*(sec_depth/2);
	lines[k].bx = -1*(sec_width/2);
	lines[k].by = 1*(sec_depth/2) - thick;

	k=k+1;
	lines[k] = new Object
	lines[k].ax = -1*(sec_width/2);
	lines[k].ay = 1*(sec_depth/2) - thick;
	lines[k].bx = 1*(sec_width/2) - (2*thick);
	lines[k].by = 1*(sec_depth/2) - thick;

	for(i=0; i<ele_corner; i++)
	{
		var step = i;
		var angle1 = (0+(step*angle))/180*Math.PI;
		var angle2 = (0+((step+1)*angle))/180*Math.PI;

		k=k+1;
		lines[k] = new Object
		lines[k].ax = 1*(sec_width/2) - (2*thick) + ( Math.sin(angle1) *thick ) ;
		lines[k].ay = 1*(sec_depth/2) - (2*thick) + ( Math.cos(angle1) *thick ) ;
		lines[k].bx = 1*(sec_width/2) - (2*thick) + ( Math.sin(angle2) *thick ) ;
		lines[k].by = 1*(sec_depth/2) - (2*thick) + ( Math.cos(angle2) *thick ) ;
	}

	k=k+1;
	lines[k] = new Object
	lines[k].ax = 1*(sec_width/2) - thick;
	lines[k].ay = 1*(sec_depth/2) - (2*thick);
	lines[k].bx = 1*(sec_width/2) - thick;
	lines[k].by = -1*(sec_depth/2) + (2*thick);

	for(i=0; i<ele_corner; i++)
	{
		var step = i;
		var angle1 = (90+(step*angle))/180*Math.PI;
		var angle2 = (90+((step+1)*angle))/180*Math.PI;

		k=k+1;
		lines[k] = new Object
		lines[k].ax = 1*(sec_width/2)  - (2*thick) + ( Math.sin(angle1) *thick ) ;
		lines[k].ay = -1*(sec_depth/2) + (2*thick) + ( Math.cos(angle1) *thick ) ;
		lines[k].bx = 1*(sec_width/2)  - (2*thick) + ( Math.sin(angle2) *thick ) ;
		lines[k].by = -1*(sec_depth/2) + (2*thick) + ( Math.cos(angle2) *thick ) ;
	}

	k=k+1;
	lines[k] = new Object
	lines[k].ax = 1*(sec_width/2) - (2*thick);
	lines[k].ay = -1*(sec_depth/2) + thick;
	lines[k].bx = -1*(sec_width/2);
	lines[k].by = -1*(sec_depth/2) + thick;

	k=k+1;
	lines[k] = new Object
	lines[k].ax = -1*(sec_width/2);
	lines[k].ay = -1*(sec_depth/2) + thick;
	lines[k].bx = -1*(sec_width/2);
	lines[k].by = -1*(sec_depth/2);

		// for(i in lines)
		// {
		// 	Graphics.Start();
		// 	Graphics.LineWidth(5);
		// 	Graphics.LineColour(Colour.BLUE);
		// 	Graphics.LineStyle(Graphics.SOLID_LINE);
		// 	Graphics.Line(lines[i].ax, lines[i].ay, 0, lines[i].bx, lines[i].by, 0);
		//	Graphics.Finish();
		// }

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
