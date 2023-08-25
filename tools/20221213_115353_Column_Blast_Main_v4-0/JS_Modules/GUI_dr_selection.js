////////////
function dr_clicked()
{
	wdr = new Window("Set DR Properties", 0.8, 0.9, 0.8, 0.95);

	var dr = new Object;

	var h=0;
	var v=0;

	dr.l1 = new Widget(wdr, Widget.LABEL, h+0, h+60, v, v+8, "Dynamic Relaxation Properties");

	v=v+12;
	dr.nrcyck_l = new Widget(wdr, Widget.LABEL, h+2, h+20, v, v+8, "NRCYCK");
	dr.nrcyck_l.justify = Widget.LEFT;
	dr.nrcyck = new Widget(wdr, Widget.TEXTBOX, h+25, h+55, v, v+8, ""+this.prop.nrcyck);
	dr.nrcyck.onChange = integer_check;

	v=v+10;
	dr.drtol_l = new Widget(wdr, Widget.LABEL, h+2, h+20, v, v+8, "DRTOL");
	dr.drtol_l.justify = Widget.LEFT;
	dr.drtol = new Widget(wdr, Widget.TEXTBOX, h+25, h+55, v, v+8, ""+this.prop.drtol);
	dr.drtol.onChange = number_check1;

	v=v+10;
	dr.drfctr_l = new Widget(wdr, Widget.LABEL, h+2, h+20, v, v+8, "DRFCTR");
	dr.drfctr_l.justify = Widget.LEFT;
	dr.drfctr = new Widget(wdr, Widget.TEXTBOX, h+25, h+55, v, v+8, ""+this.prop.drfctr);
	dr.drfctr.onChange = number_check1;

	v=v+10;
	dr.drterm_l = new Widget(wdr, Widget.LABEL, h+2, h+20, v, v+8, "DRTERM");
	dr.drterm_l.justify = Widget.LEFT;
	dr.drterm = new Widget(wdr, Widget.TEXTBOX, h+25, h+55, v, v+8, ""+this.prop.drterm);
	dr.drterm.onChange = number_check1;

	v=v+15;
	dr.set = new Widget(wdr, Widget.BUTTON, h+2, h+28, v, v+12, "Set");
	dr.set.category = Widget.CATEGORY_APPLY;
	dr.set.obj1 = this;
	dr.set.obj2 = dr;
	dr.set.onClick = dr_set_clicked;

	dr.close = new Widget(wdr, Widget.BUTTON, h+32, h+58, v, v+12, "Close");
	dr.close.category = Widget.CATEGORY_CANCEL;
	dr.close.onClick = ( function close(){ wdr.Hide(); } ); 

	wdr.Show();
}
/////////////////////////////////
function dr_set_clicked()
{
	var obj1 = this.obj1;
	var obj2 = this.obj2;

	obj1.prop.idrflg = 1;
	obj1.prop.nrcyck = Number(obj2.nrcyck.text);
	obj1.prop.drtol = Number(obj2.drtol.text);
	obj1.prop.drfctr = Number(obj2.drfctr.text);
	obj1.prop.drterm = Number(obj2.drterm.text);

	obj1.category = Widget.CATEGORY_ENTITY;
	obj1.status = 1;
	
	wdr.Hide();
}