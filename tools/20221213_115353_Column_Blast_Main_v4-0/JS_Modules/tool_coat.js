
/////////////////Segment Coat///////////////////
function segment_coat(m, pid, set_id)
{
	// pid: part id to coat
	// set_id: segment set id

	// Create temp element and delete to reset solid face setting //
	var ds = new Solid(m, 99999999, 99999999, 1, 2, 3, 4, 5, 6, 7, 8);
	var dflag = AllocateFlag();
	ds.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);
	//////////////////

	var p = Part.GetFromID(m, pid);
	var set = new Set(m, set_id, Set.SEGMENT);

	var cflag = AllocateFlag();
	p.SetFlag(cflag);
	m.PropagateFlag(cflag);
	var solids = Solid.GetFlagged(m, cflag);

	for(i=0; i<solids.length; i++)
	{
		var s = solids[i];
		var faces = s.faces
		
		if(s.nodes == 4)
		{
			var len = 5;// tet element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");

			if( face_string.substr(-2, 1) == 0 ) // Nodes: 2 3 4
			{
				set.Add( s.n2, s.n3, s.n4, s.n4);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 3 1 4
			{
				set.Add( s.n3, s.n1, s.n4, s.n4);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 1 2 4
			{
				set.Add( s.n1, s.n2, s.n4, s.n4);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 1 3 2
			{
				set.Add( s.n1, s.n3, s.n2, s.n4);
			}
		}

		if(s.nodes == 6)
		{
			var len = 6;// penta  element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");
			
			if( face_string.substr(-2, 1) == 0 ) // Nodes: 1 4 3 2 
			{
				set.Add( s.n1, s.n4, s.n3, s.n2);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 2 3 6 5 
			{
				set.Add( s.n2, s.n3, s.n7, s.n5);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 4 1 5 6 
			{
				set.Add( s.n4, s.n1, s.n5, s.n7);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 3 4 6 
			{
				set.Add( s.n3, s.n4, s.n7, s.n7);
			}
			if( face_string.substr(-6, 1) == 0 ) // Nodes: 1 2 5 
			{
				set.Add( s.n1, s.n2, s.n5, s.n5);
			}
		}

		if(s.nodes == 8) 
		{
			var len = 7;// hex element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");
			
			if( face_string.substr(-2, 1) == 0 ) // Nodes: 1 4 3 2 
			{
				set.Add( s.n1, s.n4, s.n3, s.n2);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 2 3 7 6 
			{
				set.Add( s.n2, s.n3, s.n7, s.n6);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 3 4 8 7 
			{
				set.Add( s.n3, s.n4, s.n8, s.n7);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 4 1 5 8 
			{
				set.Add( s.n4, s.n1, s.n5, s.n8);
			}
			if( face_string.substr(-6, 1) == 0 ) // Nodes: 1 2 6 5 
			{
				set.Add( s.n1, s.n2, s.n6, s.n5);
			}
			if( face_string.substr(-7, 1) == 0 ) // Nodes: 5 6 7 8 
			{
				set.Add( s.n5, s.n6, s.n7, s.n8);
			}
		} 
	}
	ReturnFlag(cflag);
}

/////////////////Shell Coat///////////////////
function shell_coat(m, pid, shell_pid)
{
	// pid: part id to coat
	// shell_pid: shell_part pid

	// create temp element and delete to reset solid face setting
	var ds = new Solid(m, 9999999, 9999999, 1, 2, 3, 4, 5, 6, 7, 8);
	var dflag = AllocateFlag();
	ds.SetFlag(dflag);
	m.DeleteFlagged(dflag);
	ReturnFlag(dflag);
	//////////////////

	var p = Part.GetFromID(m, pid);

	var cflag = AllocateFlag();
	p.SetFlag(cflag);
	m.PropagateFlag(cflag);
	var solids = Solid.GetFlagged(m, cflag);


	for(i=0; i<solids.length; i++)
	{
		var s = solids[i];
		var faces = s.faces
		
		if(s.nodes == 4)
		{
			var len = 5;// tet element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");

			if( face_string.substr(-2, 1) == 0 ) // Nodes: 2 3 4
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n2, s.n3, s.n4);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 3 1 4
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n3, s.n1, s.n4);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 1 2 4
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n2, s.n4);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 1 3 2
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n3, s.n2);
			}
		}

		if(s.nodes == 6)
		{
			var len = 6;// penta  element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");
			
			if( face_string.substr(-2, 1) == 0 ) // Nodes: 1 4 3 2 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n4, s.n3, s.n2);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 2 3 6 5 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n2, s.n3, s.n7, s.n5);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 4 1 5 6 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n4, s.n1, s.n5, s.n7);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 3 4 6 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n3, s.n4, s.n7);
			}
			if( face_string.substr(-6, 1) == 0 ) // Nodes: 1 2 5 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n2, s.n5);
			}
		}

		if(s.nodes == 8) 
		{
			var len = 7;// hex element
			var face_string = NumberToString(Number( faces.toString(2) ), len).replace(/ /gi, "0");
			
			if( face_string.substr(-2, 1) == 0 ) // Nodes: 1 4 3 2 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n4, s.n3, s.n2);
			}
			if( face_string.substr(-3, 1) == 0 ) // Nodes: 2 3 7 6 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n2, s.n3, s.n7, s.n6);
			}
			if( face_string.substr(-4, 1) == 0 ) // Nodes: 3 4 8 7 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n3, s.n4, s.n8, s.n7);
			}
			if( face_string.substr(-5, 1) == 0 ) // Nodes: 4 1 5 8 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n4, s.n1, s.n5, s.n8);
			}
			if( face_string.substr(-6, 1) == 0 ) // Nodes: 1 2 6 5 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n1, s.n2, s.n6, s.n5);
			}
			if( face_string.substr(-7, 1) == 0 ) // Nodes: 5 6 7 8 
			{
				var label = Shell.NextFreeLabel(m);
				var cshell = new Shell(m, label, shell_pid, s.n5, s.n6, s.n7, s.n8);
			}
		} 
	}
	ReturnFlag(cflag);
}
///////////////////////////////////////////////////////////