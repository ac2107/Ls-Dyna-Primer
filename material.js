// Material models 

/**
 * Elastic concrete material model
 * @param {Model} m 
 * @param {Number} mid 
 * @param {String} title 
 */
function MAT_001_ELASTIC_CONCRETE(m, mid, title){

	var material = new Material(m, mid, "*MAT_001");
	
	material.title = 'Reinforced concrete (elastic)'
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

	material.title = 'Steel (elastic)'
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
	material.title = "Concrete (Solid)";
	material.SetPropertyByName("RO", 2400);
	material.SetPropertyByName("PR", 0.15);

	if (FT == 0.0) 	material.SetPropertyByName("FT", 5E6) // 5MPa tensile strength as default
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
