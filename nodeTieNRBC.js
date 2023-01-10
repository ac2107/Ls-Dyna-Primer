function nodeTieNRBC(m, node_list) {

    Message('>>> tie nodes in NRBC')

    // create a new node set
    var node_set_nrbc = new Set(m, Set.NextFreeLabel(m, Set.NODE), Set.NODE, 'nrbc nodes');
    for (var nid of node_list) {
        node_set_nrbc.Add(nid);
    }

    // create a new constrained node set
    var nrbc_node_set = new NodalRigidBody(m, node_set_nrbc.sid, NodalRigidBody.NextFreeLabel(m))

    return nrbc_node_set
}
