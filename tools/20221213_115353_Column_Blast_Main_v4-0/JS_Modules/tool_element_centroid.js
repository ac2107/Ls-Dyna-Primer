//////////////////////////////////
function find_beam_center(m, b)
{
	var n1 = Node.GetFromID(m, b.n1);
	var n2 = Node.GetFromID(m, b.n2);
		
	var xcen = (n1.x + n2.x)/2
	var ycen = (n1.y + n2.y)/2
	var zcen = (n1.z + n2.z)/2
	
	return {x:xcen, y:ycen, z:zcen}
}
////////////////////////////////////
function find_solid_center(m, s)
{
	// s is Solid object
	var n1 = Node.GetFromID(m, s.n1);
	var n2 = Node.GetFromID(m, s.n2);
	var n3 = Node.GetFromID(m, s.n3);
	var n4 = Node.GetFromID(m, s.n4);
	if(s.nodes >= 6 )
	{
		var n5 = Node.GetFromID(m, s.n5);
		var n6 = Node.GetFromID(m, s.n6);
	
		if(s.nodes == 8)
		{
			var n7 = Node.GetFromID(m, s.n7);
			var n8 = Node.GetFromID(m, s.n8);
		}
	}

	if(s.nodes == 4)
	{
		var xcen = (n1.x + n2.x + n3.x + n4.x)/4
		var ycen = (n1.y + n2.y + n3.y + n4.y)/4
		var zcen = (n1.z + n2.z + n3.z + n4.z)/4
	}
	else if(s.nodes == 6)
	{
		var xcen = (n1.x + n2.x + n3.x + n4.x + n5.x + n6.x)/6
		var ycen = (n1.y + n2.y + n3.y + n4.y + n5.y + n6.y)/6
		var zcen = (n1.z + n2.z + n3.z + n4.z + n5.z + n6.z)/6
	}
	else if(s.nodes == 8)
	{
		var xcen = (n1.x + n2.x + n3.x + n4.x + n5.x + n6.x + n7.x + n8.x)/8
		var ycen = (n1.y + n2.y + n3.y + n4.y + n5.y + n6.y + n7.y + n8.y)/8
		var zcen = (n1.z + n2.z + n3.z + n4.z + n5.z + n6.z + n7.z + n8.z)/8
	}
	else Message("Not a 4, 6, or 8 noded solid element");
	
	return {x:xcen, y:ycen, z:zcen}
}
