function set_control_cards(m, endtime, timestep_lcid, implict_lcid, mass_scaling, timestep_factor, dr_prop, no_imp)
{
	m.control.termination.exists = true;
	m.control.termination.endtim = endtime;

	m.control.timestep.exists = true;
	m.control.timestep.tssfac = timestep_factor;
	m.control.timestep.dt2ms = -1*mass_scaling;
	m.control.timestep.lctm = timestep_lcid;

	m.control.solid.exists = true;
	m.control.solid.esort = 1;

	m.control.shell.exists = true;
	m.control.shell.esort = 1;
	m.control.shell.istupd = 1;
	m.control.shell.bwc = 1;
	m.control.shell.nfail1 = 1;
	m.control.shell.nfail4 = 1;

	m.control.output.exists = true;
	m.control.output.npopt = 1;
	m.control.output.neecho = 3;
	m.control.output.nrefup = 1;

	m.control.accuracy.exists = true;
	m.control.accuracy.osu = 1;
	m.control.accuracy.inn = 4;
	m.control.accuracy.iacc = 1;

	if(no_imp == 0)
	{
		m.control.implicit_general.exists = true;
		m.control.implicit_general.imflag = -1*implict_lcid;
		m.control.implicit_general.dt0 = 0.5;
	}

	m.control.mpp_io_lstc_reduce.exists = true;

	m.control.mpp_io_nod3dump.exists = true;
	m.control.mpp_io_nodump.exists = true;
	m.control.mpp_io_nofull.exists = true;

	m.control.contact.exists = true;
	m.control.contact.rwpnal = 1.0;
	m.control.contact.ignore = 1.0;
	m.control.contact.skiprwg = 1;
	
	m.control.energy.exists = true;
	m.control.energy.hgen = 2;
	m.control.energy.slnten = 2;

	m.control.bulk_viscosity.exists = true;
	m.control.bulk_viscosity.ibq = -2;

	if(dr_prop.idrflg == 1) // set up dynamic relaxation
	{
		m.control.dynamic_relaxation.exists = true;
		m.control.dynamic_relaxation.nrcyck = dr_prop.nrcyck;
		m.control.dynamic_relaxation.drtol  = dr_prop.drtol;
		m.control.dynamic_relaxation.drfctr = dr_prop.drfctr;
		m.control.dynamic_relaxation.drterm = dr_prop.drterm;
		m.control.dynamic_relaxation.idrflg = dr_prop.idrflg;
	}
}
function set_database_cards(m, part_set, column_height)
{
	// database cross-sections
	var c1 = new CrossSection(m, CrossSection.PLANE, part_set.sid, 0, 0, (0+0.001), 0, 0, column_height, 1, 0, (0+0.001), 0, 0, 0, 0, 1, "Bottom X-Section");
	var c2 = new CrossSection(m, CrossSection.PLANE, part_set.sid, 0, 0, (column_height-0.001), 0, 0, 0, 1, 0, (column_height-0.001), 0, 0, 0, 0, 2, "Top X-Section");
	
	/// Database Cards
	m.database.binary.d3plot.exists = true;
	m.database.binary.d3plot.dt = 1e-4;
	
	m.database.binary.d3thdt.exists = true;
	m.database.binary.d3thdt.dt = 1e-5;

	m.database.binary.blstfor.exists = true;
	m.database.binary.blstfor.dt = 1e-4;

	m.database.binary.d3dump.exists = true;
	m.database.binary.d3dump.cycl = 99999;

	m.database.binary.d3drlf.exists = true;
	m.database.binary.d3drlf.cycl = 99999;
	
	m.database.glstat.exists = true;
	m.database.glstat.dt = 1e-5;
	m.database.glstat.binary = 3;

	m.database.secforc.exists = true;
	m.database.secforc.dt = 1e-5;
	m.database.secforc.binary = 2;

	m.database.format.exists = true;
	m.database.format.ibinary = 1;

}
