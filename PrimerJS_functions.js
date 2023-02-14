
/*
JS scripts for Oasys Primer - utility and genereal functions
Anqi Chen
20-09-2021
*/

function Get_JS_Dir(start_path) {
    if (Unix()) var slash = "/";
    else if (Windows()) var slash = "\\";

    var tmp1 = start_path.split(slash);
    var tmp2 = tmp1.pop();
    var tmp3 = tmp1.join(slash) + slash;

    return tmp3;
}

// function degTorad(degrees)
// {
//   var pi = Math.PI;
//   return degrees * (pi/180);
// }

function DegToRad(deg)
{
  var pi = Math.PI;
  return deg * (pi/180);
}

class Point{
	constructor(x, y, z) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	}
}

var ShellMeshRectangle = {

	//   Parameters for mesh:
	//      num_x         = number of elements in X-direction
	//      num_y         = number of elements in Y-direction
	//      size_x        = size of element in X-direction
	//      size_y        = size of element in Y-direction
	//      x0            = x-coordinate of bottom-left corner
	//      y0            = y-coordinate of bottom-left corner
	//      ID_node       = starting ID for nodes
	//      ID_shell      = starting ID for shell elements
	//      ID_part       = ID of part for shell elements
	//      ID_node_next  = ID for next node to be created
	//      ID_shell_next = ID for next shell to be created

	x0: 0.0, // x-coordinate of left bottom corner
	y0: 0.0, // y-coordinate of left bottom corner
	Lx: 1.0, // m, slab length in x direction
	Ly: 2.0, // m, slab length in y direction
	size_x: 0.2, // element size in x direction
	size_y: 0.2, // element size in y direction

	pid: 1, // part id, default value

	ID_node: 1, // starting node number
	ID_shell: 1, // starting shell number

	// dim : function() {
	// 	return this.Lx + " " + this.Ly;
	//   }

	quad_mesh: function () {

		// var Lx = 13.65; // m, slab length in x direction
		// var Ly = 34.13; // m, slab length in y direction

		// var size_x = 0.2;
		// var size_y = size_x;

		// var x0     = 0.0;
		// var y0     = 0.0;

		var num_x = Math.round(this.Lx / this.size_x);
		var num_y = Math.round(this.Ly / this.size_y);

		var x_max = num_x * this.size_x; // maximum x coordinate
		var y_max = num_y * this.size_y; // maximum y coordinate

		var ID_part = this.pid;

		var ID_node_next = this.ID_node;
		var ID_shell_next = this.ID_shell;

		Message([num_x, num_y]);
		Message([x_max, y_max]);

		//   Create nodes
		//   N.B we need num_x+1 in the X-direction, num_y+1 in the Y-direction
		//
		//   We will make nodes with IDs in this pattern (taking as an example
		//     ID_node = 1000, num_x = 4 elements, num_y = 3 elements):
		//
		//     Y
		//     |
		//
		//    1015----1016----1017----1018----1019
		//      |       |       |       |       |
		//    1010----1011----1012----1013----1014
		//      |       |       |       |       |
		//    1005----1006----1007----1008----1009
		//      |       |       |       |       |
		//    1000----1001----1002----1003----1004    -X
		//

		Message("Making nodes");


		for (var iy = 0; iy < num_y + 1; iy++) {
			for (var ix = 0; ix < num_x + 1; ix++) {
				var x = this.x0 + ix * this.size_x;
				var y = this.y0 + iy * this.size_y;
				var z = 0.0;
				var n = new Node(m, ID_node_next, x, y, z);
				ID_node_next++;
			}
		}

		//   Create shells
		//
		//   We will bear in mind the above pattern of node IDs when creating
		//   the shell elements

		Message("Making shells");

		Message(ID_shell_next);

		for (var iy = 0; iy < num_y; iy++) {
			for (var ix = 0; ix < num_x; ix++) {
				var ix1 = this.ID_node + ix + (num_x + 1) * iy;
				var ix2 = ix1 + 1;
				var ix3 = ix2 + num_x + 1;
				var ix4 = ix3 - 1;
				var s = new Shell(m, ID_shell_next, ID_part, ix1, ix2, ix3, ix4);
				ID_shell_next++;
			}
		}

	}

}

/**
 * Create shell mesh of a box section in the XY plane
 * x - major axis
 * y - minor axis
 * 
 * Input parameters
 * @param m model id
 * @param pid part id of the shell mesh
 * @param Lx box section width in x direction 
 * @param Ly box section height in y direction
 * @param tf flange thickness
 * @param tw web thinkness
 * @param dx element size in x direction
 * @param dy element size in y direction
 * @param dthk elemet size through thickness
 *
 * Example of using number of elements:
 *  
 * 		dx = (Lx-tw-tf)/Nx, dy = dx, dthk = tw/Nthk
 * 
 * 		Nx - number of elements in x-direction
 * 		Ny - number of elements in y-direction
 * 		Nthk - number of elements through thickness
 *  
*/
function ShellMeshBoxSection(m, pid, Lx, Ly, tf, tw, dx, dy, dthk){

	var s = ShellMeshRectangle;
	// s1 
	s.pid = pid;
	s.x0 = -0.5*Lx;	s.y0 = 0.5*Ly-tf;
	s.Lx = tw; 	s.Ly = tf;
	s.size_x = dthk;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// s2
	s.pid = pid;
	s.x0 = -0.5*Lx+tw;	s.y0 = 0.5*Ly-tf;
	s.Lx = Lx-2*tw; 	s.Ly = tf;
	s.size_x = dx;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// s3
	s.pid = pid;
	s.x0 = 0.5*Lx-tw;	s.y0 = 0.5*Ly-tf;
	s.Lx = tw; 	s.Ly = tf;
	s.size_x = dthk;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// s4
	s.pid = pid;
	s.x0 = -0.5*Lx;	s.y0 = -0.5*Ly+tf;
	s.Lx = tw; 	s.Ly = Ly-2*tf;
	s.size_x = dthk;	s.size_y = dy;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();	

	// s5
	s.pid = pid;
	s.x0 = 0.5*Lx-tw;	s.y0 = -0.5*Ly+tf;
	s.Lx = tw; 	s.Ly = Ly-2*tf;
	s.size_x = dthk;	s.size_y = dy;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();	

	// s6 
	s.pid = pid;
	s.x0 = -0.5*Lx;	s.y0 = -0.5*Ly;
	s.Lx = tw; 	s.Ly = tf;
	s.size_x = dthk;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// s7
	s.pid = pid;
	s.x0 = -0.5*Lx+tw;	s.y0 = -0.5*Ly;
	s.Lx = Lx-2*tw; 	s.Ly = tf;
	s.size_x = dx;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// s8
	s.pid = pid;
	s.x0 = 0.5*Lx-tw;	s.y0 = -0.5*Ly;
	s.Lx = tw; 	s.Ly = tf;
	s.size_x = dthk;	s.size_y = dthk;
	s.ID_node = Node.NextFreeLabel(m);	s.ID_shell = Shell.NextFreeLabel(m); 
	s.quad_mesh();

	// merge all nodes of the shell part
	var flag_shell_node_merge = AllocateFlag();
	// Node.FlagAll(m, flag_shell_node_merge);

	var shellPart = Part.GetFromID(m, pid)

	shellPart.SetFlag(flag_shell_node_merge);
	m.PropagateFlag(flag_shell_node_merge);
	Node.Merge(m, flag_shell_node_merge, 1e-4);
	ReturnFlag(flag_shell_node_merge);

	return Part.GetFromID(m, pid);
}

/**
 * Create set_beam keyword card for beam element set
 * @param {*} m model (object) 
 * @param {*} beams list of beam element id numbers or list of beam element objects (object)
 * @param {*} sid set id (number)
 * @param {*} title set title (string)
 * @returns a beam set object
 */
function createSetBeamID(m, beams, sid, title) {
	const bs = new Set(m, sid, Set.BEAM, title);
	// case 1 - input "beams" is a array of beam eids
	if (typeof beams == 'object' && typeof beams[0] == 'number'){
		for (var id of beams) {bs.Add(id)}
	}
	// case 2 - input "beams" is a array of beam element objects
	else if (typeof beams == 'object' && typeof beams[0] == 'object') {
		for (var bm of beams) {bs.Add(bm.eid)}
	}

	return bs
}

/**
 * 
 * @param {*} m model (object)
 * @param {*} nodes list of node id numbers or list of node objects
 * @param {*} sid set id (number)
 * @param {*} title set title (string)
 * @returns a node set object
 */
function createSetNodeID(m, nodes, sid, title){
	const ns = new Set(m, sid, Set.NODE, title);
	// case 1 - input "beams" is a array of beam eids
	if (typeof nodes == 'object' && typeof nodes[0] == 'number'){
		for (var id of nodes) {ns.Add(id)}
	}
	// case 2 - input "beams" is a array of beam element objects
	else if (typeof nodes == 'object' && typeof nodes[0] == 'object') {
		for (var bm of nodes) {ns.Add(bm.nid)}
	}

	return ns
}


function createSetBeam(m, blist, title) {

    /*
    create new BEAM set 

    input:
    m - model id
    blist - array, list of beam ids
    */

    const bs = new Set(m, Set.NextFreeLabel(m, Set.BEAM) , Set.BEAM, title);

    for (var b of blist) {bs.Add(b)}

    return bs
}

function createSetNode(m, nlist, title) {

    /*
    create new NODE set 

    input:
    m - model id
    nlist - array, list of node ids
    */

    const ns = new Set(m, Set.NextFreeLabel(m, Set.NODE) , Set.NODE, title);

    for (var n of nlist) {ns.Add(n)}

    return ns

}

function pointInPolygon(point, vs)
{
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	
	// point = point coordinate array [x, y]
	// vs = array of coordiantes defining the polygon
	//		[ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
 	
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}

function reflectPoint(p, p0, p1, pid) {

    /*
     * @brief Reflect point p along line through points p0 and p1
     *
     * @author Balint Morvai <balint@morvai.de>
     * @license http://en.wikipedia.org/wiki/MIT_License MIT License 
     * @param p point to reflect
     * @param p0 first point for reflection line
     * @param p1 second point for reflection line
     * @return object
     */

    // https://bl.ocks.org/balint42/b99934b2a6990a53e14b

    var dx, dy, a, b, x, y;

    dx = p1.x - p0.x;
    dy = p1.y - p0.y;
    a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
    b = 2 * dx * dy / (dx * dx + dy * dy);
    x = a * (p.x - p0.x) + b * (p.y - p0.y) + p0.x;
    y = b * (p.x - p0.x) - a * (p.y - p0.y) + p0.y;

    var p_reflected = {
        pid: pid,
        x: x,
        y: y,
        z: 0
    }

    return p_reflected;
}

/**
 * 
 * @param {Model} m Model 
 * @param {Number} pid Part id 
 * @param {Boolean} bool True or false for recursive deletion  
 * @returns 
 */
function DeletePart(m, pid, bool) {

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

/**
 * 
 * @param {Model} m Model 
 * @param {*} sh  number (eid) or an array of numbers (eid)
 */
function DeleteShellElement(m, sh) {
    /*
    sh = shell element id, can be single number or a list of ids [] 
    */

    var flag = AllocateFlag();

    if (typeof sh === "number") {
        // Message("...number");
        var shell_ele = Shell.GetFromID(m, sh);
        shell_ele.SetFlag(flag);

    } else if (typeof sh === "object") {
        // Message("...object list")
        for (var eid in sh) {
            // Message(sh[eid]);
            var shell_ele = Shell.GetFromID(m, sh[eid]);
            shell_ele.SetFlag(flag);
        }

    } else {
        ErrorMessage("argement type error - must be a number or object (list of number)")
    }

    // delete all flagged shell elements
    m.DeleteFlagged(flag);
    ReturnFlag(flag);

}

/**
 * 
 * @param {Model} m Model 
 * @param {*} bid  number (bid) or an array of numbers (bid)
 */
function DeleteBeamElement(m, bid) {
    /*
    bid = beam element id, can be single number or a list of ids [] 
    */

    var flag = AllocateFlag();

    if (typeof bid === "number") {
        // Message("...number");
        var beam_ele = Beam.GetFromID(m, bid);
        beam_ele.SetFlag(flag);beam_ele

    } else if (typeof bid === "object") {
        // Message("...object list")
        for (var eid in bid) {
            // Message(sh[eid]);
            var beam_ele = Beam.GetFromID(m, bid[eid]);
            beam_ele.SetFlag(flag);
        }

    } else {
        ErrorMessage("argement type error - must be a number or object (list of number)")
    }

    // delete all flagged shell elements
    m.DeleteFlagged(flag);
    ReturnFlag(flag);

}


/**
 * 
 * @param {Model} m Model 
 * @param {Number} pid Part id
 * @param {Array} nids Array of node ids for creating shell element
 * @returns 
 */
function CreateShellELement(m, pid, nids) {
    /*
    create individual shell element
    nids = array of three or four nodes defining the shell element
    */

    if (nids.length === 4) {
        var new_shell_element = new Shell(m, Shell.NextFreeLabel(m), pid,
            nids[0], nids[1], nids[2], nids[3], )
    } else if (nids.length === 3) {
        var new_shell_element = new Shell(m, Shell.NextFreeLabel(m), pid,
            nids[0], nids[1], nids[2], nids[2], )
    }

	return new_shell_element
}

function unitVectorbyTwoNodes(m, nid1, nid2) {

    var n1 = Node.GetFromID(m, nid1);
    var n2 = Node.GetFromID(m, nid2);

    var L = Math.sqrt(Math.pow((n1.x - n2.x), 2) + Math.pow((n1.y - n2.y), 2) + Math.pow((n1.z - n2.z), 2));

    var U = {
        vx: (n2.x - n1.x) / L,
        vy: (n2.y - n1.y) / L,
        vz: (n2.z - n1.z) / L
    };

    // deterimine orientation of the beam unit vector
    // X - in global x direction
    // Y - in global y direction
    // Z - in global z direction
    // Oblique - not in any of the three global direction
    
    var orientation;

    var Ux = {
        vx: 1.0,
        vy: 0.0,
        vz: 0.0
    };
    var Uy = {
        vx: 0.0,
        vy: 1.0,
        vz: 0.0
    };
    var Uz = {
        vx: 0.0,
        vy: 0.0,
        vz: 1.0
    };

    const tol = 1e-2;

    if (Math.abs(U.vx) > Ux.vx - tol && Math.abs(U.vx) < Ux.vx + tol &&
        Math.abs(U.vy) > Ux.vy - tol && Math.abs(U.vy) < Uy.vy + tol &&
        Math.abs(U.vz) > Ux.vz - tol && Math.abs(U.vz) < Ux.vz + tol) {
        orientation = 'X';

    } else if (     Math.abs(U.vx) > Uy.vx - tol && Math.abs(U.vx) < Uy.vx + tol &&
                    Math.abs(U.vy) > Uy.vy - tol && Math.abs(U.vy) < Uy.vy + tol &&
                    Math.abs(U.vz) > Uy.vz - tol && Math.abs(U.vz) < Uy.vz + tol) {
        orientation = 'Y';

    } else if ( Math.abs(U.vx) > Uz.vx - tol && Math.abs(U.vx) < Uz.vx + tol &&
                Math.abs(U.vy) > Uz.vy - tol && Math.abs(U.vy) < Uz.vy + tol &&
                Math.abs(U.vz) > Uz.vz - tol && Math.abs(U.vz) < Uz.vz + tol) {
        orientation = 'Z';

    } else {
        orientation = 'Oblique';
    }

    var vector = {
        uv: U,
        len: L,
        ori: orientation,
    }; // uv - unit vector, L - distance between nodes

    // Message(orientation);

    return vector
}

/**
 * 
 * @param {Model} m Model
 * @param {Array} arr1 location of point 1 [x, y, z]
 * @param {Array} arr2 locaiton of point 2 [x, y, z]
 * @returns 
 */
function unitVectorbyTwoPoints(m, arr1, arr2) {

    var n1 = {x: arr1[0], y: arr1[1], z: arr1[2]};
    var n2 = {x: arr2[0], y: arr2[1], z: arr2[2]};

    var L = Math.sqrt(Math.pow((n1.x - n2.x), 2) + Math.pow((n1.y - n2.y), 2) + Math.pow((n1.z - n2.z), 2));

    var U = {
        vx: (n2.x - n1.x) / L,
        vy: (n2.y - n1.y) / L,
        vz: (n2.z - n1.z) / L
    };

    // deterimine orientation of the beam unit vector
    // X - in global x direction
    // Y - in global y direction
    // Z - in global z direction
    // Oblique - not in any of the three global direction
    
    var orientation;

    var Ux = {
        vx: 1.0,
        vy: 0.0,
        vz: 0.0
    };
    var Uy = {
        vx: 0.0,
        vy: 1.0,
        vz: 0.0
    };
    var Uz = {
        vx: 0.0,
        vy: 0.0,
        vz: 1.0
    };

    const tol = 1e-2;

    if (Math.abs(U.vx) > Ux.vx - tol && Math.abs(U.vx) < Ux.vx + tol &&
        Math.abs(U.vy) > Ux.vy - tol && Math.abs(U.vy) < Uy.vy + tol &&
        Math.abs(U.vz) > Ux.vz - tol && Math.abs(U.vz) < Ux.vz + tol) {
        orientation = 'X';

    } else if (     Math.abs(U.vx) > Uy.vx - tol && Math.abs(U.vx) < Uy.vx + tol &&
                    Math.abs(U.vy) > Uy.vy - tol && Math.abs(U.vy) < Uy.vy + tol &&
                    Math.abs(U.vz) > Uy.vz - tol && Math.abs(U.vz) < Uy.vz + tol) {
        orientation = 'Y';

    } else if ( Math.abs(U.vx) > Uz.vx - tol && Math.abs(U.vx) < Uz.vx + tol &&
                Math.abs(U.vy) > Uz.vy - tol && Math.abs(U.vy) < Uz.vy + tol &&
                Math.abs(U.vz) > Uz.vz - tol && Math.abs(U.vz) < Uz.vz + tol) {
        orientation = 'Z';

    } else {
        orientation = 'Oblique';
    }

    var vector = {
        uv: U,
        len: L,
        ori: orientation,
    }; // uv - unit vector, L - distance between nodes

    // Message(orientation);

    return vector
}

function ShellPartTotalArea(m, pid) {

    var flag = AllocateFlag();
    var total_area = 0.0; //m2

    var p = Part.GetFromID(m, pid);
    p.SetFlag(flag);
    m.PropagateFlag(flag);
    var shells = Shell.GetFlagged(m, flag);

    for (var i = 0; i < shells.length; i++) {
        var shell = shells[i];
        // Message(shell.eid + ' | ' +shell.Area())
        total_area = total_area + shell.Area();
    }

    ReturnFlag(flag);

    return total_area;
}

function useBeamThirdNode(m, bid) {

    // get beam element
    var b = Beam.GetFromID(m, bid);


    if (b.orientation == 1) { // if beam orientation is used

        // get the beam unit vector  
        var U = {
            vx: b.vx,
            vy: b.vy,
            vz: b.vz
        };

        // create n3 by projecting of n1 in the direction of unit vector U

        var N1 = Node.GetFromID(m, b.n1); // get Node 1

        var dist = 0.5; // [m], projecting distance of N3 from N1

        var N3 = new Node(m, Node.NextFreeLabel(m),
            N1.x + (U.vx * dist),
            N1.y + (U.vy * dist),
            N1.z + (U.vz * dist))


        // switch to using 3rd node and assign 3rd node to beam
        b.orientation = 0; // switch to use 3rd node

        b.n3 = N3.nid;

        // return node number of 3rd node
        return N3.nid;

    } else {

        return '...Beam element 3rd node is used'
    }

}

function resetBeamOrientation(eid){
    /*
    Input: beam element ID, type = number/integer

    Return: beam object
    
    horizontal/diagonal beam element (e.g. floor beams and bracing members):
	                        t(Z, major) axis parallel to z
	vertical beam element (e.g. columns):
							t(Z, major) axis parallel to y
							s(Y, minor) axis parallel to x
    
    */
    const beam = Beam.GetFromID(m, eid);

    const N1 = Node.GetFromID(m, beam.n1);
	const N2 = Node.GetFromID(m, beam.n2);

	//	find the orientation vector (global axes) at node N1 - s direction of beam section
	//  using cross product of beam vector and [0,0,1]	
	var tol = 1e-4;

	//	(case 1) 
	//	beam element parallel to global z-axis (e.g. columns) 
	//	s vector = positive x direction [1, 0, 0]

	if ((N1.x < (N2.x + tol) && N1.x > (N2.x - tol)) &&
		(N1.y < (N2.y + tol) && N1.y > (N2.y - tol))) {

		var vec_s = {
			vx: 0.0,
			vy: 1.0,
			vz: 0.0,
		};

	} else {

		//	(case 2)
		// beam element NOT parallel to z-axis (e.g. roof beams, floor beams and diagonal members)

		var vec_t = {
			vx: 0.0,
			vy: 0.0,
			vz: 1.0
		}; // a

		var vec_r = {
			vx: N2.x - N1.x,
			vy: N2.y - N1.y,
			vz: N2.z - N1.z
		}; //b 

		// [vec_s] = ([vec_t] x [vec_r])/mag - unit orientation vector

		var vs1 = vec_t.vy * vec_r.vz - vec_t.vz * vec_r.vy;
		var vs2 = vec_t.vz * vec_r.vx - vec_t.vx * vec_r.vz;
		var vs3 = vec_t.vx * vec_r.vy - vec_t.vy * vec_r.vx;

		var mag = Math.sqrt(vs1 * vs1 + vs2 * vs2 + vs3 * vs3); // magnitude of vec_s

		// Message([vec_t.vx, vec_t.vy, vec_t.vz]);
		// Message([vec_r.vx, vec_r.vy, vec_r.vz]);
		// Message([vs1/mag, vs2/mag, vs3/mag]);

		var vec_s = {
			vx: vs1 / mag,
			vy: vs2 / mag,
			vz: vs3 / mag
		};
	}

	// update beam orientation vector
	beam.vx = vec_s.vx;
	beam.vy = vec_s.vy;
	beam.vz = vec_s.vz;

    return beam
}

/**
 * Split beam element, node merge needed after this function call
 * Delete the beam element and then create new beam elements with given element size
 * @param {*} m Model, object
 * @param {*} ele Beam element eid (number), array of beam element eids (object - array of numbers), or array of beam element objects (object - array of beam element objects)
 * @param {*} len Element length, nunber
 */
function splitBeamElement(m, ele, len){
	var flag_bdel = AllocateFlag();
	// case 1 - input "ele" is a number (signle beam element id)
	if (typeof ele == 'number'){

		// Message('...spliting beam element ' + ele);
		var beam = Beam.GetFromID(m, ele);
		var N1 = Node.GetFromID(m, beam.n1);
		var N2 = Node.GetFromID(m, beam.n2);
		beam.SetFlag(flag_bdel)
		lineMesh(m, beam.pid, len, N1.x, N1.y, N1.z, N2.x, N2.y, N2.z);

	// case 2 - input "ele" is an array of numbers (a list of beam element ids)
	} else if (typeof ele == 'object' && typeof ele[0] == 'number'){

		for (var bid of ele) {
			// Message('...spliting beam element ' + bid);
			var beam = Beam.GetFromID(m, bid);
			var N1 = Node.GetFromID(m, beam.n1);
			var N2 = Node.GetFromID(m, beam.n2);
			beam.SetFlag(flag_bdel)
			lineMesh(m, beam.pid, len, N1.x, N1.y, N1.z, N2.x, N2.y, N2.z);
		}

	// case 3 - input "ele" is an array of beam element objects
	} else if (typeof ele == 'object' && typeof ele[0] == 'object') {
		for (var bm of ele) {
			// Message('...spliting beam element ' + bm.eid);
			var N1 = Node.GetFromID(m, bm.n1);
			var N2 = Node.GetFromID(m, bm.n2);
			bm.SetFlag(flag_bdel)
			lineMesh(m, bm.pid, len, N1.x, N1.y, N1.z, N2.x, N2.y, N2.z);
		}

	}
	// delete all original beam elements using flag
	m.DeleteFlagged(flag_bdel, false);
	ReturnFlag(flag_bdel);

	// merge nodes as lineMesh() create new nodes
	var flag_node_merge = AllocateFlag();
	Node.FlagAll(m, flag_node_merge);
	Node.Merge(m, flag_node_merge, 1e-5);
	ReturnFlag(flag_node_merge)

}

function getNodeAt(m, pid, x, y, z){
	/*
	Input:
		m: model id
		pid: part id, if define, get the node belongs to the part
		x, y, z coordiantes of the node to get
	Return:
		list of nodes
	*/
	// ini
	var tol = 1e-4;
	var flag_part = AllocateFlag();
	var flag_found = AllocateFlag();
	var narr; // array of nodes objects, if multiple coicident nodes exist

	// if pid is given:
	if (pid) {
		// flag part and propagate flag
		var part = Part.GetFromID(m, pid);
		part.SetFlag(flag_part);
		m.PropagateFlag(flag_part);

		// loop each node
		Node.ForEach(m, getNode);
		function getNode(n){
			// n is Node object

			if(n.Flagged(flag_part)){
				// Message(n.nid);
				if((n.x < x+tol && n.x > x-tol) && 
					(n.y < y+tol && n.y > y-tol) && 
					(n.z < z+tol && n.z > z-tol)) {

					n.SetFlag(flag_found);
					// n.Sketch();
				}
			}
		}
	} else { // if pid == null/undefined/false

		// loop each node
		Node.ForEach(m, getNode);
		function getNode(n){
			// n is Node object
			// Message(n.nid);
			if((n.x < x+tol && n.x > x-tol) && 
				(n.y < y+tol && n.y > y-tol) && 
				(n.z < z+tol && n.z > z-tol)) {
				n.SetFlag(flag_found);
				// n.Sketch();
			}
		}
	}

	narr = Node.GetFlagged(m, flag_found);

	ReturnFlag(flag_part);
	ReturnFlag(flag_found);

	return narr;

}


// =============================================================================

function showOnlyBeamOnPlane(m, plane, coordinate) {

    // plane == 'XY', 'XZ', 'YZ'
    // coodinate == plane coordiante on global axis normal to the plane
    //                  'XY' -> z
    //                  'XZ' -> y
    //                  'YZ' -> x

    var plane;
    var coordiante;

    const flag = AllocateFlag();
    const tol = 5e-3;

    Message('... show only beams on plane ' + plane);

    if (plane == 'YZ') {

        const X = coordinate;

        const beams = Beam.GetAll(m);

        for (var beam of beams) {

            var N1 = Node.GetFromID(m, beam.n1);
            var N2 = Node.GetFromID(m, beam.n2);

            if ((N1.x > X - tol && N1.x < X + tol) && (N2.x > X - tol && N2.x < X + tol)) {

                beam.SetFlag(flag);

            }

        }
    } else if (plane == 'XZ') {

        const Y = coordinate;

        const beams = Beam.GetAll(m);

        for (var beam of beams) {

            var N1 = Node.GetFromID(m, beam.n1);
            var N2 = Node.GetFromID(m, beam.n2);

            if ((N1.y > Y - tol && N1.y < Y + tol) && (N2.y > Y - tol && N2.y < Y + tol)) {

                beam.SetFlag(flag);

            }

        }
    } else if (plane == 'XY') {

        const Z = coordinate;

        const beams = Beam.GetAll(m);

        for (var beam of beams) {

            var N1 = Node.GetFromID(m, beam.n1);
            var N2 = Node.GetFromID(m, beam.n2);

            if ((N1.z > Z - tol && N1.z < Z + tol) || (N2.z > Z - tol && N2.z < Z + tol)) {

                beam.SetFlag(flag);

            }

        }
    }

    // show flagged beams

    Beam.BlankAll(m);
    Beam.UnblankFlagged(m, flag);

    ReturnFlag(flag);
}

/**
 * Create mass for static loading on beam elements
 * @param {Model} m Model
 * @param {Number} n1 Starting node of beam
 * @param {Number} n2 Ending node of beam
 * @param {Number} load floor load, kN/m2
 * @param {Number} width loaded with for the beam, m
 */
function beamLoadStatic(m, n1, n2, load, width){

	// >>> find the nodes for applying nodal mass
	var node_list = getNodesBetweenTwoNodes(m, n1, n2);

	// >>> create node set
	var node_set = createSetNodeID(m, node_list, Set.NextFreeLabel(m, Set.NODE), 'node set mass');

	// >>> create mass 
	var mass = unitVectorbyTwoNodes(m, n1, n2).len * width * load * 1000.0 / 9.81; // kg
	var node_mass = new Mass(m, Mass.NextFreeLabel(m), node_set.sid, mass, Mass.NODE_SET);
}

function areaLoadStatic(){

}

//======================================================================================================================

function vec_norm(v)
{
	var mag = Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2) + Math.pow(v[2],2));
	var vnorm = new Array ;
	vnorm[0] = v[0]/mag;
	vnorm[1] = v[1]/mag;
	vnorm[2] = v[2]/mag;
	return vnorm;
}

function x_product(vcross1, vcross2)
{
	var vc = new Array;
	vc[0] = vcross1[1]*vcross2[2] - vcross1[2]*vcross2[1];
	vc[1] = vcross1[2]*vcross2[0] - vcross1[0]*vcross2[2];
	vc[2] = vcross1[0]*vcross2[1] - vcross1[1]*vcross2[0];
	vc.mag = Math.sqrt(Math.pow(vc[0],2) + Math.pow(vc[1],2) + Math.pow(vc[2],2));
	return vc;
}

//======================================================================================================================

function dot_product_angle(vdot1, vdot2)
{
	var mag1 = Math.sqrt(Math.pow(vdot1[0],2) + Math.pow(vdot1[1],2) + Math.pow(vdot1[2],2));
	var mag2 = Math.sqrt(Math.pow(vdot2[0],2) + Math.pow(vdot2[1],2) + Math.pow(vdot2[2],2));
	var vector_dot = vdot1[0]*vdot2[0] + vdot1[1]*vdot2[1] + vdot1[2]*vdot2[2]; // dot product
	var angle = new Object;
	angle.rad = Math.acos( vector_dot / (mag1 * mag2) );
	angle.deg = angle.rad / Math.PI*180;
	return angle;
}

function facing_seg(m, seg_id, cx,cy,cz, angle_in)
{
	var sids = facing_seg_gen(m, seg_id, cx,cy,cz, angle_in)
	var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
	sseg.Sketch();

	var scheck = 0;
	while(scheck == 0)
	{
		var answer = Window.Question("Blast Segment Check", "Are the blast load segments correct");
		if (answer == Window.YES)
		{
			scheck = 1;
		}
		else if (answer == Window.NO)
		{
			angle_in = Window.GetNumber("Angle of Incidence", "Input new angle of incidence", angle_in);
			if(angle_in == null);
			else
			{
				// delete seg set
				var dflag = AllocateFlag();
				sseg.SetFlag(dflag);
				m.DeleteFlagged(dflag);
				ReturnFlag(dflag);

				// remake
				var sids = facing_seg_gen(m, seg_id, cx,cy,cz, angle_in)
				var sseg = Set.GetFromID(m, sids, Set.SEGMENT);
				sseg.Sketch();
			}
		} 
	}
	return sids;
}

function facing_seg_gen(m, seg_id, cx,cy,cz, angle_in)
{
	var s_seg = Set.GetFromID(m, seg_id, Set.SEGMENT);

	var segments = new Object;
	var sco = 0;

	s_seg.StartSpool();
	while ((id = s_seg.Spool()) )
	{
		if(id.length == 3) // triangluar element
		{			
			//Message("Array:"+id);
			sco = sco + 1;
			segments[sco] = new Object;
			segments[sco].n1 = Node.GetFromID(m, id[0]);
			segments[sco].n2 = Node.GetFromID(m, id[1]);
			segments[sco].n3 = Node.GetFromID(m, id[2]);
			
			segments[sco].cx = (segments[sco].n1.x + segments[sco].n2.x + segments[sco].n3.x )/3; 
			segments[sco].cy = (segments[sco].n1.y + segments[sco].n2.y + segments[sco].n3.y )/3; 
			segments[sco].cz = (segments[sco].n1.z + segments[sco].n2.z + segments[sco].n3.z )/3; 

			var tmp1 = segments[sco].n2.x - segments[sco].n1.x; 
			var tmp2 = segments[sco].n2.y - segments[sco].n1.y;
			var tmp3 = segments[sco].n2.z - segments[sco].n1.z;
			var v1 = [tmp1, tmp2, tmp3];
			segments[sco].v1 = vec_norm(v1);
			//Message("V1: "+v1);

			var tmp1 = segments[sco].n3.x - segments[sco].n1.x; 
			var tmp2 = segments[sco].n3.y - segments[sco].n1.y; 
			var tmp3 = segments[sco].n3.z - segments[sco].n1.z; 
			var v2 = [tmp1, tmp2, tmp3];  
			segments[sco].v2 = vec_norm(v2);
			//Message("V2: "+v2);

			var vnorm = x_product(v1, v2)
			segments[sco].vnorm = vec_norm(vnorm);
			//Message("VN: "+segments[sco].vnorm)
		}
		else // quad element
		{
			//Message("Array:"+id);
			sco = sco + 1;
			segments[sco] = new Object;
			segments[sco].n1 = Node.GetFromID(m, id[0]);
			segments[sco].n2 = Node.GetFromID(m, id[1]);
			segments[sco].n3 = Node.GetFromID(m, id[2]);
			segments[sco].n4 = Node.GetFromID(m, id[3]);
			
			segments[sco].cx = (segments[sco].n1.x + segments[sco].n2.x + segments[sco].n3.x + segments[sco].n4.x)/4; 
			segments[sco].cy = (segments[sco].n1.y + segments[sco].n2.y + segments[sco].n3.y + segments[sco].n4.y)/4; 
			segments[sco].cz = (segments[sco].n1.z + segments[sco].n2.z + segments[sco].n3.z + segments[sco].n4.z)/4; 

			var tmp1 = segments[sco].n2.x - segments[sco].n1.x; 
			var tmp2 = segments[sco].n2.y - segments[sco].n1.y;
			var tmp3 = segments[sco].n2.z - segments[sco].n1.z;
			var v1 = [tmp1, tmp2, tmp3];
			segments[sco].v1 = vec_norm(v1);
			//Message("V1: "+v1);

			var tmp1 = segments[sco].n3.x - segments[sco].n1.x; 
			var tmp2 = segments[sco].n3.y - segments[sco].n1.y; 
			var tmp3 = segments[sco].n3.z - segments[sco].n1.z; 
			var v2 = [tmp1, tmp2, tmp3];  
			segments[sco].v2 = vec_norm(v2);
			//Message("V2: "+v2);

			var vnorm = x_product(v1, v2)
			segments[sco].vnorm = vec_norm(vnorm);
			//Message("VN: "+segments[sco].vnorm)
		}
	}

    // !!! create new set for charge facing segments
	var face_set = new Set(m, 200, Set.SEGMENT, "Charge_facing_segment_set");

	for(i in segments)
	{
		// check if segement is on the top or bottom
		var vvert = [0, 0, 1];
		var angle = dot_product_angle(segments[i].vnorm, vvert);

		if(angle.deg < 1 && angle.deg > -1 ) {}// ignore
		else if(angle.deg < 181 && angle.deg >179) {} // ignore
		else
		{
			tmp1 = cx - segments[i].cx; 
			tmp2 = cy - segments[i].cy; 
			tmp3 = 0;
			var tmp4 = [tmp1, tmp2, tmp3];
			var vc = vec_norm(tmp4);

			//Message("VC: "+vc);
			//Message("VN: "+segments[i].vnorm);

			var angle = dot_product_angle(segments[i].vnorm, vc);
			//Message("Angle: "+angle.deg);

			if(angle.deg < angle_in) // facing charge
			{
				if(id.length == 3) face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid );
				else               face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid, segments[i].n4.nid);
			}
		}
	}
	return face_set.sid;
}

//======================================================================================================================

/**
 * Duplicate 8 noded solid element
 * @param {Model} m Model 
 * @param {Number} eid  Solid element id
 */
function DuplicateSolidElement(m, eid){

	// >> get the solid element and associated nodes
	var s = Solid.GetFromID(m, eid);
	var n1 = Node.GetFromID(m, s.n1);
	var n2 = Node.GetFromID(m, s.n2);
	var n3 = Node.GetFromID(m, s.n3);
	var n4 = Node.GetFromID(m, s.n4);
	var n5 = Node.GetFromID(m, s.n5);
	var n6 = Node.GetFromID(m, s.n6);
	var n7 = Node.GetFromID(m, s.n7);
	var n8 = Node.GetFromID(m, s.n8);

	// >> copy solid elements and nodes 

	var ns = s.Copy();
	var nn1 = n1.Copy();
	var nn2 = n2.Copy();
	var nn3 = n3.Copy();
	var nn4 = n4.Copy();
	var nn5 = n5.Copy();
	var nn6 = n6.Copy();
	var nn7 = n7.Copy();
	var nn8 = n8.Copy();

	// >> update node for new solid element
	ns.n1 = nn1.nid;
	ns.n2 = nn2.nid;
	ns.n3 = nn3.nid;
	ns.n4 = nn4.nid;
	ns.n5 = nn5.nid;
	ns.n6 = nn6.nid;
	ns.n7 = nn7.nid;
	ns.n8 = nn8.nid;

	return {solid: ns, 	node1: nn1, node2: nn2, node3: nn3, node4: nn4, 
						node5: nn5, node6: nn6, node7: nn7, node8: nn8, }

}



