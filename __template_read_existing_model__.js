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
Use("PrimerJS_functions.js");
Use("Ls_Dyna_functions.js");
Use("defineBlastLoad.js");
Use("getNodesBetweenTwoNodes.js");
Use("getBeamElementsByNodes.js");
Use("removeDuplicate.js");
Use("columnBlastFace.js");
Use("engineeringModule.js");
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