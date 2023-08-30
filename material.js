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
					[-30000, 8.803382184],
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
					[30000, 1.582532729]
	];

	let curve = new Curve(Curve.CURVE, m, lcid);
	for (var arr of data) curve.AddPoint(arr[0], arr[1]);
	curve.heading = "MODIFIED_MAT72R3_LCRATE_CURVE";

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



