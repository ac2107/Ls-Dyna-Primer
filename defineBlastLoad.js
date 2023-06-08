// --- How to coat segments on part
// PlayMacro(mac_dir + "segment_coat_002.prm", {
// 	variables: {
// 	PID: pids.CONCRETE_BEAM,
// 	SEGID: sids.SEGMENT_ALL
// }});

/**
 * Define *load_blast_enhanced card and create a rigid sphere or hemi-sphere
 * to show the size and location of the charge; create a temp key file and read back
 * visualise the charge using rigid shell elements
 * 
 * @param bid blast ID
 * @param sids segment set ID 
 * @param pre_blast_load define blast arrival time, 0 or 1
 * @param charge_type 1 = hemi-sphere; 2 = sphere
 * @param charge_mass charge weight [kg]
 * @param charge_x x coordinate of charge [m]
 * @param charge_y y coordinate of charge [m]
 * @param charge_z z coordinate of charge [m]
 * @param title part name for the charge (rigid shell part)
 * @param boo true = use *load_blast_enhanced card; false = Viper load, no *load_blast_enhanced card defined
 */
function defineBlastLoad(m, bid, sids, pre_blast_load, charge_type, charge_mass, charge_x, charge_y, charge_z, title, boo, js_dir) {

	Message("... defining blast load ...")

	// local functions 
	function mesh_sphere(m, shell_pid, cx, cy, cz, radius, ele) {
		Message("Meshing Sphere");
		PlayMacro(mac_dir + "sphere_001.prm", {
			variables: {
				PID: shell_pid,
				CEN_X: cx,
				CEN_Y: cy,
				CEN_Z: cz,
				RAD: radius,
				ELE: ele
			}
		});
	}

	function mesh_hemisphere(m, shell_pid, cx, cy, cz, nx, ny, nz, radius, ele) {
		Message("Meshing Hemiphere");
		PlayMacro(mac_dir + "hemisphere_001.prm", {
			variables: {
				PID: shell_pid,
				CEN_X: cx,
				CEN_Y: cy,
				CEN_Z: cz,
				NORM_X: nx,
				NORM_Y: ny,
				NORM_Z: nz,
				RAD: radius,
				ELE: ele
			}
		});
	}

	//      Blast load segment set
	var blast_seg_set_id = sids;

	//      Setup Blast Loading

	if (pre_blast_load == 0) var tbo = 0; // blast start time
	else if (pre_blast_load == 1) var tbo = 1; // blast start time
	else var tbo = pre_blast_load;

	var units = 2; // units (SI)
	if (charge_type == 1) var blast = 1; // Hemispherical blast
	else if (charge_type == 2) var blast = 2; // Spherical blast

	if (boo == true) {
		Message("use *LOAD_BLAST_ENHANCED");

		var f = new File(js_dir + "ibtmp.key", File.WRITE);
		f.Write("*KEYWORD\n");

		f.Write("*LOAD_BLAST_ENHANCED\n");
		f.Write(bid + "," + charge_mass + "," + charge_x + "," + charge_y + "," + charge_z + "," + tbo + "," + units + "," + blast + "\n");
		f.Write("0.0\n");

		f.Write("*LOAD_BLAST_SEGMENT_SET\n");
		f.Write(bid + "," + blast_seg_set_id + "\n");

		f.Write("*END\n");
		f.Close();
		m.Import(js_dir + "ibtmp.key"); // merge temp file back into main model

		var deleted = File.Delete(js_dir + "ibtmp.key") // delete temp file

	} else if (boo == false) {
		Message("Use Viper");
	}

	//      Charge visualzation
	var pid = 10020;
	var mid = pid;
	var secid = pid;

	// RIGID material model
	if (Material.GetFromID(m, mid) === null) {
		var mat_charge = new Material(m, 10020, "020");
		mat_charge.title = "Rigid_shell";
		mat_charge.SetPropertyByName("RO", 7890);
		mat_charge.SetPropertyByName("E", 210e9);
		mat_charge.SetPropertyByName("PR", 0.3);
		mat_charge.SetPropertyByName("CMO", 1);
		mat_charge.SetPropertyByName("CON1", 7);
		mat_charge.SetPropertyByName("CON2", 7);
	}

	// dummy section 
	if (Section.GetFromID(m, secid) === null) {
		var sec_shell = new Section(m, 10020, Section.SHELL, "Rigid_shell_section");
		sec_shell.elform = 2;
		sec_shell.t1 = 0.001;
		sec_shell.t2 = 0.001;
		sec_shell.t3 = 0.001;
		sec_shell.t4 = 0.001;
	}

	// create sphere/hemi-sphere and part
	// var label = Part.NextFreeLabel(m);
	var label = pid;
	var part_charge = new Part(m, label, secid, mid, title);
	var charge_rad = Math.pow(3.0 * charge_mass / (4.0 * Math.PI * 1630.0), 1 / 3);
	if (charge_type == 2) mesh_sphere(m, part_charge.pid, charge_x, charge_y, charge_z, charge_rad, 16);
	else if (charge_type == 1) mesh_hemisphere(m, part_charge.pid, charge_x, charge_y, charge_z, charge_x, charge_y, charge_z - 1, charge_rad, 16);

	Message(title);
	Message("chrage radius = " + charge_rad);

	return charge_rad;

}

/**
Select segments for blast loading, from on a larger segment sets
Based on charge location

Input parameters:
	@param m main model id
	@param segid_all segment set contains all segments
	@param segid_blast blast segments set, selected from all segments
	@param cx x, y, z coordinates of the charge
	@param cy y coordinates of the charge
	@param cz z coordinates of the charge
	@param angle_in max incidence angle for segment selection
*/
function selectBlastSegments(m, segid_all, segid_blast, cx, cy, cz, angle_in){

	// *** functions ***  

	function x_product(vcross1, vcross2)
	{
		var vc = new Array;
		vc[0] = vcross1[1]*vcross2[2] - vcross1[2]*vcross2[1];
		vc[1] = vcross1[2]*vcross2[0] - vcross1[0]*vcross2[2];
		vc[2] = vcross1[0]*vcross2[1] - vcross1[1]*vcross2[0];
		vc.mag = Math.sqrt(Math.pow(vc[0],2) + Math.pow(vc[1],2) + Math.pow(vc[2],2));
		return vc;
	}
	
	function dot_product_angle(vdot1, vdot2)
	{
		var mag1 = Math.sqrt(Math.pow(vdot1[0],2) + Math.pow(vdot1[1],2) + Math.pow(vdot1[2],2));
		var mag2 = Math.sqrt(Math.pow(vdot2[0],2) + Math.pow(vdot2[1],2) + Math.pow(vdot2[2],2));
		var vector_dot = vdot1[0]*vdot2[0] + vdot1[1]*vdot2[1] + vdot1[2]*vdot2[2]; // dot product
		var angle = new Object;
		angle.rad = Math.acos( vector_dot / (mag1 * mag2) );
		angle.deg = angle.rad / Math.PI*180;
		return angle;
	}
	
	function facing_seg(m, seg_id, seg_blast,cx,cy,cz, angle_in)
	{
		var sids = facing_seg_gen(m, seg_id, seg_blast,cx,cy,cz, angle_in)
		var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
		sseg.Sketch();
	
		var scheck = 0;
		while(scheck == 0)
		{
			var answer = Window.Question("Blast Segment Check", "Are the blast load segments correct");
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
					var sids = facing_seg_gen(m, seg_id, seg_blast,cx,cy,cz, angle_in)
					var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
					sseg.Sketch();
				}
			} 
		}
		return sids;
	}
	
	function facing_seg_gen(m, seg_id, seg_blast,cx,cy,cz, angle_in)
	{
		var s_seg = Set.GetFromID(m, seg_id, Set.SEGMENT);
	
		var segments = new Object;
		var sco = 0;
	
		s_seg.StartSpool();
		while ((id = s_seg.Spool()) )
		{
			if(id.length == 3) // triangluar element
			{			
				//Message("Array:"+id);
				sco = sco + 1;
				segments[sco] = new Object;
				segments[sco].n1 = Node.GetFromID(m, id[0]);
				segments[sco].n2 = Node.GetFromID(m, id[1]);
				segments[sco].n3 = Node.GetFromID(m, id[2]);
				
				segments[sco].cx = (segments[sco].n1.x + segments[sco].n2.x + segments[sco].n3.x )/3; 
				segments[sco].cy = (segments[sco].n1.y + segments[sco].n2.y + segments[sco].n3.y )/3; 
				segments[sco].cz = (segments[sco].n1.z + segments[sco].n2.z + segments[sco].n3.z )/3; 
	
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
			else // quad element
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
				// Message("VN: "+segments[sco].vnorm)
			}
		}
	
		// !!! create new set for charge facing segments
		// !!! use "blast_faces" to be pickup by Viper for loading output
		var face_set = new Set(m, seg_blast, Set.SEGMENT, "blast_faces"); 
	
		for(i in segments)
		{
			// check if segement is on the top or bottom
			// var vvert = [0, 0, 1];
			// var angle = dot_product_angle(segments[i].vnorm, vvert);
	
			// if(angle.deg < 1 && angle.deg > -1 ) {}// ignore
			// else if(angle.deg < 181 && angle.deg >179) {} // ignore
			// else
			// {
				tmp1 = cx - segments[i].cx; 
				tmp2 = cy - segments[i].cy; 
				tmp3 = cz - segments[i].cz;
				var tmp4 = [tmp1, tmp2, tmp3];
				var vc = vec_norm(tmp4);
	
				// Message("segment: "+i);
				// Message("VC: "+vc);
				// Message("VN: "+segments[i].vnorm);
	
				var angle = dot_product_angle(segments[i].vnorm, vc);
				// Message("Angle: "+angle.deg);
	
				if(angle.deg < angle_in) // facing charge
				{
					// Message("segment: "+ i + " | Angle: "+angle.deg + "| VN: "+segments[i].vnorm);
	
					if(id.length == 3) face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid );
					else               face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid, segments[i].n4.nid);
				}
			// }
		}
		return face_set.sid;
	}

	// *** main function ***

	var sids = facing_seg(m, segid_all, segid_blast, cx,cy,cz, angle_in);

	return sids;




}

/** 
 * Create segment set for segments on the outer surface only
 * @param m Model id
 * @param sgid_base Segment set id of the bast segment set containts all segments in the part
 * @param sgid_outer Segment set id of the outer segment set
*/
function selectOuterSurfaceSegments(m, sgid_base, sgid_outer){

	// Find outer surface segments
	var s_seg = Set.GetFromID(m, sgid_base, Set.SEGMENT);
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

	outer_set.sid = sgid_outer;

	return outer_set
}



function charge_radius(charge_mass){

	var charge_rad = Math.pow(3.0 * charge_mass / (4.0 * Math.PI * 1630.0), 1 / 3);

	return charge_rad;

}

/** 
 * Delay the load curve for blast loading from Viper by time t_delay
 * @param m Model id
 * @param lcid_start 	starting curve id (inclusive)
 * @param lcid_end		ending curve id (inclusive)
*/
function delayBlastLoadCurves(m, lcid_start, lcid_end, t_delay){

	var curves_all = Curve.GetAll(m);
	
	for (var curve of curves_all){
		if (curve.lcid >= lcid_start && curve.lcid <= lcid_end) curve.offa = t_delay;
	}

	return 0
}
