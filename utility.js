//
// Any scripts do not belong to specific group
//


function Sphere3D(m, pid, charge_mass, loc){

	// parameter "loc" can be defined by below:
	// const charge_locations = {V5: [-115, -11, 23.5]};

	var charge_rad = Math.pow(3.0 * charge_mass / (4.0 * Math.PI * 1630.0), 1 / 3);
	mesh_sphere(m, pid, loc[0], loc[1], loc[2], charge_rad, 16);

	function mesh_sphere(m, shell_pid, cx, cy, cz, radius, ele) {
		Message("Meshing Sphere");
		PlayMacro(mac_dir + "sphere_001.prm", {
			variables: {
				PID: shell_pid,
				CEN_X: cx,
				CEN_Y: cy,
				CEN_Z: cz,
				RAD: radius,
				ELE: ele
			}
		});
	}
}



/**
 * Write coordinates for creating signle solid element from four nodes
 * @param {Model} m Model
 * @param {Array} node_list List of nodes 
 */
function writeTextFileSolidElement(m, node_list, name){
	var file_node_coords = new File(js_dir + "solid_"+ name +".txt", File.WRITE);
	

	if (node_list.length == 4) {

		var n1 = Node.GetFromID(m, node_list[0]);
		var n2 = Node.GetFromID(m, node_list[1]);
		var n3 = Node.GetFromID(m, node_list[2]);
		var n4 = Node.GetFromID(m, node_list[3]);
	
		file_node_coords.Writeln('[	[' + n1.x + ',' + n1.y + ',' + 'zCoords.LEVEL_0' + '], [' + n2.x + ',' + n2.y + ',' + 'zCoords.LEVEL_0' + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + 'zCoords.LEVEL_0' + '], [' + n4.x + ',' + n4.y + ',' + 'zCoords.LEVEL_0' + '],');
		file_node_coords.Writeln('  [' + n1.x + ',' + n1.y + ',' + 'zCoords.CONCORUSE' + '], [' + n2.x + ',' + n2.y + ',' + 'zCoords.CONCORUSE' + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + 'zCoords.CONCORUSE' + '], [' + n4.x + ',' + n4.y + ',' + 'zCoords.CONCORUSE' + '],');
		file_node_coords.Writeln('],')

	}

	else if (node_list.length == 8) {

		var n1 = Node.GetFromID(m, node_list[0]);
		var n2 = Node.GetFromID(m, node_list[1]);
		var n3 = Node.GetFromID(m, node_list[2]);
		var n4 = Node.GetFromID(m, node_list[3]);
		var n5 = Node.GetFromID(m, node_list[4]);
		var n6 = Node.GetFromID(m, node_list[5]);
		var n7 = Node.GetFromID(m, node_list[6]);
		var n8 = Node.GetFromID(m, node_list[7]);

		file_node_coords.Writeln('[	[' + n1.x + ',' + n1.y + ',' + n1.z + '], [' + n2.x + ',' + n2.y + ',' + n2.z + '],');
		file_node_coords.Writeln('  [' + n3.x + ',' + n3.y + ',' + n3.z + '], [' + n4.x + ',' + n4.y + ',' + n4.z + '],');
		file_node_coords.Writeln('  [' + n5.x + ',' + n5.y + ',' + n5.z + '], [' + n6.x + ',' + n6.y + ',' + n6.z + '],');
		file_node_coords.Writeln('  [' + n7.x + ',' + n7.y + ',' + n7.z + '], [' + n8.x + ',' + n8.y + ',' + n8.z + '],');
		file_node_coords.Writeln('],')


	}

	file_node_coords.Close();
}

