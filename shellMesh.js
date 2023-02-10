

/**
 * Create one way null shell elements spanning two rows (lists) of nodes
 * @param {Model} m Model
 * @param {Number} pid Part id
 * @param {Array} narray1 [n1, n2] start and end nodes of first list
 * @param {Array} narray2 [n1, n2] start and end nodes of second list
 */
function oneWayBlastFace(m, pid, narray1, narray2){

	var nlist1 = getNodesBetweenTwoNodes(m, narray1[0], narray1[1]);
	var nlist2 = getNodesBetweenTwoNodes(m, narray2[0], narray2[1]);

	if (nlist1.length == nlist2.length){
	
		Message(nlist1);
		Message(nlist2);

		



	}
	else { ErrorMessage('... length of first list is NOT equal to the second list')

	Message(nlist1);
	Message(nlist2);

}

}