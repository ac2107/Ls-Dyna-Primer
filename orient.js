/**
 * 
 * @param {Model} m Model ID 
 * @param {Array} dist Array of distances [X, Y, Z] to translation operation 
 * @param {Flag} flag Flag set on the nodes that you want to translate, use "undefined" if operate on all nodes
 */
function nodeTranslate(m, dist, flag){

    if (flag === undefined){

        var nodes = Node.GetAll(m);
    } else {

        var nodes = Node.GetFlagged(m, flag);
    }

    // Message(nodes.length);

    for (var node of nodes){

        node.x = node.x + dist[0];
        node.y = node.y + dist[1];
        node.z = node.z + dist[2];

    }

    return 0

}


/**
 * 
 * @param {Model} m 
 * @param {Array} CoR 
 * @param {Array} RA 
 * @param {Flag} flag 
 */
function nodeRotate(m, CoR, RA, flag){

    if (flag === undefined){

        var nodes = Node.GetAll(m);
    } else {

        var nodes = Node.GetFlagged(m, flag);
    }


    // Convert angles from degrees to radians
    let radians = RA.map(angle => angle * Math.PI / 180);

    // Message(radians);


    for (var node of nodes){

        // Translate the point by -CoR to move the center of rotation to the origin
        let px = node.x - CoR[0];
        let py = node.y - CoR[1];
        let pz = node.z - CoR[2];

        // Rotation matrices

        // Rotate about x-axis
        let Rx = [
            [1, 0, 0],
            [0, Math.cos(radians[0]), -Math.sin(radians[0])],
            [0, Math.sin(radians[0]), Math.cos(radians[0])]
        ];

        // Rotate about y-axis
        let Ry = [
            [Math.cos(radians[1]), 0, Math.sin(radians[1])],
            [0, 1, 0],
            [-Math.sin(radians[1]), 0, Math.cos(radians[1])]
        ];

        // Rotate about z-axis
        let Rz = [
            [Math.cos(radians[2]), -Math.sin(radians[2]), 0],
            [Math.sin(radians[2]), Math.cos(radians[2]), 0],
            [0, 0, 1]
        ];

        // Applying the rotation matrices
        let qx, qy, qz;

        // Rotate about x-axis
        qx = px;
        qy = Rx[1][1]*py + Rx[1][2]*pz;
        qz = Rx[2][1]*py + Rx[2][2]*pz;

        // Rotate about y-axis
        px = Ry[0][0]*qx + Ry[0][2]*qz;
        py = qy;
        pz = Ry[2][0]*qx + Ry[2][2]*qz;

        // Rotate about z-axis
        qx = Rz[0][0]*px + Rz[0][1]*py;
        qy = Rz[1][0]*px + Rz[1][1]*py;
        qz = pz;

        // Translate the point back by CoR
        node.x = qx + CoR[0];
        node.y = qy + CoR[1];
        node.z = qz + CoR[2];

    }

    return 0

}


