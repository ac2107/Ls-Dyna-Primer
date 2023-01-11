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
		this.pressure_curve = new Object;
	
	}
}

class LoadBeamViper {
	
}

/**
 * Create array of load panels (object LoadPanel) for each nul shell in the null shell part for Viper blast calculation
 * @param {Model} m Model id
 * @param {Number} pid Null shell part id for blast loading (LOAD_PANEL part id)
 * @param {Number} nsid Node set belongs to the beams to be loaded by the load panel (NODE_LOAD_PANEL node set id)
 * @returns loadPanels : array of object loadPanel 
 */
function loadPanelViperBlast(m, pid, nsid){

	Message('...>>> processing load panels ')

	// >>> object to contain all load panel objects based on null shells
	const loadPanels = new Array;

	// >>> get the null shell element part 
	const nullShellPart = Part.GetFromID(m, pid);

	// >>> select all  null shell element
	const flag_loadPanel = AllocateFlag();
	nullShellPart.SetFlag(flag_loadPanel);
	m.PropagateFlag(flag_loadPanel);
	const loadPanelShellElements = Shell.GetFlagged(m, flag_loadPanel);
	ReturnFlag(flag_loadPanel);

	// >>> create a load panel for each null shell element, and add to the array loadPanels
	var sco = 1; // numbering starts with 1
	for (var shell of loadPanelShellElements){

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

		// >>> 	list of beam elements for load distribution (surrouding beam elements)
		//		ALWAYS 4 NODED SHELL as Viper does not work well with 3 noded shell

		//		beams from N1 to N2			
		var bg1 = getBeamByNodes(m, shell.n1, shell.n2, nsid).beam
	
		//		beams from N2 to N3
		var bg2 = getBeamByNodes(m, shell.n2, shell.n3, nsid).beam;
		
		//		beams from N3 to N4
		var bg3 = getBeamByNodes(m, shell.n3, shell.n4, nsid).beam;
		
		//		beams from N4 to N5
		var bg4 = getBeamByNodes(m, shell.n4, shell.n1, nsid).beam;

		// add 4 list of beams together
		loadPanel.beam_list = bg1.concat(bg2, bg3, bg4);

		// >>> push loadPanel into array loadPanels
		loadPanels.push(loadPanel);

		// update load panel counter
		// Message(['... load panel ',sco]);
		sco = sco + 1;
	} 

	// >>> dump the load panels for Viper pressure gauge import and debugging 
	Message('...>>> dumping load panels')

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


/**
 * Apply blast load from Viper to beam elements surrounding the load panels
 * @param {Model} m model id
 * @param {Object} loadPanels array of LoadPanel object
 * @param {*} viper3d_th_overpressure_full_path full path to the text file contains pressure data from Viper (measured by 3D pressure stations)
 * @returns 
 */
function applyLoadPanelViperBlast(m, loadPanels, viper3d_th_overpressure_full_path){









	return 0

}



function loadBeamViperBlast(){

}



function applyLoadBeamViperBlast(){

}


/**
 * Read the viper3d_th_overpressure.txt and convert to array of data panelPressureTh[0] = time, panelPressureTh[1, 2, 3 ... ... ] = pressure of gauge 1, 2 and 3 etc... 
 * @param {*} viper3d_th_overpressure_full_path Text file of pressure time histories written by Viper for each pressure gauge/station
 * @returns panelPressureCurves - Array of Curve objects for each pressure gauge/station
 */
function read_viper3d_th_overpressure(viper3d_th_overpressure_full_path){

	// !!! Viper pressure station/gauge numbering ALWAYS start from 1  !!!
	var panelPressureCurves = [];

	// read the txt file "viper3d_th_overpressure"
	Message(viper3d_th_overpressure_full_path)
	var f, line;
	f = new File(viper3d_th_overpressure_full_path, File.READ);
	while ( (line = f.ReadLongLine()) != undefined)
	{
		var arr = line.split(' ')
		// Message(arr[130]);
	}
	f.Close();





	return panelPressureCurves
}