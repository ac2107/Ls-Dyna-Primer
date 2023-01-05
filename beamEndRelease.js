function beamEndRelease(m, bm_mom, bset_connection, tol, sketch) {

    Message('>>> release beam element end node rotational DOF for pinned connection, including column base')

    /*
    bm_mom = [beam_id1, beam_id2, ...]; ===> "list of beam elements" with moment
                                             resisting connection, to be excluded
                                             from this subroutine

    bset_connection ===> "beam element set" contains connection beam elements whose
                         end node rot dof to be released (change to pinned)

    tol ===> tolerance of orientation vector comparison

    sketch ===> sketch the connection beam elements, sketch = true or false
    */


    const flag_mom = AllocateFlag();
    const flag_nrbc = AllocateFlag();

    // flag moment connection beams and attached nodes
    for (const bmid of bm_mom) {
        const beam = Beam.GetFromID(m, bmid);
        beam.SetFlag(flag_mom);
    }
    m.PropagateFlag(flag_mom);

    // flag all nodes belongs to NRBC
    const nrbc_all = NodalRigidBody.GetAll(m);
    for (const nrbc of nrbc_all) {
        nrbc.SetFlag(flag_nrbc);
    }
    m.PropagateFlag(flag_nrbc);

    // get all connection beam elements
    var bid;
    bset_connection.StartSpool();
    while ((bid = bset_connection.Spool())) {
        const beam = Beam.GetFromID(m, bid);

        // change end release to default settings (ie. no release for all DOF at both end nodes)
        beam.rr1 = 0;
        beam.rr2 = 0;
        beam.local = 0;

        // modify end release conditions based on beam orientation and its connected elements
        if (beam.Flagged(flag_mom)) {
            // beam with moment resisting connection ignored here

            continue;

        } else {

            const n1 = Node.GetFromID(m, beam.n1);
            const n2 = Node.GetFromID(m, beam.n2);

            if (n1.Flagged(flag_nrbc) || n2.Flagged(flag_nrbc)) {
                // beam with end nodes belonging to any NRBC ignored

                continue;

            } else {

                // change release rotation of joint/end node for pinned connection
                // unit vector of the beam element
                const uv = unitVectorbyTwoNodes(m, beam.n1, beam.n2).uv;


                // find xrefs of node n1 and n2
                var bnum = {
                    n1: n1.Xrefs().GetTotal("BEAM"),
                    n2: n2.Xrefs().GetTotal("BEAM")
                };

                var shnum = {
                    n1: n1.Xrefs().GetTotal("SHELL"),
                    n2: n2.Xrefs().GetTotal("SHELL")
                };


                // determine if node is the connection node
                var isN1Connection = false;
                var isN2Connection = false;

                // ---------[*** 1 ***] is node 1 a connection node?----------------------------------------------------
                // Message(['beam (n1): ' + beam.eid, beam.n1, bnum.n1, shnum.n1, ['uv = ', uv.vx, uv.vy, uv.vz]]);
                if (bnum.n1 > 1) {
                    // if node n1 is connected to other beam elements                   

                    var xrefs = n1.Xrefs();
                    for (var ref = 0; ref < bnum.n1; ref++) {

                        var id = xrefs.GetItemID('BEAM', ref);
                        var xref_beam = Beam.GetFromID(m, id);
                        var uv_xref_beam = unitVectorbyTwoNodes(m, xref_beam.n1, xref_beam.n2).uv;
                        // Message("xref beam " + xref_beam.eid + ' uv = ' + [uv_xref_beam.vx, uv_xref_beam.vy, uv_xref_beam.vz]);

                        // check if xref beams are in-line/parallel to the connection beam element
                        
                        if (Math.abs(uv.vx) > Math.abs(uv_xref_beam.vx) - tol && Math.abs(uv.vx) < Math.abs(uv_xref_beam.vx) + tol &&
                            Math.abs(uv.vy) > Math.abs(uv_xref_beam.vy) - tol && Math.abs(uv.vy) < Math.abs(uv_xref_beam.vy) + tol &&
                            Math.abs(uv.vz) > Math.abs(uv_xref_beam.vz) - tol && Math.abs(uv.vz) < Math.abs(uv_xref_beam.vz) + tol) {
                            continue
                        } else {

                            isN1Connection = true;
                        
                        }

                    }

                } else if (bnum.n1 <= 1 && shnum.n1 > 0) {
                    // if node n1 is connected to shell element only (not to other beam elements)
                    isN1Connection = true;

                } else if (bnum.n1 <= 1 && shnum.n1 == 0) {
                    // if node n1 is connected to ground, i.e. column base
                    isN1Connection = true;
                }
                // Message(['n1' ,isN1Connection]);
                //------------------------------------------------------------------------------------------------------

                // ---------[*** 2 ***] is node 2 a connection node?----------------------------------------------------
                // Message(['beam (n2): ' + beam.eid, beam.n2, bnum.n2, shnum.n2, ['uv = ', uv.vx, uv.vy, uv.vz]]);
                if (bnum.n2 > 1) {
                    // if node n1 is connected to other beam elements                   

                    var xrefs = n2.Xrefs();
                    for (var ref = 0; ref < bnum.n2; ref++) {

                        var id = xrefs.GetItemID('BEAM', ref);
                        var xref_beam = Beam.GetFromID(m, id);
                        var uv_xref_beam = unitVectorbyTwoNodes(m, xref_beam.n1, xref_beam.n2).uv;
                        // Message("xref beam " + xref_beam.eid + ' uv = ' + [uv_xref_beam.vx, uv_xref_beam.vy, uv_xref_beam.vz]);

                        // check if xref beams are in-line/parallel to the connection beam element
                        
                        if (Math.abs(uv.vx) > Math.abs(uv_xref_beam.vx) - tol && Math.abs(uv.vx) < Math.abs(uv_xref_beam.vx) + tol &&
                            Math.abs(uv.vy) > Math.abs(uv_xref_beam.vy) - tol && Math.abs(uv.vy) < Math.abs(uv_xref_beam.vy) + tol &&
                            Math.abs(uv.vz) > Math.abs(uv_xref_beam.vz) - tol && Math.abs(uv.vz) < Math.abs(uv_xref_beam.vz) + tol) {
                            continue
                        } else {

                            isN2Connection = true;
                        
                        }

                    }

                } else if (bnum.n2 <= 1 && shnum.n2 > 0) {
                    // if node n2 is connected to shell element only (not to other beam elements)
                    isN2Connection = true;

                } else if (bnum.n2 <= 1 && shnum.n2 == 0) {
                    // if node n2 is connected to ground, i.e. column base
                    isN2Connection = true;
                }
                // Message(['n2' ,isN2Connection]);

                //------------------------------------------------------------------------------------------------------

                // change the end release if node is a connection node
                const ori = unitVectorbyTwoNodes(m, beam.n1, beam.n2).ori;
                const rr = {
                    "X": 5,
                    "Y": 6,
                    "Z": 4,
                    "Oblique": 7,
                };

                beam.local = 1; // use global coordinate system for release
                // default is local s-r-t 
                // s = x, r = y, t = z

                if (isN1Connection == true) {beam.rr1 = rr[ori]}
                if (isN2Connection == true) {beam.rr2 = rr[ori]}
            }
        }

        if(sketch == true){beam.Sketch()};
    }

    ReturnFlag(flag_mom);
    ReturnFlag(flag_nrbc);

    return 0
}