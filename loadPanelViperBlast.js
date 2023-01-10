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


class LoadPanel {
	constructor(panel_id, cx, cy, cz, area, null_shell_eid, beam_list){

		this.panel_id = 0;				// panel id
		this.cx = 0;					// coordiante x of panel geometric centre 
		this.cy = 0;					// coordiante y of panel geometric centre
		this.cz = 0;					// coordiante z of panel geometric centre
		this.area = 0;					// area of the panel (null shell)
		this.null_shell_eid = 0;		// null shell element eid corresponding to the load panel  
		this.beam_list = [];		// list of beam elements which are surrouning the null shell
	
	}
}

class LoadBeamViper {
	
}

/**
 * Create array of load panels (object LoadPanel) for each nul shell in the null shell part for Viper blast calculation
 * @param {*} m Model id
 * @param {*} pidNullShell Null shell part id for blast loading
 */
function loadPanelViperBlast(m, pidNullShell){

	// >>> object to contain all load panel objects based on null shells
	const loadPanels = new Array;

	// >>> get the null shell element part 
	const nullShellPart = Part.GetFromID(m, pidNullShell);

	// >>> select all  null shell element
	const flag_nullShellPart = AllocateFlag();
	nullShellPart.SetFlag(flag_nullShellPart);
	m.PropagateFlag(flag_nullShellPart);
	const nullShellElements = Shell.GetFlagged(m, flag_nullShellPart);
	ReturnFlag(flag_nullShellPart);

	// >>> create a load panel for each null shell element, and add to the array loadPanels
	var sco = 1; // numbering starts with 1
	for (var shell of nullShellElements){

		var loadPanel = new LoadPanel; // with default properties

		// >>> id
		loadPanel.panel_id = sco;

		// >>> centre coordinates
		var coords = shell.IsoparametricToCoords(0, 0)
		loadPanel.cx = coords[0];
		loadPanel.cy = coords[1];
		loadPanel.cz = coords[2];

		// >>> area (for calculating load)
		loadPanel.area = shell.Area();
		
		// >>> null shell eid
		loadPanel.null_shell_eid = shell.eid;

		// >>> list of beam elements for load distribution (surrouding beam elements)
		loadPanel.beam_list = [1, 2, 3];


		// >>> push loadPanel into array loadPanels
		loadPanels.push(loadPanel);

		// update load panel counter
		sco = sco + 1;
	} 

	// >>> dump the load panels for Viper pressure gauge import and debugging 
	Message('... dump load panels')

	var csv_viper = new File(js_dir + "viper_gauge_import.txt", File.WRITE);
	var csv_panel_list = new File(js_dir + "viper_load_panel.csv", File.WRITE);
	
	for (var item of loadPanels){


		csv_viper.Writeln( item.cx + ' ' + item.cy + ' ' + item.cz + ' ' +'load_panel_' + item.panel_id);

		csv_panel_list.Writeln('load_panel_' + item.panel_id + ',' + item.null_shell_eid + ',' + item.beam_list.toString());

		// Message([item.panel_id, item.cx, item.cy, item.cz, item.area, item.null_shell_eid, item.beam_list])

	}
	csv_viper.Close();
	csv_panel_list.Close();

	return loadPanels
}



function applyLoadPanelViperBlast(m, loadPanels, viper3d_th_overpressure){


	// =============== Load_beam ===============================================


	












	return 0

}



function loadBeamViperBlast(){

}



function applyLoadBeamViperBlast(){

}