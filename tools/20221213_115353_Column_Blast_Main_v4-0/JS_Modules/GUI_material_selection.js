////////////
function mat_clicked()
{
	wsm = new Window("Set Material", 0.4, 0.5, 0.8, 0.95);
	
	var mat = new Object;
	mat.button = new Object;


	if(this.mtype == "Steel") mat.opt = steel_mat_opt;
	if(this.mtype == "Rebar") mat.opt = rebar_mat_opt;
	if(this.mtype == "Concrete") mat.opt = concrete_mat_opt;


	if(this.status == 0) // set to inital values - preset 1
	{
		this.mat = new Object;
		for(i in mat.opt[1]) 
		{
			this.mat[i] = mat.opt[1][i];
		}
	}
	var h=0;
	var v=0;

	mat.lmt1 = new Widget(wsm, Widget.LABEL, h+0, h+80, v, v+8, this.mtype+" Material Properties");

	v=v+10;
	mat.ty1 = new Widget(wsm, Widget.BUTTON, h+5, h+27, v, v+8, "Preset 1");
	mat.ty1.category = Widget.CATEGORY_ENTITY;
	mat.ty1.stype = 1;
	mat.ty1.obj = mat;
	mat.ty1.onClick = stype_clicked;

	mat.ty2 = new Widget(wsm, Widget.BUTTON, h+29, h+51, v, v+8, "Preset 2");
	mat.ty2.category = Widget.CATEGORY_ENTITY;
	mat.ty2.stype = 2;
	mat.ty2.obj = mat;
	mat.ty2.onClick = stype_clicked;

	mat.ty3 = new Widget(wsm, Widget.BUTTON, h+53, h+75, v, v+8, "Preset 3");
	mat.ty3.category = Widget.CATEGORY_ENTITY;
	mat.ty3.stype = 3;
	mat.ty3.obj = mat;
	mat.ty3.onClick = stype_clicked;

	v = v+5;
	for(i in this.mat)
	{
		v=v+10;
		if(i == "name") // text - no number check
		{
			mat.button[i] = new Widget(wsm, Widget.LABEL, h+2, h+20, v, v+8, button_name[i]);
			mat.button[i].justify = Widget.LEFT;
			mat.button[i] = new Widget(wsm, Widget.TEXTBOX, h+25, h+75, v, v+8, ""+(this.mat[i]) );
		}
		else if(i == "e") // Youngs Modulus - display as GPa
		{
			mat.button[i] = new Widget(wsm, Widget.LABEL, h+2, h+55, v, v+8, button_name[i]);
			mat.button[i].justify = Widget.LEFT;
			mat.button[i] = new Widget(wsm, Widget.TEXTBOX, h+58, h+75, v, v+8, ""+(this.mat[i])/1e9 );
			mat.button[i].onChange = number_check1;
		}
		else if(i == "sigy" || i == "etan") // SIGY /ETAN - display as MPa
		{
			mat.button[i] = new Widget(wsm, Widget.LABEL, h+2, h+55, v, v+8, button_name[i]);
			mat.button[i].justify = Widget.LEFT;
			mat.button[i] = new Widget(wsm, Widget.TEXTBOX, h+58, h+75, v, v+8, ""+(this.mat[i])/1e6 );
			mat.button[i].onChange = number_check1;
		}
		else if(i == "ft" || i == "a0") // FT /A0 - display as MPa
		{
			mat.button[i] = new Widget(wsm, Widget.LABEL, h+2, h+55, v, v+8, button_name[i]);
			mat.button[i].justify = Widget.LEFT;
			mat.button[i] = new Widget(wsm, Widget.TEXTBOX, h+58, h+75, v, v+8, ""+(this.mat[i])/1e6 );
			mat.button[i].onChange = number_check1;
		}
		else
		{
			mat.button[i] = new Widget(wsm, Widget.LABEL, h+2, h+55, v, v+8, button_name[i]);
			mat.button[i].justify = Widget.LEFT;
			mat.button[i] = new Widget(wsm, Widget.TEXTBOX, h+58, h+75, v, v+8, ""+(this.mat[i]) );
			mat.button[i].onChange = number_check1;
		}
	}

	v=v+15;
	mat.set = new Widget(wsm, Widget.BUTTON, h+2, h+38, v, v+12, "Set");
	mat.set.category = Widget.CATEGORY_APPLY;
	mat.set.obj1 = this;
	mat.set.obj2 = mat;
	mat.set.onClick = mat_set_clicked;

	mat.close = new Widget(wsm, Widget.BUTTON, h+42, h+75, v, v+12, "Close");
	mat.close.category = Widget.CATEGORY_CANCEL;
	mat.close.onClick = ( function close(){ wsm.Hide(); } ); 

	wsm.Show();
}
///////////////////
function stype_clicked()
{
	var obj = this.obj;

	for(i in obj.button)
	{
		if(i == "e") obj.button[i].text = ""+(obj.opt[this.stype][i])/1e9; // Display in GPA
		else if (i == "sigy" || i == "etan") obj.button[i].text = ""+(obj.opt[this.stype][i])/1e6; // Display in MPA
		else if (i == "ft" || i == "a0") obj.button[i].text = ""+(obj.opt[this.stype][i])/1e6; // Display in MPA
		else obj.button[i].text = ""+(obj.opt[this.stype][i]);
	}
}
////////////
function mat_set_clicked()
{
	var obj1 = this.obj1;
	var obj2 = this.obj2.button;

	for(i in obj2)
	{
		if (i == "lcss") // curve reference 
		{
			if (Number(obj2[i].text) > 0)
			{
				var answer = Window.Message("Curve File", "Select Curve Keyword File \nNote: Define_Curve/Table id in the file must match LCSS entry");
				var file = Window.GetFile(".key");
				if(file == null) return;
				
				obj1.mat[i] = new Object;;
				obj1.mat[i].id = Number(obj2[i].text);
				obj1.mat[i].file = file;
			}
			else
			{
				obj1.mat[i] = new Object;;
				obj1.mat[i].id = Number(obj2[i].text);
				obj1.mat[i].file = "N/A";
			}
		}
		else if(i == "name") obj1.mat[i] = obj2[i].text;  // text
		else if (i == "e") obj1.mat[i] = Number(obj2[i].text)*1e9; // Convert from GPa to Pa
		else if (i == "sigy" || i == "etan") obj1.mat[i] = Number(obj2[i].text)*1e6; // Convert from MPa to Pa
		else if (i == "ft" || i == "a0") obj1.mat[i] = Number(obj2[i].text)*1e6; // Convert from MPa to Pa
		else obj1.mat[i] = Number(obj2[i].text); // number
	}
	
	obj1.category = Widget.CATEGORY_ENTITY;
	obj1.lb1.category = Widget.CATEGORY_LABEL_BOX;
	obj1.lb1.text = obj1.mat.name;
	obj1.status = 1;

	wsm.Hide();
}