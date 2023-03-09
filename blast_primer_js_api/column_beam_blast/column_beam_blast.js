// Javascript to read exising model in *.k
// Date: 15-04-2021
// Version: -
// Author: Anqi Chen (Arup)
// name: 
// description: - 
// memory: 200


//========================= GENERAL SETTINGS ===================================
var start_time = new Date();
// Check OS and set slash type
if( Unix() ) var slash = "/";
else if( Windows() ) var slash = "\\";

// Get JavaScript Directory (includes ending slash)
// @ts-ignore
var js_dir = Get_JS_Dir(arguments[0]);
Message("JavaScript Dir: "+js_dir);

// Get Macro Directory
var mac_dir = js_dir+"Macros"+slash;
Message("Macro Dir: "+mac_dir);

// Option to show field headers in the key field
// PlayMacro(mac_dir+"headers_001.prm")
//========================= USE MODULES ========================================
// all Primer js scripts are in "C:\Users\Anqi.Chen\OneDrive - Arup\Shared with Everyone\Scripts\Primer_js"
Use("_useModules.js");

//========================= COMMENTS ===========================================
var comment_text = "read model in k file\n";
comment_text = comment_text + "-" + "\n";
comment_text = comment_text + "-" + "\n";
comment_text = comment_text + "-" + "\n";

//========================= MODEL LOADING ======================================
Message("... read molde in k file");

/*
NOTE:

    - Original model: \\LDNDTCZC9047FMJ\d$\260xxx\260970-Gatwick\Platform7_esc_south\Dyna_platform7_esc_south_top_0.05m
    - Pre. modification:
		[1] deleted exisitng segments and load curves
		[2] deleted Null shells in the roof of the NR link bridge 


*/

var model_id = "column_blast_c1"; // original model key file

// var model_id_R= model_id + "_R"; // "R" - ready for Viper loading; no solid elements; just segments and null shell


// delete all existing modelsa
Model.DeleteAll()
// create a new model
var m = new Model();

// read the model key file 
// Model.Read(js_dir+model_id+".key", Model.LSDYNA, 1)

m.comments = comment_text;
m.title = model_id;
//========================= GENERAL ============================================
// m, span of the column, 7.7
const span = 7.7	
// m, beam element size
const len = 0.25 	

// kg, charge mass
const charge_mass = 500;
// charge type
const charge_type = 2;
// x coodinate of charge
const charge_x = 0; 
// y coodinate of charge
const charge_y = 8;			
// z coodinate of charge
const charge_z = 0.6; 	

// Constants
const pids = {COLUMN: 1, NULL_FACE: 2};
const mids = {STEEL:1, NULL: 2};
const secids = {COLUMN: 1, SHELL: 2};

const sids = {SEGMENT_BLAST_FACE: 1,
			  BEAM_COLUMN:1,	
};

const bids = {CHARGE_1: 1};
//========================= PART ===============================================
const partColumn = new Part(m, pids.COLUMN, secids.COLUMN, mids.STEEL, 'column');
const partNullFace = new Part(m, pids.NULL_FACE, secids.SHELL, mids.NULL, 'null shell blast face');

//========================= SECTION ============================================
// >>> column
const secColumn = new Section(m, secids.COLUMN, Section.BEAM, 'column section');
secColumn.elform = 1; 
secColumn.qr = -secids.COLUMN;

const ibColumn = theBlueBookIntegrnBeam(m, secids.COLUMN, theBlueBookSectionDimensions.UB.UB356x171x67);


// >>> shell
const secShell = new Section(m, secids.SHELL, Section.SHELL, 'null shell section');
secShell.elform = 2;
secShell.t1 = 0.001;
secShell.t2 = 0.001;
secShell.t3 = 0.001;
secShell.t4 = 0.001; 

//========================= MATERIAL ===========================================
const matSteel = MAT_024_STEEL(m, mids.STEEL, 355e6, 'Steel S355');
const matNull = MAT_009_NULL(m, mids.NULL, 'Null material');


//========================= MESH ===============================================
// ground/bottom node
const n1 = new Node(m, Node.NextFreeLabel(m), 0, 0, 0); 		
// top node	
const n2 = new Node(m, Node.NextFreeLabel(m), 0, 0, span);	
// mid-span node 
const n3 = new Node(m, Node.NextFreeLabel(m), 0, 0, span/2); 	

lineMeshByNodes(m, pids.COLUMN, len, n1.nid, n3.nid);
lineMeshByNodes(m, pids.COLUMN, len, n3.nid, n2.nid);

// change orientation vector to 3rd node
const all_beams = Beam.GetAll(m);
for (var beam of all_beams){useBeamThirdNode(m, beam.eid);}

// Beam.BlankAll(m);
//========================= COLUMN BLAST FACE ==================================

columnBlastFaces(m, pids.NULL_FACE, 5, 33, charge_x, charge_y, charge_z);


//========================= BLAST LOAD =========================================
// >>> create segment set for bast
PlayMacro(mac_dir+"segment_coat_002.prm", { variables: { PID:pids.NULL_FACE, 
														 SEGID:sids.SEGMENT_BLAST_FACE} } 
);
var seg_blast_face = Set.GetFromID(m, sids.SEGMENT_BLAST_FACE, Set.SEGMENT);
seg_blast_face.title = "Blast_segments";

// >>> create blast load 

var blast_charge = defineBlastLoad(m, bids.CHARGE_1, sids.SEGMENT_BLAST_FACE, 0,
					charge_type, charge_mass, charge_x, charge_y, charge_z, 'IED',
					true, js_dir,  

);

// >>> Line load for debugging
// const blast_lc = new Curve(Curve.CURVE, m, Curve.NextFreeLabel(m));
// blast_lc.AddPoint(0, 1);
// blast_lc.AddPoint(0.05, 0);

// for (var beam of all_beams){
// 	var load_beam = new LoadBeam(m, LoadBeam.ELEMENT, beam.eid, 3, blast_lc.lcid, 10e3);
// }

//========================= CONTROL ============================================
AnalysisControlExp(m, 0.2);

//========================= BOUNDARY CONSTRAINTS ===============================

// >>> bottom node
const spc_bot = new Spc(m, n1.nid, 0, 1, 1, 1, 0, 0, 1, Spc.NODE); 

// >>> top node
const spc_top = new Spc(m, n2.nid, 0, 1, 1, 0, 0, 0, 1, Spc.NODE); 

//========================= DATABASE ===========================================
m.database.binary.d3plot.exists = true;
m.database.binary.d3plot.dt = 2e-3;
// m.database.binary.d3plot.lcdt = Variable_D3PLOT_Output_Curve.lcid;

m.database.binary.d3thdt.exists = true;
m.database.binary.d3thdt.dt = 5e-4;

//m.database.binary.blstfor.exists = true;
//m.database.binary.blstfor.dt = 1e-5;

m.database.glstat.exists = true;
m.database.glstat.dt = 5e-4;
m.database.glstat.binary = 3;

// === beam element integration point output
m.database.extent_binary.exists = true;
m.database.extent_binary.dt = 1e-3;
m.database.extent_binary.beamip = 36;

// === output nodal dispacement of all roof nodes
m.database.nodout.exists = true;
m.database.nodout.dt = 1e-3;
m.database.nodout.binary = 3;
var c = new History(m, History.NODE, n3.nid, "Mid_span_displacements");

// >>> suppress cluster dumping files 
m.control.mpp_io_nod3dump.exists = true;
m.control.mpp_io_nodump.exists = true;
m.control.mpp_io_nofull.exists = true;
m.control.mpp_io_lstc_reduce.exists = true;


// >>> update date beam 3rd node
m.control.output.nrefup = 1;


//========================= WRITE KEY FILE =====================================
var output_obj = new Object();
output_obj.method = Include.MASTER_ONLY;
output_obj.path = Include.RELATIVE;
m.Write(js_dir+model_id+".key", output_obj);

//========================= VIEW SETTINGS ======================================
m.UpdateGraphics();
// View XY plane
View.Show(View.ISO);
// View.Show(View.XY);
// View.Show(View.XY);
//Autoscale view
View.Ac();

// time taken to execute the script (ms)
var end_time = new Date();
var time_run = end_time - start_time;
Message('>>> Time taken to execute the script = ' + time_run * 0.001 + ' sec')
//========================= FUNCTIONS ==========================================
function Get_JS_Dir(start_path) {
	if( Unix() ) var slash = "/";
	else if( Windows() ) var slash = "\\";

	var tmp1 = start_path.split(slash);
	var tmp2 = tmp1.pop();
	var tmp3 = tmp1.join(slash) + slash;

	return tmp3;
}