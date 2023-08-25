/////////// STEEL GUI /////////////////////////////////////////
function steel_clicked()
{
	wt.Hide();
	c_type = 1;
	wm = new Window("Column Blast Tools V3.0", 0.2, 0.3, 0.8, 0.95);
	var top = 1;
	var bot = 205;

	//// Column Details
	v=1;
	h=0;

	var lcd = new Widget(wm, Widget.LABEL, h+0, h+95, v, v+8, "Column Dimensions");

	v=v+10;
	lcd1 = new Widget(wm, Widget.LABEL, h+5, h+69, v, v+8, "Total Column Height (m)");
	lcd1.justify = Widget.LEFT;
	wbase.tcd1 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0.0");
	wbase.tcd1.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.tcd1.onChange = number_check2;

	v=v+10;
	lcd2 = new Widget(wm, Widget.LABEL, h+5, h+69, v, v+8, "Height of Detailed (Solid) Section (m)");
	lcd2.justify = Widget.LEFT;
	wbase.tcd2 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0.0");
	wbase.tcd2.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.tcd2.onChange = height_check;

	ll1 = new Widget(wm, Widget.LABEL, h+1, h+90, v+11, v+12, "");
	ll1.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	/////////////////
	v=v+12;
	var lf = new Widget(wm, Widget.LABEL, h+0, h+95, v, v+8, "Column Top Load");

	v=v+10;
	var lf1 = new Widget(wm, Widget.LABEL, h+5, h+60, v, v+8, "Column Top Load (kN)");
	lf1.justify = Widget.LEFT;
	wbase.tf1 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0");
	wbase.tf1.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf1.onChange = number_check1;

	v=v+10;
	var lf2 = new Widget(wm, Widget.LABEL, h+5, h+60, v, v+8, "Load X Offset (m)");
	lf2.justify = Widget.LEFT;
	wbase.tf2 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0");
	wbase.tf2.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf2.onChange = number_check1;

	v=v+10;
	var lf3 = new Widget(wm, Widget.LABEL, h+5, h+60, v, v+8, "Load Y Offset (m)");
	lf3.justify = Widget.LEFT;
	wbase.tf3 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0");
	wbase.tf3.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf3.onChange = number_check1;

	v=v+15;
	var lf4 = new Widget(wm, Widget.LABEL, h+5, h+60, v, v+8, "Column Top X Moment (kN.m)");
	lf4.justify = Widget.LEFT;
	wbase.tf4 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0");
	wbase.tf4.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf4.onChange = number_check1;

	v=v+10;
	var lf5 = new Widget(wm, Widget.LABEL, h+5, h+60, v, v+8, "Column Top Y Moment (kN.m)");
	lf5.justify = Widget.LEFT;
	wbase.tf5 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "0");
	wbase.tf5.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf5.onChange = number_check1;

	v=v+12;
	var lf2 = new Widget(wm, Widget.LABEL, h+5, h+90, v, v+8, "Gravity (*Lody_Body_Z) is applied to the model");
	lf2.justify = Widget.LEFT;

	v=v+12;
	var lf6 = new Widget(wm, Widget.LABEL, h+15, h+65, v, v+8, "Post Blast Load Ramp Factor");
	lf6.justify = Widget.LEFT;
	wbase.tf6 = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.tf6.onClick = load_ramp_clicked;
	wbase.tf7 = new Widget(wm, Widget.TEXTBOX, h+70, h+90, v, v+8, "1.0");
	wbase.tf7.category = Widget.CATEGORY_TEXT_BOX;
	wbase.tf7.onChange = number_check1;
	wbase.tf7.Hide();

	v=v+2;
	var ll = new Widget(wm, Widget.LABEL, h+1, h+90, v+10, v+11, "");
	ll.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	////////
	v=v+12;

	var lce = new Widget(wm, Widget.LABEL, h+0, h+95, v, v+8, "Column End Conditons");

	v=v+10;
	var lce1 = new Widget(wm, Widget.LABEL, h+5, h+45, v, v+8, "Column Bottom");
	lce1.justify = Widget.LEFT;

	v=v+10;
	var lce11 = new Widget(wm, Widget.LABEL, h+15, h+45, v, v+8, "Pinned");
	lce11.justify = Widget.LEFT;
	wbase.c_end11 = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.c_end11.onClick = end1_clicked;

	v=v+10;
	var lce12 = new Widget(wm, Widget.LABEL, h+15, h+45, v, v+8, "Fixed");
	lce12.justify = Widget.LEFT;
	wbase.c_end12 = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.c_end12.pushed = true; // set initial type
	end1_type = 2; // set initial type
	wbase.c_end12.onClick = end1_clicked;

	v=v+10;
	var lce13 = new Widget(wm, Widget.LABEL, h+15, h+45, v, v+8, "Spring");
	lce13.justify = Widget.LEFT;
	wbase.c_end13 = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.c_end13.onClick = end1_clicked;

	v=v+10;
	wbase.c_spring1 = new Widget(wm, Widget.BUTTON, h+5, h+35, v, v+8, "Set Spring");
	wbase.c_spring1.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.c_spring1.status = 0;
	wbase.c_spring1.prop = bspring_prop;
	wbase.c_spring1.onClick = spring_clicked;
	wbase.c_spring1.Hide();

	v=v-40;
	var lce2 = new Widget(wm, Widget.LABEL, h+45, h+95, v, v+8, "Column Top");
	lce2.justify = Widget.LEFT;

	v=v+10;
	var lce21 = new Widget(wm, Widget.LABEL, h+55, h+95, v, v+8, "Pinned - Z Free");
	lce21.justify = Widget.LEFT;
	wbase.c_end21 = new Widget(wm, Widget.CHECKBOX, h+45, h+53, v, v+8);
	wbase.c_end21.onClick = end2_clicked;

	v=v+10;
	var lce22 = new Widget(wm, Widget.LABEL, h+55, h+95, v, v+8, "Fixed - Z Free");
	lce22.justify = Widget.LEFT;
	wbase.c_end22 = new Widget(wm, Widget.CHECKBOX, h+45, h+53, v, v+8);
	wbase.c_end22.pushed = true; // set initial type
	end2_type = 2; // set initial type
	wbase.c_end22.onClick = end2_clicked;

	v=v+12;
	var lce23 = new Widget(wm, Widget.LABEL, h+55, h+95, v, v+8, "Pinned - Z Locked");
	lce23.justify = Widget.LEFT;
	wbase.c_end23 = new Widget(wm, Widget.CHECKBOX, h+45, h+53, v, v+8);
	wbase.c_end23.onClick = end2_clicked;

	v=v+10;
	var lce24 = new Widget(wm, Widget.LABEL, h+55, h+95, v, v+8, "Fixed - Z Locked");
	lce24.justify = Widget.LEFT;
	wbase.c_end24 = new Widget(wm, Widget.CHECKBOX, h+45, h+53, v, v+8);
	wbase.c_end24.onClick = end2_clicked;

	v=v+12;
	var lce25 = new Widget(wm, Widget.LABEL, h+55, h+95, v, v+8, "Spring");
	lce25.justify = Widget.LEFT;
	wbase.c_end25 = new Widget(wm, Widget.CHECKBOX, h+45, h+53, v, v+8);
	wbase.c_end25.onClick = end2_clicked;

	v=v+10;
	wbase.c_spring2 = new Widget(wm, Widget.BUTTON, h+45, h+75, v, v+8, "Set Spring");
	wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.c_spring2.status = 0;
	wbase.c_spring2.prop = tspring_prop;
	wbase.c_spring2.onClick = spring_clicked;
	wbase.c_spring2.Hide();


	//////// Vertical Split Line
	h = h+95;

	var ll = new Widget(wm, Widget.LABEL, h, h+1, top, bot, "");
	ll.Line(Widget.COLOUR_SAFE, 10, 1, 10, 100);

	///////////////////////// Section Details
	h=h+4;
	v=0;

	/// STEEL 
	wsteel.ls = new Widget(wm, Widget.LABEL, h, h+120, v, v+8, "Section Dimensions");

	v=v+10
	wsteel.li = new Widget(wm, Widget.LABEL, h+55, h+120, v, v+65, "");
	wsteel.li.background = Widget.WHITE;
	wsteel.li.ReadImageFile( img_dir+"isec.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);

	v=v+5;
	wsteel.ls1 = new Widget(wm, Widget.LABEL, h+20, h+50, v, v+8, "I-Section");
	wsteel.ls1.justify = Widget.LEFT;
	wsteel.isec = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.isec.pushed = true;
	s_sec_type = 1;
	wsteel.isec.onClick = sec1_clicked;

	v=v+12;
	wsteel.ls2 = new Widget(wm, Widget.LABEL, h+20, h+50, v, v+8, "HSS - Square");
	wsteel.ls2.justify = Widget.LEFT;
	wsteel.square  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.square.onClick = sec1_clicked;

	v=v+12;
	wsteel.ls3 = new Widget(wm, Widget.LABEL, h+20, h+50, v, v+8, "HSS - Rectangle");
	wsteel.ls3.justify = Widget.LEFT;
	wsteel.rect  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.rect.onClick = sec1_clicked;

	v=v+12;
	wsteel.ls4 = new Widget(wm, Widget.LABEL, h+20, h+50, v, v+8, "HSS - Round");
	wsteel.ls4.justify = Widget.LEFT;
	wsteel.round  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.round.onClick = sec1_clicked;

	v=v+12;
	wsteel.ls5 = new Widget(wm, Widget.LABEL, h+20, h+50, v, v+8, "C-Section");
	wsteel.ls5.justify = Widget.LEFT;
	wsteel.csec  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.csec.onClick = sec1_clicked;

	v=v+20;
	wsteel.ld1 = new Widget(wm, Widget.LABEL, h+5, h+43, v, v+8, "Section Width (m)");
	wsteel.ld1.justify = Widget.LEFT;
	wsteel.td1 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "0.0");
	wsteel.td1.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.td1.onChange = number_check2;

	v=v+10;
	wsteel.ld2 = new Widget(wm, Widget.LABEL, h+5, h+43, v, v+8, "Section Depth (m)");
	wsteel.ld2.justify = Widget.LEFT;
	wsteel.td2 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "0.0");
	wsteel.td2.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.td2.onChange = number_check2;

	v=v-10;
	wsteel.ld3 = new Widget(wm, Widget.LABEL, h+65, h+103, v, v+8, "Web Thickness (m)");
	wsteel.ld3.justify = Widget.LEFT;
	wsteel.td3 = new Widget(wm, Widget.TEXTBOX, h+105, h+120, v, v+8, "0.0");
	wsteel.td3.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.td3.onChange = number_check2;

	v=v+10;
	wsteel.ld4 = new Widget(wm, Widget.LABEL, h+65, h+103, v, v+8, "Flange Thickness (m)");
	wsteel.ld4.justify = Widget.LEFT;
	wsteel.td4 = new Widget(wm, Widget.TEXTBOX, h+105, h+120, v, v+8, "0.0");
	wsteel.td4.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.td4.onChange = number_check2;

	wsteel.ll1 = new Widget(wm, Widget.LABEL, h+1, h+120, v+11, v+12, "");
	wsteel.ll1.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	////////
	v=v+15;
	wsteel.le = new Widget(wm, Widget.LABEL, h+0, h+120, v, v+8, "Element Dimension");

	v=v+10;
	wsteel.le1 = new Widget(wm, Widget.LABEL, h+5, h+53, v, v+8, "Elements Through Thickness");
	wsteel.le1.justify = Widget.LEFT;
	wsteel.te1 = new Widget(wm, Widget.TEXTBOX, h+55, h+70, v, v+8, "6");
	wsteel.te1.onChange = integer_check;

	wsteel.ll2 = new Widget(wm, Widget.LABEL, h+1, h+120, v+11, v+12, "");
	wsteel.ll2.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	// CONCRETE ENCASED I-BEAM
	v=v+15;
	wsteel.len1 = new Widget(wm, Widget.LABEL, h+0, h+120, v, v+8, "Concrete Encased I-Beam");

	v=v+10;
	wsteel.len2 = new Widget(wm, Widget.LABEL, h+15, h+70, v, v+8, "Add Concrete Encasement");
	wsteel.len2.justify = Widget.LEFT;
	wsteel.encase = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.encase.pushed = false;
	wsteel.encase.onClick = encase_clicked;

	v=v+11;
	wsteel.len3 = new Widget(wm, Widget.LABEL, h+5, h+40, v, v+8, "Concrete Width (m)");
	wsteel.len3.justify = Widget.LEFT;
	wsteel.len3.Hide();
	wsteel.enwidth= new Widget(wm, Widget.TEXTBOX, h+40, h+55, v, v+8, "0.0");
	wsteel.enwidth.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.enwidth.onChange = number_check2;
	wsteel.enwidth.Hide();
	
	wsteel.len4 = new Widget(wm, Widget.LABEL, h+65, h+100, v, v+8, "Concrete Depth (m)");
	wsteel.len4.justify = Widget.LEFT;
	wsteel.len4.Hide();
	wsteel.endepth = new Widget(wm, Widget.TEXTBOX, h+100, h+115, v, v+8, "0.0");
	wsteel.endepth.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.endepth.onChange = number_check2;
	wsteel.endepth.Hide();

	wsteel.ll1 = new Widget(wm, Widget.LABEL, h+1, h+120, v+11, v+12, "");
	wsteel.ll1.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	// CONCRETE FILLED HSS ROUND 
	v=v+15;
	wsteel.lfi1 = new Widget(wm, Widget.LABEL, h+0, h+120, v, v+8, "HSS Concrete Filled");

	v=v+10;
	wsteel.lfi2 = new Widget(wm, Widget.LABEL, h+20, h+70, v, v+8, "Add Concrete Fill");
	wsteel.lfi2.justify = Widget.LEFT;
	wsteel.lfi2.Hide();
	wsteel.fill = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wsteel.fill.pushed = false;
	wsteel.fill.Hide();
	wsteel.fill.onClick = filled_clicked;

	//////// Vertical Split Line
	h = h+125;

	var ll = new Widget(wm, Widget.LABEL, h, h+1, top, bot, "");
	ll.Line(Widget.COLOUR_SAFE, 10, 1, 10, 100);

	// MATERIALS
	v=0;
	h=h+1;
	
	// Steel
	wsteel.lmt1 = new Widget(wm, Widget.LABEL, h+0, h+65, v, v+8, "Steel Material Properties");

	v=v+10;
	wsteel.bm1 = new Widget(wm, Widget.BUTTON, h+5, h+30, v, v+8, "Set Material");
	wsteel.bm1.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.bm1.mtype = "Steel";
	wsteel.bm1.status = 0;
	wsteel.bm1.onClick = mat_clicked;
	
	wsteel.bm1.lb1 = new Widget(wm, Widget.LABEL, h+35, h+60, v, v+8, "Undefined");
	wsteel.bm1.lb1.category = Widget.CATEGORY_MESSAGE;

	wsteel.ll2 = new Widget(wm, Widget.LABEL, h+1, h+60, v+14, v+15, "");
	wsteel.ll2.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	v=v+20;
	wsteel.lmet1 = new Widget(wm, Widget.LABEL, h+0, h+60, v, v+8, "Concrete Material Properties");
	wsteel.lmet1.Hide();

	v=v+10;
	wsteel.bme1 = new Widget(wm, Widget.BUTTON, h+5, h+30, v, v+8, "Set Material");
	wsteel.bme1.category = Widget.CATEGORY_WARNING_ACTION;
	wsteel.bme1.mtype = "Concrete";
	wsteel.bme1.status = 0;
	wsteel.bme1.onClick = mat_clicked;
	wsteel.bme1.Hide();
	
	wsteel.bme1.lb1 = new Widget(wm, Widget.LABEL, h+35, h+60, v, v+8, "Undefined");
	wsteel.bme1.lb1.category = Widget.CATEGORY_MESSAGE;
	wsteel.bme1.lb1.Hide();
	
	//////// Vertical Split Line
	h = h+65;

	var ll = new Widget(wm, Widget.LABEL, h, h+1, top, bot, "");
	ll.Line(Widget.COLOUR_SAFE, 10, 1, 10, 100);

	/////////////// CHARGE DATA 
	v=1;
	h=h+4;

	var lb = new Widget(wm, Widget.LABEL, h+0, h+95, v, v+8, "Charge Details");

	v=v+10;
	var lb1 = new Widget(wm, Widget.LABEL, h+5, h+73, v, v+8, "X Distance From Column Center (m)");
	lb1.justify = Widget.LEFT;
	wbase.tb1 = new Widget(wm, Widget.TEXTBOX, h+75, h+90, v, v+8, "0.0");
	wbase.tb1.onChange = number_check1;

	v=v+10;
	var lb2 = new Widget(wm, Widget.LABEL, h+5, h+73, v, v+8, "Y Distance From Column Center (m)");
	lb2.justify = Widget.LEFT;
	wbase.tb2 = new Widget(wm, Widget.TEXTBOX, h+75, h+90, v, v+8, "0.0");
	wbase.tb2.onChange = number_check1;

	v=v+10;
	var lb3 = new Widget(wm, Widget.LABEL, h+5, h+73, v, v+8, "Z Height From Column Base (m)");
	lb3.justify = Widget.LEFT;
	wbase.tb3 = new Widget(wm, Widget.TEXTBOX, h+75, h+90, v, v+8, "0.0");
	wbase.tb3.onChange = number_check1;

	v=v+15;
	var lcm1 = new Widget(wm, Widget.LABEL, h+5, h+73, v, v+8, "Charge Mass (kg TNT eqv)");
	lcm1.justify = Widget.LEFT;
	wbase.tcm1 = new Widget(wm, Widget.TEXTBOX, h+75, h+90, v, v+8, "0.0");
	wbase.tcm1.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.tcm1.onChange = number_check2;

	v=v+15;
	var lb4 = new Widget(wm, Widget.LABEL, h+15, h+90, v, v+8, "Hemispherical (LBE:Type 1)");
	lb4.justify = Widget.LEFT;
	wbase.hemi  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.hemi.pushed = true;
	charge_type = 1;
	wbase.hemi.onClick = charge_clicked;

	v=v+10;
	var lb5 = new Widget(wm, Widget.LABEL, h+15, h+90, v, v+8, "Spherical (LBE:Type 2)");
	lb5.justify = Widget.LEFT;
	wbase.sphere   = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.sphere.onClick = charge_clicked;

	v=v+10;
	var lb6 = new Widget(wm, Widget.LABEL, h+15, h+90, v, v+8, "Air Burst + Ground Reflection (LBE:Type 3)");
	lb6.justify = Widget.LEFT;
	wbase.air   = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.air.onClick = charge_clicked;

	v=v+10;
	var lb7 = new Widget(wm, Widget.LABEL, h+15, h+90, v, v+8, "Viper (CFD)");
	lb7.justify = Widget.LEFT;
	wbase.viper  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.viper.onClick = charge_clicked;

	v=v+15;
	var la = new Widget(wm, Widget.LABEL, h+5, h+75, v, v+8, "Max Angle of Incidence for Blast Load");
	la.justify = Widget.LEFT;
	wbase.ta1 = new Widget(wm, Widget.TEXTBOX, h+75, h+90, v, v+8, "125");
	wbase.ta1.onChange = number_check1;

	v=v+12;
	var lai = new Widget(wm, Widget.LABEL, h+5, h+90, v, v+28, "");
	lai.background = Widget.WHITE;
	lai.ReadImageFile( img_dir+"angle.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);

	//////// Vertical Split Line
	h = h+95;

	var ll = new Widget(wm, Widget.LABEL, h, h+1, top, bot, "");
	ll.Line(Widget.COLOUR_SAFE, 10, 1, 10, 100);

	/////////////// CONTROL PARAMETERS 
	v=1;
	h=h+4;

	var lc3 = new Widget(wm, Widget.LABEL, h+0, h+85, v, v+8, "Control Parameters");

	v=v+12;
	var ltime1 = new Widget(wm, Widget.LABEL, h+5, h+65, v, v+8, "Blast Phase Duration (sec)");
	ltime1.justify = Widget.LEFT;
	wbase.tt1 = new Widget(wm, Widget.TEXTBOX, h+65, h+80, v, v+8, "0.01");
	wbase.tt1.ttype = "blast";
	wbase.tt1.onChange = update_timeline;

	v=v+11;
	var ltime2 = new Widget(wm, Widget.LABEL, h+5, h+65, v, v+8, "Max Timestep (LCTM)");
	ltime2.justify = Widget.LEFT;
	wbase.tt2 = new Widget(wm, Widget.TEXTBOX, h+65, h+80, v, v+8, "1.0e-6");
	wbase.tt2.onChange = number_check1;

	v=v+11;
	var ltime3 = new Widget(wm, Widget.LABEL, h+5, h+65, v, v+8, "Mass Scaling Timestep (DT2MS)");
	ltime3.justify = Widget.LEFT;
	wbase.tt3 = new Widget(wm, Widget.TEXTBOX, h+65, h+80, v, v+8, "0.5e-6");
	wbase.tt3.onChange = number_check1;

	v=v+11;
	var ltime4 = new Widget(wm, Widget.LABEL, h+5, h+65, v, v+8, "Timestep Scale Factor (TSSFAC)");
	ltime4.justify = Widget.LEFT;
	wbase.tt4 = new Widget(wm, Widget.TEXTBOX, h+65, h+80, v, v+8, "0.7");
	wbase.tt4.onChange = number_check1;
	
	wbase.ll1 = new Widget(wm, Widget.LABEL, h+1, h+79, v+12, v+14, "");
	wbase.ll1.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	v=v+15;
	var lc1 = new Widget(wm, Widget.LABEL, h+0, h+85, v, v+8, "Pre Blast Loading Controls");
	
	v=v+11;
	var lg1 = new Widget(wm, Widget.LABEL, h+20, h+80, v, v+8, "Pre Blast Loading (Implicit)");
	lg1.justify = Widget.LEFT;
	wbase.pre_blast1  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.pre_blast1.pushed = true;
	pre_blast_load = 1;
	wbase.pre_blast1.onClick = pre_blast_clicked;
	
	v=v+11;
	var lg2 = new Widget(wm, Widget.LABEL, h+20, h+80, v, v+8, "Pre Blast Loading (Dynamic Relax)");
	lg2.justify = Widget.LEFT;
	wbase.pre_blast2  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.pre_blast2.pushed = false;
	wbase.pre_blast2.onClick = pre_blast_clicked;

	v=v+10;
	wbase.dr1 = new Widget(wm, Widget.BUTTON, h+5, h+80, v, v+8, "Set DR Properties");
	wbase.dr1.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.dr1.status = 0;
	wbase.dr1.prop = dr_prop;
	wbase.dr1.onClick = dr_clicked;
	wbase.dr1.Hide();
	
	wbase.ll2 = new Widget(wm, Widget.LABEL, h+1, h+79, v+13, v+14, "");
	wbase.ll2.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);
	
	v=v+15;
	var lc2 = new Widget(wm, Widget.LABEL, h+0, h+85, v, v+8, "Post Blast Loading Controls");

	v=v+11;
	var lg3 = new Widget(wm, Widget.LABEL, h+20, h+80, v, v+8, "Post Blast Loading Check (Implicit)");
	lg3.justify = Widget.LEFT;
	wbase.post_blast1  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	post_blast_load = 0;
	wbase.post_blast1.pushed = false;
	wbase.post_blast1.onClick = post_blast_clicked;

	v=v+11;
	var lg4 = new Widget(wm, Widget.LABEL, h+20, h+80, v, v+8, "Post Blast Loading Check (Explicit)");
	lg3.justify = Widget.LEFT;
	wbase.post_blast2  = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.post_blast2.pushed = false;
	wbase.post_blast2.onClick = post_blast_clicked;

	v=v+12;
	wbase.post_timel = new Widget(wm, Widget.LABEL, h+5, h+65, v, v+8, "Post Blast Phase Duration (sec)");
	wbase.post_timel.justify = Widget.LEFT;
	wbase.post_timel.Hide();
	wbase.post_time = new Widget(wm, Widget.TEXTBOX, h+65, h+80, v, v+8, "0.0");
	wbase.post_time.ttype = "post"
	wbase.post_time.onChange = update_timeline;
	wbase.post_time.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.post_time.Hide();

	v=v+10;
	wbase.damp = new Widget(wm, Widget.BUTTON, h+5, h+80, v, v+8, "Post Blast Damping");
	wbase.damp.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.damp.status = 0;
	wbase.damp.prop = damp_prop;
	wbase.damp.onClick = damp_clicked;
	wbase.damp.Hide();

	wbase.ll2 = new Widget(wm, Widget.LABEL, h+1, h+79, v+13, v+14, "");
	wbase.ll2.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);
	
	v=v+15;
	var lc2 = new Widget(wm, Widget.LABEL, h+0, h+85, v, v+8, "Analysis Timeline");

	v=v+9;
	wbase.timels = new Widget(wm, Widget.LABEL, h+40, h+59, v, v+6, "Start");
	wbase.timels.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timelf = new Widget(wm, Widget.LABEL, h+60, h+80, v, v+6, "Finish");
	wbase.timelf.category = Widget.CATEGORY_LABEL_BOX;

	v=v+7;
	wbase.timel1_l = new Widget(wm, Widget.LABEL, h+5, h+39, v, v+6, " Pre Blast Phase");
	wbase.timel1_l.justify = Widget.LEFT;
	wbase.timel1_l.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel11 = new Widget(wm, Widget.LABEL, h+40, h+59, v, v+6, "0.0");
	wbase.timel12 = new Widget(wm, Widget.LABEL, h+60, h+80, v, v+6, "1.0");
	wbase.timel11.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel12.category = Widget.CATEGORY_LABEL_BOX;

	v=v+7;
	wbase.timel2_l = new Widget(wm, Widget.LABEL, h+5, h+39, v, v+6, " Blast Phase");
	wbase.timel2_l.justify = Widget.LEFT;
	wbase.timel2_l.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel21 = new Widget(wm, Widget.LABEL, h+40, h+59, v, v+6, "1.0");
	wbase.timel22 = new Widget(wm, Widget.LABEL, h+60, h+80, v, v+6, "1.001");
	wbase.timel21.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel22.category = Widget.CATEGORY_LABEL_BOX;

	v=v+7;
	wbase.timel3_l = new Widget(wm, Widget.LABEL, h+5, h+39, v, v+6, " Post Blast Phase");
	wbase.timel3_l.justify = Widget.LEFT;
	wbase.timel3_l.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel31 = new Widget(wm, Widget.LABEL, h+40, h+59, v, v+6, "1.001");
	wbase.timel32 = new Widget(wm, Widget.LABEL, h+60, h+80, v, v+6, "1.001");
	wbase.timel31.category = Widget.CATEGORY_LABEL_BOX;
	wbase.timel32.category = Widget.CATEGORY_LABEL_BOX;

	///// Bottom Box
	v= bot+5;
	h_end = h+80;
	h=0;

	var ll = new Widget(wm, Widget.LABEL, h+1, h_end, v, v+1, "");
	ll.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	v=v+5

	var create = new Widget(wm, Widget.BUTTON, h+5, h+105, v, v+12, "Create");
	create.category = Widget.CATEGORY_APPLY;
	create.onClick = create_click;

	var exit = new Widget(wm, Widget.BUTTON, h+125, h+220, v, v+12, "Cancel");
	exit.category = Widget.CATEGORY_CANCEL;
	exit.onClick = exit_click;

	wm.Show();
}
//////////
function encase_clicked()
{
	if(this.pushed == true)
	{
		wsteel.len3.Show();
		wsteel.enwidth.Show();
		wsteel.len4.Show();
		wsteel.endepth.Show();
		
		wsteel.lmet1.Show();
		wsteel.bme1.Show();
		wsteel.bme1.lb1.Show();
		
		isec_encase = 1;
	}
	else
	{
		wsteel.len3.Hide();
		wsteel.enwidth.Hide();
		wsteel.len4.Hide();
		wsteel.endepth.Hide();
		
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();
		
		isec_encase = 0;
	}
}
////////////
function filled_clicked()
{
	if(this.pushed == true)
	{
		wsteel.lmet1.Show();
		wsteel.bme1.Show();
		wsteel.bme1.lb1.Show();
		
		hss_fill = 1;

		var fill_warning = Window.Message("HSS Fill", "Be aware that the same general element size is used for the concrete fill as for the steel. \nThis can result in model with a very large number of elements depending on the HSS thickness, \noverall size and number of elements through the thickness", Window.OK);
	}
	else
	{
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();
		
		hss_fill = 0;
	}
}

//////////
function sec1_clicked()
{
	if (this === wsteel.isec )
	{
		wsteel.isec.pushed   = true;
		wsteel.square.pushed = false;
		wsteel.rect.pushed   = false;
		wsteel.round.pushed  = false;
		wsteel.csec.pushed   = false;
		s_sec_type = 1;

		wsteel.ld1.text = "Section Width (m)";
		wsteel.ld2.text = "Section Depth (m)";
		wsteel.ld3.text = "Web Thickness (m)";
		wsteel.ld4.text = "Flange Thickness (m)";

		wsteel.td1.Show();
		wsteel.td2.Show();           
		wsteel.td3.Show();           
		wsteel.td4.Show();

		wsteel.li.Hide();
		wsteel.li.ReadImageFile( img_dir+"isec.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);           
		wsteel.li.Show();

		wsteel.encase.pushed = false;
		wsteel.len2.Show();
		wsteel.encase.Show();

		wsteel.fill.pushed = false;
		wsteel.lfi2.Hide();
		wsteel.fill.Hide();
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();
	}
	if (this === wsteel.square )
	{
		wsteel.isec.pushed   = false;
		wsteel.square.pushed = true;
		wsteel.rect.pushed   = false;
		wsteel.round.pushed  = false;
		wsteel.csec.pushed   = false;
		s_sec_type = 2;

		wsteel.ld1.text = "Section Width (m)";
		wsteel.ld2.text = "Thickness (m)";
		wsteel.ld3.text = "";
		wsteel.ld4.text = "";

		wsteel.td1.Show();       
		wsteel.td2.Show();           
		wsteel.td3.Hide();           
		wsteel.td4.Hide();           

		wsteel.li.Hide();
		wsteel.li.ReadImageFile( img_dir+"hss_sq.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);          
		wsteel.li.Show();

		wsteel.encase.pushed = false;
		wsteel.len2.Hide();
		wsteel.encase.Hide();
		wsteel.len3.Hide();
		wsteel.enwidth.Hide();
		wsteel.len4.Hide();
		wsteel.endepth.Hide();
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();

		wsteel.fill.pushed = false;
		wsteel.lfi2.Show();
		wsteel.fill.Show();
	}
	if (this === wsteel.rect )
	{
		wsteel.isec.pushed   = false;
		wsteel.square.pushed = false;
		wsteel.rect.pushed   = true;
		wsteel.round.pushed  = false;
		wsteel.csec.pushed   = false;
		s_sec_type = 3;

		wsteel.ld1.text = "Section Width (m)";
		wsteel.ld2.text = "Section Depth (m)";
		wsteel.ld3.text = "Thickness (m)";
		wsteel.ld4.text = "";

		wsteel.td1.Show();           
		wsteel.td2.Show();           
		wsteel.td3.Show();           
		wsteel.td4.Hide();           

		wsteel.li.Hide();
		wsteel.li.ReadImageFile( img_dir+"hss_rec.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);           
		wsteel.li.Show();

		wsteel.encase.pushed = false;
		wsteel.len2.Hide();
		wsteel.encase.Hide();
		wsteel.len3.Hide();
		wsteel.enwidth.Hide();
		wsteel.len4.Hide();
		wsteel.endepth.Hide();
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();

		wsteel.fill.pushed = false;
		wsteel.lfi2.Show();
		wsteel.fill.Show();
	}
	if (this === wsteel.round )
	{
		wsteel.isec.pushed   = false;
		wsteel.square.pushed = false;
		wsteel.rect.pushed   = false;
		wsteel.round.pushed  = true;
		wsteel.csec.pushed   = false;
		s_sec_type = 4;

		wsteel.ld1.text = "Outer Diameter (m)";
		wsteel.ld2.text = "Thickness (m)";
		wsteel.ld3.text = "";
		wsteel.ld4.text = "";

		wsteel.td1.Show();           
		wsteel.td2.Show();           
		wsteel.td3.Hide();           
		wsteel.td4.Hide();           

		wsteel.li.Hide();
		wsteel.li.ReadImageFile( img_dir+"hss_ro.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);           
		wsteel.li.Show();

		wsteel.encase.pushed = false;
		wsteel.len1.Hide();
		wsteel.len2.Hide();
		wsteel.encase.Hide();
		wsteel.len3.Hide();
		wsteel.enwidth.Hide();
		wsteel.len4.Hide();
		wsteel.endepth.Hide();
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();

		wsteel.fill.pushed = false;
		wsteel.lfi2.Show();
		wsteel.fill.Show();
	}
	if (this === wsteel.csec )
	{
		wsteel.isec.pushed   = false;
		wsteel.square.pushed = false;
		wsteel.rect.pushed   = false;
		wsteel.round.pushed  = false;
		wsteel.csec.pushed   = true;
		s_sec_type = 5;

		wsteel.ld1.text = "Section Width (m)";
		wsteel.ld2.text = "Section Depth (m)";
		wsteel.ld3.text = "Thickness (m)";
		wsteel.ld4.text = "";

		wsteel.td1.Show();           
		wsteel.td2.Show();           
		wsteel.td3.Show();           
		wsteel.td4.Hide();           

		wsteel.li.Hide();
		wsteel.li.ReadImageFile( img_dir+"csec.png", Widget.CENTER|Widget.MIDDLE|Widget.SCALE);          
		wsteel.li.Show();

		wsteel.encase.pushed = false;
		wsteel.len2.Hide();
		wsteel.encase.Hide();
		wsteel.len3.Hide();
		wsteel.enwidth.Hide();
		wsteel.len4.Hide();
		wsteel.endepth.Hide();
		wsteel.lmet1.Hide();
		wsteel.bme1.Hide();
		wsteel.bme1.lb1.Hide();

		wsteel.fill.pushed = false;
		wsteel.lfi2.Hide();
		wsteel.fill.Hide();
		wsteel.lmet1.Hide();
	}
}
////////////

