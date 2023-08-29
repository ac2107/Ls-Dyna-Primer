/**
 * 
 * @param {Number} deg Degree of an angle
 * @returns 
 */
function DegToRad(deg)
{
  var pi = Math.PI;
  return deg * (pi/180);
}

/**
 * 
 * @param {Model} m Model 
 * @param {Number} pid Part id 
 * @param {Boolean} bool true or false for recursive deletion  
 * @returns 
 */
function deletePart(m, pid, bool) {

    // Message('...delete part pid = ' + pid);
    const flag_delete = AllocateFlag();
    const part_delete= Part.GetFromID(m, pid);
    part_delete.SetFlag(flag_delete);
    m.PropagateFlag(flag_delete);

	if (bool == true){m.DeleteFlagged(flag_delete, true);}
	else if (bool == false){m.DeleteFlagged(flag_delete, false);}

    // m.DeleteFlagged(flag_delete, bool);
    ReturnFlag(flag_delete);

    return 0
}

function getNodesByBox(m, pid, sid, cx, cy, cz, dx, dy, dz, title){
  
  var nodes; 

  if (pid == 0){
    
    // Get all nodes
    nodes = Node.GetAll(m);
  
  } else {

    // Flag all nodes in part 
    var pflag = AllocateFlag();
    var p = Part.GetFromID(m, pid);
    p.SetFlag(pflag);
    m.PropagateFlag(pflag);
  
    // Fet all flagged nodes & return the flag
    nodes = Node.GetFlagged(m, pflag);
    ReturnFlag(pflag);

  }

  var tol = 1e-4; // tolerance

  // Create enclosing box
  var box = new Box(m, Box.NextFreeLabel(m), cx-dx/2, cx+dx/2, cy-dy/2, cy+dy/2, cz-dz/2, cz+dz/2,)

	// Node set by box
  if (sid == 0){ sid = Set.NextFreeLabel(m, Set.NODE) }
	var box_nset = new Set(m, sid, Set.NODE, title);
  box_nset.general = true;
  var data = ["BOX", box.bid];
  box_nset.SetGeneralData(box_nset.general_lines, data);
  
  // Return the central node and the nodal rigid body objects
  return box_nset; 
}













