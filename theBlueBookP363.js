/*
https://www.steelforlifebluebook.co.uk/

All design data is generated from the root software functions used to populate 
Steel building design: Design Data (SCI publication P363) and Steelwork design 
guide to BS 5950-1: 2000 - Volume 1, Section properties, 
Member capacities - 7th Edition (SCI publication P202).

JS function to define integration beam card (*INTEGRATION_BEAM) in Ls-Dyna,
using blue book section type , see keys below, as input

*/

const theBlueBook = { /*= DO NOT UPDATE THIS, DEPRECATED, PROVIDED TO KEEP OLD SCRIPTS WORKING =*/
    // UB

    UB610x229x140:{h: 0.6172, b: 0.2302, tw: 0.0131, tf: 0.0221},
    
    UB457x191x67: {h: 0.4534, b: 0.1899, tw: 0.0085, tf: 0.0127},

    UB457x152x74: {h: 0.462, b: 0.1544, tw: 0.0096, tf: 0.017},
    
    UB457x152x52: {h: 0.4498, b: 0.1524, tw: 0.0076, tf: 0.0109},
    
    UB406x178x54: {h: 0.4026, b: 0.1777, tw: 0.0077, tf: 0.0109},

    UB406x140x39: {h: 0.398, b: 0.1418, tw: 0.0064, tf: 0.0086},

    UB254x146x31: {h: 0.2514, b: 0.1461, tw: 0.006, tf: 0.0086},

    // UC
    UC356x406x287: {h: 0.3936, b: 0.399, tw: 0.0226, tf: 0.0365},

    UC305x305x158: {h: 0.3271, b: 0.3112, tw: 0.0158, tf: 0.025},

    UC305x305x137: {h: 0.3205, b: 0.3092, tw: 0.0138, tf: 0.0217},

    UC254x254x73: {h: 0.2541, b: 0.2546, tw: 0.0086, tf: 0.0142},

    // RHS
    
    RHS500x300x16: {h: 0.5, b: 0.3, t:0.016},

    RHS500x200x10: {h: 0.5, b: 0.2, t: 0.01},

    RHS450x250x16: {h: 0.45, b: 0.25, t:0.016},

    RHS200x150x10: {h: 0.2, b: 0.15, t:0.01},

    // to be continued ... ...
 
};

const theBlueBookSectionDimensions = { 

    //'':{name: '', type: 'UB', h: , b: , tw: , tf: },
    UB: {
        'UB1016x305x584':{name: 'UB1016x305x584', type: 'UB', h: 1.056, b: 0.314, tw: 0.036, tf: 0.064},
        'UB1016x305x494':{name: 'UB1016x305x494', type: 'UB', h: 1.036, b: 0.309, tw: 0.031, tf: 0.054},
        'UB1016x305x438':{name: 'UB1016x305x438', type: 'UB', h: 1.026, b: 0.305, tw: 0.269, tf: 0.049},
        'UB1016x305x415':{name: 'UB1016x305x415', type: 'UB', h: 1.020, b: 0.304, tw: 0.026, tf: 0.046},
        'UB1016x305x393':{name: 'UB1016x305x393', type: 'UB', h: 1.0159, b: 0.303, tw: 0.0244, tf: 0.0439},
        'UB1016x305x350':{name: 'UB1016x305x350', type: 'UB', h: 1.008, b: 0.302, tw: 0.0211, tf: 0.040},
        'UB1016x305x314':{name: 'UB1016x305x314', type: 'UB', h: 0.9999, b: 0.300, tw: 0.0191, tf: 0.0359},
        'UB1016x305x272':{name: 'UB1016x305x272', type: 'UB', h: 0.9901, b: 0.300, tw: 0.0165, tf: 0.031},
        'UB1016x305x249':{name: 'UB1016x305x249', type: 'UB', h: 0.9801, b: 0.300, tw: 0.0165, tf: 0.026},
        'UB1016x305x222':{name: 'UB1016x305x222', type: 'UB', h: 0.9703, b: 0.300, tw: 0.0160, tf: 0.0211},

        'UB914x419x388':{name: 'UB914x419x388', type: 'UB', h: 0.9210, b: 0.4205, tw: 0.0214, tf: 0.0366},
        'UB914x419x343':{name: 'UB914x419x343', type: 'UB', h: 0.9118, b: 0.4185, tw: 0.0194, tf: 0.032},
        
        'UB914x305x576':{name: 'UB914x305x576', type: 'UB', h: 0.993, b: 0.322, tw: 0.0361, tf: 0.065},
        'UB914x305x521':{name: 'UB914x305x521', type: 'UB', h: 0.981, b: 0.319, tw: 0.033, tf: 0.0589},
        'UB914x305x474':{name: 'UB914x305x474', type: 'UB', h: 0.971, b: 0.316, tw: 0.030, tf: 0.0541},
        'UB914x305x425':{name: 'UB914x305x425', type: 'UB', h: 0.961, b: 0.313, tw: 0.0269, tf: 0.049},
        'UB914x305x381':{name: 'UB914x305x381', type: 'UB', h: 0.951, b: 0.310, tw: 0.0244, tf: 0.0439},
        'UB914x305x345':{name: 'UB914x305x345', type: 'UB', h: 0.943, b: 0.308, tw: 0.0221, tf: 0.0399},
        'UB914x305x313':{name: 'UB914x305x313', type: 'UB', h: 0.932, b: 0.309, tw: 0.0211, tf: 0.0345},
        'UB914x305x289':{name: 'UB914x305x289', type: 'UB', h: 0.9266, b: 0.3077, tw: 0.0195, tf: 0.032},
        'UB914x305x271':{name: 'UB914x305x271', type: 'UB', h: 0.923, b: 0.307, tw: 0.0184, tf: 0.030},
        'UB914x305x253':{name: 'UB914x305x253', type: 'UB', h: 0.9184, b: 0.3055, tw: 0.0173, tf: 0.0279},
        'UB914x305x238':{name: 'UB914x305x238', type: 'UB', h: 0.915, b: 0.305, tw: 0.0165, tf: 0.0259},
        'UB914x305x224':{name: 'UB914x305x224', type: 'UB', h: 0.9104, b: 0.3041, tw: 0.0159, tf: 0.0239},
        'UB914x305x201':{name: 'UB914x305x201', type: 'UB', h: 0.903, b: 0.3033, tw: 0.0151, tf: 0.0202},

        'UB838x292x226':{name: 'UB838x292x226', type: 'UB', h: 0.8509, b: 0.2938, tw: 0.0161, tf: 0.0268},
        'UB838x292x194':{name: 'UB838x292x194', type: 'UB', h: 0.8407, b: 0.2924, tw: 0.0147, tf: 0.0217},
        'UB838x292x176':{name: 'UB838x292x176', type: 'UB', h: 0.8349, b: 0.2917, tw: 0.014, tf: 0.0188},

        'UB762x267x197':{name: 'UB762x267x197', type: 'UB', h: 0.7698, b: 0.268, tw: 0.0156, tf: 0.0254},
        'UB762x267x173':{name: 'UB762x267x173', type: 'UB', h: 0.7622, b: 0.2667, tw: 0.0143, tf: 0.0216},
        'UB762x267x147':{name: 'UB762x267x147', type: 'UB', h: 0.754, b: 0.2652, tw: 0.0128, tf: 0.0175},
        'UB762x267x134':{name: 'UB762x267x134', type: 'UB', h: 0.750, b: 0.2644, tw: 0.012, tf: 0.0155},
        
        'UB686x254x170':{name: 'UB686x254x170', type: 'UB', h: 0.6929, b: 0.2558, tw: 0.014, tf: 0.0237},
        'UB686x254x152':{name: 'UB686x254x152', type: 'UB', h: 0.6875, b: 0.2545, tw: 0.0132, tf: 0.021},
        'UB686x254x140':{name: 'UB686x254x140', type: 'UB', h: 0.6835, b: 0.2537, tw: 0.0124, tf: 0.019},
        'UB686x254x125':{name: 'UB686x254x125', type: 'UB', h: 0.6779, b: 0.253, tw: 0.0117, tf: 0.0162},

        'UB610x305x238':{name: 'UB610x305x238', type: 'UB', h: 0.6358, b: 0.3114, tw: 0.0184, tf: 0.0314},
        'UB610x305x179':{name: 'UB610x305x179', type: 'UB', h: 0.6202, b: 0.3071, tw: 0.0141, tf: 0.0236},
        'UB610x305x149':{name: 'UB610x305x149', type: 'UB', h: 0.6124, b: 0.3048, tw: 0.0118, tf: 0.0197},
        
        'UB610x229x140':{name: 'UB610x229x140', type: 'UB', h: 0.6172, b: 0.2302, tw: 0.0131, tf: 0.0221},
        'UB610x229x125':{name: 'UB610x229x125', type: 'UB', h: 0.6122, b: 0.229, tw: 0.0119, tf: 0.0196},
        'UB610x229x113':{name: 'UB610x229x113', type: 'UB', h: 0.6076, b: 0.2282, tw: 0.0111, tf: 0.0173},
        'UB610x229x101':{name: 'UB610x229x101', type: 'UB', h: 0.6026, b: 0.2276, tw: 0.0105, tf: 0.0148},
        
        'UB610x178x100':{name: 'UB610x178x100', type: 'UB', h: 0.6074, b: 0.1792, tw: 0.0113, tf: 0.0172},
        'UB610x178x92':{name: 'UB610x178x92', type: 'UB', h: 0.603, b: 0.1788, tw: 0.0109, tf: 0.015},
        'UB610x178x82':{name: 'UB610x178x82', type: 'UB', h: 0.5986, b: 0.1779, tw: 0.01, tf: 0.0128},
        
        'UB533x312x273':{name: 'UB533x312x273', type: 'UB', h: 0.5771, b: 0.3202, tw: 0.0211, tf: 0.0376},
        'UB533x312x219':{name: 'UB533x312x219', type: 'UB', h: 0.5603, b: 0.3174, tw: 0.0183, tf: 0.0292},
        'UB533x312x182':{name: 'UB533x312x182', type: 'UB', h: 0.5507, b: 0.3145, tw: 0.0152, tf: 0.0244},
        'UB533x312x151':{name: 'UB533x312x151', type: 'UB', h: 0.5425, b: 0.3120, tw: 0.0127, tf: 0.0203},

        'UB533x210x138':{name: 'UB533x210x138', type: 'UB', h: 0.5491, b: 0.2139, tw: 0.0147, tf: 0.0236},
        'UB533x210x122':{name: 'UB533x210x122', type: 'UB', h: 0.5445, b: 0.2119, tw: 0.0127, tf: 0.0213},
        'UB533x210x109':{name: 'UB533x210x109', type: 'UB', h: 0.5395, b: 0.2108, tw: 0.0116, tf: 0.0188},       
        'UB533X210X101':{name: 'UB533X210X101', type: 'UB', h: 0.5367, b: 0.210, tw: 0.0108, tf: 0.0174},
        'UB533x210x92':{name: 'UB533X210X101', type: 'UB', h: 0.5331, b: 0.2093, tw: 0.0101, tf: 0.0156},
        'UB533x210x82':{name: 'UB533x210x82', type: 'UB', h: 0.5283, b: 0.2088, tw: 0.0096, tf: 0.0132},

        'UB457x191x161':{name: 'UB457x191x161', type: 'UB',h: 0.492, b: 0.1994, tw: 0.018, tf: 0.032},
		'UB457x191x98': {name: 'UB457x191x98',  type: 'UB', h: 0.4672, b: 0.1928, tw: 0.0114, tf: 0.0196},
        'UB457x191x89': {name: 'UB457x191x89',  type: 'UB', h: 0.4634, b: 0.1919, tw: 0.0105, tf: 0.0177},
		'UB457x191x82': {name: 'UB457x191x82',  type: 'UB', h: 0.46, b: 0.1913, tw: 0.0099, tf: 0.016},
        'UB457x191x67': {name: 'UB457x191x67',  type: 'UB', h: 0.4534, b: 0.1899, tw: 0.0085, tf: 0.0127},

		'UB457x152x82': {name: 'UB457x152x82',  type: 'UB', h: 0.4658, b: 0.1553, tw: 0.0105, tf: 0.0189},
        'UB457x152x74': {name: 'UB457x152x74',  type: 'UB', h: 0.462, b: 0.1544, tw: 0.0096, tf: 0.017},
		'UB457x152x67': {name: 'UB457x152x67',  type: 'UB', h: 0.458, b: 0.1538, tw: 0.009, tf: 0.015},
		'UB457x152x60': {name: 'UB457x152x60',  type: 'UB', h: 0.4546, b: 0.1529, tw: 0.0081, tf: 0.0133},
        'UB457x152x52': {name: 'UB457x152x52',  type: 'UB', h: 0.4498, b: 0.1524, tw: 0.0076, tf: 0.0109},
        
		'UB406x178x74': {name: 'UB406x178x74',  type: 'UB', h: 0.4128, b: 0.1795, tw: 0.0095, tf: 0.016},
		'UB406x178x67': {name: 'UB406x178x67',  type: 'UB', h: 0.4094, b: 0.1788, tw: 0.0088, tf: 0.0143},
		'UB406x178x54': {name: 'UB406x178x54',  type: 'UB', h: 0.4026, b: 0.1777, tw: 0.0077, tf: 0.0109},
		'UB406x178x60': {name: 'UB406x178x60',  type: 'UB', h: 0.4064, b: 0.1779, tw: 0.0079, tf: 0.0128},
        'UB406x140x39': {name: 'UB406x140x39',  type: 'UB', h: 0.398, b: 0.1418, tw: 0.0064, tf: 0.0086},
        
		'UB356x171x67': {name: 'UB356x171x67',  type: 'UB', h: 0.3634, b: 0.1732, tw: 0.0091, tf: 0.0157},
		'UB356x171x51': {name: 'UB356x171x51',  type: 'UB', h: 0.3550, b: 0.1715, tw: 0.0074, tf: 0.0115},
		'UB356x171x45': {name: 'UB356x171x45',  type: 'UB', h: 0.3514, b: 0.1711, tw: 0.0070, tf: 0.0097},

		'UB305x165x54': {name: 'UB305x165x54',  type: 'UB', h: 0.3104, b: 0.1669, tw: 0.0079, tf: 0.0137},
		'UB305x165x46': {name: 'UB305x165x46',  type: 'UB', h: 0.3066, b: 0.1657, tw: 0.0067, tf: 0.0118},
		'UB305x165x40': {name: 'UB305x165x40',  type: 'UB', h: 0.3034, b: 0.165, tw: 0.006, tf: 0.0102},

		'UB254x146x37': {name: 'UB254x146x37',  type: 'UB', h: 0.256, b: 0.1464, tw: 0.0063, tf: 0.0109},
        'UB254x146x31': {name: 'UB254x146x31',  type: 'UB', h: 0.2514, b: 0.1461, tw: 0.006, tf: 0.0086},

		'UB203x133x25': {name: 'UB203x133x25',  type: 'UB', h: 0.2032, b: 0.1332, tw: 0.0057, tf: 0.0078},
    },

    // xxxxxxxxxxxx: {h: , b: , tw: , tf: },
    UC: {
        "UC356x406x287": {name: 'UC356x406x287', type: 'UC', h: 0.3936, b: 0.399, tw: 0.0226, tf: 0.0365},
        'UC305x305x158': {name: 'UC305x305x158', type: 'UC', h: 0.3271, b: 0.3112, tw: 0.0158, tf: 0.025},
        'UC305X305X137': {name: 'UC305X305X137', type: 'UC', h: 0.3205, b: 0.3092, tw: 0.0138, tf: 0.0217},
        'UC305X305X118': {name: 'UC305X305X118', type: 'UC', h: 0.3145, b: 0.3074, tw: 0.012, tf: 0.0187},
        'UC305X305X97':  {name: 'UC305X305X97',  type: 'UC', h: 0.3079, b: 0.3053, tw: 0.0099, tf: 0.0154},
        'UC254X254X107': {name: 'UC254X254X107', type: 'UC', h: 0.2667, b: 0.2588, tw: 0.0128, tf: 0.0205},
        'UC254x254x73':  {name: 'UC254x254x73',  type: 'UC', h: 0.2541, b: 0.2546, tw: 0.0086, tf: 0.0142},
    },


    CFCHS: {
        'CFCHS139.7x10': 	{name: 'CFCHS139.7x10', 	type: 'CHS', d: 0.1397, t: 0.01},
		'CFCHS168.3x8': 	{name: 'CFCHS168.3x8', 		type: 'CHS', d: 0.1683, t: 0.008},
		'CFCHS168.3x12.5': 	{name: 'CFCHS168.3x12.5', 	type: 'CHS', d: 0.1683, t: 0.0125},
		'CFCHS219.1x10': 	{name: 'CFCHS219.1x10', 	type: 'CHS', d: 0.2191, t: 0.01},
    },


    CFRHS: {
        'CFRHS200x100x10':      {name:'CFRHS200x100x10',    type: 'RHS', h: 0.2, b: 0.1, t: 0.01},
		'CFRHS300x200x10':      {name:'CFRHS300x200x10',    type: 'RHS', h: 0.3, b: 0.2, t: 0.01},
        'CFRHS400x200x12.5':    {name:'CFRHS400x200x12.5',  type: 'RHS', h: 0.4, b: 0.2, t: 0.0125},
		'CFRHS500x200x16':      {name:'CFRHS500x200x16',    type: 'RHS', h: 0.5, b: 0.2, t: 0.016},
        'CFRHS500x300x16':      {name:'CFRHS500x300x16',    type: 'RHS', h: 0.5, b: 0.3, t: 0.016},
    },

    CFSHS: {
		'CFSHS150x150x8': 	{name:'CFSHS150x150x8', type: 'SHS', h: 0.15, t: 0.008},
        'CFSHS150x150x10': 	{name:'CFSHS150x150x10', type: 'SHS', h: 0.15, t: 0.01},
		'CFSHS200x200x8':	{name:'CFSHS200x200x8', type: 'SHS', h: 0.2, t: 0.008},
		'CFSHS200x200x10': 	{name:'CFSHS200x200x10', type: 'SHS', h: 0.2, t: 0.01},

    },
}

/**
 * Create integration beam for beam section using standard sections from the Blue book
 * @param {Model} m Model
 * @param {Number} irid 
 * @param {Object} section 
 * @returns 
 */
function theBlueBookIntegrnBeam(m, irid, section){
    /*
    
    Purpose: 
        create and return a integration beam object (*INTEGRATION_BEAM), based 
        on the standard section type and size from SCI's blue book

        
    
    Input:
        irid: integration rule ID. IRID refers to IRID on *SECTION_BEAM card, an integer number, can be same as section id
        section: section object selected from the, e.g. theBlueBookNew.CFRHS.CFRHS300x200x10
    
    */

    // Message("...create integration beam based on SCI's Blue Book: " + section.name)

    if(section.type == 'UB') {
        // Message('UB')

        var ib = new IntegrationBeam(m, irid);
        ib.icst = 1;    // Type 1 I-Shape
        ib.d1 = section.b;
        ib.d2 = section.tf;
        ib.d3 = section.h;
        ib.d4 = section.tw;
    }

    else if(section.type == 'UC') {
        // Message('UC')

        var ib = new IntegrationBeam(m, irid);
        ib.icst = 1;    // Type 1 I-Shape
        ib.d1 = section.b;
        ib.d2 = section.tf;
        ib.d3 = section.h;
        ib.d4 = section.tw;
    
    }

    else if(section.type == 'CHS') {
        // Message('CHS')

        var ib = new IntegrationBeam(m, irid);
        ib.icst = 9; // Type 9 Tubular 
        ib.d1 = section.d*0.5;
        ib.d2 = section.d*0.5-section.t;

    }
    
    else if(section.type == 'RHS') {
        // Message('RHS')

        var ib = new IntegrationBeam(m, irid);
        ib.icst = 5;    // Type 5 Box-Shape
        ib.d1 = section.b;
        ib.d2 = section.t;
        ib.d3 = section.h;
        ib.d4 = section.t;
    } 

    else if(section.type == 'SHS') {
        // Message('SHS')

        var ib = new IntegrationBeam(m, irid);
        ib.icst = 5;    // Type 5 Box-Shape
        ib.d1 = section.h;
        ib.d2 = section.t;
        ib.d3 = section.h;
        ib.d4 = section.t;
    } 

    else {WarningMessage('...Section type is not supported')}
        
    return ib;
}


function theBlueBookBeamSectionUpdate(m, mid, n1, n2, section){

    /*
    This functions calls functions above to update section of selected beam elements
    
    Setions are based on the BlueBook

    New part and section will be created if the section type does not exist, if
    exist, the existing part and section will be used


    Inputs:

        m: model id
        mid: material model id
        n1: start node number of beam element/s
        n2: end node number of beam element/s
        section: section selected from object "theBlueBookSectionDimensions", see definition above 
    
    Retunr: 
        pid: part id of the updated beams; either new or exisitng    
    */

    Message(">>> updating beam element section");
    Message(section.name)

    // [1] create a new beam part, if not matching exisiting beam part with the same section
    var pid = 0;
    var bs_flag = 0; // 0 as default, create new beam part, 1 for using existing part
    var parts_all = Part.GetAll(m);
    for (var p of parts_all){

        // Message([p.heading, section.name])

        if (p.heading == section.name){
            // use existing part, section and beam integration
            // directly assign beam elements to new pid
            bs_flag = 0;
            pid = p.pid;

            break
        }
        else {
            // create new beam part, section and beam integration
            bs_flag = 1;
            pid = Part.NextFreeLabel(m)
        }
    }

    if(bs_flag == 0){

        // use existing part, section and beam integration
        // directly assign beam elements to new pid
        Message(["... Existing beam section, pid = " + pid]);
        var beams = getBeamElementsByNodes(m, n1, n2).beam;
        for (var bnum of beams){
            var bm = Beam.GetFromID(m, bnum);
            // bm.Sketch();
            bm.pid = pid;
        }

    } else if (bs_flag == 1){
        
        // create new beam part, section and beam integration
        Message(["... New beam section, pid = " + pid]);

        var ib = theBlueBookIntegrnBeam(m, IntegrationBeam.NextFreeLabel(m), section)								
        var bsec = new Section(m, ib.irid, Section.BEAM);
        bsec.elform = 1;
        bsec.qr = -ib.irid;
        bsec.cst = 2.0;
        bsec.title = section.name;
        var pt = new Part(m, ib.irid, bsec.secid, mid, section.name);

        var beams = getBeamElementsByNodes(m, n1, n2).beam;
        for (var bnum of beams){
            var bm = Beam.GetFromID(m, bnum);
            // bm.Sketch();
            bm.pid = pt.pid;
        }

    } 
    return pid;
}
