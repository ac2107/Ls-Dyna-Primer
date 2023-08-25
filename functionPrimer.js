
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















