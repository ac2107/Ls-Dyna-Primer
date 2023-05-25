// Example of using macros
// >>> check the Macro folders for individual macros

// Coat segments for blast
PlayMacro(mac_dir+"segment_coat_002.prm", { variables: { PID:pids.NULL_FACE, 
														 SEGID:sids.SEGMENT_BLAST_FACE} } 
);
var seg_blast_face = Set.GetFromID(m, sids.SEGMENT_BLAST_FACE, Set.SEGMENT);
seg_blast_face.title = "Blast_segments";


// Extrude shell elements to create solid elements
PlayMacro(mac_dir+"extrude_001.prm", { variables: { SHELL_PID:pids.SHELL_BEAM_END,
	SOLID_PID:pids.TSHELL_BEAM_END,
	HEIGHT:-w,
	ELE:1,
	DIR:"Z"  } } 
);


// Rotate part
PlayMacro(mac_dir+"part_rotate_001.prm", { variables: { PID:pids.solid_wall,
	CoR:"0.0 0.0 0.0",
	RA:"90.0 0.0 0.0",
	DIR:"Z"  } } 
);


// Translate part
PlayMacro(mac_dir+"part_translate_001.prm", { variables: { PID:pids.solid_wall,
	TD:"0.0 " + wall_l + " 0.0",
	DIR:"Z"  } } 
);


// Extrude shell elements to create TShell elements
PlayMacro(mac_dir+"extrude_002_TShell.prm", { variables: { SHELL_PID:pids.SHELL_BEAM_END,
	TSHELL_PID:pids.TSHELL_BEAM_END,
	DIST:-w,
	ELE:1,
	DIR:"Z" } } 
);