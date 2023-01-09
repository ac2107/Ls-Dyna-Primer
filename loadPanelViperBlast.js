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

	// >>> get the null shell element part 
	var nullShellPart = Part.GetFromID(m, pidNullShell);

	// select each null shell element
	


	return 0
}
