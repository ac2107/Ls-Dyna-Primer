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

var n, line;
var csv = new File(js_dir+'slab_forces.csv', File.WRITE);
//------- Tension and compression ----------------------------------------------

m.FlagAll(f, Entity.X_SECTION);
if (m.QueryDataPresent(Component.XSEC_FX, Entity.X_SECTION)) {
   var curve_array= m.GetDataFlagged(f, Component.XSEC_FX); }

csv.Writeln('csid, Tmax, Cmax')
for (let i = 1; i < curve_array.length+1; i++){
   var curve = Curve.GetFromID(i);
   var Tmax = curve.ymax/1000.0;
   var Cmax = curve.ymin/1000.0;
   Message([i, Tmax, Cmax]);
   csv.Writeln(i + ',' + Tmax + ',' + Cmax)
   if (i > 1000) break
}


//------- Shear Horizontal -----------------------------------------------------
Curve.FlagAll(f_del);
Curve.DeleteFlagged(f_del);

m.FlagAll(f, Entity.X_SECTION);
if (m.QueryDataPresent(Component.XSEC_FY, Entity.X_SECTION)) {
   var curve_array= m.GetDataFlagged(f, Component.XSEC_FY); }


csv.Writeln('csid, VEd_h, 0')
for (let i = 1; i < curve_array.length+1; i++){


   var curve = Curve.GetFromID(i);

   var Vmax = curve.ymax/1000.0;
   var Vmin = curve.ymin/1000.0;

   var VEd = Math.max(Math.abs(Vmax), Math.abs(Vmin));

   Message([i, VEd]);
   csv.Writeln(i + ',' + VEd + ',' + '0')

   if (i > 1000) break
}


//------- Shear Veritcal -------------------------------------------------------
Curve.FlagAll(f_del);
Curve.DeleteFlagged(f_del);

m.FlagAll(f, Entity.X_SECTION);
if (m.QueryDataPresent(Component.XSEC_FZ, Entity.X_SECTION)) {
   var curve_array= m.GetDataFlagged(f, Component.XSEC_FZ); }

csv.Writeln('csid, VEd_v, 0')
for (let i = 1; i < curve_array.length+1; i++){
   var curve = Curve.GetFromID(i);
   var Vmax = curve.ymax/1000.0;
   var Vmin = curve.ymin/1000.0;
   var VEd = Math.max(Math.abs(Vmax), Math.abs(Vmin));

   Message([i, VEd]);
   csv.Writeln(i + ',' + VEd + ',' + '0')

   if (i > 1000) break
}






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