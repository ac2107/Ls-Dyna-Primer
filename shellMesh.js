

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


/**
 * Create a mesh of shells between 2 lines of nodes
 * @param {Model} m Model
 * @param {Number} pid Part id
 * @param {Number} n1 start node of line 1
 * @param {Number} n2 end node of  line 1
 * @param {Number} n3 start node of line 2
 * @param {Number} n4 end node of line 2
 * @param {Number} num number equally spaced shells between line 1 and 2
 * @param {Boolean} reverse boolean to control if the shell normal should be reversed or not
 * @param {Flag} flag only use flagged nodes, flag = 0 if use all nodes
 */
function meshRuledFlagged(m, pid, n1, n2, n3, n4, num, reverse, flag){

	// >>> these are sorted list of nodes
	if (flag == 0){
		var nlist1 = getNodesBetweenTwoNodes(m, n1, n2);
		var nlist2 = getNodesBetweenTwoNodes(m, n3, n4);
	} else {
		var nlist1 = getNodesBetweenTwoNodesFlagged(m, n1, n2, flag);
		var nlist2 = getNodesBetweenTwoNodesFlagged(m, n3, n4, flag);
	}
	
	var len1 = nlist1.length;
	var len2 = nlist1.length;

	// >>> create shell elements
	if (nlist1.length == nlist2.length && num > 0){
	
		// Message(nlist1);
		// Message(nlist2);

		// Create 2d array of nodes for shell mesh
		var nodeArray = []

		// Create in-between nodes between each pair of nodes in line1(n1-n2) and line2(n3-n4)
		for (var i=0; i<len1; i++){

			var newNodes = createNodesBetween(m, nlist1[i], nlist2[i], num-1);

			nodeArray.push(newNodes)
		}
		
		// Create shell mesh from nodeArray
		for (var i=0; i<nodeArray.length-1; i++){
			
			// Message(nodeArray[i])

			for (var j=0; j<num; j++){

				// Message(' ');
				// Message([nodeArray[i+1][j]])

				var sh = new Shell(m, Shell.NextFreeLabel(m), pid, 
								   nodeArray[i][j], nodeArray[i][j+1], nodeArray[i+1][j+1], nodeArray[i+1][j]
				);
			}
		}

	} else { ErrorMessage('... list length not equal OR num <= 0')
			// Message(nlist1);
			// Message(nlist2);
		}

	// Message(nlist1);
	// Message(nlist2);

	return nodeArray
}




  

