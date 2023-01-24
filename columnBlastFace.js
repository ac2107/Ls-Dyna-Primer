/**
 * 
 * @param {Model} m Model object 
 * @param {Number} pid Part id 
 * @param {Number} n1 Node id 
 * @param {Number} n2 Node id 
 */
function columnBlastFace(m, pid, n1, n2){

	// Create blast faces (Null faces) for beam elements
	
    //
    var w = 0.25; // half column avg width - default width

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

