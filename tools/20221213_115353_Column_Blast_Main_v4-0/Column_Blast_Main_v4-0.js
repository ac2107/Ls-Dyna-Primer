// Javascript to setup column blast models
// Date: 04 Feb 2022
// Version: 4.0 DEV
// Author: Ian Bruce (Arup)
// name: Column Blast
// description: Column Blast Tool
// memory: 2000

// Load in modules
Use("JS_Modules/GUI_steel.js");
Use("JS_Modules/GUI_concrete.js");
Use("JS_Modules/GUI_general_functions.js");
Use("JS_Modules/GUI_material_selection.js");
Use("JS_Modules/GUI_dr_selection.js");
Use("JS_Modules/GUI_damp_selection.js");
Use("JS_Modules/GUI_spring_selection.js");

Use("JS_Modules/mesh_channel.js");
Use("JS_Modules/mesh_hss_rectangle.js");
Use("JS_Modules/mesh_hss_round.js");
Use("JS_Modules/mesh_isec.js");
Use("JS_Modules/mesh_con_round.js");
Use("JS_Modules/mesh_con_rectangle.js");
Use("JS_Modules/mesh_charge.js");

Use("JS_Modules/control_database.js");

Use("JS_Modules/facing_segments.js");
Use("JS_Modules/viper_segments.js");
Use("JS_Modules/end_nodes.js");
Use("JS_Modules/material_read.js");

Use("JS_Modules/tool_blast_walls.js");
Use("JS_Modules/tool_mesher.js");
Use("JS_Modules/tool_orient.js");
Use("JS_Modules/tool_coat.js");
Use("JS_Modules/tool_element_centroid.js");

Use("JS_Modules/math_vector.js");
Use("JS_Modules/math_geometry.js");

//Check OS and set slash type
if( Unix() ) var slash = "/";
else if( Windows() ) var slash = "\\";

//Get JavaScript Directory (includes ending slash)
var js_dir = Get_JS_Dir(arguments[0]);
Message("JavaScript Dir: "+js_dir);

//Get Macro Directory
var mac_dir = js_dir+"Macros"+slash;
Message("Macro Dir: "+mac_dir);

//Get Image Directory
var img_dir = js_dir+"Images"+slash;
Message("Image Dir: "+img_dir);

//Get Material Directory
var mat_dir = js_dir+"Material_Properties"+slash;
Message("Material Dir: "+mat_dir);

//Get Damping Directory
var damp_dir = js_dir+"Damp_Properties"+slash;
Message("Damping Dir: "+damp_dir);

//Get Dynamic Relaxation Directory
var dr_dir = js_dir+"Dynamic_Relaxation_Properties"+slash;
Message("DR Dir: "+dr_dir);

//Get Spring Properties Directory
var spring_dir = js_dir+"Spring_Properties"+slash;
Message("Spring Dir: "+spring_dir);

/// Model Parameters
var c_type = 0;
var s_sec_type = 0;
var c_sec_type = 0;
var jack = 0;
var isec_encase = 0;
var hss_fill = 0;
var stir_x_type = 0;
var stir_y_type = 0;
var lstir_x_type = 0;
var lstir_y_type = 0;
var charge_type = 0;
var end1_type = 0;
var end2_type = 0;
var pre_blast_load = 0; 
var post_blast_load = 0;
var ramp_type = 0;

var wbase = new Object;
var wsteel = new Object;
var wconcr = new Object;
var wcrect = new Object;

var Img_Red = Colour.RGB(255,0,0)
var Img_Green = Colour.RGB(0,255,0)
var Img_DGreen = Colour.RGB(3,155,3)
var Img_Black = Colour.RGB(0,0,0)
var Img_Blue  = Colour.RGB(41,171,226)

//////////////

// Read in Material Properties Options file
var steel_mat_opt = new Object; // Steel material options
mat_read(steel_mat_opt, "steel_materials.csv" )

var concrete_mat_opt = new Object; // Concrete material Options 
mat_read(concrete_mat_opt, "concrete_materials.csv")

var rebar_mat_opt = new Object; // Rebar material Options 
mat_read(rebar_mat_opt, "rebar_materials.csv")

// Setup Material Selection Button Names
var button_name = new Object;
mat_button_names(button_name);

////////////

// Read in Dynamic Relaxation option file
var dr_prop = new Object; // dynamic relaxation properties
var file = new File(dr_dir+"dr_prop.csv", File.READ);
while ( (line = file.ReadLine()) != undefined)
{
	var temp = line.split(",");
	dr_prop[temp[1]] = Number(temp[2]);
}
file.Close();
dr_prop.idrflg = 0; // dynamic relaxation turned off initially  


// Read in Post Blast Damping option file
var damp_prop = new Object; // damping properties
var file = new File(damp_dir+"damping_global.csv", File.READ);
while ( (line = file.ReadLine()) != undefined)
{
	var temp = line.split(",");
	damp_prop[temp[1]] = Number(temp[2]);
}
file.Close();
damp_prop.set = 0; // damping turned off initially

////////////////

// Read in Top and Bottom Spring option file
var tspring_prop = new Object; // top spring properties
var file = new File(spring_dir+"top_spring.csv", File.READ);
while ( (line = file.ReadLine()) != undefined)
{
	var temp = line.split(",");
	tspring_prop[temp[1]] = Number(temp[2]);
}
file.Close();
var bspring_prop = new Object; // bottom spring properties
var file = new File(spring_dir+"bottom_spring.csv", File.READ);
while ( (line = file.ReadLine()) != undefined)
{
	var temp = line.split(",");
	bspring_prop[temp[1]] = Number(temp[2]);
}
file.Close();


////////////////////////////////////////////////////
///////GUI//////////////////////////////////////////
var wm = new Object;
var wsm = new Object;
Window.Theme(Window.THEME_CURRENT);

var wt = new Window("Column Blast Tools V3.0", 0.2, 0.3, 0.7, 0.8);

var lt = new Widget(wt, Widget.LABEL, 0, 55, 0, 10, "Column Type");

var steel = new Widget(wt, Widget.BUTTON, 5, 25, 12, 22, "Steel");
steel.category = Widget.CATEGORY_ENTITY;
steel.onClick = steel_clicked;

var concr = new Widget(wt, Widget.BUTTON, 30, 50, 12, 22, "Concrete");
concr.category = Widget.CATEGORY_ENTITY;
concr.onClick = concrete_clicked;

var exit = new Widget(wt, Widget.BUTTON, 5, 50, 25, 35, "Cancel");
exit.category = Widget.CATEGORY_CANCEL;
exit.onClick = exit_click;

wt.Show();
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////
function create_click() 
{
	var check = check_input();
	if(check == 0)
	{
		wm.Hide();
		
		var comment_text = "Column Blast Setup Parameters\n";

		Message("Column Type: "+c_type);
		Message("S Section Type: "+s_sec_type);
		Message("C Section Type: "+c_sec_type);
		Message("Steel Jacket: "+jack);
		Message("Charge Type: "+charge_type);
		Message("End 1 Type: "+end1_type);
		Message("End 2 Type: "+end2_type);
		Message("Pre Blast Loading: "+pre_blast_load);
		Message("Post Blast Loading: "+post_blast_load);

		Message("Fill: "+hss_fill);

		var column_load = Number(wbase.tf1.text) * 1000; // Convert from kN to N
		var column_load_xoff = Number(wbase.tf2.text);
		var column_load_yoff = Number(wbase.tf3.text); 
		var column_x_moment = Number(wbase.tf4.text) * 1000; // Convert from kN.m to N.m
		var column_y_moment = Number(wbase.tf5.text) * 1000; // Convert from kN.m to N.m
		var ramp_factor = Number(wbase.tf7.text); 

		var charge_x = Number(wbase.tb1.text);
		var charge_y = Number(wbase.tb2.text);
		var charge_z = Number(wbase.tb3.text);
		var charge_mass = Number(wbase.tcm1.text);
		var angle_in = Number(wbase.ta1.text);
			
		var column_height = Number(wbase.tcd1.text);
		var solid_height = Number(wbase.tcd2.text);
			
		comment_text = comment_text +"Column Height: "+column_height+"\n";
		comment_text = comment_text +"Column Solid Element Height: "+solid_height+"\n";

		var blast_duration = Number(wbase.tt1.text);
		var post_blast_duration = Number(wbase.post_time.text);
		
		comment_text = comment_text +"Main Blast Duration: "+blast_duration+"\n";
		comment_text = comment_text +"Post Blast Duration: "+post_blast_duration+"\n";

		var max_timestep  = Number(wbase.tt2.text);
		var mass_scaling  = Number(wbase.tt3.text);
		var timestep_factor  = Number(wbase.tt4.text);
		
		comment_text = comment_text +"Max Timestep: "+max_timestep+"\n";
		comment_text = comment_text +"Mass Scaling: "+mass_scaling+"\n";
		comment_text = comment_text +"Timestep Factor: "+timestep_factor+"\n";

		//Create Model
		if( Model.GetFromID(1) == null)
		{
			Message("Creating Model 1");
			var m = new Model(1);
		}
		else
		{
			var answer = Window.Question("Model", "Model 1 already exists.\nYES: Use current Model 1\nNO: Delete current Model 1 and remake");
			if (answer == Window.YES)
			{
				Message("Using Model 1");
				var m = Model.GetFromID(1)
			} 
			else if (answer == Window.NO)
			{
				Message("Re-making Model 1");
				var mdel = Model.GetFromID(1)
				mdel.Delete();
				var m = new Model(1);
			}
		}

		if(c_type == 1) // steel
		{
			comment_text = comment_text +"Column Type: Steel"+"\n";
			var element_base = Number(wsteel.te1.text);

			var mat_name   = wsteel.bm1.mat.name;
			var mat_ro     = wsteel.bm1.mat.ro;
			var mat_e      = wsteel.bm1.mat.e;
			var mat_pr     = wsteel.bm1.mat.pr;
			var mat_sigy   = wsteel.bm1.mat.sigy;
			var mat_etan   = wsteel.bm1.mat.etan;
			var mat_lcss   = wsteel.bm1.mat.lcss.id;
			var mat_fail   = wsteel.bm1.mat.fail;
			var mat_epsmaj = wsteel.bm1.mat.epsmaj;
			var mat_c      = wsteel.bm1.mat.c;
			var mat_p      = wsteel.bm1.mat.p;
			var mat_effeps = wsteel.bm1.mat.effeps;
			var mat_voleps = wsteel.bm1.mat.voleps;
			var mat_numfip = wsteel.bm1.mat.numfip;
			var mat_mxeps  = wsteel.bm1.mat.mxeps

			// Read in stress strain curve and renumber
			if(mat_lcss > 0)
			{
				m.Import(wsteel.bm1.mat.lcss.file);
				var curs = Curve.GetAll(m);
				for(i=0; i<curs.length; i++) // offset id
				{
					curs[i].lcid = curs[i].lcid + 9000000;
				}
				mat_lcss = mat_lcss + 9000000; 
			}

			comment_text = comment_text +"Main Mat: Steel"+"\n";
			comment_text = comment_text +"Name: "+mat_name+"\n";
			comment_text = comment_text +"Density: "+mat_ro+"\n";
			comment_text = comment_text +"Youngs Modulus: "+mat_e+"\n";
			comment_text = comment_text +"Poissons Ratio: "+mat_pr+"\n";
			comment_text = comment_text +"Yield Stress: "+mat_sigy+"\n";
			comment_text = comment_text +"ETAN: "+mat_etan+"\n";
			comment_text = comment_text +"Stress Strain Curve LCSS: "+mat_lcss+"\n";
			comment_text = comment_text +"Plastic Failure Strain FAIL: "+mat_fail+"\n";
			comment_text = comment_text +"Major Failure Strain EPSMAJ: "+mat_epsmaj+"\n";
			comment_text = comment_text +"Strain Rate C: "+mat_c+"\n";
			comment_text = comment_text +"Strain Rate P: "+mat_p+"\n";
			comment_text = comment_text +"Max Effe Failure Strain EFFEPS: "+mat_effeps+"\n";
			comment_text = comment_text +"Vol Failure Strain VOLEPS: "+mat_voleps+"\n";
			comment_text = comment_text +"Num Int Point Fail NUMFIP: "+mat_numfip+"\n";
			comment_text = comment_text +"Max Prin Failure Strain MXEPS: "+mat_mxeps+"\n";

			//Create Steel Material
			var mat_steel_solid = new Material(m, 1, "123");
			mat_steel_solid.title = "Steel (Solid) " + mat_name;
			mat_steel_solid.SetPropertyByName("RO", mat_ro );
			mat_steel_solid.SetPropertyByName("E", mat_e);
			mat_steel_solid.SetPropertyByName("PR", mat_pr);
			mat_steel_solid.SetPropertyByName("SIGY", mat_sigy);
			mat_steel_solid.SetPropertyByName("ETAN", mat_etan);
			mat_steel_solid.SetPropertyByName("LCSS", mat_lcss);
			mat_steel_solid.SetPropertyByName("C", mat_c);
			mat_steel_solid.SetPropertyByName("P", mat_p);
			mat_steel_solid.SetPropertyByName("FAIL", mat_fail);
			mat_steel_solid.SetPropertyByName("EPSMAJ", mat_epsmaj);

			mat_steel_solid.SetMaterialErosion();
			mat_steel_solid.SetErosionPropertyByName("EXCL",   0);
			mat_steel_solid.SetErosionPropertyByName("MXPRES", 0);
			mat_steel_solid.SetErosionPropertyByName("MNEPS",  0);
			mat_steel_solid.SetErosionPropertyByName("EFFEPS", mat_effeps);
			mat_steel_solid.SetErosionPropertyByName("VOLEPS", mat_voleps);
			mat_steel_solid.SetErosionPropertyByName("NUMFIP", mat_numfip);
			mat_steel_solid.SetErosionPropertyByName("MNPRES", 0);
			mat_steel_solid.SetErosionPropertyByName("SIGP1",  0);
			mat_steel_solid.SetErosionPropertyByName("SIGVM",  0);
			mat_steel_solid.SetErosionPropertyByName("MXEPS",  mat_mxeps);
			mat_steel_solid.SetErosionPropertyByName("EPSSH",  0);
			mat_steel_solid.SetErosionPropertyByName("SIGTH",  0);
			mat_steel_solid.SetErosionPropertyByName("IMPULSE",0);
			mat_steel_solid.SetErosionPropertyByName("FAILTM", 0);
			
			var mat_steel_beam = new Material(m, 10, "003");
			mat_steel_beam.title = "Steel (Beam) " + mat_name;
			mat_steel_beam.SetPropertyByName("RO", mat_ro);
			mat_steel_beam.SetPropertyByName("E", mat_e);
			mat_steel_beam.SetPropertyByName("PR", mat_pr);
			mat_steel_beam.SetPropertyByName("SIGY", mat_sigy);
			mat_steel_beam.SetPropertyByName("ETAN", mat_etan);

			//Create Solid Element Part
			var sec_solid = new Section(m, 1, Section.SOLID, "Steel Solid Section");
			sec_solid.elform = 2;
			var part_solid = new Part(m, 2, 1, 1, "Steel Column Solids");

			//Create Beam Element Part
			var sec_beam = new Section(m, 10, Section.BEAM, "Steel Beam Section");
			sec_beam.elform = 1;
			sec_beam.cst = 2;
			sec_beam.qr = -1;
			var part_beam = new Part(m, 10, 10, 10, "Steel Column Beams");

			if(isec_encase == 1 || hss_fill == 1) // Encased I-Section or Filled HSS Concrete Parts
			{
				var mat_c_name   = wsteel.bme1.mat.name;
				var mat_c_ro     = wsteel.bme1.mat.ro;
				var mat_c_pr     = wsteel.bme1.mat.pr;
				var mat_c_ft     = wsteel.bme1.mat.ft;
				var mat_c_a0     = wsteel.bme1.mat.a0;
				var mat_c_lrate  = wsteel.bme1.mat.lrate;
				var mat_c_locwid = wsteel.bme1.mat.locwid;
				var mat_c_effeps = wsteel.bme1.mat.effeps;
				var mat_c_voleps = wsteel.bme1.mat.voleps;
				var mat_c_numfip = wsteel.bme1.mat.numfip;
				var mat_c_mxeps  = wsteel.bme1.mat.mxeps 
				
				comment_text = comment_text +"Encase/Fill Mat: Concrete"+"\n";
				comment_text = comment_text +"Name: "+mat_c_name+"\n";
				comment_text = comment_text +"Density: "+mat_c_ro+"\n";
				comment_text = comment_text +"Poissons Ratio: "+mat_c_pr+"\n";
				comment_text = comment_text +"FT: "+mat_c_ft+"\n";
				comment_text = comment_text +"FC (A0): "+ (-1*mat_c_a0)+"\n";
				comment_text = comment_text +"LRATE: "+mat_c_lrate+"\n";
				comment_text = comment_text +"LOCWID: "+mat_c_locwid+"\n";
				comment_text = comment_text +"Max Effe Failure Strain EFFEPS: "+mat_c_effeps+"\n";
				comment_text = comment_text +"Vol Failure Strain VOLEPS: "+mat_c_voleps+"\n";
				comment_text = comment_text +"Num Int Point Fail NUMFIP: "+mat_c_numfip+"\n";
				comment_text = comment_text +"Max Prin Failure Strain MXEPS: "+mat_c_mxeps+"\n";

				//Create Concrete Material
				var mat_concr_solid = new Material(m, 2, "CONCRETE_DAMAGE_REL3");
				mat_concr_solid.title = "Concrete (Solid) " + mat_c_name;
				mat_concr_solid.SetPropertyByName("RO", mat_c_ro);
				mat_concr_solid.SetPropertyByName("PR", mat_c_pr);
				mat_concr_solid.SetPropertyByName("FT", mat_c_ft);
				mat_concr_solid.SetPropertyByName("A0", -1*mat_c_a0); // Set to a negtive value
				mat_concr_solid.SetPropertyByName("NOUT", 2); // Scaled damage measure
				mat_concr_solid.SetPropertyByName("RSIZE", 39.37);  // inch / meter conversion
				mat_concr_solid.SetPropertyByName("UCF", 1.45e-4); // psi / pa conversion
				mat_concr_solid.SetPropertyByName("LCRATE", mat_c_lrate); // 
				mat_concr_solid.SetPropertyByName("LOCWIDTH", mat_c_locwid); // 

				mat_concr_solid.SetMaterialErosion();
				mat_concr_solid.SetErosionPropertyByName("EXCL",   0);
				mat_concr_solid.SetErosionPropertyByName("MXPRES", 0);
				mat_concr_solid.SetErosionPropertyByName("MNEPS",  0);
				mat_concr_solid.SetErosionPropertyByName("EFFEPS", mat_c_effeps);
				mat_concr_solid.SetErosionPropertyByName("VOLEPS", mat_c_voleps);
				mat_concr_solid.SetErosionPropertyByName("NUMFIP", mat_c_numfip);
				mat_concr_solid.SetErosionPropertyByName("MNPRES", 0);
				mat_concr_solid.SetErosionPropertyByName("SIGP1",  0);
				mat_concr_solid.SetErosionPropertyByName("SIGVM",  0);
				mat_concr_solid.SetErosionPropertyByName("MXEPS",  mat_c_mxeps);
				mat_concr_solid.SetErosionPropertyByName("EPSSH",  0);
				mat_concr_solid.SetErosionPropertyByName("SIGTH",  0);
				mat_concr_solid.SetErosionPropertyByName("IMPULSE",0);
				mat_concr_solid.SetErosionPropertyByName("FAILTM", 0);

				var sec_c_solid = new Section(m, 2, Section.SOLID, "Concrete Solid Section");
				sec_c_solid.elform = 1;
				var part_c_solid = new Part(m, 4, 2, 2, "Concrete Column Solids");

				//Create Concrete Elastic Beam Material
				var mat_concr_beam = new Material(m, 11, "001");
				mat_concr_beam.title = "Concrete (Beam) "+ mat_c_name;
				mat_concr_beam.SetPropertyByName("RO", mat_c_ro);
				mat_concr_beam.SetPropertyByName("E", 30e9);
				mat_concr_beam.SetPropertyByName("PR", mat_c_pr);

				var sec_c_beam = new Section(m, 11, Section.BEAM, "Beam Section");
				sec_c_beam.elform = 1;
				sec_c_beam.cst = 2;
				sec_c_beam.qr = -2;
				var part_c_beam = new Part(m, 11, 11, 11, "Column Concrete Beams");
			}

			// Mesh the column
			if(s_sec_type == 1 && isec_encase == 0) // I Section - Not encased
			{
				var model_name = "Column Blast I-Sec - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td2.text);
				var web_thick = Number(wsteel.td3.text);
				var flange_thick = Number(wsteel.td4.text);

				comment_text = comment_text +"Section: I-Section\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Wed Thickness: "+web_thick+"\n";
				comment_text = comment_text +"Flange Thickness: "+flange_thick+"\n";
				
				// Mesh and Coat
				var mids = mesh_isec(m, part_solid.pid, sec_width, sec_depth, web_thick, flange_thick, solid_height, element_base);

				// Facing and Shadowed Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  shadow_isec(m, mids.segment_sid, sec_width, sec_depth, web_thick, flange_thick, charge_x, charge_y, charge_z, angle_in);

				// Blast load segment set
				var blast_seg_set_id = sids;

				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 1, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = flange_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = web_thick;
			}
			else if(s_sec_type == 1 && isec_encase == 1) // I Section - Encased
			{
				var model_name = "Column Blast I-Sec Encased - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td2.text);
				var web_thick = Number(wsteel.td3.text);
				var flange_thick = Number(wsteel.td4.text);

				var encase_width = Number(wsteel.enwidth.text);
				var encase_depth = Number(wsteel.endepth.text);

				comment_text = comment_text +"Section: I-Section Enc\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Depth: "+sec_depth+"\n";
				comment_text = comment_text +"Wed Thickness: "+web_thick+"\n";
				comment_text = comment_text +"Flange Thickness: "+flange_thick+"\n";
				
				comment_text = comment_text +"Encasement Width: "+encase_width+"\n";
				comment_text = comment_text +"Encasement Depth: "+encase_depth+"\n";

				// Mesh and Coat
				var mids = mesh_isec_encased(m, part_solid.pid, part_c_solid.pid, sec_width, sec_depth, web_thick, flange_thick, solid_height, element_base, encase_width, encase_depth);

				// Facing and Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids = facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);

				// Blast load segment set
				var blast_seg_set_id = sids;

				// Steel - setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 1, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = flange_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = web_thick;

				// Concrete - setup integrated beam section
				var int_beam = new IntegrationBeam(m, 2, 0, 0, 11, 0);
				int_beam.d1 = encase_width;
				int_beam.d2 = encase_depth;
			}
			else if(s_sec_type == 2 && hss_fill == 0 ) // HSS Square Section
			{
				var model_name = "Column Blast HSS Square - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td1.text);
				var sec_thick = Number(wsteel.td2.text);
				
				comment_text = comment_text +"Section: HSS Square\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: No\n";
				
				// Mesh and Coat
				var mids = mesh_hss_rectangle(m, part_solid.pid, sec_width, sec_depth, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids = facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);

				// Blast load segment set
				var blast_seg_set_id = sids;

				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 5, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = sec_thick;
			}
			else if(s_sec_type == 2 && hss_fill == 1) // HSS Square Section - Filled
			{
				var model_name = "Column Blast HSS Square - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td1.text);
				var sec_thick = Number(wsteel.td2.text);
				
				comment_text = comment_text +"Section: HSS Square\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: Yes\n";
				
				// Mesh and Coat
				var mids = mesh_hss_rectangle_fill(m, part_solid.pid, part_c_solid.pid, sec_width, sec_depth, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup steel integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 5, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = sec_thick;

				// setup concrete integrated beam section
				var int_beam = new IntegrationBeam(m, 2, 0, 0, 11, 0);
				int_beam.d1 = sec_width - (2*sec_thick);
				int_beam.d2 = sec_depth - (2*sec_thick);
			}
			else if(s_sec_type == 3 && hss_fill == 0 ) // HSS Rectangle Section
			{
				var model_name = "Column Blast HSS Rectangle - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td2.text);
				var sec_thick = Number(wsteel.td3.text);
				
				comment_text = comment_text +"Section: HSS Rectangle\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: No\n";
				
				// Mesh and Coat
				var mids = mesh_hss_rectangle(m, part_solid.pid, sec_width, sec_depth, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 5, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = sec_thick;
			}
			else if(s_sec_type == 3 && hss_fill == 1) // HSS Rectangle Section - Filled
			{
				var model_name = "Column Blast HSS Rectangle - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td2.text);
				var sec_thick = Number(wsteel.td3.text);
				
				comment_text = comment_text +"Section: HSS Rectangle\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: Yes\n";
				
				// Mesh and Coat
				var mids = mesh_hss_rectangle_fill(m, part_solid.pid, part_c_solid.pid, sec_width, sec_depth, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup steel integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 5, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = sec_thick;

				// setup concrete integrated beam section
				var int_beam = new IntegrationBeam(m, 2, 0, 0, 11, 0);
				int_beam.d1 = sec_width - (2*sec_thick);
				int_beam.d2 = sec_depth - (2*sec_thick);
			}
			else if(s_sec_type == 4 && hss_fill == 0 ) // HSS Round Section
			{
				var model_name = "Column Blast HSS Round - "+charge_mass+" kg Charge";
				var sec_outer_rad = Number(wsteel.td1.text)/2;
				var sec_thick = Number(wsteel.td2.text);
				
				comment_text = comment_text +"Section: HSS Round\n";
				comment_text = comment_text +"Sec Diameter: "+(sec_outer_rad*2)+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: No\n";
				
				// Mesh and Coat
				var mids = mesh_hss_round(m, part_solid.pid, sec_outer_rad, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 9, 0);
				int_beam.d1 = sec_outer_rad;
				int_beam.d2 = sec_outer_rad - sec_thick; // inner radius
	 		}
	 		else if(s_sec_type == 4 && hss_fill == 1  ) // HSS Round Section - Filled
			{
				var model_name = "Column Blast HSS Round - "+charge_mass+" kg Charge";
				var sec_outer_rad = Number(wsteel.td1.text)/2;
				var sec_thick = Number(wsteel.td2.text);
				
				comment_text = comment_text +"Section: HSS Round\n";
				comment_text = comment_text +"Sec Diameter: "+(sec_outer_rad*2)+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				comment_text = comment_text +"Concrete Fill: Yes\n";
				
				// Mesh and Coat
				var mids = mesh_hss_round_fill(m, part_solid.pid, part_c_solid.pid, sec_outer_rad, sec_thick, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;

				// setup steel integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 9, 0);
				int_beam.d1 = sec_outer_rad;
				int_beam.d2 = sec_outer_rad - sec_thick; // inner radius
				
				// setup concrete integrated beam section
				var int_beam = new IntegrationBeam(m, 2, 0, 0, 8, 0);
				int_beam.d1 = sec_outer_rad - sec_thick; // inner radius
	 		}
	 		else if(s_sec_type == 5 && isec_encase == 0 ) // Channel Section
			{
				var model_name = "Column Blast C-Section - "+charge_mass+" kg Charge";
				var sec_width = Number(wsteel.td1.text);
				var sec_depth = Number(wsteel.td2.text);
				var sec_thick = Number(wsteel.td3.text);
				
				comment_text = comment_text +"Section: C-Section\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Thickness: "+sec_thick+"\n";
				
				// Mesh and Coat
				var mids = mesh_channel(m, part_solid.pid, sec_width, sec_depth, sec_thick, solid_height, element_base); 

				// Facing and Shadowed Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  shadow_csec(m, mids.segment_sid, sec_width, sec_depth, sec_thick, element_base, charge_x, charge_y, charge_z, angle_in);

				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 2, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_thick;
				int_beam.d3 = sec_depth;
				int_beam.d4 = sec_thick;
			}

		}
		if(c_type == 2) // concrete column
		{
			comment_text = comment_text +"Column Type: Concrete"+"\n";
			var element_base = Number(wconcr.te1.text);

			var mat_c_name   = wconcr.bmc1.mat.name;
			var mat_c_ro     = wconcr.bmc1.mat.ro;
			var mat_c_pr     = wconcr.bmc1.mat.pr;
			var mat_c_ft     = wconcr.bmc1.mat.ft;
			var mat_c_a0     = wconcr.bmc1.mat.a0;
			var mat_c_lrate  = wconcr.bmc1.mat.lrate;
			var mat_c_locwid = wconcr.bmc1.mat.locwid;
			var mat_c_effeps = wconcr.bmc1.mat.effeps;
			var mat_c_voleps = wconcr.bmc1.mat.voleps;
			var mat_c_numfip = wconcr.bmc1.mat.numfip;
			var mat_c_mxeps  = wconcr.bmc1.mat.mxeps 
			
			comment_text = comment_text +"Main Mat: Concrete"+"\n";
			comment_text = comment_text +"Name: "+mat_c_name+"\n";
			comment_text = comment_text +"Density: "+mat_c_ro+"\n";
			comment_text = comment_text +"Poissons Ratio: "+mat_c_pr+"\n";
			comment_text = comment_text +"FT: "+mat_c_ft+"\n";
			comment_text = comment_text +"FC (A0): "+(-1*mat_c_a0)+"\n";
			comment_text = comment_text +"LRATE: "+mat_c_lrate+"\n";
			comment_text = comment_text +"LOCWID: "+mat_c_locwid+"\n";
			comment_text = comment_text +"Max Effe Failure Strain EFFEPS: "+mat_c_effeps+"\n";
			comment_text = comment_text +"Vol Failure Strain VOLEPS: "+mat_c_voleps+"\n";
			comment_text = comment_text +"Num Int Point Fail NUMFIP: "+mat_c_numfip+"\n";
			comment_text = comment_text +"Max Prin Failure Strain MXEPS: "+mat_c_mxeps+"\n";


			//Create Concrete  Material
			var mat_concr_solid = new Material(m, 1, "CONCRETE_DAMAGE_REL3");
			mat_concr_solid.title = "Concrete (Solid) " + mat_c_name;
			mat_concr_solid.SetPropertyByName("RO", mat_c_ro);
			mat_concr_solid.SetPropertyByName("PR", mat_c_pr);
			mat_concr_solid.SetPropertyByName("FT", mat_c_ft);
			mat_concr_solid.SetPropertyByName("A0", -1*mat_c_a0); // Set to a negtive value
			mat_concr_solid.SetPropertyByName("NOUT", 2); // Scaled damage measure
			mat_concr_solid.SetPropertyByName("RSIZE", 39.37);  // inch / meter conversion
			mat_concr_solid.SetPropertyByName("UCF", 1.45e-4); // psi / pa conversion
			mat_concr_solid.SetPropertyByName("LCRATE", mat_c_lrate); // 
			mat_concr_solid.SetPropertyByName("LOCWIDTH", mat_c_locwid); // 

			mat_concr_solid.SetMaterialErosion();
			mat_concr_solid.SetErosionPropertyByName("EXCL",   0);
			mat_concr_solid.SetErosionPropertyByName("MXPRES", 0);
			mat_concr_solid.SetErosionPropertyByName("MNEPS",  0);
			mat_concr_solid.SetErosionPropertyByName("EFFEPS", mat_c_effeps);
			mat_concr_solid.SetErosionPropertyByName("VOLEPS", mat_c_voleps);
			mat_concr_solid.SetErosionPropertyByName("NUMFIP", mat_c_numfip);
			mat_concr_solid.SetErosionPropertyByName("MNPRES", 0);
			mat_concr_solid.SetErosionPropertyByName("SIGP1",  0);
			mat_concr_solid.SetErosionPropertyByName("SIGVM",  0);
			mat_concr_solid.SetErosionPropertyByName("MXEPS",  mat_c_mxeps);
			mat_concr_solid.SetErosionPropertyByName("EPSSH",  0);
			mat_concr_solid.SetErosionPropertyByName("SIGTH",  0);
			mat_concr_solid.SetErosionPropertyByName("IMPULSE",0);
			mat_concr_solid.SetErosionPropertyByName("FAILTM", 0);

			//Create Steel Rebar Material
			var rebar_dia_v = Number(wconcr.tr1.text);
			var rebar_dia_h = Number(wconcr.tr2.text);
			
			comment_text = comment_text +"Rebar Diameter (Vert): "+rebar_dia_v+"\n";
			comment_text = comment_text +"Rebar Diameter (Hoop): "+rebar_dia_h+"\n";

			var mat_r_name   = wconcr.bmr1.mat.name;
			var mat_r_ro     = wconcr.bmr1.mat.ro;
			var mat_r_e      = wconcr.bmr1.mat.e;
			var mat_r_pr     = wconcr.bmr1.mat.pr;
			var mat_r_sigy   = wconcr.bmr1.mat.sigy;
			var mat_r_etan   = wconcr.bmr1.mat.etan;
			var mat_r_fail   = wconcr.bmr1.mat.fail;
			var mat_r_c      = wconcr.bmr1.mat.c;
			var mat_r_p      = wconcr.bmr1.mat.p;
			
			comment_text = comment_text +"Rebar Mat:Rebar Steel"+"\n";
			comment_text = comment_text +"Name: "+mat_r_name+"\n";
			comment_text = comment_text +"Density: "+mat_r_ro+"\n";
			comment_text = comment_text +"Youngs Modulus: "+mat_r_e+"\n";
			comment_text = comment_text +"Poissons Ratio: "+mat_r_pr+"\n";
			comment_text = comment_text +"Yield Stress: "+mat_r_sigy+"\n";
			comment_text = comment_text +"ETAN: "+mat_r_etan+"\n";
			comment_text = comment_text +"Plastic Failure Strain FAIL: "+mat_r_fail+"\n";
			comment_text = comment_text +"Strain Rate C: "+mat_r_c+"\n";
			comment_text = comment_text +"Strain Rate P: "+mat_r_p+"\n";

			var mat_steel_rebar = new Material(m, 2, "024");
			mat_steel_rebar.title = "Steel (Rebar) " + mat_r_name;
			mat_steel_rebar.SetPropertyByName("RO", mat_r_ro );
			mat_steel_rebar.SetPropertyByName("E", mat_r_e);
			mat_steel_rebar.SetPropertyByName("PR", mat_r_pr);
			mat_steel_rebar.SetPropertyByName("SIGY", mat_r_sigy);
			mat_steel_rebar.SetPropertyByName("ETAN", mat_r_etan);
			mat_steel_rebar.SetPropertyByName("C", mat_r_c);
			mat_steel_rebar.SetPropertyByName("P", mat_r_p);
			mat_steel_rebar.SetPropertyByName("FAIL", mat_r_fail);

			//Create Elastic Beam Material
			var mat_concr_beam = new Material(m, 10, "001");
			mat_concr_beam.title = "Concrete (Beam) "+ mat_c_name;
			mat_concr_beam.SetPropertyByName("RO", mat_c_ro);
			mat_concr_beam.SetPropertyByName("E", 30e9);
			mat_concr_beam.SetPropertyByName("PR", mat_c_pr);

			//Create Concrete Solid Element Part
			var sec_solid = new Section(m, 1, Section.SOLID, "Solid Section");
			sec_solid.elform = 1; // Per direction from Richard Sturt for Mat Concrete Damage Rel 3
			var part_solid = new Part(m, 2, 1, 1, "Column Concrete");

			//Create Vert Rebar Beam Element Part
			var sec_rebar_v = new Section(m, 2, Section.BEAM, "Vert Rebar Section");
			sec_rebar_v.elform = 1;
			sec_rebar_v.cst = 1;
			sec_rebar_v.ts1 = rebar_dia_v;
			sec_rebar_v.ts2 = rebar_dia_v;
			sec_rebar_v.tt1 = 0;
			sec_rebar_v.tt2 = 0;
			var part_rebar_v = new Part(m, 3, 2, 2, "Vert Rebar");

			//Create Hoop Rebar Beam Element Part
			var sec_rebar_h = new Section(m, 3, Section.BEAM, "Hoop Rebar Section");
			sec_rebar_h.elform = 1;
			sec_rebar_h.cst = 1;
			sec_rebar_h.ts1 = rebar_dia_h;
			sec_rebar_h.ts2 = rebar_dia_h;
			sec_rebar_h.tt1 = 0;
			sec_rebar_h.tt2 = 0;
			var part_rebar_h = new Part(m, 4, 3, 2, "Hoop Rebar");

			//Create Concrete Beam Element Part
			var sec_beam = new Section(m, 10, Section.BEAM, "Beam Section");
			sec_beam.elform = 1;
			sec_beam.cst = 2;
			sec_beam.qr = -1;
			var part_beam = new Part(m, 10, 10, 10, "Column Concrete Beams");

			// Mesh the column
			if(c_sec_type == 1 ) // Rectangle
			{
				var model_name = "Column Blast Concrete Rectangle - "+charge_mass+" kg Charge";
				var sec_width = Number(wconcr.td1.text);
				var sec_depth = Number(wconcr.td2.text);
				var cover_thick = Number(wconcr.td3.text);
				var rebar_num_w = Number(wconcr.td4.text);
				var rebar_num_d = Number(wconcr.td5.text);
				var rebar_hoop_spacing = Number(wconcr.td6.text);
				
				comment_text = comment_text +"Section: Rectangle\n";
				comment_text = comment_text +"Sec Width: "+sec_width+"\n";
				comment_text = comment_text +"Sec Dedpth: "+sec_depth+"\n";
				comment_text = comment_text +"Cover Thickness: "+cover_thick+"\n";
				comment_text = comment_text +"Rebar Num (Width): "+rebar_num_w+"\n";
				comment_text = comment_text +"Rebar Num (Depth): "+rebar_num_d+"\n";
				comment_text = comment_text +"Rebar Hoop Spacing : "+rebar_hoop_spacing+"\n";

				//Sort Stirrup data
				var stirrup_x_list = new Array;
				var rebar_sx_num = 0;
				for(i in wcrect.rdbox)
				{
					if(wcrect.rdbox[i].pushed == true)
					{
						stirrup_x_list.push(1);
						var stirrup = 1;
						rebar_sx_num = rebar_sx_num + 1;
					}
					else stirrup_x_list.push(0); 
				}

				var stirrup_y_list = new Array;
				var rebar_sy_num = 0;
				for(i in wcrect.rwbox)
				{
					if(wcrect.rwbox[i].pushed == true)
					{
						stirrup_y_list.push(1);
						var stirrup = 1;
						rebar_sy_num = rebar_sy_num + 1;
					}
					else stirrup_y_list.push(0); 
				}

				// Mesh and Coat
				if(stirrup == 1)  // with stirrups
				{
					// create stirrup part
					var rebar_dia_sx = Number(wconcr.trs1.text);
					var rebar_dia_sy = Number(wconcr.trs2.text);
				
					comment_text = comment_text +"Stirups: Yes\n";
					comment_text = comment_text +"Stirup Width Rebar Dia: "+rebar_dia_sx+"\n";
					comment_text = comment_text +"Stirup Depth Rebar Dia: "+rebar_dia_sy+"\n";

					var sec_rebar_sx = new Section(m, 5, Section.BEAM, "Stirrup X Rebar");
					sec_rebar_sx.elform = 1;
					sec_rebar_sx.cst = 1;
					sec_rebar_sx.ts1 = rebar_dia_sx;
					sec_rebar_sx.ts2 = rebar_dia_sx;
					sec_rebar_sx.tt1 = 0;
					sec_rebar_sx.tt2 = 0;
					var part_rebar_sx = new Part(m, 5, 5, 2, "Stirrup X Rebar");

					var sec_rebar_sy = new Section(m, 6, Section.BEAM, "Stirrup Y Rebar");
					sec_rebar_sy.elform = 1;
					sec_rebar_sy.cst = 1;
					sec_rebar_sy.ts1 = rebar_dia_sy;
					sec_rebar_sy.ts2 = rebar_dia_sy;
					sec_rebar_sy.tt1 = 0;
					sec_rebar_sy.tt2 = 0;
					var part_rebar_sy = new Part(m, 6, 6, 2, "Stirrup Y Rebar");

					var mids = mesh_con_rect_stir(m, part_solid.pid, part_rebar_v.pid, part_rebar_h.pid, part_rebar_sx.pid, part_rebar_sy.pid, sec_width, sec_depth, cover_thick, rebar_num_w, rebar_num_d, stirrup_x_list, stirrup_y_list, rebar_dia_v, rebar_dia_h, rebar_dia_sx, rebar_dia_sy, rebar_hoop_spacing, solid_height, element_base); 
				}
				else  // without stirrups
				{
					comment_text = comment_text +"Stirups: None\n";
					var mids = mesh_con_rect(m, part_solid.pid, part_rebar_v.pid, part_rebar_h.pid, sec_width, sec_depth, cover_thick, rebar_num_w, rebar_num_d, rebar_dia_v, rebar_dia_h, rebar_hoop_spacing, solid_height, element_base); 
				}

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;

				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 11, 0);
				int_beam.d1 = sec_width;
				int_beam.d2 = sec_depth;
			}
			if(c_sec_type == 2 ) // Round
			{
				var model_name = "Column Blast Concrete Round - "+charge_mass+" kg Charge";
				var sec_rad = Number(wconcr.td1.text)/2;
				var cover_thick = Number(wconcr.td2.text);
				var rebar_num = Number(wconcr.td4.text);
				var rebar_hoop_spacing = Number(wconcr.td6.text);
				
				comment_text = comment_text +"Section: Round\n";
				comment_text = comment_text +"Sec Radius: "+sec_rad+"\n";
				comment_text = comment_text +"Cover Thickness: "+cover_thick+"\n";
				comment_text = comment_text +"Rebar Num: "+rebar_num+"\n";
				comment_text = comment_text +"Rebar Hoop Spacing : "+rebar_hoop_spacing+"\n";
				
				// Mesh and Coat
				var mids = mesh_con_round(m, part_solid.pid, part_rebar_v.pid, part_rebar_h.pid, sec_rad, cover_thick, rebar_num, rebar_dia_v, rebar_dia_h, rebar_hoop_spacing, solid_height, element_base); 

				// Facing Segments
				if(charge_type == 100) var sids =  viper_seg(m, mids.segment_sid);
				else var sids =  facing_seg(m, mids.segment_sid, charge_x, charge_y, charge_z, angle_in);
				
				// Blast load segment set
				var blast_seg_set_id = sids;
				
				// setup integrated beam section
				var int_beam = new IntegrationBeam(m, 1, 0, 0, 9, 0);
				int_beam.d1 = sec_rad; // outer radius 
				int_beam.d2 = 0; // inner radius
			}

			if(jack == 1) // Create Steel Jacket part
			{
				comment_text = comment_text +"Steel Jacket: Yes"+"\n";
				
				var jack_thick = Number(wbase.cjack2.text);
				var jack_height = Number(wbase.cjack3.text);
				
				comment_text = comment_text +"Jacket Height: "+jack_height+"\n";
				comment_text = comment_text +"Jacket Thickness: "+jack_thick+"\n";

				var mat_j_name   = wconcr.bcj1.mat.name;
				var mat_j_ro     = wconcr.bcj1.mat.ro;
				var mat_j_e      = wconcr.bcj1.mat.e;
				var mat_j_pr     = wconcr.bcj1.mat.pr;
				var mat_j_sigy   = wconcr.bcj1.mat.sigy;
				var mat_j_etan   = wconcr.bcj1.mat.etan;
				var mat_j_lcss   = wconcr.bcj1.mat.lcss.id;
				var mat_j_fail   = wconcr.bcj1.mat.fail;
				var mat_j_epsmaj = wconcr.bcj1.mat.epsmaj;
				var mat_j_c      = wconcr.bcj1.mat.c;
				var mat_j_p      = wconcr.bcj1.mat.p;
				var mat_j_effeps = wconcr.bcj1.mat.effeps;
				var mat_j_voleps = wconcr.bcj1.mat.voleps;
				var mat_j_numfip = wconcr.bcj1.mat.numfip;
				var mat_j_mxeps  = wconcr.bcj1.mat.mxeps

				// Read in stress strain curve and renumber
				if(mat_j_lcss > 0)
				{
					m.Import(wconcr.bcj1.mat.lcss.file);
					var curs = Curve.GetAll(m);
					for(i=0; i<curs.length; i++) // offset id
					{
						curs[i].lcid = curs[i].lcid + 9000000;
					}
					mat_j_lcss = mat_j_lcss + 9000000; 
				} 

				comment_text = comment_text +"Jacket Mat:Jacket Steel"+"\n";
				comment_text = comment_text +"Name: "+mat_j_name+"\n";
				comment_text = comment_text +"Density: "+mat_j_ro+"\n";
				comment_text = comment_text +"Youngs Modulus: "+mat_j_e+"\n";
				comment_text = comment_text +"Poissons Ratio: "+mat_j_pr+"\n";
				comment_text = comment_text +"Yield Stress: "+mat_j_sigy+"\n";
				comment_text = comment_text +"ETAN: "+mat_j_etan+"\n";
				comment_text = comment_text +"Stress Strain LCSS: "+mat_j_lcss+"\n";
				comment_text = comment_text +"Plastic Failure Strain FAIL: "+mat_j_fail+"\n";
				comment_text = comment_text +"Major Failure Strain EPSMAJ: "+mat_j_epsmaj+"\n";
				comment_text = comment_text +"Strain Rate C: "+mat_j_c+"\n";
				comment_text = comment_text +"Strain Rate P: "+mat_j_p+"\n";
				comment_text = comment_text +"Max Effe Failure Strain EFFEPS: "+mat_j_effeps+"\n";
				comment_text = comment_text +"Vol Failure Strain VOLEPS: "+mat_j_voleps+"\n";
				comment_text = comment_text +"Num Int Point Fail NUMFIP: "+mat_j_numfip+"\n";
				comment_text = comment_text +"Max Prin Failure Strain MXEPS: "+mat_j_mxeps+"\n";

				var mat_steel_jack = new Material(m, 3, "123");
				mat_steel_jack.title = "Steel Jacket " + mat_j_name;
				mat_steel_jack.SetPropertyByName("RO", mat_j_ro );
				mat_steel_jack.SetPropertyByName("E", mat_j_e);
				mat_steel_jack.SetPropertyByName("PR", mat_j_pr);
				mat_steel_jack.SetPropertyByName("SIGY", mat_j_sigy);
				mat_steel_jack.SetPropertyByName("ETAN", mat_j_etan);
				mat_steel_jack.SetPropertyByName("LCSS", mat_j_lcss);
				mat_steel_jack.SetPropertyByName("C", mat_j_c);
				mat_steel_jack.SetPropertyByName("P", mat_j_p);
				mat_steel_jack.SetPropertyByName("FAIL", mat_j_fail);
				mat_steel_jack.SetPropertyByName("EPSMAJ", mat_j_epsmaj);

				mat_steel_jack.SetMaterialErosion();
				mat_steel_jack.SetErosionPropertyByName("EXCL",   0);
				mat_steel_jack.SetErosionPropertyByName("MXPRES", 0);
				mat_steel_jack.SetErosionPropertyByName("MNEPS",  0);
				mat_steel_jack.SetErosionPropertyByName("EFFEPS", mat_j_effeps);
				mat_steel_jack.SetErosionPropertyByName("VOLEPS", mat_j_voleps);
				mat_steel_jack.SetErosionPropertyByName("NUMFIP", mat_j_numfip);
				mat_steel_jack.SetErosionPropertyByName("MNPRES", 0);
				mat_steel_jack.SetErosionPropertyByName("SIGP1",  0);
				mat_steel_jack.SetErosionPropertyByName("SIGVM",  0);
				mat_steel_jack.SetErosionPropertyByName("MXEPS",  mat_j_mxeps);
				mat_steel_jack.SetErosionPropertyByName("EPSSH",  0);
				mat_steel_jack.SetErosionPropertyByName("SIGTH",  0);
				mat_steel_jack.SetErosionPropertyByName("IMPULSE",0);
				mat_steel_jack.SetErosionPropertyByName("FAILTM", 0);

				var sec_jack = new Section(m, 7, Section.SHELL, "Steel Jacket Section");
				sec_jack.elform = 16;
				sec_jack.t1 = jack_thick;
				sec_jack.t2 = jack_thick;
				sec_jack.t3 = jack_thick;
				sec_jack.t4 = jack_thick;
				var part_jack = new Part(m, 7, 7, 3, "Steel Jacket");

				var sh_coat = shell_coat(m, part_solid.pid, part_jack.pid );

				// Delete shell on the top and bottom, and above jacket height
				var dflag = AllocateFlag();
				var js = Shell.GetAll(m);
				for(i=0; i<js.length; i++)
				{
					var nvector = js[i].NormalVector();
					if(Math.abs(nvector[2]) > 0.99) js[i].SetFlag(dflag);

					var cen = js[i].IsoparametricToCoords(0.0, 0.0);  // find shell centroid
					if(cen[2] > jack_height ) js[i].SetFlag(dflag);
				}
				m.DeleteFlagged(dflag);
				ReturnFlag(dflag);
			}
		}

//////////////////////////////////////////
///// Main Meshing Finished //////////////
//////////////////////////////////////////

	////////////////
	//Blast Loading

		// Setup Blast Loading
		if(charge_type == 100) // Viper CFD
		{
			var rn_flag = AllocateFlag();

			// Flag and offset all nodes and elements
				Node.FlagAll(m, rn_flag);
				Solid.FlagAll(m, rn_flag);
				Shell.FlagAll(m, rn_flag);
				Beam.FlagAll(m, rn_flag);
				m.RenumberFlagged(rn_flag, 50000000, Model.MOVE_CLASH_UP);

			m.ClearFlag(rn_flag);

			// Flag and renumber solids/node connected to the set segment
				var bseg = Set.GetFromID(m, blast_seg_set_id, Set.SEGMENT);
				bseg.SetFlag(rn_flag);
				m.PropagateFlag(rn_flag); // push to nodes

				// find attached solid elements
				Attached.SetEntity("SHELL", false);  // turn off shells
				Attached.SetEntity("BEAM", false); // turn off beams
				Attached.SetEntity("SET", false); // turn off sets
				Attached.SetEntity("PART", false); // turn off part 
				m.Attached(rn_flag);
				m.Attached(rn_flag);
			
				// remove set segment and all parts from renumbering	
				bseg.ClearFlag(rn_flag);
				Part.UnflagAll(m, rn_flag);

				m.RenumberFlagged(rn_flag, 1, Model.MOVE_CLASH_UP);

			// Copy flagged to new model
				bseg.SetFlag(rn_flag);
				var m_viper = m.CopyFlagged(rn_flag);

			m.ClearFlag(rn_flag);

			// Flag and renumber all node and elements back to 1
				Node.FlagAll(m, rn_flag);
				Solid.FlagAll(m, rn_flag);
				Shell.FlagAll(m, rn_flag);
				Beam.FlagAll(m, rn_flag);
				m.RenumberFlagged(rn_flag, 1, Model.MOVE_CLASH_UP);

			ReturnFlag(rn_flag);

			// Renum & Rename the segment set
			var bseg = Set.GetFromID(m_viper, blast_seg_set_id, Set.SEGMENT)
			bseg.sid = 1; 
			var p1 = new Parameter(m_viper, "CMass", Parameter.REAL, false, charge_mass);
			var p2 = new Parameter(m_viper, "CX", Parameter.REAL, false, charge_x);
			var p3 = new Parameter(m_viper, "CY", Parameter.REAL, false, charge_y);
			var p4 = new Parameter(m_viper, "CZ", Parameter.REAL, false, charge_z);

			m_viper.Hide();
		}
		else
		{
			var bid = 1; // blast load id
			if(pre_blast_load == 0) var tbo = 0; // blast start time - no pre load
			else if(pre_blast_load == 1) var tbo = 1; // blast start time - implicit pre load
			else if(pre_blast_load == 2) var tbo = 0; // blast start time - dr pre load

			var units = 2; // units (SI)
			if(charge_type == 1) var blast = 1;  // Hemispherical blast
			else if(charge_type == 2) var blast = 2; // Spherical blast
			else if(charge_type == 4) var blast = 4; // Air blast ground reflection

			f = new File( js_dir+"ibtmp.key", File.WRITE);
			f.Write("*KEYWORD\n");
			if(charge_type == 4)
			{
				f.Write("*PARAMETER\n");
				f.Write("I bnid,1\n");
			}	
			
			f.Write("*LOAD_BLAST_ENHANCED\n");
			f.Write(bid+","+charge_mass +","+ charge_x +","+ charge_y +","+ charge_z +","+ tbo +","+ units+","+blast+"\n");
			f.Write("0.0\n");
			if(charge_type == 4)
			{
				var bvec = new Vector(m, 1, 0, 0, 0, 0, 0, 1);
				f.Write("&bnid,1\n");
			}

			f.Write("*LOAD_BLAST_SEGMENT_SET\n");
			f.Write(bid+","+blast_seg_set_id+"\n");

			f.Write("*END\n");
			f.Close();
			m.Import( js_dir+"ibtmp.key"); // merge temp file back into main model
			var deleted = File.Delete( js_dir+"ibtmp.key") // delete temp file
		}

		comment_text = comment_text +"Charge Mass: "+charge_mass+"\n";
		comment_text = comment_text +"Charge X Loc: "+charge_x+"\n";
		comment_text = comment_text +"Charge Y Loc: "+charge_y+"\n";
		comment_text = comment_text +"Charge Z Loc: "+charge_z+"\n";
		
		if(charge_type == 1) comment_text = comment_text +"Charge Type: Hemispherical\n";
		else if(charge_type == 2) comment_text = comment_text +"Charge Type: Spherical\n";
		else if(charge_type == 4) comment_text = comment_text +"Charge Type: Air Burst\n";
		else if(charge_type == 100) comment_text = comment_text +"Charge Type: Viper\n";

	////////////
	// Top Beam Portion
	
		// Get top and bottom node sets
		var nset_id = end_nodes(m, mids.solid_pid, mids.c_solid_pid);

		// Create beam elements
		var beam_num = 10;
		var beam_len = (column_height - nset_id.max_z) / beam_num;

		var nlabel = Node.NextFreeLabel(m)+1;
		var beam_bottom_node = new Node(m, nlabel, 0, 0, nset_id.max_z); // starting node
		var n1 = beam_bottom_node;

		for(i=1; i<=beam_num; i++)
		{
			var nlabel = Node.NextFreeLabel(m)+1;
			var n2 = new Node(m, nlabel,   0, 0, n1.z+beam_len );
			var n3 = new Node(m, nlabel+1, -1, 0, n1.z );

			var blabel = Beam.NextFreeLabel(m)+1;
			var b = new Beam(m, blabel, part_beam.pid , n1.nid, n2.nid, n3.nid);

			if(isec_encase == 1 || hss_fill == 1) // Encased I-Beam Parallel Concrete Column
			{
				var n3a = new Node(m, nlabel+2, 1, 0, n1.z );
				var b = new Beam(m, blabel+1, part_c_beam.pid , n1.nid, n2.nid, n3a.nid);
			}
			var n1 = n2;
		}
		var beam_top_node = n2; 

		//Create NRB connecting solids and beams
		var sflag = AllocateFlag();
		var s_top = Set.GetFromID(m, nset_id.top, Set.NODE);
		s_top.SetFlag(sflag);
		m.PropagateFlag(sflag);

		var s_con = new Set(m, 200, Set.NODE, "Solid-Beam Connection");
		s_con.AddFlagged(sflag);
		s_con.Add(beam_bottom_node.nid);
		ReturnFlag(sflag);
		var v = new NodalRigidBody(m, 200, 200);

	/////////////////////////////
	//Create Column End Conditions

		//Bottom - Create NRB at base and set SPC options
		var nrb_bot = new NodalRigidBody(m, nset_id.bottom, nset_id.bottom);
		nrb_bot.spc = true;
		
		if(end1_type == 1) // Pinned
		{
			comment_text = comment_text +"Base Boundary: Pinned\n";
			nrb_bot.cmo = 1;
			nrb_bot.con1 = 7;
			nrb_bot.con2 = 3;
		}
		else if(end1_type == 2) // Fixed
		{
			comment_text = comment_text +"Base Boundary: Fixed\n";
			nrb_bot.cmo = 1;
			nrb_bot.con1 = 7;
			nrb_bot.con2 = 7;
		}
		else if(end1_type == 3) // spring
		{
			comment_text = comment_text +"Base Boundary: Spring\n";
			var nlabel = Node.NextFreeLabel(m)+1;
			var bnode1 = new Node(m, nlabel,   0, 0, 0 );
			var bnode2 = new Node(m, nlabel+1,   0, 0, 0 );
			var spc_base = new Spc(m, bnode2.nid, 0, 1, 1, 1, 1, 1, 1, Spc.NODE, 3, "Column Base"); // Fixed

			// Create Discrete Beam Spring
			var mat_bspring = new Material(m, 20, "066");
			mat_bspring.title = "Base Spring";
			mat_bspring.SetPropertyByName("RO", 7850);
			mat_bspring.SetPropertyByName("TKR", bspring_prop.tx);
			mat_bspring.SetPropertyByName("TKS", bspring_prop.ty);
			mat_bspring.SetPropertyByName("TKT", bspring_prop.tz);
			mat_bspring.SetPropertyByName("RKR", bspring_prop.rx);
			mat_bspring.SetPropertyByName("RKS", bspring_prop.ry);
			mat_bspring.SetPropertyByName("RKT", bspring_prop.rz);

			var sec_bspring = new Section(m, 20, Section.BEAM, "Base Spring");
			sec_bspring.elform = 6;
			sec_bspring.vol = 0.001;
			sec_bspring.scoor = 13;
			var part_bspring = new Part(m, 20, 20, 20, "Base Spring");

			var blabel = Beam.NextFreeLabel(m)+1;
			var b = new Beam(m, blabel, part_bspring.pid , bnode1.nid, bnode2.nid);

			var nset = Set.GetFromID(m, nset_id.bottom, Set.NODE);  // Add node to column base NRB
			nset.Add(bnode1.nid);
		}

		//Top - Create SPC
		if(end2_type == 1)
		{
			comment_text = comment_text +"Top Boundary: Pinned - Z Free\n";
			var spc_top = new Spc(m, beam_top_node.nid, 0, 1, 1, 0, 0, 0, 1, Spc.NODE, 2, "Column Top"); // Pinned Z free
		}
		else if(end2_type == 2)
		{
			comment_text = comment_text +"Top Boundary: Fixed - Z Free\n";
			var spc_top = new Spc(m, beam_top_node.nid, 0, 1, 1, 0, 1, 1, 1, Spc.NODE, 2, "Column Top"); // Fixed Z free
		}
		else if(end2_type == 3)
		{
			comment_text = comment_text +"Top Boundary: Pinned - Z Locked\n";
			var spc_top = new Spc(m, beam_top_node.nid, 0, 1, 1, 1, 0, 0, 1, Spc.NODE, 2, "Column Top"); // Pinned Z fixed
		}
		else if(end2_type == 4)
		{
			comment_text = comment_text +"Top Boundary: Fixed - Z Locked\n";
			var spc_top = new Spc(m, beam_top_node.nid, 0, 1, 1, 1, 1, 1, 1, Spc.NODE, 2, "Column Top"); // Fixed Z fixed
		}
		else if(end2_type == 5)
		{
			comment_text = comment_text +"Top Boundary: Spring\n";
			var nlabel = Node.NextFreeLabel(m)+1;
			var tnode2 = new Node(m, nlabel,   0, 0, beam_top_node.z);
			var spc_top = new Spc(m, tnode2.nid, 0, 1, 1, 1, 1, 1, 1, Spc.NODE, 2, "Column Top"); // Fixed

			// Create Discrete Beam Spring
			var mat_tspring = new Material(m, 30, "066");
			mat_tspring.title = "Base Spring";
			mat_tspring.SetPropertyByName("RO", 7850);
			mat_tspring.SetPropertyByName("TKR", tspring_prop.tx);
			mat_tspring.SetPropertyByName("TKS", tspring_prop.ty);
			mat_tspring.SetPropertyByName("TKT", tspring_prop.tz);
			mat_tspring.SetPropertyByName("RKR", tspring_prop.rx);
			mat_tspring.SetPropertyByName("RKS", tspring_prop.ry);
			mat_tspring.SetPropertyByName("RKT", tspring_prop.rz);

			var sec_tspring = new Section(m, 30, Section.BEAM, "Top Spring");
			sec_tspring.elform = 6;
			sec_tspring.vol = 0.001;
			sec_tspring.scoor = 13;
			var part_tspring = new Part(m, 30, 30, 30, "Top Spring");

			var blabel = Beam.NextFreeLabel(m)+1;
			var b = new Beam(m, blabel, part_tspring.pid , beam_top_node.nid, tnode2.nid);
		}

	////////////////
	/// Basic Loading

		if(pre_blast_load == 0) // no pre-load stage
		{
			// Setup gravity and column top loads curves
			if(ramp_type == 1) // post blast ramped load
			{
				if(post_blast_load == 0) // No post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(100, 1);
				}
				else if(post_blast_load == 1) // Imp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(blast_duration, 1);
					load_curve.AddPoint( (blast_duration+1), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
				else if(post_blast_load == 2) // Exp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(blast_duration, 1);
					load_curve.AddPoint( (blast_duration+post_blast_duration), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
			}
			else
			{
				var load_curve = new Curve(Curve.CURVE, m, 100);
				load_curve.heading = "Base Unity Load Curve"
				load_curve.sidr = 0;
				load_curve.AddPoint(0, 1);
				load_curve.AddPoint(100, 1);
			}


			//Column Loads
				//Force
			if(column_load != 0) var top_z_load = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 3, 100, (-1*column_load) );
				//Moment
			var res_x_moment = column_x_moment - (column_load * column_load_yoff); // combine x moment and load y offset moment 
			var res_y_moment = column_y_moment - (column_load * column_load_xoff);  // combine y moment and load x offset moment
			if(res_x_moment != 0) var top_x_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 5, 100, res_x_moment);
			if(res_y_moment != 0) var top_y_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 6, 100, res_y_moment);

			//Gravity Load
			var load_curve = new Curve(Curve.CURVE, m, 101);
			load_curve.heading = "Base Unity Gravtiy Curve"
			load_curve.sidr = 0;
			load_curve.AddPoint(0, 1);
			load_curve.AddPoint(100, 1);

			m.loadBody.z.exists = true;
			m.loadBody.z.lcid = 101;
			m.loadBody.z.sf = 9.81;
		} 
		else if(pre_blast_load == 1) // implicit pre-load stage
		{
			// Setup gravity and column top load curves
			if(ramp_type == 1)
			{
				if(post_blast_load == 0) // No post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Ramped Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 0);
					load_curve.AddPoint(0.95, 1);
					load_curve.AddPoint(100, 1);
				}
				else if(post_blast_load == 1) // Imp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Ramped Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 0);
					load_curve.AddPoint(0.95, 1);
					load_curve.AddPoint( (1+blast_duration), 1);
					load_curve.AddPoint( (1+blast_duration+1), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
				else if(post_blast_load == 2) // Exp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Ramped Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 0);
					load_curve.AddPoint(0.95, 1);
					load_curve.AddPoint( (1+blast_duration), 1);
					load_curve.AddPoint( (1+blast_duration+post_blast_duration), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
			}
			else
			{
				var load_curve = new Curve(Curve.CURVE, m, 100);
				load_curve.heading = "Base Ramped Unity Load Curve"
				load_curve.sidr = 0;
				load_curve.AddPoint(0, 0);
				load_curve.AddPoint(0.95, 1);
				load_curve.AddPoint(100, 1);
			}
		
			//Column Loads
				//Force
			if(column_load != 0) var top_z_load = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 3, 100, (-1*column_load) );
				//Moment
			var res_x_moment = column_x_moment - (column_load * column_load_yoff); // combine x moment and load y offset moment 
			var res_y_moment = column_y_moment - (column_load * column_load_xoff);  // combine y moment and load x offset moment
			if(res_x_moment != 0) var top_x_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 5, 100, res_x_moment);
			if(res_y_moment != 0) var top_y_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 6, 100, res_y_moment);

			//Gravity Load
			var load_curve = new Curve(Curve.CURVE, m, 101);
			load_curve.heading = "Base Ramped Unity Gravity Curve"
			load_curve.sidr = 0;
			load_curve.AddPoint(0, 0);
			load_curve.AddPoint(0.95, 1);
			load_curve.AddPoint(100, 1);
		
			m.loadBody.z.exists = true;
			m.loadBody.z.lcid = 101;
			m.loadBody.z.sf = 9.81;
		}
		else if(pre_blast_load == 2) // dynamic relaxation pre-load stage
		{
			// Setup basic gravity and column top load curves
			if(ramp_type == 1)
			{
				if(post_blast_load == 0) // No post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(100, 1);
				}
				if(post_blast_load == 1) // Imp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(blast_duration, 1);
					load_curve.AddPoint( (blast_duration+1), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
				if(post_blast_load == 2) // Exp post blast
				{
					var load_curve = new Curve(Curve.CURVE, m, 100);
					load_curve.heading = "Base Unity Load Curve"
					load_curve.sidr = 0;
					load_curve.AddPoint(0, 1);
					load_curve.AddPoint(blast_duration, 1);
					load_curve.AddPoint( (blast_duration+post_blast_duration), (1*ramp_factor) );
					load_curve.AddPoint(100, (1*ramp_factor) );
				}
			}
			else
			{
				var load_curve = new Curve(Curve.CURVE, m, 100);
				load_curve.heading = "Base Unity Load Curve"
				load_curve.sidr = 0;
				load_curve.AddPoint(0, 1);
				load_curve.AddPoint(100, 1);
			}

			// Setup DR gravity and column top load curves
			var load_curve = new Curve(Curve.CURVE, m, 102);
			load_curve.heading = "DR Ramped Unity Load Curve"
			load_curve.sidr = 1;
			load_curve.AddPoint(0, 0);
			load_curve.AddPoint(0.005, 1);
			load_curve.AddPoint(100, 1);
		
			//Column Loads
				//Force
			if(column_load != 0)
			{
				var top_z_load = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 3, 100, (-1*column_load) );
				var top_z_load = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 3, 101, (-1*column_load) );
			}
			//Moment
			var res_x_moment = column_x_moment - (column_load * column_load_yoff); // combine x moment and load y offset moment 
			var res_y_moment = column_y_moment - (column_load * column_load_xoff);  // combine y moment and load x offset moment

			if(res_x_moment != 0) 
			{	
				var top_x_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 5, 100, res_x_moment);
				var top_x_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 5, 101, res_x_moment);
			}
			if(res_y_moment != 0) 
			{
				var top_y_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 6, 100, res_y_moment);
				var top_y_moment = new LoadNode(m, LoadNode.POINT, beam_top_node.nid, 6, 101, res_y_moment);
			}

			//Gravity Load
			var load_curve = new Curve(Curve.CURVE, m, 101);
			load_curve.heading = "Base Unity Gravity Curve"
			load_curve.sidr = 0;
			load_curve.AddPoint(0, 1);
			load_curve.AddPoint(100, 1);
			
			m.loadBody.z.exists = true;
			m.loadBody.z.lcid = 101; // main curve
			m.loadBody.z.sf = 9.81;
			m.loadBody.z.lciddr = 102; // dr curve

		}
		comment_text = comment_text +"Column Top Z Load: "+column_load+"\n";
		comment_text = comment_text +"Column Top Load X Offset: "+column_load_xoff+"\n";
		comment_text = comment_text +"Column Top Load Y Offset: "+column_load_yoff+"\n";
		comment_text = comment_text +"Column Top X Moment : "+column_x_moment+"\n";
		comment_text = comment_text +"Column Top Y Moment : "+column_y_moment+"\n";
		comment_text = comment_text +"Column Top Resultant X Moment : "+res_x_moment+"\n";
		comment_text = comment_text +"Column Top Resultant Y Moment : "+res_y_moment+"\n";
		comment_text = comment_text +"Post Blast Ramp Factor : "+ramp_factor+"\n";

 	//////////////
	// Create Charge Marker
		var mat_charge = new Material(m, 50, "020");
		mat_charge.title = "Rigid";
		mat_charge.SetPropertyByName("RO", 7890);
		mat_charge.SetPropertyByName("E", 210e9);
		mat_charge.SetPropertyByName("PR", 0.3);
		mat_charge.SetPropertyByName("CMO", 1);
		mat_charge.SetPropertyByName("CON1", 7);
		mat_charge.SetPropertyByName("CON2", 7);

		var sec_shell = new Section(m, 50, Section.SHELL, "Shell Section");
		sec_shell.elform = 2;
		sec_shell.t1 = 0.001;
		sec_shell.t2 = 0.001;
		sec_shell.t3 = 0.001;
		sec_shell.t4 = 0.001;
		var part_charge = new Part(m, 50, 50, 50, "Charge Shells");
		if(charge_type == 2 || charge_type == 4 || charge_type == 100)  mesh_sphere(m, part_charge.pid, charge_x, charge_y, charge_z, 0.05, 16);
		else if(charge_type == 1) mesh_hemisphere(m, part_charge.pid, charge_x, charge_y, charge_z, charge_x, charge_y, charge_z-1, 0.05, 16);

 	//////////////
	// Create Ground Plane
		var part_ground = new Part(m, 60, 50, 50, "Ground");
		var pmesh = plate_mesh(m, part_ground.pid, 0, 0, (-0.0005), 5,5,5,5)
	
		if(charge_type == 4) 
		{
			var param = Parameter.GetFromName(m, "bnid");
			param.value = Node.Last(m).nid;
		}
	/////////////////
	// Contacts

		// Part Sets
		// General
		var part_set = new Set(m, 1, Set.PART);
		part_set.Add(part_solid.pid);
		part_set.Add(part_beam.pid);
		if(c_type == 2) // Concrete add vertical / hoop rebar
		{
			part_set.Add(part_rebar_v.pid);
			part_set.Add(part_rebar_h.pid);
		}
		if(stirrup == 1) // Rebar stirrups
		{
			part_set.Add(part_rebar_sx.pid);
			part_set.Add(part_rebar_sy.pid);
		}
		if(isec_encase == 1 || hss_fill == 1) // Encased I-Beam & Filled HSS
		{
			part_set.Add(part_c_solid.pid);
			part_set.Add(part_c_beam.pid); 
		}
		if(jack == 1) // Steel Jacket
		{
			part_set.Add(part_jack.pid);
		}

		// Setup self contact for the column part
		var col_set = new Set(m, 2, Set.PART);
		col_set.Add(part_solid.pid);
		if(isec_encase == 1) // Encased I-Beam
		{
			col_set.Add(part_c_solid.pid);
		}
		if(jack == 1) // Steel Jacket
		{
			col_set.Add(part_jack.pid);
		}
		var solid_contact = new Contact(m, "ERODING_SINGLE_SURFACE", 1, "Column Self Contact");
		solid_contact.sstyp = 2;
		solid_contact.ssid = col_set.sid;
		solid_contact.fd = 0.3;
		solid_contact.fs = 0.3;
		solid_contact.ignore = 1;
		solid_contact.soft  = 2;
		solid_contact.sbopt = 3;
		solid_contact.depth = 5;

		//Setup Rebar Contact
		if(c_type == 2) // Concrete add vertical / hoop rebar
		{
			var rebar_set = new Set(m, 3, Set.PART);
			rebar_set.Add(part_rebar_v.pid);
			rebar_set.Add(part_rebar_h.pid);
			if(stirrup == 1) // Rebar stirrups
			{
				rebar_set.Add(part_rebar_sx.pid);
				rebar_set.Add(part_rebar_sy.pid);
			}
			
			var rebar_contact = new Contact(m, "AUTOMATIC_GENERAL", 2, "Rebar Self Contact");
			rebar_contact.sstyp = 2;
			rebar_contact.ssid = rebar_set.sid;
			rebar_contact.fd = 0.3;
			rebar_contact.fs = 0.3;
			rebar_contact.ignore = 1;
		}

	///////////////////////////
	// Blast walls
		// Setup blast wall to prevent run away nodes
		var wall_set_sid = 300;
		blast_walls(m, wall_set_sid, part_set, column_height)

	///////////////////////////
	// Post Blast Damping

		if(post_blast_load ==2) // Setup *Damping_Global curves
		{ 
			var load_curve = new Curve(Curve.CURVE, m, 300);
			load_curve.heading = "Damping Global Curve"
			load_curve.AddPoint(0, 0);
			load_curve.AddPoint( (damp_prop.start-1e-6), 0);
			load_curve.AddPoint( damp_prop.start, damp_prop.value1);
			load_curve.AddPoint( damp_prop.finish, damp_prop.value1);
			load_curve.AddPoint( (damp_prop.finish+1e-6), damp_prop.value2);
			load_curve.AddPoint( 10, damp_prop.value2);
	
			//Create Damping Global Cards
			m.damping.global.exists = true
			m.damping.global.lcid = 300
		}

	///////////////////////////	
	// Control and Database Setup

		/// Termination Time
		if(pre_blast_load==0 && post_blast_load == 0)  endtime = 0 + blast_duration;  // No Pre, No Post stage
		if(pre_blast_load==0 && post_blast_load == 1)  endtime = 0 + blast_duration + 1;  // No Pre, Post Imp stage
		if(pre_blast_load==0 && post_blast_load == 2)  endtime = 0 + blast_duration + post_blast_duration;// No Pre, Post Exp Damped stage

		if(pre_blast_load==1 && post_blast_load == 0)  endtime = 1 + blast_duration;  // Pre Imp stage, No Post stage 
		if(pre_blast_load==1 && post_blast_load == 1)  endtime = 1 + blast_duration + 1;  // Pre Imp stage, Post Imp stage
		if(pre_blast_load==1 && post_blast_load == 2)  endtime = 1 + blast_duration + post_blast_duration;;  // Pre Imp stage, Post Exp Damped stage
		
		if(pre_blast_load==2 && post_blast_load == 0)  endtime = 0 + blast_duration;  // Pre DR stage, No Post stage 
		if(pre_blast_load==2 && post_blast_load == 1)  endtime = 0 + blast_duration + 1;  // Pre DR stage, Post Imp stage
		if(pre_blast_load==2 && post_blast_load == 2)  endtime = 0 + blast_duration + post_blast_duration;// Pre DR stage, Post Exp Damped stage

		//Timestep curve
		var timestep_lcid = 200;
		var load_curve = new Curve(Curve.CURVE, m, timestep_lcid);
		load_curve.heading = "Max Timestep Limit Curve"
		load_curve.AddPoint(0, max_timestep);
		load_curve.AddPoint(100, max_timestep);

		//Implicit Explicit switch curve
		var no_imp = 0;
		
		var implict_lcid = 201;
		if(pre_blast_load == 0 && post_blast_load == 0)  // No Pre, No Post stage 
		{
			no_imp = 1;

			comment_text = comment_text +"Pre-Load Stage: None\n";
			comment_text = comment_text +"Post-Load Stage: None\n";
		}
		else if(pre_blast_load == 0 && post_blast_load == 1)  // No Pre, Post Imp stage
		{
			var load_curve = new Curve(Curve.CURVE, m, implict_lcid);
			load_curve.heading = "Imp-Exp Switch Curve"
			load_curve.AddPoint(0, 0);
			load_curve.AddPoint( (blast_duration), 0);
			load_curve.AddPoint( (blast_duration+0.000001), 1);
			load_curve.AddPoint(10.0, 1);

			comment_text = comment_text +"Pre-Load Stage: None\n";
			comment_text = comment_text +"Post-Load Stage: Imp\n";
		}
		else if(pre_blast_load == 0 && post_blast_load == 2)  // No Pre, Post Exp stage
		{
			no_imp = 1;

			comment_text = comment_text +"Pre-Load Stage: None\n";
			comment_text = comment_text +"Post-Load Stage: Exp\n";
		}
		else if(pre_blast_load == 1 && post_blast_load == 0) // Pre Imp Stage, No Post 
		{
			var load_curve = new Curve(Curve.CURVE, m, implict_lcid);
			load_curve.heading = "Imp-Exp Switch Curve"
			load_curve.AddPoint(0, 1);
			load_curve.AddPoint(0.999998, 1);
			load_curve.AddPoint(0.999999, 0);
			load_curve.AddPoint(10.0, 0);
			comment_text = comment_text +"Pre-Load Stage: Imp\n";
			comment_text = comment_text +"Post-Load Stage: None\n";
		}
		else if(pre_blast_load == 1 && post_blast_load == 1) // Pre Imp Stage, Post Imp Stage 
		{
			var load_curve = new Curve(Curve.CURVE, m, implict_lcid);
			load_curve.heading = "Imp-Exp-Imp Switch Curve"
			load_curve.AddPoint(0, 1);
			load_curve.AddPoint(0.999998, 1);
			load_curve.AddPoint(0.999999, 0);
			load_curve.AddPoint( (1+blast_duration), 0);
			load_curve.AddPoint( (1+blast_duration+0.000001), 1);
			load_curve.AddPoint(10.0, 1);
			comment_text = comment_text +"Pre-Load Stage: Imp\n";
			comment_text = comment_text +"Post-Load Stage: Imp\n";
		}
		else if(pre_blast_load == 1 && post_blast_load == 2) // Pre Imp Stage, Post Exp Stage  
		{
			var load_curve = new Curve(Curve.CURVE, m, implict_lcid);
			load_curve.heading = "Imp-Exp-Imp Switch Curve"
			load_curve.AddPoint(0, 1);
			load_curve.AddPoint(0.999998, 1);
			load_curve.AddPoint(0.999999, 0);
			load_curve.AddPoint(10.0, 0);
			comment_text = comment_text +"Pre-Load Stage: Imp\n";
			comment_text = comment_text +"Post-Load Stage: Exp\n";
		}
		else if(pre_blast_load == 2 && post_blast_load == 0)  // Pre DR stage, No Post stage 
		{
			no_imp = 1;

			comment_text = comment_text +"Pre-Load Stage: DR\n";
			comment_text = comment_text +"Post-Load Stage: None\n";
		}
		else if(pre_blast_load == 2 && post_blast_load == 1)  // Pre DR stage, Post Imp stage
		{
			var load_curve = new Curve(Curve.CURVE, m, implict_lcid);
			load_curve.heading = "Imp-Exp Switch Curve"
			load_curve.AddPoint(0, 0);
			load_curve.AddPoint( (blast_duration), 0);
			load_curve.AddPoint( (blast_duration+0.000001), 1);
			load_curve.AddPoint(10.0, 1);

			comment_text = comment_text +"Pre-Load Stage: DR\n";
			comment_text = comment_text +"Post-Load Stage: Imp\n";
		}
		else if(pre_blast_load == 2 && post_blast_load == 2)  // Pre DR stage, Post Exp stage
		{
			no_imp = 1;

			comment_text = comment_text +"Pre-Load Stage: DR\n";
			comment_text = comment_text +"Post-Load Stage: Exp\n";
		}

		set_control_cards(m, endtime, timestep_lcid, implict_lcid, mass_scaling, timestep_factor, dr_prop, no_imp);
		set_database_cards(m, part_set, column_height);

		m.title = model_name;

		Message("Finished Column Blast Model Setup");

		if(charge_type == 100)
		{
			var answer = Window.Message("Finished", "Finished Column Blast Model Setup\n\n Model 1: LS-DYNA Model\n\n Model 2: Viper Import Model\n  1: Turn on 'Field Headers' option when saving\n  2: Charge details stored as Parameters for reference\n");
		}
		else
		{
			var answer = Window.Message("Finished", "Finished Column Blast Model Setup");
		}
		m.comments = comment_text;
		Exit();
	}
	else
	{
		var answer = Window.Message("Input Data", "Not all required data input");
	}
}

////////////////////////////GENERAL FUNCTIONS/////////////////////////////////////////////
function Get_JS_Dir(start_path)
{
	if( Unix() ) var slash = "/";
	else if( Windows() ) var slash = "\\";
	
	var tmp1 = start_path.split(slash);
	var tmp2 = tmp1.pop();
	var tmp3 = tmp1.join(slash) + slash;
	
	return tmp3;
}
