declare class Colour {
/**
 * Creates a colour from red, green and blue components
 * @param red red component of colour (0-255).
 * @param green green component of colour (0-255).
 * @param blue blue component of colour (0-255).
 */
    static RGB(red: number, green: number, blue: number): number;

/** Colour black */
    static BLACK: number;
/** Colour blue */
    static BLUE: number;
/** Colour cyan */
    static CYAN: number;
/** Colour dark orange */
    static DARK_ORANGE: number;
/** Default colour for objects */
    static DEFAULT: number;
/** Colour green */
    static GREEN: number;
/** Colour green/cyan */
    static GREEN_CYAN: number;
/** Colour grey */
    static GREY: number;
/** Colour light blue */
    static LIGHT_BLUE: number;
/** Colour magenta */
    static MAGENTA: number;
/** Colour medium blue */
    static MEDIUM_BLUE: number;
/** Colour orange */
    static ORANGE: number;
/** Colour red */
    static RED: number;
/** Colour red/magenta */
    static RED_MAGENTA: number;
/** Colour white */
    static WHITE: number;
/** Colour yellow */
    static YELLOW: number;
/** Colour yellow/green */
    static YELLOW_GREEN: number;
}


/** Object returned by GetElemsInPly */
interface GetElemsInPlyReturn {
    /** Number of elements in list */
    nn: number;
    /** Internal element ids */
    top: number[];
    /** Element type code */
    type: number;
}


/** Object returned by GetPlysInLayup */
interface GetPlysInLayupReturn {
    /** Array of internal ply indices */
    list: number[];
    /** Number of plys in list */
    nn: number;
}

/**
 * Returns an object containing the number of elements in ply &lt;ply_id&gt;, the element type code, and also an array &lt;list[ ]&gt; of their internal indices. If there are no elements in the ply then false is returned. Ply data is only available if a .ztf file containing composite information has been read.
 * @param ply_id The ply in which to return the list of elements. If +ve, the internal ply number starting at 1. If -ve, the external ply label. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetElemsInPly(ply_id: number, state_id?: number): GetElemsInPlyReturn;

/**
 * Return the integration point of &lt;type/item&gt; in ply &lt;ply_id&gt;. If the &gt;type/item&lt; is not in the ply then false is returned. Ply data is only available if a .ztf file containing composite information has been read.
 * @param type_code A valid element type code (Currently only SHELL is valid)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param ply_id If +ve, the internal ply index. If -ve, the external ply label. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetPlyIntPoint(type_code: number, item: number, ply_id: number, state_id?: number): number;

/**
 * Returns an object containing the number of plys in layup &lt;layup_id&gt; and an array &lt;list[ ]&gt; of their internal indices. If there are no plys in the layup then false is returned. Ply data is only available if a .ztf file containing composite information has been read.
 * @param layup_id The layup in which to return the list of plys. If +ve an internal layup index, if -ve an external layup label
 * @param state_id State number to be used instead of the current state
 */
declare function GetPlysInLayup(layup_id: number, state_id?: number): GetPlysInLayupReturn;


/** Object returned by GetSegmsInSurface */
interface GetSegmsInSurfaceReturn {
    /** End index of master surface segments */
    ms_end: number;
    /** Start index of master surface segments */
    ms_start: number;
    /** End index of slave surface segments */
    ss_end: number;
    /** Start index of slave surface segments */
    ss_start: number;
}

/**
 * Returns the start and end indices of the slave and master segments in a contact surface
 * @param surface_id The contact surface in which to return the list of segments. If +ve, the internal surface number starting at 1. If -ve, the external surface label. Internal numbers will be many times faster to process.
 */
declare function GetSegmsInSurface(surface_id: number): GetSegmsInSurfaceReturn;

/**
 * Spools through the nodes on a contact surface
 * @param surface_id The contact surface in which to spool. If +ve, the internal surface number starting at 1. If -ve, the external surface label. Internal numbers will be many times faster to process.
 * @param index Index of node to get in contact surface. To setup the spool, this has to be set to zero initially
 * @param side The side of the contact surface: SLAVE or MASTER
 */
declare function SpoolNodesInSurface(surface_id: number, index: number, side: number): number;

/** Master side on contact surface */
declare var MASTER: number;
/** Slave side on contact surface */
declare var SLAVE: number;

/** Object returned by GetCutCoords */
interface GetCutCoordsReturn {
    /** Number of places the cut-section cuts the item */
    n: number;
    /** X coordinates where item is cut */
    x: number[];
    /** Y coordinates where item is cut */
    y: number[];
    /** Z coordinates where item is cut */
    z: number[];
}


/** Object returned by GetCutForces */
interface GetCutForcesReturn {
    /** Cut section area */
    area: number;
    /** Cut section centroid, [Cx, Cy, Cz] */
    centroid: number[];
    /** 3 Forces, [Fx, Fy, Fz] */
    force: number[];
    /** 3 Moments, [Mxx, Myy, Mzz] */
    moment: number[];
}


/** Object returned by GetCutSection */
interface GetCutSectionReturn {
    /** One of OR_AND_V, CONST_X, CONST_Y, CONST_Z, N3, LS_DYNA or zero if no section has been defined yet */
    definition: number;
    /** ON if the section follows N1 or N3 as appropriate, OFF if it does not. This value is only meaningful for definition == CONST_X/Y/Z where a &lt;node_id&gt; was supplied, and N3 */
    follow_n: number;
    /** For definition = CONST_X/Y/Z: nodes[0] = index of node if supplied For definition = N3: nodes[0 to 2] = indices of three N3 nodes This array will always be present and have three entries, withunused entries being set to zero. */
    nodes: number[];
    /** Origin coordinates */
    origin: number[];
    /** Either BASIC, DEFORMED or SCREEN */
    space: number;
    /** Either OFF or ON */
    status: number;
    /** Local X axis vector (normalised) */
    x_axis: number[];
    /** Local Y axis vector (normalised) */
    y_axis: number[];
    /** Local Z axis vector (normalised) */
    z_axis: number[];
}

/**
 * Returns the coordinates where the cut-section cuts through element &lt;type/item&gt;.
 * @param type_code A valid type code (SHELL etc.))
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param state_id State number to be used instead of the current state
 */
declare function GetCutCoords(type_code: number, item: number, state_id?: number): GetCutCoordsReturn;

/**
 * Returns the forces, moments, centroid and area of the cut section in &lt;window_id&gt;. The coordinate system of these results depends upon the cut section's space system as follows:  BASIC space: Forces are moments are always returned in the global axis system, about the geometrical centre of the cut elements at the given state. Therefore the effective origin is likely to change as the model deforms. (This is the method used by LS-DYNA)  DEFORMED space: Forces and moments are returned in the plane local axis system, about the current section origin. The origin and axes will remain fixed as the model deforms unless one of the "section follows node(s)" options has been used. SCREEN space: Forces and moments are also returned in the plane local axis system. This space system is not suitable for computing results since these will change as the user updates the view, and therefore its use in this context is strongly deprecated.  WARNING #1: Cut-sections in D3PLOT are a "per window" attribute, cutting all models in a window at the current "frame". If the optional &lt;state_id&gt; argument is not supplied the forces and moments returned will be at the state of the current "frame" of the window, and while this will normally be the same as the current "state" this is not necessarily the case, since the user may have interpolated results by time Likewise if the optional &lt;model_id&gt; argument is not supplied then the model used will be the first in the window (as reported by function GetWindowModels()), which may not be the same as the "current model" of the JavaScript interface. Therefore to avoid ambiguity when extracting cut-section forces and moments it is recommended that:  The window being used should only contain a single model The window should be set up to display all states without interpolation, thus &lt;state id&gt; == &lt;frame id&gt;. (This is the default for windows.)  This "single model in a window" approach is strongly recommended in this context since visual feedback will then match computed values. WARNING #2: By default computed forces do NOT include blanked elements. Since cut section display is primarily intended to be used interactively the default behaviour is to omit blanked elements from the forceand moment calculation, since in this way the reported values match what is visible on the screen. This behaviour is not ideal for batch processing since the user can, by manipulating blanking, change the results which are computed. Therefore the optional argument &lt;include_blanked&gt; may be used to override this behaviour and to force blanked elements to be considered. If omitted, or set to zero, then the default behaviour of omitting blanked elements will continue. WARNING #3: Cutting a model exactly at mesh lines can result in ill-conditioned force and moment calculation. It is tempting to define cut planes at nodes since this is easy to do, however this can give rise to ill-conditioning in a rectilinear mesh since the cut may lie exactly on the border between two adjacent elements and therefore won't "know" which one's results to use. Since LS-DYNA elements are constant stress there can be a step change in data values at element borders, and moving the cut plane by a tiny amount can result in a correspondingly large change in cut force and moment values.  It is strongly recommended that cut section definitions used for force and moment extraction should be located away from mesh lines so that they cut elements near their centres, thus avoiding any ambiguity about which elements to use. WARNING #4: Any element types or parts excluded from the cut section are still included in the force and moment calculation.
 * @param window_id A valid window id
 * @param include_blanked 0 to omit blanked elements (default), 1 to include them
 * @param part_id 0 all part ids considered (default), otherwise only forces in the specified part are computed. If +ve this is the internal part index, if -ve this is the external part label.
 * @param state_id State number to be used. If omitted the state of the window's current frame will be used.
 * @param model_id Model id that exists in &lt;window_id&gt;. If omitted the first model in the window will be used.
 */
declare function GetCutForces(window_id: number, include_blanked?: number, part_id?: number, state_id?: number, model_id?: number): GetCutForcesReturn;

/**
 * Retrieves all attributes of the cut section in &lt;window_id&gt;
 * @param window_id A valid window id
 * @param state_id State number to be used. If omitted the state of the window's current frame will be used. This only matters if the section uses N1 or N3 methods and it has been set to follow nodes with FOLLOW_N. In which case the section origin and/or vectors may change as the node(s) move.
 * @param model_id A valid model id that exists in &lt;window_id&gt;. If omitted the state of the window's current frame will be used. This only matters if the section uses N1 or N3 methods and it has been set to follow nodes with FOLLOW_N. In which case the section origin and/or vectors may change as the node(s) move.
 */
declare function GetCutSection(window_id: number, state_id?: number, model_id?: number): GetCutSectionReturn;

/**
 * Sets an attribute of the cut section in &lt;window_id&gt; Each D3PLOT window has a single cut-section which, by default, is not active. Its location, orientation and type can be defined here, and it can be turned on or off. Forces and moments from the cut-section can be obtained from function GetCutForces(). Cut section definitions are a "per window" attribute that apply to all models in the window. Thefore if the window has multiple models, and nodes are used to define the section (N1 or N3), the origin and/or vectors of the section may vary for each model in the window. In addition if the coordinates of these nodes are "followed" (FOLLOW_N), then the section locations may change from state to state.
 * @param window_id A valid window id or ALL for all active windows
 * @param attribute Can be one of STATUS, SPACE, OR_AND_V, CONST_X, CONST_Y, CONST_Z, N3, LS_DYNA, FOLLOW_N,
 * @param value The value of the specified &lt;attribute&gt;  STATUS: OFF or ON (default OFF). Determines whether or not the cut section is active in the current window. The section does not have to be active in order to compute cut forces and moments. SPACE: BASIC, DEFORMED (default) or SCREEN (not recommended). Determines whether the section is Lagrangian (BASIC) or Eulerian (DEFORMED). In the BASIC case the section is tied to the undeformed geometry and will move and distort as the model deforms, in the DEFORMED case the section is fixed in model space and the structure passes through it. For compatibility with LS_DYNA the way forces are calculated also varies with section space - see the documentation on GetCutForces(). FOLLOW_N: OFF or ON (default OFF). Determines whether or not a DEFORMED space section will track the motion of the node(s) used to define it. This is only meaningful for sections defined by:  N3. The motion of all three nodes will update the origin and axes at each state. CONST_X, CONST_Y or CONST_Z where a node has been used to define the origin. The node motion will update the section origin at each state, but its axes will remain constant.    The section can be defined by any of the following:  OR_AND_V: An array of 9 numbers in three triplets: &lt;origin coordinate&gt;, &lt;X axis vector&gt;, &lt;XY plane vector&gt;. Local Z is obtained from X cross XY. CONST_X: A coordinate array or node id. The plane will be aligned with the X axis with its origin either at the explicit coordinate (array) &lt;coord[3]&gt;, or at the coordinate of node (integer) &lt;node_id&gt;.  CONST_Y: A coordinate array or node id. The plane will be aligned with the Y axis with its origin either at the explicit coordinate (array) &lt;coord[3]&gt;, or at the coordinate of node (integer) &lt;node_id&gt;.  CONST_Z: A coordinate array or node id. The plane will be aligned with the Z axis with its origin either at the explicit coordinate (array) &lt;coord[3]&gt;, or at the coordinate of node (integer) &lt;node_id&gt;.  N3: An array of 3 integer node ids. Node 1 is the origin, N1N2 is the local X vector and N1N3 defines the local XY plane. Local Z is obtained from N1N2 cross N1N3. +ve for internal indices, -ve for labels. LS_DYNA: An array of 9 numbers in three triplets: &lt;Normal tail coord (origin)&gt;, &lt;Normal head coord&gt;, &lt;X axis head coord&gt;. Local Z and local X are obtained directly, and local Y from Z cross X.  All coordinates and vectors must be defined in model space, and will always form an orthogonal right handed coordinate system in which local Z is normal to the cut plane. Vector length is irrelevant (but should be well-conditioned), and the Y axis is obtained automatically from the vector cross product Z_AXIS x X_AXIS. If the Z and X axes as supplied are not at right angles the X will be updated to make it orthogonal to Y and Z. The most recent of N1, N3 or ORIGIN will define the cut section origin coordinate. The most recent of N3, or ORIGIN/ X_AXIS / Z_AXIS will define the section orientation. Care must be taken when defining nodes for windows that contain multiple models. Since a node index (+ve) may resolve to a different node in each model it is usually best to use external labels (-ve) in this context to avoid ambiguity. (The speed of the external =&gt; internal lookup will not matter as this function is unlikely to be called many times.) FOLLOW_N(odes) will only have an effect if N1 or N3 were the most recently defined sources of origin and orientation.
 */
declare function SetCutSection(window_id: number, attribute: number, value: number | number[] | number[]): boolean;

/** Basic (eulerian) space */
declare var BASIC: number;
/** Constant X definition method */
declare var CONST_X: number;
/** Constant Y definition method */
declare var CONST_Y: number;
/** Constant Z definition method */
declare var CONST_Z: number;
/** Deformed (lagrangian) space */
declare var DEFORMED: number;
/** "Section follows nodes" flag */
declare var FOLLOW_N: number;
/** LS-DYNA definition method */
declare var LS_DYNA: number;
/** 3 nodes definition method */
declare var N3: number;
/** Origin and vectors definition method */
declare var OR_AND_V: number;
/** Screen space */
declare var SCREEN: number;
/** Space system call argument */
declare var SPACE: number;

/** Object function argument in GetData */
interface GetDataArgument_int_pt {
    /** Through thickness integration point */
    ip: number;
    /** On plan integration point. Defaults to the first one. */
    op?: number;
}


/** Object returned by GetMultipleData */
interface GetMultipleDataReturn {
    /**  data[#rows] for data components that return a scalar value, eg DX data[#cols][#rows] for data components that return a vector or tensor value, eg UNOV  Take care when dealing with the two-dimensional array of results returned by the vector and tensor component cases, as the order in which the data is stored is [column][row]. For example if you have a tensor component then in order to extract the XY shear term for index you need to write:   r = GetMultipleData(args...) shear_term = r.data[XY][index];  Also remember that the rows in this array start at index 0, thus the results for item_1 will be row index [0] in the array of results returned, and so on. */
    data: number[];
    /** The number of columns of data. 1 for scalar components, 3 for vector, 6 for tensor */
    nc: number;
    /** The number of rows of data, ie how many items processed in the range &lt;item_1 .. item_2&gt; */
    nr: number;
}


/** Object function argument in GetMultipleData */
interface GetMultipleDataArgument_int_pt {
    /** Through thickness integration point */
    ip: number;
    /** On plan integration point. Defaults to the first one. */
    op?: number;
}

/**
 * Returns the data for &lt;component&gt; of type &lt;type_code&gt; for the single &lt;item&gt; WARNING: If the function arguments are grammatically correct but the requested data component is not present in the database, then 1, 3 or 6 zeros are returned as required, and no warning message is output. Therefore it is good practice to use function QueryDataPresent() to check that an optional data component is actually present in a database before attempting to extract its values. NOTE: to return the same data for a range of items it will be much faster to call the GetMultipleData() variant of this function, described below.  In other words instead of something like this, calling GetData()for each item individually:  for(item=item_1; item&lt;=item_2; item++) { result = GetData(component, type, item, ...); }  You can write the following to extract data into an array of results using a single call to GetMultipleData():  result = GetMultipleData(component, type, item_1, item_2, ...);  This reduces the time taken to extract data by a factor nearly equal to #items, and for a large model this can give a dramatic speed increase.
 * @param component A valid component code (e.g. DX, SXY)
 * @param type_code A valid element type code (e.g. SOLID, SHELL)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param int_pt This may be one of three types:  A +ve integer that is an integration point id One of the types TOP, MIDDLE or BOTTOM for shell surfaces only An object defining both through-thickness and on-plan integration points for fully integrated shells.  Integration points are only meaningful for some element type / data component combinations:  Shells and Tshells: Stress and strain tensors; Plastic strain; "Extra" data (if written) Solids: All data components if NINTSLD on the database extent binary card is 8 Beams: 3 Stresses and 2 strains in non-resultant beam types if BEAMIP on the database extent binary card is &gt; 0  This has become a complex data field, please see the separate section on Defining the Integration point argument below. Where the integration point is not relevant this argument may be omitted. Use zero to define a null "padding" argument
 * @param extra  The "Extra" solid or shell component id for components SOX or SHX The ALE mulit-material group id for components AMMG and AMMS The sub-number for user-defined components UNOS, UNOV, USSS, USST, UBMS, UBMV  Use zero to define a null "padding" argument if this is not required
 * @param fr_of_ref The frame of reference to return values in GLOBAL, LOCAL, CYLINDRICAL, USER_DEFINED, MATERIAL. This is only necessary for directional components (eg X stress) and then only when something other than the default GLOBAL coordinate system is to be used. If omitted, or set to zero, it defaults to GLOBAL for directional components and is ignore for all others.
 * @param state_id State number to be used instead of the current state
 * @param dda Direct Disk Access flag. Either OFF (default) for normal data cacheing or ON to enable direct disk reading of data. If turned on this reads data not currently in core memory directly from disk without loading the complete data vector for the state into core. This should be used if you want to extract results for a few items over a range of states, since it will potentially be faster.
 * @param consider_blanking Consider blanking flag. Either OFF (default) to ignore blanking or ON to consider blanking. This argument is relevant for nodal contact force results. By default the sum of all forces at a given node for all surfaces using that node will be returned. By blanking all but the contact surface(s) of interest and setting this argument to ON the results can be restricted to the contact surface(s) you want.
 * @param mag_or_cur Magnitude or Current Value flag. This argument is relevant for analyses with phase angle results. Set it to MAGNITUDE to output the magnitude Set it to CURRENT_VAL to output the current value [Magniude * cos(phase + phi)]. This is dependent on the current phi angle displayed in the graphics window and can be set using SetWindowFrame(). See example below. If omitted, or set to zero, it defaults to MAGNITUDE.
 */
declare function GetData(component: number, type_code: number, item: number, int_pt?: GetDataArgument_int_pt|number, extra?: number, fr_of_ref?: number, state_id?: number, dda?: number, consider_blanking?: number, mag_or_cur?: number): number | number[];

/**
 * Returns the data for &lt;component&gt; of type &lt;type_code&gt; for the range of items &lt;item1 .. item2&gt; WARNING #1: If the function arguments are grammatically correct but the requested data component is not present in the database, then 1, 3 or 6 zeros are returned as required, and no warning message is output. Therefore it is good practice to use function QueryDataPresent() to check that an optional data component is actually present in a database before attempting to extract its values. WARNING #2: It is possible to extract vary large quantities of data using a single call of this function. Bear in mind that JavaScript representations of values are quite bloated, for example all "numbers"are 64 bit (8 byte) floating double format, and the language imposes further overheads because of the way it organises data. For large models it may be necessary to extract large blocks of data in several smaller chunks, rather than one big one. WARNING #3: The data return value from this function is an array of length #rows, and the subscripts of this array start at row 0. In other words the result for item_1 in the call below will be returned in results array row data[0]. When extracting results for all items of a type, for example all shells in a model, item_1 will typically be 1, and it is easy to make the mistake of expecting this to be in results array row data[1]. In addition when you extract data for vector or tensor data the result will be a two-dimensional array, aligned data[#cols][#rows]. See the examples at the bottom of this description for more information about using two-dimensional arrays. 
 * @param component A valid component code (e.g. DX, SXY)
 * @param type_code A valid element type code (e.g. SOLID, SHELL)
 * @param item_1 If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param item_2 If +ve, the internal item number starting at 1. If -ve, the external label of the item. Must have the same sign as item_1, so both must be +ve or -ve. It is legal for it to be the same as item_1, in which case only values for a single item will be extracted.
 * @param int_pt This may be one of three types:  A +ve integer that is an integration point id One of the types TOP, MIDDLE or BOTTOM for shell surfaces only An object defining both through-thickness and on-plan integration points for fully integrated shells.  Integration points are only meaningful for some element type / data component combinations:  Shells and Tshells: Stress and strain tensors; Plastic strain; "Extra" data (if written) Solids: All data components if NINTSLD on the database extent binary card is 8 Beams: 3 Stresses and 2 strains in non-resultant beam types if BEAMIP on the database extent binary card is &gt; 0  This has become a complex data field, please see the separate section on Defining the Integration point argument below. Where the integration point is not relevant this argument may be omitted. Use zero to define a null "padding" argument
 * @param extra  The "Extra" solid or shell component id for components SOX or SHX The ALE mulit-material group id for components AMMG and AMMS The sub-number for user-defined components UNOS, UNOV, USSS, USST, UBMS, UBMV  Use zero to define a null "padding" argument if this is not required
 * @param fr_of_ref The frame of reference to return values in GLOBAL, LOCAL, CYLINDRICAL, USER_DEFINED, MATERIAL. This is only necessary for directional components (eg X stress) and then only when something other than the default GLOBAL coordinate system is to be used. If omitted, or set to zero, it defaults to GLOBAL for directional components and is ignore for all others.
 * @param state_id State number to be used instead of the current state
 * @param dda Direct Disk Access flag. Either OFF (default) for normal data cacheing or ON to enable direct disk reading of data. If turned on this reads data not currently in core memory directly from disk without loading the complete data vector for the state into core. This should be used if you want to extract results for a few items over a range of states, since it will potentially be faster.
 * @param consider_blanking Consider blanking flag. Either OFF (default) to ignore blanking or ON to consider blanking. This argument is relevant for nodal contact force results. By default the sum of all forces at a given node for all surfaces using that node will be returned. By blanking all but the contact surface(s) of interest and setting this argument to ON the results can be restricted to the contact surface(s) you want.
 * @param mag_or_cur Magnitude or Current Value flag. This argument is relevant for analyses with phase angle results. Set it to MAGNITUDE to output the magnitude Set it to CURRENT_VAL to output the current value [Magniude * cos(phase + phi)]. This is dependent on the current phi angle displayed in the graphics window and can be set using SetWindowFrame(). See example below. If omitted, or set to zero, it defaults to MAGNITUDE.
 */
declare function GetMultipleData(component: number, type_code: number, item_1: number, item_2: number, int_pt?: GetMultipleDataArgument_int_pt|number, extra?: number, fr_of_ref?: number, state_id?: number, dda?: number, consider_blanking?: number, mag_or_cur?: number): GetMultipleDataReturn;

/**
 * Returns the number of on plan points in an element in the current model
 * @param type_code A type code (either SHELL or TSHELL)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param state_id The state to use instead of the current state. Only necessary in adaptively remeshed analyses.
 */
declare function GetNumOnPlanIntPts(type_code: number, item: number, state_id?: number): number;

/**
 * Returns the number of items of type_code in the current model Note that in adaptively remeshed models the current family may affect the number of nodes and elements returned. The family of the current state will be used unless you supply the optional state_id argument, in which case the family of that state will be used. Notes: The number of models returned by GetNumberOf(MODEL) is actually the number of active and inactive model "slots" in the database, including those currently not in use. This means that it will always return the highest model number that has been used to date. Therefore the following sequence:  Read in (say) three models M1 to M3 Delete models M1 and M2, leaving only M3 in use   Will result in GetNumberOf(MODEL) returning the value 3. You can use SetCurrentModel(model_id) to attempt to set a model and examine its return value to see whether it succeeded or failed:  n = GetNumberOf(MODEL); for(i=1; i&lt;=n; i++) { if(SetCurrentModel(i)) // TRUE if present { do something } } 
 * @param type_code A valid type code or a 'GetNumberOf' constant
 * @param state_id The state to use instead of the current state. Only necessary in adaptively remeshed analyses.
 */
declare function GetNumberOf(type_code: number, state_id?: number): number;

/**
 * Returns true if data &lt;component&gt; is present in the current model's database, otherwise false. For some data components that are switchable the &lt;type_code&gt; must also be supplied, these are listed below.
 * @param component A valid component code (e.g. DX, SXY)
 * @param type_code One of the type codes SOLID, SHELL or TSHELL if the component is:  Stress tensor derived, e.g. SXX, ... SVON Strain tensor derived, e.g. EXX, ... EVON Effective plastic strain, EPL Strain rate, ERATE 
 */
declare function QueryDataPresent(component: number, type_code?: number): boolean;

/** Current value result */
declare var CURRENT_VAL: number;
/** Cylindrical coordinate system */
declare var CYLINDRICAL: number;
/** Number of families */
declare var FAMILY: number;
/** Global coordinate system */
declare var GLOBAL: number;
/** Number of groups */
declare var GROUP: number;
/** Number of includes */
declare var INCLUDE: number;
/** Element local coordinate system */
declare var LOCAL: number;
/** Magnitude result */
declare var MAGNITUDE: number;
/** Material axes coordinate system */
declare var MATERIAL: number;
/** Number of models */
declare var MODEL: number;
/** Number of "Extra" Solid variables */
declare var NEIPH: number;
/** Number of "Extra" Shell variables */
declare var NEIPS: number;
/** Number of "Extra" Thick Shell variables */
declare var NEIPT: number;
/** Number of Beam integration points */
declare var NIP_B: number;
/** Number of Solid integration points */
declare var NIP_H: number;
/** Number of Shell integration points */
declare var NIP_S: number;
/** Number of Thick Shell integration points */
declare var NIP_T: number;
/** Number of on-plan integration points written */
declare var N_ON_PLANE: number;
/** Number of user-defined beam scalar components */
declare var N_UBMS: number;
/** Number of user-defined beam vector components */
declare var N_UBMV: number;
/** Number of user-defined node scalar components */
declare var N_UNOS: number;
/** Number of user-defined node vector components */
declare var N_UNOV: number;
/** Number of user-defined solid/shell scalar components */
declare var N_USSS: number;
/** Number of user-defined solid/shell tensor components */
declare var N_USST: number;
/** Number of states */
declare var STATE: number;
/** Number of user-defined components */
declare var USER: number;
/** User-defined coordinate system */
declare var USER_DEFINED: number;
/** ALE denisty */
declare var ADENS: number;
/** ALE dominant fraction */
declare var ADMOF: number;
/** Acceleration magnitude */
declare var AM: number;
/** ALE multi-material group id */
declare var AMMG: number;
/** ALE multi-material group mass */
declare var AMMS: number;
/** Area */
declare var AREA: number;
/** Acceleration vector [AX, AY, AZ] */
declare var AV: number;
/** X acceleration */
declare var AX: number;
/** Y acceleration */
declare var AY: number;
/** Z acceleration */
declare var AZ: number;
/** Axial energy density */
declare var BAED: number;
/** Axial energy */
declare var BAEN: number;
/** Bending energy density */
declare var BBED: number;
/** Axial strain */
declare var BEAX: number;
/** Energy loss */
declare var BENL: number;
/** Energy loss density */
declare var BENLD: number;
/** Energy loss percentage */
declare var BENLP: number;
/** Effective plastic strain */
declare var BEP: number;
/** Force and moment vector [BFX, BFY, BFZ, BMXX, BMYY, BMZZ] */
declare var BFMV: number;
/** Force magnitude */
declare var BFR: number;
/** X axial force */
declare var BFX: number;
/** Y axial force */
declare var BFY: number;
/** Z axial force */
declare var BFZ: number;
/** Internal energy */
declare var BIE: number;
/** Internal energy density */
declare var BIED: number;
/** Kinetic energy */
declare var BKEN: number;
/** Kinetic energy density */
declare var BKEND: number;
/** Kinetic energy percentage */
declare var BKENP: number;
/** XX torsional moment */
declare var BMXX: number;
/** Y moment at end 1 */
declare var BMY1: number;
/** Y moment at end 2 */
declare var BMY2: number;
/** YY bending moment */
declare var BMYY: number;
/** Z moment at end 1 */
declare var BMZ1: number;
/** Z moment at end 2 */
declare var BMZ2: number;
/** ZZ bending moment */
declare var BMZZ: number;
/** Plastic energy at end 1 */
declare var BPE1: number;
/** Plastic energy at end 2 */
declare var BPE2: number;
/** Moment magnitude */
declare var BRM: number;
/** Torsional rotation */
declare var BRXX: number;
/** Y rotation at end 1 */
declare var BRY1: number;
/** Y rotation at end 2 */
declare var BRY2: number;
/** Z rotation at end 1 */
declare var BRZ1: number;
/** Z rotation at end 2 */
declare var BRZ2: number;
/** Total axial strain */
declare var BSAX: number;
/** Strain energy */
declare var BSEN: number;
/** Strain energy density */
declare var BSEND: number;
/** Strain energy percentage */
declare var BSENP: number;
/** Axial stress */
declare var BSXX: number;
/** XY shear stress */
declare var BSYX: number;
/** XY shear stress */
declare var BSXY: number;
/** XZ shear stress */
declare var BSZX: number;
/** XZ shear stress */
declare var BSXZ: number;
/** Basic (undeformed) vector [BX, BY, BZ] */
declare var BV: number;
/** Basic (undeformed) X coordinate */
declare var BX: number;
/** Basic (undeformed) Y coordinate */
declare var BY: number;
/** Basic (undeformed) Z coordinate */
declare var BZ: number;
/** Contact segment area */
declare var CAREA: number;
/** Contact global X force */
declare var CFGX: number;
/** Contact global Y force */
declare var CFGY: number;
/** Contact global Z force */
declare var CFGZ: number;
/** Contact local X force */
declare var CFLX: number;
/** Contact local Y force */
declare var CFLY: number;
/** Contact local Z force */
declare var CFLZ: number;
/** Contact force magnitude */
declare var CFM: number;
/** Contact normal stress */
declare var CSN: number;
/** Contact tangential stress */
declare var CST: number;
/** Contact local X stress */
declare var CSX: number;
/** Contact local Y stress */
declare var CSY: number;
/** Current vector [CX, CY, CZ] */
declare var CV: number;
/** Current X coordinate */
declare var CX: number;
/** Current Y coordinate */
declare var CY: number;
/** Current Z coordinate */
declare var CZ: number;
/** Material density */
declare var DENS: number;
/** Displacement magnitude */
declare var DM: number;
/** dTemp / dTime */
declare var DTDT: number;
/** Displacement vector [DX, DY, DZ] */
declare var DV: number;
/** X displacement */
declare var DX: number;
/** Y displacement */
declare var DY: number;
/** Z displacement */
declare var DZ: number;
/** 2D (in-plane) max principal strain */
declare var E2MAX: number;
/** 2D (in-plane) min principal strain */
declare var E2MIN: number;
/** 2D (in-plane) max shear strain */
declare var E2SHEAR: number;
/** Average strain */
declare var EAV: number;
/** Internal energy density */
declare var EDEN: number;
/** Max prinicipal strain */
declare var EMAX: number;
/** Middle prinicipal strain */
declare var EMID: number;
/** Min prinicipal strain */
declare var EMIN: number;
/** Max shear strain */
declare var EMS: number;
/** Engineering Major strain */
declare var ENGMAJ: number;
/** Engineering Minor strain */
declare var ENGMIN: number;
/** Engineering Thickness strain */
declare var ENGTHK: number;
/** Energy loss (Nastran OP2 results only) */
declare var ENL: number;
/** Energy loss density (Nastran OP2 results only) */
declare var ENLD: number;
/** Energy loss percentage (Nastran OP2 results only) */
declare var ENLP: number;
/** Effective plastic strain */
declare var EPL: number;
/** Strain rate */
declare var ERATE: number;
/** 2D (in-plane) principal strain ratio */
declare var ERATIO: number;
/** Strain tensor [EXX, EYY, EZZ, EXY, EYZ, EZX] */
declare var ETEN: number;
/** von Mises strain */
declare var EVON: number;
/** X strain */
declare var EXX: number;
/** XY shear strain */
declare var EXY: number;
/** XY shear strain */
declare var EYX: number;
/** Y strain */
declare var EYY: number;
/** YZ shear strain */
declare var EYZ: number;
/** YZ shear strain */
declare var EZY: number;
/** ZX shear strain */
declare var EZX: number;
/** ZX shear strain */
declare var EXZ: number;
/** Z strain */
declare var EZZ: number;
/** Failure strain */
declare var FSTRN: number;
/** Internal energy */
declare var GIE: number;
/** Kinetic energy */
declare var GKE: number;
/** Mass */
declare var GMASS: number;
/** Momentum magnitude */
declare var GMM: number;
/** X Momentum */
declare var GMX: number;
/** Y Momentum */
declare var GMY: number;
/** Z Momentum */
declare var GMZ: number;
/** Total energy */
declare var GTE: number;
/** Velocity magnitude */
declare var GVM: number;
/** X Velocity */
declare var GVX: number;
/** Y Velocity */
declare var GVY: number;
/** Z Velocity */
declare var GVZ: number;
/** Hourglass energy */
declare var HGEN: number;
/** Kinetic energy (Nastran OP2 results only) */
declare var KEN: number;
/** Kinetic energy density (Nastran OP2 results only) */
declare var KEND: number;
/** Kinetic energy percentage (Nastran OP2 results only) */
declare var KENP: number;
/** Lode angle */
declare var LODE_A: number;
/** Lode parameter */
declare var LODE_P: number;
/** Added mass */
declare var MADD: number;
/** Mass */
declare var MASS: number;
/** Average plastic strain */
declare var PEAV: number;
/** Plastic strain magnitude */
declare var PEMAG: number;
/** Max principal plastic strain */
declare var PEMAX: number;
/** Middle principal plastic strain */
declare var PEMID: number;
/** Min principal plastic strain */
declare var PEMIN: number;
/** Max plastic shear strain */
declare var PEMS: number;
/** Plastic strain tensor [EXX, EYY, EZZ, EXY, EYZ, EZX] */
declare var PETEN: number;
/** X Plastic strain */
declare var PEXX: number;
/** XY Plastic shear strain */
declare var PEXY: number;
/** XY Plastic shear strain */
declare var PEYX: number;
/** Y Plastic strain */
declare var PEYY: number;
/** XY Plastic shear strain */
declare var PEYZ: number;
/** XY Plastic shear strain */
declare var PEZY: number;
/** ZX Plastic shear strain */
declare var PEZX: number;
/** ZX Plastic shear strain */
declare var PEXZ: number;
/** Z Plastic strain */
declare var PEZZ: number;
/** Poisson's ratio */
declare var PRAT: number;
/** Rotation acceleration magnitude */
declare var RAM: number;
/** Rotation acceleration vector [RAX, RAY, RAZ] */
declare var RAV: number;
/** X rotation acceleration */
declare var RAX: number;
/** Y rotation acceleration */
declare var RAY: number;
/** Z rotation acceleration */
declare var RAZ: number;
/** Rotation displacement magnitude */
declare var RDM: number;
/** Rotation displacement vector [RDX, RDY, RDZ] */
declare var RDV: number;
/** X rotation displacement */
declare var RDX: number;
/** Y rotation displacement */
declare var RDY: number;
/** Z rotation displacement */
declare var RDZ: number;
/** X force resultant */
declare var RFX: number;
/** XY force resultant */
declare var RFXY: number;
/** Y force resultant */
declare var RFY: number;
/** MX moment resultant */
declare var RMX: number;
/** MXY moment resultant */
declare var RMXY: number;
/** MY moment resultant */
declare var RMY: number;
/** XZ shear force resultant */
declare var RQX: number;
/** YZ shear force resultant */
declare var RQY: number;
/** Retractor force */
declare var RT_F: number;
/** Retractor pull-out */
declare var RT_P: number;
/** Rotation velocity magnitude */
declare var RVM: number;
/** Relative volume (solid) */
declare var RVOL: number;
/** Rotation velocity vector [RVX, RVY, RVZ] */
declare var RVV: number;
/** X rotation velocity */
declare var RVX: number;
/** Y rotation velocity */
declare var RVY: number;
/** Z rotation velocity */
declare var RVZ: number;
/** 2D (in-plane) max principal stress */
declare var S2MAX: number;
/** 2D (in-plane) min principal stress */
declare var S2MIN: number;
/** 2D (in-plane) max shear stress */
declare var S2SHEAR: number;
/** Average stress (pressure) */
declare var SAV: number;
/** Seatbelt axial force */
declare var SB_F: number;
/** Seatbelt length */
declare var SB_L: number;
/** Strain energy (Nastran OP2 results only) */
declare var SEN: number;
/** Strain energy density (Nastran OP2 results only) */
declare var SEND: number;
/** Strain energy percentage (Nastran OP2 results only) */
declare var SENP: number;
/** Extra shell and thick shell data */
declare var SHX: number;
/** Max principal stress */
declare var SMAX: number;
/** Middle principal stress */
declare var SMID: number;
/** Min principal stress */
declare var SMIN: number;
/** Max shear stress */
declare var SMS: number;
/** Extra solid data */
declare var SOX: number;
/** SPC force (vector data at nodes) */
declare var SPC_F: number;
/** SPC moment (vector data at nodes) */
declare var SPC_M: number;
/** Spring elongation */
declare var SP_E: number;
/** Spring axial force */
declare var SP_F: number;
/** Spring torsional moment */
declare var SP_M: number;
/** Spring rotation */
declare var SP_R: number;
/** Slipring pull-through */
declare var SR_P: number;
/** Stress tensor [SXX, SYY, SZZ, SXY, SYZ, SZX] */
declare var STEN: number;
/** von Mises stress */
declare var SVON: number;
/** Spotweld axial force */
declare var SW_F: number;
/** Spotweld failure */
declare var SW_FAIL: number;
/** Spotweld shear force */
declare var SW_S: number;
/** Spotweld failure time */
declare var SW_TIME: number;
/** Spotweld torsion moment */
declare var SW_TRSN: number;
/** X stress */
declare var SXX: number;
/** XY stress */
declare var SXY: number;
/** XY stress */
declare var SYX: number;
/** Y stress */
declare var SYY: number;
/** YZ stress */
declare var SYZ: number;
/** YZ stress */
declare var SZY: number;
/** ZX stress */
declare var SZX: number;
/** ZX stress */
declare var SXZ: number;
/** Z stress */
declare var SZZ: number;
/** Nodal (shell) bottom surface temperature */
declare var TBOT: number;
/** Average thermal strain */
declare var TEAV: number;
/** Max principal thermal strain */
declare var TEMAX: number;
/** Middle principal thermal strain */
declare var TEMID: number;
/** Min principal thermal strain */
declare var TEMIN: number;
/** Nodal temperature */
declare var TEMP: number;
/** Max thermal shear strain */
declare var TEMS: number;
/** Thermal strain tensor [EXX, EYY, EZZ, EXY, EYZ, EZX] */
declare var TETEN: number;
/** X Thermal strain */
declare var TEXX: number;
/** XY Thermal shear strain */
declare var TEXY: number;
/** XY Thermal shear strain */
declare var PEYX: number;
/** Y Thermal strain */
declare var TEYY: number;
/** XY Thermal shear strain */
declare var TEYZ: number;
/** XY Thermal shear strain */
declare var TEZY: number;
/** ZX Thermal shear strain */
declare var TEZX: number;
/** ZX Thermal shear strain */
declare var TEXZ: number;
/** Z Thermal strain */
declare var TEZZ: number;
/** Temperature magnitude */
declare var TFM: number;
/** Temperature vector [TFX, TFY, TFZ] */
declare var TFV: number;
/** X temperature flux */
declare var TFX: number;
/** Y temperature flux */
declare var TFY: number;
/** Z temperature flux */
declare var TFZ: number;
/** Thickness */
declare var THK: number;
/** Nodal (shell) middle surface temperature */
declare var TMID: number;
/** Triaxiality */
declare var TRI: number;
/** Timestep */
declare var TSTP: number;
/** Nodal (shell) top surface temperature */
declare var TTOP: number;
/** Velocity magnitude */
declare var VM: number;
/** Volume (solid) */
declare var VOL: number;
/** Velocity vector [VX, VY, VZ] */
declare var VV: number;
/** X velocity */
declare var VX: number;
/** Y velocity */
declare var VY: number;
/** Z velocity */
declare var VZ: number;
/** Database X-sect area */
declare var XSEC_A: number;
/** Database X-sect force (vector data) */
declare var XSEC_F: number;
/** Database X-sect moment (vector data) */
declare var XSEC_M: number;
/** Young's modulus */
declare var YMOD: number;
/** Yield stress */
declare var YSTRS: number;
/**
 * Executes one or more command-line syntax commands &lt;line_1&gt;, (&lt;line_2&gt;... &lt;line_n&gt;). There is no limit to the number of lines that may be specified in a single call. See Dialogue Command Syntax for a full list of command-line commands The DialogueInputNoEcho variant is identical, except that it suppresses the echo of the commands to the dialogue box. D3PLOT provides a full command-line syntax as an alternative to graphical user interface commands, and a sequence of such commands may be provided here. Note that:  Each call to DialogueInput starts at the top of the D3PLOT command-line "tree", at the D3PLOT_MANAGER&gt;&gt;&gt; prompt Each call is autonomous, there is no "memory" of where in the command-line tree previous commands finished. However within a single call the current command-line tree is remembered from one line to the next. Commands are not case-sensitive, although filenames and titles in command strings are.  Therefore commands which require more than one line of input to complete must be specified in a single call; and it makes sense to group a sequence of related commands together in a single call, although this is not mandatory. If this succeeds it returns true, otherwise false.
 * @param ...strings One or more commands to be executed as if they had been typed into the dialogue box.
 */
declare function DialogueInput(...strings: string[]): boolean;

/**
 * Executes one or more command-line syntax commands &lt;line_1&gt;, (&lt;line_2&gt;... &lt;line_n&gt;). There is no limit to the number of lines that may be specified in a single call. See Dialogue Command Syntax for a full list of command-line commands This does not echo the commands to the dialogue box. See DialogueInput for more information.
 * @param ...strings One or more commands to be executed as if they had been typed into the dialogue box.
 */
declare function DialogueInputNoEcho(...strings: string[]): boolean;


/** Object returned by GetElemsAtNode */
interface GetElemsAtNodeReturn {
    /** Number of elements in list */
    nn: number;
    /** Internal element ids */
    top: number[];
}


/** Object returned by GetElemsInPart */
interface GetElemsInPartReturn {
    /** Number of elements in list */
    nn: number;
    /** Internal element ids */
    top: number[];
    /** Element type code */
    type: number;
}


/** Object returned by GetTopology */
interface GetTopologyReturn {
    /** Number of nodes in topology list */
    nn: number;
    /** Internal part id for part-based elements, otherwise zero */
    pid: number;
    /** Internal node ids */
    top: number[];
}

/**
 * Returns the local axes of the element in model space, expressed as direction cosines in a 2d array
 * @param type_code A valid element type code (SOLID, BEAM, SHELL or TSHELL)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetElemAxes(type_code: number, item: number, state_id?: number): number[][];

/**
 * Returns the beta angle (in degrees) at either the ply id or integration point number on element &lt;item&gt; of &lt;type_code&gt; If &lt;ply_id&gt; is non-zero then &lt;int_pnt&gt; can be omitted or set to zero. If &lt;ply_id&gt; is zero then &lt;int_pnt&gt; must be defined and non-zero. When working with &lt;ply_id&gt; if the ply does not exist in the element, then false is returned. When working with &lt;int_pnt&gt; a value will always be returned, but this will be zero if no beta angle is defined for the element / int_pnt combination. Ply data is only available if a .ztf file containing composite information has been read.
 * @param type_code A valid element type code (Currently only SHELL is valid)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param ply_id If +ve, the internal ply index. If -ve, the external ply label. Internal numbers will be many times faster to process. Set to zero if &lt;int_pt&gt; is to be used instead.
 * @param int_pnt Integration point in the range 1 - maxint, required if &lt;ply_id&gt; is zero.
 * @param state_id State number to be used instead of the current state
 */
declare function GetElemBetaAngle(type_code: number, item: number, ply_id: number, int_pnt?: number, state_id?: number): number;

/**
 * Returns an object containing the number of elements of &lt;type&gt; at &lt;node&gt;, and also an array &lt;list[ ]&gt; of their internal indices. If there are no elements of &lt;type&gt; at the node then false is returned.
 * @param node The node at which to return the list of elements. If +ve, the internal node number starting at 1. If -ve, the external node label. Internal numbers will be many times faster to process.
 * @param type_code A valid element type code (SOLID etc.)
 * @param state_id State number to be used instead of the current state
 */
declare function GetElemsAtNode(node: number, type_code: number, state_id?: number): GetElemsAtNodeReturn;

/**
 * Returns an object containing the number of elements in part &lt;part_id&gt;, the element type code, and also an array &lt;list[ ]&gt; of their internal indices. If there are no elements in the part then false is returned.
 * @param part_id The part in which to return the list of elements. If +ve, the internal part number starting at 1. If -ve, the external part label. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetElemsInPart(part_id: number, state_id?: number): GetElemsInPartReturn;

/**
 * Returns the topology list for internal &lt;item&gt; of type &lt;type_code&gt;. This should only be used for element types which have nodal topologies.
 * @param type_code A valid element type code (SOLID etc.)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetTopology(type_code: number, item: number, state_id?: number): GetTopologyReturn;


/** Object function argument in Get */
interface GetArgument_options {
    /** Password */
    password?: string;
    /** If set to true, then the response code will be returned instead of true/false. This can be used to retieve error messages and codes when the file is not returned successfully. */
    response?: boolean;
    /** Username */
    username?: string;
}


/** Object function argument in Upload */
interface UploadArgument_options {
    /** Password */
    password?: string;
    /** Username */
    username?: string;
}

declare class File {
/**
 * Close a file opened by a File object.
 */
    Close(): void;

/**
 * Copies a file
 * @param source Source filename you want to copy.
 * @param dest Destination filename you want to copy source file to.
 */
    static Copy(source: string, dest: string): boolean;

/**
 * Deletes a file
 * @param filename Filename you want to delete.
 */
    static Delete(filename: string): boolean;

/**
 * Changes a filename or directory name to the correct format for a specific operating system using the directory mappings (if present)
 * @param filename Filename you want to drive map.
 * @param format The format for the file/directory name. Can be Include.NATIVE, Include.UNIX or Include.WINDOWS
 */
    static DriveMapFilename(filename: string, format: number): string;

/**
 * Check if a file exists. See also File.IsDirectory() and See also File.IsFile().
 * @param filename Filename you want to check for existance.
 */
    static Exists(filename: string): boolean;

/**
 * Find any files and/or directories in a directory.
 * @param directory Directory to look for files/directories in.
 * @param type Type of things to find. Can be bitwise OR of File.FILE and File.DIRECTORY. If omitted only files will be returned.
 */
    static FindFiles(directory: string, type?: number): string[];

/**
 * Reads a line from a file which contains contain, opened for reading by a File object. Although this is possible using core JavaScript functions this function should be significantly faster as most of the processing is done by Primer in C rather than in the JavaScript interpreter. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must contain that string. If more than one argument is used then lines which contain the string contain1 OR contain2 OR contain3 etc will be returned
 * @param contain1 String which matching lines must contain
 * @param contain2 alternative string which matching lines must contain
 * @param contain3 alternative string which matching lines must contain
 * @param ...vars_containn alternative string which matching lines must contain
 */
    FindLineContaining(contain1: string, contain2?: string, contain3?: string, ...vars_containn?: string[]): string;

/**
 * Reads a line from a file which starts with start, opened for reading by a File object. Although this is possible using core JavaScript functions this function should be significantly faster as most of the processing is done by Primer in C rather than in the JavaScript interpreter. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must start with that string. If more than one argument is used then lines which start with start1 OR start2 OR start3 etc will be returned
 * @param start1 String which matching lines must start with
 * @param start2 alternative string which matching lines must start with
 * @param start3 alternative string which matching lines must start with
 * @param ...vars_startn alternative string which matching lines must start with
 */
    FindLineStarting(start1: string, start2?: string, start3?: string, ...vars_startn?: string[]): string;

/**
 * Flushes a file opened for writing by a File object.
 */
    Flush(): void;

/**
 * Get a file from a remote location. See also File.Proxy(), File.ProxyPassword() and File.ProxyUsername().
 * @param url URL (uniform resource locator) of remote file you want to get. Currently http and ftp are supported. For http give the full address including the leading 'http://'. e.g. 'http://www.example.com/file.html'. For ftp an optional username and password can be given. e.g. 'ftp://ftp.example.com' retrieves the directory listing for the root directory. 'ftp://ftp.example.com/readme.txt' downloads the file readme.txt from the root directory. 'ftp://user:password@ftp.example.com/readme.txt' retrieves the readme.txt file from the user's home directory.
 * @param filename Filename you want to save the file to.
 * @param options Options for get. If 'username' and 'password' are set then basic authorization using the username and password will be used.
 */
    static Get(url: string, filename: string, options?: GetArgument_options): boolean;

/**
 * Check if a filename is absolute or relative.
 * @param filename Filename you want to check.
 */
    static IsAbsolute(filename: string): boolean;

/**
 * Check if a filename is a directory. See also File.Exists(), File.IsFile(), File.IsReadable() and File.IsWritable().
 * @param filename Filename you want to check.
 */
    static IsDirectory(filename: string): boolean;

/**
 * Check if a filename is a file. See also File.Exists(), File.IsDirectory(), File.IsReadable() and File.IsWritable().
 * @param filename Filename you want to check.
 */
    static IsFile(filename: string): boolean;

/**
 * Check if a filename has read permissions. See also File.Exists(), File.IsDirectory() and File.IsWritable().
 * @param filename Filename you want to check.
 */
    static IsReadable(filename: string): boolean;

/**
 * Check if a filename has write permissions. If filename exists and it is a file then it is checked to see if it can be opened with write (File.APPEND permissions). If filename exists and it is a directory then the directory is checked for write permission (can files be created in the directory). If filename does not exist then it is assumed to be a file and is checked to see if it can be opened for writing (File.WRITE permissions). See also File.Exists(), File.IsDirectory() and File.IsReadable().
 * @param filename Filename you want to check.
 */
    static IsWritable(filename: string): boolean;

/**
 * Make a directory. If Primer preference 'directory_permission' is set e.g.755 then this will apply (same as if set by chmod 755) ignoring any setting of umask. If there is no preference then the users current setting of umask will control permissions (same as system mkdir)
 * @param directory The name of the directory you want to create.
 */
    static Mkdir(directory: string): boolean;

/**
 * Make a temporary filename for writing a temporary file.
 */
    static Mktemp(): string;

/**
 * Set a proxy for files opened by http, ftp etc. See also File.Get(), File.ProxyPassword() and File.ProxyUsername().
 * @param name The name of the proxy.
 */
    static Proxy(name: string): void;

/**
 * Set a proxy password for files opened by http, ftp etc. See also File.Get(), File.Proxy() and File.ProxyUsername().
 * @param name Password for the proxy server.
 */
    static ProxyPassword(name: string): void;

/**
 * Set a proxy username for files opened by http, ftp etc. See also File.Get(), File.Proxy() and File.ProxyPassword().
 * @param username The username for the proxy.
 */
    static ProxyUsername(username: string): void;

/**
 * Reads all the remaining characters from a file opened for reading by a File object. As this function can read the entire file as a string be careful when reading large files as it will consume large amounts of memory.
 */
    ReadAll(): string;

/**
 * Reads binary data from a file opened for reading by a File object. The data is returned as an ArrayBuffer object. For more details on how to use an ArrayBuffer see the following links: https://developer.mozilla.org/en/JavaScript_typed_arrays https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBufferView https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView.
 * @param length Number of bytes to try to read from the file. If omitted all the remaining data from the file will be read.
 */
    ReadArrayBuffer(length?: number): ArrayBuffer;

/**
 * Reads a single character from a file opened for reading by a File object.
 */
    ReadChar(): string;

/**
 * Reads a line from a file opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length.
 */
    ReadLine(): string;

/**
 * Reads a line from a file opened for reading by a File object. The line can be any length. If your file has lines shorter than 512 characters then you may want to use ReadLine instead which is faster.
 */
    ReadLongLine(): string;

/**
 * Rename an existing file to have a different name.
 * @param oldname Existing filename you want to rename
 * @param newname New filename you want to rename to
 */
    static Rename(oldname: string, newname: string): boolean;

/**
 * Set the current position for reading or writing in a File object.
 * @param offset Offset to seek to in the file
 * @param origin Origin for offset. Must be one of File.START, File.END or File.CURRENT. If omitted File.START will be used.
 */
    Seek(offset: number, origin?: number): void;

/**
 * Return the size of a file in bytes
 * @param filename Filename you want the size of.
 */
    static Size(filename: string): number;

/**
 * Return the current file position for a File object. Note that on Windows when reading files if the file is not opened with File.BINARY this may not return the correct file position for files with unix line endings.
 */
    Tell(): number;

/**
 * Uploads a file to a remote location. See also File.Proxy(), File.ProxyPassword() and File.ProxyUsername().
 * @param filename Filename you want to upload.
 * @param url URL (uniform resource locator) of the remote location you want to upload the file to. Currently only http is supported. Give the full address including the leading 'http://'. e.g. 'http://www.example.com/file.html'.
 * @param options Options for upload. If both of these are set then basic authorization using the username and password will be used.
 */
    static Upload(filename: string, url: string, options?: UploadArgument_options): boolean;

/**
 * Write a string to a file opened for writing by a File object. Note that a carriage return is not added.
 * @param string The string/item that you want to write
 */
    Write(string: any): void;

/**
 * Writes binary data to a file opened for writing by a File object. The data to write is an ArrayBuffer object. For more details on how to use an ArrayBuffer see the following links: https://developer.mozilla.org/en/JavaScript_typed_arrays https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBufferView https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView.
 * @param buffer ArrayBuffer to write to file
 * @param length Number of bytes to write to the file. If omitted all the data in the ArrayBuffer will be written (buffer.byteLength bytes)
 */
    WriteArrayBuffer(buffer: ArrayBuffer, length?: number): void;

/**
 * Write a string to a file opened for writing by a File object adding a carriage return.
 * @param string The string/item that you want to write
 */
    Writeln(string: any): void;

/**
 * Create a new File object for reading and writing text files.
 * @param filename Filename of the file you want to read/write. If reading, the file must exist. If writing, the file will be overwritten (if it exists) if mode is File.WRITE, or if mode is File.APPEND it will be appended to if it exists, or created if it does not. When reading a file the filename can also be a URL (uniform resource locator) in which case the file will be read from the remote site. See File.Get() for more details on the format of the URL.
 * @param mode The mode to open the file with. Can be File.READ, File.WRITE or File.APPEND. For File.WRITE or File.APPEND it can also be ORed with File.BINARY if required. By default text is read and written as ASCII. To read/write text in utf-8 mode can also be ORed with File.UTF8 if required.
 */
    constructor(filename: string, mode: number);

/** Name of the file */
    readonly filename: string;
/** Mode the file was opened with (File.READ, File.WRITE etc) */
    readonly mode: number;
/** Flag to open file for appending */
    static APPEND: number;
/** Flag to open file in binary mode. This will have no effect on unix/linux but for windows if a file is opened for writing with binary mode \n will not be translated to \r\n (CRLF), it will be written as \n (LF) */
    static BINARY: number;
/** Seek relative to current file position */
    static CURRENT: number;
/** Find directories */
    static DIRECTORY: number;
/** Seek relative to end of the file */
    static END: number;
/** Find files */
    static FILE: number;
/** Flag to open file for reading */
    static READ: number;
/** Seek relative to start of the file */
    static START: number;
/** Flag to open file for reading as UTF-8 encoding. */
    static UTF8: number;
/** Flag to open file for writing */
    static WRITE: number;
}


/** Object returned by GetGroupInfo */
interface GetGroupInfoReturn {
    /** The label of the group */
    label: number;
    /** The name of the group */
    name: string;
}

/**
 * Returns information about a group in the current model
 * @param group_id Group number
 */
declare function GetGroupInfo(group_id: number): GetGroupInfoReturn;

declare class Include {
/** Use directory separators native to this machine when writing directory names. */
    static NATIVE: number;
/** Use unix directory separators when writing directory names. */
    static UNIX: number;
/** Use windows directory separators when writing directory names. */
    static WINDOWS: number;
}


/** Object returned by GetIncludeInfo */
interface GetIncludeInfoReturn {
    /** The label of the include file */
    label: number;
    /** The name of the include file */
    name: string;
    /** The parent include file (0 if main file) */
    parent: number;
}

/**
 * Returns information about an include file in the current model
 * @param include_id Include number
 */
declare function GetIncludeInfo(include_id: number): GetIncludeInfoReturn;

/**
 * Returns the external label of internal &lt;item&gt; of type &lt;type_code&gt;
 * @param type_code A valid type code (e.g. NODE, SOLID, SHELL)
 * @param item The internal number starting from 1
 * @param state_id State number to use instead of the current state
 */
declare function GetLabel(type_code: number, item: number, state_id?: number): number;

/**
 * Returns the external material id of internal &lt;item&gt; of type &lt;type_code&gt; Use of this function requires that material data be present, which means that a .ztf file must have been read. If the optional &lt;layer_id&gt; argument is used the element must be in a part using a *PART_COMPOSITE definition. If the material number is requested for a (composite) layer that does not exist in this item a value of zero is returned. No warning message is issued in this situation since experience has shown that this is a common occurrence and excessive warning messages are a nuisance.
 * @param type_code PART or a valid part-based element type code (e.g. SOLID, SHELL)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param layer_id For composites the layer number 1 - n.
 * @param state_id State number to be used instead of the current state
 */
declare function GetMid(type_code: number, item: number, layer_id?: number, state_id?: number): number;


/** Object returned by GetModelInfo */
interface GetModelInfoReturn {
    /** the full name, including the pathname, of the contact force CTF file (intfor) */
    ctf_name: string;
    /** the number of adaptive remesh families in the file sequence. Will be one for a normal non-adaptive analysis */
    num_families: number;
    /** the number of complete states in the file sequence */
    num_states: number;
    /** the full name, including the pathname, of the Nastran OP2 file */
    op2_name: string;
    /** the full name, including the pathname, of the LS-PREPOST database file */
    pp_name: string;
    /** the full name, including the pathname, of the complete state PTF/d3plot file */
    ptf_name: string;
    /** the full name, including the pathname, of the extra database XTF file */
    xtf_name: string;
    /** the full name, including the pathname, of the extra database ZTF file */
    ztf_name: string;
}

/**
 * Returns information about filenames in the current model, or in model_id if specified. It is an error to define model_id that is not currently in use. Notes The vast majority of analyses do not use adaptive remeshing and the family_id argument can be ignored. When it is given: Family id 0 is the base analysis Family id 1 is the first remesh, ie name_aa ... and so on
 * @param model_id Model number. The current model is used if unspecified or zero
 * @param family_id Family number (starting from zero). The family number of an adaptive remesh analysis
 */
declare function GetModelInfo(model_id?: number, family_id?: number): GetModelInfoReturn;

/**
 * Sets the current model in the JavaScript interface to model_id At the start of script execution the current model is automatically set to the first active model in the database
 * @param model_id Model number to be made current
 */
declare function SetCurrentModel(model_id: number): boolean;

declare class Options {
/** If true then ${Program} will automatically confirm (i.e. press the OK button) on (most) message boxes that are mapped. If false (default) then the message boxes will be shown and wait for the user to press a button. This option may be useful to help automate an operation where ${Program} would normally show a message box and wait for the user to press a button. */
    static auto_confirm: boolean;
/** The maximum number of Widgets that can be made for one Window. The default value is 1000 */
    static max_widgets: number;
/** The maximum number of lines that can be made for a Window.Error(), Window.Information(), Window.Message(), Window.Question() or Window.Warning() window. The default value is 25 */
    static max_window_lines: number;
}


/** Object returned by GetPartInfo */
interface GetPartInfoReturn {
    /** Part transparency (0-255) */
    alpha: number;
    /** Blue component of part colour (0-255) */
    blue: number;
    /** Green component of part colour (0-255) */
    green: number;
    /** The include number part is in (0 if main file) */
    include: number;
    /** Red component of part colour (0-255) */
    red: number;
    /** The part title */
    title: string;
}

/**
 * Returns information about a part in the current model
 * @param part_id Internal part number
 */
declare function GetPartInfo(part_id: number): GetPartInfoReturn;

/**
 * Returns the internal part id of internal &lt;item&gt; of type &lt;type_code&gt;
 * @param type_code A valid part-based element type code (e.g. SOLID, SHELL)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param state_id State number to be used instead of the current state
 */
declare function GetPid(type_code: number, item: number, state_id?: number): number;

declare class PopupWindow {
/**
 * Hides (unmaps) the popup window.
 */
    Hide(): void;

/**
 * Create a new PopupWindow object.
 */
    constructor();

/** If the popup window will remain mapped when a button is pressed in it. By default (false) when a button is pressed in the popup window the popup will be unmapped. If set to true then the popup will remain mapped until the user clicks out of the window or hides it by calling Hide() */
    persistent: boolean;
}

/**
 * Checks whether an item has been selected with Select()
 * @param type_code The type of item to select (SOLID, etc.)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 */
declare function IsSelected(type_code: number, item: number): boolean;

/**
 * Allows the user to interactively pick a specified number of items NOTE: If you are using the WINDOW type code, the function should be seen as "Pick item/model and return it's WINDOW ID" i.e. if you try and use the pick function and click somewhere away from the model, the function will return null. On the other hand, if you click the model then it will return the WINDOW ID in which the model resides.
 * @param type_code The type of item to select (SOLID, etc.)
 * @param number The number of items to pick.  &gt; 0 The internal indicies of the picked items are returned &lt; 0 The external labels of the picked items are returned 
 */
declare function Pick(type_code: number, number: number): number[];

/**
 * Allows the user to interactively select items using the mouse or from a menu.
 * @param type_code The type of item to select (SOLID, etc.)
 */
declare function Select(type_code: number): number;


/** Object returned by GetItemsInSet */
interface GetItemsInSetReturn {
    /** Internal entity indices */
    list: number[];
    /** Number of entities in list */
    nn: number;
}


/** Object returned by GetSetInfo */
interface GetSetInfoReturn {
    /** The label of the set */
    label: number;
    /** The name of the set */
    name: string;
    /** Number of items in the set */
    nn: number;
}

/**
 * Returns an object containing the number of items in set &lt;set_id&gt; of set type &lt;set_type&gt; and also an array &lt;list[ ]&gt; of their internal indices. If there are no items in the set then false is returned.
 * @param set_type A valid type code (SET_PART, etc.)
 * @param set_id The set id. If +ve, the internal number starting at 1. If -ve, the external label of the set. Internal numbers will be many times faster to process.
 */
declare function GetItemsInSet(set_type: number, set_id: number): GetItemsInSetReturn;

/**
 * Returns information about a set in the current model
 * @param set_type A valid type code (SET_PART, etc.)
 * @param set_id The set id. If +ve, the internal number starting at 1. If -ve, the external label of the set. Internal numbers will be many times faster to process.
 */
declare function GetSetInfo(set_type: number, set_id: number): GetSetInfoReturn;

/** All of a category */
declare var ALL: number;
/** Beams */
declare var BEAM: number;
/** Bolts (contributes to the count of total connections, but can't provide data or be visualised) */
declare var BOLT: number;
/** Bottom shell surface */
declare var BOTTOM: number;
/** Beam spotwelds */
declare var BWLD: number;
/** All connection types */
declare var CONN: number;
/** *CONSTRAINED_SPOTWELD spotwelds */
declare var CWLD: number;
/** Delete */
declare var DELETE: number;
/** Discrete Element Sphere */
declare var DES: number;
/** Generic elements */
declare var ELEM: number;
/** *CONSTRAINED_GENERALIZED spotwelds */
declare var GWLD: number;
/** Hex spotweld assemblies */
declare var HSWA: number;
/** Hex (Solid) spotwelds */
declare var HWLD: number;
/** Joints */
declare var JOINT: number;
/** Leave behind (eg don't delete) */
declare var LEAVE: number;
/** Lumped masses */
declare var MASS: number;
/** Middle shell surface */
declare var MIDDLE: number;
/** MIG welds (contributes to the count of total connections, but can't provide data or be visualised) */
declare var MIG: number;
/** Nodes */
declare var NODE: number;
/** Nodal Rigid Bodies */
declare var NRB: number;
/** Switch off */
declare var OFF: number;
/** Switch on */
declare var ON: number;
/** Parts */
declare var PART: number;
/** Pretensioners */
declare var PRET: number;
/** Rigid bolts (contributes to the count of total connections, but can't provide data or be visualised) */
declare var RBOLT: number;
/** Retractors */
declare var RETR: number;
/** Seatbelt elements */
declare var SBELT: number;
/** Seatbelt types generally */
declare var SBENT: number;
/** (Element) section definitions */
declare var SECT: number;
/** Interface (contact, blast, etc) segment */
declare var SEGM: number;
/** *SET_BEAM sets */
declare var SET_BEAM: number;
/** *SET_DISCRETE sets */
declare var SET_DISCRETE: number;
/** *SET_NODE sets */
declare var SET_NODE: number;
/** *SET_PART sets */
declare var SET_PART: number;
/** *SET_SHELL sets */
declare var SET_SHELL: number;
/** *SET_SOLID sets */
declare var SET_SOLID: number;
/** *SET_TSHELL sets */
declare var SET_TSHELL: number;
/** Shells */
declare var SHELL: number;
/** Slip-rings */
declare var SLIP: number;
/** Solids */
declare var SOLID: number;
/** Single Point Constraint */
declare var SPC: number;
/** Smoothed Particle Hydrodynamics */
declare var SPH: number;
/** Springs (discrete elements) */
declare var SPRING: number;
/** Return status of something */
declare var STATUS: number;
/** Contact surfaces */
declare var SURF: number;
/** Top shell surface */
declare var TOP: number;
/** Thick shells */
declare var TSHELL: number;
/** Rigidwalls */
declare var WALL: number;
/** D3PLOT window id */
declare var WINDOW: number;
/** 0 for vectors */
declare var X: number;
/** Database cross-sections */
declare var XSEC: number;
/** 0 for tensors */
declare var XX: number;
/** 3 for tensors (can also use YX as an alternative) */
declare var XY: number;
/** 1 for vectors */
declare var Y: number;
/** 1 for tensors */
declare var YY: number;
/** 4 for tensors (can also use ZY as an alternative) */
declare var YZ: number;
/** 2 for vectors */
declare var Z: number;
/** 5 for tensors (can also use XZ as an alternative) */
declare var ZX: number;
/** 2 for tensors */
declare var ZZ: number;
/**
 * Returns the analysis time of the current state, or that of &lt;state_id&gt; if defined
 * @param state_id State number to use
 */
declare function GetTime(state_id?: number): number;

/**
 * "Locks" any memory already allocated for data storage in &lt;state_id&gt;, preventing it from being reused by other states looking for memory in which to store data. When dealing with large models it is normally the case that the amount of data to be processed far exceeds the amount of memory installed in the computer, meaning that it is not possible to store all data of interest in memory at the same time. Therefore D3PLOT tries to minimise the amount of data currently stored in memory by reusing the memory allocated previously for other states and/or data components. This process is called "scavenging" and the rules it uses when trying to decide from where to scavenge memory are, in order of descending preference:  Data from a different component in a different state Data from this component in a different state Data from an unused component in this state If none of the above are available then allocate some fresh memory from the operating system  In most cases a Javascript will be working with one state at a time, so the problem of reusing memory in this state for purpose A when it is still required for purpose B will not arise. However if, for example, you are writing a script that compares data from this state and the previous one inside a loop it is possible that "churning" could arise from the sequence: . For each state GetData in state N Scavenges memory from state N-1 to store the data for state N GetData in state N-1 Scavenges memory from state N to store data for state N-1 . In this example the script would probably run incredibly slowly as each GetData() call would have to reread data from disk into the newly scavenged memory, so you would end up with &lt;#elements * 2&gt; disk reads of all the data for this component and element type. The same would be true if PutUbinData() or GetUbinData() were used as both of these require the data to be "put" or "got" to exist in memory, requiring that memory to be obtained from somewhere. By "locking" states N and N-1 in this example you would force D3PLOT to allocate enough memory to hold both data vectors in memory at the same time, and the script would run &lt;#elements * 2&gt; times faster. For a model with 1,000,000 elements this might reduce the run-time from months to seconds! Clearly states should not be "locked" unnecessarily or, more importantly, left "locked" when there is no longer any need for the data they contain, since this will lead to a significant build-up of memory usage. Therefore states can be unlocked in three ways:  Explicitly by using the Javascript function UnlockState() Implicitly by using the Javascript function SetCurrentState(), which unlocks all states except the current one Implicitly by exiting the Javascript, as normal (interactive or batch) D3PLOT usage will implicitly unlock all but the current state.  To summarise: this function is likely to be needed only when you are performing repeated "gets" and/or "puts" of data to and from more than one state. Locking and unlocking states takes place in the current model only, and has no effect on states in any other model.
 * @param state_id State number to lock
 */
declare function LockState(state_id: number): boolean;

/**
 * Sets the current state for the JavaScript interface to state_id This is the state used for all the "get" and "put" functions which handle model-related data. If the optional state_id argument in a get/put function call is used then that state is used instead for the duration of that call, but this current state is not changed. The current state is a property of the current model, in other words each model has its own, separate, current state. For all models this defaults to state #1 (if present). Setting the current state in model i has no effect on the current state in any other model.
 * @param state_id State number to make current
 */
declare function SetCurrentState(state_id: number): boolean;

/**
 * "Unlocks" this state for the purposes of memory scavenging, making any data vectors within it eligible for reuse by other states looking for memory Please see the documentation on LockState() for a description of what this function does and when it might be needed.
 * @param state_id State number to unlock
 */
declare function UnlockState(state_id: number): boolean;


/** Object function argument in GetUbinData */
interface GetUbinDataArgument_int_pt {
    /** Through thickness integration point */
    ip: number;
    /** On plan integration point. Defaults to the first one. */
    op?: number;
}


/** Object returned by LocateUbinComponent */
interface LocateUbinComponentReturn {
    /** the component type, U_NODE, U_SOSH, U_BEAM or U_OTHR */
    ctype: number;
    /** the data type, U_SCALAR, U_VECTOR or U_TENSOR */
    dtype: number;
    /** the integer handle of the UBIN component */
    handle: number;
}


/** Object function argument in PutUbinData */
interface PutUbinDataArgument_int_pt {
    /** Through thickness integration point */
    ip: number;
    /** On plan integration point. Defaults to the first one. */
    op?: number;
}

/**
 * Create a new user-defined binary (UBIN) component Note that user-defined components are "program wide", so once created the data "slots" exist in all models. Data values that are not populated will return a value of zero.
 * @param component_name A name for this component, up to 30 characters long. The name must be unique and it will be modified to make it so by appended numbers if an existing component of this name already exists
 * @param component_type One of the constants  U_NODE for nodal data U_SOSH for solid, shell and thick shell data U_BEAM for beam data U_OTHR for LSDA (Other) data  User-defined components must fall into one of these four categories. It is not possible to have a component of a given name that contains data for more than one of these types.
 * @param data_type One of the constants  U_SCALAR for scalar data (any tpye) U_VECTOR for vector data (U_NODE, U_BEAM and U_OTHR only) U_TENSOR for tensor data (U_SOSH only) U_OTHR for LSDA (Other) data  Choose the data type that matches the information you want to store
 * @param if_existing Action to take if ubin component 'component_name' already exists One of the constants  REPLACE deletes the existing ubin component, replacing it with this definition. This means that any existing data for the existing user-defined component of this name is deleted and the component is re-initialised RENAME changes the 'component_name' argument of this function call by adding a suffix to make it unique, so the existing component of this name (and data) will be left unchanged and the new one will not clash with it. 
 * @param dispose What to do with the ".ubd" files when the model is closed or D3PLOT exists. One of the constants  LEAVE (default) will leave any ".ubd" files on disk so that they are available for any future D3PLOT sessions. This means that any existing data for the existing user-defined component of this name is deleted and the component is re-initialised DELETE will delete these files when then model is closed or D3PLOT exits.  If this argument is ommitted or set to zero then LEAVE behaviour is used. However alternative default behaviour may be specified by setting the preference d3plot*ubd_file_dispose: to LEAVE or DELETE
 * @param location Specify where the data for this component is to be stored, one of  A valid &lt;pathname&gt; .ubd files will be written to this directory instead of the original analysis. This will usually be a better solution than the alternative options of keepingdata "in core" since it allows D3PLOT memory management to operate normally, writing data to disk if space is needed in memory. The directory &lt;pathname&gt; must exist, and you must have write permissionto it. JOBDIR(&lt;pathname&gt;) the path of the directory containing the results, in other words the default location for the files. However you can append a further &lt;pathname&gt; to this in order to specify a directory relative to JOBDIR, for example:  JOBDIR/.. Means the directory above the current results JOBDIR/../../my_results Means two directories above, the sub-directory my_results   IN_CORE stipulates that this component's data will always be held in memory, and will never be written to disk. This solves the problem of data files being in read-only directories since no ".ubd" files are written. However it also means that D3PLOT will not dump data for currently unused states to disk, meaning that you may run out of memory if you generate too much data in your JavaScripts.  If IN_CORE is used the value of dispose above is ignored. If this argument is omitted then by default behaviour of creating ".ubd" files in the same directory as the analysis database files will be used. However an alternative default directory may also be specified by the preference: d3plot*ubd_file_location: &lt;pathname&gt; or IN_CORE or JOBDIR(&lt;pathname&gt;) If both &lt;location&gt; and this preferenceare defined then &lt;location&gt; in this function call takes precedence. Notes on pathnames:  On Windows platforms forward slash / and backslash \ can be used interchangeably in pathnames. On Linux platforms you must use forward slash / only, so in a multi-system environment it is recommended that you use forward slash syntax only. If &lt;pathname&gt; contains white space then you must enclose the whole string in "...", for example  
 */
declare function CreateUbinComponent(component_name: string, component_type: number, data_type: number, if_existing: number, dispose?: number, location?: number | string): number;

/**
 * Deletes an existing UBIN component handle. The component is deleted from memory, and any ".ubd" files cached on disk are also deleted. If this succeeds it returns JS_TRUE, otherwise JS_FALSE.
 * @param handle The handle of an existing UBIN component
 */
declare function DeleteUbinComponent(handle: number): boolean;

/**
 * Retrieves data for type/item from a UBIN component If the data has not previoulsy been written, values of 0.0 will be returned
 * @param handle The handle of an existing UBIN component as returned by CreateUbinComponent()
 * @param item_type An item type constant, NODE, SOLID, SHELL etc. This must match the underlying type of the UBIN component, thus NODE for components of type U_NODE, and so on. It is illegal to attempt to store data for a type that does not match the underlying UBIN component type thus, for example, you cannot store NODE data for a U_SOSH component.
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param int_pt Integration point: must be a +ve layer number (lowest = 1) Or zero for item type / data component combinations that do not consider integration points in this context. (For example nodal displacements or beam forces.) Or, for fully integrated elements with on plan integration points, an object with properties "ip" and "op". For a further explanation see Defining the Integration point argument in GetData()   "Top", "Middle" and "Bottom" are not allowed in this context since "middle" is not directly readable in cases with an even number of points.   A value of 1 should normally be used for solid elements   Note from v11.0 onwards the order of the integration points for SHELLS and TSHELLS is &lt;int_pnt&gt; 1-&gt;n: BOTTOM-&gt;TOP surface (so long as aZTF file is present) see Section 13.8.2.2.   Prior to this they were in the order of the integration points outputby LS-DYNA, e.g. for &lt;maxint&gt;=3 &lt;int_pnt&gt; 1 was the MIDDLE surface, &gt;int_pnt&lt; 2 was the BOTTOM surface and &lt;int_pnt&gt; 3 was the TOP surface. 
 * @param state_id State number to be used instead of the current state
 */
declare function GetUbinData(handle: number, item_type: number, item: number, int_pt: GetUbinDataArgument_int_pt|number, state_id?: number | number[]): number | number[];

/**
 * Locates an existing UBIN component by name and returns its handle This is useful when a previous run has created a UBIN component and this script wishes to work with it. 'name' is not case-sensitive, but an exact character match is required,so embedded white space is significant. If the lookup succeeds this function returns an object with with properties about the component, if it fails it returns the value JS_FALSE.
 * @param component_name A name to search for, a character string up to 30 characters long. Component names are not case-sensitive, but searching only succeeds if an exact match is found.
 */
declare function LocateUbinComponent(component_name: string): LocateUbinComponentReturn;

/**
 * Stores data for type/item in a UBIN component handle This will overwrite any existing data in that "slot", which will be lost
 * @param handle The handle of an existing UBIN component as returned by CreateUbinComponent()
 * @param item_type An item type constant, NODE, SOLID, SHELL etc. This must match the underlying type of the UBIN component, thus NODE for components of type U_NODE, and so on. It is illegal to attempt to store data for a type that does not match the underlying UBIN component type thus, for example, you cannot store NODE data for a U_SOSH component.
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item. Internal numbers will be many times faster to process.
 * @param int_pt Integration point: must be a +ve layer number (lowest = 1) Or zero for item type / data component combinations that do not consider integration points in this context. (For example nodal displacements or beam forces.) Or, for fully integrated elements with on plan integration points, an object with properties "ip" and "op". For a further explanation see Defining the Integration point argument in GetData()   "Top", "Middle" and "Bottom" are not allowed in this context since "middle" is not directly readable in cases with an even number of points.   A value of 1 should normally be used for solid elements   Note from v11.0 onwards the order of the integration points for SHELLS and TSHELLS is &lt;int_pnt&gt; 1-&gt;n: BOTTOM-&gt;TOP surface (so long as aZTF file is present) see Section 13.8.2.2.   Prior to this they were in the order of the integration points outputby LS-DYNA, e.g. for &lt;maxint&gt;=3 &lt;int_pnt&gt; 1 was the MIDDLE surface, &gt;int_pnt&lt; 2 was the BOTTOM surface and &lt;int_pnt&gt; 3 was the TOP surface. 
 * @param data The data to be stored. Its format depends on the "data type" of the component: U_SCALAR: Scalar or array of length &gt;=1 U_VECTOR: Array of length &gt;= 3 U_TENSOR: Array of length &gt;= 6 The alignment of array members should be as follows Vector: [X, Y, Z] Tensor: [XX, YY, ZZ, XY, YZ, ZX]
 * @param state_id State number to be used instead of the current state
 */
declare function PutUbinData(handle: number, item_type: number, item: number, int_pt: PutUbinDataArgument_int_pt|number, data: number | number[], state_id?: number): number | number[];

/** held in memory */
declare var IN_CORE: number;
/** Job directory */
declare var JOBDIR: number;
/** Rename */
declare var RENAME: number;
/** Replace */
declare var REPLACE: number;
/** Beam scalar */
declare var UBMS: number;
/** Beam vector */
declare var UBMV: number;
/** Node scalar */
declare var UNOS: number;
/** Node vector */
declare var UNOV: number;
/** Solid and shell scalar */
declare var USSS: number;
/** Solid and shell tensor */
declare var USST: number;
/** User-defined beam component */
declare var U_BEAM: number;
/** User-defined nodal component */
declare var U_NODE: number;
/** User-defined other (LSDA) component */
declare var U_OTHR: number;
/** Scalar data (1 value) */
declare var U_SCALAR: number;
/** User-defined solid, shell and thick shell component */
declare var U_SOSH: number;
/** Tensor data (6 values) */
declare var U_TENSOR: number;
/** Vector data (3 values) */
declare var U_VECTOR: number;
/**
 * Blank an item
 * @param type_code The type of item to check (SOLID, etc.)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param window_id A window id. If defined then the item is blanked in that window. If not defined or set to then the item is blanked in all windows.
 */
declare function Blank(type_code: number, item: number, window_id?: number): void;

/**
 * Checks whether an item is currently blanked. If the type is PART then this function will only return true if all elements of the PART are currently blanked. If the PART is empty this returns false
 * @param type_code The type of item to check (SOLID, etc.)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param window_id A window id. If defined then the function will return true if the item is blanked in that window. If not defined or set to then the function returns true if it is blanked in any window.
 */
declare function IsBlanked(type_code: number, item: number, window_id?: number): boolean;

/**
 * Checks whether an item is currently deleted. If the type is PART then this function will only return true if all the elements of the PART are currently deleted The deleted status is computed as follows:  Part-based elements: LS-DYNA reports the deletion status for part-based elements (but not DISCRETE or 1d SEATBELT elements) which have failed according to the failure criteria of their deletion model. Reincarnation of dead elements is possible: *DEFINE_CONSTRUCTION_STAGES will result in an inactive element being marked as deleted, and it will be "undeleted" if that stage becomes active later on in the analysis. Parts themselves: LS-DYNA does not delete parts as such. A deformable part in which all elements have been deleted is removed from the calculation, but this removal is not reported in the results database. D3PLOT considers a part to be deleted if it has no elements, or all of its elements are marked as deleted. Note that a rigid part with no elements is a perfectly legitimate- if unusual - construct in LS-DYNA. Nodes: LS-DYNA does not delete nodes, but nodes with no structural mass are removed from the calculation. However this removal is not reported in the results database. D3PLOT considers a node to be deleted if all the elements to which it is attached are themselves deleted. Remember that D3PLOT does not "know about" all possible connections to a node, for example it may be an extra node on a rigid body, in a rigid part set, or constrained in some other obscure way. Therefore the test "deleted if all attached nodes are deleted" may give false positives and should not be considered definitive.  
 * @param type_code This function only supports the following type codes. PART, NODE, SOLID, BEAM, TSHELL, SPH, DES
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param state_id A valid state id. If omitted the current state will be used.
 */
declare function IsDeleted(type_code: number, item: number, state_id?: number): boolean;

/**
 * Checks whether an item is currently visible. An item is considered "visible" if the following conditions are all true:  Not blanked The visibility switch is on for type_code Is not empty, if type is PART The item has not been deleted in the current state if the type is an element  
 * @param type_code This function only supports the following type codes. PART, NODE, SOLID, BEAM, TSHELL, SPH, DES
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param window_id A valid window id
 * @param state_id A valid state id. If omitted the current state will be used.
 */
declare function IsVisible(type_code: number, item: number, window_id: number, state_id?: number): boolean;

/**
 * Unblank an item
 * @param type_code The type of item to check (SOLID, etc.)
 * @param item If +ve, the internal item number starting at 1. If -ve, the external label of the item.
 * @param window_id A window id. If defined then the item is unblanked in that window. If not defined or set to then the item is unblanked in all windows.
 */
declare function Unblank(type_code: number, item: number, window_id?: number): void;

declare class Widget {
/**
 * Adds a WidgetItem to the Widget. Also see Widget.RemoveAllWidgetItems and Widget.RemoveWidgetItem.
 * @param item WidgetItem to add
 * @param position Position on Widget to add the WidgetItem. Any existing WidgetItems will be shifted down as required. If omitted the WidgetItem will be added to the end of the existing ones. Note that positions start at 0.
 */
    AddWidgetItem(item: WidgetItem, position?: number): void;

/**
 * Draws a circle on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().
 * @param colour Colour of circle. See foreground for colours.
 * @param fill If circle should be filled or not.
 * @param xc x coordinate of centre of circle.
 * @param yc y coordinate of centre of circle.
 * @param radius radius of circle.
 */
    Circle(colour: number, fill: boolean, xc: number, yc: number, radius: number): void;

/**
 * Clears any graphics on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().
 */
    Clear(): void;

/**
 * Clears selection of any WidgetItems on the widget. Only possible for Widget.COMBOBOX and Widget.LISTBOX widgets.
 */
    ClearSelection(): void;

/**
 * Draws a cross symbol on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets.
 * @param colour Colour of cross symbol. See foreground for colours. If omitted, current foreground colour is used.
 */
    Cross(colour?: number): void;

/**
 * Check to see if the Ctrl key is pressed
 */
    static CtrlPressed(): boolean;

/**
 * Deletes the widget from D3PLOT (removing it from the window it is defined in) and returns any memory/resources used for the widget. This function should not normally need to be called. However, sometimes a script may want to recreate widgets in a window many times and unless the old widgets are deleted D3PLOT will reach the maximum number of widgets for a window (Options.max_widgets). To avoid this problem this method can be used to force D3PLOT to delete and return the resources for a widget. Do not use the Widget object after calling this method.
 */
    Delete(): void;

/**
 * Draws a directory icon on the widget. Only possible for Widget.BUTTON widgets.
 * @param line_colour Colour of lines of folder (only used in the old UI - in the new UI it will be ignored, a standard icon is always used). See foreground for colours.
 * @param fill_colour Colour of fill of folder (only used in the old UI - in the new UI it will be ignored, a standard icon is always used). See foreground for colours.
 */
    DirectoryIcon(line_colour: number, fill_colour: number): void;

/**
 * Dumps a string representation of an image for a widget to a file in a form that can be used by Widget.ReadImageString(). Only possible for Widget.LABEL and Widget.BUTTON widgets.
 * @param filename Filename to dump string representation to
 * @param format Can be Widget.RGB8 or Widget.RGB24. Before version 15 D3PLOT only used 8 bits to store RGB (red, green and blue) colour information for widget images. In version 15 widget images have been changed to use 24 bits to store RGB information (8 bits for red, 8 bits for green and 8 bits for blue). Both formats are supported. If omitted the new Widget.RGB24 format will be used. See Widget.ReadImageString() for more details.
 */
    DumpImageString(filename: string, format?: number): void;

/**
 * Hides the widget on the screen
 */
    Hide(): void;

/**
 * Returns the WidgetItem object used at index in this Widget. See also Widget.TotalItems() and Widget.WidgetItems().
 * @param index index to return WidgetItem for. Note that indices start at 0.
 */
    ItemAt(index: number): WidgetItem;

/**
 * Draws a line on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().
 * @param colour Colour of line. See foreground for colours.
 * @param x1 x coordinate of start of line.
 * @param y1 y coordinate of start of line.
 * @param x2 x coordinate of end of line.
 * @param y2 y coordinate of end of line.
 */
    Line(colour: number, x1: number, y1: number, x2: number, y2: number): void;

/**
 * Returns the number of pixels per unit coordinate. This will vary depending on the monitor D3PLOT is running on.
 */
    static PixelsPerUnit(): number;

/**
 * Draws a polygon on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().
 * @param colour Colour of polygon. See foreground for colours.
 * @param fill If polygon should be filled or not.
 * @param x1 x coordinate of point 1.
 * @param y1 y coordinate of point 1.
 * @param x2 x coordinate of point 2.
 * @param y2 y coordinate of point 2.
 * @param ...vars_xn x coordinate of point n.
 * @param ...vars_yn y coordinate of point n.
 */
    Polygon(colour: number, fill: boolean, x1: number, y1: number, x2: number, y2: number, ...vars_xn: number[], ...vars_yn: number[]): void;

/**
 * Reads an image from a file to show on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The image will be shown on the widget underneath any text. Note that due to the way that colours are used for menus in D3PLOT only a small number of colours are available for Widget images. Black and white images will display without any issues but colour images will be displayed with a reduced set of colours.
 * @param filename Image file (BMP, GIF, JPEG or PNG) to read. To remove an image use null.
 * @param justify Widget justification. Can be a bitwise or of Widget.LEFT, Widget.RIGHT or Widget.CENTRE and Widget.TOP, Widget.MIDDLE or Widget.BOTTOM. Additionally Widget.SCALE can be used to scale the image (either reducing or enlarging it) so that it fills the widget. If omitted the default is Widget.CENTRE|Widget.MIDDLE without scaling.
 * @param transparent Transparent colour. Must be a colour returned by Colour.RGB() in D3PLOT. If given then this colour will be replaced by a transparent colour. i.e. the widget background colour will be shown. If omitted or null no transparency will be used.
 * @param tolerance Tolerance for transparent colour (0-255). Any pixels in the image that have a red, green and blue colour value within tolerance of the transparent colour will be transparent. For example if the transparent colour was given as Colour.RGB(255, 0, 0) and tolerance is 0 only pixels which have red value 255 and green value 0 and blue value 0 will be made transparent. If tolerance is 4, pixels which have red values between 251 and 255 and green values between 0 and 4 and blue values between 0 and 4 will be made transparent. If omitted a value of 8 will be used.
 */
    ReadImageFile(filename: string, justify?: number, transparent?: number, tolerance?: number): void;

/**
 * Reads an image from a JavaScript string previously created by Widget.DumpImageString() to show on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The image will be shown on the widget underneath any text. Note, prior to version 15 of D3PLOT only a small number of colours were available for Widget images. In version 14 and earlier the RGB (red, green and blue) information for each pixel in the image was packed into a single byte (8 bits) with 3 bits for red, 3 for green and 2 for blue. Widget.DumpImageString() always returned the string beginning with "RRRGGGBB_RLE" which is this 8 bit format with run length encoding. This is format Widget.RGB8. In version 15 support for Widget images was enhanced to give 24bit support for colours. The RGB information for each pixel has 8 bits for red, 8 bits for green and 8 bits for blue. This is format Widget.RGB24. From version 15 Widget.DumpImageString() can either return the the old 8 bit format Widget.RGB8 (string beginning with "RRRGGGBB_RLE") or return the the new 24bit format Widget.RGB24 (string beginning with "RGB24_Z"). ReadImageString supports both formats.
 * @param string String containing the image data previously created by Widget.DumpImageString(). To remove an image use null.
 * @param justify Widget justification. Can be a bitwise or of Widget.LEFT, Widget.RIGHT or Widget.CENTRE and Widget.TOP, Widget.MIDDLE or Widget.BOTTOM. Additionally Widget.SCALE can be used to scale the image (either reducing or enlarging it) so that it fills the widget. If omitted the default is Widget.CENTRE|Widget.MIDDLE without scaling.
 * @param transparent Transparent colour. Must be a colour returned by Colour.RGB() in D3PLOT. If given then this colour will be replaced by a transparent colour. i.e. the widget background colour will be shown. If omitted or null no transparency will be used.
 * @param tolerance Tolerance for transparent colour (0-255). Only used for the new 24bit format Widget.RGB24 (strings beginning with "RGB24_Z"). Ignored for the old 8 bit format Widget.RGB8 (strings beginning with "RRRGGGBB_RLE"). Any pixels in the image that have a red, green and blue colour value within tolerance of the transparent colour will be transparent. For example if the transparent colour was given as Colour.RGB(255, 0, 0) and tolerance is 0 only pixels which have red value 255 and green value 0 and blue value 0 will be made transparent. If tolerance is 4, pixels which have red values between 251 and 255 and green values between 0 and 4 and blue values between 0 and 4 will be made transparent. If omitted a value of 8 will be used.
 */
    ReadImageString(string: string, justify?: number, transparent?: number, tolerance?: number): void;

/**
 * Draws a rectangle on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().
 * @param colour Colour of rectangle. See foreground for colours.
 * @param fill If rectangle should be filled or not.
 * @param x1 x coordinate of first corner of rectangle.
 * @param y1 y coordinate of first corner of rectangle.
 * @param x2 x coordinate of second (opposite) corner of rectangle.
 * @param y2 y coordinate of second (opposite) corner of rectangle.
 */
    Rectangle(colour: number, fill: boolean, x1: number, y1: number, x2: number, y2: number): void;

/**
 * Removes any WidgetItems from the Widget. Also see Widget.AddWidgetItem and Widget.RemoveWidgetItem.
 */
    RemoveAllWidgetItems(): void;

/**
 * Removes a WidgetItem from the Widget. Also see Widget.AddWidgetItem and Widget.RemoveAllWidgetItems.
 * @param item WidgetItem to remove
 */
    RemoveWidgetItem(item: WidgetItem): void;

/**
 * Check to see if the Shift key is pressed
 */
    static ShiftPressed(): boolean;

/**
 * Shows the widget on the screen
 */
    Show(): void;

/**
 * Windows have two different regions for Widgets. A 'normal' region which can be scrolled if required (if the window is made smaller scrollbars will be shown which can be used to scroll the contents) and a 'static' region at the top of the Window which is fixed and does not scroll. For an example of a static region in a Window see any of the keyword editing panels. The 'Dismiss', 'Create', 'Reset' etc buttons are in the static region. By default Widgets are put into the normal region of the Window. This method puts the Widget to the static region of the Window.
 */
    Static(): void;

/**
 * Returns the length of a string in Widget units. This can be used to find what size a Widget must be to be able to display the string.
 * @param text Text to find the width of
 * @param monospace If true then width will be calculated using a monospace font. If false (default) then the normal proportional width font will be used
 * @param fontSize Calculation can be based on a defined font size, at the moment support is added only for font sizes of 6, 7, 8, 10, 12, 14, 18 and 24.
 */
    static StringLength(text: string, monospace?: boolean, fontSize?: number): number;

/**
 * Draws a tick symbol on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets.
 * @param colour Colour of tick symbol. See foreground for colours. If omitted, current foreground colour is used.
 */
    Tick(colour?: number): void;

/**
 * Returns the number of the WidgetItem objects used in this Widget (or 0 if none used). See also Widget.ItemAt() and Widget.WidgetItems().
 */
    TotalItems(): number;

/**
 * Returns an array of the WidgetItem objects used in this Widget (or null if none used). See also Widget.ItemAt() and Widget.TotalItems().
 */
    WidgetItems(): WidgetItem[];

/**
 * Create a new Widget object.
 * @param window Window or PopupWindow that widget will be created in
 * @param type Widget type. Can be Widget.LABEL, Widget.BUTTON, Widget.CHECKBOX, Widget.COMBOBOX, Widget.LISTBOX, Widget.TEXTBOX or Widget.SLIDER.
 * @param left left coordinate of widget
 * @param right right coordinate of widget
 * @param top top coordinate of widget
 * @param bottom bottom coordinate of widget
 * @param text Text to show on widget (optional for LABEL, BUTTON and TEXTBOX, not required for CHECKBOX, COMBOBOX, LISTBOX and SLIDER)
 */
    constructor(window: Window | PopupWindow, type: number, left: number, right: number, top: number, bottom: number, text?: string);

/** If widget is active (true) or disabled (false) */
    active: boolean;
/** Whether arrows will be shown for a slider (default is true). Slider Widgets only. */
    arrows: boolean;
/** Widget background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY, Widget.ORANGE, Widget.DEFAULT, Widget.COLOUR_NEUTRAL, Widget.COLOUR_CONTRAST, Widget.COLOUR_CONTRAST_2, Widget.COLOUR_WARNING, Widget.COLOUR_SAFE, Widget.COLOUR_TITLE, Widget.COLOUR_INVERSE, Widget.DARKGREY_NEUTRAL, Widget.LIGHTGREY_NEUTRAL Note, background colours in the Window.THEME_DARK, Window.THEME_LIGHT, and Window.THEME_CLASSIC themes will be determined by the category of the widget not the background colour. To override this behaviour and use this background colour first set the widget category to Widget.NO_CATEGORY. */
    background: number;
/** Widget bottom coordinate */
    bottom: number;
/** The button category which determines the button's appearance when using the new user interface, see Window.Theme() */
    category: number;
/** Widget font size in points. Currently only supports the following sizes: 6, 7, 8, 10, 12, 14, 18, 24. Can be used only with Widget.LABEL and Widget.BUTTON. Both LATIN1 and UTF-8 encoding is supported on Windows but Linux only supports LATIN1 encoding at the moment. */
    fontSize: number;
/** Widget foreground colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY, Widget.ORANGE, Widget.DEFAULT, Widget.COLOUR_NEUTRAL, Widget.COLOUR_CONTRAST, Widget.COLOUR_CONTRAST_2, Widget.COLOUR_WARNING, Widget.COLOUR_SAFE, Widget.COLOUR_TITLE, Widget.COLOUR_LABEL, Widget.COLOUR_INVERSE, Widget.DARKGREY_NEUTRAL, Widget.LIGHTGREY_NEUTRAL */
    foreground: number;
/** Widget hover text */
    hover: string;
/** Height of widget image (pixels) */
    readonly imageHeight: number;
/** Width of widget image (pixels) */
    readonly imageWidth: number;
/** Widget justification. Can be: Widget.LEFT, Widget.RIGHT or Widget.CENTRE (default). */
    justify: number;
/** Widget left coordinate */
    left: number;
/** Width of lines when drawing graphics (initially 1; values 1-255 allowed). */
    lineWidth: number;
/** Tag to use for this widget when recording a macro. If empty then the text property value will be used. */
    macroTag: string;
/** The maximum value allowed for a slider (default is 100). Slider Widgets only. */
    maximum: number;
/** The minimum value allowed for a slider (default is 0). Slider Widgets only. */
    minimum: number;
/** true if the widget uses a monospace font instead of a proportional width font (default). Label and button Widgets only. */
    monospace: boolean;
/** Function to call when the text in a TEXTBOX widget, the selection in a COMBOBOX widget or the value of a SLIDER is changed. The Widget object is accessible in the function using the 'this' keyword (see the example below for more details of how to define the function and how to use the 'this' keyword). To unset the function set the property to null. Note that this function is called when the user actually types something into the textbox, selects an item in the combobox or moves the slider, NOT when the Widget.text or Widget.value property changes. */
    onChange: () => void;
/** Function to call when a BUTTON, LABEL, CHECKBOX or COMBOBOX widget is clicked. The Widget object is accessible in the function using the 'this' keyword (see the example below for more details of how to define the function and how to use the 'this' keyword). To unset the function set the property to null. Note that this function is called when the user actually clicks on the button, NOT when the Widget.pushed property changes. For the COMBOBOX widget the function is called before the list of items is mapped. */
    onClick: () => void;
/** Function to call when a BUTTON, LABEL or TEXTBOX widget is right clicked to map a popup. The Widget object is accessible in the function using the 'this' keyword. The PopupWindow can then be found by using the popupWindow property of the Widget. The function is called before the popup is mapped so you can change the widgets in the popup as required. */
    onPopup: () => void;
/** Function to call for a widget when timerDelay ms have elapsed after setting this. Additionally if timerRepeat is set this function will be called repetitively, every timerDelay ms. The Widget object is accessible in the function using the 'this' keyword. To unset the function set the property to null. Note that as soon as this property is set the timer starts! */
    onTimer: () => void;
/** The orientation of a slider. Can be: Widget.VERTICAL or Widget.HORIZONTAL (default). Slider Widgets only. */
    orientation: number;
/** How PopupWindow will be mapped relative to this widget. Can be Widget.LEFT, Widget.RIGHT, Widget.TOP or Widget.BOTTOM (default). */
    popupDirection: number;
/** TRUE (default) if a symbol will be shown for a PopupWindow. */
    popupSymbol: boolean;
/** PopupWindow for this Widget. Only available for Button, Label and Textbox Widgets. To remove a PopupWindow from a Widget set to null. */
    popupWindow: PopupWindow;
/** If widget is pushed (true) or not (false). This only affects Widget.BUTTON with the Widget.toggle property set, and Widget.CHECKBOX widgets. */
    pushed: boolean;
/** Widget right coordinate */
    right: number;
/** Selection method for ListBox Widgets. Can be: Widget.SELECT_NONE, Widget.SELECT_SINGLE or Widget.SELECT_MULTIPLE or Widget.SELECT_ENHANCED (default). */
    select: number;
/** WidgetItem that is currently selected for a ComboBox Widget. If null no WidgetItem is selected. For a ListBox Widget this property contains the last WidgetItem that was (de)selected. To get a list of all of the selected WidgetItems use WidgetItems() to return all of the WidgetItems and inspect the WidgetItem selected property. */
    selectedItem: WidgetItem;
/** true if the widget is visible. To alter the visibility of a widget use the Show() and Hide() methods. */
    readonly shown: boolean;
/** The step value of a slider (default is 1). Slider Widgets only. */
    step: number;
/** Widget text. For a ComboBox Widget this will be the text for the currently selected WidgetItem */
    text: string;
/** true if the widget text is hidden and replaced by asterisks. This may be used to create textboxes to type passwords in. TextBox Widgets only. */
    textHidden: boolean;
/** Delay in ms before the function set for onTimer will be called. The initial value is 1000 (ms). Also see timerRepeat. */
    timerDelay: number;
/** If the function set for onTimer will be called once (false) or repeatedly (true). The initial value is false. Also see timerDelay. */
    timerRepeat: boolean;
/** If widget can be toggled (true) or not (false). This only affects Widget.BUTTON widgets. */
    toggle: boolean;
/** Widget top coordinate */
    top: number;
/** Type of the widget */
    type: number;
/** The current value of a slider (initially will be the minimum value). Slider Widgets only. */
    value: number;
/** The Window that this widget is defined in */
    readonly window: Window;
/** X resolution of button when drawing lines, circles, polygons and rectangles (initially 100). X coordinates on the Widget can be from 0 (on the left of the widget) to xResolution (on the right of the widget). Available for Widget.LABEL and Widget.BUTTON Widgets. */
    xResolution: number;
/** Y resolution of button when drawing lines, circles, polygons and rectangles (initially 100). Y coordinates on the Widget can be from 0 (on the top of the widget) to yResolution (on the bottom of the widget). Available for Widget.LABEL and Widget.BUTTON Widgets. */
    yResolution: number;
/** Colour black */
    static BLACK: number;
/** Colour blue */
    static BLUE: number;
/** Bottom justification */
    static BOTTOM: number;
/** Button widget */
    static BUTTON: number;
/** Apply buttons */
    static CATEGORY_APPLY: number;
/** A button box panel that contains other widgets */
    static CATEGORY_BUTTON_BOX: number;
/** Buttons which cancel the current operation */
    static CATEGORY_CANCEL: number;
/** Header for data entry cells, e.g. PRIMER create panels */
    static CATEGORY_DATA_ENTRY_HEADER: number;
/** Buttons to close or dismiss panels */
    static CATEGORY_DISMISS: number;
/** Entity types in T/HIS */
    static CATEGORY_ENTITY: number;
/** A generic button that isn't a special category */
    static CATEGORY_GENERIC: number;
/** An alternative to the generic category that has a complementary colour */
    static CATEGORY_GENERIC_2: number;
/** Help buttons */
    static CATEGORY_HELP: number;
/** A PRIMER keyword button */
    static CATEGORY_KEYWORD: number;
/** A text label */
    static CATEGORY_LABEL: number;
/** Text label with a border */
    static CATEGORY_LABEL_BOX: number;
/** Text label with a popup that blends into the background */
    static CATEGORY_LABEL_POPUP: number;
/** A menu box */
    static CATEGORY_MENU_BOX: number;
/** For displaying a temporary warning message */
    static CATEGORY_MESSAGE: number;
/** Operate buttons in T/HIS */
    static CATEGORY_OPERATE: number;
/** A popup box that can contain buttons and plain text */
    static CATEGORY_POPUP_BOX: number;
/** Buttons (usually green) to indicate a safe action */
    static CATEGORY_SAFE_ACTION: number;
/** Select all */
    static CATEGORY_SEL_ALL: number;
/** Tab */
    static CATEGORY_TAB: number;
/** Table (column) header */
    static CATEGORY_TABLE_HEADER: number;
/** Table row */
    static CATEGORY_TABLE_ROW: number;
/** A text box */
    static CATEGORY_TEXT_BOX: number;
/** A tick box */
    static CATEGORY_TICKBOX: number;
/** Title text */
    static CATEGORY_TITLE: number;
/** Buttons that can be toggled, e.g. On/Off */
    static CATEGORY_TOGGLE: number;
/** Buttons within the tools area */
    static CATEGORY_TOOL: number;
/** Buttons which undo the last operation */
    static CATEGORY_UNDO: number;
/** Unselect/deslect all */
    static CATEGORY_UNSEL_ALL: number;
/** Update buttons which update the screen but leave the panel open */
    static CATEGORY_UPDATE: number;
/** Buttons (usually red) to indicate a dangerous action */
    static CATEGORY_WARNING_ACTION: number;
/** Centre (horizontal) justification */
    static CENTRE: number;
/** Checkbox widget */
    static CHECKBOX: number;
/** A contrasting colour in the 3 user interface themes (Green, Purple, and Blue in the Dark, Light, and Classic themes respectively). Blue in the legacy theme. */
    static COLOUR_CONTRAST: number;
/** Another contrasting colour in the 3 user interface themes (Yellow, Red, and Red in the Dark, Light, and Classic themes respectively). Red in the legacy theme. */
    static COLOUR_CONTRAST_2: number;
/** Inverse colour in the 3 user interface themes (Black or white depending on theme). Black in the legacy theme. */
    static COLOUR_INVERSE: number;
/** Label text colour in the 3 user interface themes (Black or white depending on theme). Black in the legacy theme. */
    static COLOUR_LABEL: number;
/** Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Light grey in the legacy theme. */
    static COLOUR_NEUTRAL: number;
/** Safe colour in the 3 user interface themes (Different shade of green in every theme). Dark green in the legacy theme. */
    static COLOUR_SAFE: number;
/** Title colour in the 3 user interface themes (Different shade of grey in every theme). Dark blue in the legacy theme. */
    static COLOUR_TITLE: number;
/** Warning colour in the 3 user interface themes (Different shade of red in every theme). Dark red in the legacy theme. */
    static COLOUR_WARNING: number;
/** Combobox widget */
    static COMBOBOX: number;
/** Colour cyan */
    static CYAN: number;
/** Colour dark blue */
    static DARKBLUE: number;
/** Colour dark green */
    static DARKGREEN: number;
/** Colour dark grey */
    static DARKGREY: number;
/** Only valid in the function 'Line'. Used to keep the 3D effect in the legacy theme and not in the other themes. Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Dark grey in the legacy theme */
    static DARKGREY_NEUTRAL: number;
/** Colour dark red */
    static DARKRED: number;
/** Default colour for widgets */
    static DEFAULT: number;
/** Colour green */
    static GREEN: number;
/** Colour grey */
    static GREY: number;
/** Horizontal orientation (for sliders) */
    static HORIZONTAL: number;
/** Label widget */
    static LABEL: number;
/** Left justification */
    static LEFT: number;
/** Colour light grey */
    static LIGHTGREY: number;
/** Only valid in the function 'Line'. Used to keep the 3D effect in the legacy theme and not in the other themes. Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Light grey in the legacy theme */
    static LIGHTGREY_NEUTRAL: number;
/** Listbox widget */
    static LISTBOX: number;
/** Colour magenta */
    static MAGENTA: number;
/** Middle (vertical) justification */
    static MIDDLE: number;
/** No styling is applied. Widget colour controlled by foreground/background properties and is the same in all themes */
    static NO_CATEGORY: number;
/** Colour orange */
    static ORANGE: number;
/** Colour red */
    static RED: number;
/** 24 bits for RGB data in widget images */
    static RGB24: number;
/** 8 bits for RGB data in widget images */
    static RGB8: number;
/** Right justification */
    static RIGHT: number;
/** Image will be scaled to fit widget */
    static SCALE: number;
/** Multiple WidgetItems in a ListBox Widget can be selected. When the user selects a WidgetItem the selection is cleared and the new WidgetItem selected. However, if the user presses the Ctrl key when clicking on a WidgetItem, the clicked WidgetItem gets toggled and all other WidgetItems are left untouched. If the user presses the Shift key while clicking on a WidgetItem, all WidgetItems between the last selected WidgetItem and the clicked WidgetItem are selected or unselected, depending on the state of the clicked WidgetItem. */
    static SELECT_ENHANCED: number;
/** Multiple WidgetItems in a ListBox Widget can be selected. When the user selects a WidgetItem, the selection status of that WidgetItem is toggled and the other WidgetItems are left alone. */
    static SELECT_MULTIPLE: number;
/** No WidgetItem in a ListBox Widget can be selected */
    static SELECT_NONE: number;
/** A single WidgetItem in a ListBox Widget can be selected. When the user selects a WidgetItem, any already-selected WidgetItem becomes unselected, and the user cannot unselect the selected WidgetItem by clicking on it. */
    static SELECT_SINGLE: number;
/** Slider widget */
    static SLIDER: number;
/** Text input widget */
    static TEXTBOX: number;
/** Top justification */
    static TOP: number;
/** Vertical orientation (for sliders) */
    static VERTICAL: number;
/** Colour white */
    static WHITE: number;
/** Colour yellow */
    static YELLOW: number;
}

declare class WidgetItem {
/**
 * Create a new WidgetItem object.
 * @param widget Widget that widget item will be created in. This can be null in which case the WidgetItem will be created but not assigned to a Widget. It can be assigned later by using Widget.AddWidgetItem().
 * @param text Text to show on widget item
 * @param selectable If the widget item can be selected. If omitted the widget item will be selectable.
 */
    constructor(widget: Widget, text: string, selectable?: boolean);

/** Widget background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT */
    background: number;
/** Widget foreground colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT */
    foreground: number;
/** WidgetItem's hover text */
    hover: string;
/** The index of this widgetitem in the parent widget (undefined if widgetitem is not assigned to a widget). */
    readonly index: number;
/** true if the widgetitem uses a monospace font instead of a proportional width font (default). */
    monospace: boolean;
/** Function to call when a widget item in a COMBOBOX or LISTBOX widget is clicked. The Widgetitem object is accessible in the function using the 'this' keyword. */
    onClick: () => void;
/** Function to call when the mouse moves over a widget item in a COMBOBOX or LISTBOX widget. The Widgetitem object is accessible in the function using the 'this' keyword. */
    onMouseOver: () => void;
/** If the widget item can be selected (true) or not (false). */
    selectable: boolean;
/** If the widget item is selected (true) or not (false). */
    selected: boolean;
/** Widget text */
    text: string;
/** The widget that this item is defined for (null if not set) */
    readonly widget: object;
}

declare class Window {
/**
 * Returns the vertical position of the bottom border (in range 0-1). This can be used to help position windows on the screen.
 */
    static BottomBorder(): number;

/**
 * Deletes the window from D3PLOT and returns any memory/resources used for the window. This function should not normally need to be called. However, in exceptional circumstances if a script recreates windows many times D3PLOT may run out of USER objects on Microsoft Windows because of the way D3PLOT creates and shows windows. To avoid this problem this method can be used to force D3PLOT to return the resources for a window. Do not use the Window object after calling this method.
 */
    Delete(): void;

/**
 * Show an error message in a window.
 * @param title Title for window.
 * @param error Error message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.
 */
    static Error(title: string, error: string, buttons?: number): number;

/**
 * Map the directory selector box native to your machine, allowing you to choose a directory. On Unix this will be a Motif selector. Windows will use the standard windows directory selector.
 * @param initial Initial directory to start from.
 */
    static GetDirectory(initial?: string): string;

/**
 * Map a file selector box allowing you to choose a file. See also Window.GetFiles() and Window.GetFilename().
 * @param extension Extension to filter by.
 * @param save If true the file selector is to be used for saving a file. If false (default) the file selector is for opening a file. Due to native operating system file selector differences, on linux new filenames can only be given when saving a file. On windows it is possible to give new filenames when opening or saving a file.
 * @param initial Initial directory to start from.
 */
    static GetFile(extension?: string, save?: boolean, initial?: string): string;

/**
 * Map a window allowing you to input a filename (or select it using a file selector). OK and Cancel buttons are shown. See also Window.GetFile().
 * @param title Title for window.
 * @param message Message to show in window.
 * @param extension Extension to filter by.
 * @param initial Initial value.
 * @param save If true the file selector is to be used for saving a file. If false (default) the file selector is for opening a file. Due to native operating system file selector differences, on linux new filenames can only be given when saving a file. On windows it is possible to give new filenames when opening or saving a file.
 */
    static GetFilename(title: string, message: string, extension?: string, initial?: string, save?: boolean): string;

/**
 * Map a file selector box allowing you to choose multiple files. See also Window.GetFile() and Window.GetFilename().
 * @param extension Extension to filter by.
 */
    static GetFiles(extension?: string): string[];

/**
 * Map a window allowing you to input an integer. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 * @param initial Initial value.
 */
    static GetInteger(title: string, message: string, initial?: number): number;

/**
 * Map a window allowing you to input a number. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 * @param initial Initial value.
 */
    static GetNumber(title: string, message: string, initial?: number): number;

/**
 * Map a window allowing you to input a string. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 * @param initial Initial value.
 */
    static GetString(title: string, message: string, initial?: string): string;

/**
 * Hides (unmaps) the window.
 */
    Hide(): void;

/**
 * Show information in a window.
 * @param title Title for window.
 * @param info Information to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.
 */
    static Information(title: string, info: string, buttons?: number): number;

/**
 * Returns the resolution of the master programme window in pixels
 */
    static MasterResolution(): number[];

/**
 * Show a message in a window.
 * @param title Title for window.
 * @param message Message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.
 */
    static Message(title: string, message: string, buttons?: number): number;

/**
 * Returns the vertical position of the middle border (in range 0-1). The middle border is the border between the tools/keywords window and the docked windows. This can be used to help position windows on the screen.
 */
    static MiddleBorder(): number;

/**
 * Show a question in a window.
 * @param title Title for window.
 * @param question Question to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted Yes and No button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.
 */
    static Question(title: string, question: string, buttons?: number): number;

/**
 * Recomputes the positions of widgets in the window. If you have static widgets and 'normal' widgets in a window and you show and/or hide widgets the window needs to be recomputed to refresh the graphics, scroll bars etc. Calling this method will recompute and redraw the window.
 */
    Recompute(): void;

/**
 * Redraws the window. Sometimes if you show, hide or draw graphics on widgets the window needs to be redrawn to refresh the graphics. Calling this method will redraw the window refreshing the graphics.
 */
    Redraw(): void;

/**
 * Returns the horizontal position of the right border (in range 0-1). This can be used to help position windows on the screen.
 */
    static RightBorder(): number;

/**
 * Shows (maps) the window and waits for user input.
 * @param modal If this window is modal (true) then the user is blocked from doing anything else in D3PLOT until this window is dismissed). If non-modal (false) then the user can still use other functions in D3PLOT. If omitted the window will be modal. Note that making a window modal will stop interaction in all other windows and may prevent operations such as picking from working in any macros that are run from scripts.
 */
    Show(modal?: boolean): void;

/**
 * Set or get a user interface theme.
 * @param theme If it is provided it is used to set the current theme. Can be either Window.USE_OLD_UI_JS, Window.THEME_CURRENT, Window.THEME_DARK, Window.THEME_LIGHT, Window.THEME_CLASSIC.
 */
    static Theme(theme?: number): number;

/**
 * Returns the vertical position of the top border (in range 0-1). This can be used to help position windows on the screen. This is no longer used in D3PLOT and will always be 1 but is left for backwards compatibility.
 */
    static TopBorder(): number;

/**
 * Force GUI to be updated. This function is not normally needed but if you are doing a computationally expensive operation and want to update the GUI it may be necessary as the GUI update requests are cached until there is spare time to update them. Calling this function forces any outstanding requests to be flushed.
 */
    static UpdateGUI(): void;

/**
 * Show a warning message in a window.
 * @param title Title for window.
 * @param warning Warning message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.
 */
    static Warning(title: string, warning: string, buttons?: number): number;

/**
 * Create a new Window object.
 * @param title Window title to show in title bar
 * @param left left coordinate of window in range 0.0 (left) to 1.0 (right)
 * @param right right coordinate of window in range 0.0 (left) to 1.0 (right)
 * @param bottom bottom coordinate of window in range 0.0 (bottom) to 1.0 (top)
 * @param top top coordinate of window in range 0.0 (bottom) to 1.0 (top)
 */
    constructor(title: string, left: number, right: number, bottom: number, top: number);

/** If true (default) then the window then the window is active and widgets in the window can be used. If false then the window is inactive and the widgets cannot be used. */
    active: boolean;
/** Window background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT */
    background: number;
/** bottom coordinate of window in range 0.0 (bottom) to 1.0 (top) */
    bottom: number;
/** height of window */
    height: number;
/** If true then the window will be kept "on top" of other windows. If false (default) then the window stacking order can be changed. */
    keepOnTop: boolean;
/** left coordinate of window in range 0.0 (left) to 1.0 (right) */
    left: number;
/** The maximum number of widgets that can be made in this window. This can be changed before the window is created by using Options.max_widgets. Also see totalWidgets */
    readonly maxWidgets: number;
/** Function to call after a Window is shown. The Window object is accessible in the function using the 'this' keyword. This may be useful to ensure that certain actions are done after the window is shown. It can also be used to show another window so this enables multiple windows to be shown. To unset the function set the property to null. */
    onAfterShow: () => void;
/** Function to call before a Window is shown. The Window object is accessible in the function using the 'this' keyword. This may be useful to ensure that buttons are shown/hidden etc before the window is shown. Note that it cannot be used to show another window. Use onAfterShow for that. To unset the function set the property to null. */
    onBeforeShow: () => void;
/** Function to call when a Window is closed by pressing the X on the top right of the window. The Window object is accessible in the function using the 'this' keyword. To unset the function set the property to null. */
    onClose: () => void;
/** Window resizing. By default when a Window is shown it is allowed to resize on all sides (left, right, top and bottom) to try to make enough room to show the Widgets. The behaviour can be changed by using this property. It can be any combination (bitwise OR) of Window.LEFT, Window.RIGHT, Window.TOP or Window.BOTTOM or 0. In addition Window.REDUCE can also be added to allow the window to reduce in size when resizing. Note that when Window.Show is called this property is set to 0 (i.e. not to resize on any side). */
    resize: number;
/** right coordinate of window in range 0.0 (left) to 1.0 (right) */
    right: number;
/** If true (default) then a close (X) button will automatically be added on the top right of the window. If false then no close button will be shown. */
    showClose: boolean;
/** true if window is currently shown, false if not */
    readonly shown: boolean;
/** Window title */
    title: string;
/** top coordinate of window in range 0.0 (bottom) to 1.0 (top) */
    top: number;
/** The total number of widgets that have been made in this window. This can be changed before the window is created by using Options.max_widgets. Also see maxWidgets */
    readonly totalWidgets: number;
/** width of window */
    width: number;
/** Bottom resizing/positioning of window */
    static BOTTOM: number;
/** Show CANCEL button */
    static CANCEL: number;
/** Centre (horizontal) positioning of window */
    static CENTRE: number;
/** Left resizing/positioning of window */
    static LEFT: number;
/** Middle (vertical) positioning of window */
    static MIDDLE: number;
/** Show NO button */
    static NO: number;
/** Allow Window.Error, Window.Question, Window.Warning etc windows to be non modal */
    static NONMODAL: number;
/** Show OK button */
    static OK: number;
/** Window is allowed to reduce in size when resizing */
    static REDUCE: number;
/** Right resizing/positioning of window */
    static RIGHT: number;
/** Use the Classic theme (Note: Not only the script will use this theme, the whole interface of the program will switch to classic) */
    static THEME_CLASSIC: number;
/** Use the current theme */
    static THEME_CURRENT: number;
/** Use the Dark theme (Note: Not only the script will use this theme, the whole interface of the program will switch to dark) */
    static THEME_DARK: number;
/** Use the Light theme (Note: Not only the script will use this theme, the whole interface of the program will switch to light) */
    static THEME_LIGHT: number;
/** Top resizing/positioning of window */
    static TOP: number;
/** Use the original, pre v17, theme (default). (Note:The interface of the program will NOT switch to old) */
    static USE_OLD_UI_JS: number;
/** Show YES button */
    static YES: number;
}


/** Object returned by GetWindowModels */
interface GetWindowModelsReturn {
    /** List of model numbers */
    list: number[];
    /** the number of models in the window */
    nm: number;
}

/**
 * Creates a new window containing one or more models contained in model_list
 * @param model_list Model number(s). Can be a single model number, an array of model numbers or the constant ALL
 */
declare function CreateWindow(model_list: number[] | number): boolean;

/**
 * Deletes one or more windows in window_list, dealing with "orphaned" models according to dispose_flag. WARNING  D3PLOT does not permit gaps in window numbering, therefore when a window is deleted any windows higher than this are renumbered downwards to fill the gap. However D3PLOT does not renumber models following the deletion of preceding ones. Deleted model ids simply become "inactive".  This means that following a window deletion operation:  The total number of windows will change. Any window ids above those deleted will have been renumbered downwards. If any orphan models were deleted these models will now be inactive. If the current Javascript model has been deleted then the "current" model pointer will be reset to the first active model, or &lt;undefined&gt; if there are no such models.  Therefore if a script is to continue execution after a window deletion operation it is prudent to ensure that any "current" user-defined variables in the Javascript are reset to sensible values.
 * @param window_list Window numbers. Can be a single window number, an array of window numbers or the constant ALL
 * @param dispose_flag LEAVE (default) leaves orphaned models in the database or DELETE deletes orphaned models
 */
declare function DeleteWindow(window_list: number[] | number, dispose_flag?: number): boolean;

/**
 * Returns the current "frame" in window_id See the notes in GetWindowMaxFrame() on how frame number relates to state number
 * @param window_id Window number or ALL. Specifies the window(s) to have the frame number set
 */
declare function GetWindowFrame(window_id: number): number;

/**
 * Returns the highest "frame" number in window_id "Frame" number is usually the same as state number, but there are a few situations when this is not the case:  Eigenvalue analyses. Each state is animated though #frames between +/-180 degrees phase angle Nastran-derived static analyses. Each loadcase is likewise animated through #frames Transient analyses that are being interpolated by time, giving (endtime / time interval) frames  In all cases animating a window results in it cycling through frames 1 to max #frames.
 * @param window_id Window number
 */
declare function GetWindowMaxFrame(window_id: number): number;

/**
 * Returns the model number(s) in window_id Every active window in D3PLOT must have at least one model, but may have any number
 * @param window_id Window number
 */
declare function GetWindowModels(window_id: number): GetWindowModelsReturn;

/**
 * Set the "active" flag on a window. When more than one window is in use it is convenient to be able to operate on a group of "active" windows with a single command in the JavaScript, rather than having to loop over selected windows each time, and this function provides that capability. This activity status is used solely within the Javascript interface and does not have any bearing upon or connection with the Wn "tabs" used in the graphical userinterface. By default all windows are active (ON), but you can change this by setting the activity of specific windows ON or OFF.
 * @param window_id Window number or ALL. Specifies the window(s) to have their status set
 * @param active_flag OFF or ON. OFF makes the selected window(s) inactive, ON makes window(s) active
 */
declare function SetWindowActive(window_id: number, active_flag: number): boolean;

/**
 * Sets the current "frame" in the window(s) specified to frame_number. The effect is immediate and the window(s) will be redrawn if necessary to show the requested frame See the notes in GetWindowMaxFrame() on how frame number relates to state number
 * @param window_id Window number or ALL
 * @param frame_number The frame number to set. Should be a +ve integer value in the range 1 to max #frames in window. Values greater than max #frames are truncated to this
 */
declare function SetWindowFrame(window_id: number, frame_number: number): boolean;

declare class XMLParser {
/**
 * starts parsing an XML file
 * @param filename XML file to parse
 */
    Parse(filename: string): void;

/**
 * Create a new XMLParser object for reading XML files.
 */
    constructor();

/** Function to call when character data is found. The function will be called with 1 argument which is a string containing the character data */
    characterDataHandler: () => void;
/** Function to call when a comment is found. The function will be called with 1 argument which is a string containing the text inside the comment */
    commentHandler: () => void;
/** Function to call at the end of a CDATA section. The function does not have any arguments. */
    endCDATAHandler: () => void;
/** Function to call when an element end tag is found. The function will be called with 1 argument which is a string containing the name of the element */
    endElementHandler: () => void;
/** Function to call at the start of a CDATA section. The function does not have any arguments. */
    startCDATAHandler: () => void;
/** Function to call when an element start tag is found. The function will be called with 2 arguments. Argument 1 is a string containing the name of the element. Argument 2 is an object containing the element attributes */
    startElementHandler: () => void;
}

declare class XlsxWorkbook {
/**
 * Close a Xlsx file
 */
    Close(): void;

/**
 * Create a new XlsxWorkbook object for writing xlsx files.
 * @param filename Filename of the xlsx file you want to write. The file will be overwritten (if it exists).
 */
    constructor(filename: string);

/** Name of the xlsx file */
    readonly filename: string;
}

declare class XlsxWorksheet {
/**
 * Add an image to the Xlsx file. Note that the image will not actually be read/inserted until the workbook is written by calling XlsxWorkbook.Close so you must make sure the image file exists until then.
 * @param row The row in the xlsx file (rows start at zero)
 * @param column The column in the xlsx file (columns start at zero)
 * @param filename Name of the image file you want to add to the xlsx file. The image can be in png or jpeg format.
 */
    AddImage(row: number, column: number, filename: string): void;

/**
 * Add number to the Xlsx file
 * @param row The row in the xlsx file (rows start at zero)
 * @param column The column in the xlsx file (columns start at zero)
 * @param value Number you want to add to the xlsx file
 */
    AddNumber(row: number, column: number, value: number): void;

/**
 * Add text to the Xlsx file
 * @param row The row in the xlsx file (rows start at zero)
 * @param column The column in the xlsx file (columns start at zero)
 * @param text Text you want to add to the xlsx file
 */
    AddText(row: number, column: number, text: string): void;

/**
 * Set the column properties in the worksheet
 * @param column The column in the xlsx file (columns start at zero)
 * @param width Width of the column to set
 */
    SetColumnProperties(column: number, width: number): void;

/**
 * Set the row properties in the worksheet
 * @param row The row in the xlsx file (rows start at zero)
 * @param height Height of the row to set
 */
    SetRowProperties(row: number, height: number): void;

/**
 * Create a new XlsxWorksheet object for writing xlsx files.
 * @param workbook The workbook to create the worksheet in.
 * @param name The name of the worksheet. If omitted the default names 'Sheet1', 'Sheet2' etc will be used.
 */
    constructor(workbook: XlsxWorkbook, name?: string);

}


/** Object returned by Execute */
interface ExecuteReturn {
    /** The exit code from the program/script */
    status: number;
    /** The standard error output from the program/script */
    stderr: string;
    /** The standard output from the program/script */
    stdout: string;
}


/** Object function argument in Execute */
interface ExecuteArgument_data {
    /** The arguments to pass to program */
    arguments?: string[];
    /** The program you want to run */
    program: string;
}

/**
 * Print an error message to the dialogue box adding a carriage return.
 * @param string The string/item that you want to print
 */
declare function ErrorMessage(string: any): void;

/**
 * Execute a program or script outside D3PLOT and get the standard output and error streams.
 * @param data Execute data
 */
declare function Execute(data: ExecuteArgument_data): ExecuteReturn;

/**
 * Exit script
 */
declare function Exit(): void;

/**
 * Get the current working directory
 */
declare function GetCurrentDirectory(): string;

/**
 * Get the directory passed to D3PLOT by the -start_in command line argument
 */
declare function GetStartInDirectory(): string;

/**
 * Get the value of an environment variable
 * @param name The environment variable name
 */
declare function Getenv(name: string): string;

/**
 * Print a message to the dialogue box adding a carriage return.
 * @param string The string/item that you want to print. If '\r' is added to the end of the string then instead of automatically adding a carriage return in the dialogue box, the next message will overwrite the current one. This may be useful for giving feedback to the dialogue box when doing an operation.
 */
declare function Message(string: any): void;

/**
 * Pause execution of the script for time milliseconds. See also Sleep()
 * @param time Number of milliseconds to pause for
 */
declare function MilliSleep(time: number): void;

/**
 * Formats a number to a string with the specified width.
 * @param number The number you want to format.
 * @param width The width of the string you want to format it to (must be less than 80).
 * @param pref_int By default only integer values inside the single precision 32 bit signed integer limit of approximately +/-2e9 are formatted as integers, all other numeric values are formatted as floats. With this argument set to TRUE then integer values up to the mantissa precision of a 64 bit float, approximately +/-9e15, will also be formatted as integers.
 */
declare function NumberToString(number: number, width: number, pref_int?: boolean): string;

/**
 * Print a string to stdout. Note that a carriage return is not added.
 * @param string The string/item that you want to print
 */
declare function Print(string: any): void;

/**
 * Print a string to stdout adding a carriage return.
 * @param string The string/item that you want to print
 */
declare function Println(string: any): void;

/**
 * Sets the current working directory.
 * @param directory_path Path to the directory you would like to change into.
 */
declare function SetCurrentDirectory(directory_path: string): boolean;

/**
 * Pause execution of the script for time seconds. See also MilliSleep()
 * @param time Number of seconds to pause for
 */
declare function Sleep(time: number): void;

/**
 * Do a system command outside D3PLOT. To run an external command and get the output then please use Execute() instead.
 * @param string The system command that you want to do
 */
declare function System(string: any): number;

/**
 * Print a warning message to the dialogue box adding a carriage return.
 * @param string The string/item that you want to print
 */
declare function WarningMessage(string: any): void;

