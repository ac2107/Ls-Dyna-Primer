/// Read in Material Properties Options file
function mat_read(mat_opt, filename)
{
	var file = new File(mat_dir+filename, File.READ);
	var line = file.ReadLine() // ignore first line - Type and Title
	var line = file.ReadLine() // ignore second line - Material Type -Curretly Fixed Mat_123

	mat_opt[1] = new Object; // preset 1 
	mat_opt[2] = new Object; // preset 2 
	mat_opt[3] = new Object; // preset 3

	while ( (line = file.ReadLine()) != undefined)
	{
		var temp = line.split(",");
		if(temp[1] == "name")
		{
			mat_opt[1][temp[1]] = temp[2];
			mat_opt[2][temp[1]] = temp[3];
			mat_opt[3][temp[1]] = temp[4];
		}
		else
		{
			mat_opt[1][temp[1]] = Number(temp[2]);
			mat_opt[2][temp[1]] = Number(temp[3]);
			mat_opt[3][temp[1]] = Number(temp[4]);
		}
	}
	file.Close();
}

function mat_button_names(button_name)
{
	//General
	button_name.name = "Name";
	button_name.ro = "Density (kg/m3)";
	button_name.e = "Youngs Modulus (GPa)";
	button_name.pr = "Poissons Ratio";

	//Mat 24 / Mat 123
	button_name.sigy = "Yield Stress (MPa)";
	button_name.etan = "Tagent Modulus ETAN (MPa)";
	button_name.lcss = "Stress Strain Curve LCSS";
	button_name.fail = "Plastic Failure Strain FAIL";
	button_name.epsmaj = "Major Failure Strain EPSMAJ";
	button_name.c = "C Parameter";
	button_name.p = "P Parameter";

	//Mat 72 REL 3
	button_name.ft = "Tensile Strength (MPa)";
	button_name.a0 = "Compressive Strength (MPa)";
	button_name.lrate = "Strain Rate Curve (LRATE)";
	button_name.locwid = "3X Max Agg Dia (LOCWID)";

	// Mat Add Erosion
	button_name.effeps = "Max effec strain fail (EFFEPS)";
	button_name.voleps = "Vol strain fail (VOLEPS)";
	button_name.numfip = "Num failed int points (NUMFIP)";
	button_name.mxeps = "Max prin strain fail (MXEPS)";
}