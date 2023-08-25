//////////////////////////////////////////
function viper_seg(m, seg_id)
{
	var s_seg = Set.GetFromID(m, seg_id, Set.SEGMENT);

	var segments = new Object;
	var sco = 0;

	s_seg.StartSpool();
	while (id = s_seg.Spool() )
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

	var face_set = new Set(m, 200, Set.SEGMENT, "blast_faces");

	for(i in segments)
	{
		// check if segement is on the top or bottom
		vvert = [0, 0, 1];
		var angle = dot_product_angle(segments[i].vnorm, vvert);

		if(angle.deg < 1 && angle.deg > -1 ) {}// ignore
		else if(angle.deg < 181 && angle.deg >179) {} // ignore
		else
		{
			if(id.length == 3) face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid );
			else               face_set.Add(segments[i].n1.nid, segments[i].n2.nid, segments[i].n3.nid, segments[i].n4.nid);
		}
	}
	return face_set.sid;
}