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

		this.panel_id = 0;					// panel id
		this.cx = 0;						// coordiante x of panel geometric centre 
		this.cy = 0;						// coordiante y of panel geometric centre
		this.cz = 0;						// coordiante z of panel geometric centre
		this.null_shell_eid = 0;			// null shell element eid corresponding to the load panel  
		this.beam_list = [];				// list of beam elements which are surrouning the null shell
		// this.pressure_curve = new Object;
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
 * @param {*} viper3d_th_overpressure full path to the text file contains pressure data from Viper (measured by 3D pressure stations)
 * @param {*} gauge_list_3d_actual Text file of pressure gauge/station actual locations (full path)  
 * @returns 
 */
function applyLoadPanelViperBlast(m, loadPanels, viper3d_th_overpressure, gauge_list_3d_actual){

	// >>> Read the Viper pressure data, 3d pressure station names and create Curve objects to pressure time history data for each pressure station
	read_viper3d_th_overpressure(viper3d_th_overpressure, gauge_list_3d_actual);

	// >>> Loop each loadPanel and distribute pressure load to surrounding beam elements
	/**
	 * Pressure load distribution
	 * 
	 * For each beam element:
	 * 		beam load (UDL, N/m) = pressure (N/m2) x unit_loaded_area (m2/m)
	 * 
	 * pressure (N/m2) is the calculated by Viper then converted to Curve objects
	 * 
	 * unit_loaded_area (m2/m) = total area of the panel / total length of the surrounding load supported beam elements (loaded_edge_length) 
	 * 
	 */
	for (var i = 0; i < loadPanels.length; i++){ //loadPanels.length

		// >>> Loop each panel
		var loadPanel = loadPanels[i]
		// >>> get the null shell element
		var null_shell = Shell.GetFromID(m, loadPanel.null_shell_eid);

		var unit_loaded_area, loaded_edge_length;

		// >>> work out total edge length supporting the panel
		var Len12 = unitVectorbyTwoNodes(m, null_shell.n1, null_shell.n2).len; 
		var Len23 = unitVectorbyTwoNodes(m, null_shell.n2, null_shell.n3).len; 
		var Len34 = unitVectorbyTwoNodes(m, null_shell.n3, null_shell.n4).len; 
		var Len41 = unitVectorbyTwoNodes(m, null_shell.n4, null_shell.n1).len; 
		loaded_edge_length = Len12 + Len23 + Len34 + Len41;

		// >>>
		unit_loaded_area = null_shell.Area()/loaded_edge_length;

		// Message(['panel_id = ' , loadPanel.panel_id, 'null_shell_eid = ', loadPanel.null_shell_eid, 'loaded_edge_length = ', loaded_edge_length, 'unit_loaded_area = ', unit_loaded_area]);

		// >>> Loop beam element in the beam_list and cerate *LOAD_BEAM for each beam element
		
		// >>> unit_loaded_area is the scale factor (sf) for all beam elements supporting the panel 
		var sf = unit_loaded_area;

		for (var bid of loadPanel.beam_list){
			// Message(bid);
			// >>> create *LOAD_BEAM
			var lb = new LoadBeam(m, LoadBeam.ELEMENT, bid, 3, loadPanel.panel_id, sf);
		}
	}

	return 0
}

function loadBeamViperBlast(){

}


function applyLoadBeamViperBlast(){

}


/**
 * Read the viper3d_th_overpressure.txt and convert to array of data panelPressureTh[0] = time, panelPressureTh[1, 2, 3 ... ... ] = pressure of gauge 1, 2 and 3 etc... 
 * @param {*} viper3d_th_overpressure Text file of pressure time histories written by Viper for each pressure gauge/station (full path)
 * @param {*} gauge_list_3d_actual Text file of pressure gauge/station actual locations (full path) 
 * @returns panelPressureCurves - Array of Curve objects for each pressure gauge/station
 */
function read_viper3d_th_overpressure(viper3d_th_overpressure, gauge_list_3d_actual){

	// >>> Viper pressure station/gauge numbering ALWAYS start from 1 

	var panelPressureCurves = [];	// Curve object for each pressure station
	var numPressureStation = []; 	// number of the pressure station 
	var namePressureStation = [];	// name/label of the pressure tation
 
	var fdata, fname, line; 	// fdata: pressure data file, fname: station label and location file
	var opdata = []; 			// array to contain the overpressure data read from file

	// >>> Read the pressure station label (name)
	Message(gauge_list_3d_actual)
	fname = new File(gauge_list_3d_actual, File.READ);
	while ( (line = fname.ReadLongLine()) != undefined) {
		var arr = line.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; })
		numPressureStation.push(arr[1]);
		namePressureStation.push(arr[arr.length - 1]);
	}
	fname.Close();

	// >>> Read the pressure data for each station and create Curve object
	Message(viper3d_th_overpressure)
	fdata = new File(viper3d_th_overpressure, File.READ);
	while ( (line = fdata.ReadLongLine()) != undefined)
	{
		opdata.push(line.split(' '))
	}
	fdata.Close();

	// >>> Loop each pressure station and create Curve object for pressure time history 
	for (var i = 0; i < namePressureStation.length; i++){ //namePressureStation.length

		// Message([namePressureStation[i], numPressureStation[i]])
		
		// >>> Create Curve object
		var curve = new Curve(Curve.CURVE, m, i+1); // i+1 is the curve lcid
		curve.heading = namePressureStation[i]

		// >>> Loop each pressure data point (t, p) in "opdata"
		for (var j = 0; j < opdata.length; j++){

			// Message(['time =', opdata[j][0], 'pressure =', opdata[j][i+1]])

			curve.AddPoint(parseFloat(opdata[j][0]), parseFloat(opdata[j][i+1]));

		}
	}

	return 0
}
