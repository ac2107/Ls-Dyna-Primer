// Example of using macros

// Coat segments for blast
PlayMacro(mac_dir+"segment_coat_002.prm", { variables: { PID:pids.NULL_FACE, 
														 SEGID:sids.SEGMENT_BLAST_FACE} } 
);
var seg_blast_face = Set.GetFromID(m, sids.SEGMENT_BLAST_FACE, Set.SEGMENT);
seg_blast_face.title = "Blast_segments";


// 