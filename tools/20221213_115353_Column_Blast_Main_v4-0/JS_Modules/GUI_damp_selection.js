////////////
function damp_clicked()
{
	wdamp = new Window("Set Damp Properties", 0.8, 0.9, 0.8, 0.95);

	var damp = new Object;

	var h=0;
	var v=0;

	damp.l1 = new Widget(wdamp, Widget.LABEL, h+0, h+70, v, v+8, "Post Blast *Damping_Global");

	v=v+12;
	damp.start_l = new Widget(wdamp, Widget.LABEL, h+2, h+45, v, v+8, "Damping Start Time");
	damp.start_l.justify = Widget.LEFT;
	damp.start = new Widget(wdamp, Widget.TEXTBOX, h+50, h+65, v, v+8, ""+this.prop.start);
	damp.start.onChange = number_check1;

	v=v+12;
	damp.finish_l = new Widget(wdamp, Widget.LABEL, h+2, h+45, v, v+8, "Damping Finish Time");
	damp.finish_l.justify = Widget.LEFT;
	damp.finish = new Widget(wdamp, Widget.TEXTBOX, h+50, h+65, v, v+8, ""+this.prop.finish);
	damp.finish.onChange = number_check1;

	v=v+12;
	damp.value1_l = new Widget(wdamp, Widget.LABEL, h+2, h+45, v, v+8, "Main Damping Value");
	damp.value1_l.justify = Widget.LEFT;
	damp.value1 = new Widget(wdamp, Widget.TEXTBOX, h+50, h+65, v, v+8, ""+this.prop.value1);
	damp.value1.onChange = number_check1;

	v=v+12;
	damp.value2_l = new Widget(wdamp, Widget.LABEL, h+2, h+45, v, v+8, "Residual Damping Value");
	damp.value2_l.justify = Widget.LEFT;
	damp.value2 = new Widget(wdamp, Widget.TEXTBOX, h+50, h+65, v, v+8, ""+this.prop.value2);
	damp.value2.onChange = number_check1;

	v=v+15;
	damp.set = new Widget(wdamp, Widget.BUTTON, h+2, h+33, v, v+12, "Set");
	damp.set.category = Widget.CATEGORY_APPLY;
	damp.set.obj1 = this;
	damp.set.obj2 = damp;
	damp.set.onClick = damp_set_clicked;

	damp.close = new Widget(wdamp, Widget.BUTTON, h+37, h+68, v, v+12, "Close");
	damp.close.category = Widget.CATEGORY_CANCEL;
	damp.close.onClick = ( function close(){ wdamp.Hide(); } ); 

	wdamp.Show();
}
/////////////////////////////////
function damp_set_clicked()
{
	var obj1 = this.obj1;
	var obj2 = this.obj2;

	obj1.prop.start = Number(obj2.start.text);
	obj1.prop.finish = Number(obj2.finish.text);
	obj1.prop.value1 = Number(obj2.value1.text);
	obj1.prop.value2 = Number(obj2.value2.text);

	obj1.category = Widget.CATEGORY_ENTITY;
	obj1.status = 1;
	
	wdamp.Hide();
}