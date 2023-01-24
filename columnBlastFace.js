/**
 * Create blast faces for beam elements (DO NOT USE - kept for compatibility)
 * @param {Model} m Model object 
 * @param {Number} pid Part id 
 * @param {Number} n1 Node id 
 * @param {Number} n2 Node id 
 */
function columnBlastFace(m, pid, n1, n2){

	// Create blast faces (Null faces) for beam elements
	
    //
    var w = 0.5; // half column avg width - default width

    // 
    var list = getBeamElementsByNodes(m, n1, n2);

	// create blast segment for each beam element of a column
	var flag_c = AllocateFlag();
	for (var j = 0; j < list.beam.length; j++) { // for each beam element in the column

		var bid = list.beam[j];

		// get beam element and its N1 and N2
		var b = Beam.GetFromID(m, bid);
		var N1 = Node.GetFromID(m, b.n1);
		var N2 = Node.GetFromID(m, b.n2);

		// update segment size dimension w
		// get part
		var bp = Part.GetFromID(m, b.pid);
		// get section
		var bsec = Section.GetFromID(m, bp.secid);
		// get integration beam
		var intb = IntegrationBeam.GetFromID(m, Math.abs(bsec.qr));
		// get D1 and D3, depth and width of the steel section UB or UC
		w = 0.5 * 0.5 * (intb.d1 + intb.d3) * 1.1; // increase the size by 10%
		// GSA converted dims, half of actual value, so no need to 0.5*0.5*

		// create new nodes P1, P2, P5, P6 from N1
		var P1 = new Node(m, Node.NextFreeLabel(m), N1.x + w, N1.y, N1.z);
		var P2 = new Node(m, Node.NextFreeLabel(m), N1.x - w, N1.y, N1.z);
		var P5 = new Node(m, Node.NextFreeLabel(m), N1.x, N1.y - w, N1.z);
		var P6 = new Node(m, Node.NextFreeLabel(m), N1.x, N1.y + w, N1.z);
		// create new nodes P3, P4, P7, P8 from N2
		var P3 = new Node(m, Node.NextFreeLabel(m), N2.x + w, N2.y, N2.z);
		var P4 = new Node(m, Node.NextFreeLabel(m), N2.x - w, N2.y, N2.z);
		var P7 = new Node(m, Node.NextFreeLabel(m), N2.x, N2.y - w, N2.z);
		var P8 = new Node(m, Node.NextFreeLabel(m), N2.x, N2.y + w, N2.z);

		// create new null shells 
		
        var S1 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P2.nid, P4.nid, N2.nid);    // z-axis pos
		var S2 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P3.nid, P1.nid);
		// var S3 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P6.nid, P8.nid, N2.nid);
		// var S4 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P7.nid, P5.nid);

        // var S1 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P4.nid, P2.nid);       // z-axis neg
		// var S2 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P1.nid, P3.nid, N2.nid);
		var S3 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P8.nid, P6.nid);
		var S4 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P5.nid, P7.nid, N2.nid);


		// set flag on created nodes P1 - P8
		P1.SetFlag(flag_c);
		P2.SetFlag(flag_c);
		P3.SetFlag(flag_c);
		P4.SetFlag(flag_c);
		P5.SetFlag(flag_c);
		P6.SetFlag(flag_c);
		P7.SetFlag(flag_c);
		P8.SetFlag(flag_c);

		S1.SetFlag(flag_c);
		S2.SetFlag(flag_c);
		S3.SetFlag(flag_c);
		S4.SetFlag(flag_c);
	}

	// for each column - create constraints for blast segments
	m.MergeNodes(flag_c, 1e-5);
	var nflagged = Node.GetFlagged(m, flag_c);

	for (var k = 0; k < list.node.length; k++) { // for each centre node of the column

		// create a node set
		var nid = list.node[k];

		var nset = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE);
		nset.Add(nid); // add the first node

		for (var ii = 0; ii < nflagged.length; ii++) {

			var test_node = nflagged[ii];

			var master_node = Node.GetFromID(m, nid);

			var tol = 1e-3;
			if (test_node.z < master_node.z + tol && test_node.z > master_node.z - tol) {
				nset.Add(test_node.nid);
			}

		}

		// create nbrc from the node set
		var nbrc = new NodalRigidBody(m, nset.sid);

	}

	// Shell.BlankAll(m);
	// Beam.BlankAll(m);
	// Shell.UnblankFlagged(m, flag_c)
	// Beam.UnblankFlagged(m, flag_c);

	// Message('>>> ' + list.beam.length);
	// Message('>>> ' + list.node.length);
	// Message('>>> ' + nflagged.length);

	ReturnFlag(flag_c);


	// remove rotaitonal release condition for nodes used in column bast segments

	for (var jj = 0; jj < list.node.length; jj++) {

		var nnid = list.node[jj];

		var nnode = Node.GetFromID(m, nnid);

		var xrefs = nnode.Xrefs();

		var num = xrefs.GetTotal("BEAM");
		for (var ref = 0; ref < num; ref++) {

			var beam_id = xrefs.GetItemID("BEAM", ref);

			var bm = Beam.GetFromID(m, beam_id);

			bm.rr1 = 0;
			bm.rr2 = 0;

		}
	}
}


/**
 * Create blast faces for COLUMN beam elements (NEW), orientation and creation of the blast faces are based on the point of explosion,
 * column member is vertical only, in global Z-direction
 * @param {Model} m Model object 
 * @param {Number} pid Part id 
 * @param {Number} n1 Node id 
 * @param {Number} n2 Node id 
 * @param {Number} xbo x-coordinate of point of explosion 
 * @param {Number} ybo y-coordinate of point of explosion 
 * @param {Number} zbo z-coordinate of point of explosion 
 */
function columnBlastFaces(m, pid, n1, n2, xbo, ybo, zbo){

	// >>> Create blast faces (Null faces) for beam elements

	// >>> Create flag to deleting objects
	var flag_del = AllocateFlag();

	
    // >>> half column avg width - default width
    var w = 0.25; 

    // >>> get beam elements and nodes to be operated
    var list = getBeamElementsByNodes(m, n1, n2);


	// >>> create blast faces for each beam element of a column
	var flag_c = AllocateFlag();
	for (var j = 0; j < list.beam.length; j++) { // for each beam element in the column

		var bid = list.beam[j];

		// >>> get beam element and its N1 and N2
		var b = Beam.GetFromID(m, bid);
		var N1 = Node.GetFromID(m, b.n1);
		var N2 = Node.GetFromID(m, b.n2);

		// >>> get beam orientations
		// > axial axis
		var uv_r = unitVectorbyTwoNodes(m, b.n1, b.n2).uv;
		var vec_r = [uv_r.vx, uv_r.vy, uv_r.vz];
		// > minor axis 
		if (b.orientation) {		
			var vec_s = [b.vx, b.vy, b.vz];
		} else {
			var uv_s = unitVectorbyTwoNodes(m, b.n1, b.n3).uv;
			var vec_s = [uv_s.vx, uv_s.vy, uv_s.vz];
		}
		// > major axis
		var vec_t = x_product(vec_r, vec_s);

		// Message(['r '+ vec_r, 's ' + vec_s, 't ' + vec_t]);

		// >>> update segment size dimension w
		// > get part
		var bp = Part.GetFromID(m, b.pid);
		// > get section
		var bsec = Section.GetFromID(m, bp.secid);
		// > get integration beam
		var intb = IntegrationBeam.GetFromID(m, Math.abs(bsec.qr));
		// > get D1 and D3, depth and width of the steel section UB or UC
		var ds = 0.5*intb.d1; 	// section half width
		var dt = 0.5*intb.d3;	// section half depth

		// >>> create new nodes P1, P2, P5, P6 from N1
		var P1 = new Node(m, Node.NextFreeLabel(m), N1.x + vec_s[0]*ds, N1.y + vec_s[1]*ds, N1.z + vec_s[2]*ds);
		var P2 = new Node(m, Node.NextFreeLabel(m), N1.x - vec_s[0]*ds, N1.y - vec_s[1]*ds, N1.z - vec_s[2]*ds);
		var P5 = new Node(m, Node.NextFreeLabel(m), N1.x - vec_t[0]*dt, N1.y - vec_t[1]*dt, N1.z - vec_t[2]*dt);
		var P6 = new Node(m, Node.NextFreeLabel(m), N1.x + vec_t[0]*dt, N1.y + vec_t[1]*dt, N1.z + vec_t[2]*dt);
		
		// >>> create new nodes P3, P4, P7, P8 from N2
		var P3 = new Node(m, Node.NextFreeLabel(m), N2.x + vec_s[0]*ds, N2.y + vec_s[1]*ds, N2.z + vec_s[2]*ds);
		var P4 = new Node(m, Node.NextFreeLabel(m), N2.x - vec_s[0]*ds, N2.y - vec_s[1]*ds, N2.z - vec_s[2]*ds);
		var P7 = new Node(m, Node.NextFreeLabel(m), N2.x - vec_t[0]*dt, N2.y - vec_t[1]*dt, N2.z - vec_t[2]*dt);
		var P8 = new Node(m, Node.NextFreeLabel(m), N2.x + vec_t[0]*dt, N2.y + vec_t[1]*dt, N2.z + vec_t[2]*dt);

		// >>> create new null shells 
        var s1 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P2.nid, P4.nid, N2.nid);    // positive t and s-axis
		var s2 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P3.nid, P1.nid);
		var s3 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, P6.nid, P8.nid, N2.nid);
		var s4 = new Shell(m, Shell.NextFreeLabel(m), pid, N1.nid, N2.nid, P7.nid, P5.nid);

		// >>> set flag on created nodes P1 - P8 (for each beam element)
		P1.SetFlag(flag_c);
		P2.SetFlag(flag_c);
		P3.SetFlag(flag_c);
		P4.SetFlag(flag_c);
		P5.SetFlag(flag_c);
		P6.SetFlag(flag_c);
		P7.SetFlag(flag_c);
		P8.SetFlag(flag_c);

		s1.SetFlag(flag_c);
		s2.SetFlag(flag_c);
		s3.SetFlag(flag_c);
		s4.SetFlag(flag_c);

		// >>> change shell orientation or delete shell based on incidence angle

		// >> s1
		// > unit vector from shell centre to explosion point 
		var s1_centre = s1.IsoparametricToCoords(0.0, 0.0)
		var vec_s1 = unitVectorbyTwoPoints(m, [s1_centre[0], s1_centre[1], 0], [xbo, ybo, 0]).uv; // z component = 0, projected on XY plane
		// > incidence angle to the shell element
		var ang_s1 = dot_product_angle([vec_s1.vx, vec_s1.vy, 0], [s1.NormalVector()[0], s1.NormalVector()[1], 0]) // z component = 0, projected on XY plane
		Message([s1.eid, ang_s1.deg, s1.NormalVector()]);
		// > conditional operation
		// 0-67.5; 67.5-112.5, 112.5-180



		// >> s2
		var s2_centre = s2.IsoparametricToCoords(0.0, 0.0)
		var vec_s2 = unitVectorbyTwoPoints(m, [s2_centre[0], s2_centre[1], 0], [xbo, ybo, 0]).uv; // z component = 0, projected on XY plane
		// > incidence angle to the shell element
		var ang_s2 = dot_product_angle([vec_s2.vx, vec_s2.vy, 0], [s2.NormalVector()[0], s2.NormalVector()[1], 0]) // z component = 0, projected on XY plane
		Message([s2.eid, ang_s2.deg, s2.NormalVector()]);

		// >> s3
		var s3_centre = s3.IsoparametricToCoords(0.0, 0.0)
		var vec_s3 = unitVectorbyTwoPoints(m, [s3_centre[0], s3_centre[1], 0], [xbo, ybo, 0]).uv; // z component = 0, projected on XY plane
		// > incidence angle to the shell element
		var ang_s3 = dot_product_angle([vec_s3.vx, vec_s3.vy, 0], [s3.NormalVector()[0], s3.NormalVector()[1], 0]) // z component = 0, projected on XY plane
		Message([s3.eid, ang_s3.deg, s3.NormalVector()]);

		// >> s4
		var s4_centre = s4.IsoparametricToCoords(0.0, 0.0)
		var vec_s4 = unitVectorbyTwoPoints(m, [s4_centre[0], s4_centre[1], 0], [xbo, ybo, 0]).uv; // z component = 0, projected on XY plane
		// > incidence angle to the shell element
		var ang_s4 = dot_product_angle([vec_s4.vx, vec_s4.vy, 0], [s4.NormalVector()[0], s4.NormalVector()[1], 0]) // z component = 0, projected on XY plane
		Message([s4.eid, ang_s4.deg, s4.NormalVector()]);


	}

	m.PropagateFlag(flag_del);
	m.DeleteFlagged(flag_del);
	ReturnFlag(flag_del);

	// for each column - create constraints for blast segments
	m.MergeNodes(flag_c, 1e-5);
	var nflagged = Node.GetFlagged(m, flag_c);

	for (var k = 0; k < list.node.length; k++) { // for each centre node of the column

		// create a node set
		var nid = list.node[k];

		var nset = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE);
		nset.Add(nid); // add the first node

		for (var t = 0; t < nflagged.length; t++) {

			var test_node = nflagged[t];

			var master_node = Node.GetFromID(m, nid);

			var tol = 1e-3;
			if (test_node.z < master_node.z + tol && test_node.z > master_node.z - tol) {
				nset.Add(test_node.nid);
			}

		}

		// create nbrc from the node set
		var nbrc = new NodalRigidBody(m, nset.sid);

	}

	// Shell.BlankAll(m);
	// Beam.BlankAll(m);
	// Shell.UnblankFlagged(m, flag_c)
	// Beam.UnblankFlagged(m, flag_c);

	// Message('>>> ' + list.beam.length);
	// Message('>>> ' + list.node.length);
	// Message('>>> ' + nflagged.length);

	ReturnFlag(flag_c);

	// remove rotaitonal release condition for nodes used in column bast segments

	for (var jj = 0; jj < list.node.length; jj++) {

		var nnid = list.node[jj];

		var nnode = Node.GetFromID(m, nnid);

		var xrefs = nnode.Xrefs();

		var num = xrefs.GetTotal("BEAM");
		for (var ref = 0; ref < num; ref++) {

			var beam_id = xrefs.GetItemID("BEAM", ref);

			var bm = Beam.GetFromID(m, beam_id);

			bm.rr1 = 0;
			bm.rr2 = 0;

		}
	}
}


/**
 * Create blast faces for ANY beam elements (NEW); orientation and creation of the blast faces are based on the point of explosion,
 * width of the blast faces are the same as the section width in major and minor axis; orientation of the member can be in any direction; 
 * to project the orientation vectors (shell normal unit vevtor & unit vector from shell centre to explpsion location) 
 * onto the plane normal to the beam member;
 * @param {Model} m Model object 
 * @param {Number} pid Part id 
 * @param {Number} n1 Node id 
 * @param {Number} n2 Node id 
 * @param {Number} xbo x-coordinate of point of explosion 
 * @param {Number} ybo y-coordinate of point of explosion 
 * @param {Number} zbo z-coordinate of point of explosion 
 */
function beamBlastFaces(m, pid, n1, n2, xbo, ybo, zbo){



}