//////////////////////////GEOM FUNCTIONS//////////////////////////////////////////////////////////////////
function line_intersect(line1, line2)
{
	//Line 1 properties
	var b1x1 = line1.ax;
	var b1x2 = line1.bx;
	var b1y1 = line1.ay;
	var b1y2 = line1.by;

	if(b1x1==b1x2) var b1_grad = 1e100; // line if vertical
	else 	       var b1_grad =  (b1y2-b1y1)/(b1x2-b1x1);
	var b1_cons =  b1y1 - (b1x1*b1_grad);
	//Message("B1 Grad: "+b1_grad);
	//Message("B1 Cons: "+b1_cons);

	//Line 2 properties
	var b2x1 = line2.ax;
	var b2x2 = line2.bx;
	var b2y1 = line2.ay;
	var b2y2 = line2.by;

	if(b2x1==b2x2) var b2_grad = 1e100; // line is vertical
	else           var b2_grad =  (b2y2-b2y1)/(b2x2-b2x1);
	var b2_cons =  b2y1 - (b2x1*b2_grad);
	//Message("B2 Grad: "+b2_grad);
	//Message("B2 Cons: "+b2_cons);

	// Check if lines are parallel
	var parallel = 0;
	if(b1_grad == b2_grad) // parallel - can't intersect
	{
		parallel = 1;
		//Message("Lines are Parallel")
		return 0;
	}
	else // not parallel -  will intersect
	{
		int_x = (b2_cons - b1_cons)/(b1_grad - b2_grad);
		if(b1x1==b1x2)      int_y = (b2_grad * int_x) + b2_cons; 
		else if(b2x1==b2x2) int_y = (b1_grad * int_x) + b1_cons;
		else                int_y = (b1_grad * int_x) + b1_cons;
		//Message("Intersect X="+int_x+"  Y="+int_y);

		// check if the intersection is on these line segments
		var seg_check = 0;
		var tol = 1e-6;
		// Line 1
		if(int_x>b1x1+tol && int_x>b1x2+tol) seg_check = 1;
		if(int_x<b1x1-tol && int_x<b1x2-tol) seg_check = 1;
		if(int_y>b1y1+tol && int_y>b1y2+tol) seg_check = 1;
		if(int_y<b1y1-tol && int_y<b1y2-tol) seg_check = 1;

		// Line 2
		if(int_x>b2x1+tol && int_x>b2x2+tol) seg_check = 1;
		if(int_x<b2x1-tol && int_x<b2x2-tol) seg_check = 1;
		if(int_y>b2y1+tol && int_y>b2y2+tol) seg_check = 1;
		if(int_y<b2y1-tol && int_y<b2y2-tol) seg_check = 1;

		if(seg_check==1)
		{
			//Message("Intersection is outside of line segment");
			return 0;
		}
		else        
		{
			//Message("Intersection is on the line segment");
			return 1;
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
