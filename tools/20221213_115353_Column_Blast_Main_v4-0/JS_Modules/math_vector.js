/////////////////// vector normailize (3 axis) 
function vec_norm(v)
{
	var mag = Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2) + Math.pow(v[2],2));
	var vnorm = new Array ;
	vnorm[0] = v[0]/mag;
	vnorm[1] = v[1]/mag;
	vnorm[2] = v[2]/mag;
	return vnorm;
}
///////////////////// cross product 3 axis
function x_product(vcross1, vcross2)
{
	var vc = new Array;
	vc[0] = vcross1[1]*vcross2[2] - vcross1[2]*vcross2[1];
	vc[1] = vcross1[2]*vcross2[0] - vcross1[0]*vcross2[2];
	vc[2] = vcross1[0]*vcross2[1] - vcross1[1]*vcross2[0];
	vc.mag = Math.sqrt(Math.pow(vc[0],2) + Math.pow(vc[1],2) + Math.pow(vc[2],2));
	return vc;
}
/////////////////// dot product angle 3 axis 
function dot_product_angle(vdot1, vdot2)
{
	var mag1 = Math.sqrt(Math.pow(vdot1[0],2) + Math.pow(vdot1[1],2) + Math.pow(vdot1[2],2));
	var mag2 = Math.sqrt(Math.pow(vdot2[0],2) + Math.pow(vdot2[1],2) + Math.pow(vdot2[2],2));
	var vector_dot = vdot1[0]*vdot2[0] + vdot1[1]*vdot2[1] + vdot1[2]*vdot2[2]; // dot product
	var angle = new Object;

	//Message("Mag1: "+mag1);
	//Message("Mag2: "+mag2);
	//Message("Vdot: "+vector_dot)

	var tmp = vector_dot / (mag1 * mag2);
	if(tmp > 1) tmp = 1;
	else if(tmp < -1) tmp = -1;

	angle.rad = Math.acos( tmp );
	angle.deg = angle.rad / Math.PI*180;
	return angle;
}
