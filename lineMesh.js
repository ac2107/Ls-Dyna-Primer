function lineMeshByNodes(m, pid, len, n1, n2) {
    /*
    input parameters:
    pid: part id of beam elements
    len: length of the beam element
    n1: first/start node number
    n2: second/end node number
    */

    //-0 get Node 1 and Node 2

    const flag_node = AllocateFlag();

    var Node1 = Node.GetFromID(m, n1);
    var Node2 = Node.GetFromID(m, n2);

    Node1.SetFlag(flag_node);
    Node2.SetFlag(flag_node);

    //-1 one rebar line defined by two points p1 and p2
    var rb = {
        p1: {
            x: Node1.x,
            y: Node1.y,
            z: Node1.z
        },
        p2: {
            x: Node2.x,
            y: Node2.y,
            z: Node2.z
        }
    }

    //-2 length of defined beam element
    var l = len; //[m]

    //-3 calculate how many beam elements and nodes between p1 and p2
    //      total line length
    var L = Math.sqrt(Math.pow((rb.p1.x - rb.p2.x), 2) + Math.pow((rb.p1.y - rb.p2.y), 2) + Math.pow((rb.p1.z - rb.p2.z), 2));
    if (L < 0.1 * len) {
        return false
    }; // do not create the beam element if line length is less than 0.5*len

    //      numer of elements
    var Ne = parseInt((L / l).toFixed(0));
    if (Ne < 1.0) {
        // Create only one beam element if the beam element length is greater than the line length
        // Message(">>> Line Mesh: only one beam element")
        Ne = 1.0
    }
    //      atcual beam length
    var la = L / Ne;
    //      numer of nodes including p1 and p2; p1 = N.first & p2 = N.last
    var N = Ne + 1;

    //-4 directional unit vector - https://socratic.org/questions/how-would-you-find-the-unit-vector-along-the-line-joining-point-2-4-4-to-point-3
    var U = {
        vx: (rb.p2.x - rb.p1.x) / L,
        vy: (rb.p2.y - rb.p1.y) / L,
        vz: (rb.p2.z - rb.p1.z) / L
    };

    //-5 initialise a empty list to store all node lables for creating beam elements
    var nlable_collector = [];

    //-6 initialisation - first node coordinate, same as p1
    var x = rb.p1.x;
    var y = rb.p1.y;
    var z = rb.p1.z;

    //-7 loop to create Ne aelements
    for (var i = 1; i < N + 1; i++) {
        // Message(i);
        var nlabel = Node.NextFreeLabel(m);

        var n = new Node(m, nlabel, x, y, z);
        n.SetFlag(flag_node);

        // update nodal coordinates for next node
        x = x + la * U.vx;
        y = y + la * U.vy;
        z = z + la * U.vz;

        // add label to nlable_collector
        nlable_collector.push(nlabel)
    }
    //-8 create beam elements along the defined rebar line (p1, p2), using vector U
    var blabel_collector = [];
    for (var j = 0; j < nlable_collector.length - 1; j++) {

        // Message(nlable_collector[j]);

        var blabel = Beam.NextFreeLabel(m);

        // find Node 1 and 2 for each beam element
        var N1 = Node.GetFromID(m, nlable_collector[j]);
        var N2 = Node.GetFromID(m, nlable_collector[j] + 1);

        // create beam element
        var b = new Beam(m, blabel, pid, N1.label, N2.label, 0);
        b.orientation = 1; // turn on orientation vector for the beam; 0 - off; 1 - on
        // - find the orientation vector (global axes) at node N1 - s direction of beam section
        //   using cross product of beam vector and [0,0,1]
        var tol = 1e-4;
        // -- [case 1] Beam parallel to z-axis, s vector = positive x direction [1, 0, 0]
        if ((N1.x < (N2.x + tol) && N1.x > (N2.x - tol)) &&
            (N1.y < (N2.y + tol) && N1.y > (N2.y - tol))) {
            // Message("Parallel to z-axis")
            var vec_s = {
                vx: 1.0,
                vy: 0.0,
                vz: 0.0
            };
            
        } else {
            // -- [case 2]  
            // Message("Not parallel to z-axis")   

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
        // define the beam vector
        b.vx = vec_s.vx;
        b.vy = vec_s.vy;
        b.vz = vec_s.vz;

        // add label to bmele_collector
        blabel_collector.push(blabel)
    }

    Node.Merge(m, flag_node, 1e-4);
    ReturnFlag(flag_node);

    return blabel_collector
}


// function lineMeshByNodesRot(m, pid, len, n1, n2, theta) {
//     /*
//     input parameters:
//     pid: part id of beam elements
//     len: length of the beam element
//     n1: first/start node number
//     n2: second/end node number

//     theta: angle of rotation, rotate the beam orientation (s-axis) clockwise about its r-axis

//     */

//     function rad(degrees){return degrees * (Math.PI/180);}

//     //-0 get Node 1 and Node 2

//     const flag_node = AllocateFlag();

//     var Node1 = Node.GetFromID(m, n1);
//     var Node2 = Node.GetFromID(m, n2);

//     Node1.SetFlag(flag_node);
//     Node2.SetFlag(flag_node);

//     //-1 one rebar line defined by two points p1 and p2
//     var rb = {
//         p1: {
//             x: Node1.x,
//             y: Node1.y,
//             z: Node1.z
//         },
//         p2: {
//             x: Node2.x,
//             y: Node2.y,
//             z: Node2.z
//         }
//     }

//     //-2 length of defined beam element
//     var l = len; //[m]

//     //-3 calculate how many beam elements and nodes between p1 and p2
//     //      total line length
//     var L = Math.sqrt(Math.pow((rb.p1.x - rb.p2.x), 2) + Math.pow((rb.p1.y - rb.p2.y), 2) + Math.pow((rb.p1.z - rb.p2.z), 2));
//     if (L < 0.1 * len) {
//         return false
//     }; // do not create the beam element if line length is less than 0.5*len

//     //      numer of elements
//     var Ne = parseInt((L / l).toFixed(0));
//     if (Ne < 1.0) {
//         // Create only one beam element if the beam element length is greater than the line length
//         // Message(">>> Line Mesh: only one beam element")
//         Ne = 1.0
//     }
//     //      atcual beam length
//     var la = L / Ne;
//     //      numer of nodes including p1 and p2; p1 = N.first & p2 = N.last
//     var N = Ne + 1;

//     //-4 directional unit vector - https://socratic.org/questions/how-would-you-find-the-unit-vector-along-the-line-joining-point-2-4-4-to-point-3
//     var U = {
//         vx: (rb.p2.x - rb.p1.x) / L,
//         vy: (rb.p2.y - rb.p1.y) / L,
//         vz: (rb.p2.z - rb.p1.z) / L
//     };

//     //-5 initialise a empty list to store all node lables for creating beam elements
//     var nlable_collector = [];

//     //-6 initialisation - first node coordinate, same as p1
//     var x = rb.p1.x;
//     var y = rb.p1.y;
//     var z = rb.p1.z;

//     //-7 loop to create Ne aelements
//     for (var i = 1; i < N + 1; i++) {
//         // Message(i);
//         var nlabel = Node.NextFreeLabel(m);

//         var n = new Node(m, nlabel, x, y, z);
//         n.SetFlag(flag_node);

//         // update nodal coordinates for next node
//         x = x + la * U.vx;
//         y = y + la * U.vy;
//         z = z + la * U.vz;

//         // add label to nlable_collector
//         nlable_collector.push(nlabel)
//     }
//     //-8 create beam elements along the defined rebar line (p1, p2), using vector U
//     var blabel_collector = [];
//     for (var j = 0; j < nlable_collector.length - 1; j++) {

//         // Message(nlable_collector[j]);

//         var blabel = Beam.NextFreeLabel(m);

//         // find Node 1 and 2 for each beam element
//         var N1 = Node.GetFromID(m, nlable_collector[j]);
//         var N2 = Node.GetFromID(m, nlable_collector[j] + 1);

//         // create beam element
//         var b = new Beam(m, blabel, pid, N1.label, N2.label, 0);
//         b.orientation = 1; // turn on orientation vector for the beam; 0 - off; 1 - on
//         // - find the orientation vector (global axes) at node N1 - s direction of beam section
//         //   using cross product of beam vector and [0,0,1]
//         var tol = 1e-4;
//         // -- [case 1] Beam parallel to z-axis, s vector = positive x direction [1, 0, 0]
//         if ((N1.x < (N2.x + tol) && N1.x > (N2.x - tol)) &&
//             (N1.y < (N2.y + tol) && N1.y > (N2.y - tol))) {
//             // Message("Parallel to z-axis")
//             var vec_s = {
//                 vx: 1.0,
//                 vy: 0.0,
//                 vz: 0.0
//             };
//         } else {
//             // -- [case 2]  
//             // Message("Not parallel to z-axis")   

//             var vec_t = {
//                 vx: 0.0,
//                 vy: 0.0,
//                 vz: 1.0
//             }; // a

//             var vec_r = {
//                 vx: N2.x - N1.x,
//                 vy: N2.y - N1.y,
//                 vz: N2.z - N1.z
//             }; //b 

//             // [vec_s] = ([vec_t] x [vec_r])/mag - unit orientation vector

//             var vs1 = vec_t.vy * vec_r.vz - vec_t.vz * vec_r.vy;
//             var vs2 = vec_t.vz * vec_r.vx - vec_t.vx * vec_r.vz;
//             var vs3 = vec_t.vx * vec_r.vy - vec_t.vy * vec_r.vx;

//             var mag = Math.sqrt(vs1 * vs1 + vs2 * vs2 + vs3 * vs3); // magnitude of vec_s

//             // Message([vec_t.vx, vec_t.vy, vec_t.vz]);
//             // Message([vec_r.vx, vec_r.vy, vec_r.vz]);
//             // Message([vs1/mag, vs2/mag, vs3/mag]);

//             var vec_s = {
//                 vx: vs1 / mag,
//                 vy: vs2 / mag,
//                 vz: vs3 / mag
//             };
//         }
//         // define the beam vector

//         //      rotate vec_s by 'theta' degrees abount axis vec_r (note the rotation is in 3D) https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
//         const ang = rad(theta);
//         const vec_s_rot = {
//             vx: vec_s.vx * Math.cos(ang) - vec_s.vy * Math.sin(ang),
//             vy: vec_s.vx * Math.sin(ang) + vec_s.vy * Math.cos(ang),
//             vz: vec_s.vz,
//         };

//         // Message([vec_s_rot.vx, vec_s_rot.vy, vec_s_rot.vz])

//         // b.vx = vec_s.vx;
//         // b.vy = vec_s.vy;
//         // b.vz = vec_s.vz;

//         b.vx = vec_s_rot.vx; // assign the rotated vector
//         b.vy = vec_s_rot.vy;
//         b.vz = vec_s_rot.vz;

//         // add label to bmele_collector
//         blabel_collector.push(blabel)
//     }

//     Node.Merge(m, flag_node, 1e-4);
//     ReturnFlag(flag_node);

//     return blabel_collector
// } 

function lineMeshByNodesRot(m, pid, len, n1, n2, theta) {
    /*
    input parameters:
    pid: part id of beam elements
    len: length of the beam element
    n1: first/start node number
    n2: second/end node number

    theta: angle of rotation, rotate the beam orientation (s-axis) clockwise about its r-axis

    */

    function rad(degrees){return degrees * (Math.PI/180);}

    //-0 get Node 1 and Node 2

    const flag_node = AllocateFlag();

    var Node1 = Node.GetFromID(m, n1);
    var Node2 = Node.GetFromID(m, n2);

    Node1.SetFlag(flag_node);
    Node2.SetFlag(flag_node);

    //-1 one rebar line defined by two points p1 and p2
    var rb = {
        p1: {
            x: Node1.x,
            y: Node1.y,
            z: Node1.z
        },
        p2: {
            x: Node2.x,
            y: Node2.y,
            z: Node2.z
        }
    }

    //-2 length of defined beam element
    var l = len; //[m]

    //-3 calculate how many beam elements and nodes between p1 and p2
    //      total line length
    var L = Math.sqrt(Math.pow((rb.p1.x - rb.p2.x), 2) + Math.pow((rb.p1.y - rb.p2.y), 2) + Math.pow((rb.p1.z - rb.p2.z), 2));
    if (L < 0.1 * len) {
        return false
    }; // do not create the beam element if line length is less than 0.5*len

    //      numer of elements
    var Ne = parseInt((L / l).toFixed(0));
    if (Ne < 1.0) {
        // Create only one beam element if the beam element length is greater than the line length
        // Message(">>> Line Mesh: only one beam element")
        Ne = 1.0
    }
    //      atcual beam length
    var la = L / Ne;
    //      numer of nodes including p1 and p2; p1 = N.first & p2 = N.last
    var N = Ne + 1;

    //-4 directional unit vector - https://socratic.org/questions/how-would-you-find-the-unit-vector-along-the-line-joining-point-2-4-4-to-point-3
    var U = {
        vx: (rb.p2.x - rb.p1.x) / L,
        vy: (rb.p2.y - rb.p1.y) / L,
        vz: (rb.p2.z - rb.p1.z) / L
    };

    //-5 initialise a empty list to store all node lables for creating beam elements
    var nlable_collector = [];

    //-6 initialisation - first node coordinate, same as p1
    var x = rb.p1.x;
    var y = rb.p1.y;
    var z = rb.p1.z;

    //-7 loop to create Ne aelements
    for (var i = 1; i < N + 1; i++) {
        // Message(i);
        var nlabel = Node.NextFreeLabel(m);

        var n = new Node(m, nlabel, x, y, z);
        n.SetFlag(flag_node);

        // update nodal coordinates for next node
        x = x + la * U.vx;
        y = y + la * U.vy;
        z = z + la * U.vz;

        // add label to nlable_collector
        nlable_collector.push(nlabel)
    }
    //-8 create beam elements along the defined rebar line (p1, p2), using vector U
    var blabel_collector = [];
    for (var j = 0; j < nlable_collector.length - 1; j++) {

        // Message(nlable_collector[j]);

        var blabel = Beam.NextFreeLabel(m);

        // find Node 1 and 2 for each beam element
        var N1 = Node.GetFromID(m, nlable_collector[j]);
        var N2 = Node.GetFromID(m, nlable_collector[j] + 1);

        // create beam element
        var b = new Beam(m, blabel, pid, N1.label, N2.label, 0);
        b.orientation = 1; // turn on orientation vector for the beam; 0 - off; 1 - on
        // - find the orientation vector (global axes) at node N1 - s direction of beam section
        //   using cross product of beam vector and [0,0,1]
        var tol = 1e-4;
        // -- [case 1] Beam parallel to z-axis, s vector = positive x direction [1, 0, 0]
        if ((N1.x < (N2.x + tol) && N1.x > (N2.x - tol)) &&
            (N1.y < (N2.y + tol) && N1.y > (N2.y - tol))) {
            // Message("Parallel to z-axis")
            var vec_s = {
                vx: 1.0,
                vy: 0.0,
                vz: 0.0
            };

            var vec_r = {
                vx: 0.0,
                vy: 0.0,
                vz: 1.0
            };

        } else {
            // -- [case 2]  
            // Message("Not parallel to z-axis")   

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

            // normalise vec_r
            vec_r.vx =  vec_r.vx/ mag;
            vec_r.vy =  vec_r.vy/ mag;
            vec_r.vz =  vec_r.vz/ mag;
            
            // normalise vec_s (direction of N3)
            var vec_s = {
                vx: vs1 / mag,
                vy: vs2 / mag,
                vz: vs3 / mag
            };
        }
        // define the beam vector (consider the rotation angle "theta")
        
        b.vx = vec_s.vx;
        b.vy = vec_s.vy;
        b.vz = vec_s.vz;       

        //      rotate vec_s by 'theta' degrees abount axis vec_r (note the rotation is in 3D) 
        //              http://paulbourke.net/geometry/rotate/

        /*
        const ang = rad(theta);

        const vec_s_rot = {
            vx: vec_s.vx * Math.cos(ang) - vec_s.vy * Math.sin(ang),
            vy: vec_s.vx * Math.sin(ang) + vec_s.vy * Math.cos(ang),
            vz: vec_s.vz,
        };

        b.vx = vec_s_rot.vx; // assign the rotated vector
        b.vy = vec_s_rot.vy;
        b.vz = vec_s_rot.vz;
        */

 
        // [1] Statements

        const ang = rad(theta); // rotation angle from input

        //  "p" is vec_s (N3 direction)
        //  "n" is vec_r (beam axis)
        const p = vec_s;
        
        // [2] Initialize vector q = new vec_s
        const q = {vx: 0, vy: 0, vz: 0};

        // [3] Matrix common factors
        const c = Math.cos(ang);
        const t = (1- Math.cos(ang));
        const s = Math.sin(ang);
        const X = vec_r.vx;
        const Y = vec_r.vy;
        const Z = vec_r.vz;

        // [4] Matrix 'M'
        const d11 = t*X**2 + c;
        const d12 = t*X*Y - s*Z;
        const d13 = t*X*Z + s*Y;
        const d21 = t*X*Y + s*Z;
        const d22 = t*Y**2 + c;
        const d23 = t*Y*Z - s*X;
        const d31 = t*X*Z - s*Y;
        const d32 = t*Y*Z + s*X;
        const d33 = t*Z**2 + c;

        //                |p.x|
        // [5] Matrix 'M'*|p.y|
        //                |p.z|

        q.vx = d11*vec_s.vx + d12*vec_s.vy + d13*vec_s.vz
        q.vy = d21*vec_s.vx + d22*vec_s.vy + d23*vec_s.vz
        q.vz = d31*vec_s.vx + d32*vec_s.vy + d33*vec_s.vz

        // update vec_s
        const vec_s_rot = q;


        // update beam orientation vector
        b.vx = vec_s_rot.vx; // assign the rotated vector
        b.vy = vec_s_rot.vy;
        b.vz = vec_s_rot.vz;

        // Message([vec_r.vx, vec_r.vy, vec_r.vz])
        Message([vec_s_rot.vx, vec_s_rot.vy, vec_s_rot.vz])
        // Message([vec_t.vx, vec_t.vy, vec_t.vz])

        // add label to bmele_collector
        blabel_collector.push(blabel)
    }

    Node.Merge(m, flag_node, 1e-4);
    ReturnFlag(flag_node);

    return blabel_collector
}

function lineMesh(m, pid, len, x1, y1, z1, x2, y2, z2) {
    /*
    input parameters:
    pid: part id of beam elements
    len: length of the beam element
    x1, y1, z1: coodinates of first point p1 of the defined line
    x2, y2, z2: coodinates of second point p2 of the defined line
    */

    //-1 one rebar line defined by two points p1 and p2
    var rb = {
        p1: {
            x: x1,
            y: y1,
            z: z1
        },
        p2: {
            x: x2,
            y: y2,
            z: z2
        }
    }

    //-2 length of defined beam element
    var l = len; //[m]

    //-3 calculate how many beam elements and nodes between p1 and p2
    //      total line length
    var L = Math.sqrt(Math.pow((rb.p1.x - rb.p2.x), 2) + Math.pow((rb.p1.y - rb.p2.y), 2) + Math.pow((rb.p1.z - rb.p2.z), 2));
    if (L < 0.1 * len) {
        return false
    }; // do not create the beam element if line length is less than 0.5*len

    //      numer of elements
    var Ne = parseInt((L / l).toFixed(0));
    if (Ne < 1.0) {
        // Create only one beam element if the beam element length is greater than the line length
        // Message(">>> Line Mesh: only one beam element")
        Ne = 1.0
    }
    //      atcual beam length
    var la = L / Ne;
    //      numer of nodes including p1 and p2; p1 = N.first & p2 = N.last
    var N = Ne + 1;

    //-4 directional unit vector - https://socratic.org/questions/how-would-you-find-the-unit-vector-along-the-line-joining-point-2-4-4-to-point-3
    var U = {
        vx: (rb.p2.x - rb.p1.x) / L,
        vy: (rb.p2.y - rb.p1.y) / L,
        vz: (rb.p2.z - rb.p1.z) / L
    };

    //-5 initialise a empty list to store all node lables for creating beam elements
    var nlable_collector = [];

    //-6 initialisation - first node coordinate, same as p1
    var x = rb.p1.x;
    var y = rb.p1.y;
    var z = rb.p1.z;

    //-7 loop to create Ne aelements
    for (var i = 1; i < N + 1; i++) {
        // Message(i);
        var nlabel = Node.NextFreeLabel(m);

        var n = new Node(m, nlabel, x, y, z);

        // update nodal coordinates for next node
        x = x + la * U.vx;
        y = y + la * U.vy;
        z = z + la * U.vz;

        // add label to nlable_collector
        nlable_collector.push(nlabel)
    }
    //-8 create beam elements along the defined rebar line (p1, p2), using vector U
    var blabel_collector = [];
    for (var j = 0; j < nlable_collector.length - 1; j++) {

        // Message(nlable_collector[j]);

        var blabel = Beam.NextFreeLabel(m);

        // find Node 1 and 2 for each beam element
        var N1 = Node.GetFromID(m, nlable_collector[j]);
        var N2 = Node.GetFromID(m, nlable_collector[j] + 1);

        // create beam element
        var b = new Beam(m, blabel, pid, N1.label, N2.label, 0);
        b.orientation = 1; // turn on orientation vector for the beam; 0 - off; 1 - on
        // - find the orientation vector (global axes) at node N1 - s direction of beam section
        //   using cross product of beam vector and [0,0,1]
        var tol = 1e-4;
        // -- [case 1] Beam parallel to z-axis, s vector = positive x direction [1, 0, 0]
        if ((N1.x < (N2.x + tol) && N1.x > (N2.x - tol)) &&
            (N1.y < (N2.y + tol) && N1.y > (N2.y - tol))) {
            // Message("Parallel to z-axis")
            var vec_s = {
                vx: 1.0,
                vy: 0.0,
                vz: 0.0
            };
        } else {
            // -- [case 2]  
            // Message("Not parallel to z-axis")   

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
        // define the beam vector
        b.vx = vec_s.vx;
        b.vy = vec_s.vy;
        b.vz = vec_s.vz;

        // add label to bmele_collector
        blabel_collector.push(blabel)
    }

    return blabel_collector
}
