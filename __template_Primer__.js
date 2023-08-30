// Javascript template for Primer
// Date: 24-01-2023
// Version: -
// Author: Anqi Chen (Arup)
// name: 
// description: - 
// memory: 200


//========================= GENERAL SETTINGS ===================================
// @ts-ignore
var start_time = new Date();
// Check OS and set slash type
if( Unix() ) var slash = "/";
else if( Windows() ) var slash = "\\";

// Get JavaScript Directory (includes ending slash)
// @ts-ignore
var js_dir = Get_JS_Dir(arguments[0]);
Message("JavaScript Dir: "+js_dir);


// Get Macro Directory
// @ts-ignore
var mac_dir = Macro_Dir(arguments[0])
Message("Macro Dir: "+mac_dir);

//========================= USE MODULES ========================================
// all Primer js scripts are in "C:\Users\Anqi.Chen\OneDrive - Arup\Shared with Everyone\Scripts\Primer_js"
Use("_useModules.js");

//========================= WRTIE PATH =========================================
var write_dir = null;
// @ts-ignore
var write_dir = 
"E:\\Projects\\000_Changi_airport\\Dyna\\Floor_beams\\T5_floor\\"+
"PB1200dx1300w_1a_PB1\\PB1200dx1300w_1a_PB1_m00\\";

if (write_dir === null){
	write_dir = js_dir
}
Message("Write Dir: " + write_dir);

//========================= COMMENTS ===========================================
var comment_text = "read model in k file\n";
comment_text = comment_text + "-" + "\n";
comment_text = comment_text + "-" + "\n";
comment_text = comment_text + "-" + "\n";

//========================= MODEL LOADING ======================================
Message("... read model in k file");

/*
NOTE:



*/


var model_id = "???"; // original model key file

// var model_id_R= model_id + "_R"; // "R" - ready for Viper loading; no solid elements; just segments and null shell


// delete all existing modelsa
Model.DeleteAll()
// create a new model
var m = new Model();

// read the model key file 
Model.Read(js_dir+model_id+".key", Model.LSDYNA, 1)

m.comments = comment_text;

//========================= GENERAL ============================================

// continue further process


//========================= BLAST LOAD =========================================

// const PBIED_segment = 	{m: 20.0, cx: 0, cy: 0.2, cz: d/2+0.2}; 
// const PBIED_blast = 	PBIED_segment;
// // const PBIED_blast = {m: 20.0, cx: 1.0, cy: -0.5, cz: d/2+0.2};

// const blast = true;

// if (blast){

// 	PlayMacro(mac_dir + "segment_coat_002.prm", {
// 						variables: {
// 						PID: pids.CONCRETE_BEAM,
// 						SEGID: sids.SEGMENT_ALL
// 	}});
	
// 	const blastFace = selectBlastSegments(m, sids.SEGMENT_ALL, sids.SEGMENT_BLAST_FACE,
// 					PBIED_segment.cx, PBIED_segment.cy, PBIED_segment.cz, 90,
// 	);

// 	const blastLoad = defineBlastLoad(m, 1, sids.SEGMENT_BLAST_FACE, tStep.preloadTime, 
// 									1, PBIED_blast.m, 
// 									PBIED_blast.cx, PBIED_blast.cy, PBIED_blast.cz, 
// 									'PBIED', true
// 	);
// }

// === Import load curces from Viper
// m.Import(js_dir+'viperdyne_PBIED_beam_end.k'); 
// // m.Import(js_dir+'viperdyne_PBIED_mid_span.k');
// // Offset Viper load curves for applying preload
// var curves = Curve.GetAll(m);
// for (var crv of curves){
// 	if (crv.lcid < 1000000){
// 		crv.offa = tStep.preloadTime;
// 	}
// }


//========================= DATABASE ===========================================
// m.database.binary.d3plot.exists = true;
// m.database.binary.d3plot.dt = 2e-3;
// m.database.binary.d3plot.lcdt = Variable_D3PLOT_Output_Curve.lcid;

// m.database.binary.d3thdt.exists = true;
// m.database.binary.d3thdt.dt = 1e-4;

//m.database.binary.blstfor.exists = true;
//m.database.binary.blstfor.dt = 1e-5;

// m.database.glstat.exists = true;
// m.database.glstat.dt = 1e-4;
// m.database.glstat.binary = 3;

// // === beam element integration point output
// m.database.extent_binary.exists = true;
// m.database.extent_binary.dt = 1e-3;
// m.database.extent_binary.beamip = 36;

// // === output nodal dispacement of all roof nodes
// m.database.nodout.exists = true;
// m.database.nodout.dt = 5e-3;
// m.database.nodout.binary = 3;
// m.database.nodout.lcur = Variable_NODOUT_Output_Curve.lcid;
// var c = new History(m, History.NODE_SET, sids.NODE_ROOF, "Roof_nodal_displacements");

// >>> suppress cluster dumping files 
m.control.mpp_io_nod3dump.exists = true;
m.control.mpp_io_nodump.exists = true;
m.control.mpp_io_nofull.exists = true;
m.control.mpp_io_lstc_reduce.exists = true;

// >>> update beam 3rd (reference) node for correct visualisation in d3plot
m.control.output.exists = true;
m.control.output.nrefup = 1;


//========================= WRITE KEY FILE =====================================
// var output_obj = new Object();
// output_obj.method = Include.MASTER_ONLY;
// output_obj.path = Include.RELATIVE;
// m.Write(js_dir+model_id_R+".key", output_obj);

//========================= VIEW SETTINGS ======================================
m.UpdateGraphics();
// View XY plane
View.Show(-View.ISO);
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

function Macro_Dir(start_path){
	const parts = start_path.split('\\');
    const userName = parts[2];
    return `C:\\Users\\${userName}\\Documents\\GitHub\\Ls-Dyna-Primer\\Macros\\`;
}