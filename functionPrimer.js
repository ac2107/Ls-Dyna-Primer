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


function getNodesByBoxSet(m, pid, sid, cx, cy, cz, dx, dy, dz, title){
  
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
 * 
 * @param {*} m 
 * @param {*} pid 
 * @param {*} x0 
 * @param {*} y0 
 * @param {*} z0 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} z1 
 */
function getNodesByBoxCorner(m, pid, x0, y0, z0, x1, y1, z1, tol = 1e-5){

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

  // Determine adjusted box bounds with tolerance
  const xMin = Math.min(x0, x1) - tol;
  const xMax = Math.max(x0, x1) + tol;
  const yMin = Math.min(y0, y1) - tol;
  const yMax = Math.max(y0, y1) + tol;
  const zMin = Math.min(z0, z1) - tol;
  const zMax = Math.max(z0, z1) + tol;


  // Filter nodes to get those that lie within the box
  return nodes.filter(node => 
      node.x >= xMin && node.x <= xMax &&
      node.y >= yMin && node.y <= yMax &&
      node.z >= zMin && node.z <= zMax
  );

}

/**
 * 
 * @param {*} m model (object)
 * @param {*} nodes list of node id numbers or list of node objects
 * @param {*} sid set id (number)
 * @param {*} title set title (string)
 * @returns a node set object
 */
function createSetNode(m, nodes, sid, title='NODE SET'){

	const ns = new Set(m, sid, Set.NODE, title);
	
  // case 1 - input "nodes" is an list of node ids
	if (typeof nodes == 'object' && typeof nodes[0] == 'number'){
		for (var id of nodes) {ns.Add(id)}
	}
	
  // case 2 - input "nodes" is an list of node lement objects
	else if (typeof nodes == 'object' && typeof nodes[0] == 'object') {
		for (var n of nodes) {ns.Add(n.nid)}
	}

	return ns
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
  
    // Get all flagged nodes & return the flag
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
  // return nrb;
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

/**
 * Circular cut plane centred at (XCT, YCT, ZCT) with radius = RADIUS
 * and has a normal vector originating at (XCT, YCT, ZCT) and pointing towards 
 * (XCH, YCH, ZCH). In this case the variables XHEV, YHEV, ZHEV, LENL, and LENM,
 * which are defined on the 2nd card will be ignored. 
 * @param {Model} m Model
 * @param {Array} centre Circular cross-section centre [x, y, z]
 * @param {Number} radius Circular cross-section raids 
 * @param {Array} vnorm Cross-section normal unit vector [x, y, z] 
 * @param {Number} id  Rigid part or accelerometer or coordinate system number
 * @param {*} itype Flag for local system type
 * @param {Number} psid Part set number, default to 0
 * @param {String} title Cross-section title
 * @returns 
 */
function CrossSectionCircular(m, centre, radius, vnorm, id, itype, psid = 0, title){

  // Circular cut plane centred at (XCT, YCT, ZCT) with radius = RADIUS
  // and has a normal vector originating at (XCT, YCT, ZCT) and pointing towards 
  // (XCH, YCH, ZCH). In this case the variables XHEV, YHEV, ZHEV, LENL, and LENM,
  // which are defined on the 2nd card will be ignored. 

  var xct, yct, zct, xch, ych, zch;

  var dL = 0.1;

  xct = centre[0];
  yct = centre[1];
  zct = centre[2];

  xch = centre[0] + dL*vnorm[0]
  ych = centre[1] + dL*vnorm[1]
  zch = centre[2] + dL*vnorm[2]

  var cdsx = new CrossSection(	m,  CrossSection.PLANE, 0, 
                                    xct, yct, zct, 
                                    xch, ych, zch, 
                                    0, 0, 0, 
                                    0, 0, 
                                    0, 0, 0, title
                                    
                                    
  );

  cdsx.radius = radius;
  cdsx.id = id;
  cdsx.itype = itype; 
  
  if (psid > 0) cdsx.psid = psid;

  return cdsx

}


/**
 * Rectangular cut plane centred at (XCT, YCT, ZCT)
 * @param {Model} m Model
 * @param {Array} centre Circular cross-section centre [x, y, z]
 * @param {Number} lenl Length of the cutting plane, LENL
 * @param {Number} lenm Length of the cutting plane, LENM
 * @param {Array} vnorm Cross-section normal unit vector [x, y, z] 
 * @param {Number} id  Rigid part or accelerometer or coordinate system number
 * @param {*} itype Flag for local system type
 * @param {Number} psid Part set number, default to 0
 * @param {String} title Cross-section title
 */
function CrossSectionRectangular(m, centre, lenl, lenm, vnorm, id, itype, psid = 0, title){

  let xct, yct, zct, xch, ych, zch, xhev, yhev, zhev;

    // 1. Given center point and normal vector
    const [x, y, z] = centre;
    const [v1, v2, v3] = vnorm;
    const nvz = [0, 0, 1];
    
    // 2. Calculate nv_l
    let nv_l = [
      vnorm[1] * nvz[2] - vnorm[2] * nvz[1],
      vnorm[2] * nvz[0] - vnorm[0] * nvz[2],
      vnorm[0] * nvz[1] - vnorm[1] * nvz[0]
    ];
    // Normalize nv_l to make it a unit vector
    const magnitudeNvL = Math.sqrt(nv_l[0] ** 2 + nv_l[1] ** 2 + nv_l[2] ** 2);
    nv_l = nv_l.map(component => component / magnitudeNvL);

    // 3. Calculate nv_m
    let nv_m = [
        vnorm[1] * nv_l[2] - vnorm[2] * nv_l[1],
        vnorm[2] * nv_l[0] - vnorm[0] * nv_l[2],
        vnorm[0] * nv_l[1] - vnorm[1] * nv_l[0]
    ];
    // Normalize nv_m to make it a unit vector
    const magnitudeNvM = Math.sqrt(nv_m[0] ** 2 + nv_m[1] ** 2 + nv_m[2] ** 2);
    nv_m = nv_m.map(component => component / magnitudeNvM);
    
    // 4. Calculate PO
    const PO = [
        x - 0.5 * lenl * nv_l[0] - 0.5 * lenm * nv_m[0],
        y - 0.5 * lenl * nv_l[1] - 0.5 * lenm * nv_m[1],
        z - 0.5 * lenl * nv_l[2] - 0.5 * lenm * nv_m[2]
    ];
    
    // 5. Calculate PL
    const PL = [
        PO[0] + lenl * nv_l[0],
        PO[1] + lenl * nv_l[1],
        PO[2] + lenl * nv_l[2]
    ];
    
    // 6. Calculate PM
    const PM = [
        PO[0] + lenm * nv_m[0],
        PO[1] + lenm * nv_m[1],
        PO[2] + lenm * nv_m[2]
    ];
    
    // 7. Calculate PN
    const PN = [
      PO[0] + 0.5 * (lenl + lenm) * vnorm[0],
      PO[1] + 0.5 * (lenl + lenm) * vnorm[1],
      PO[2] + 0.5 * (lenl + lenm) * vnorm[2]
    ];

  // Corner point the outward normal vector N
  xct = PO[0];
  yct = PO[1];
  zct = PO[2];

  // Head point of the outward normal vector N
  
  xch = PN[0];
  ych = PN[1];
  zch = PN[2];

  // Head point of edge vector L

  xhev = PL[0];
  yhev = PL[1];
  zhev = PL[2];

  // DATABASE_CROSS_SECTION
	var cdsx = new CrossSection(	m, CrossSection.PLANE, 0, 
									xct, yct, zct, 
									xch, ych, zch, 
									xhev, yhev, zhev, 
									lenl, lenm, 
									0, 0, 0, 
									title,
    )


  return cdsx
  
}





