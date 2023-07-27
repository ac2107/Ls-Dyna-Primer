//==============================================================================
var beam_references = {

    ROOF: {
        bids: [

        ],
        section: 'roof connection beam elements',
        bsid: 101,
    },

	LEVEL_2: {
        bids: [
			
        ],
        section: 'level 2 connection beam elements',
        bsid: 102,
    },

	LEVEL_1: {
        bids: [

			
        ],
        section: 'level 1 connection beam elements',
        bsid: 103,
    },

	TRUSS: {
        bids: [

        ],
        section: 'cantilever truss connection beam elements',
        bsid: 104,
    },

	BRACING: {
        bids: [

			
        ],
        section: 'bracing connection beam elements',
        bsid: 105,
    },

	CORRIDOR: {
        bids: [

		
			
        ],
        section: 'corridor connection beam elements',
        bsid: 106,
    },

	COLUMNS: {
        bids: [
					
        ],
        section: 'column base connection beam elements',
        bsid: 107,
	}

};

const bset_connection_all = new Set(m, 20001, Set.BEAM, 'all connection beam elements')
var csv = new File(js_dir + "beam_sets_all.csv", File.WRITE);
const kList = Object.keys(beam_references);
for (var i = 0; i < kList.length; i++) {
    var key = kList[i];
    var bref = beam_references[key];
    if (bref.bids.length > 0) {
        var bset = new Set(m, bref.bsid, Set.BEAM, key + ' ' + bref.section);
        for (var j = 0; j < bref.bids.length; j++) {
            bset.Add(bref.bids[j]);
            bset_connection_all.Add(bref.bids[j]);
        }
        csv.Writeln(key + ',' + bref.section + ',' + bref.bids);
    }
}
csv.Close();

//==============================================================================