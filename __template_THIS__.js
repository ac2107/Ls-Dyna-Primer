// Javascript to read time histories in T/HIS
// Date: 27-04-2023
// Version: -
// Author: Anqi Chen (Arup)
// name: 
// description: - 
// memory: 200

//========================= GENERAL SETTINGS ===================================
var start_time = new Date();
// Check OS and set slash type
if (Unix()) var slash = "/";
else if (Windows()) var slash = "\\";

// Get JavaScript Directory (includes ending slash)
// @ts-ignore
var js_dir = Get_JS_Dir(arguments[0]);
Message("JavaScript Dir: " + js_dir);

// Get Macro Directory
var mac_dir = js_dir + "Macros" + slash;
Message("Macro Dir: " + mac_dir);

//==============================================================================

var m =  Model.GetFromID(1);
//var m =  Model.Read(�/data/test/test1.thf�);
var f = AllocateFlag();
var f_del = AllocateFlag();

Curve.FlagAll(f_del);
Curve.DeleteFlagged(f_del);

// m.FlagAll(f, Entity.NODE);
// if (m.QueryDataPresent(Component.DX, Entity.NODE)) {
//    var curve_array= m.GetDataFlagged(f, Component.DX); }

Message("Post-processing");



m.FlagAll(f, Entity.X_SECTION);
if (m.QueryDataPresent(Component.XSEC_FZ, Entity.X_SECTION)) {
   let curve_array= m.GetDataFlagged(f, Component.XSEC_FZ); }


Curve.Delete(3);

// XSEC1
var fz1 = Curve.GetFromID(1);
// --- reverse fz1 

for (let i = 1; i<fz1.npoints+1; i++){

   let x_val = fz1.GetPoint(i)[0];
   let y_val = fz1.GetPoint(i)[1];

   fz1.SetPoint(i, x_val, y_val*-1);

}

// XSEC2
var fz2 = Curve.GetFromID(2);


// Total reaction forces

var fz = new Curve(3, 'Z force - TOTAL', "Z force - TOTAL");

for (let i = 1; i<fz1.npoints+1; i++){
   
   let x_val = fz1.GetPoint(i)[0];

   let y_val = (fz1.GetPoint(i)[1] + fz2.GetPoint(i)[1])/1000.0;

   fz.AddPoint(x_val, y_val);

}

fz1.RemoveFromGraph(1);
fz2.RemoveFromGraph(1);

var g1 = Graph.GetFromID(1);

g1.xlabel = 'Time (Sec)';
g1.ylabel = 'Force (kN)'

g1.x_unit_size = 12;
g1.xlabel_size = 12;

g1.y_unit_size = 12;
g1.ylabel_size = 12;

Plot();

//========================= FUNCTIONS ==========================================
function Get_JS_Dir(start_path) {
   if (Unix()) var slash = "/";
   else if (Windows()) var slash = "\\";

   var tmp1 = start_path.split(slash);
   var tmp2 = tmp1.pop();
   var tmp3 = tmp1.join(slash) + slash;

   return tmp3;
}

function roundToNext5(number) {
   return Math.ceil(number / 5) * 5;
 }