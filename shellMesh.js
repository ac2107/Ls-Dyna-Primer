

/**
 * Create one way null shell elements spanning two rows (lists) of nodes
 * @param {Model} m Model
 * @param {Number} pid Part id
 * @param {Array} narray1 [n1, n2] start and end nodes of first list
 * @param {Array} narray2 [n1, n2] start and end nodes of second list
 * @param {Boolean} reverse boolean to control if the shell normal should be reversed or not
 */
function oneWayBlastFace(m, pid, narray1, narray2, reverse){

	// >>> these are sorted list of nodes
	var nlist1 = getNodesBetweenTwoNodes(m, narray1[0], narray1[1]);
	var nlist2 = getNodesBetweenTwoNodes(m, narray2[0], narray2[1]);

	// >>> 
	if (nlist1.length == nlist2.length){
	
		// Message(nlist1);
		// Message(nlist2);

		//>> loop list nlist1 to create shell elements
		for (var i=0; i<nlist1.length-1; i++){
			var sh = new Shell(m, Shell.NextFreeLabel(m), pid, 
									nlist1[i], nlist1[i+1], nlist2[i+1], nlist2[i]
			);
			// Message(['shell ->', nlist1[i], nlist1[i+1], nlist2[i+1], nlist2[i]]);

			// > reverse the direction of the shell elements
			if(reverse) sh.ReverseNormal();

		}
	} else { ErrorMessage('... length of first list is NOT equal to the second list')
			// Message(nlist1);
			// Message(nlist2);
		}
}