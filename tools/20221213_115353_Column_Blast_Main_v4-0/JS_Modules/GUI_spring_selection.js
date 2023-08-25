////////////
function spring_clicked()
{
	wspring = new Window("Set Spring Properties", 0.1, 0.2, 0.5, 0.6);

	var spring = new Object;

	var h=0;
	var v=0;

	spring.l1 = new Widget(wspring, Widget.LABEL, h+0, h+50, v, v+8, "End Fixing Springs");

	v=v+12;
	spring.tx_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "TX");
	spring.tx_l.justify = Widget.LEFT;
	spring.tx = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.tx);
	spring.tx.onChange = number_check1;

	v=v+12;
	spring.ty_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "TY");
	spring.ty_l.justify = Widget.LEFT;
	spring.ty = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.ty);
	spring.ty.onChange = number_check1;

	v=v+12;
	spring.tz_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "TZ");
	spring.tz_l.justify = Widget.LEFT;
	spring.tz = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.tz);
	spring.tz.onChange = number_check1;

	v=v+12;
	spring.rx_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "RX");
	spring.rx_l.justify = Widget.LEFT;
	spring.rx = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.rx);
	spring.rx.onChange = number_check1;

	v=v+12;
	spring.ry_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "RY");
	spring.ry_l.justify = Widget.LEFT;
	spring.ry = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.ry);
	spring.ry.onChange = number_check1;

	v=v+12;
	spring.rz_l = new Widget(wspring, Widget.LABEL, h+2, h+15, v, v+8, "RZ");
	spring.rz_l.justify = Widget.LEFT;
	spring.rz = new Widget(wspring, Widget.TEXTBOX, h+20, h+45, v, v+8, ""+this.prop.rz);
	spring.rz.onChange = number_check1;

	v=v+15;
	spring.set = new Widget(wspring, Widget.BUTTON, h+2, h+23, v, v+12, "Set");
	spring.set.category = Widget.CATEGORY_APPLY;
	spring.set.obj1 = this;
	spring.set.obj2 = spring;
	spring.set.onClick = spring_set_clicked;

	spring.close = new Widget(wspring, Widget.BUTTON, h+27, h+48, v, v+12, "Close");
	spring.close.category = Widget.CATEGORY_CANCEL;
	spring.close.onClick = ( function close(){ wspring.Hide(); } ); 

	wspring.Show();
}
/////////////////////////////////
function spring_set_clicked()
{
	var obj1 = this.obj1;
	var obj2 = this.obj2;

	obj1.prop.tx = Number(obj2.tx.text);
	obj1.prop.ty = Number(obj2.ty.text);
	obj1.prop.tz = Number(obj2.tz.text);
	obj1.prop.rx = Number(obj2.rx.text);
	obj1.prop.ry = Number(obj2.ry.text);
	obj1.prop.rz = Number(obj2.rz.text);

	obj1.category = Widget.CATEGORY_ENTITY;
	obj1.status = 1;
	
	wspring.Hide();
}