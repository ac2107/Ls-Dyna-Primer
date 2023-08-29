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

/**
Create nodal rigid body using box and a centre point (a centre node will be created by this function)

Input:

    @param m model id
    @param pid part id, whose nodes are to be included in the nodal rigid body constraitns
    @param pid_nrb part id of the nodal rigid body and corresponding node set; must be >= 1

    use DEFINE_BOX to select nodes 
    @param cx x coordinate of centre point of the box
    @param cy y coordinate of centre point of the box
    @param cz z coordinate of centre point of the box

    @param dx box dimension in x-axis
    @param dy box dimension in y-axis
    @param dz box dimension in z-axis

    @param title title of the nodal rigid body constraint

    Any nodes within this rectangular area are to be included in the nodal rigid body
*/
function NodalRigidBodyByBox(m, pid, pid_nrb, cx, cy, cz, dx, dy, dz, title){
  
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
	var box_nset = new Set(m, pid_nrb*1000, Set.NODE, title);
  box_nset.general = true;
  var data = ["BOX", box.bid];
  box_nset.SetGeneralData(box_nset.general_lines, data);
  
  // Node set from the box
  var nset = new Set(m, pid_nrb, Set.NODE, title);
  //    create centre point/node
  const cnode = new Node(m, Node.NextFreeLabel(m), cx, cy, cz); 
  nset.Add(cnode.nid);
  var id;
  box_nset.StartSpool();
  while((id = box_nset.Spool())) {

    if(!nset.Contains(id)){
      nset.Add(id);
    }
  }

  // Create nodal rigid body
  var nrb = new NodalRigidBody(m, pid_nrb, pid_nrb);
  
  // Delete box_nset
  // var delflag = AllocateFlag();
  // box_nset.SetFlag(delflag);
  // m.DeleteFlagged(delflag, false);
  // ReturnFlag(delflag);

  // Return the central node and the nodal rigid body objects
  return {cnode, nrb}; 
}

/**
Create nodal rigid body using box on a LOCAL coordinate and a centre point (the centre node is input)

Input:

    @param {Model} m model id
    @param pid part id, whose nodes are to be included in the nodal rigid body constraitns
    @param pid_nrb part id of the nodal rigid body and corresponding node set; must be >= 1

    use DEFINE_BOX to select nodes 
    @param {Node} n central node of the selecting box (Node object)

    @param uv unit vector to define the z-direction of the box local triad (vector array [x, y, z])

    @param dx box dimension in x-axis LOCAL
    @param dy box dimension in y-axis LOCAL
    @param dz box dimension in z-axis LOCAL

    @param title title of the nodal rigid body constraint

    Any nodes within this rectangular area are to be included in the nodal rigid body
*/
function NodalRigidBodyByBoxLocal(m, pid, pid_nrb, n, uv, dx, dy, dz, title){

  // flag all nodes in part 
	var pflag = AllocateFlag();
	var p = Part.GetFromID(m, pid);
	p.SetFlag(pflag);
  m.PropagateFlag(pflag);

  // get all flagged nodes & return the flag
  var nodes = Node.GetFlagged(m, pflag);
 

  var tol = 1e-4; // tolerance

  // create enclosing box (using LOCAL card)
  var box = new Box(m, Box.NextFreeLabel(m), -dx/2, dx/2, -dy/2, dy/2, -dz/2, dz/2,)
  box.local = true;
  box.heading = title;
  
  //    - calculate unit local vector_y_axis
  var unit_gloabl_vector_z = [0, 0, -1]; // negative z axis
  var unit_local_vector_x = uv;
  var local_vector_y = x_product(unit_local_vector_x, unit_gloabl_vector_z);
  if(local_vector_y[0] === 0.0 && local_vector_y[1] === 0.0 && local_vector_y[2] === 0.0){
    var unit_local_vector_y = [0, 1, 0]
  } else {
    var unit_local_vector_y = vec_norm(local_vector_y)
  }
  // Message(local_vector_y)
  // Message(unit_local_vector_y)
  
  //    - set centre and orientation of the box
  box.xx = uv[0], box.yx = uv[1], box.zx = uv[2]; // unit vector of local x-axis
  box.xv = unit_local_vector_y[0], box.yv = unit_local_vector_y[1], box.zv = unit_local_vector_y[2];  // unit vector of local y-axis
  box.cx = n.x, box.cy = n.y, box.cz = n.z;       // box centre point coordinate
  // box.Edit();
  
  // node set by box
	var box_nset = new Set(m, pid_nrb*1000, Set.NODE, title);
  box_nset.general = true;
  var data = ["BOX", box.bid];
  box_nset.SetGeneralData(box_nset.general_lines, data);

  // node set from the box, start with the input centre node 
  var nset = new Set(m, pid_nrb, Set.NODE, title);
  nset.Add(n.nid);
  var id;
  box_nset.StartSpool();
  while((id = box_nset.Spool())) {

    var node = Node.GetFromID(m, id);

    if(node.Flagged(pflag)){
      
      if(!nset.Contains(id)){nset.Add(id)}
    
    }

    
  }  

  // create nodal rigid body
  var nrb = new NodalRigidBody(m, pid_nrb, pid_nrb);
  
  // delete box_nset
  var delflag = AllocateFlag();
  box_nset.SetFlag(delflag);
  m.DeleteFlagged(delflag, false);
  ReturnFlag(delflag);
  ReturnFlag(pflag);
  var cnode = n; // centre node, equal to the input node object "n"
  return {cnode, nrb}; // return the central node and the nodal rigid body objects

}









