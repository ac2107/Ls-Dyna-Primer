/*
JS scripts for Oasys Primer / Ls-Dyna special functions/objects
Anqi Chen
20-09-2021
*/


function columnFlatSlabBeamShearCriticalLocation(m, cx, cy, dx, dy, Lu, Ld, Ll, Lr, thk, cover, Z, csid, title){ 

    /*
    Create cross-section database for Beam Shear (diagonal tension) for flat slabs
    
    Use this function for each column
    
    4 critical locations one on each of the column face, between yield lines, 
    distance "d" from column/drop panel face
    
    Input:
        m: model
        cx: x coordinate of column centre
        cy: y coordinate of column centre
        dx: column width in x-direction
        dy: column width in y-direction 
        Lu: critical location length - up
        Ld: critical location length - down
        Ll: critical location length - left
        Lr: critical location length - right
        thk: slab total thickness
        cover: concrete cover
        Z: column top z coordinate/XY plane coordiante on Z-axis
        csid: cross-section ids, group

    Return:
        none

    */

    // local variables
    var csN;
    var csLENL;
    var x, y;
    const d = thk - 2*cover;


    // Message([d,]);

    // location 1 - up
    csN = [0, 1, 0]; 	// nornal vector N
    csLENL = Ll + Lr;		// edge length LENL
    x = cx + Lr;
    y = cy + 0.5*dy + d;
    xsectionForShellXY(m, x, y, csN, csLENL, Z, csid+1, title);

    // location 2 - down
    csN = [0, 1, 0]; 	// nornal vector N
    csLENL = Ll + Lr;		// edge length LENL
    x = cx + Lr;
    y = cy - 0.5*dy - d;
    xsectionForShellXY(m, x, y, csN, csLENL, Z, csid+2, title);

    // location 3 - left
    csN = [1, 0, 0]; 	// nornal vector N
    csLENL = Lu + Ld;		// edge length LENL
    x = cx - 0.5*dx - d;
    y = cy - Ld;
    xsectionForShellXY(m, x, y, csN, csLENL, Z, csid+3, title);

    // location 3 - right
    csN = [1, 0, 0]; 	// nornal vector N
    csLENL = Lu + Ld;		// edge length LENL
    x = cx + 0.5*dx + d;
    y = cy - Ld;
    xsectionForShellXY(m, x, y, csN, csLENL, Z, csid+4, title);





}


function xsectionGeneralZ(m, x, y, z, dx, dy, csid, title) {

    /*
    
    Create x-section database, parallel to XY plane at Z coordiante

    The cross section is defined by a centre point (x, y, z), and width dx, dy 

    Input:
        m: model
        x: x coordiante of centre point
        y: y coordiante of centre point
        z: z coordinate of centre point
        title: title of the cross-section


    Return:
        none

    */

    Message("...creating x-section")


    // unit vector in M direction (i.e. negative y-axis)
    const csM = [0, -1, 0];

    // unit vector in N direction (i.e. positive z-axis)
    const csN = [0, 0, 1];

	var xct, yct, zct, xch, ych, zch, xhev, yhev, zhev, lenl, lenm;

    // point (XCT, YCT, ZCT)
    xct = x+0.5*dx, 
    yct = y+0.5*dy, 
    zct = z; 

    // unit vector in L direction csL
    const csL = x_product(csM, csN);

    // point (XCH, YCH, ZCH)
    xch = xct + csN[0];
    ych = yct + csN[1];
    zch = zct + csN[2];

    // point (XHEV, YHEV, ZHEV)
    xhev = xct + csL[0];
    yhev = yct + csL[1];
    zhev = zct + csL[2]; 

    // edge lendth 
    lenl = dx;
    lenm = dy;

    var cdsx = new CrossSection(	m, CrossSection.PLANE, 0, 
        xct, yct, zct, 
        xch, ych, zch, 
        xhev, yhev, zhev, 
        lenl, lenm, 
        0, 0, csid, 
        title,
)
      return cdsx;
}


function xsectionForShellXY(m, x1, y1, csN, csLENL, z, csid, title){

    /*
    Create x-section database for shell elements/parts on the XY plane only

    The cross section is primarily defined by two points on the XY plane (L direction),
    and the seciton cutting the XY plane at its mid point in the M direction.

    Input:
        m: model
        x1: x coordiante of point 1
        y1: y coordiante of point 1
        csN: "unit" vector in the direction N
        csLENL: length LENL in direction L
        z:  z coordinate of the XY plane which the shell part is on
        title: title of the cross-section


    Return:
        none

    */

    Message("...creating x-section")

    // length of the cross-plane in z-direction (M)
	var csLENM = 1.0; 
    
    // unit vector in M direction (i.e. Z-axis)
    const csM = [0, 0, 1];

	var xct, yct, zct, xch, ych, zch, xhev, yhev, zhev, lenl, lenm;

    // point (XCT, YCT, ZCT)
    xct = x1, 
    yct = y1, 
    zct = z-0.5*csLENM; 

    // unit vector in L direction csL
    const csL = x_product(csM, csN);
    // Message([csL[0], csL[1], csL[2]]);

    // point (XCH, YCH, ZCH)
    xch = xct + csN[0];
    ych = yct + csN[1];
    zch = zct + csN[2];

    // point (XHEV, YHEV, ZHEV)
    xhev = xct + csL[0];
    yhev = yct + csL[1];
    zhev = zct + csL[2]; 

    // edge lendth 
    lenl = csLENL;
    lenm = csLENM;
	
	var cdsx = new CrossSection(	m, CrossSection.PLANE, 0, 
									xct, yct, zct, 
									xch, ych, zch, 
									xhev, yhev, zhev, 
									lenl, lenm, 
									0, 0, csid, 
									title,
    )
  
    return cdsx;

}

function CrossSectionX(){


}

function CrossSectionY(){


}

function CrossSectionZ(){


}


/**
 * Create DATABASE_CROSS_SECTION based on centre point and normal vector
 * 
 * @param m model id
 * @param pt centre point (or a node object) of the circular cross section {x, y, z}
 * @param radius cross section dimension 
 * @param id coordinate system id (cid) if itype = 2
 * @param itype type flag, itype = 2 for output using specified coodinate system by "id" 
 * @param vnorm unit normal ve ctor of the cross section for orientation; array [v1, v2, v3]
 */
function CrossSectionRadius(m, pt, radius, vnorm, id, itype, title){

  
  // Circular cut plane centred at (XCT, YCT, ZCT) with radius = RADIUS
  // and has a normal vector originating at (XCT, YCT, ZCT) and pointing towards 
  // (XCH, YCH, ZCH). In this case the variables XHEV, YHEV, ZHEV, LENL, and LENM,
  // which are defined on the 2nd card will be ignored. 

  var xct, yct, zct, xch, ych, zch;

  var dL = 0.1;

  xct = pt.x;
  yct = pt.y;
  zct = pt.z;

  xch = pt.x + dL*vnorm.vx
  ych = pt.y + dL*vnorm.vy
  zch = pt.z + dL*vnorm.vz

  var cdsx = new CrossSection(	m,  CrossSection.PLANE, 0, 
                                    xct, yct, zct, 
                                    xch, ych, zch, 
                                    0, 0, 0, 
                                    0, 0, 
                                    0, 0, CrossSection.NextFreeLabel(m), 
                                    title,
  );

  cdsx.radius = radius;
  cdsx.id = id;
  cdsx.itype = itype; 

  return cdsx

}


function springDiscreteBeam_m66_elastic(m, id, exnodes, tkx, tky, tkz, rkx, rky, rkz, title)
{
	// 1. this function creats spring using *ELEMENT_BEAM + *BEAM_SECTION 
	// 2. elform = 6 for discrete beam
	// 3. *MAT_066 for linear elastic discrete beam (six springs)
	// 4. the discrete beam element is define by 2 nodes, n1 and n2, e.g.
	//		exnid.top.n1
	//		exnid.top.n2 
	//		n2 = ENCASTRE so that the spring is effectively connected to ground

	// create top beam element
	var btop = new Beam(m, Beam.LastFreeLabel(m), id, exnodes.n1, exnodes.n2, 0); 

	var sec_btop = new Section(m, id, Section.BEAM);
	sec_btop.elform = 6;
	sec_btop.vol = 1.0;
	sec_btop.iner = 1.0; 
	sec_btop.scoor = 1.0; 

	var mat_btop = new Material(m, id, "*MAT_066");
	mat_btop.SetPropertyByName("RO", 1.0);
	// global directions: r = x, s = y, t = z
	mat_btop.SetPropertyByName("TKR", tkx);		// 1e0
	mat_btop.SetPropertyByName("TKS", tky);   	// 5e9
	mat_btop.SetPropertyByName("TKT", tkz);		// 1e0
	mat_btop.SetPropertyByName("RKR", rkx);  	// 5e10
	mat_btop.SetPropertyByName("RKS", rky);		// 1e0
	mat_btop.SetPropertyByName("RKT", rkz);		// 1e0

	var p_btop = new Part(m, id, id, id, title);

	// built-in n2 
	var spc_btop = new Spc(m, exnodes.n2, 0, 1, 1, 1, 1, 1, 1, Spc.NODE, id);

	var spring = {eid:id, title:title};

	return spring;
}


function colSpring(m, pid, pid_srping, cx, cy, cdx, cdy, tkx, tky, tkz, rkx, rky, rkz, title)
{
    /**
	  *Create discrete spring beam to represent a column
    *
    *Input:
    *
    *    m - model
    *    pid - part id, whose nodes are to be included in the rigid body constraitns to represent a column head
    *    pid_spring: part id of the spring (discrete beam element, linear elastic)
    *
    *    cx - x coordinate of column centre
    *    cy - y ccordinate of column centre
    *    cdx - column section width in x direction
    *    cdy - column section width in y direction
    *
    *    tkx ... rkz: translational and rotational spring stiffness
	  */

	// flag all nodes in part 
	var pflag = AllocateFlag();
	var p = Part.GetFromID(m, pid);
	p.SetFlag(pflag);
   	m.PropagateFlag(pflag);

	// get all flagged nodes & return the flag
	var nodes = Node.GetFlagged(m, pflag);
	ReturnFlag(pflag);

	var tol = 1e-4; // tolerance

	// 	column node set
	var s_col = new Set(m, pid_srping, Set.NODE, title);

	//	column free top and bottomn end node ID
	var n_col = {n1:Node.NextFreeLabel(m), n2:Node.NextFreeLabel(m)+1};

	//	create colunn free top and bottom end nodes
	var n = new Node(m, n_col.n1, cx, cy, 0.0);
	var n = new Node(m, n_col.n2, cx, cy, 0.0);

	// 	add column top node to set
	s_col.Add(n_col.n1);

	//	define plolygon as the column cross section 
	var polygon = [	[cx-(0.5*cdx+tol), cy-(0.5*cdy+tol)], 
					[cx-(0.5*cdx+tol), cy+(0.5*cdy+tol)], 
					[cx+(0.5*cdx+tol), cy+(0.5*cdy+tol)], 
					[cx+(0.5*cdx+tol), cy-(0.5*cdy+tol)]];

					// 	select all nodes within the polygon for nodal rigid
	for(var i in nodes)
	{
		var point = [nodes[i].x, nodes[i].y]
		var inside = pointInPolygon(point, polygon)

		if (inside == true)
		{
			s_col.Add(nodes[i].nid);
		}
	}

	//	create nodal rigid body contraint
	var nrb_1 = new NodalRigidBody(m, pid_srping, pid_srping);

	//	create column spring
	var col1_spring = springDiscreteBeam_m66_elastic(m, pid_srping, n_col, tkx, tky, tkz, rkx, rky, rkz,title);									

}
     
/**
MAT066 Linear ELastic Discrete Beam 

Input arguments:
  @param m model id
  @param uid unique id number, used for part, material and section ids
  @param n1 node N1 nid; the free node belongs to the entity connected to this elastic discrete beam(spring)
  @param n2 node N2 nid; the ground node to be fully fixed
  @param variables object contains variables to define behaviour 
  @param title string

Definition of "variables": 
const variables = { tkx: 5e9, // x = r
                    tky: 5e9, // y = s
                    tkz: 5e9, // z = t
                    rkx: 5e9, 
                    rky: 5e9, 
                    rkz: 5e9,
                    scoor: 1,
};
*/
function DiscreteBeam_MAT066(m, uid, n1, n2, variables, cid, title)
{

  Message("... discrete beam with elastic MAT_066 behaviour");
  
	// create discrete beam element
	var db = new Beam(m, Beam.LastFreeLabel(m), uid, n1, n2, 0);

  // create discrete beam section
  var sec_db = new Section(m, uid, Section.BEAM, title);
	sec_db.elform = 6;
	sec_db.vol = 1.0;
	sec_db.iner = 1.0; 
	sec_db.scoor = variables.scoor; 
  
  //    create local coordinate system CID
  sec_db.cid = cid;

  // create discrete beam material
	var mat_db = new Material(m, uid, "*MAT_066");
	mat_db.SetPropertyByName("RO", 1.0);
	mat_db.SetPropertyByName("TKR", variables.tkx);
	mat_db.SetPropertyByName("TKS", variables.tky);
	mat_db.SetPropertyByName("TKT", variables.tkz);		
	mat_db.SetPropertyByName("RKR", variables.rkx);  
	mat_db.SetPropertyByName("RKS", variables.rky);	
	mat_db.SetPropertyByName("RKT", variables.rkz);

  // create part
  var p_db = new Part(m, uid, uid, uid, title);

  // return discrete beam details
	var discrete_beam = {eid: db.eid, title: title};

	return discrete_beam;
}


/**
 * Create a set of flagged nodes by a enclosing box 
 * @param {Model} m Model 
 * @param {Number} sid Node set id 
 * @param {Number} xmin Box cornder coordinate
 * @param {Number} ymin Box cornder coordinate
 * @param {Number} zmin Box cornder coordinate
 * @param {Number} xmax Box cornder coordinate
 * @param {Number} ymax Box cornder coordinate
 * @param {Number} zmax Box cornder coordinate
 * @param {Number} flag Only consider flagged nodes, if flag = 0, consider all nodes
 */
function createSetNodeByBoxCorner(m, sid, xmin, ymin, zmin, xmax, ymax, zmax, flag){

	var flag_box = AllocateFlag();
	var vtol = 1e-3;
	var nset = new Set(m, sid, Set.NODE);

	if (flag == 0){var nodes_sel = Node.GetAll(m);
	} else {var nodes_sel = Node.GetFlagged(m, flag)};

	// Node.SketchFlagged(m, flag);
	// Sleep(5);

	for (var node of nodes_sel) {

		if (node.x < xmax && node.x > xmin && 
			node.y < ymax && node.y > ymin && 
			node.z < zmax && node.z > zmin) { 			
				// excluding 3rd non-structural node
				if (node.NodalMass()!=0) node.SetFlag(flag_box)
			}
			
		// Message(node.nid);
	} 

	nset.AddFlagged(flag_box);

	ReturnFlag(flag_box);

	return nset
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


  // flag all nodes in part 
	var pflag = AllocateFlag();
	var p = Part.GetFromID(m, pid);
	p.SetFlag(pflag);
  m.PropagateFlag(pflag);

  // get all flagged nodes & return the flag
  var nodes = Node.GetFlagged(m, pflag);
  ReturnFlag(pflag);

  var tol = 1e-4; // tolerance

  // create enclosing box
  var box = new Box(m, Box.NextFreeLabel(m), cx-dx/2, cx+dx/2, cy-dy/2, cy+dy/2, cz-dz/2, cz+dz/2,)

	// // node set by box
	var box_nset = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE, title);
  box_nset.general = true;
  var data = ["BOX", box.bid];
  box_nset.SetGeneralData(box_nset.general_lines, data);
  
  // node set from the box
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

  // create nodal rigid body
  var nrb = new NodalRigidBody(m, pid_nrb, pid_nrb);
  

  // delete box_nset
  var delflag = AllocateFlag();
  box_nset.SetFlag(delflag);
  m.DeleteFlagged(delflag, false);
  ReturnFlag(delflag);


  return {cnode, nrb}; // return the central node and the nodal rigid body objects
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
	var box_nset = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE, title);
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
 * 
 * Create Coordinate system by vector
 * 
 * @param {*} m model object
 * @param {*} uv unit vector of x-axis for the local coordinate, object {vx, vy, vz}
 */
function CoordinateByVectors(m, uv){

  var unit_gloabl_vector_z = [0, 0, -1]; // negative z axis
  var unit_local_vector_x = [uv.vx, uv.vy, uv.vz];
  var local_vector_y = x_product(unit_local_vector_x, unit_gloabl_vector_z);

  if(local_vector_y[0] === 0.0 && local_vector_y[1] === 0.0 && local_vector_y[2] === 0.0){
    var unit_local_vector_y = [0, 1, 0]
  } else {
    var unit_local_vector_y = vec_norm(local_vector_y)
  }

  var csys = new CoordinateSystem(m,  CoordinateSystem.VECTOR, 
                                      CoordinateSystem.NextFreeLabel(m), 
                                      uv.vx, uv.vy, uv.vz,
                                      unit_local_vector_y[0], unit_local_vector_y[1], unit_local_vector_y[2],

  );

  return csys
}


class MAT024_CS_strain_rate_table {
    /*
  
    // Define a table in Primer/Ls-Dyna to ...
    // ... store Cowper-Symonds strain rate curves
  
    MAT024 with Cowper-Symonds strain rate curves
    *MAT_PIECEWISE_LINEAR_PLASTICITY_TITLE
    All in SI unit
  
    How to use this Class
    
    var Steel_MAT024_csTable = new MAT024_CS_strain_rate_table();
  
    Steel_MAT024_csTable.folder_path = arguments[0]; // define/update the folder path
    Steel_MAT024_csTable.keyFileImport(); // pass the current folder path into the function in Primer
    */
  
    constructor() {
  
      Message("... create a table in Primer/Ls-Dyna to store CS strain rate curves")
      
      this.keyname = "MAT024_CS_strain_rate_table"; // this is the class name for reference of exported key file
      this.folder_path = arguments[0]; // define the current folder path, not working within Class, has to redefine
  
      this.mid = 200000; // material ID (MAT_024 *MAT_PIECEWISE_LINEAR_PLASTICITY_TITLE)
      this.tbid = 200000; // table ID 
      this.lcid = { // load curve ID for strain rate curves
        curve1: 200001,
        curve2: 200002,
        curve3: 200003,
        curve4: 200004,
        curve5: 200005,
      };
      this.title = "Steel MAT_024 model with strain rate effects"
  
      // basic material properties
      this.E = 200e9; // Young's modulus, Pa
      this.rho = 7850; // density kg/m3
      this.v = 0.3; // Poisson's ratio
      this.sy = 345e6; // min yield strength, Pa
      this.uy = 490e6; // min tensile strength, Pa
      this.el = 0.22; // min elongation: "el" x 100%
  
      // data for strain rate table
      this.rate1 = 1.0e-6; // strain rate
      this.rate2 = 1.0e-4;
      this.rate3 = 1.0e-2;
      this.rate4 = 1.0;
      this.rate5 = 100.0;
  
      this.csc = { // Copwer-Symonds Constants for different strain range
        ep0: {
          C: 40.4,
          p: 5
        },
        ep3: {
          C: 40.4,
          p: 5
        },
        ep5: {
          C: 300,
          p: 2.5
        },
        eputs: {
          C: 6844,
          p: 3.91
        }
      };
  
      this.cf = { // Correction Factor for compensating test strain tests
        ep0: 1.080,
        ep3: 1.080,
        ep5: 1.015,
        eputs: 1.030
      };
  
      this.ep = { // plastic strain point
        ep0: 0,
        ep3: 0.03,
        ep5: 0.05,
        eputs: 0.199
      };
  
    }
  
    // Getter - define properties dynamically
    get uyt() {
      return this.uytCalc(); // true min tensile strength
    }
  
    get elt() {
      return this.eltCalc(); // true min elongation
    }
  
    get Eh() {
      return this.EhCalc(); // tangent stiffness
    }
  
    get fsc() {
      return this.fscCalc(); // Flow Stress Constants
    }
  
    get curve1() {
      return this.DefineCurve1();
    }
  
    get curve2() {
      return this.DefineCurve2();
    }
  
    get curve3() {
      return this.DefineCurve3();
    }
  
    get curve4() {
      return this.DefineCurve4();
    }
  
    get curve5() {
      return this.DefineCurve5();
    }
  
    get js_dir() {
      var js_dir = this.Get_JS_Dir(this.folder_path);
      return js_dir
    }
  
    // Method
    uytCalc() {
      return this.uy * (1 + this.el);
    }
  
    eltCalc() {
      return Math.log(1 + this.el);
    }
  
    EhCalc() {
      return (this.uyt - this.sy) / (this.elt - 0.002);
    }
  
    fscCalc() {
      var fsc = { // Flow Stress Constants
        rate1: {
          ep0: 1.0 + (this.rate1 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep3: 1.0 + (this.rate1 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep5: 1.0 + (this.rate1 / this.csc.ep5.C) ** (1 / this.csc.ep5.p),
          eputs: 1.0 + (this.rate1 / this.csc.eputs.C) ** (1 / this.csc.eputs.p),
        },
  
        rate2: {
          ep0: 1.0 + (this.rate2 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep3: 1.0 + (this.rate2 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep5: 1.0 + (this.rate2 / this.csc.ep5.C) ** (1 / this.csc.ep5.p),
          eputs: 1.0 + (this.rate2 / this.csc.eputs.C) ** (1 / this.csc.eputs.p),
        },
  
        rate3: {
          ep0: 1.0 + (this.rate3 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep3: 1.0 + (this.rate3 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep5: 1.0 + (this.rate3 / this.csc.ep5.C) ** (1 / this.csc.ep5.p),
          eputs: 1.0 + (this.rate3 / this.csc.eputs.C) ** (1 / this.csc.eputs.p),
        },
  
        rate4: {
          ep0: 1.0 + (this.rate4 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep3: 1.0 + (this.rate4 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep5: 1.0 + (this.rate4 / this.csc.ep5.C) ** (1 / this.csc.ep5.p),
          eputs: 1.0 + (this.rate4 / this.csc.eputs.C) ** (1 / this.csc.eputs.p),
        },
  
        rate5: {
          ep0: 1.0 + (this.rate5 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep3: 1.0 + (this.rate5 / this.csc.ep3.C) ** (1 / this.csc.ep3.p),
          ep5: 1.0 + (this.rate5 / this.csc.ep5.C) ** (1 / this.csc.ep5.p),
          eputs: 1.0 + (this.rate5 / this.csc.eputs.C) ** (1 / this.csc.eputs.p),
        },
      };
      return fsc;
    }
  
    //    define strain hardening curves
    DefineCurve1() {
      // rate1 
      return [
        this.sy * this.fsc.rate1.ep0 / this.cf.ep0,
        this.sy * this.fsc.rate1.ep0 / this.cf.ep0 + (this.ep.ep3 * this.fsc.rate1.ep3 * this.Eh) / this.cf.ep3,
        this.sy * this.fsc.rate1.ep0 / this.cf.ep0 + (this.ep.ep5 * this.fsc.rate1.ep5 * this.Eh) / this.cf.ep5,
        this.sy * this.fsc.rate1.ep0 / this.cf.ep0 + (this.ep.eputs * this.fsc.rate1.eputs * this.Eh) / this.cf.eputs,
      ];
    }
  
    DefineCurve2() {
      // rate2 
      return [
        this.sy * this.fsc.rate2.ep0 / this.cf.ep0,
        this.sy * this.fsc.rate2.ep0 / this.cf.ep0 + (this.ep.ep3 * this.fsc.rate2.ep3 * this.Eh) / this.cf.ep3,
        this.sy * this.fsc.rate2.ep0 / this.cf.ep0 + (this.ep.ep5 * this.fsc.rate2.ep5 * this.Eh) / this.cf.ep5,
        this.sy * this.fsc.rate2.ep0 / this.cf.ep0 + (this.ep.eputs * this.fsc.rate2.eputs * this.Eh) / this.cf.eputs,
      ];
    }
  
    DefineCurve3() {
      // rate3 
      return [
        this.sy * this.fsc.rate3.ep0 / this.cf.ep0,
        this.sy * this.fsc.rate3.ep0 / this.cf.ep0 + (this.ep.ep3 * this.fsc.rate3.ep3 * this.Eh) / this.cf.ep3,
        this.sy * this.fsc.rate3.ep0 / this.cf.ep0 + (this.ep.ep5 * this.fsc.rate3.ep5 * this.Eh) / this.cf.ep5,
        this.sy * this.fsc.rate3.ep0 / this.cf.ep0 + (this.ep.eputs * this.fsc.rate3.eputs * this.Eh) / this.cf.eputs,
      ];
    }
  
    DefineCurve4() {
      // rate4 
      return [
        this.sy * this.fsc.rate4.ep0 / this.cf.ep0,
        this.sy * this.fsc.rate4.ep0 / this.cf.ep0 + (this.ep.ep3 * this.fsc.rate4.ep3 * this.Eh) / this.cf.ep3,
        this.sy * this.fsc.rate4.ep0 / this.cf.ep0 + (this.ep.ep5 * this.fsc.rate4.ep5 * this.Eh) / this.cf.ep5,
        this.sy * this.fsc.rate4.ep0 / this.cf.ep0 + (this.ep.eputs * this.fsc.rate4.eputs * this.Eh) / this.cf.eputs,
      ];
    }
  
    DefineCurve5() {
      // rate5 
      return [
        this.sy * this.fsc.rate5.ep0 / this.cf.ep0,
        this.sy * this.fsc.rate5.ep0 / this.cf.ep0 + (this.ep.ep3 * this.fsc.rate5.ep3 * this.Eh) / this.cf.ep3,
        this.sy * this.fsc.rate5.ep0 / this.cf.ep0 + (this.ep.ep5 * this.fsc.rate5.ep5 * this.Eh) / this.cf.ep5,
        this.sy * this.fsc.rate5.ep0 / this.cf.ep0 + (this.ep.eputs * this.fsc.rate5.eputs * this.Eh) / this.cf.eputs,
      ];
    }
  
    // find folder path
    Get_JS_Dir(start_path) {
      if (Unix()) var slash = "/";
      else if (Windows()) var slash = "\\";
      var tmp1 = start_path.split(slash);
      var tmp2 = tmp1.pop();
      var tmp3 = tmp1.join(slash) + slash;
      return tmp3;
    }
  
    // write out key file
    keyFileGenenrate() {
      /*
      pass current folder path into this method
      start_path = arguments[0] = current folder path
      How to use in Primer: csTable.keyFileGenenrate(arguments[0]);
      */
      Message("... write out key file")
  
      var f = new File(this.js_dir + this.keyname + ".key", File.WRITE);
      f.Write("*KEYWORD\n");
      // [1] material model 
      f.Write("*MAT_PIECEWISE_LINEAR_PLASTICITY_TITLE\n");
      f.Write(this.title + "\n");
      f.Write(this.mid + "," + this.rho + "," + this.E.toExponential(4) + "," + this.v + "," + this.sy.toExponential(4) + "," + this.Eh.toExponential(4) + ", 0, 0\n");
      f.Write("0,0," + this.tbid + ",0,0,0,0,0\n");
      f.Write("0,0,0,0,0,0,0,0\n");
      f.Write("0,0,0,0,0,0,0,0\n");
  
      // [2] table
      f.Write("*DEFINE_TABLE_TITLE\n");
      f.Write("table - " + this.keyname + "\n");
      f.Write(this.tbid + ",\n");
      f.Write(this.rate1 + ",\n");
      f.Write(this.rate2 + ",\n");
      f.Write(this.rate3 + ",\n");
      f.Write(this.rate4 + ",\n");
      f.Write(this.rate5 + ",\n");
  
      // [3] curves
      f.Write("*DEFINE_CURVE_TITLE\n");
      f.Write("rate=" + this.rate1.toExponential(1) + "\n");
      f.Write(this.lcid.curve1 + ", 0, 1.0, 1.0, 0, 0, 0\n");
      f.Write(this.ep.ep0.toExponential(4) + "," + this.curve1[0].toExponential(4) + "\n");
      f.Write(this.ep.ep3.toExponential(4) + "," + this.curve1[1].toExponential(4) + "\n");
      f.Write(this.ep.ep5.toExponential(4) + "," + this.curve1[2].toExponential(4) + "\n");
      f.Write(this.ep.eputs.toExponential(4) + "," + this.curve1[3].toExponential(4) + "\n");
  
      f.Write("*DEFINE_CURVE_TITLE\n");
      f.Write("rate=" + this.rate2.toExponential(1) + "\n");
      f.Write(this.lcid.curve2 + ", 0, 1.0, 1.0, 0, 0, 0\n");
      f.Write(this.ep.ep0.toExponential(4) + "," + this.curve2[0].toExponential(4) + "\n");
      f.Write(this.ep.ep3.toExponential(4) + "," + this.curve2[1].toExponential(4) + "\n");
      f.Write(this.ep.ep5.toExponential(4) + "," + this.curve2[2].toExponential(4) + "\n");
      f.Write(this.ep.eputs.toExponential(4) + "," + this.curve2[3].toExponential(4) + "\n");
  
      f.Write("*DEFINE_CURVE_TITLE\n");
      f.Write("rate=" + this.rate3.toExponential(1) + "\n");
      f.Write(this.lcid.curve3 + ", 0, 1.0, 1.0, 0, 0, 0\n");
      f.Write(this.ep.ep0.toExponential(4) + "," + this.curve3[0].toExponential(4) + "\n");
      f.Write(this.ep.ep3.toExponential(4) + "," + this.curve3[1].toExponential(4) + "\n");
      f.Write(this.ep.ep5.toExponential(4) + "," + this.curve3[2].toExponential(4) + "\n");
      f.Write(this.ep.eputs.toExponential(4) + "," + this.curve3[3].toExponential(4) + "\n");
  
      f.Write("*DEFINE_CURVE_TITLE\n");
      f.Write("rate=" + this.rate4.toExponential(1) + "\n");
      f.Write(this.lcid.curve4 + ", 0, 1.0, 1.0, 0, 0, 0\n");
      f.Write(this.ep.ep0.toExponential(4) + "," + this.curve4[0].toExponential(4) + "\n");
      f.Write(this.ep.ep3.toExponential(4) + "," + this.curve4[1].toExponential(4) + "\n");
      f.Write(this.ep.ep5.toExponential(4) + "," + this.curve4[2].toExponential(4) + "\n");
      f.Write(this.ep.eputs.toExponential(4) + "," + this.curve4[3].toExponential(4) + "\n");
  
      f.Write("*DEFINE_CURVE_TITLE\n");
      f.Write("rate=" + this.rate5.toExponential(1) + "\n");
      f.Write(this.lcid.curve5 + ", 0, 1.0, 1.0, 0, 0, 0\n");
      f.Write(this.ep.ep0.toExponential(4) + "," + this.curve5[0].toExponential(4) + "\n");
      f.Write(this.ep.ep3.toExponential(4) + "," + this.curve5[1].toExponential(4) + "\n");
      f.Write(this.ep.ep5.toExponential(4) + "," + this.curve5[2].toExponential(4) + "\n");
      f.Write(this.ep.eputs.toExponential(4) + "," + this.curve5[3].toExponential(4) + "\n");
  
      f.Write("*END\n");
      f.Close();
    }
  
    // import the key file into the current dyna model in Primer
    keyFileImport() {
  
      Message("... generate, import and delete key file")
      this.keyFileGenenrate();
      m.Import(this.js_dir + this.keyname + ".key"); // merge temp file back into main model
      var deleted = File.Delete(this.js_dir + this.keyname + ".key") // delete temp file  
    }
  }






// /**
//  * Create a single explicit dynamic analysis step
//  * @param {Model} m Model 
//  * @param {Number} endtim End time of explicit analysis 
//  */
// function AnalysisControlExp(m, endtim){

// 	m.control.termination.exists = true;
// 	m.control.termination.endtim = endtim;		// explicit termination time
// }


// /**
// * Define load and control curves, and analysis control cards for blast (explicit) analysis using dynamic relaxation for preload;
// * Step 1 - static preload application - Implicit;
// * Step 2 - blast load application - Explicit;
// * Input parameters:
// * @param m model id
// * @param paraCtrl all control parameters:  const paraCtrl = {imp_tim: 1.0, exp_tim: 3.0} // duration for implicit and explicite stage
// */

// function AnalysisControlImpExp(m, paraCtrl){

//   // Base Unity Load Curve
//   var Base_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000000);	
//   Base_Unity_Load_Curve.heading = "Base Unity Load Curve"
//   Base_Unity_Load_Curve.AddPoint(0, 0);
//   Base_Unity_Load_Curve.AddPoint(1.0, 1.0);			
//   Base_Unity_Load_Curve.AddPoint(10.0, 1.0);

//   // Base Unity Gravity Curve
//   var Base_Unity_Gravity_Curve = new Curve(Curve.CURVE, m, 1000001);	
//   Base_Unity_Gravity_Curve.heading = "Base Unity Gravity Curve"
//   Base_Unity_Gravity_Curve.AddPoint(0, 0);
//   Base_Unity_Gravity_Curve.AddPoint(1.0, 1.0);			
//   Base_Unity_Gravity_Curve.AddPoint(10.0, 1.0);

//   // Implicit to Explicit Switch Curve
//   var Implicit_to_Explicit_Switch_Curve = new Curve(Curve.CURVE, m, 1000003);	
//   Implicit_to_Explicit_Switch_Curve.heading = "Implicit to Explicit Switch Curve"
//   Implicit_to_Explicit_Switch_Curve.AddPoint(0, 1.0); 			
//   Implicit_to_Explicit_Switch_Curve.AddPoint(0.99999*paraCtrl.imp_tim, 1.0); // 0 - 1 sec, implicit
//   Implicit_to_Explicit_Switch_Curve.AddPoint(paraCtrl.imp_tim, 0);
//   Implicit_to_Explicit_Switch_Curve.AddPoint(10.0, 0.0);

//   // Max Timestep Limit Curve
//   var Max_Timestep_Limit_Curve = new Curve(Curve.CURVE, m, 2000000);	
//   Max_Timestep_Limit_Curve.heading = "Max Timestep Limit Curve"
//   Max_Timestep_Limit_Curve.AddPoint(0, 1.0E-6);			
//   Max_Timestep_Limit_Curve.AddPoint(100.0, 1.0E-6);

//   // Control settings
//   m.control.hourglass.exists = false;
//   m.control.hourglass.ihq = 6;
//   m.control.hourglass.qh = 0.02;
  
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.imp_tim+paraCtrl.exp_tim; // 

//   m.control.implicit_general.exists = true;
//   m.control.implicit_general.imflag = -Implicit_to_Explicit_Switch_Curve.lcid;	// Implict-Explicit switching curve ID
//   m.control.implicit_general.dt0 = 0.01;  		// initial time step size for implicit

//   m.control.implicit_auto.exists = true;
//   m.control.implicit_auto.iauto = 1;
//   m.control.implicit_auto.dtmin = 1e-4;
//   m.control.implicit_auto.dtmax= 0.02;
  
//   return {Base_Unity_Load_Curve, 
//           Base_Unity_Gravity_Curve, 
//           Implicit_to_Explicit_Switch_Curve
//   }


// }


// /**
// * Define load and control curves, and analysis control cards for blast (explicit) analysis using dynamic relaxation for preload 
// * Step 1 - static preload application - Dynamic relaxation
// * Step 2 - blast load application - Explicit
// * Input parameters:
// * @param m model id
// * @param paraCtrl all control parameters;  paraCtrl = {endtim: 0.2}
// */
// function AnalysisControlDynExp(m, paraCtrl){

//   // Base Unity Load Curve
//   var Base_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000000);	
//   Base_Unity_Load_Curve.heading = "Base Unity Load Curve"
//   Base_Unity_Load_Curve.AddPoint(0, 1);			
//   Base_Unity_Load_Curve.AddPoint(100.0, 1);

//   // Base Unity Gravity Curve
//   var Base_Unity_Gravity_Curve = new Curve(Curve.CURVE, m, 1000001);	
//   Base_Unity_Gravity_Curve.heading = "Base Unity Gravity Curve"
//   Base_Unity_Gravity_Curve.AddPoint(0, 1);			
//   Base_Unity_Gravity_Curve.AddPoint(100.0, 1);

//   // DR Ramped Unity Load Curve
//   var DR_Ramped_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000002);	
//   DR_Ramped_Unity_Load_Curve.heading = "DR Ramped Unity Load Curve"
//   DR_Ramped_Unity_Load_Curve.AddPoint(0, 0);			
//   DR_Ramped_Unity_Load_Curve.AddPoint(paraCtrl.relaxramptim, 1);
//   DR_Ramped_Unity_Load_Curve.AddPoint(100.0, 1);
//   DR_Ramped_Unity_Load_Curve.sidr = 1;

//   // Max Timestep Limit Curve
//   var Max_Timestep_Limit_Curve = new Curve(Curve.CURVE, m, 2000000);	
//   Max_Timestep_Limit_Curve.heading = "Max Timestep Limit Curve"
//   Max_Timestep_Limit_Curve.AddPoint(0, 1.0E-6);			
//   Max_Timestep_Limit_Curve.AddPoint(100.0, 1.0E-6);

//   // Control settings
//   m.control.hourglass.exists = false;
//   m.control.hourglass.ihq = 6;
//   m.control.hourglass.qh = 0.02;
  
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.dynamic_relaxation.exists = true;
//   m.control.dynamic_relaxation.drterm = paraCtrl.drterm;
//   m.control.dynamic_relaxation.idrflg = -1;
//   m.control.dynamic_relaxation.nrcyck = 250;
//   m.control.dynamic_relaxation.drtol = paraCtrl.drtol;
//   m.control.dynamic_relaxation.drfctr = 0.995;
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.endtim; // does not include dynamic relaxation step duration 
  
//   return {Base_Unity_Load_Curve, 
//           Base_Unity_Gravity_Curve, 
//           DR_Ramped_Unity_Load_Curve,
//   }

// }

// /**
// * Define load and control curves, and analysis control cards for blast (explicit) analysis using dynamic relaxation for preload 
// * Step 1 - static preload application - Dynamic relaxation
// * Step 2 - blast load application - Explicit
// * Step 3 - ramp up static preload - Implicit
// * Input parameters:
// * @param m model id
// * @param paraCtrl all control parameters;  paraCtrl = {endtimexp: 0.1, endtimtotal: 1.1, framp: 1.5};
// *                                                      endtimexp - explicit blast stage end time
// *                                                      endtimtotal - total end time, including the implcit preload ramping up stage
// *                                                      framp - load factor for preload ramp up
// */
// function AnalysisControlDynExpImpRamp(m, paraCtrl){

//   // Base Unity Load Curve
//   var Base_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000000);	
//   Base_Unity_Load_Curve.heading = "Base Unity Load Curve"
//   Base_Unity_Load_Curve.AddPoint(0, 1);
//   Base_Unity_Load_Curve.AddPoint(paraCtrl.endtimexp, 1);
//   Base_Unity_Load_Curve.AddPoint(paraCtrl.endtimtotal, paraCtrl.framp);			
//   Base_Unity_Load_Curve.AddPoint(10.0, paraCtrl.framp);

//   // Base Unity Gravity Curve
//   var Base_Unity_Gravity_Curve = new Curve(Curve.CURVE, m, 1000001);	
//   Base_Unity_Gravity_Curve.heading = "Base Unity Gravity Curve"
//   Base_Unity_Gravity_Curve.AddPoint(0, 1);			
//   Base_Unity_Gravity_Curve.AddPoint(10.0, 1);

//   // DR Ramped Unity Load Curve
//   var DR_Ramped_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000002);	
//   DR_Ramped_Unity_Load_Curve.heading = "DR Ramped Unity Load Curve"
//   DR_Ramped_Unity_Load_Curve.AddPoint(0, 0);			
//   DR_Ramped_Unity_Load_Curve.AddPoint(0.005, 1);
//   DR_Ramped_Unity_Load_Curve.AddPoint(10.0, 1);
//   DR_Ramped_Unity_Load_Curve.sidr = 1;

//   // Explicit to Implict Switch Curve
//   var Explicit_to_Implict_Switch_Curve = new Curve(Curve.CURVE, m, 1000003);	
//   Explicit_to_Implict_Switch_Curve.heading = "Explicit to Implict Switch Curve"
//   Explicit_to_Implict_Switch_Curve.AddPoint(0, 0);			
//   Explicit_to_Implict_Switch_Curve.AddPoint(paraCtrl.endtimexp*0.999, 0);
//   Explicit_to_Implict_Switch_Curve.AddPoint(paraCtrl.endtimexp, 1);
//   Explicit_to_Implict_Switch_Curve.AddPoint(10.0, 1);

//   // Max Timestep Limit Curve
//   var Max_Timestep_Limit_Curve = new Curve(Curve.CURVE, m, 2000000);	
//   Max_Timestep_Limit_Curve.heading = "Max Timestep Limit Curve"
//   Max_Timestep_Limit_Curve.AddPoint(0, 1.0E-6);			
//   Max_Timestep_Limit_Curve.AddPoint(100.0, 1.0E-6);

//   // Control settings
//   m.control.hourglass.exists = false;
//   m.control.hourglass.ihq = 6;
//   m.control.hourglass.qh = 0.02;
  
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.dynamic_relaxation.exists = true;
//   m.control.dynamic_relaxation.drterm = 0.2;
//   m.control.dynamic_relaxation.idrflg = -1;
//   m.control.dynamic_relaxation.nrcyck = 250;
//   m.control.dynamic_relaxation.drtol = 0.001;
//   m.control.dynamic_relaxation.drfctr = 0.995;
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.endtimtotal; // does not include dynamic relaxation step duration 

//   m.control.implicit_general.exists = true;
//   m.control.implicit_general.imflag = -Explicit_to_Implict_Switch_Curve.lcid;	// Implict-Explicit switching curve ID
//   m.control.implicit_general.dt0 = 0.01;  		// initial time step size for implicit

//   m.control.implicit_auto.exists = true;
//   m.control.implicit_auto.iauto = 1;
//   m.control.implicit_auto.dtmin = 1e-4;
//   m.control.implicit_auto.dtmax= 0.02;
  
//   return {Base_Unity_Load_Curve, 
//           Base_Unity_Gravity_Curve, 
//           DR_Ramped_Unity_Load_Curve,
//           Explicit_to_Implict_Switch_Curve
//   }

// }

// /**
//  * 
//  * 
//  * 
// */
// function AnalysisControlImpExpImpRamp(m, paraCtrl){

//   // Base Unity Load Curve
//   var Base_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000000);	
//   Base_Unity_Load_Curve.heading = "Base Unity Load Curve"
//   Base_Unity_Load_Curve.AddPoint(0, 0);
//   Base_Unity_Load_Curve.AddPoint(1.0, 1.0);
//   Base_Unity_Load_Curve.AddPoint(1.0+paraCtrl.endtimexp, 1);
//   Base_Unity_Load_Curve.AddPoint(paraCtrl.endtimtotal, paraCtrl.framp);			
//   Base_Unity_Load_Curve.AddPoint(10.0, paraCtrl.framp);

//   // Base Unity Gravity Curve
//   var Base_Unity_Gravity_Curve = new Curve(Curve.CURVE, m, 1000001);	
//   Base_Unity_Gravity_Curve.heading = "Base Unity Gravity Curve"
//   Base_Unity_Gravity_Curve.AddPoint(0, 0);
//   Base_Unity_Gravity_Curve.AddPoint(1.0, 1.0);			
//   Base_Unity_Gravity_Curve.AddPoint(10.0, 1.0);

//   // Implicit to Explicit to Implict Switch Curve
//   var Implicit_to_Explicit_to_Implict_Switch_Curve = new Curve(Curve.CURVE, m, 1000003);	
//   Implicit_to_Explicit_to_Implict_Switch_Curve.heading = "Implicit to Explicit to Implict Switch Curve"
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(0, 1.0); 			
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(0.99999, 1.0); // 0 - 1 sec, implicit
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(1.0, 0);
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(1.0+paraCtrl.endtimexp, 0);
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(1.00001+paraCtrl.endtimexp, 1);
//   Implicit_to_Explicit_to_Implict_Switch_Curve.AddPoint(10.0, 1.0);

//   // Max Timestep Limit Curve
//   var Max_Timestep_Limit_Curve = new Curve(Curve.CURVE, m, 2000000);	
//   Max_Timestep_Limit_Curve.heading = "Max Timestep Limit Curve"
//   Max_Timestep_Limit_Curve.AddPoint(0, 1.0E-6);			
//   Max_Timestep_Limit_Curve.AddPoint(100.0, 1.0E-6);

//   // Control settings
//   m.control.hourglass.exists = false;
//   m.control.hourglass.ihq = 6;
//   m.control.hourglass.qh = 0.02;
  
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.endtimtotal; // does not include dynamic relaxation step duration 

//   m.control.implicit_general.exists = true;
//   m.control.implicit_general.imflag = -Implicit_to_Explicit_to_Implict_Switch_Curve.lcid;	// Implict-Explicit switching curve ID
//   m.control.implicit_general.dt0 = 0.01;  		// initial time step size for implicit
//   m.control.implicit_general.zero_v = 1;      // zero out the velocity before swicthing from explicit to implicit

//   m.control.implicit_auto.exists = true;
//   m.control.implicit_auto.iauto = 1;
//   m.control.implicit_auto.dtmin = 1e-4;
//   m.control.implicit_auto.dtmax= 0.02;
  
//   return {Base_Unity_Load_Curve, 
//           Base_Unity_Gravity_Curve, 
//           Implicit_to_Explicit_to_Implict_Switch_Curve
//   }

// }


// /**
//  * 
//  * 
//  * 
//  * 
// */
// function AnalysisControlExpSmoothRamp(m, paraCtrl){

//   // Smooth Base Unity Load Curve - can be defined by "framp"
//   var Smooth_Base_Unity_Load_Curve = smooth_step_curve(m, paraCtrl.endtimexp, paraCtrl.framp, 1000, 1000000,'Smooth_Base_Unity_Load_Curve');

//   // Smooth Base Unity Gravity Curve - always ramp to 1.0
//   var Smooth_Base_Gravity_Load_Curve = smooth_step_curve(m, paraCtrl.endtimexp, 1.0, 1000, 1000001,'Smooth_Base_Gravity_Load_Curve');

//   // Max Timestep Limit Curve
//   var Max_Timestep_Limit_Curve = new Curve(Curve.CURVE, m, 2000000);	
//   Max_Timestep_Limit_Curve.heading = "Max Timestep Limit Curve"
//   Max_Timestep_Limit_Curve.AddPoint(0, 1.0E-6);			
//   Max_Timestep_Limit_Curve.AddPoint(100.0, 1.0E-6);

//   // Control settings
//   m.control.hourglass.exists = false;
//   m.control.hourglass.ihq = 6;
//   m.control.hourglass.qh = 0.02;
  
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.endtim;  

//   return {Smooth_Base_Unity_Load_Curve, 
//           Smooth_Base_Gravity_Load_Curve, 
//   }

// }

// /**
//  * 
//  * 
//  * 
// */
// function AnalysisControlImplicit(m, paraCtrl){


//   // Base Unity Load Curve
//   var Base_Unity_Load_Curve = new Curve(Curve.CURVE, m, 1000000);	
//   Base_Unity_Load_Curve.heading = "Base Unity Load Curve"
//   Base_Unity_Load_Curve.AddPoint(0, 0);
//   Base_Unity_Load_Curve.AddPoint(paraCtrl.endtimimp, paraCtrl.framp);

//   // Base Unity Gravity Curve
//   var Base_Unity_Gravity_Curve = new Curve(Curve.CURVE, m, 1000001);	
//   Base_Unity_Gravity_Curve.heading = "Base Unity Gravity Curve"
//   Base_Unity_Gravity_Curve.AddPoint(0, 0);
//   Base_Unity_Gravity_Curve.AddPoint(paraCtrl.endtimimp, 1.0);			

//   // Control settings
//   m.control.energy.exists = true;
//   m.control.energy.hgen = 2; 
  
//   m.control.termination.exists = true;
//   m.control.termination.endtim = paraCtrl.endtimimp; // does not include dynamic relaxation step duration 

//   m.control.implicit_general.exists = true;
//   m.control.implicit_general.imflag = 1;
//   m.control.implicit_general.dt0 = paraCtrl.dt0;  		// initial time step size for implicit

//   m.control.implicit_auto.exists = true;
//   m.control.implicit_auto.iauto = 1;
//   m.control.implicit_auto.dtmin = 1e-4;
//   m.control.implicit_auto.dtmax= paraCtrl.dtmax;        // max time step for implicit

//   return {Base_Unity_Load_Curve, 
//           Base_Unity_Gravity_Curve, 
//   }

// }


/**
  Create a point ([x1, y1, z1]) by offset from an exisitng point (x0, y0, z0)

  Input:
  @param x0 x coorindate of exisitng point
  @param y0 y coorindate of exisitng point
  @param z0 z coorindate of exisitng point
  @param uv uv coorindate of exisitng point [vx, vy, vz]
  @param dist dist coorindate of exisitng point

  Return:
  A new point {x: x1, y: y1, z:z1} 
*/
function PointByOffset(m, pt, uv, dist){

  var x1 = pt.x + dist*uv.vx
  var y1 = pt.y + dist*uv.vy
  var z1 = pt.z + dist*uv.vz

  return {x: x1, y: y1, z:z1}
}

/**
 * Create a new node by offset from existing node
 * @param {Model} m Model
 * @param {Number} nid node id 
 * @param {Array} uv directional unit vector [vx, vy, vz] 
 * @param {Number} dist offset distance 
 * @returns 
 */
function NodeByOffset(m, nid, uv, dist){

	var node = Node.GetFromID(m, nid);
	
	var x = node.x + dist*uv[0];
	var y = node.y + dist*uv[1];
	var z = node.z + dist*uv[2];
	
	var node_offset = new Node(m, Node.NextFreeLabel(m), x, y, z);

	return node_offset
  }


/**
Create a smooth step curve- start from time zero to t1

Input:
  @param m  model ID
  @param t1 end time
  @param A1 amplitude of the smooth step function
  @param nmax number of points in the smooth curve
  @param heading curve title/heading, type: string
*/
function smooth_step_curve(m, t1, A1, nmax, lcid, heading){


  Message('... create a smooth step function curve');

  var smooth_step_curve = new Curve(Curve.CURVE, m, lcid);
  smooth_step_curve.heading = heading;
  
  var dt = t1/nmax;
  var t0 = 0.0;
  var A0 = 0.0;
  var t = 0.0;
  var a = 0.0;

  while(t < t1){

    var Xi = (t-t0)/(t1-t0);
    
    a = A0 + (A1-A0)*Xi*Xi*Xi*(10-15*Xi+6*Xi*Xi);
    
    smooth_step_curve.AddPoint(t, a);

    t = t + dt;
  
  }
  
  smooth_step_curve.AddPoint(t1, A1);
  
  return smooth_step_curve;
}

/**
Create a smooth step curve- start from time zero to t1

Input:
  @param m  model ID
  @param t1 end time
  @param A1 amplitude of the smooth step function
  @param nmax number of points in the smooth curve
  @param heading curve title/heading, type: string
*/
function smooth_step_curve2(m, t1, A1, nmax, lcid, heading){


  Message('... create a smooth step function curve');

  var smooth_step_curve = new Curve(Curve.CURVE, m, lcid);
  smooth_step_curve.heading = heading;

  t1 = 2*t1;
  A1 = 2*A1;
  
  var dt = t1/nmax;
  var t0 = 0.0;
  var A0 = 0.0;
  var t = 0.0;
  var a = 0.0;

  while(t < t1){

    var Xi = (t-t0)/(t1-t0);
    
    a = A0 + (A1-A0)*Xi*Xi*Xi*(10-15*Xi+6*Xi*Xi);
    
    smooth_step_curve.AddPoint(t, a);

    t = t + dt;

    if (t>0.5*t1) break
  
  }
  
  smooth_step_curve.AddPoint(0.5*t1, 0.5*A1);
  
  return smooth_step_curve;
}
