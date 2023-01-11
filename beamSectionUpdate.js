function beamSectionUpdate(m, mid, beam_ids, section, type) {

	// [deprecated] to be removed in the near future (5th Jan 2023) 
	//	use the functions in "theBlueBookP363.js" to update beam sections

    /*
    beam_ids ===> list/array of beam ids, e.g. [beam_id_1, beam_id_2, ...]
    section ===> string of section label, e.g. 'UC356x406x287'
    type ===> string of section type, e.g. 'UC'
    mid ===> material id
    */

    Message('>>> updating steel beam section for selected beam elements')

    var new_beam_part = {
        pid: Part.NextFreeLabel(m),
        mid: mid,
        secid: Section.NextFreeLabel(m),
        irid: IntegrationBeam.NextFreeLabel(m),
    }

    // new part
    var newBeamPart = new Part(m, new_beam_part.pid, new_beam_part.secid, new_beam_part.mid, section);

    // new beam section
    var newBeamSection = new Section(m, new_beam_part.secid, Section.BEAM, section);
    newBeamSection.elform = 1;
    newBeamSection.qr = -new_beam_part.irid;
    newBeamSection.cst = 2;

    // nea beam integration
    var new_bi = new IntegrationBeam(m, new_beam_part.irid);
    if (type == 'UC' || type == 'UB') {
        new_bi.icst = 1; // I shape    
        var secDim = theBlueBook[section];
        new_bi.d1 = secDim.b;
        new_bi.d2 = secDim.tf;
        new_bi.d3 = secDim.h;
        new_bi.d4 = secDim.tw;

    } else if (type == 'RHS') {
        new_bi.icst = 5; // box shape
        var secDim = theBlueBook[section];
        new_bi.d1 = secDim.b;
        new_bi.d2 = secDim.t;
        new_bi.d3 = secDim.h;
        new_bi.d4 = secDim.t;
    }

    // update beam element's pid
    for (var bid of beam_ids) {
        var beam_element = Beam.GetFromID(m, bid);
        beam_element.pid = new_beam_part.pid;
    }

    return 0
}


