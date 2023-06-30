function nodeTieNRBC(m, nodeList) {

    Message('... Tie nodes using NRBC')

    // Create a new node set
    var nodeSetNrbc = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE, 'nrbc nodes');
    for (var nid of nodeList) { nodeSetNrbc.Add(nid)}

    // Create a new constrained node set
    var nrbcNodeSet = new NodalRigidBody(m, nodeSetNrbc.sid, NodalRigidBody.NextFreeLabel(m))

    return nrbcNodeSet
}
