/**
 * An one-step explicict analysis for static problems
 * @param {Model} m Model ID 
 * @param {Number} endtim Explicit dynamic analysis end time 
 * @param {Number} dt2ms Min. step time for mass scaling
 * @returns {object} Load curves
 */
function AnalysisControlExplicitStatic(m, endtim, dt2ms){

    Message('... Explicit static analysis');

    // - curves
    // -- BASE_UNIT_LOAD_CURVE
    var BASE_UNIT_LOAD_CURVE = smooth_step_curve2(m, endtim, 1.0, 1000, 1000001, 'BASE_UNIT_LOAD_CURVE');


    // - control 
    m.control.termination.endtim = endtim;

    if (dt2ms >= 0) ErrorMessage('... dt2ms must be negative')
    m.control.timestep.exists = true;
    m.control.timestep.dt2ms = dt2ms;

    // - database
    var N_d3plot = 50.0;
    m.database.binary.d3plot.exists = true;
    m.database.binary.d3plot.dt = endtim/N_d3plot;
    
    var N_d3thdt = 2000.0;
    m.database.binary.d3thdt.exists = true;
    m.database.binary.d3thdt.dt = endtim/N_d3thdt;

    m.database.extent_binary.exists = true;
    m.database.extent_binary.dt = endtim/N_d3plot;
    m.database.extent_binary.beamip = 5;

    m.database.bndout.exists = true;
    m.database.bndout.dt = endtim/N_d3thdt;
    m.database.bndout.binary = 3;

    m.database.glstat.exists = true;
    m.database.glstat.dt = endtim/N_d3thdt;
    m.database.glstat.binary = 3;
    m.database.glstat.mass_properties = 1;

    m.database.matsum.exists = true;
    m.database.matsum.dt = endtim/N_d3thdt;
    m.database.matsum.binary = 3;

    m.database.nodfor.exists = true;
    m.database.nodfor.dt = endtim/N_d3thdt;
    m.database.nodfor.binary = 3;
    
    m.database.nodout.exists = true;
    m.database.nodout.dt = endtim/N_d3thdt;
    m.database.nodout.binary = 3;

    m.database.rbdout.exists = true;
    m.database.rbdout.dt = endtim/N_d3thdt;
    m.database.rbdout.binary = 3;
    
    m.database.rcforc.exists = true;
    m.database.rcforc.dt = endtim/N_d3thdt;
    m.database.rcforc.binary = 3;

    m.database.secforc.exists = true;
    m.database.secforc.dt = endtim/N_d3thdt;
    m.database.secforc.binary = 3;

    m.database.spcforc.exists = true;
    m.database.spcforc.dt = endtim/N_d3thdt;
    m.database.spcforc.binary = 3;

    // --- suppress cluster dumping files 
    m.control.mpp_io_nod3dump.exists = true;
    m.control.mpp_io_nodump.exists = true;
    m.control.mpp_io_nofull.exists = true;
    m.control.mpp_io_lstc_reduce.exists = true;

    // --- update beam 3rd (reference) node for correct visualisation in d3plot
    m.control.output.exists = true;
    m.control.output.nrefup = 1;

    return {BASE_UNIT_LOAD_CURVE}

}

function AnalysisControlImplicitStaticToExplicitDynamic(){

    Message('... Implicit static switch to explicit dynamic analysis');
    





}

function AnalysisControlExplicitDRToExplicitDynamic(){
    
}

function AnalysisControlExplicitDynamic(){

    Message('... Explicit dynamic analysis');



}

function AnalysisControlImpicitStatic(){

    Message('... Implicit static analysis');

}

