// Javascript to plot Load Segment Values
// Date: 17 Sep 2020
// Author: Ian Bruce
// Version: 1.2
// name: Seg Pressure
// description: Segment Pressure

Window.Theme(Window.THEME_CURRENT);

var mes1 = Window.Message("Load Segment", "Note: This script reads data from the keyword file. In order to function the Load_Segment cards need to be in the master file not in include files \
 \n \nNote: This script creates a temp shell part to display the contours. Use the Cancel button in the window to exit to ensure this temp part is deleted", Window.OK);
  
var m = Model.GetFromID(1);

///////// Scan Keyword File
var answer = Window.Message("Viper File", "Select Keyword file with Viper data");
var d_file = Window.GetFile(".key");
if(d_file == null) Exit();
Message("Viper Data File: "+d_file);
var d_file = new File(d_file, File.READ);

var load_seg_data = new Object;
var lseg =0;  

Message ("Reading Keyword Data");
while ( (line = d_file.ReadLine()) != undefined)
{
	if(line.slice(0,1) == "$") skip = 1;// ignore comment lines
	else skip = 0;

	if(line.slice(0,1) == "*") lseg=0;   // reset markers when a new card is detected

	if (skip != 1)
	{
		if(lseg == 1) // read load seg data - line 1 
		{
			var id = Number( line.slice(0,10) );
			load_seg_data[id] = new Object;
			lseg = 2;
		}
		else if(lseg == 2) // read load seg data - line 2 
		{
			load_seg_data[id].lcid = Number( line.slice(0,10) ); // load curve id
			load_seg_data[id].n1 = Number( line.slice(30,40) ); // node 1
			load_seg_data[id].n2 = Number( line.slice(40,50) ); // node 2
			load_seg_data[id].n3 = Number( line.slice(50,60) ); // node 3
			load_seg_data[id].n4 = Number( line.slice(60,70) ); // node 4

			//Message("LCID: "+load_seg_data[id].lcid)
			//Message("N: "+load_seg_data[id].n1)
			//Message("N: "+load_seg_data[id].n2)
			//Message("N: "+load_seg_data[id].n3)
			//Message("N: "+load_seg_data[id].n4)
		}
		
		if (line.slice(0,17) == "*LOAD_SEGMENT_ID") // set marker to process next lines as a *DCS
		{
			lseg = 1;
		}
	}
}
d_file.Close();
Message ("Finished Reading Keyword Data");

// Process Curve Data
var max  = -1e20;
var pmin =  1e20;
var min  =  1e20;
// Cycle Points in a curve
for(i in load_seg_data)
{
	var cmax = -1e20;
	var cmin =  1e20;
	
	var cur = Curve.GetFromID(m,load_seg_data[i].lcid);
	var npnt = cur.npoints
	for(j=0; j<npnt; j++)
	{
		var point_data = cur.GetPoint(j);
		cmax = Math.max(cmax, point_data[1]);
		cmin = Math.min(cmin, point_data[1]);
	}
	load_seg_data[i].peak = cmax;
	max =  Math.max(max, cmax);
	pmin = Math.min(pmin, cmax);
	min =  Math.min(min, cmin);
}

Message("Range - Max: "+max+"  Min: "+min);
Message("Peak Range - Max: "+max+"  Min: "+pmin);

// Set up Color Bands
var col = new Object;
col[0] = Colour.BLUE; 
col[1] = Colour.BLUE; 
col[2] = Colour.MEDIUM_BLUE; 
col[3] = Colour.LIGHT_BLUE; 
col[4] = Colour.CYAN; 
col[5] = Colour.GREEN_CYAN; 
col[6] = Colour.GREEN; 
col[7] = Colour.YELLOW_GREEN; 
col[8] = Colour.YELLOW; 
col[9] = Colour.ORANGE; 
col[10] = Colour.DARK_ORANGE; 
col[11] = Colour.RED; 
col[12] = Colour.RED_MAGENTA; 
col[13] = Colour.MAGENTA; 

var bcol = new Object;
bcol[0] =  Colour.RGB(0,0,255);
bcol[1] =  Colour.RGB(0,0,255);
bcol[2] =  Colour.RGB(0,127,255);
bcol[3] =  Colour.RGB(0,191,255);
bcol[4] =  Colour.RGB(0,255,255);
bcol[5] =  Colour.RGB(0,255,170);
bcol[6] =  Colour.RGB(0,255,0);
bcol[7] =  Colour.RGB(170,255,0);
bcol[8] =  Colour.RGB(255,255,0);
bcol[9] =  Colour.RGB(255,191,0); 
bcol[10] =  Colour.RGB(255,127,0); 
bcol[11] = Colour.RGB(255,0,0);
bcol[12] = Colour.RGB(255,0,148); 
bcol[13] = Colour.RGB(255,0,255);

// Create Temp Part
var p = new Part(m, 99000000, 99000000 ,99000000, 'Temp Shells');

// Create Shells and color them
var seg_shells = new Object;
for(i in load_seg_data)
{
	var scol = Math.round( 13*Math.ceil( (load_seg_data[i].peak - (0.999*pmin) ) / ( (1.001*max) - (0.999*pmin) )*10)/10);
	var label = Shell.NextFreeLabel(m);
	var s = new Shell(m, label, p.pid, load_seg_data[i].n1, load_seg_data[i].n2, load_seg_data[i].n3, load_seg_data[i].n4);
	seg_shells[i] = s;
	s.colour = col[1]; 
}
View.Sh();
View.Redraw();

/// Contour Band Window

// set up contour bar intervals - Peak Pressure Range
var intv = (max - pmin) / 13;
var pcid = new Array();
for (i=1; i<=14; i++) 
{
	pcid[i] = pmin + ((i*intv)-intv);
	pcid[i] = pcid[i].toPrecision(4);
}
// set up contour bar intervals - General Range
var intv = (max - min) / 13;
var cid = new Array();
for (i=1; i<=14; i++) 
{
	cid[i] = min + ((i*intv)-intv);
	cid[i] = cid[i].toPrecision(4);
}
// set up custom contour bar intervals - Initially General Range
var cmax = max;
var cmin = min;
var intv = (cmax - cmin) / 13;
var ccid = new Array();
for (i=1; i<=14; i++) 
{
	ccid[i] = cmin + ((i*intv)-intv);
	ccid[i] = ccid[i].toPrecision(4);
}

var w = new Window("Load Viewer", 0.71, 0.77, 0.5, 0.96);
var lb = new Widget(w, Widget.LABEL, 0, 41, 0, 1, "");

var stop = new Object;
var time = 0;
var text_time = ""+time.toExponential(3);
var start_time = 0;
var text_stime = ""+start_time.toExponential(3);
var finish_time = 0.001;
var text_ftime = ""+finish_time.toExponential(3);
var tstep = 5e-6;
var text_tstep = ""+tstep.toExponential(3);


var v=3;
var box = new Widget(w, Widget.LABEL, 1, 45, v-3, v+110, "");
box.category = Widget.CATEGORY_LABEL_BOX
var con_text = new Object;
for(i=14; i>=1; i--)
{
	con_text[i] = new Widget(w, Widget.LABEL, 2, 22, v-2, v+6, "");
	con_text[i].text = ""+cid[i];

	if(i == 1) {} // last entry no color block
	else
	{
		b1 = new Widget(w, Widget.BUTTON, 23, 44, v+2, v+10, " ");
		b1.background = bcol[i-1];
		v=v+8;
	} 
}

v=v+6;
var val = new Widget(w, Widget.LABEL, 1, 45, v, v+9, "");
val.category = Widget.CATEGORY_LABEL_BOX
var val_text = new Widget(w, Widget.LABEL, 5, 30, v+1, v+8, "Set Contours");
var val_check = new Widget(w, Widget.CHECKBOX, 31, 35, v+2, v+6);
val_check.onClick = set_contour;

v=v+9;
var val_max = new Widget(w, Widget.LABEL, 1, 23, v, v+7, "Max");
val_max.category = Widget.CATEGORY_LABEL_BOX
var vmax = new Widget(w, Widget.TEXTBOX, 1, 23, v+7, v+14, ""+cid[14]);
vmax.active = false;
vmax.onChange = con_change;

var val_min = new Widget(w, Widget.LABEL, 23, 45, v, v+7, "Min");
val_min.category = Widget.CATEGORY_LABEL_BOX
var vmin = new Widget(w, Widget.TEXTBOX, 23, 45, v+7, v+14, ""+cid[1]);
vmin.active = false;
vmin.onChange = con_change;

v=v+20;
var peak = new Widget(w, Widget.BUTTON, 1, 45, v, v+10, "Peak Pressure");
peak.category = Widget.CATEGORY_GENERIC_2;
peak.onClick = peak_clicked;

v=v+15;
var ltime1 = new Widget(w, Widget.LABEL, 1, 20, v, v+8, "Time: ");
ltime1.category = Widget.CATEGORY_LABEL_BOX
var ltime2 = new Widget(w, Widget.LABEL, 20, 45, v, v+8, text_time );
ltime2.category = Widget.CATEGORY_LABEL_BOX

v=v+9;
var play = new Widget(w, Widget.BUTTON, 1, 45, v, v+10, "Play");
play.category = Widget.CATEGORY_TOOL;
play.onClick = play_clicked;
play.v = v;

v=v+11;
var rwd = new Widget(w, Widget.BUTTON, 1, 23, v, v+10, "<< RWD");
rwd.category = Widget.CATEGORY_UNSEL_ALL;
rwd.stype = -1;
rwd.onClick = step_clicked;

var fwd = new Widget(w, Widget.BUTTON, 23, 45, v, v+10, " FWD >>");
fwd.category = Widget.CATEGORY_SEL_ALL;
fwd.stype = 1;
fwd.onClick = step_clicked;

v=v+13;
var stime1 = new Widget(w, Widget.LABEL, 1, 23, v, v+8, "Start Time");
stime1.category = Widget.CATEGORY_LABEL_BOX
var stime2 = new Widget(w, Widget.TEXTBOX, 1, 23, v+8, v+16, text_stime );
stime2.onChange = stime_change;

var ftime1 = new Widget(w, Widget.LABEL, 23, 45, v, v+8, "Finish Time");
ftime1.category = Widget.CATEGORY_LABEL_BOX
var ftime2 = new Widget(w, Widget.TEXTBOX, 23, 45, v+8, v+16, text_ftime );
ftime2.onChange = ftime_change;

v=v+17;
var lstep1 = new Widget(w, Widget.LABEL, 1, 23, v, v+8, "Step: ");
lstep1.category = Widget.CATEGORY_LABEL_BOX
var timestep = new Widget(w, Widget.TEXTBOX, 23, 45, v, v+8, text_tstep );
timestep.onChange = step_change;

v=v+15;
var ex = new Widget(w, Widget.BUTTON, 1, 45, v, v+10, "Cancel");
ex.category = Widget.CATEGORY_CANCEL;
ex.onClick = ex_clicked;

w.Show();

/////////////////////////////////////////
function set_contour()
{
	if(this.pushed == true)
	{
		vmax.active = true;
		vmin.active = true;
	}
	else if(this.pushed == false)
	{
		vmax.active = false;
		vmin.active = false;
	}
}
/////////////////////////////////////////
function con_change()
{
	cmax = Number(vmax.text); 
	cmin = Number(vmin.text); 
	// set up contour bar intervals - General Range
	var intv = (cmax - cmin) / 13;
	for (i=1; i<=14; i++) 
	{
		ccid[i] = cmin + ((i*intv)-intv);
		ccid[i] = ccid[i].toPrecision(4);
	}
	for(i=14; i>=1; i--) con_text[i].text = ""+ccid[i];
}
/////////////////////////////////////////
function step_clicked()
{
	if(val_check.pushed == true)
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+ccid[i];
	}
	else
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+cid[i];
	}

	time = Math.max(0,  time + (this.stype * tstep) );
	text_time = ""+time.toExponential(3);
	ltime2.text = text_time;

	for(i in load_seg_data)
	{
		var cur = Curve.GetFromID(m,load_seg_data[i].lcid);
		var npnt = cur.npoints
		var loop_exit = 0;

		for(j=0; j<npnt-1; j++)
		{
			var point_data1 = cur.GetPoint(j);
			var point_data2 = cur.GetPoint(j+1);

			if(point_data2[0] > time && point_data1[0] <= time)
			{
				var time1 = point_data1[0];
				var pressure1 = point_data1[1];

				var time2 = point_data2[0];
				var pressure2 = point_data2[1];
				
				loop_exit = 1;
				break;
			}

			if(point_data1[0] > time)
			{
				break;
			}
		}

		if(loop_exit == 1)
		{
			var fac = (time-time1)/(time2-time1);
			var pressure = pressure1 + ( fac * (pressure2 - pressure1) );
		}
		else
		{
			var pressure = 0;
		}

		if(val_check.pushed == true)
		{
			tmax = cmax;
			tmin = cmin;
		}
		else
		{
			tmax = max;
			tmin = min;
		}

		var scol = Math.round( 13*Math.ceil( (pressure - (0.999*tmin) ) / ( (1.001*tmax) - (0.999*tmin) )*10)/10);
		scol = Math.max(scol, 0);
		scol = Math.min(scol, 13);
		seg_shells[i].colour = col[scol]; 
	}
	View.Redraw();
}
/////////////////////////////////////////
function play_clicked()
{
	var v = this.v;
	play.Hide();
	
	if(val_check.pushed == true)
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+ccid[i];
	}
	else
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+cid[i];
	}

	time = start_time;	
	text_time = ""+time.toExponential(3);
	ltime2.text = text_time;

	for(i in load_seg_data) // set curve start point to zero
	{
		load_seg_data[i].cpoint = 0;
	}

	stop = new Widget(w, Widget.BUTTON, 1, 45, v, v+10, "Stop");
	stop.category = Widget.CATEGORY_UNSEL_ALL;
	stop.timerDelay = 1;
	stop.timerRepeat = true;
	stop.onTimer = run_clicked;
	stop.onClick = stop_clicked;
}
function stop_clicked()
{
	this.onTimer = null;
	this.Hide();
	play.Show();
}
function run_clicked()
{
	time = time + tstep;
	text_time = ""+time.toExponential(3);
	ltime2.text = text_time;

	if(time > finish_time) 
	{
		time = 0;
		text_time = ""+time.toExponential(3);
		ltime2.text = text_time;

		for(i in load_seg_data) // set curve start point to zero
		{
			load_seg_data[i].cpoint = 0;
		}
	}

	for(i in load_seg_data)
	{
		var cur = Curve.GetFromID(m,load_seg_data[i].lcid);
		var npnt = cur.npoints
		var spnt = load_seg_data[i].cpoint; // get curve start point
		var loop_exit = 0;

		for(j=spnt; j<npnt-1; j++)
		{
			var point_data1 = cur.GetPoint(j);
			var point_data2 = cur.GetPoint(j+1);

			if(point_data2[0] > time && point_data1[0] <= time)
			{
				var time1 = point_data1[0];
				var pressure1 = point_data1[1];

				var time2 = point_data2[0];
				var pressure2 = point_data2[1];
				
				loop_exit = 1;
				break;
			}

			if(point_data1[0] > time)
			{
				break;
			}
		}

		if(loop_exit == 1)
		{
			load_seg_data[i].cpoint = Math.max(0, j-2); // set new curve start point

			var fac = (time-time1)/(time2-time1);
			var pressure = pressure1 + ( fac * (pressure2 - pressure1) );
		}
		else
		{
			load_seg_data[i].cpoint = 0; // set new curve start point

			var pressure = 0;
		}

		if(val_check.pushed == true)
		{
			tmax = cmax;
			tmin = cmin;
		}
		else
		{
			tmax = max;
			tmin = min;
		}

		var scol = Math.round( 13*Math.ceil( (pressure - (0.999*tmin) ) / ( (1.001*tmax) - (0.999*tmin) )*10)/10);
		scol = Math.max(scol, 0);
		scol = Math.min(scol, 13);
		seg_shells[i].colour = col[scol];
	}
	View.Redraw();
}
/////////////////////////////////////////
function peak_clicked()
{
	if(val_check.pushed == true)
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+ccid[i];
		tmax = cmax;
		tmin = cmin;
	}
	else
	{
		for(i=14; i>=1; i--) con_text[i].text = ""+pcid[i];
		tmax = max;
		tmin = pmin;
	}

	for(i in load_seg_data)
	{
		var scol = Math.round( 13*Math.ceil( (load_seg_data[i].peak - (0.999*tmin) ) / ( (1.001*tmax) - (0.999*tmin) )*10)/10);
		scol = Math.max(scol, 0);
		scol = Math.min(scol, 13);
		seg_shells[i].colour = col[scol]; 
	}
	View.Redraw();
}
/////////////////////////////////////////
function step_change()
{
	tstep = Number(this.text);
	text_tstep = ""+tstep.toExponential(3);
	this.text = text_tstep;
}
/////////////////////////////////////////
function stime_change()
{
	start_time = Number(this.text);
	text_stime = ""+start_time.toExponential(3);
}
/////////////////////////////////////////
function ftime_change()
{
	finish_time = Number(this.text);
	text_ftime = ""+finish_time.toExponential(3);
}
/////////////////////////////////////////
function ex_clicked()
{
	// delete temp part and exit
	var dflag = AllocateFlag();
	p.SetFlag(dflag);
	m.PropagateFlag(dflag);
	m.DeleteFlagged(dflag);
	Exit();
}  
/////////////////////////////////////////