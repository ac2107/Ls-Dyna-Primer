///////////////CONCRETE GUI //////////////////
function concrete_clicked()
{
	wt.Hide();
	c_type = 2;

	wm = new Window("Column Blast Tools V3.0", 0.2, 0.3, 0.8, 0.95);
	var top = 1;
	var bot = 205;

	//// Column Details
	v=1;
	h=0;

	//// Column Details
	v=1;
	h=0;

	var lcd = new Widget(wm, Widget.LABEL, h+0, h+90, v, v+8, "Column Dimensions");

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

	wconcr.ls = new Widget(wm, Widget.LABEL, h, h+120, v, v+8, "Section Dimensions");

	v=v+10;
	wconcr.ls2 = new Widget(wm, Widget.LABEL, h+30, h+60, v, v+7, "Round");
	wconcr.ls2.justify = Widget.LEFT;
	wconcr.round = new Widget(wm, Widget.CHECKBOX, h+15, h+23, v, v+7);
	wconcr.round.onClick = sec2_clicked;

	wconcr.ls1 = new Widget(wm, Widget.LABEL, h+80, h+110, v, v+7, "Rectangle");
	wconcr.ls1.justify = Widget.LEFT;
	wconcr.rect  = new Widget(wm, Widget.CHECKBOX, h+65, h+73, v, v+7);
	wconcr.rect.onClick = sec2_clicked;

	v=v+8;
	wconcr.ld1 = new Widget(wm, Widget.LABEL, h+5, h+43, v, v+8, "");
	wconcr.ld1.justify = Widget.LEFT;
	wconcr.ld1.Hide();
	wconcr.td1 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "");
	wconcr.td1.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td1.onChange = width_change;
	wconcr.td1.Hide();

	v=v+10;
	wconcr.ld2 = new Widget(wm, Widget.LABEL, h+5, h+43, v, v+8, "");
	wconcr.ld2.justify = Widget.LEFT;
	wconcr.ld2.Hide();
	wconcr.td2 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "");
	wconcr.td2.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td2.onChange = depth_change;
	wconcr.td2.Hide();

	v=v+10;
	wconcr.ld3 = new Widget(wm, Widget.LABEL, h+5, h+43, v, v+8, "");
	wconcr.ld3.justify = Widget.LEFT;
	wconcr.ld3.Hide();
	wconcr.td3 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "");
	wconcr.td3.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td3.onChange = number_check2;
	wconcr.td3.Hide();

	v=v-20;
	wconcr.ld4 = new Widget(wm, Widget.LABEL, h+65, h+103, v, v+8, "");
	wconcr.ld4.justify = Widget.LEFT;
	wconcr.ld4.Hide();
	wconcr.td4 = new Widget(wm, Widget.TEXTBOX, h+105, h+120, v, v+8, "");
	wconcr.td4.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td4.onChange = rebar_width_change;
	wconcr.td4.Hide();

	v=v+10;
	wconcr.ld5 = new Widget(wm, Widget.LABEL, h+65, h+103, v, v+8, "");
	wconcr.ld5.justify = Widget.LEFT;
	wconcr.ld5.Hide();
	wconcr.td5 = new Widget(wm, Widget.TEXTBOX, h+105, h+120, v, v+8, "");
	wconcr.td5.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td5.onChange = rebar_depth_change;
	wconcr.td5.Hide();

	v=v+20;
	wconcr.ld6 = new Widget(wm, Widget.LABEL, h+5, h+45, v, v+8, "");
	wconcr.ld6.justify = Widget.LEFT;
	wconcr.ld6.Hide();
	wconcr.td6 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "");
	wconcr.td6.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.td6.onChange = number_check2;
	wconcr.td6.Hide();

	v=v+10
	wconcr.lb = new Widget(wm, Widget.LABEL, h+5, h+110, v, v+100, "");
	wconcr.lb.category = Widget.NO_CATEGORY;
	wconcr.lb.background = Widget.WHITE;
	wconcr.lb.h = h;
	wconcr.lb.v = v;     
	wconcr.lb.Hide();

	v=v+100;
	wconcr.lrt1 = new Widget(wm, Widget.LABEL, h+0, h+120, v, v+8, "Rebar Size");
	var pw = new PopupWindow();
	Rebar_popup(pw);	

	v=v+9;
	wconcr.lr1 = new Widget(wm, Widget.LABEL, h+5, h+38, v, v+8, "Vert Rebar Dia (m)");
	wconcr.lr1.justify = Widget.LEFT;
	wconcr.tr1 = new Widget(wm, Widget.TEXTBOX, h+40, h+55, v, v+8, "0.0127");
	wconcr.tr1.popupWindow = pw;
	wconcr.tr1.onPopup  = do_rb_popup;
	wconcr.tr1.onChange = number_check1;

	v=v+10;
	wconcr.lr2 = new Widget(wm, Widget.LABEL, h+5, h+38, v, v+8, "Hoop Rebar Dia (m)");
	wconcr.lr2.justify = Widget.LEFT;
	wconcr.tr2 = new Widget(wm, Widget.TEXTBOX, h+40, h+55, v, v+8, "0.0127");
	wconcr.tr2.popupWindow = pw;
	wconcr.tr2.onPopup  = do_rb_popup;
	wconcr.tr2.onChange = number_check1;

	v=v-10;
	wconcr.lrs1 = new Widget(wm, Widget.LABEL, h+59, h+100, v, v+8, "Stirrup X Rebar Dia (m)");
	wconcr.lrs1.justify = Widget.LEFT;
	wconcr.lrs1.Hide();
	wconcr.trs1 = new Widget(wm, Widget.TEXTBOX, h+100, h+115, v, v+8, "0.0127");
	wconcr.trs1.popupWindow = pw;
	wconcr.trs1.onPopup  = do_rb_popup;
	wconcr.trs1.onChange = number_check1;
	wconcr.trs1.Hide();
	
	v=v+10;
	wconcr.lrs2 = new Widget(wm, Widget.LABEL, h+59, h+100, v, v+8, "Stirrup Y Rebar Dia (m)");
	wconcr.lrs2.justify = Widget.LEFT;
	wconcr.lrs2.Hide();
	wconcr.trs2 = new Widget(wm, Widget.TEXTBOX, h+100, h+115, v, v+8, "0.0127");
	wconcr.trs2.popupWindow = pw;
	wconcr.trs2.onPopup  = do_rb_popup;
	wconcr.trs2.onChange = number_check1;
	wconcr.trs2.Hide();

	wconcr.ll4 = new Widget(wm, Widget.LABEL, h+1, h+120, v+11, v+12, "");
	wconcr.ll4.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	v=v+13;
	wconcr.le = new Widget(wm, Widget.LABEL, h+0, h+120, v, v+8, "Element Dimension");

	v=v+9;
	wconcr.le1 = new Widget(wm, Widget.LABEL, h+5, h+70, v, v+8, "Elements Through Cover Thickness");
	wconcr.le1.justify = Widget.LEFT;
	wconcr.te1 = new Widget(wm, Widget.TEXTBOX, h+70, h+80, v, v+8, "2");
	wconcr.te1.onChange = integer_check;

	//////// Vertical Split Line
	h = h+125;

	var ll = new Widget(wm, Widget.LABEL, h, h+1, top, bot, "");
	ll.Line(Widget.COLOUR_SAFE, 10, 1, 10, 100);

	//////// Material Details Concrete
	h=h+1;
	v=0;

	wconcr.lmt1 = new Widget(wm, Widget.LABEL, h+0, h+60, v, v+8, "Concrete Material Properties");

	v=v+10;
	wconcr.bmc1 = new Widget(wm, Widget.BUTTON, h+5, h+30, v, v+8, "Set Material");
	wconcr.bmc1.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.bmc1.mtype = "Concrete";
	wconcr.bmc1.status = 0;
	wconcr.bmc1.onClick = mat_clicked;
	
	wconcr.bmc1.lb1 = new Widget(wm, Widget.LABEL, h+35, h+60, v, v+8, "Undefined");
	wconcr.bmc1.lb1.category = Widget.CATEGORY_MESSAGE;

	wconcr.ll3 = new Widget(wm, Widget.LABEL, h+1, h+60, v+14, v+15, "");
	wconcr.ll3.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	v=v+16;
	wconcr.lmrt2 = new Widget(wm, Widget.LABEL, h+0, h+60, v, v+8, "Rebar Material Properties");

	v=v+10;
	wconcr.bmr1 = new Widget(wm, Widget.BUTTON, h+5, h+30, v, v+8, "Set Material");
	wconcr.bmr1.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.bmr1.mtype = "Rebar";
	wconcr.bmr1.status = 0;
	wconcr.bmr1.onClick = mat_clicked;
	
	wconcr.bmr1.lb1 = new Widget(wm, Widget.LABEL, h+35, h+60, v, v+8, "Undefined");
	wconcr.bmr1.lb1.category = Widget.CATEGORY_MESSAGE;
	
	wconcr.ll3 = new Widget(wm, Widget.LABEL, h+1, h+60, v+14, v+15, "");
	wconcr.ll3.Line(Widget.COLOUR_SAFE, 1, 10, 100, 10);

	////////
	v=v+20;

	var lcj = new Widget(wm, Widget.LABEL, h+0, h+60, v, v+8, "Steel Jacket");
	
	v=v+10;
	var lcj1 = new Widget(wm, Widget.LABEL, h+20, h+60, v, v+8, "Add Steel Jacket");
	lcj1.justify = Widget.LEFT;
	wbase.cjack1 = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
	wbase.cjack1.pushed = false;
	wbase.cjack1.onClick = jack_clicked;

	v=v+10;
	wbase.lcj2 = new Widget(wm, Widget.LABEL, h+5, h+45, v, v+8, "Steel Thickness (m)");
	wbase.lcj2.justify = Widget.LEFT;
	wbase.lcj2.Hide();
	wbase.cjack2 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "0.0");
	wbase.cjack2.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.cjack2.onChange = number_check2;
	wbase.cjack2.Hide();
	
	v=v+10;
	wbase.lcj3 = new Widget(wm, Widget.LABEL, h+5, h+45, v, v+8, "Jacket Height (m)");
	wbase.lcj3.justify = Widget.LEFT;
	wbase.lcj3.Hide();
	wbase.cjack3 = new Widget(wm, Widget.TEXTBOX, h+45, h+60, v, v+8, "0.0");
	wbase.cjack3.category = Widget.CATEGORY_WARNING_ACTION;
	wbase.cjack3.onChange = number_check2;
	wbase.cjack3.Hide();

	v=v+16;
	wconcr.lmrt3 = new Widget(wm, Widget.LABEL, h+0, h+60, v, v+8, "Steel Jacket Material Properties");
	wconcr.lmrt3.Hide();
	
	v=v+10;
	wconcr.bcj1 = new Widget(wm, Widget.BUTTON, h+5, h+30, v, v+8, "Set Material");
	wconcr.bcj1.category = Widget.CATEGORY_WARNING_ACTION;
	wconcr.bcj1.onClick = mat_clicked;
	wconcr.bcj1.mtype = "Steel";
	wconcr.bcj1.status = 0;
	wconcr.bcj1.Hide();
	
	wconcr.bcj1.lb1 = new Widget(wm, Widget.LABEL, h+35, h+60, v, v+8, "Undefined");
	wconcr.bcj1.lb1.category = Widget.CATEGORY_MESSAGE;
	wconcr.bcj1.lb1.Hide();

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
	wbase.viper   = new Widget(wm, Widget.CHECKBOX, h+5, h+13, v, v+8);
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
	
	wbase.ll1 = new Widget(wm, Widget.LABEL, h+1, h+79, v+13, v+14, "");
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
	
	v=v+14;
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
	lg4.justify = Widget.LEFT;
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

	v=v+10;
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
////////////
function jack_clicked()
{
	if(this.pushed == true)
	{
		wbase.cjack2.Show();
		wbase.lcj2.Show();
		wbase.cjack3.Show();
		wbase.lcj3.Show();
		wconcr.lmrt3.Show();
		wconcr.bcj1.Show();
		wconcr.bcj1.lb1.Show();
		jack = 1;
	}
	else
	{
		wbase.cjack2.Hide();
		wbase.lcj2.Hide();
		wbase.cjack3.Hide();
		wbase.lcj3.Hide();
		wconcr.lmrt3.Hide();
		wconcr.bcj1.Hide();
		wconcr.bcj1.lb1.Hide();
		jack = 0;
	}
}
////////////

function sec2_clicked()
{
	if (this === wconcr.rect )
	{
		wconcr.rect.pushed   = true;
		wconcr.round.pushed  = false;
		c_sec_type = 1;

		wcrect.width = 1.0;
		wcrect.depth = 1.0;
		wcrect.rebar_w = 4;
		wcrect.rebar_d = 4;

		wconcr.ld1.text = "Section Width (m)";
		wconcr.ld1.Show();
		wconcr.ld2.text = "Section Depth (m)";
		wconcr.ld2.Show();
		wconcr.ld3.text = "Cover Thickness (m)";
		wconcr.ld3.Show();
		wconcr.ld4.text = "Width Rebar Number";
		wconcr.ld4.Show();
		wconcr.ld5.text = "Depth Rebar Number";
		wconcr.ld5.Show();
		wconcr.ld6.text = "Rebar Hoop Spacing (m)";
		wconcr.ld6.Show();

		wconcr.td1.Show();
		wconcr.td1.text = wcrect.width;
		wconcr.td1.category = Widget.CATEGORY_TEXT_BOX;           
		
		wconcr.td2.Show();           
		wconcr.td2.text = wcrect.depth;           
		wconcr.td2.category = Widget.CATEGORY_TEXT_BOX;           
		
		wconcr.td3.Show();           
		wconcr.td3.text = "0.0";           
		wconcr.td3.category = Widget.CATEGORY_WARNING_ACTION;           
		
		wconcr.td4.Show();           
		wconcr.td4.text = wcrect.rebar_w;           
		wconcr.td4.category = Widget.CATEGORY_TEXT_BOX;           
		
		wconcr.td5.Show();           
		wconcr.td5.text = wcrect.rebar_d;           
		wconcr.td5.category = Widget.CATEGORY_TEXT_BOX;           
		
		wconcr.td6.Show();           
		wconcr.td6.text = "0.0";           
		wconcr.td6.category = Widget.CATEGORY_WARNING_ACTION;           
		
		wconcr.lb.Show();
		
		wconcr.lrs1.Show();           
		wconcr.trs1.Show();           
		wconcr.lrs2.Show();           
		wconcr.trs2.Show();           

		/// Interactive Diagram
		wcrect.h = wconcr.lb.h;
		wcrect.v = wconcr.lb.v;

		wcrect.xres = 74;
		wcrect.yres = 74;

		wcrect.li = new Widget(wm, Widget.LABEL, wcrect.h+20, wcrect.h+30+wcrect.xres, wcrect.v+15, wcrect.v+25+wcrect.yres, "");
		wcrect.li.category = Widget.NO_CATEGORY;
		wcrect.li.background = Widget.WHITE;
		wcrect.li.xResolution = wcrect.xres+12;
		wcrect.li.yResolution = wcrect.yres+12;

		redraw_rect();
	}
	if (this === wconcr.round )
	{
		wconcr.rect.pushed   = false;
		wconcr.round.pushed  = true;
		c_sec_type = 2;

		wcrect.dia = 1.0;
		wcrect.rebar = 10;

		wconcr.ld1.text = "Section Diameter (m)";
		wconcr.ld1.Show();
		wconcr.ld2.text = "Cover Thickness (m)";
		wconcr.ld2.Show();
		wconcr.ld3.text = "";
		wconcr.ld3.Show();
		wconcr.ld4.text = "Rebar Number";
		wconcr.ld4.Show();
		wconcr.ld5.text = "";
		wconcr.ld5.Show();
		wconcr.ld6.text = "Rebar Hoop Spacing (m)";
		wconcr.ld6.Show();

		wconcr.td1.Show();
		wconcr.td1.text = wcrect.dia; 
		wconcr.td1.category = Widget.CATEGORY_TEXT_BOX;
		
		wconcr.td2.Show();           
		wconcr.td2.text = "0.0"; 
		wconcr.td2.category = Widget.CATEGORY_WARNING_ACTION;
		
		wconcr.td3.Hide();           
		wconcr.td3.text = "0.0"; 
		wconcr.td3.category = Widget.CATEGORY_WARNING_ACTION;           
		
		wconcr.td4.Show();           
		wconcr.td4.text = wcrect.rebar; 
		wconcr.td4.category = Widget.CATEGORY_TEXT_BOX;
		
		wconcr.td5.Hide();
		wconcr.td5.text = "0.0"; 
		wconcr.td5.category = Widget.CATEGORY_WARNING_ACTION;           
		
		wconcr.td6.Show();           
		wconcr.td6.text = "0.0";           
		wconcr.td6.category = Widget.CATEGORY_WARNING_ACTION;           
		
		wconcr.lb.Show();

		wconcr.lrs1.Hide();           
		wconcr.trs1.Hide();           
		wconcr.lrs2.Hide();           
		wconcr.trs2.Hide();                

		/// Interactive Diagram
		wcrect.h = wconcr.lb.h;
		wcrect.v = wconcr.lb.v;

		wcrect.xres = 450;
		wcrect.yres = 450;

		wcrect.li = new Widget(wm, Widget.LABEL, wcrect.h+20, wcrect.h+30+(wcrect.xres/6), wcrect.v+15, wcrect.v+25+(wcrect.yres/6), "");
		wcrect.li.category = Widget.NO_CATEGORY;
		wcrect.li.background = Widget.WHITE;
		wcrect.li.xResolution = wcrect.xres+72;
		wcrect.li.yResolution = wcrect.yres+72;

		// Delete Stirup check boxes
		for( j in wcrect.rwbox)
		{
			wcrect.rwbox[j].Delete();
			delete wcrect.rwbox[j]
		}
		for( j in wcrect.rdbox)
		{
			wcrect.rdbox[j].Delete();
			delete wcrect.rdbox[j]
		}
		wcrect.li.Clear();

		redraw_circ();
	}
}
//////////////////////////////////////////
function width_change()
{
	if (wconcr.rect.pushed == true )
	{
		//Number Check
		if(isNaN(this.text) == true)  // not a number
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if (Number(this.text) <= 0) // less then zero
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Width: "+this.text);
			wcrect.width = Number(this.text);

			for( j in wcrect.rwbox) wcrect.rwbox[j].Delete();
			for( j in wcrect.rdbox) wcrect.rdbox[j].Delete();
			wcrect.li.Clear();
			wm.Redraw();
			redraw_rect();
		}
	}
	else
	{
		if(isNaN(this.text) == true)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if (Number(this.text) <= 0)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
		}
	}
}
//////////////////////////////////////////
function depth_change()
{
	if (wconcr.rect.pushed == true )
	{
		//Number Check
		if(isNaN(this.text) == true)  // not a number
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if (Number(this.text) <= 0) // less then zero
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Depth: "+this.text);
			wcrect.depth = Number(this.text);

			for( j in wcrect.rwbox) wcrect.rwbox[j].Delete();
			for( j in wcrect.rdbox) wcrect.rdbox[j].Delete();
			wcrect.li.Clear();
			wm.Redraw();
			redraw_rect();
		}
	}
	else
	{
		if(isNaN(this.text) == true)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if (Number(this.text) <= 0)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
		}
	}
}
//////////////////////////////////////////
function rebar_width_change()
{
	if (wconcr.rect.pushed == true )
	{
		if(Math.round(this.text) != this.text)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(Number(this.text) <= 1)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Rebar Width Num: "+this.text);
			wcrect.rebar_w = Number(this.text);

			for( j in wcrect.rwbox) wcrect.rwbox[j].Delete();
			for( j in wcrect.rdbox) wcrect.rdbox[j].Delete();
			wcrect.li.Clear();
			wm.Redraw();
			redraw_rect();
		}
	}
	else
	{
		if(Math.round(this.text) != this.text)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(Number(this.text) <= 0)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Rebar Width Num: "+this.text);
			wcrect.rebar = Number(this.text);

			wm.Redraw();
			redraw_circ();
		}
	}
}
//////////////////////////////////////////
function rebar_depth_change()
{
	if (wconcr.rect.pushed == true )
	{
		if(Math.round(this.text) != this.text)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(Number(this.text) <= 1)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Rebar Depth Num: "+this.text);
			wcrect.rebar_d = Number(this.text);

			for( j in wcrect.rwbox) wcrect.rwbox[j].Delete();
			for( j in wcrect.rdbox) wcrect.rdbox[j].Delete();
			wcrect.li.Clear();
			wm.Redraw();
			redraw_rect();
		}
	}
	else
	{
		if(Math.round(this.text) != this.text)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(Number(this.text) <= 0)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else
		{
			this.category = Widget.CATEGORY_TEXT_BOX;
			Message("Rebar Width Num: "+this.text);
			wcrect.rebar = Number(this.text);

			wm.Redraw();
			redraw_circ();
		}
	}
}
///////////
function redraw_rect()
{
	var h = wcrect.h;
	var v = wcrect.v;
	var xres = wcrect.xres;
	var yres = wcrect.yres;
	var width = wcrect.width;
	var depth = wcrect.depth;

	if( width > depth) 
	{
		xlen = Math.round(xres*2)/2;
		ylen = Math.round(depth/width * yres*2)/2; 
	}
	else
	{
		xlen = Math.round(width/depth * xres*2)/2;
		ylen = Math.round(yres*2)/2;
	}

	wcrect.li.Polygon(Img_Blue, true, 0,0, xlen,0, xlen,ylen, 0,ylen);
	
	// W Line
	wcrect.li.Line(Img_Black, 0,ylen+5 , xlen,ylen+5);
	wcrect.li.Line(Img_Black, 0,ylen+3 , 0,ylen+7);
	wcrect.li.Line(Img_Black, xlen,ylen+3 , xlen,ylen+7);
	
	wcrect.li.Polygon(Img_Black, true, 0,ylen+5, 2,ylen+4,  2,ylen+6);
	wcrect.li.Polygon(Img_Black, true, xlen,ylen+5, xlen-2,ylen+4,  xlen-2,ylen+6);

	var mid = xlen/2;
	wcrect.li.Line(Img_Black, mid-2,ylen+7 , mid-1,ylen+10);
	wcrect.li.Line(Img_Black, mid-1,ylen+10 , mid,ylen+7);
	wcrect.li.Line(Img_Black, mid+1,ylen+10 , mid,ylen+7);
	wcrect.li.Line(Img_Black, mid+2,ylen+7 , mid+1,ylen+10);

	// D Line
	wcrect.li.Line(Img_Black, xlen+5,0 , xlen+5,ylen);
	wcrect.li.Line(Img_Black, xlen+3,0 , xlen+7,0);
	wcrect.li.Line(Img_Black, xlen+3,ylen , xlen+7,ylen);
	
	wcrect.li.Polygon(Img_Black, true, xlen+5,0, xlen+4,2,  xlen+6,2 );
	wcrect.li.Polygon(Img_Black, true, xlen+5,ylen, xlen+4,ylen-2,  xlen+6,ylen-2);

	var mid = ylen/2;
	wcrect.li.Line(Img_Black, xlen+7, mid+2,   xlen+11, mid+2);
	wcrect.li.Line(Img_Black, xlen+7, mid+2,   xlen+7, mid);
	wcrect.li.Line(Img_Black, xlen+11, mid+2,   xlen+11, mid);
	wcrect.li.Line(Img_Black, xlen+7, mid,   xlen+8, mid-1);
	wcrect.li.Line(Img_Black, xlen+11, mid,   xlen+10, mid-1);
	wcrect.li.Line(Img_Black, xlen+8, mid-1,   xlen+10, mid-1);

	// T Line
	wcrect.li.Line(Img_Black, xlen-5, ylen-10 , xlen-5,ylen);
	wcrect.li.Line(Img_Black, xlen-8, ylen-10 , xlen-3,ylen-10);
	
	wcrect.li.Polygon(Img_Black, true, xlen-5,ylen-10, xlen-6,ylen-9,  xlen-4,ylen-9);
	wcrect.li.Polygon(Img_Black, true, xlen-5,ylen, xlen-6,ylen-1,  xlen-4,ylen-1);

	wcrect.li.Line(Img_Black, xlen-9, ylen-6 , xlen-7,ylen-6);
	wcrect.li.Line(Img_Black, xlen-8, ylen-6 , xlen-8,ylen-3);

	//Axis
	var midx = xlen/2;
	var midy = ylen/2;
	wcrect.li.Line(Img_Red, midx, midy , midx+4,midy);
	wcrect.li.Line(Img_Red, midx, midy , midx,midy-4);
	wcrect.li.Polygon(Img_Red, true, midx+6,midy, midx+4,midy+1, midx+4,midy-1 );
	wcrect.li.Polygon(Img_Red, true, midx,midy-6, midx+1,midy-4, midx-1,midy-4 );
	wcrect.li.Polygon(Img_Red, true, midx-1,midy-1, midx+1,midy-1, midx+1,midy+1, midx-1,midy+1 );

	wcrect.li.Line(Img_Red, midx+3,midy+5, midx+5,midy+2);
	wcrect.li.Line(Img_Red, midx+3,midy+2, midx+5,midy+5);

	wcrect.li.Line(Img_Red, midx-3,midy-5, midx-4,midy-3);
	wcrect.li.Line(Img_Red, midx-5,midy-5, midx-4,midy-3);
	wcrect.li.Line(Img_Red, midx-4,midy-3, midx-4,midy-1);

	var spacing_d = Math.round( (ylen-20)/(wcrect.rebar_d-1) );
	var spacing_w = Math.round( (xlen-20)/(wcrect.rebar_w-1) );

	for(var i=0; i<wcrect.rebar_d; i++)
	{
		var offset = spacing_d*i
		wcrect.li.Polygon(Img_Green, true, 9,(9+offset),11,(9+offset),11,(11+offset),9,(11+offset));
		wcrect.li.Polygon(Img_Green, true, xlen-11,(9+offset),xlen-9,(9+offset),xlen-9,(11+offset),xlen-11,(11+offset));
	}
	for(var i=0; i<wcrect.rebar_w-2; i++)
	{
		var offset = spacing_w + (spacing_w*i)
		wcrect.li.Polygon(Img_Green, true, (9+offset),9,(11+offset),9,(11+offset),11,(9+offset),11);
		wcrect.li.Polygon(Img_Green, true, (9+offset),ylen-11,(11+offset),ylen-11,(11+offset),ylen-9,(9+offset),ylen-9);
	}

	wcrect.rdbox = new Object;
	for(var i=0; i<wcrect.rebar_d-2; i++)
	{
		var offset = spacing_d + (spacing_d*i)
		wcrect.rdbox[i+1] = new Widget(wm, Widget.CHECKBOX, h+10, h+14, v+23+offset, v+27+offset);
		wcrect.rdbox[i+1].id = i;
		wcrect.rdbox[i+1].onClick = sbox_clicked;
	}
	wcrect.rwbox = new Object;
	for(var i=0; i<wcrect.rebar_w-2; i++)
	{
		var offset = spacing_w + (spacing_w*i)
		wcrect.rwbox[i+1] = new Widget(wm, Widget.CHECKBOX, h+28+offset, h+32+offset, v+5, v+9);
		wcrect.rwbox[i+1].id = i;
		wcrect.rwbox[i+1].onClick = sbox_clicked;
	}
	wm.Redraw();
}
function redraw_circ()
{
	var h = wcrect.h;
	var v = wcrect.v;
	var xres = wcrect.xres;
	var yres = wcrect.yres;
	var dia = wcrect.width;

	xlen = Math.round(2*xres)/2;
	ylen = Math.round(2*yres)/2; 
	wcrect.li.Circle(Img_Blue, true, xlen/2, ylen/2, xlen/2);
	
	// D Line
	wcrect.li.Line(Img_Black, xlen+30,0 , xlen+30,ylen);
	wcrect.li.Line(Img_Black, 60+xlen/2,0 , xlen+42,0);
	wcrect.li.Line(Img_Black, 60+xlen/2,ylen , xlen+42,ylen);
	
	wcrect.li.Polygon(Img_Black, true, xlen+30,0, xlen+24,12,  xlen+36,12 );
	wcrect.li.Polygon(Img_Black, true, xlen+30,ylen-12, xlen+24,ylen-24,  xlen+36,ylen-24);

	var mid = ylen/2;
	wcrect.li.Line(Img_Black, xlen+42, mid+12,   xlen+66, mid+12);
	wcrect.li.Line(Img_Black, xlen+42, mid+12,   xlen+42, mid);
	wcrect.li.Line(Img_Black, xlen+66, mid+12,   xlen+66, mid);
	wcrect.li.Line(Img_Black, xlen+42, mid,   xlen+48, mid-6);
	wcrect.li.Line(Img_Black, xlen+66, mid,   xlen+60, mid-6);
	wcrect.li.Line(Img_Black, xlen+48, mid-6,   xlen+60, mid-6);

	// T Line
	wcrect.li.Line(Img_Black, 48, ylen-42 , 48,ylen);
	wcrect.li.Line(Img_Black, 36, ylen-42 , xlen/2-60,ylen-42);
	wcrect.li.Line(Img_Black, 36, ylen , xlen/2-60,ylen);
	
	wcrect.li.Polygon(Img_Black, true, 48,ylen-42, 42,ylen-36,  54,ylen-36);
	wcrect.li.Polygon(Img_Black, true, 48,ylen   , 42,ylen-6,  54,ylen-6);

	wcrect.li.Line(Img_Black, 18, ylen-30 , 30,ylen-30);
	wcrect.li.Line(Img_Black, 24, ylen-30 , 24,ylen-14);

	//Axis
	var midx = xlen/2;
	var midy = ylen/2;
	wcrect.li.Line(Img_Red, midx, midy , midx+24,midy);
	wcrect.li.Line(Img_Red, midx, midy , midx,midy-24);
	wcrect.li.Polygon(Img_Red, true, midx+36,midy, midx+24,midy+6, midx+24,midy-6 );
	wcrect.li.Polygon(Img_Red, true, midx,midy-36, midx+6,midy-24, midx-6,midy-24 );
	wcrect.li.Polygon(Img_Red, true, midx-6,midy-6, midx+6,midy-6, midx+6,midy+6, midx-6,midy+6 );

	wcrect.li.Line(Img_Red, midx+18,midy+30, midx+30,midy+12);
	wcrect.li.Line(Img_Red, midx+18,midy+12, midx+30,midy+30);

	wcrect.li.Line(Img_Red, midx-18,midy-30, midx-24,midy-18);
	wcrect.li.Line(Img_Red, midx-30,midy-30, midx-24,midy-18);
	wcrect.li.Line(Img_Red, midx-24,midy-18, midx-24,midy-6);

	// rebar
	var b_angle = 360/wcrect.rebar;
	for(var i=0; i<wcrect.rebar; i++)
	{
		var angle = b_angle * i;
		var cos = Math.cos(angle/180*Math.PI); 
		var sin = Math.sin(angle/180*Math.PI);

		var x = Math.round( (xlen-90)/2 * cos + xlen/2 ); 
		var y = Math.round( (ylen-90)/2 * sin + ylen/2 ); 

		wcrect.li.Polygon(Img_Green, true, x-6,y-6, x+6,y-6, x+6,y+6, x-6,y+6);
	}
	wm.Redraw();
}
///////////
function sbox_clicked()
{
	wcrect.li.Clear();
	wm.Redraw();

	var xres = wcrect.xres;
	var yres = wcrect.yres;
	var width = wcrect.width;
	var depth = wcrect.depth;
	if( width > depth) 
	{
		xlen = Math.round( xres *2)/2;
		ylen = Math.round( depth/width * yres *2)/2; 
	}
	else
	{
		xlen = Math.round( width/depth * xres *2)/2; 
		ylen = Math.round( yres *2)/2;
	}
	
	wcrect.li.Polygon(Img_Blue, true, 0,0, xlen,0, xlen,ylen, 0,ylen);

	// W Line
	wcrect.li.Line(Img_Black, 0,ylen+5 , xlen,ylen+5);
	wcrect.li.Line(Img_Black, 0,ylen+3 , 0,ylen+7);
	wcrect.li.Line(Img_Black, xlen,ylen+3 , xlen,ylen+7);
	
	wcrect.li.Polygon(Img_Black, true, 0,ylen+5, 2,ylen+4,  2,ylen+6);
	wcrect.li.Polygon(Img_Black, true, xlen,ylen+5, xlen-2,ylen+4,  xlen-2,ylen+6);

	var mid = xlen/2;
	wcrect.li.Line(Img_Black, mid-2,ylen+7 , mid-1,ylen+10);
	wcrect.li.Line(Img_Black, mid-1,ylen+10 , mid,ylen+7);
	wcrect.li.Line(Img_Black, mid+1,ylen+10 , mid,ylen+7);
	wcrect.li.Line(Img_Black, mid+2,ylen+7 , mid+1,ylen+10);

	// D Line
	wcrect.li.Line(Img_Black, xlen+5,0 , xlen+5,ylen);
	wcrect.li.Line(Img_Black, xlen+3,0 , xlen+7,0);
	wcrect.li.Line(Img_Black, xlen+3,ylen , xlen+7,ylen);
	
	wcrect.li.Polygon(Img_Black, true, xlen+5,0, xlen+4,2,  xlen+6,2 );
	wcrect.li.Polygon(Img_Black, true, xlen+5,ylen, xlen+4,ylen-2,  xlen+6,ylen-2);

	var mid = ylen/2;
	wcrect.li.Line(Img_Black, xlen+7, mid+2,   xlen+11, mid+2);
	wcrect.li.Line(Img_Black, xlen+7, mid+2,   xlen+7, mid);
	wcrect.li.Line(Img_Black, xlen+11, mid+2,   xlen+11, mid);
	wcrect.li.Line(Img_Black, xlen+7, mid,   xlen+8, mid-1);
	wcrect.li.Line(Img_Black, xlen+11, mid,   xlen+10, mid-1);
	wcrect.li.Line(Img_Black, xlen+8, mid-1,   xlen+10, mid-1);

	// T Line
	wcrect.li.Line(Img_Black, xlen-5, ylen-10 , xlen-5,ylen);
	wcrect.li.Line(Img_Black, xlen-8, ylen-10 , xlen-3,ylen-10);
	
	wcrect.li.Polygon(Img_Black, true, xlen-5,ylen-10, xlen-6,ylen-9,  xlen-4,ylen-9);
	wcrect.li.Polygon(Img_Black, true, xlen-5,ylen, xlen-6,ylen-1,  xlen-4,ylen-1);

	wcrect.li.Line(Img_Black, xlen-9, ylen-6 , xlen-7,ylen-6);
	wcrect.li.Line(Img_Black, xlen-8, ylen-6 , xlen-8,ylen-3);

	var spacing_d = Math.round( (ylen-20)/(wcrect.rebar_d-1) );
	var spacing_w = Math.round( (xlen-20)/(wcrect.rebar_w-1) );

	for(var i=0; i<wcrect.rebar_d; i++)
	{
		var offset = spacing_d*i
		wcrect.li.Polygon(Img_Green, true, 9,(9+offset),11,(9+offset),11,(11+offset),9,(11+offset));
		wcrect.li.Polygon(Img_Green, true, xlen-11,(9+offset),xlen-9,(9+offset),xlen-9,(11+offset),xlen-11,(11+offset));
	}
	for(var i=0; i<wcrect.rebar_w-2; i++)
	{
		var offset = spacing_w + (spacing_w*i)
		wcrect.li.Polygon(Img_Green, true, (9+offset),9,(11+offset),9,(11+offset),11,(9+offset),11);
		wcrect.li.Polygon(Img_Green, true, (9+offset),ylen-11,(11+offset),ylen-11,(11+offset),ylen-9,(9+offset),ylen-9);
	}

	for( j in wcrect.rdbox)
	{
		if(wcrect.rdbox[j].pushed == true)
		{
			var offset = spacing_d*(wcrect.rdbox[j].id+1)
			wcrect.li.Polygon(Img_DGreen, true, 13,(9+offset),  xlen-13,(9+offset),  xlen-13,(11+offset),  13,(11+offset));
		}
	}
	for( j in wcrect.rwbox)
	{
		if(wcrect.rwbox[j].pushed == true)
		{
			var offset = spacing_w*(wcrect.rwbox[j].id+1)
			wcrect.li.Polygon(Img_DGreen, true, (9+offset),13,  (11+offset),13,  (11+offset),ylen-13,  (9+offset),ylen-13);
		}  
	} 

	//Axis
	var midx = xlen/2;
	var midy = ylen/2;
	wcrect.li.Line(Img_Red, midx, midy , midx+4,midy);
	wcrect.li.Line(Img_Red, midx, midy , midx,midy-4);
	wcrect.li.Polygon(Img_Red, true, midx+6,midy, midx+4,midy+1, midx+4,midy-1 );
	wcrect.li.Polygon(Img_Red, true, midx,midy-6, midx+1,midy-4, midx-1,midy-4 );
	wcrect.li.Polygon(Img_Red, true, midx-1,midy-1, midx+1,midy-1, midx+1,midy+1, midx-1,midy+1 );

	wcrect.li.Line(Img_Red, midx+3,midy+5, midx+5,midy+2);
	wcrect.li.Line(Img_Red, midx+3,midy+2, midx+5,midy+5);

	wcrect.li.Line(Img_Red, midx-3,midy-5, midx-4,midy-3);
	wcrect.li.Line(Img_Red, midx-5,midy-5, midx-4,midy-3);
	wcrect.li.Line(Img_Red, midx-4,midy-3, midx-4,midy-1);

	wm.Redraw();
}

function do_rb_popup()
{
	wconcr.rb_button = this;
}
//////////////
function Rebar_popup(pw)
{
	// Rebar popup window
	pv=0;
	ph=0;
	var rb = new Widget(pw, Widget.LABEL,  0, 86, pv,pv+10, "Rebar Size");

	// US Sizes
	pv=11;
	ph=0;
	var ru1 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #2");
	ru1.dia = Math.round( 0.250 * 0.0254 * 10000 ) /10000;
	ru1.onClick = rebar_dia;
	pv=pv+10;
	var ru2 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #3");
	ru2.dia = Math.round( 0.375 * 0.0254 * 10000 ) /10000;
	ru2.onClick = rebar_dia;
	pv=pv+10;
	var ru3 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #4");
	ru3.dia = Math.round( 0.500 * 0.0254 * 10000 ) /10000;
	ru3.onClick = rebar_dia;
	pv=pv+10;
	var ru4 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #5");
	ru4.dia = Math.round( 0.625 * 0.0254 * 10000 ) /10000;
	ru4.onClick = rebar_dia;
	pv=pv+10;
	var ru5 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #6");
	ru5.dia = Math.round( 0.750 * 0.0254 * 10000 ) /10000;
	ru5.onClick = rebar_dia;
	pv=pv+10;
	var ru6 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #7");
	ru6.dia = Math.round( 0.875 * 0.0254 * 10000 ) /10000;
	ru6.onClick = rebar_dia;
	pv=pv+10;
	var ru7 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #8");
	ru7.dia = Math.round( 1.000 * 0.0254 * 10000 ) /10000;
	ru7.onClick = rebar_dia;
	pv=pv+10;
	var ru8 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #9");
	ru8.dia = Math.round( 1.128 * 0.0254 * 10000 ) /10000;
	ru8.onClick = rebar_dia;
	pv=pv+10;
	var ru9 = new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #10");
	ru9.dia = Math.round( 1.270 * 0.0254 * 10000 ) /10000;
	ru9.onClick = rebar_dia;
	pv=pv+10;
	var ru10= new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #11");
	ru10.dia = Math.round( 1.410 * 0.0254 * 10000 ) /10000;
	ru10.onClick = rebar_dia;
	pv=pv+10;
	var ru11= new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #14");
	ru11.dia = Math.round( 1.693 * 0.0254 * 10000 ) /10000;
	ru11.onClick = rebar_dia;
	pv=pv+10;
	var ru12= new Widget(pw, Widget.BUTTON,  ph+0, ph+20, pv,pv+10, "US #18");
	ru12.dia = Math.round( 2.257 * 0.0254 * 10000 ) /10000;
	ru12.onClick = rebar_dia;

	// Canadian Sizes
	pv=11;
	ph=22;
	var rc1 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 10M");
	rc1.dia = Math.round( 0.0113 * 10000 ) /10000;
	rc1.onClick = rebar_dia;
	pv=pv+10;
	var rc2 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 15M");
	rc2.dia = Math.round( 0.0160 * 10000 ) /10000;
	rc2.onClick = rebar_dia;
	pv=pv+10;
	var rc3 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 20M");
	rc3.dia = Math.round( 0.0195 * 10000 ) /10000;
	rc3.onClick = rebar_dia;
	pv=pv+10;
	var rc4 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 25M");
	rc4.dia = Math.round( 0.0252 * 10000 ) /10000;
	rc4.onClick = rebar_dia;
	pv=pv+10;
	var rc5 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 30M");
	rc5.dia = Math.round( 0.0299 * 10000 ) /10000;
	rc5.onClick = rebar_dia;
	pv=pv+10;
	var rc6 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 35M");
	rc6.dia = Math.round( 0.0357 * 10000 ) /10000;
	rc6.onClick = rebar_dia;
	pv=pv+10;
	var rc7 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 45M");
	rc7.dia = Math.round( 0.0437 * 10000 ) /10000;
	rc7.onClick = rebar_dia;
	pv=pv+10;
	var rc8 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "CA 55M");
	rc8.dia = Math.round( 0.0564 * 10000 ) /10000;
	rc8.onClick = rebar_dia;
	pv=pv+10;


	// UK / EU Sizes
	pv=11;
	ph=44;
	var ru1 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 6");
	ru1.dia = 0.006;
	ru1.onClick = rebar_dia;
	pv=pv+10;
	var ru2 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 8");
	ru2.dia = 0.008;
	ru2.onClick = rebar_dia;
	pv=pv+10;
	var ru3 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 10");
	ru3.dia = 0.010;
	ru3.onClick = rebar_dia;
	pv=pv+10;
	var ru4 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 12");
	ru4.dia = 0.012;
	ru4.onClick = rebar_dia;
	pv=pv+10;
	var ru5 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 14");
	ru5.dia = 0.014;
	ru5.onClick = rebar_dia;
	pv=pv+10;
	var ru6 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 16");
	ru6.dia = 0.016;
	ru6.onClick = rebar_dia;
	pv=pv+10;
	var ru7 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 20");
	ru7.dia = 0.020;
	ru7.onClick = rebar_dia;
	pv=pv+10;
	var ru8 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 25");
	ru8.dia = 0.025;
	ru8.onClick = rebar_dia;
	pv=pv+10;
	var ru9 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 28");
	ru9.dia = 0.028;
	ru9.onClick = rebar_dia;
	pv=pv+10;
	var ru10 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 32");
	ru10.dia = 0.032;
	ru10.onClick = rebar_dia;
	pv=pv+10;
	var ru11 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 40");
	ru11.dia = 0.040;
	ru11.onClick = rebar_dia;
	pv=pv+10;
	var ru12 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "UK/EU 50");
	ru12.dia = 0.050;
	ru12.onClick = rebar_dia;
	pv=pv+10;

	// AUS Sizes
	pv=11;
	ph=66;
	var ru1 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N10");
	ru1.dia = 0.010;
	ru1.onClick = rebar_dia;
	pv=pv+10;
	var ru2 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N12");
	ru2.dia = 0.012;
	ru2.onClick = rebar_dia;
	pv=pv+10;
	var ru3 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N16");
	ru3.dia = 0.016;
	ru3.onClick = rebar_dia;
	pv=pv+10;
	var ru4 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N20");
	ru4.dia = 0.020;
	ru4.onClick = rebar_dia;
	pv=pv+10;
	var ru5 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N24");
	ru5.dia = 0.024;
	ru5.onClick = rebar_dia;
	pv=pv+10;
	var ru6 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N28");
	ru6.dia = 0.028;
	ru6.onClick = rebar_dia;
	pv=pv+10;
	var ru7 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N32");
	ru7.dia = 0.032;
	ru7.onClick = rebar_dia;
	pv=pv+10;
	var ru8 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N36");
	ru8.dia = 0.036;
	ru8.onClick = rebar_dia;
	pv=pv+10;
	var ru9 = new Widget(pw, Widget.BUTTON, ph+0, ph+20, pv,pv+10, "AUS N40");
	ru9.dia = 0.040;
	ru9.onClick = rebar_dia;
	pv=pv+10;
}
///
function rebar_dia() 
{
    Message("Rebar Dia: "+this.dia);
    wconcr.rb_button.text = this.dia;
}
////////////////////////////////////////////////////////////

