/**
 * Author: Anqi Chen
 * 
 * Date: 06 Jan 2023
 * 
 * Note:
 * 
 * JS script for Oasys Primer
 * 
 * [1] Create pressure stations/gauges using Null Shell elements to Viper blast load output
 * 
 * [2] Load beam elements using Null Shell panel (elements)
 * 
 * [3] Blast load imported from Viper based on the Null shell element 
 * 
 *	
 */


 /**
  * Apply Viper load to beam elements in Ls-Dyna/Primer
  * @param {*} m Model id
  * @param {*} pidNullShell Null shell part id 
  */
function loadPanelViperBlast(m, pidNullShell){

	// =============== Pressure gauges/stations ================================
	// >>> get the null shell element part 
	const nullShellPart = Part.GetFromID(m, pidNullShell);

	// >>> select all  null shell element
	const flag_nullShellPart = AllocateFlag();
	nullShellPart.SetFlag(flag_nullShellPart);
	m.PropagateFlag(flag_nullShellPart);
	const nullShellElements = Shell.GetFlagged(m, flag_nullShellPart);

	// >>> operate on each null shell element to: (1) create the pressure gauge at centre location, 
	// >>> then output the gauge coordinates in the format can be loaded into Viper  
	// >>> (2) extract underlying beam elements for blast load tranfer
	var panelID = 1; 
	var csv_viper = new File(js_dir + "viper_gauge_import.txt", File.WRITE);
	var csv_gauge_list = new File(js_dir + "viper_load_panel.csv", File.WRITE);
	for (var shell of nullShellElements){


		var coords = shell.IsoparametricToCoords(0, 0)
		// Message(coords);

		// viper station txt format
		// x y z label

		var x = coords[0];
		var y = coords[1];
		var z = coords[2];

		csv_viper.Writeln( x + ' ' + y + ' ' + z + ' ' +'load_panel_' + panelID);

		csv_gauge_list.Writeln('load_panel_' + panelID + ',' + shell.eid + ',' + 'beam element list');

		panelID = panelID + 1;

	} 
	csv_viper.Close();
	csv_gauge_list.Close();


	// =============== Load_beam ===============================================

	return 0
}
