// Material models 

/**
 * Elastic concrete material model
 * @param {Model} m 
 * @param {Number} mid 
 * @param {String} title 
 */
function MAT_001_ELASTIC_CONCRETE(m, mid, title){

	var material = new Material(m, mid, "*MAT_001");
	
	material.title = title
	material.SetPropertyByName("RO", 2549.0); 	// density (kg/m3)
	material.SetPropertyByName("E", 33.5e9); 	// elastic modulus (Pa)
	material.SetPropertyByName("PR", 0.17); 	// Poisson's ratio

	return material
}

/**
 * Elastic steel material model
 * @param {Model} m 
 * @param {Number} mid 
 * @param {String} title 
 */
function MAT_001_ELASTIC_STEEL(m, mid, title){

	var material = new Material(m, mid, "*MAT_001");

	material.title = title
	material.SetPropertyByName("RO", 7850.0); 	// density (kg/m3)
	material.SetPropertyByName("E", 200e9); 	// elastic modulus (Pa)
	material.SetPropertyByName("PR", 0.3); 		// Poisson's ratio

	return material
}


/**
 * Piecewise linear plasticity model for steel, EFFEPS = 0.15 as default
 * @param {Model} m 
 * @param {Number} mid 
 * @param {Number} SIGY	Yield stress
 * @param {String} title 
 */
function MAT_024_STEEL(m, mid, SIGY, title){

	var material = new Material(m, mid, "*MAT_024"); // *PIECEWISE_LINEAR_PLASTICITY

	material.title = title;
	material.SetPropertyByName("RO", 7850.0); 		// density (kg/m3)
	material.SetPropertyByName("E", 210e9); 		// elastic modulus (Pa)
	material.SetPropertyByName("PR", 0.3); 			// Poisson's ratio
	material.SetPropertyByName("SIGY", SIGY); 		// yield strength (Pa)
	material.SetPropertyByName("ETAN", 1.0e9); 		// tangent modulus (Pa)
	material.SetPropertyByName("C", 1300.0); 		// Cowper-Symonds parameter
	material.SetPropertyByName("P", 5.0); 			// Cowper-Symonds parameter
	material.SetPropertyByName("FAIL", 0.1); 

	material.SetMaterialErosion();
	material.SetErosionPropertyByName("EXCL", 99);
	material.SetErosionPropertyByName("MXPRES", 99);
	material.SetErosionPropertyByName("MNEPS", 99);
	material.SetErosionPropertyByName("EFFEPS", 0.15);
	material.SetErosionPropertyByName("VOLEPS", 99);
	material.SetErosionPropertyByName("MNPRES", 99);
	material.SetErosionPropertyByName("SIGP1", 99);
	material.SetErosionPropertyByName("SIGVM", 99);
	material.SetErosionPropertyByName("MXEPS", 99);
	material.SetErosionPropertyByName("EPSSH", 99);
	material.SetErosionPropertyByName("SIGTH", 99);
	material.SetErosionPropertyByName("IMPULSE", 99);
	material.SetErosionPropertyByName("FAILTM", 99);

	return material
}

/**
 * Null material model, density = 1kg/m3
 * @param {Model} m 
 * @param {Number} mid 
 * @param {String} title 
 */
function MAT_009_NULL(m, mid, title){

	var material = new Material(m, mid, 'NULL')

	material.SetPropertyByName("RO", 1);
	material.title = 'Null_material';

	return material

}

/**
 * Rigid material model
 * @param {Model} m 
 * @param {Number} mid 
 * @param {Number} R0 Density 
 * @param {Number} E  Elastic modulus
 * @param {Number} PR Poisson's ratio
 * @param {String} title 
 */
function MAT_020_RIGID(m, mid, R0, E, PR, title){

	var material = new Material(m, mid, 'RIGID');

	material.SetPropertyByName("RO", R0); 	// density (kg/m3)
	material.SetPropertyByName("E", E); 	// elastic modulus (Pa)
	material.SetPropertyByName("PR", PR); 	// Poisson's ratio
	// material.SetPropertyByName("CMO", 1); 
	// material.SetPropertyByName("CON1", 7); 
	// material.SetPropertyByName("CON2", 7); 
	material.title = title;

	return material

}

function MAT_072R3_CONCRETE(m, mid, FT, A0, title){
	var material = new Material(m, mid, "*MAT_072R3"); // *MAT_CONCRETE_DAMAGE_REL3
	material.title = title;
	material.SetPropertyByName("RO", 2400);
	material.SetPropertyByName("PR", 0.15);
	
	var f_ctm = 0.0
	if (FT == 0.0) {
 
		let fck = Math.abs(A0)/1E6; // MPa for calculation

		if (fck <= 50) {
			
			f_ctm =  0.3*Math.pow(fck, (2.0/3.0))

		} else {
			
			 f_ctm = 2.12*Math.log(1+(fck+8)/10)
		
		}

		// Message(["f_ctm = ", f_ctm]);

		material.SetPropertyByName("FT", f_ctm*1E6)} // Calculate FT as per EN1993-1-1
	
	else material.SetPropertyByName("FT", FT)
	
	if (A0 < 0) material.SetPropertyByName("A0", A0) 
	else material.SetPropertyByName("A0", -1*A0) 	// Compressive strength is always negative
	
	material.SetPropertyByName("RSIZE", 39.37);  	// inch / meter conversion
	material.SetPropertyByName("UCF", 1.45e-4); 	// psi / pa conversion
	material.SetPropertyByName("LCRATE", -1); 		// Use detail strain rate curve
	material.SetPropertyByName("NOUT", 2.0); 		// Plastic strain = scaled damage

	material.SetMaterialErosion();

	// material.SetErosionPropertyByName("EXCL",   99);
	// material.SetErosionPropertyByName("MXPRES", 99);
	// material.SetErosionPropertyByName("MNEPS",  99);
	// material.SetErosionPropertyByName("EFFEPS", 99);
	material.SetErosionPropertyByName("VOLEPS", 0.05); // 5% volumetric strain for element deletion
	// material.SetErosionPropertyByName("MNPRES", 99);
	// material.SetErosionPropertyByName("SIGP1",  99);
	// material.SetErosionPropertyByName("SIGVM",  99);
	// material.SetErosionPropertyByName("MXEPS",  0.01);	// max principal strain
	// material.SetErosionPropertyByName("EPSSH",  1.0); // 100% shear strain failure 
	// material.SetErosionPropertyByName("SIGTH",  99);
	// material.SetErosionPropertyByName("IMPULSE",99);
	// material.SetErosionPropertyByName("FAILTM", 99);

	return material
}

function MAT_072R3_LCRATE(m, lcid){

	let data = [
					// [-30000, 8.803382184],
					[-301, 8.803382184],
					[-300, 8.803382184],
					[-100, 7.526785892],
					[-30, 5.038678484],
					[-10, 3.493624535],
					[-3, 1],
					[-1, 1],
					[-0.1, 1],
					[-0.01, 1],
					[-0.001, 1],
					[-1E-04, 1],
					[-1E-05, 1],
					[0, 1],
					[3E-05, 1],
					[1E-04, 1],
					[0.001, 1],
					[0.01, 1],
					[0.1, 1],
					[1, 1],
					[3, 1],
					[10, 1.4364345],
					[30, 1.482087155],
					[100, 1.533786054],
					[300, 1.582532729],
					[301, 1.582532729],
					// [30000, 1.582532729]
	];

	// let newData = insertPoints(data, 10);
	let newData = data;

	let curve = new Curve(Curve.CURVE, m, lcid);
	for (var arr of newData) curve.AddPoint(arr[0], arr[1]);
	curve.heading = "MODIFIED_MAT72R3_LCRATE_CURVE";
	
	curve.lcint = 2000;

	// curve.Edit();

	function insertPoints(data, N) {
		const newData = [data[0]];
		
		for (let i = 1; i < data.length; i++) {
			const [xPrev, yPrev] = data[i - 1];
			const [x, y] = data[i];
			const xStep = (x - xPrev) / (N + 1);
			const yStep = (y - yPrev) / (N + 1);
			
			for (let j = 1; j <= N; j++) {
				newData.push([xPrev + j * xStep, yPrev + j * yStep]);
			}
			
			newData.push([x, y]);
		}
		
		return newData;
	}


	return curve

}


function MAT_004_STEEL_THERMAL(m, mid, T1, T2, T3, E, PR, ALPHA, SIGY, ETAN, title){

	var material = new Material(m, mid, "*MAT_004"); // *MAT_ELASTIC_PLASTIC_THERMAL
	material.title = title;
	material.SetPropertyByName("RO", 7850);

	material.SetPropertyByName("T1", T1);
	material.SetPropertyByName("T2", T2);
	material.SetPropertyByName("T3", T3);

	material.SetPropertyByName("E1", E);
	material.SetPropertyByName("E2", E);
	material.SetPropertyByName("E3", E);
	
	material.SetPropertyByName("PR1", PR);
	material.SetPropertyByName("PR2", PR);
	material.SetPropertyByName("PR3", PR);

	material.SetPropertyByName("ALPHA1", ALPHA);
	material.SetPropertyByName("ALPHA2", ALPHA);
	material.SetPropertyByName("ALPHA3", ALPHA);

	material.SetPropertyByName("SIGY1", SIGY);
	material.SetPropertyByName("SIGY2", SIGY);
	material.SetPropertyByName("SIGY3", SIGY);

	material.SetPropertyByName("ETAN1", ETAN);
	material.SetPropertyByName("ETAN2", ETAN);
	material.SetPropertyByName("ETAN3", ETAN);
}

/**
 * 
 * @param {Model} m Model id
 * @param {Part} p_Shell Shell part object
 * @param {Object} mids Object {concrete: 1, X_reinf: 2, Y_reinf: 3}
 * @param {Number} thk Shell thickness
 * @param {Number} spc Reinforcement spacing
 * @param {Number} Ds  Reinforcement diameter
 * @param {Number} cover Concrete cover
 */
function MAT_172_CONCRETE_EC2_SHELL(m, p_Shell, mids, thk, spc, Ds, cover){


    /*
    Use MAT172 MAT_CONCRETE_EC2 for SHELL elements only, i.e. to model RC slabs and walls

    - [1] Create Material model using MAT172, i.e. concrete, x_reinf and y_reinf
    - [2] Create composite section by modifying the PART card
    - [3] Cocnrete and steel rebars are defined in 13 layers

    Input:
        m:      model m (object)
        pshell: shell part of RC wall or slab (object)
        mids:   material ids for RC slab part, 
                concrete, xreinf and yreinf, (object)
                must be defined as {concrete:1, X_reinf:2, Y_reinf:3};
        thk:    slab thickness
        spc:    rebar spacing, identical in x and y direction
        Ds:     rebar diametre, identical in x and y direction
        cover:  concrete cover, identical for compression and tension face
        
    Return:
        none
    */

    //      [1] Material model

    //      rebar steel strain hardening curve
    var load_curve = new Curve(Curve.CURVE, m, Curve.NextFreeLabel(m));
    load_curve.heading = "STEEL REBAR STRAIN HARDENING CURVE"
    load_curve.AddPoint(0.0, 1.0);
    load_curve.AddPoint(0.0475, 1.08);
    load_curve.AddPoint(0.1, 1.08);

    //		concrete
    var mat_concrete = new Material(m, mids.concrete, "*MAT_172"); // *MAT_CONCRETE_EC2
    mat_concrete.title = "C25/30_concrete (composite shell)";
    mat_concrete.SetPropertyByName("RO", 2400);
    mat_concrete.SetPropertyByName("FC", 38.5e6);
    mat_concrete.SetPropertyByName("FT", 3.51e6);
    mat_concrete.SetPropertyByName("TYPEC", 9);
    mat_concrete.SetPropertyByName("UNITC", 1e-6);
    mat_concrete.SetPropertyByName("ECUTEN", 0.001);
    mat_concrete.SetPropertyByName("FCC", 38.5e6);
    mat_concrete.SetPropertyByName("LCHAR", 0.2);
    mat_concrete.SetPropertyByName("AGGSZ", 0.01);
    mat_concrete.SetPropertyByName("UNITL", 1000.0);
    mat_concrete.SetPropertyByName("YMREINF", 2.0e11);
    mat_concrete.SetPropertyByName("PRREINF", 0.3);
    mat_concrete.SetPropertyByName("SUREINF", 5e8);
    mat_concrete.SetPropertyByName("TYPER", 5.0);
    mat_concrete.SetPropertyByName("FRACRX", 0.0);
    mat_concrete.SetPropertyByName("FRACRY", 0.0);
    mat_concrete.SetPropertyByName("LCRSU", load_curve.lcid);
    mat_concrete.SetPropertyByName("DEGRAD", 1.0);
    mat_concrete.SetPropertyByName("ISHCHK", 1);
    mat_concrete.SetPropertyByName("TYPESEC", 1.0);
    mat_concrete.SetPropertyByName("P_OR_F", 1.8);
    mat_concrete.SetPropertyByName("EFFD", thk);
    mat_concrete.SetPropertyByName("GAMSC", 1.20);

    //		x_reinf
    var mat_x_reinf = new Material(m, mids.X_reinf, "*MAT_172"); // *MAT_CONCRETE_EC2
    mat_x_reinf.title = "X_reinf";
    mat_x_reinf.SetPropertyByName("RO", 2400);
    mat_x_reinf.SetPropertyByName("FC", 38.5e6);
    mat_x_reinf.SetPropertyByName("FT", 3.51e6);
    mat_x_reinf.SetPropertyByName("TYPEC", 9);
    mat_x_reinf.SetPropertyByName("UNITC", 1e-6);
    mat_x_reinf.SetPropertyByName("ECUTEN", 0.001);
    mat_x_reinf.SetPropertyByName("FCC", 38.5e6);
    mat_x_reinf.SetPropertyByName("LCHAR", 0.2);
    mat_x_reinf.SetPropertyByName("AGGSZ", 0.01);
    mat_x_reinf.SetPropertyByName("UNITL", 1000.0);
    mat_x_reinf.SetPropertyByName("YMREINF", 2.0e11);
    mat_x_reinf.SetPropertyByName("PRREINF", 0.3);
    mat_x_reinf.SetPropertyByName("SUREINF", 5e8);
    mat_x_reinf.SetPropertyByName("TYPER", 5.0);
    mat_x_reinf.SetPropertyByName("FRACRX", 1.0);
    mat_x_reinf.SetPropertyByName("FRACRY", 0.0);
    mat_x_reinf.SetPropertyByName("LCRSU", load_curve.lcid);
    mat_x_reinf.SetPropertyByName("DEGRAD", 1.0);
    mat_x_reinf.SetPropertyByName("ISHCHK", 1);
    mat_x_reinf.SetPropertyByName("GAMCE9", 1.2);

    //		y_reinf
    var mat_y_reinf = new Material(m, mids.Y_reinf, "*MAT_172"); // *MAT_CONCRETE_EC2
    mat_y_reinf.title = "Y_reinf";
    mat_y_reinf.SetPropertyByName("RO", 2400);
    mat_y_reinf.SetPropertyByName("FC", 38.5e6);
    mat_y_reinf.SetPropertyByName("FT", 3.51e6);
    mat_y_reinf.SetPropertyByName("TYPEC", 9);
    mat_y_reinf.SetPropertyByName("UNITC", 1e-6);
    mat_y_reinf.SetPropertyByName("ECUTEN", 0.001);
    mat_y_reinf.SetPropertyByName("FCC", 38.5e6);
    mat_y_reinf.SetPropertyByName("LCHAR", 0.2);
    mat_y_reinf.SetPropertyByName("AGGSZ", 0.01);
    mat_y_reinf.SetPropertyByName("UNITL", 1000.0);
    mat_y_reinf.SetPropertyByName("YMREINF", 2.0e11);
    mat_y_reinf.SetPropertyByName("PRREINF", 0.3);
    mat_y_reinf.SetPropertyByName("SUREINF", 5e8);
    mat_y_reinf.SetPropertyByName("TYPER", 5.0);
    mat_y_reinf.SetPropertyByName("FRACRX", 0.0);
    mat_y_reinf.SetPropertyByName("FRACRY", 1.0);
    mat_y_reinf.SetPropertyByName("LCRSU", load_curve.lcid);
    mat_y_reinf.SetPropertyByName("DEGRAD", 1.0);
    mat_y_reinf.SetPropertyByName("ISHCHK", 1);
    mat_y_reinf.SetPropertyByName("GAMCE9", 1.2);

    //      [2] Section and Part
    //      set composite shell for the RC shell 
    p_Shell.composite = true; // turn on compoiste shell option
    p_Shell.elform = 2; // fully integrated shell

    // Define steel reinforcement and concerete layers in the composite shell section
    // (1) 13 layers are defined for the composite shell
    // (2) Parameters used for layer definition:
    // 	thk 	= slab (compsoite) total thickness [m]
    // 	spc 	= steel reinforcement spacing [m]
    // 	Ds 		= steel reinforcement diametre [m]
    // 	cover 	= concrete cover depth [m]
    // (3)	2-way mesh 
    // LAYER NO.	|	MATERIAL	| 
    // 1			|	concrete	|
    // 2			|	steel		|
    // 3			|	concrete	|
    // 4			|	steel		|
    // 5			|	concrete	|
    // 6			|	concrete	|
    // 7			|	concrete	|
    // 8			|	concrete	|
    // 9			|	concrete	|
    // 10			|	steel		|
    // 11			|	concrete	|
    // 12			|	steel		|
    // 13			|	concrete	|

    // Calculation
    // https://arup-my.sharepoint.com/personal/anqi_chen_arup_com/_layouts/OneNote.aspx?id=%2Fpersonal%2Fanqi_chen_arup_com%2FDocuments%2FAnqi%20Chen&wd=target%28Ls-Dyna.one%7C52AF4C5C-7A6F-4B35-824E-5F3491E2C48E%2FConcrete%20shell%20definition%20-%20MAT172%7C2DA34271-0D1B-45BF-90DF-1728C37578D8%2F%29
    // onenote:https://arup-my.sharepoint.com/personal/anqi_chen_arup_com/Documents/Anqi%20Chen/Ls-Dyna.one#Concrete%20shell%20definition%20-%20MAT172&section-id={52AF4C5C-7A6F-4B35-824E-5F3491E2C48E}&page-id={2DA34271-0D1B-45BF-90DF-1728C37578D8}&end
    // (A - rebar total area/m, D - rebar depth) for each of 4 layers
    var A1, D1, A2, D2, A3, D3, A4, D4; 

    A1 = Math.PI*Ds*Ds/4.0/spc;
    A2 = A1;
    A3 = A1;
    A4 = A1;

    D1 = cover+0.5*Ds;
    D2 = D1+(Ds/2+Ds/2);
    D3 = D2;
    D4 = D1;

    // 13 layers: t = thickness of each layer (THICK), d = depth of each layer
    var t1, d1, t2, d2, t3, d3, t4, d4, t5, d5, t6, d6, t7, d7, t8, d8;
    var t9, d9, t10, d10, t11, d11, t12, d12, t13, d13;

    // steel rebar layers
    t2 = A1, d2 = D1;
    t4 = A2, d4 = D2;
    t10 = A3, d10 = thk-D3;
    t12 = A4, d12 = thk-D4;

    // concrete layers
    t1 = d2-t2*0.5, 					d1 = t1*0.5;
    t3 = (d4-d2)-0.5*(t2+t4), 			d3 = d2+0.5*(t3+t2);

    t5 = ((d10-d4)-0.5*(t4+t10))/5, 	d5 = d4+0.5*(t4+t5);  
    t6 = ((d10-d4)-0.5*(t4+t10))/5, 	d6 = d5+0.5*(t5+t6); 
    t7 = ((d10-d4)-0.5*(t4+t10))/5, 	d7 = d6+0.5*(t6+t7); 
    t8 = ((d10-d4)-0.5*(t4+t10))/5, 	d8 = d7+0.5*(t7+t8); 
    t9 = ((d10-d4)-0.5*(t4+t10))/5, 	d9 = d8+0.5*(t8+t9); 

    t11 =(d12-d10)-0.5*(t10+t12),		d11 = d10+0.5*(t10+t11);  
    t13 = (thk-d12)-t12/2,				d13 = d12+0.5*t12+t13/2;

    Message("...Compopsite shell")
    Message("A1 = " + A1 +"\n" + "D1 = " + D1);
    Message("A2 = " + A2 +"\n" + "D2 = " + D2);
    Message("A3 = " + A3 +"\n" + "D3 = " + D3);
    Message("A4 = " + A4 +"\n" + "D4 = " + D4);
    Message("- each 13 layer -")
    Message("t1 = " + t1 + ", " +"d1 = " + d1);
    Message("t2 = " + t2 + ", " +"d2 = " + d2);
    Message("t3 = " + t3 + ", " +"d3 = " + d3);
    Message("t4 = " + t4 + ", " +"d4 = " + d4);
    Message("t5 = " + t5 + ", " +"d5 = " + d5);
    Message("t6 = " + t6 + ", " +"d6 = " + d6);
    Message("t7 = " + t7 + ", " +"d7 = " + d7);
    Message("t8 = " + t8 + ", " +"d8 = " + d8);
    Message("t9 = " + t9 + ", " +"d9 = " + d9);
    Message("t10 = " + t10 + ", " +"d10 = " + d10);
    Message("t11 = " + t11 + ", " +"d11 = " + d11);
    Message("t12 = " + t12 + ", " +"d12 = " + d12);
    Message("t13 = " + t13 + ", " +"d13 = " + d13);
    Message("...Compopsite shell")

    // set composite shell data
    p_Shell.SetCompositeData(0, mids.concrete, t1, 0, 0); 		// 	layer 1 	- concrete 	- MAT 1
    p_Shell.SetCompositeData(1, mids.X_reinf, t2, 0, 0); 		// 	layer 2 	- steel		- MAT 2
    p_Shell.SetCompositeData(2, mids.concrete, t3, 0, 0); 		// 	layer 3 	- concrete 	- MAT 1
    p_Shell.SetCompositeData(3, mids.Y_reinf, t4, 0, 0); 		// 	layer 4 	- steel 	- MAT 3
    p_Shell.SetCompositeData(4, mids.concrete, t5, 0, 0); 		// 	layer 5 	- concrete	- MAT 1
    p_Shell.SetCompositeData(5, mids.concrete, t6, 0, 0); 		// 	layer 6 	- concrete	- MAT 1
    p_Shell.SetCompositeData(6, mids.concrete, t7, 0, 0); 		// 	layer 7		- concrete	- MAT 1
    p_Shell.SetCompositeData(7, mids.concrete, t8, 0, 0); 		// 	layer 8		- concrete	- MAT 1
    p_Shell.SetCompositeData(8, mids.concrete, t9, 0, 0); 		// 	layer 9		- concrete	- MAT 1
    p_Shell.SetCompositeData(9, mids.Y_reinf, t10, 0, 0); 	    // 	layer 10	- steel		- MAT 3
    p_Shell.SetCompositeData(10, mids.concrete, t11, 0, 0); 	// 	layer 11	- concrete	- MAT 1
    p_Shell.SetCompositeData(11, mids.X_reinf, t12, 0, 0); 		// 	layer 12	- steel		- MAT 2
    p_Shell.SetCompositeData(12, mids.concrete, t13, 0, 0); 	// 	layer 13	- concrete	- MAT 1

    return {mat_concrete, mat_x_reinf, mat_y_reinf}

}




