var Colour = function() {
    /// <field name='BACKGROUND' static='true' type='Number'>Background colour</field>
    /// <field name='BLACK' static='true' type='Number'>Colour black</field>
    /// <field name='BLUE' static='true' type='Number'>Colour blue</field>
    /// <field name='CYAN' static='true' type='Number'>Colour cyan</field>
    /// <field name='DARK_GREEN' static='true' type='Number'>Colour dark green</field>
    /// <field name='DARK_GREY' static='true' type='Number'>Colour dark grey</field>
    /// <field name='DARK_MAGENTA' static='true' type='Number'>Colour dark magenta</field>
    /// <field name='FOREGROUND' static='true' type='Number'>Foreground colour</field>
    /// <field name='GOLD' static='true' type='Number'>Colour gold</field>
    /// <field name='GREEN' static='true' type='Number'>Colour green</field>
    /// <field name='HOT_PINK' static='true' type='Number'>Colour hot pink</field>
    /// <field name='INDIGO' static='true' type='Number'>Colour indigo</field>
    /// <field name='LIGHT_GREY' static='true' type='Number'>Colour light grey</field>
    /// <field name='LIGHT_PINK' static='true' type='Number'>Colour light pink</field>
    /// <field name='LIME' static='true' type='Number'>Colour lime</field>
    /// <field name='MAGENTA' static='true' type='Number'>Colour magenta</field>
    /// <field name='MAROON' static='true' type='Number'>Colour maroon</field>
    /// <field name='MEDIUM_BLUE' static='true' type='Number'>Colour medium blue</field>
    /// <field name='MEDIUM_GREEN' static='true' type='Number'>Colour medium green</field>
    /// <field name='MEDIUM_GREY' static='true' type='Number'>Colour medium grey</field>
    /// <field name='NAVY' static='true' type='Number'>Colour navy</field>
    /// <field name='OLIVE' static='true' type='Number'>Colour olive</field>
    /// <field name='ORANGE' static='true' type='Number'>Colour orange</field>
    /// <field name='PALE_YELLOW' static='true' type='Number'>Colourpale yellow</field>
    /// <field name='PINK' static='true' type='Number'>Colour pink</field>
    /// <field name='PURPLE' static='true' type='Number'>Colour purple</field>
    /// <field name='RED' static='true' type='Number'>Colour red</field>
    /// <field name='SEA_GREEN' static='true' type='Number'>Colour sea green</field>
    /// <field name='SKY' static='true' type='Number'>Colour sky</field>
    /// <field name='TURQUOISE' static='true' type='Number'>Colour turquoise</field>
    /// <field name='USER_1' static='true' type='Number'>Colour user defined 1</field>
    /// <field name='USER_2' static='true' type='Number'>Colour user defined 2</field>
    /// <field name='USER_3' static='true' type='Number'>Colour user defined 3</field>
    /// <field name='USER_4' static='true' type='Number'>Colour user defined 4</field>
    /// <field name='USER_5' static='true' type='Number'>Colour user defined 5</field>
    /// <field name='USER_6' static='true' type='Number'>Colour user defined 6</field>
    /// <field name='USER_n (n = 1 to c150)' static='true' type='Number'>n-th user defined colour</field>
    /// <field name='WHITE' static='true' type='Number'>Colour white</field>
    /// <field name='YELLOW' static='true' type='Number'>Colour yellow</field>
}

Colour.RGB = function() {
    /// <signature>
    /// <summary>Creates a colour from red, green and blue components</summary>
    /// <param name="red" type="Number" optional="false">red component of colour (0-255).</param>
    /// <param name="green" type="Number" optional="false">green component of colour (0-255).</param>
    /// <param name="blue" type="Number" optional="false">blue component of colour (0-255).</param>
    /// <returns type="Number"/>
    /// </signature>
}

var Curve = function() {
    /// <signature>
    /// <summary>Create a new Curve object. The curve will be added to all the currently active graphs.</summary>
    /// <param name="lcid" type="Number" optional="false">Curve number</param>
    /// <param name="tag" type="String" optional="true">Tag used to reference the curve in FAST-TCF scripts</param>
    /// <param name="Line label" type="String" optional="true">Line label for the curve</param>
    /// <param name="X-axis label" type="String" optional="true">X-axis label for the curve</param>
    /// <param name="Y-axis label" type="String" optional="true">Y-axis label for the curve</param>
    /// <returns type="Curve"/>
    /// </signature>
    /// <field name='average' static='false' type='Number'>Curve average value (read only)</field>
    /// <field name='colour' static='false' type='Number'>The Colour of the curve</field>
    /// <field name='directory' static='false' type='String'>Directory the curve came from</field>
    /// <field name='entity_id' static='false' type='Number'>The ID of the entity that the curve was generated from.</field>
    /// <field name='entity_type' static='false' type='Number'>The Entity type that the curve was generated from</field>
    /// <field name='file' static='false' type='String'>Filename the curve came from</field>
    /// <field name='hic' static='false' type='Number'>Curve HIC value - returns 0.0 if the HIC hasn't been calculated (read only)</field>
    /// <field name='hic_tmax' static='false' type='Number'>End of HIC time windows - returns 0.0 if the HIC hasn't been calculated (read only)</field>
    /// <field name='hic_tmin' static='false' type='Number'>Start of HIC time windows - returns 0.0 if the HIC hasn't been calculated (read only)</field>
    /// <field name='hicd' static='false' type='Number'>Curve HIC(d) value - returns 0.0 if the HIC(d) hasn't been calculated (read only)</field>
    /// <field name='hicd_tmax' static='false' type='Number'>End of HIC(d) time windows - returns 0.0 if the HIC(d) hasn't been calculated (read only)</field>
    /// <field name='hicd_tmin' static='false' type='Number'>Start of HIC(d) time windows - returns 0.0 if the HIC(d) hasn't been calculated (read only)</field>
    /// <field name='id' static='false' type='Number'>Curve ID (read only)</field>
    /// <field name='is_null' static='false' type='Number'>Returns 1 if the curve is NULL (read only)</field>
    /// <field name='label' static='false' type='String'>Curve label</field>
    /// <field name='model' static='false' type='Number'>The ID of the model that a curve was read from.</field>
    /// <field name='npoints' static='false' type='Number'>Number of curve points (read only)</field>
    /// <field name='regr_rsq' static='false' type='Number'>Pearson's R^2 value for regression curve, returns 0.0 if the curve has not come from the regression operation. (read only)</field>
    /// <field name='regr_sdgrad' static='false' type='Number'>Standard deviation of the linear regression gradient value, returns 0.0 if the curve has not come from linear regression. (read only)</field>
    /// <field name='regr_sdicpt' static='false' type='Number'>Standard deviation of the linear regression intercept value, returns 0.0 if the curve has not come from linear regression. (read only)</field>
    /// <field name='regr_sdyx' static='false' type='Number'>Standard deviation of the linear regression values 'y = bx + c', returns 0.0 if the curve has not come from linear regression. (read only)</field>
    /// <field name='rms' static='false' type='Number'>Curve RMS value (read only)</field>
    /// <field name='style' static='false' type='Number'>The LineStyle used to draw the curve</field>
    /// <field name='symbol' static='false' type='Number'>The Symbol style for a curve</field>
    /// <field name='tag' static='false' type='String'>Curve tag. If a FAST-TCF script is running then this is the FAST-TCF tag</field>
    /// <field name='title' static='false' type='String'>Curve title</field>
    /// <field name='tms' static='false' type='Number'>3ms Clip value - returns 0.0 if the 3ms Clip value hasn't been calculated (read only)</field>
    /// <field name='tms_tmax' static='false' type='Number'>End of 3ms clip time windows - returns 0.0 if the 3ms Clip hasn't been calculated (read only)</field>
    /// <field name='tms_tmin' static='false' type='Number'>Start of 3ms clip time windows - returns 0.0 if the 3ms Clip hasn't been calculated (read only)</field>
    /// <field name='unit_system' static='false' type='Number'>The Curve UnitSystem</field>
    /// <field name='width' static='false' type='Number'>The LineWidth used to draw the curve</field>
    /// <field name='x_at_ymax' static='false' type='Number'>X axis value at the Y axis maximum (read only)</field>
    /// <field name='x_at_ymin' static='false' type='Number'>X axis value at the Y axis minimum (read only)</field>
    /// <field name='x_axis_label' static='false' type='String'>Curve X axis label</field>
    /// <field name='x_axis_unit' static='false' type='Number'>The X axis Units</field>
    /// <field name='xmax' static='false' type='Number'>X axis maximum value (read only)</field>
    /// <field name='xmin' static='false' type='Number'>X axis minimum value (read only)</field>
    /// <field name='y_axis_label' static='false' type='String'>Curve Y axis label</field>
    /// <field name='y_axis_unit' static='false' type='Number'>The Y axis Units</field>
    /// <field name='ymax' static='false' type='Number'>Y axis maximum value (read only)</field>
    /// <field name='ymin' static='false' type='Number'>Y axis minimum value (read only)</field>
    /// <field name='AFTER' static='true' type='Number'>Insertion of curve data option.</field>
    /// <field name='BEFORE' static='true' type='Number'>Insertion of curve data option.</field>
}

Curve.AddFlaggedToGraph = function() {
    /// <signature>
    /// <summary>Adds flagged curves to a graph.</summary>
    /// <param name="flag" type="Flag" optional="false">Flag to check on the curve</param>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to remove the curve from, If undefined then the curve is removed from all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.AddPoint = function() {
    /// <signature>
    /// <summary>Adds a point at the end of the curve.</summary>
    /// <param name="xvalue" type="Number" optional="false">The x value of the point.</param>
    /// <param name="yvalue" type="Number" optional="false">The y value of the point.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.AddToGraph = function() {
    /// <signature>
    /// <summary>Adds a curve to a graph.</summary>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to add the curve to, If undefined then the curve is added to all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.ClearFlag = function() {
    /// <signature>
    /// <summary>Clears a flag on the curve.</summary>
    /// <param name="flag" type="Number" optional="false">Flag to clear on the curve</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.Copy = function() {
    /// <signature>
    /// <summary>Copies a curve.</summary>
    /// <param name="source" type="Number" optional="false">ID of curve to copy from</param>
    /// <param name="target" type="Number" optional="false">ID of curve to copy to</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.Delete = function() {
    /// <signature>
    /// <summary>Deletes a curve</summary>
    /// <param name="curve" type="Number" optional="false">ID of curve to delete</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.DeleteFlagged = function() {
    /// <signature>
    /// <summary>Deletes flagged curves</summary>
    /// <param name="flag" type="Flag" optional="false">Flag to check on the curve</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.DeletePoint = function() {
    /// <signature>
    /// <summary>Deletes a point in a curve. The input for the point number should start at 1 for the 1st point not zero.</summary>
    /// <param name="ipt" type="Number" optional="false">The point you want to insert the data before or after.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.Exists = function() {
    /// <signature>
    /// <summary>Checks if a curve exists</summary>
    /// <param name="curve" type="Number" optional="false">ID of curve to check</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Curve.First = function() {
    /// <signature>
    /// <summary>Returns the first curve.</summary>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.FirstFreeID = function() {
    /// <signature>
    /// <summary>Returns the ID of the first free curve.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Curve.FirstID = function() {
    /// <signature>
    /// <summary>Returns the ID of the first curve.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Curve.FlagAll = function() {
    /// <signature>
    /// <summary>Flags all of the curves with a defined flag</summary>
    /// <param name="flag" type="Number" optional="false">Flag to set on the curves</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.Flagged = function() {
    /// <signature>
    /// <summary>Checks if the curve is flagged or not.</summary>
    /// <param name="flag" type="Number" optional="false">Flag to check on the curve</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Curve.prototype.Freeze = function() {
    /// <signature>
    /// <summary>Freezes an unblanked curve on one or all graphs.</summary>
    /// <param name="graph" type="Number" optional="false">Graph number to freeze curve on or 0 for all graphs.</param>
    /// <param name="Freeze option" type="Number" optional="false">No argument or 1 to freeze the curve, 0 to unfreeze.</param>
    /// </signature>
}

Curve.GetFlagged = function() {
    /// <signature>
    /// <summary>Returns an array of all curves flagged with a given flag.</summary>
    /// <param name="flag" type="Flag" optional="false">Flag for which to return flagged objects.</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Curve.GetFromID = function() {
    /// <signature>
    /// <summary>Returns the curve object for a curve ID.</summary>
    /// <param name="ID" type="Number" optional="false">ID of curve to return object for</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.GetFromTag = function() {
    /// <signature>
    /// <summary>Finds a curve from it's Tag. This function is only available when running a Javascript from within a FAST-TCF script</summary>
    /// <param name="TAG" type="String" optional="false">TAG of curve to return object for</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.prototype.GetPoint = function() {
    /// <signature>
    /// <summary>Returns x and y data for a point in a curve. The input for the point number should start at 1 for the 1st point not zero. In the array returned array[0] contains the x axis value and array[1] contains the y-axis value.</summary>
    /// <param name="row" type="Number" optional="false">The point you want the data for.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Curve.HighestID = function() {
    /// <signature>
    /// <summary>Returns the ID of the highest curve currently being used</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Curve.prototype.InsertPoint = function() {
    /// <signature>
    /// <summary>Inserts a new point before or after the specified point.</summary>
    /// <param name="ipt" type="Number" optional="false">The point you want to insert the data before or after.</param>
    /// <param name="xvalue" type="Number" optional="false">The x value of the point.</param>
    /// <param name="yvalue" type="Number" optional="false">The y value of the point.</param>
    /// <param name="position" type="Number" optional="false">Specify either before or after the selected pioint. Use 'Curve.BEFORE' for before, and 'Curve.AFTER' for after.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.Next = function() {
    /// <signature>
    /// <summary>Returns the next curve in the model.</summary>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.Pick = function() {
    /// <signature>
    /// <summary>Picks a single curve.</summary>
    /// <param name="prompt" type="String" optional="false">Text to display as a prompt to the user</param>
    /// <param name="modal" type="Boolean" optional="true">If selection is modal (blocks the user from doing anything else in T/HIS until this window is dismissed). If omitted the selection will be modal.</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.prototype.Previous = function() {
    /// <signature>
    /// <summary>Returns the previous curve in the model.</summary>
    /// <returns type="Curve"/>
    /// </signature>
}

Curve.RemoveFlaggedFromGraph = function() {
    /// <signature>
    /// <summary>Removes flagged curves from a graph.</summary>
    /// <param name="flag" type="Flag" optional="false">Flag to check on the curve</param>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to remove the curve from, If undefined then the curve is removed from all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.RemoveFromGraph = function() {
    /// <signature>
    /// <summary>Removes a curve from a graph.</summary>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to remove the curve from, If undefined then the curve is removed from all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.Select = function() {
    /// <signature>
    /// <summary>Allows the user to select curves.</summary>
    /// <param name="flag" type="Number" optional="false">Flag to use when selecting curves</param>
    /// <param name="prompt" type="String" optional="false">Text to display as a prompt to the user</param>
    /// <param name="modal" type="Boolean" optional="true">If selection is modal (blocks the user from doing anything else in T/HIS until this window is dismissed). If omitted the selection will be modal.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Curve.prototype.SetFlag = function() {
    /// <signature>
    /// <summary>Sets a flag on the curve.</summary>
    /// <param name="flag" type="Number" optional="false">Flag to set on the curve</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.SetPoint = function() {
    /// <signature>
    /// <summary>Sets the x and y values for a specified point in a curve.</summary>
    /// <param name="ipt" type="Number" optional="false">The point to set the data for.</param>
    /// <param name="xvalue" type="Number" optional="false">The x value of the point.</param>
    /// <param name="yvalue" type="Number" optional="false">The y value of the point.</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.UnflagAll = function() {
    /// <signature>
    /// <summary>Unsets a defined flag on all of the curves.</summary>
    /// <param name="flag" type="Number" optional="false">Flag to unset on the curves</param>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.Update = function() {
    /// <signature>
    /// <summary>Updates a curve properties (min,max, average values etc).</summary>
    /// <returns type="null"/>
    /// </signature>
}

Curve.prototype.YatX = function() {
    /// <signature>
    /// <summary>Returns the y value of the curve at a given x value, interpolating if requested x value lies between data points.</summary>
    /// <param name="xvalue" type="Number" optional="false">The x value.</param>
    /// <returns type="Number"/>
    /// </signature>
}

var Datum = function() {
    /// <signature>
    /// <summary>Create a new Datum object. The datum will be added to all the currently active graphs.</summary>
    /// <param name="acronym" type="String" optional="false">Datum acronym</param>
    /// <param name="type" type="Number" optional="false">Specify type of datum line. Can be Datum.CONSTANT_X, Datum.CONSTANT_Y, Datum.CONSTANT_Y2, Datum.POINTS</param>
    /// <param name="value" type="Number" optional="false">Value for Datum.CONSTANT_X, Datum.CONSTANT_Y or Datum.CONSTANT_Y2 type Datum. If it is a Datum.POINTS type Datum then this should be an array of X, Y pairs or a curve ID to copy points from.</param>
    /// <returns type="Datum"/>
    /// </signature>
    /// <field name='acronym' static='false' type='String'>Datum acronym</field>
    /// <field name='fill_colour_above' static='false' type='Colour'>The colour above the datum line</field>
    /// <field name='fill_colour_below' static='false' type='Colour'>The colour below the datum line</field>
    /// <field name='fill_colour_between' static='false' type='Colour'>The colour in between the datum line and the optional second datum line</field>
    /// <field name='fill_colour_left' static='false' type='Colour'>The colour left of the datum line</field>
    /// <field name='fill_colour_right' static='false' type='Colour'>The colour right of the datum line</field>
    /// <field name='fill_type' static='false' type='Number'>The fill type. Can be Datum.FILL_ABOVE_BELOW, Datum.FILL_RIGHT_LEFT. Note that this can only be changed if the datum is of the type Datum.POINTS.</field>
    /// <field name='label' static='false' type='String'>Datum label</field>
    /// <field name='label2' static='false' type='String'>Label for optional 2nd datum line</field>
    /// <field name='label_colour' static='false' type='Colour'>The colour of the datum label</field>
    /// <field name='label_position' static='false' type='Number'>The label position. Can be Datum.LABEL_NONE Datum.LABEL_ABOVE_CENTRE, Datum.LABEL_ABOVE_LEFT, Datum.LABEL_ABOVE_RIGHT, Datum.LABEL_BELOW_CENTRE, Datum.LABEL_BELOW_LEFT, Datum.LABEL_BELOW_RIGHT, Datum.LABEL_MIDDLE_LEFT, Datum.LABEL_TOP_LEFT, Datum.LABEL_BOTTOM_LEFT, Datum.LABEL_MIDDLE_RIGHT, Datum.LABEL_TOP_RIGHT, Datum.LABEL_BOTTOM_RIGHT,</field>
    /// <field name='line_colour' static='false' type='Colour'>The colour of the datum line</field>
    /// <field name='line_style' static='false' type='LineStyle'>The line style used to draw the datum line</field>
    /// <field name='line_width' static='false' type='LineWidth'>The line width used to draw the datum line</field>
    /// <field name='CONSTANT_X' static='true' type='Number'>Constant X type datum.</field>
    /// <field name='CONSTANT_Y' static='true' type='Number'>Constant Y type datum.</field>
    /// <field name='CONSTANT_Y2' static='true' type='Number'>Constant Y2 type datum.</field>
    /// <field name='FILL_ABOVE_BELOW' static='true' type='Number'>Fill datum above and below.</field>
    /// <field name='FILL_RIGHT_LEFT' static='true' type='Number'>Fill datum right and left.</field>
    /// <field name='LABEL_ABOVE_CENTRE' static='true' type='Number'>Label position above centre.</field>
    /// <field name='LABEL_ABOVE_LEFT' static='true' type='Number'>Label position above left.</field>
    /// <field name='LABEL_ABOVE_RIGHT' static='true' type='Number'>Label position above right.</field>
    /// <field name='LABEL_BELOW_CENTRE' static='true' type='Number'>Label position below centre.</field>
    /// <field name='LABEL_BELOW_LEFT' static='true' type='Number'>Label position below left.</field>
    /// <field name='LABEL_BELOW_RIGHT' static='true' type='Number'>Label position below right.</field>
    /// <field name='LABEL_BOTTOM_LEFT' static='true' type='Number'>Label position bottom left.</field>
    /// <field name='LABEL_BOTTOM_RIGHT' static='true' type='Number'>Label position bottom right.</field>
    /// <field name='LABEL_HORIZONTAL' static='true' type='Number'>Label horizonal orientation.</field>
    /// <field name='LABEL_MIDDLE_LEFT' static='true' type='Number'>Label position middle left.</field>
    /// <field name='LABEL_MIDDLE_RIGHT' static='true' type='Number'>Label position middle right.</field>
    /// <field name='LABEL_NONE' static='true' type='Number'>No label.</field>
    /// <field name='LABEL_TOP_LEFT' static='true' type='Number'>Label position top left.</field>
    /// <field name='LABEL_TOP_RIGHT' static='true' type='Number'>Label position top right.</field>
    /// <field name='LABEL_VERTICAL' static='true' type='Number'>Label vertical orientation.</field>
    /// <field name='POINTS' static='true' type='Number'>Points type datum.</field>
}

Datum.prototype.AddToGraph = function() {
    /// <signature>
    /// <summary>Adds a datum to a graph.</summary>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to add the datum to, If undefined then the datum is added to all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

Datum.Delete = function() {
    /// <signature>
    /// <summary>Deletes a datum</summary>
    /// <param name="datum" type="String" optional="false">Acronym of datum to delete</param>
    /// <returns type="null"/>
    /// </signature>
}

Datum.Exists = function() {
    /// <signature>
    /// <summary>Checks if a datum exists</summary>
    /// <param name="datum" type="String" optional="false">Acronym of datum to check</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Datum.First = function() {
    /// <signature>
    /// <summary>Returns the first datum.</summary>
    /// <returns type="Datum"/>
    /// </signature>
}

Datum.GetFromAcronym = function() {
    /// <signature>
    /// <summary>Returns the datum object for a datum acronym.</summary>
    /// <param name="datum" type="String" optional="false">Acronym of datum to return object for</param>
    /// <returns type="Datum"/>
    /// </signature>
}

Datum.prototype.Next = function() {
    /// <signature>
    /// <summary>Returns the next datum in the model.</summary>
    /// <returns type="Datum"/>
    /// </signature>
}

Datum.prototype.RemoveFromGraph = function() {
    /// <signature>
    /// <summary>Removes a datum from a graph.</summary>
    /// <param name="graph, graph..." type="int" optional="false">Optional list of graphs to remove the datum from, If undefined then the datum is removed from all graphs.</param>
    /// <returns type="null"/>
    /// </signature>
}

var Entity = function() {
    /// <field name='AIRBAG' static='true' type='Number'>AIRBAG entity code (for all airbag related entities)</field>
    /// <field name='AIRBAG_CHAMBER_DATA' static='true' type='Number'>AIRBAG CHAMBER DATA entity code</field>
    /// <field name='AIRBAG_CPM_PART_DATA' static='true' type='Number'>AIRBAG CPM PART DATA entity code</field>
    /// <field name='AIRBAG_CPM_SENSORS' static='true' type='Number'>AIRBAG CPM SENSORS entity code</field>
    /// <field name='AIRBAG_CV_PART_DATA' static='true' type='Number'>AIRBAG CV PART DATA entity code</field>
    /// <field name='AIRBAG_DATA' static='true' type='Number'>AIRBAG DATA entity code</field>
    /// <field name='BEAM' static='true' type='Number'>BEAM entity code</field>
    /// <field name='BEAM_DISCRETE' static='true' type='Number'>DISCRETE BEAM entity code</field>
    /// <field name='BEAM_NORMAL' static='true' type='Number'>NORMAL BEAM entity code</field>
    /// <field name='BEARING' static='true' type='Number'>BEARING entity code</field>
    /// <field name='BOUNDARY' static='true' type='Number'>BOUNDARY entity code</field>
    /// <field name='BOUNDARY_DIS_NODAL_LOAD' static='true' type='Number'>DISCRETE NODAL LOAD entity code</field>
    /// <field name='BOUNDARY_DIS_RBODY_LOAD' static='true' type='Number'>DISCRETE RIGID BODY LOAD entity code</field>
    /// <field name='BOUNDARY_PRES_NODAL_LOAD' static='true' type='Number'>PRESSURE NODAL LOAD entity code</field>
    /// <field name='BOUNDARY_VEL_NODAL_LOAD' static='true' type='Number'>VELOCITY NODAL LOAD entity code</field>
    /// <field name='BOUNDARY_VEL_RBODY_LOAD' static='true' type='Number'>VELOCITY RIGID BODY LOAD entity code</field>
    /// <field name='CESE' static='true' type='Number'>CESE entity code</field>
    /// <field name='CESE_DRAG_DATA' static='true' type='Number'>CESE FSI DRAG DATA entity code</field>
    /// <field name='CESE_NODE_DATA' static='true' type='Number'>CESE NODE DATA entity code</field>
    /// <field name='CESE_POINT_DATA' static='true' type='Number'>CESE POINT DATA entity code</field>
    /// <field name='CESE_SEGMENT_DATA' static='true' type='Number'>CESE SEGMENT SET DATA entity code</field>
    /// <field name='CONTACT' static='true' type='Number'>CONTACT entity code</field>
    /// <field name='CONTACT_ENERGIES' static='true' type='Number'>CONTACT ENERGIES entity code</field>
    /// <field name='CONTACT_FORCES' static='true' type='Number'>CONTACT FORCES entity code</field>
    /// <field name='CURVOUT' static='true' type='Number'>CURVOUT entity code</field>
    /// <field name='EM' static='true' type='Number'>EM entity code</field>
    /// <field name='EM_NODE_DATA' static='true' type='Number'>EM NODE DATA entity code</field>
    /// <field name='EM_POINT_DATA' static='true' type='Number'>EM POINT DATA entity code</field>
    /// <field name='FSI' static='true' type='Number'>FSI entity code</field>
    /// <field name='FSI_SENSOR_DATA' static='true' type='Number'>FSI SENSOR DATA entity code</field>
    /// <field name='FSI_SURFACE_DATA' static='true' type='Number'>FSI SURFACE DATA entity code</field>
    /// <field name='GEOMETRIC_CONTACT' static='true' type='Number'>GEOMETRIC CONTACT entity code</field>
    /// <field name='ICFD' static='true' type='Number'>ICFD entity code</field>
    /// <field name='ICFD_DRAG_DATA' static='true' type='Number'>ICFD DRAG DATA entity code</field>
    /// <field name='ICFD_NODE_DATA' static='true' type='Number'>ICFD NODE DATA entity code</field>
    /// <field name='ICFD_POINT_DATA' static='true' type='Number'>ICFD POINT DATA entity code</field>
    /// <field name='ICFD_THERMAL_DATA' static='true' type='Number'>ICFD THERMAL DATA entity code</field>
    /// <field name='JOINT' static='true' type='Number'>JOINT entity code</field>
    /// <field name='JOINT_FLEXION_TORSION' static='true' type='Number'>FLEXION TORSION JOINT entity code</field>
    /// <field name='JOINT_GENERALIZED' static='true' type='Number'>GENERALIZED JOINT entity code</field>
    /// <field name='JOINT_JOINT' static='true' type='Number'>Conventional LS-DYNA JOINT entity code</field>
    /// <field name='JOINT_TRANSLATIONAL' static='true' type='Number'>TRANSLATIONAL JOINT entity code</field>
    /// <field name='MASS' static='true' type='Number'>MASS entity code</field>
    /// <field name='MODEL' static='true' type='Number'>MODEL entity code</field>
    /// <field name='NODAL_RB' static='true' type='Number'>NODAL RIGID BODY entity code</field>
    /// <field name='NODAL_RB_BODY' static='true' type='Number'>BODY in NODAL RIGID BODY entity code</field>
    /// <field name='NODAL_RB_PART' static='true' type='Number'>PART in NODAL RIGID BODY entity code</field>
    /// <field name='NODE' static='true' type='Number'>NODE entity code</field>
    /// <field name='NODE_GROUP' static='true' type='Number'>NODAL FORCE GROUP entity code</field>
    /// <field name='NODE_GROUP_GROUPS' static='true' type='Number'>GROUPS in NODAL FORCE GROUP entity code</field>
    /// <field name='NODE_GROUP_NODES' static='true' type='Number'>NODES in NODAL FORCE GROUP entity code</field>
    /// <field name='PART' static='true' type='Number'>PART entity code</field>
    /// <field name='PART_GROUP' static='true' type='Number'>PART GROUP entity code</field>
    /// <field name='PBLAST' static='true' type='Number'>PBLAST entity code</field>
    /// <field name='PBLAST_DATA' static='true' type='Number'>PBLAST DATA entity code</field>
    /// <field name='PBLAST_PART' static='true' type='Number'>PBLAST PART entity code</field>
    /// <field name='PRETENSIONER' static='true' type='Number'>PRETENSIONER entity code</field>
    /// <field name='PRTUBE' static='true' type='Number'>PRTUBE entity code</field>
    /// <field name='PULLEY' static='true' type='Number'>PULLEY entity code</field>
    /// <field name='RETRACTOR' static='true' type='Number'>RETRACTOR entity code</field>
    /// <field name='RIGIDWALL' static='true' type='Number'>RIGIDWALL entity code</field>
    /// <field name='SEATBELT' static='true' type='Number'>SEATBELT entity code</field>
    /// <field name='SHELL' static='true' type='Number'>SHELL entity code</field>
    /// <field name='SLIPRING' static='true' type='Number'>SLIPRING entity code</field>
    /// <field name='SOLID' static='true' type='Number'>SOLID entity code</field>
    /// <field name='SPC' static='true' type='Number'>SPC entity code</field>
    /// <field name='SPC_FORCES' static='true' type='Number'>SPC FORCES entity code</field>
    /// <field name='SPC_MODEL' static='true' type='Number'>SPC MODEL entity code</field>
    /// <field name='SPC_MOMENTS' static='true' type='Number'>SPC MOMENTS entity code</field>
    /// <field name='SPC_SET' static='true' type='Number'>SPC SET entity code</field>
    /// <field name='SPH' static='true' type='Number'>SPH entity code</field>
    /// <field name='SPRING' static='true' type='Number'>SPRING entity code</field>
    /// <field name='SPRING_ROTATIONAL' static='true' type='Number'>ROTATIONAL SPRING entity code</field>
    /// <field name='SPRING_TRANSLATIONAL' static='true' type='Number'>TRANSLATIONAL SPRING entity code</field>
    /// <field name='SUBSYSTEM' static='true' type='Number'>SUBSYSTEM entity code</field>
    /// <field name='THICK_SHELL' static='true' type='Number'>THICK SHELL entity code</field>
    /// <field name='TRACER' static='true' type='Number'>TRACER entity code</field>
    /// <field name='WELD' static='true' type='Number'>WELD entity code</field>
    /// <field name='WELD_ASSEMBLY' static='true' type='Number'>WELD ASSEMBLY entity code</field>
    /// <field name='WELD_CONSTRAINED' static='true' type='Number'>CONSTRAINED WELD entity code</field>
    /// <field name='WELD_GENERALISED' static='true' type='Number'>GENERALISED WELD entity code</field>
    /// <field name='WELD_NON_NODAL' static='true' type='Number'>NON-NODAL WELD entity code</field>
    /// <field name='WELD_SOLID' static='true' type='Number'>SOLID WELD entity code</field>
    /// <field name='WELD_SPOTWELD_BEAMS' static='true' type='Number'>SPOTWELD BEAMS entity code</field>
    /// <field name='X_SECTION' static='true' type='Number'>CROSS SECTION entity code</field>
}

var File = function() {
    /// <signature>
    /// <summary>Create a new File object for reading and writing text files.</summary>
    /// <param name="filename" type="String" optional="false">Filename of the file you want to read/write. If reading, the file must exist. If writing, the file will be overwritten (if it exists) if mode is File.WRITE, or if mode is File.APPEND it will be appended to if it exists, or created if it does not. When reading a file the filename can also be a URL (uniform resource locator) in which case the file will be read from the remote site. See File.Get() for more details on the format of the URL.</param>
    /// <param name="mode" type="Number" optional="false">The mode to open the file with. Can be File.READ, File.WRITE or File.APPEND. For File.WRITE or File.APPEND it can also be ORed with File.BINARY if required. By default text is read and written as ASCII. To read/write text in utf-8 mode can also be ORed with File.UTF8 if required.</param>
    /// <returns type="File"/>
    /// </signature>
    /// <field name='filename' static='false' type='String'>Name of the file</field>
    /// <field name='mode' static='false' type='Number'>Mode the file was opened with (File.READ, File.WRITE etc)</field>
    /// <field name='APPEND' static='true' type='Number'>Flag to open file for appending</field>
    /// <field name='BINARY' static='true' type='Number'>Flag to open file in binary mode. This will have no effect on unix/linux but for windows if a file is opened for writing with binary mode \n will not be translated to \r\n (CRLF), it will be written as \n (LF)</field>
    /// <field name='CURRENT' static='true' type='Number'>Seek relative to current file position</field>
    /// <field name='DIRECTORY' static='true' type='Number'>Find directories</field>
    /// <field name='END' static='true' type='Number'>Seek relative to end of the file</field>
    /// <field name='FILE' static='true' type='Number'>Find files</field>
    /// <field name='READ' static='true' type='Number'>Flag to open file for reading</field>
    /// <field name='START' static='true' type='Number'>Seek relative to start of the file</field>
    /// <field name='UTF8' static='true' type='Number'>Flag to open file for reading as UTF-8 encoding.</field>
    /// <field name='WRITE' static='true' type='Number'>Flag to open file for writing</field>
}

File.prototype.Close = function() {
    /// <signature>
    /// <summary>Close a file opened by a File object.</summary>
    /// <returns type="null"/>
    /// </signature>
}

File.Copy = function() {
    /// <signature>
    /// <summary>Copies a file</summary>
    /// <param name="source" type="String" optional="false">Source filename you want to copy.</param>
    /// <param name="dest" type="String" optional="false">Destination filename you want to copy source file to.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.Delete = function() {
    /// <signature>
    /// <summary>Deletes a file</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to delete.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.DriveMapFilename = function() {
    /// <signature>
    /// <summary>Changes a filename or directory name to the correct format for a specific operating system using the directory mappings (if present)</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to drive map.</param>
    /// <param name="format" type="Number" optional="false">The format for the file/directory name. Can be Include.NATIVE, Include.UNIX or Include.WINDOWS</param>
    /// <returns type="String"/>
    /// </signature>
}

File.Exists = function() {
    /// <signature>
    /// <summary>Check if a file exists. See also File.IsDirectory() and See also File.IsFile().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check for existance.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.FindFiles = function() {
    /// <signature>
    /// <summary>Find any files and/or directories in a directory.</summary>
    /// <param name="directory" type="String" optional="false">Directory to look for files/directories in.</param>
    /// <param name="type" type="Number" optional="true">Type of things to find. Can be bitwise OR of File.FILE and File.DIRECTORY. If omitted only files will be returned.</param>
    /// <returns type="Array" elementType="Filenames/directories"/>
    /// </signature>
}

File.prototype.FindLineContaining = function() {
    /// <signature>
    /// <summary>Reads a line from a file which contains contain, opened for reading by a File object. Although this is possible using core JavaScript functions this function should be significantly faster as most of the processing is done by Primer in C rather than in the JavaScript interpreter. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must contain that string. If more than one argument is used then lines which contain the string contain1 OR contain2 OR contain3 etc will be returned</summary>
    /// <param name="contain1" type="String" optional="false">String which matching lines must contain</param>
    /// <param name="contain2" type="String" optional="true">alternative string which matching lines must contain</param>
    /// <param name="contain3" type="String" optional="true">alternative string which matching lines must contain</param>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.FindLineStarting = function() {
    /// <signature>
    /// <summary>Reads a line from a file which starts with start, opened for reading by a File object. Although this is possible using core JavaScript functions this function should be significantly faster as most of the processing is done by Primer in C rather than in the JavaScript interpreter. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must start with that string. If more than one argument is used then lines which start with start1 OR start2 OR start3 etc will be returned</summary>
    /// <param name="start1" type="String" optional="false">String which matching lines must start with</param>
    /// <param name="start2" type="String" optional="true">alternative string which matching lines must start with</param>
    /// <param name="start3" type="String" optional="true">alternative string which matching lines must start with</param>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.Flush = function() {
    /// <signature>
    /// <summary>Flushes a file opened for writing by a File object.</summary>
    /// <returns type="null"/>
    /// </signature>
}

File.Get = function() {
    /// <signature>
    /// <summary>Get a file from a remote location. See also File.Proxy(), File.ProxyPassword() and File.ProxyUsername().</summary>
    /// <param name="url" type="String" optional="false">URL (uniform resource locator) of remote file you want to get. Currently http and ftp are supported. For http give the full address including the leading 'http://'. e.g. 'http://www.example.com/file.html'. For ftp an optional username and password can be given. e.g. 'ftp://ftp.example.com' retrieves the directory listing for the root directory. 'ftp://ftp.example.com/readme.txt' downloads the file readme.txt from the root directory. 'ftp://user:password@ftp.example.com/readme.txt' retrieves the readme.txt file from the user's home directory.</param>
    /// <param name="filename" type="String" optional="false">Filename you want to save the file to.</param>
    /// <param name="options" type="Object" optional="true">Options for get. If 'username' and 'password' are set then basic authorization using the username and password will be used.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.IsAbsolute = function() {
    /// <signature>
    /// <summary>Check if a filename is absolute or relative.</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.IsDirectory = function() {
    /// <signature>
    /// <summary>Check if a filename is a directory. See also File.Exists(), File.IsFile(), File.IsReadable() and File.IsWritable().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.IsFile = function() {
    /// <signature>
    /// <summary>Check if a filename is a file. See also File.Exists(), File.IsDirectory(), File.IsReadable() and File.IsWritable().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.IsReadable = function() {
    /// <signature>
    /// <summary>Check if a filename has read permissions. See also File.Exists(), File.IsDirectory() and File.IsWritable().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.IsWritable = function() {
    /// <signature>
    /// <summary>Check if a filename has write permissions. If filename exists and it is a file then it is checked to see if it can be opened with write (File.APPEND permissions). If filename exists and it is a directory then the directory is checked for write permission (can files be created in the directory). If filename does not exist then it is assumed to be a file and is checked to see if it can be opened for writing (File.WRITE permissions). See also File.Exists(), File.IsDirectory() and File.IsReadable().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.Mkdir = function() {
    /// <signature>
    /// <summary>Make a directory. If Primer preference 'directory_permission' is set e.g.755 then this will apply (same as if set by chmod 755) ignoring any setting of umask. If there is no preference then the users current setting of umask will control permissions (same as system mkdir)</summary>
    /// <param name="directory" type="String" optional="false">The name of the directory you want to create.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.Mktemp = function() {
    /// <signature>
    /// <summary>Make a temporary filename for writing a temporary file.</summary>
    /// <returns type="String"/>
    /// </signature>
}

File.Proxy = function() {
    /// <signature>
    /// <summary>Set a proxy for files opened by http, ftp etc. See also File.Get(), File.ProxyPassword() and File.ProxyUsername().</summary>
    /// <param name="name" type="String" optional="false">The name of the proxy.</param>
    /// <returns type="null"/>
    /// </signature>
}

File.ProxyPassword = function() {
    /// <signature>
    /// <summary>Set a proxy password for files opened by http, ftp etc. See also File.Get(), File.Proxy() and File.ProxyUsername().</summary>
    /// <param name="name" type="String" optional="false">Password for the proxy server.</param>
    /// <returns type="null"/>
    /// </signature>
}

File.ProxyUsername = function() {
    /// <signature>
    /// <summary>Set a proxy username for files opened by http, ftp etc. See also File.Get(), File.Proxy() and File.ProxyPassword().</summary>
    /// <param name="username" type="String" optional="false">The username for the proxy.</param>
    /// <returns type="null"/>
    /// </signature>
}

File.prototype.ReadAll = function() {
    /// <signature>
    /// <summary>Reads all the remaining characters from a file opened for reading by a File object. As this function can read the entire file as a string be careful when reading large files as it will consume large amounts of memory.</summary>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.ReadArrayBuffer = function() {
    /// <signature>
    /// <summary>Reads binary data from a file opened for reading by a File object. The data is returned as an ArrayBuffer object. For more details on how to use an ArrayBuffer see the following links: https://developer.mozilla.org/en/JavaScript_typed_arrays https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBufferView https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView.</summary>
    /// <param name="length" type="Number" optional="true">Number of bytes to try to read from the file. If omitted all the remaining data from the file will be read.</param>
    /// <returns type="ArrayBuffer"/>
    /// </signature>
}

File.ReadCSV = function() {
    /// <signature>
    /// <summary>Reads the input CSV file and returns an array of string arrays. If the CSV file has legitimate records the function returns an Array object containing sub-arrays of strings otherwise the function returns NULL. The lengths of all the sub-arrays are the same and equal to maximum number of fields in any of the records. For records in a CSV file having fewer fields, the respective sub-arrays are padded with NULL elements to the maximum array length.</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to read CSV options from.</param>
    /// <param name="delimiter" type="String" optional="true">Delimiter string to be used. Default is a comma (",").</param>
    /// <param name="comment" type="String" optional="true">Comment string to be used. Default is a dollar sign ("$").</param>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.ReadChar = function() {
    /// <signature>
    /// <summary>Reads a single character from a file opened for reading by a File object.</summary>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.ReadLine = function() {
    /// <signature>
    /// <summary>Reads a line from a file opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 512 characters is used. If you expect a file to have lines longer than 512 characters then use ReadLongLine which allows lines of any length.</summary>
    /// <returns type="String"/>
    /// </signature>
}

File.prototype.ReadLongLine = function() {
    /// <signature>
    /// <summary>Reads a line from a file opened for reading by a File object. The line can be any length. If your file has lines shorter than 512 characters then you may want to use ReadLine instead which is faster.</summary>
    /// <returns type="String"/>
    /// </signature>
}

File.Rename = function() {
    /// <signature>
    /// <summary>Rename an existing file to have a different name.</summary>
    /// <param name="oldname" type="String" optional="false">Existing filename you want to rename</param>
    /// <param name="newname" type="String" optional="false">New filename you want to rename to</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.prototype.Seek = function() {
    /// <signature>
    /// <summary>Set the current position for reading or writing in a File object.</summary>
    /// <param name="offset" type="Number" optional="false">Offset to seek to in the file</param>
    /// <param name="origin" type="Number" optional="true">Origin for offset. Must be one of File.START, File.END or File.CURRENT. If omitted File.START will be used.</param>
    /// <returns type="null"/>
    /// </signature>
}

File.Size = function() {
    /// <signature>
    /// <summary>Return the size of a file in bytes</summary>
    /// <param name="filename" type="String" optional="false">Filename you want the size of.</param>
    /// <returns type="Number"/>
    /// </signature>
}

File.prototype.Tell = function() {
    /// <signature>
    /// <summary>Return the current file position for a File object. Note that on Windows when reading files if the file is not opened with File.BINARY this may not return the correct file position for files with unix line endings.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

File.Upload = function() {
    /// <signature>
    /// <summary>Uploads a file to a remote location. See also File.Proxy(), File.ProxyPassword() and File.ProxyUsername().</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to upload.</param>
    /// <param name="url" type="String" optional="false">URL (uniform resource locator) of the remote location you want to upload the file to. Currently only http is supported. Give the full address including the leading 'http://'. e.g. 'http://www.example.com/file.html'.</param>
    /// <param name="options" type="Object" optional="true">Options for upload. If both of these are set then basic authorization using the username and password will be used.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

File.prototype.Write = function() {
    /// <signature>
    /// <summary>Write a string to a file opened for writing by a File object. Note that a carriage return is not added.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to write</param>
    /// <returns type="null"/>
    /// </signature>
}

File.prototype.WriteArrayBuffer = function() {
    /// <signature>
    /// <summary>Writes binary data to a file opened for writing by a File object. The data to write is an ArrayBuffer object. For more details on how to use an ArrayBuffer see the following links: https://developer.mozilla.org/en/JavaScript_typed_arrays https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBufferView https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView.</summary>
    /// <param name="buffer" type="ArrayBuffer" optional="false">ArrayBuffer to write to file</param>
    /// <param name="length" type="Number" optional="true">Number of bytes to write to the file. If omitted all the data in the ArrayBuffer will be written (buffer.byteLength bytes)</param>
    /// <returns type="null"/>
    /// </signature>
}

File.prototype.Writeln = function() {
    /// <signature>
    /// <summary>Write a string to a file opened for writing by a File object adding a carriage return.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to write</param>
    /// <returns type="null"/>
    /// </signature>
}

var Graph = function() {
    /// <signature>
    /// <summary>Create a new Graph.</summary>
    /// <param name="index" type="Number" optional="false">Graph index to copy initial display and axis settings from (optional). If not defined then the display and axis settings will be copied from those defined in the preference file.</param>
    /// <returns type="Graph"/>
    /// </signature>
    /// <field name='active' static='false' type='Number'>If the graph is active or inactive. Can take Graph.YES or Graph.NO</field>
    /// <field name='add_x_units' static='false' type='Number'>shows x-axis units. It can take either Graph.ON or Graph.OFF</field>
    /// <field name='add_y2_units' static='false' type='Number'>shows second y-axis units. It can take either Graph.ON or Graph.OFF</field>
    /// <field name='add_y_units' static='false' type='Number'>shows y-axis units. It can take either Graph.ON or Graph.OFF</field>
    /// <field name='auto_title' static='false' type='String'>Turn on to set graph title automatically and turn off to define the graph title manually using the property Graph.title. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='auto_xlabel' static='false' type='Number'>Turn on to set label for the x-axis automatically and turn off to define the label for the x-axis manually using the property xlabel. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='auto_xmax' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the maximum value for the y-axis range automatically and Graph.OFF will use the property xmax value as the maximum value for the x-axis range</field>
    /// <field name='auto_xmin' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the minimum value for the x-axis range automatically and Graph.OFF will use the property xmin value as the minimum value for the x-axis range</field>
    /// <field name='auto_y2label' static='false' type='Number'>Turn on to set label for the second y-axis automatically and turn off to define the label for the second y-axis manually using the property y2label. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='auto_y2max' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the maximum value for the second y-axis range automatically and Graph.OFF will use the property y2max value as the maximum value for the second y-axis range</field>
    /// <field name='auto_y2min' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the minimum value for the second y-axis range automatically and Graph.OFF will use the property y2min value as the minimum value for the second y-axis range</field>
    /// <field name='auto_ylabel' static='false' type='Number'>Turn on to set label for the y-axis automatically and turn off to define the label for the y-axis manually using the property ylabel. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='auto_ymax' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the maximum value for the y-axis range automatically and Graph.OFF will use the property ymax value as the maximum value for the y-axis range</field>
    /// <field name='auto_ymin' static='false' type='Number'>Can take either Graph.ON or Graph.OFF. Graph.ON will set the minimum value for the y-axis range automatically and Graph.OFF will use the property ymin value as the minimum value for the y-axis range</field>
    /// <field name='background_colour' static='false' type='Colour'>Graph background colour</field>
    /// <field name='foreground_colour' static='false' type='Colour'>Graph foreground colour</field>
    /// <field name='grid' static='false' type='Number'>To turn on/off the grid. Can take Graph.GRID_ON or Graph.GRID_OFF</field>
    /// <field name='id' static='false' type='Number'>Graph ID (read only)</field>
    /// <field name='legend_background_colour' static='false' type='Colour'>Background colour for the legend area</field>
    /// <field name='legend_background_trans' static='false' type='Number'>Transparancy of the legend area. The value should lie between 0 and 100</field>
    /// <field name='legend_font' static='false' type='Number'>Font for the curve labels in the legend. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='legend_font_colour' static='false' type='Colour'>Font colour for the curve labels in the legend</field>
    /// <field name='legend_font_size' static='false' type='Number'>Font size for the curve labels in the legend. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_layout' static='false' type='Number'>Defines the legend layout type. Can take Graph.LEGEND_COLUMN_LIST, Graph.LEGEND_AUTO, Graph.LEGEND_OFF or Graph.LEGEND_FLOATING</field>
    /// <field name='legend_prefix_format' static='false' type='Number'>Format of the prefix that is being included in the curve label of the legend. Can take either Graph.PREFIX_MODEL_NUMBER, Graph.DIR, Graph.PREFIX_THF or Graph.PREFIX_USER_DEFINED</field>
    /// <field name='legend_show_prefix' static='false' type='Number'>Include the prefix in the curve label of the legend. Can take either Graph.PREFIX_AUTO, Graph.PREFIX_ON or Graph.PREFIX_OFF</field>
    /// <field name='legend_show_user_lines' static='false' type='Number'>Visibility of user lines when Graph.LEGEND_COLUMN_LIST is selected for legend layout. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='legend_user_line_1' static='false' type='String'>User defined line 1 from the legend area</field>
    /// <field name='legend_user_line_1_size' static='false' type='Number'>Font size for the user defined line 1. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_line_2' static='false' type='String'>User defined line 2 from the legend area</field>
    /// <field name='legend_user_line_2_size' static='false' type='Number'>Font size for the user defined line 2. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_line_3' static='false' type='String'>User defined line 3 from the legend area</field>
    /// <field name='legend_user_line_3_size' static='false' type='Number'>Font size for the user defined line 3. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_line_4' static='false' type='String'>User defined line 4 from the legend area</field>
    /// <field name='legend_user_line_4_size' static='false' type='Number'>Font size for the user defined line 4. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_line_5' static='false' type='String'>User defined line 6 from the legend area</field>
    /// <field name='legend_user_line_5_size' static='false' type='Number'>Font size for the user defined line 5. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_line_6' static='false' type='String'>User defined line 6 from the legend area</field>
    /// <field name='legend_user_line_6_size' static='false' type='Number'>Font size for the user defined line 6. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='legend_user_lines_colour' static='false' type='Colour'>Font colour for the user defined lines in the legend</field>
    /// <field name='legend_user_lines_font' static='false' type='Number'>Font for the user defined lines in the legend. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='num_legend_columns' static='false' type='Number'>Number of columns of curve labels in legends. Can take Graph.LEGEND_1_COLUMN, Graph.LEGEND_2_COLUMN or Graph.LEGEND_3_COLUMN</field>
    /// <field name='show_title' static='false' type='String'>Shows graph title. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='show_xlabel' static='false' type='Number'>Shows graph x-axis label. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='show_y2label' static='false' type='Number'>Shows graph second y-axis label. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='show_ylabel' static='false' type='Number'>Shows graph y-axis label. Can take either Graph.ON or Graph.OFF</field>
    /// <field name='title' static='false' type='String'>Graph title</field>
    /// <field name='x_axis_type' static='false' type='Number'>Defines x-axis type i.e. linear or logarithmic. Can take either Graph.AXIS_LINEAR or Graph.AXIS_LOG</field>
    /// <field name='x_unit_colour' static='false' type='Colour'>Colour of the x-axis units</field>
    /// <field name='x_unit_decimals' static='false' type='Number'>Defines the number decimals in the x-axis units.</field>
    /// <field name='x_unit_font' static='false' type='Number'>Font for the x-axis units. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='x_unit_format' static='false' type='Number'>Defines the format for the x-axis units. Can take either Graph.AXIS_UNITS_AUTO, Graph.AXIS_UNITS_SCIENTIFIC or Graph.AXIS_UNITS_GENERAL</field>
    /// <field name='x_unit_size' static='false' type='Number'>Font size for the x-axis units. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='xlabel' static='false' type='String'>Label for x-axis</field>
    /// <field name='xlabel_colour' static='false' type='Colour'>Colour of the x-axis label</field>
    /// <field name='xlabel_font' static='false' type='Number'>Font for the x-axis label. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='xlabel_size' static='false' type='Number'>Font size for the x-axis label. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='xmax' static='false' type='Number'>Maximum value of x-axis range</field>
    /// <field name='xmin' static='false' type='Number'>Minimum value of the x-axis range</field>
    /// <field name='y2_axis_type' static='false' type='Number'>Defines second y-axis type i.e. linear or logarithmic. Can take either Graph.AXIS_LINEAR or Graph.AXIS_LOG</field>
    /// <field name='y2_unit_colour' static='false' type='Colour'>Colour of the second y-axis units</field>
    /// <field name='y2_unit_decimals' static='false' type='Number'>Defines the number decimals in the second y-axis units.</field>
    /// <field name='y2_unit_font' static='false' type='Number'>Font for the second y-axis label. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='y2_unit_format' static='false' type='Number'>Defines the format for the second y-axis units. Can take either Graph.AXIS_UNITS_AUTO, Graph.AXIS_UNITS_SCIENTIFIC or Graph.AXIS_UNITS_GENERAL</field>
    /// <field name='y2_unit_size' static='false' type='Number'>Font size for the second y-axis units. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='y2label' static='false' type='String'>Label for second y-axis</field>
    /// <field name='y2label_colour' static='false' type='Colour'>Colour of the second y-axis label</field>
    /// <field name='y2label_font' static='false' type='Number'>Font for the second y-axis label. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='y2label_size' static='false' type='Number'>Font size for the second y-axis label. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='y2max' static='false' type='Number'>Maximum value of the second y-axis range</field>
    /// <field name='y2min' static='false' type='Number'>Minimum value of the second y-axis range</field>
    /// <field name='y_axis_type' static='false' type='Number'>Defines y-axis type i.e. linear or logarithmic. Can take either Graph.AXIS_LINEAR or Graph.AXIS_LOG</field>
    /// <field name='y_unit_colour' static='false' type='Colour'>Colour of the y-axis units</field>
    /// <field name='y_unit_decimals' static='false' type='Number'>The number decimals in the y-axis units.</field>
    /// <field name='y_unit_font' static='false' type='Number'>Font for the y-axis units. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='y_unit_format' static='false' type='Number'>Defines the format for the y-axis units. Can take either Graph.AXIS_UNITS_AUTO, Graph.AXIS_UNITS_SCIENTIFIC or Graph.AXIS_UNITS_GENERAL</field>
    /// <field name='y_unit_size' static='false' type='Number'>Font size for the y-axis units. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='ylabel' static='false' type='String'>Label for y-axis</field>
    /// <field name='ylabel_colour' static='false' type='Colour'>Colour of the y-axis label</field>
    /// <field name='ylabel_font' static='false' type='Number'>Font for the y-axis label. Can take either Graph.FONT_DEFAULT, Graph.FONT_HELVETICA_MEDIUM, Graph.FONT_HELVETICA_BOLD, Graph.FONT_TIMES_MEDIUM, Graph.FONT_TIMES_BOLD, Graph.FONT_COURIER_MEDIUM or Graph.FONT_COURIER_BOLD</field>
    /// <field name='ylabel_size' static='false' type='Number'>Font size for the y-axis label. Can take either Graph.FONT_SIZE_AUTO, Graph.FONT_SIZE_8, Graph.FONT_SIZE_10, Graph.FONT_SIZE_12, Graph.FONT_SIZE_14, Graph.FONT_SIZE_18 or Graph.FONT_SIZE_24</field>
    /// <field name='ymax' static='false' type='Number'>Maximum value of y-axis range</field>
    /// <field name='ymin' static='false' type='Number'>Minimum value of the y-axis range</field>
    /// <field name='AXIS_LINEAR' static='true' type='Number'>Linear axis type</field>
    /// <field name='AXIS_LOG' static='true' type='Number'>Logarithmic axis type</field>
    /// <field name='FONT_COURIER_BOLD' static='true' type='Number'>Courier bold font</field>
    /// <field name='FONT_COURIER_MEDIUM' static='true' type='Number'>Courier medium font</field>
    /// <field name='FONT_DEFAULT' static='true' type='Number'>Takes the font defined in the preference file</field>
    /// <field name='FONT_HELVETICA_BOLD' static='true' type='Number'>Helvetical bold font</field>
    /// <field name='FONT_HELVETICA_MEDIUM' static='true' type='Number'>Helvetical medium font</field>
    /// <field name='FONT_SIZE_10' static='true' type='Number'>10 point font size</field>
    /// <field name='FONT_SIZE_12' static='true' type='Number'>12 point font size</field>
    /// <field name='FONT_SIZE_14' static='true' type='Number'>14 point font size</field>
    /// <field name='FONT_SIZE_18' static='true' type='Number'>18 point font size</field>
    /// <field name='FONT_SIZE_24' static='true' type='Number'>24 point font size</field>
    /// <field name='FONT_SIZE_8' static='true' type='Number'>8 point font size</field>
    /// <field name='FONT_SIZE_AUTO' static='true' type='Number'>Font size would be automatically adjusted based on the graph area</field>
    /// <field name='FONT_TIMES_BOLD' static='true' type='Number'>Times New Roman bold font</field>
    /// <field name='FONT_TIMES_MEDIUM' static='true' type='Number'>Times New Roman medium font</field>
    /// <field name='GRID_OFF' static='true' type='Number'>Turn off the grid.</field>
    /// <field name='GRID_ON' static='true' type='Number'>Turn on the grid.</field>
    /// <field name='LEGEND_1_COLUMN' static='true' type='Number'>Curve labels will be displayed in a single column in the legend</field>
    /// <field name='LEGEND_2_COLUMN' static='true' type='Number'>Curve labels will be displayed in two columns in the legend</field>
    /// <field name='LEGEND_AUTO' static='true' type='Number'>Automatic legend layout (see Legend)</field>
    /// <field name='LEGEND_COLUMN_LIST' static='true' type='Number'>Column list legend layout (see Legend)</field>
    /// <field name='LEGEND_FLOATING' static='true' type='Number'>Floating legend layout (see Legend)</field>
    /// <field name='LEGEND_OFF' static='true' type='Number'>Off legend layout (see Legend)</field>
    /// <field name='NO' static='true' type='Number'>Flag for no.</field>
    /// <field name='OFF' static='true' type='Number'>Flag to turn off.</field>
    /// <field name='ON' static='true' type='Number'>Flag to turn on.</field>
    /// <field name='PREFIX_AUTO' static='true' type='Number'>Automatically add prefix to the curve label in the legend (see Legend)</field>
    /// <field name='PREFIX_DIR' static='true' type='Number'>Directory name of the model will be used as the curve label prefix in the legend (see Legend)</field>
    /// <field name='PREFIX_MODEL_NUMBER' static='true' type='Number'>Model number will be used as the curve label prefix in the legend (see Legend)</field>
    /// <field name='PREFIX_OFF' static='true' type='Number'>Turn off the curve label prefix in the legend (see Legend)</field>
    /// <field name='PREFIX_ON' static='true' type='Number'>Add prefix to the curve label in the legend (see Legend)</field>
    /// <field name='PREFIX_THF' static='true' type='Number'>Root name of the THF file will be used as the curve label prefix in the legend (see Legend)</field>
    /// <field name='PREFIX_USER_DEFINED' static='true' type='Number'>A user defined prefix will be used as the curve label prefix in the legend (see Legend)</field>
    /// <field name='YES' static='true' type='Number'>Flag for yes.</field>
}

Graph.prototype.AddCurveID = function() {
    /// <signature>
    /// <summary>Adds a curve to the graph.</summary>
    /// <param name="Curve ID" type="Number" optional="false">ID of the curve to add.</param>
    /// <param name="No redraw" type="Number" optional="true">If this argument is 1 then the graph will not be redrawn after the curve is added. This is to be used if a large number of curves are to be added to a graph, so as to avoid the same curves being drawn multiple times. No argument or 0 will trigger a redraw after the curve is added.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Graph.prototype.AddToPage = function() {
    /// <signature>
    /// <summary>Adds the graph to the page.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number for which to add the graph to.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Graph.prototype.Delete = function() {
    /// <signature>
    /// <summary>Deletes the graph</summary>
    /// <returns type="null"/>
    /// </signature>
}

Graph.DeleteFromID = function() {
    /// <signature>
    /// <summary>Deletes a graph</summary>
    /// <param name="ID" type="Number" optional="false">ID of graph to delete</param>
    /// <returns type="null"/>
    /// </signature>
}

Graph.prototype.GetAllCurveIDs = function() {
    /// <signature>
    /// <summary>Returns the IDs of the curves present in the graph in an array.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Graph.prototype.GetAllPageIDs = function() {
    /// <signature>
    /// <summary>Returns all the pages containing the graph.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Graph.GetFromID = function() {
    /// <signature>
    /// <summary>Returns the graph object for a given graph id.</summary>
    /// <param name="ID" type="Number" optional="false">ID of graph to return the graph for</param>
    /// <returns type="Graph"/>
    /// </signature>
}

Graph.prototype.GetNumCurves = function() {
    /// <signature>
    /// <summary>Returns number curves present in the graph.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Graph.prototype.Lock = function() {
    /// <signature>
    /// <summary>Locks the blanking status of either blanked curves, unblanked curves or all curves on the graph.</summary>
    /// <param name="Lock type" type="Number" optional="false">No argument or 0 to lock blanked curves, -1 to unlock blanked curves, -2 to unfreeze all visible curves</param>
    /// </signature>
}

Graph.prototype.RemoveCurveID = function() {
    /// <signature>
    /// <summary>Removs a curve from the graph.</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

Graph.prototype.RemoveFromPage = function() {
    /// <signature>
    /// <summary>Removs the graph from a page.</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

Graph.Total = function() {
    /// <signature>
    /// <summary>Returns the total number of graphs.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

var Group = function() {
    /// <signature>
    /// <summary>Create a new Group object.</summary>
    /// <param name="name" type="String" optional="false">Group name used to reference the group</param>
    /// <returns type="Group"/>
    /// </signature>
    /// <field name='crv_at_ymax' static='false' type='Number'>Curve number of the curve with the maximum Y value in the group.</field>
    /// <field name='crv_at_ymin' static='false' type='Number'>Curve number of the curve with the minimum Y value in the group.</field>
    /// <field name='curves' static='false' type='Number'>Number of curves in the group (read only)</field>
    /// <field name='name' static='false' type='String'>Group name (read only)</field>
    /// <field name='x_at_ymax' static='false' type='Number'>X value at the maximum Y value over all curves in the group.</field>
    /// <field name='x_at_ymin' static='false' type='Number'>X value at the minimum Y value over all curves in the group.</field>
    /// <field name='x_at_yminpos' static='false' type='Number'>X value at the minimum positive Y value over all curves in the group.</field>
    /// <field name='xmax' static='false' type='Number'>Maximum X value over all curves in the group.</field>
    /// <field name='xmin' static='false' type='Number'>Minimum X value over all curves in the group.</field>
    /// <field name='xminpos' static='false' type='Number'>Minimum positive X value over all curves in the group.</field>
    /// <field name='ymax' static='false' type='Number'>Maximum Y value over all curves in the group.</field>
    /// <field name='ymin' static='false' type='Number'>Minimum Y value over all curves in the group.</field>
    /// <field name='yminpos' static='false' type='Number'>Minimum positive Y value over all curves in the group.</field>
}

Group.prototype.Add = function() {
    /// <signature>
    /// <summary>Adds a curve object to group.</summary>
    /// <param name="Curve" type="Curve" optional="false">Curve that will be added to group</param>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.AddAll = function() {
    /// <signature>
    /// <summary>Adds all curves to group.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.AddID = function() {
    /// <signature>
    /// <summary>Adds curve by ID to a group.</summary>
    /// <param name="ID" type="Number" optional="false">The ID of the curve you want to add.</param>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.Contains = function() {
    /// <signature>
    /// <summary>Checks if a curve object is in a curve group.</summary>
    /// <param name="Curve" type="Curve" optional="false">Curve that will be checked</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Group.prototype.ContainsID = function() {
    /// <signature>
    /// <summary>Checks if a curve ID is in a curve group.</summary>
    /// <param name="ID" type="Number" optional="false">The ID of the curve you want to check.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Group.DeleteGroup = function() {
    /// <signature>
    /// <summary>Deletes a curve group</summary>
    /// <param name="group ID or name" type="Number" optional="false">ID of group to delete or name of group. If this argument is 0, delete all groups. Automatically generated groups won't be deleted unless the next argument is set to 1.</param>
    /// <param name="delete automatic groups" type="Number" optional="true">If this argument is 1, automatic groups can be deleted. If no argument or 0, automatic groups cant be deleted.</param>
    /// <returns type="null"/>
    /// </signature>
}

Group.Get = function() {
    /// <signature>
    /// <summary>Returns a group object.</summary>
    /// <param name="Name" type="String" optional="false">Name of the group to return object for</param>
    /// <returns type="Group"/>
    /// </signature>
}

Group.prototype.GetCurveIDs = function() {
    /// <signature>
    /// <summary>Returns an array of Curve ID's for all the Curves in the group.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Group.prototype.GetCurves = function() {
    /// <signature>
    /// <summary>Returns an array of Curve Objects for all the Curves in the group.</summary>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Group.GetFromID = function() {
    /// <signature>
    /// <summary>Returns a group object.</summary>
    /// <param name="ID" type="Number" optional="false">ID of the group to return object for</param>
    /// <returns type="Group"/>
    /// </signature>
}

Group.prototype.Remove = function() {
    /// <signature>
    /// <summary>Removes a curve object from a group.</summary>
    /// <param name="Curve" type="Curve" optional="false">Curve that will be removed from group</param>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.RemoveAll = function() {
    /// <signature>
    /// <summary>Removes all curves from a group.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.RemoveID = function() {
    /// <signature>
    /// <summary>Remove a curve by ID from a group.</summary>
    /// <param name="ID" type="Number" optional="false">The ID of the curve you want to remove.</param>
    /// <returns type="null"/>
    /// </signature>
}

Group.prototype.Spool = function() {
    /// <signature>
    /// <summary>Spools a group, entry by entry and returns the curve objects. See also Group.StartSpool</summary>
    /// <returns type="Curve"/>
    /// </signature>
}

Group.prototype.SpoolID = function() {
    /// <signature>
    /// <summary>Spools a group, entry by entry and returns the curve ID's or 0 when no more curves in group. See also Group.StartSpool</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Group.prototype.StartSpool = function() {
    /// <signature>
    /// <summary>Starts a group spooling operation. See also Group.Spool</summary>
    /// <returns type="null"/>
    /// </signature>
}

Group.Total = function() {
    /// <signature>
    /// <summary>Returns the total number of curve group currently defined</summary>
    /// <returns type="Number"/>
    /// </signature>
}

var Include = function() {
    /// <field name='NATIVE' static='true' type='Number'>Use directory separators native to this machine when writing directory names.</field>
    /// <field name='UNIX' static='true' type='Number'>Use unix directory separators when writing directory names.</field>
    /// <field name='WINDOWS' static='true' type='Number'>Use windows directory separators when writing directory names.</field>
}

var LineStyle = function() {
    /// <field name='DASH' static='true' type='Number'>Dashes lines</field>
    /// <field name='DASH2' static='true' type='Number'>Dash pattern 2</field>
    /// <field name='DASH3' static='true' type='Number'>Dash pattern 3</field>
    /// <field name='DASH4' static='true' type='Number'>Dash pattern 4</field>
    /// <field name='DASH5' static='true' type='Number'>Dash pattern 5</field>
    /// <field name='DASH6' static='true' type='Number'>Dash pattern 6</field>
    /// <field name='NONE' static='true' type='Number'>No line</field>
    /// <field name='SOLID' static='true' type='Number'>Solid lines</field>
}

var LineWidth = function() {
    /// <field name='BOLD' static='true' type='Number'>Bold lines (4 pixels wide)</field>
    /// <field name='FINE' static='true' type='Number'>Fine lines (1 pixel wide)</field>
    /// <field name='HEAVY' static='true' type='Number'>Heavy lines (8 pixels wide)</field>
    /// <field name='NORMAL' static='true' type='Number'>Normal lines (2 pixels wide)</field>
    /// <field name='W1' static='true' type='Number'>1 pixel wide</field>
    /// <field name='W10' static='true' type='Number'>10 pixel wide</field>
    /// <field name='W2' static='true' type='Number'>2 pixel wide</field>
    /// <field name='W3' static='true' type='Number'>3 pixel wide</field>
    /// <field name='W4' static='true' type='Number'>4 pixel wide</field>
    /// <field name='W5' static='true' type='Number'>5 pixel wide</field>
    /// <field name='W6' static='true' type='Number'>6 pixel wide</field>
    /// <field name='W7' static='true' type='Number'>7 pixel wide</field>
    /// <field name='W8' static='true' type='Number'>8 pixel wide</field>
    /// <field name='W9' static='true' type='Number'>9 pixel wide</field>
}

var Model = function() {
    /// <field name='dir' static='false' type='String'>Directory containing the model file (read only).</field>
    /// <field name='file' static='false' type='String'>File selected when reading the model (read only).</field>
    /// <field name='id' static='false' type='Number'>Model ID (read only)</field>
    /// <field name='title' static='false' type='String'>Model title (read only).</field>
    /// <field name='ALL_FILES' static='true' type='Number'>Option to select all files (.thf, LSDA, ASCII, .ztf) when reading model in.</field>
    /// <field name='ASCII' static='true' type='Number'>Option to select ASCII files when reading model in.</field>
    /// <field name='LSDA' static='true' type='Number'>Option to select LSDA/binout file when reading model in.</field>
    /// <field name='THF' static='true' type='Number'>Option to select .thf/d3thdt file when reading model in.</field>
    /// <field name='XTF' static='true' type='Number'>Option to select .xtf/xtfile file when reading model in.</field>
    /// <field name='ZTF' static='true' type='Number'>Option to select .ztf file when reading model in.</field>
}

Model.prototype.ClearFlag = function() {
    /// <signature>
    /// <summary>Clears a defined flag on an internal (or external) item(s) of type of entity_type in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to clear.</param>
    /// <param name="entity_type" type="Number" optional="false">The Entity type that the defined flag will be cleared on.</param>
    /// <param name="item" type="Number" optional="false">If +ive: The internal item number starting from 1. If -ive: The external item label.</param>
    /// <param name="end" type="Number" optional="true">To unflag range of items, specify an optional end of range. Unflags items from item to range.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.prototype.Delete = function() {
    /// <signature>
    /// <summary>Deletes a modelDo not use the Model object after calling this method.</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.Exists = function() {
    /// <signature>
    /// <summary>Checks if a model exists</summary>
    /// <param name="model number" type="Number" optional="false">The number of the model you want to check the existence of.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.prototype.FlagAll = function() {
    /// <signature>
    /// <summary>Sets a defined flag on all of items of type of entity_type in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to set.</param>
    /// <param name="entity_type" type="Number" optional="false">The Entity type that the defined flag will be set on.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.prototype.Flagged = function() {
    /// <signature>
    /// <summary>Checks if a defined flag is set on an internal (or external) item of type of entity_type in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to check.</param>
    /// <param name="entity_type" type="Number" optional="false">The Entity type to check.</param>
    /// <param name="item" type="Number" optional="false">If +ive: The internal item number starting from 1. If -ive: The external item label.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.prototype.GetDataFlagged = function() {
    /// <signature>
    /// <summary>Gets curve objects for a data component for relevant items that are flagged with a specified flag in the model.  Some data components are valid for different entity types (e.g. SXX). If the same flag is set on items of different entity types, data is returned for all relevant, flagged entity types.  To return the same data for multiple items of the same type, it will be much faster if you flag all items you want data for, and do a single call to GetDataFlagged(). </summary>
    /// <param name="flag" type="Flag" optional="false">The flag to use. For model data, use 0 to define a null "padding" argument.</param>
    /// <param name="data_comp" type="Number" optional="false">The Data Component to extract.</param>
    /// <param name="int_pnt" type="Object" optional="true">The integration points to extract. This argument is ignored when the entity type is not SOLID, SHELL, THICK_SHELL or BEAM. An integer specifies the integration point to extract: For SOLIDs: value between 0 for Average/Centre and 8. (Defaults to Average/Centre). For SHELLs and THICK_SHELLs: value between 1 and # integration points, or codes TOP, MIDDLE, BOTTOM. (Defaults to MIDDLE integration point).  For integrated BEAMs: value between 1 and # integration points. (Defaults to integration point 1).   Use 0 to define a null "padding" argument, then uses the default integration point.</param>
    /// <param name="extra" type="Number" optional="true">The extra component id for SOLIDs, SHELLs, THICK_SHELLs or BEAMs.</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Model.GetFromID = function() {
    /// <signature>
    /// <summary>Returns the Model object for a model ID or null if model does not exist.</summary>
    /// <param name="model number" type="Number" optional="false">number of the model you want the Model object for</param>
    /// <returns type="Model"/>
    /// </signature>
}

Model.prototype.GetInternalID = function() {
    /// <signature>
    /// <summary>Gets the internal ID of external item of type entity_type in the model.</summary>
    /// <param name="entity_type" type="Number" optional="false">The Entity type of the item.</param>
    /// <param name="item" type="Number" optional="false">The external item number.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.GetLabel = function() {
    /// <signature>
    /// <summary>Gets the external label of internal item of type entity_type in the model.</summary>
    /// <param name="entity_type" type="Number" optional="false">The Entity type of the item.</param>
    /// <param name="item" type="Number" optional="false">The internal item number starting from 1.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.GetLabelFromName = function() {
    /// <signature>
    /// <summary>Gets the external label from the database history name name of type entity_type in the model. This is quicker if you use parent entity type codes (e.g. Entity.WELD rather than Entity.WELD_CONSTRAINED)</summary>
    /// <param name="entity_type" type="Number" optional="false">The Entity type of the item.</param>
    /// <param name="name" type="String" optional="false">The name of the item. If only the first part of the name is given, it must be unambiguous.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.GetName = function() {
    /// <signature>
    /// <summary>Gets the database history name of an internal (or external) item of type entity_type in the model.</summary>
    /// <param name="entity_type" type="Number" optional="false">The Entity type of the item.</param>
    /// <param name="item" type="Number" optional="false">If +ive: The internal item number starting from 1. If -ive: The external item label.</param>
    /// <returns type="String"/>
    /// </signature>
}

Model.prototype.GetNumberFlagged = function() {
    /// <signature>
    /// <summary>Gets the number of entities flagged with a requested flag in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to check.</param>
    /// <param name="entity_type" type="Number" optional="true">If specified, the Entity type to look at. If not specified, all types are looked at.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.GetNumberOf = function() {
    /// <signature>
    /// <summary>Gets the number of entities of a requested type in the model.</summary>
    /// <param name="entity_type" type="Number" optional="false">The Entity type that you want to know the number of.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Model.HighestID = function() {
    /// <signature>
    /// <summary>Returns the ID of the highest model currently being used</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.QueryDataPresent = function() {
    /// <signature>
    /// <summary>Checks if a data component data_comp for a given entity is present in a model's database. For SOLIDs, SHELLs, THICK_SHELLs and BEAMs the integration point and extra component ID can also be checked. This will show if curves for any flagged items of this type will be returned for GetDataFlagged(). Note, it does not check if the data component is valid, for example a specific shell may have fewer integration points than MAX_INT for all shells, so curves returned for GetDataFlagged() may still be "null" with no x-y data.</summary>
    /// <param name="data_comp" type="Number" optional="false">The Data Component to check.</param>
    /// <param name="entity_type" type="Number" optional="true">The Entity type to check. This argument can only be omitted when checking for global model data.</param>
    /// <param name="int_pnt" type="Object" optional="true">The integration points to check. This argument is ignored if the entity type is not SOLID, SHELL, THICK_SHELL or BEAM. An integer specifies the integration point to check: For SOLIDs: value between 0 for Average/Centre and 8. (Defaults to Average/Centre). For SHELLs and THICK_SHELLs: value between 1 and # integration points, or codes TOP, MIDDLE, BOTTOM. (Defaults to MIDDLE integration point).  For integrated BEAMs: value between 1 and # integration points. (Defaults to integration point 1).   Use 0 to define a null "padding" argument, then checks the default integration point.</param>
    /// <param name="extra" type="Number" optional="true">The extra component id for SOLIDs, SHELLs, THICK_SHELLs or BEAMs.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.Read = function() {
    /// <signature>
    /// <summary>Reads in a new model.</summary>
    /// <param name="filename" type="String" optional="false">Filename you want to read.</param>
    /// <param name="filetype" type="Number" optional="true">Filetypes you want to read. Can be bitwise OR of Model.THF, Model.XTF, Model.LSDA, Model.ASCII, Model.ZTF and Model.ALL_FILES. If omitted all available files will be read.</param>
    /// <returns type="Model"/>
    /// </signature>
}

Model.prototype.SetFlag = function() {
    /// <signature>
    /// <summary>Sets a defined flag on an internal (or external) item(s) of type of entity_type in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to set.</param>
    /// <param name="entity_type" type="Number" optional="false">The Entity type that the defined flag will be set on.</param>
    /// <param name="item" type="Number" optional="false">If +ive: The internal item number starting from 1. If -ive: The external item label.</param>
    /// <param name="end" type="Number" optional="true">To flag range of items, specify an optional end of range. Flags items from item to range.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Model.Total = function() {
    /// <signature>
    /// <summary>Returns the total number of models.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Model.prototype.UnflagAll = function() {
    /// <signature>
    /// <summary>Unsets a defined flag flag on all of items of type of entity_type in the model.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag you want to unset.</param>
    /// <param name="entity_type" type="Number" optional="false">The Entity type that the defined flag will be unset on.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

var Operate = function() {
}

Operate.Abs = function() {
    /// <signature>
    /// <summary>Convert a curve to absolute values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Acos = function() {
    /// <signature>
    /// <summary>Calculate Arc Cosine</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Acu = function() {
    /// <signature>
    /// <summary>Evaluates the integratal of a curve over a user defined period</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Offset" type="Number" optional="false">User defined offset</param>
    /// <param name="Time Period" type="Number" optional="false">Time to integrate over</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Ad = function() {
    /// <signature>
    /// <summary>Convert acceleration spectrum to a displacment spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Add = function() {
    /// <signature>
    /// <summary>Add Y axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Adx = function() {
    /// <signature>
    /// <summary>Add X axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Asi = function() {
    /// <signature>
    /// <summary>Acceleration Severity Index. This value is used to assess the performance of road side crash barriers. The calculation method can be set to 2010 (BS EN 1317-1:2010) or 1998 (BS EN 1317-1:1998).</summary>
    /// <param name="X Acceleration" type="Curve" optional="false">X Acceleration Curve</param>
    /// <param name="Y Acceleration" type="Curve" optional="false">Y Acceleration Curve</param>
    /// <param name="Z Acceleration" type="Curve" optional="false">Z Acceleration Curve</param>
    /// <param name="Acceleration conversion factor" type="Number" optional="false">Factor required to divide input acceleration curve by to convert to (G)</param>
    /// <param name="X Acceleration Limit" type="Number" optional="false">X direction acceleration limit</param>
    /// <param name="Y Acceleration Limit" type="Number" optional="false">Y direction acceleration limit</param>
    /// <param name="Z Acceleration Limit" type="Number" optional="false">Z direction acceleration limit</param>
    /// <param name="Calculation method" type="String" optional="false">Either 2010 or 1998.</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Asin = function() {
    /// <signature>
    /// <summary>Calculate Arc Sine</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Atan = function() {
    /// <signature>
    /// <summary>Calculate Arc Tangent</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Atan2 = function() {
    /// <signature>
    /// <summary>Calculate Arc Tangent using atan2(y, x)</summary>
    /// <param name="First Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Second Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Av = function() {
    /// <signature>
    /// <summary>Convert acceleration spectrum to a velocity spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Ave = function() {
    /// <signature>
    /// <summary>Average a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Blc = function() {
    /// <signature>
    /// <summary>Carry out a baseline correction on an accleration time history</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Moment / Time Curve</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Operate.But = function() {
    /// <signature>
    /// <summary>Butterworth Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Frequency" type="Number" optional="false">Cut-off Frequency (Hz)</param>
    /// <param name="Order" type="Number" optional="false">Filter order</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.C1000 = function() {
    /// <signature>
    /// <summary>SAE Class 1000 Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.C180 = function() {
    /// <signature>
    /// <summary>SAE Class 180 Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.C60 = function() {
    /// <signature>
    /// <summary>SAE Class 60 Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.C600 = function() {
    /// <signature>
    /// <summary>SAE Class 600 Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Cat = function() {
    /// <signature>
    /// <summary>Concatenate 2 curves together</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Clip = function() {
    /// <signature>
    /// <summary>Clip a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X min" type="Number" optional="false">X minimum value</param>
    /// <param name="X max" type="Number" optional="false">X maximum value</param>
    /// <param name="Y min" type="Number" optional="false">Y minimum value</param>
    /// <param name="Y max" type="Number" optional="false">Y maximum value</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Com = function() {
    /// <signature>
    /// <summary>Combine Y axis values from 2 curves together</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Cor = function() {
    /// <signature>
    /// <summary>Curve Correlation function. This Correlation function provides a measure of the degree to which two curves match. When comparing curves by eye, the quality of correlation may be judged on the basis of how well matched are the patterns of peaks, the overall shapes of the curves, etc, and can allow for differences of timing as well as magnitude. Thus a simple function based on the difference of Y-values (such as T/HIS ERR function) does not measure correlation in the same way as the human eye. The T/HIS correlation function attempts to include and quantify the more subtle ways in which the correlation of two curves may be judged. The correlation can be calculated using either a strict or loose set of input parameters. The degree of correlation is rated between 0 and 100.</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Curve" optional="false">Second Curve</param>
    /// <param name="Correlation type" type="String" optional="false">Correlation type, strict or loose</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Cor3 = function() {
    /// <signature>
    /// <summary>Curve Correlation function. This function first normalises the curves using two factors either specified by the user or defaults calculated by the program (the maximum absolute X and Y values of both graphs). For each point on the first normalised curve, the shortest distance to the second normalised curve is calculated. The root mean square value of all these distances is subtracted from 1 and then multiplied by 100 to get an index between 0 and 100. The process is repeated along the second curve and the two indices are averaged to get a final index. The higher the index the closer the correlation between the two curves. Note that the choice of normalising factors is important. Incorrect factors may lead to a correlation index outside the range of 0 to 100</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Curve" optional="false">Second Curve</param>
    /// <param name="X axis factor" type="Number" optional="true">Normalising factor used for X axis values</param>
    /// <param name="Y axis factor" type="Number" optional="true">Normalising factor used for Y axis values</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Cos = function() {
    /// <signature>
    /// <summary>Calculate Cosine</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Da = function() {
    /// <signature>
    /// <summary>Convert displacment spectrum to an acceleration spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Dif = function() {
    /// <signature>
    /// <summary>Differentiate a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Div = function() {
    /// <signature>
    /// <summary>Divide Y axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Dix = function() {
    /// <signature>
    /// <summary>Divide X axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Ds = function() {
    /// <signature>
    /// <summary>Generate a design spectrum from a reponse spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Broadening Factor" type="Number" optional="false">Spectrum broadening factor</param>
    /// <param name="Redefine Frequencies" type="String" optional="false">T-HIS selects a new set of frequencies for the output (yes or no)</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Dv = function() {
    /// <signature>
    /// <summary>Convert displacment spectrum to a velocity spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Env = function() {
    /// <signature>
    /// <summary>Generate an Envelope that bounds the min and max values of a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Err = function() {
    /// <signature>
    /// <summary>Calculate the degree of correlation between 2 curves</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Exc = function() {
    /// <signature>
    /// <summary>Calculate and displays an EXCeedence plot. This is a plot of force (Y axis) versus cumulative time (X axis) for which the force level has been exceeded. By default the Automatic option will create an exceedence plot using either the +ve OR the -ve values depending on which the input curve contains most of. The Positive option will calculate the exceedence plot using only the points with +ve y values. The Negative option will calculate the exceedence plot using only the points with -ve y values.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output option" type="String" optional="false">Select between automatic, positive or negative.</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Exp = function() {
    /// <signature>
    /// <summary>Calculate E to the power of Y axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Fft = function() {
    /// <signature>
    /// <summary>Fast Fourier Transform</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output option" type="String" optional="false">Generate magnitude, magnitude+phase or real+imaginary, (one of magnitude,phase,real)</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Scaling option" type="String" optional="true">Scaling option, (either one or two)</param>
    /// <returns type="Array" elementType="Array"/>
    /// </signature>
}

Operate.Fir = function() {
    /// <signature>
    /// <summary>FIR Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Hic = function() {
    /// <signature>
    /// <summary>HIC Calculation. After calculating the HIC value for a curve the value can also be obtained from the curve using the Curve.hic property. In addition to the HIC value the start and end time for the time window can also be obtained using the Curve.hic_tmin and Curve.hic_tmax properties.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Window" type="Number" optional="false">Maximum time window</param>
    /// <param name="Acceleration factor" type="Number" optional="false">Factor required to divide input acceleration curve by to convert to (G)</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Hicd = function() {
    /// <signature>
    /// <summary>Modified HIC(d) Calculation for free motion headform. After calculating the HIC value for a curve the value can also be obtained from the curve using the Curve.hicd property. In addition to the HIC(d) value the start and end time for the time window can also be obtained using the Curve.hicd_tmin and Curve.hicd_tmax properties.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Window" type="Number" optional="false">Maximum time window</param>
    /// <param name="Acceleration factor" type="Number" optional="false">Factor required to divide input acceleration curve by to convert to (G)</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Ifft = function() {
    /// <signature>
    /// <summary>Inverse Fast Fourier Transform</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Curve" optional="false">Second Curve</param>
    /// <param name="Input type" type="String" optional="false">Specifies if inputs are magnitude+phase or real+imaginary, (magnitude or real)</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Int = function() {
    /// <signature>
    /// <summary>Integrate a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Log = function() {
    /// <signature>
    /// <summary>Calculate Natural Log of Y axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Log10 = function() {
    /// <signature>
    /// <summary>Calculate Log (base 10) of Y axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Log10x = function() {
    /// <signature>
    /// <summary>Calculate Log (base 10) of X axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Logx = function() {
    /// <signature>
    /// <summary>Calculate Natural Log of X axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Lsq = function() {
    /// <signature>
    /// <summary>Calculate Least Squares Fit for a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Map = function() {
    /// <signature>
    /// <summary>Map Y axis values from one curve onto another curve</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Max = function() {
    /// <signature>
    /// <summary>Maximum of a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Min = function() {
    /// <signature>
    /// <summary>Minimum of a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Mon = function() {
    /// <signature>
    /// <summary>Sort a curve into monotonically increasing X axis values.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Mul = function() {
    /// <signature>
    /// <summary>Multiply Y axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Mux = function() {
    /// <signature>
    /// <summary>Multiply X axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Ncp = function() {
    /// <signature>
    /// <summary>Calculate a platic rotation curve for a beam from a moment/time and rotation/time</summary>
    /// <param name="First Curve" type="Curve" optional="false">Moment / Time Curve</param>
    /// <param name="Second Curve" type="Curve" optional="false">Rotation /Time Curve</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Nij = function() {
    /// <signature>
    /// <summary>Biomechanical neck injury predictor. Used as a measure of injury due to the load transferred through the occipital condyles. This function returns an array containing 4 curve objects. Curve 1 - "Nte" is the tension-extension condition Curve 2 - "Ntf" is the tension-flexion condition Curve 3 - "Nce" is the compression-extension condition Curve 4 - "Ncf" is the compression-flexion condition.</summary>
    /// <param name="Shear Force" type="Curve" optional="false">Shear Force Curve</param>
    /// <param name="Axial Force" type="Curve" optional="false">Axial Force Curve</param>
    /// <param name="Moment" type="Curve" optional="false">Moment Curve</param>
    /// <param name="Fzc(tension)" type="Number" optional="false">Critical Axial Force (Tension)</param>
    /// <param name="Fzc(compression)" type="Number" optional="false">Critical Axial Force (Compression)</param>
    /// <param name="Myc(Flexion)" type="Number" optional="false">Critical bending moment (Flexion)</param>
    /// <param name="Myc(Extension)" type="Number" optional="false">Critical bending moment (Extension)</param>
    /// <param name="E" type="Number" optional="false">Distance</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Operate.Nor = function() {
    /// <signature>
    /// <summary>Normalise Y axis values between [-1,1]</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Nor2 = function() {
    /// <signature>
    /// <summary>Normalise Y axis values with manual settings. The operation takes the absolute value of the user-specified Y Min and Y Max. It then finds the maximum of these two numbers and divides all Y data by this number. There are two locks which probe or "lock on to" the Y Max and Y Min axis values which offers quick axis-normalizing.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Y Min Value" type="Number" optional="false">The Minimum Y value</param>
    /// <param name="Y Max Value" type="Number" optional="false">The Maximum Y value</param>
    /// <param name="Lock to Axis (Y Min)" type="Number" optional="false">Set the Lock button for the Y Minimum textbox</param>
    /// <param name="Lock to Axis (Y Max)" type="Number" optional="false">Set the Lock button for the Y Maximum textbox</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Nox = function() {
    /// <signature>
    /// <summary>Normalise X axis values between [-1,1]</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Nox2 = function() {
    /// <signature>
    /// <summary>Normalise X axis values with manual settings. The operation takes the absolute value of the user-specified X Min and X Max. It then finds the maximum of these two numbers and divides all X data by this number. There are two locks which probe or "lock on to" the X Max and X Min axis values which offers quick axis-normalizing.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="X Min Value" type="Number" optional="false">The Minimum X value</param>
    /// <param name="X Max Value" type="Number" optional="false">The Maximum X value</param>
    /// <param name="Lock to Axis (X Min)" type="Number" optional="false">Set the Lock button for the X Minimum textbox</param>
    /// <param name="Lock to Axis (X Max)" type="Number" optional="false">Set the Lock button for the X Maximum textbox</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Octave = function() {
    /// <signature>
    /// <summary>Coverts a narrow band curve to either Octave or 1/Third Octave bands</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Band type to convert to" type="String" optional="false">Band type to convert to. Either "Octave" or "Third" Octave.</param>
    /// <param name="Output Type" type="String" optional="false">Generate curve containing either "RMS" or "mean" values.</param>
    /// <param name="Input Type" type="String" optional="false">Input curve contains either "Linear" or "dB" values.</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Order = function() {
    /// <signature>
    /// <summary>Reverse the order of points in a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Pbut = function() {
    /// <signature>
    /// <summary>Pure Butterworth Filter</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Frequency" type="Number" optional="false">Cut-off Frequency (Hz)</param>
    /// <param name="Order" type="Number" optional="false">Filter order</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Power = function() {
    /// <signature>
    /// <summary>Raise to the power</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Power" type="Number" optional="false">Power to raise Y axis values by</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Rave = function() {
    /// <signature>
    /// <summary>Calculate rolling average of a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Rec = function() {
    /// <signature>
    /// <summary>Calculate reciprocal</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Reg = function() {
    /// <signature>
    /// <summary>Regularise X axis intervals for a curve.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X axis interval" type="Number" optional="false">New X axis interval</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Res = function() {
    /// <signature>
    /// <summary>Resultant of a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Rev = function() {
    /// <signature>
    /// <summary>Reverse X and Y axis values</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Rs = function() {
    /// <signature>
    /// <summary>Generate a reponse spectrum from input accelerations</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Damping Factor" type="Number" optional="false">Dammping factor</param>
    /// <param name="Sampling Points" type="int" optional="false">Number of points to sample over (30 or 70)</param>
    /// <param name="X axis interval" type="Number" optional="true">If defined then T-HIS will automatically regularise the curve using this value first</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Operate.Sin = function() {
    /// <signature>
    /// <summary>Calculate Sine</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Smooth = function() {
    /// <signature>
    /// <summary>Apply a smoothing factor to a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Smoothing Factor" type="Number" optional="false">Number of points to average over</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Sqr = function() {
    /// <signature>
    /// <summary>Square root of a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Stress = function() {
    /// <signature>
    /// <summary>Convert between true and engineering stress</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Convert to" type="String" optional="false">Type to convert to (True or Engineering)</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Sub = function() {
    /// <signature>
    /// <summary>Subtract Y axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Sum = function() {
    /// <signature>
    /// <summary>Sum of a group of curves</summary>
    /// <param name="Curves" type="Array" elementType="Curve" optional="false">Array of Curve objects</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Sux = function() {
    /// <signature>
    /// <summary>Subtract X axis values</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve or constant" type="Number" optional="false">Second Curve or constant</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Tan = function() {
    /// <signature>
    /// <summary>Calculate Tangent</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Thiv = function() {
    /// <signature>
    /// <summary>Theoretical Head Impact Velocity and the Post Impact Head Deceleration. These values are used to assess the performance of road side crash barriers. This function returns an array containing 2 curve objects. The 1st curve is the THIV curve and the 2nd is the PHD curve. The peak values of these curves are the corresponding THIV and PHD values and can be obtained using the Curve.ymax property.</summary>
    /// <param name="X Acceleration" type="Curve" optional="false">X Acceleration Curve</param>
    /// <param name="Y Acceleration" type="Curve" optional="false">Y Acceleration Curve</param>
    /// <param name="Yaw Rate" type="Curve" optional="false">Yaw Rate Curve</param>
    /// <param name="Dx" type="Number" optional="false">Horizontal distance between occupants head and vehicle</param>
    /// <param name="Dy" type="Number" optional="false">Lateral distance between occupants head and vehicle</param>
    /// <param name="X0" type="Number" optional="false">Horizontal distance between occupants head and vehicle CofG</param>
    /// <returns type="Array" elementType="Curve"/>
    /// </signature>
}

Operate.Tms = function() {
    /// <signature>
    /// <summary>3ms Clip Calculation. After calculating the 3ms clip value for a curve the value can also be obtained from the curve using the Curve.tms property. In addition to the 3ms clip value the start and end time for the time window can also be obtained using the Curve.tms_tmin and Curve.tms_tmax properties.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Period" type="Number" optional="false">Clip period</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Translate = function() {
    /// <signature>
    /// <summary>Translate a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="X value" type="Number" optional="false">X translation value</param>
    /// <param name="Y value" type="Number" optional="false">Y translation value</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Tti = function() {
    /// <signature>
    /// <summary>Thorax Trauma Index.</summary>
    /// <param name="Upper Rib Acceleration" type="Curve" optional="false">Upper Rib Acceleration Curve</param>
    /// <param name="Lower Rib Acceleration" type="Curve" optional="false">Lower Rib Acceleration Curve</param>
    /// <param name="T12 Acceleration" type="Curve" optional="false">T12 Acceleration Curve</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Va = function() {
    /// <signature>
    /// <summary>Convert velocity spectrum to an acceleration spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Vc = function() {
    /// <signature>
    /// <summary>Viscous Criteria calculate. The VC calculation can be done using 2 different calculation methods ECER95 and IIHS.</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="A" type="Number" optional="false">Constant A</param>
    /// <param name="B" type="Number" optional="false">Constant B</param>
    /// <param name="Calculation method" type="String" optional="false">Either ECER95 or IIHS.</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Vd = function() {
    /// <signature>
    /// <summary>Convert velocity spectrum to a displacment spectrum</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Vec = function() {
    /// <signature>
    /// <summary>Vector magnitude of 3 curves</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Third Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Vec2d = function() {
    /// <signature>
    /// <summary>Vector magnitude of 2 curves</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Number" optional="false">Second Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Wif = function() {
    /// <signature>
    /// <summary>Weigthed Integrated Factor (WIFAC) Correlation function.</summary>
    /// <param name="First Curve" type="Curve" optional="false">First Curve</param>
    /// <param name="Second Curve" type="Curve" optional="false">Second Curve</param>
    /// <returns type="Number"/>
    /// </signature>
}

Operate.Window = function() {
    /// <signature>
    /// <summary>Apply a smoothing window to a curve</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Window Type" type="String" optional="false">Window type to apply (Hanning, cosine or exponetial)</param>
    /// <param name="percentage lead in" type="Number" optional="true">percentage lead in for cosine window</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.Zero = function() {
    /// <signature>
    /// <summary>Translate curve to 0,0</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.ZeroX = function() {
    /// <signature>
    /// <summary>Translate curve to X=0.0</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.ZeroY = function() {
    /// <signature>
    /// <summary>Translate curve to Y=0.0</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.dB = function() {
    /// <signature>
    /// <summary>Converts a curve to dB (y = 20.0*log(y/yref))</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Reference Value" type="Number" optional="false">Reference value</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

Operate.dBA = function() {
    /// <signature>
    /// <summary>Applies A-weigthing to a curve (converst from dB to dBA)</summary>
    /// <param name="Input Curve" type="Curve" optional="false">Input Curve</param>
    /// <param name="Weighting Type" type="String" optional="false">Apply either Narrow band (narrow) or Octave band (octave) A weighting</param>
    /// <param name="Output Curve" type="Curve" optional="true">Curve to overwrite</param>
    /// <returns type="Curve"/>
    /// </signature>
}

var Options = function() {
    /// <field name='auto_confirm' static='true' type='Boolean'>If true then ${Program} will automatically confirm (i.e. press the OK button) on (most) message boxes that are mapped. If false (default) then the message boxes will be shown and wait for the user to press a button. This option may be useful to help automate an operation where ${Program} would normally show a message box and wait for the user to press a button.</field>
    /// <field name='max_widgets' static='true' type='Number'>The maximum number of Widgets that can be made for one Window. The default value is 1000</field>
    /// <field name='max_window_lines' static='true' type='Number'>The maximum number of lines that can be made for a Window.Error(), Window.Information(), Window.Message(), Window.Question() or Window.Warning() window. The default value is 25</field>
}

var Page = function() {
}

Page.AddGraph = function() {
    /// <signature>
    /// <summary>Adds one or more graphs to the specified page.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number to add graph(s) to.</param>
    /// <param name="Graph number" type="Number" optional="true">Graph number to add to page. If this argument is 0 or not given, a new graph is created.</param>
    /// <param name="Graph number to copy properties from" type="Number" optional="true">If the second argument is 0, this specifies which graph to copy properties from when creating new graphs.</param>
    /// <param name="Number of graphs" type="Number" optional="true">If the second argument is 0, this specifies the number of new graphs to create and add to the specified page.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Page.Layout = function() {
    /// <signature>
    /// <summary>Sets the layout of either all pages or a specified page.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number for which to set layout. If this argument is 0 then layout will be set on all pages individually. If -1 then the layout will be set globally, as in the 'Graphs' panel.</param>
    /// <param name="Layout" type="Number" optional="false">Layout specifier. Options are: "wide" or 1 - Tile wide, "tall" or 2 - Tile tall, "cascade" or 3 - Cascade, "1x1" or 4 - 1x1, "2x2" or 5 - 2x2, "3x3" or 6 - 3x3, "xy" or 7 - XxY.</param>
    /// <param name="Num in X" type="Number" optional="true">Number of graphs in X-direction if user-defined XxY layout (7).</param>
    /// <param name="Num in Y" type="Number" optional="true">Number of graphs in Y-direction if user-defined XxY layout (7).</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Page.RemoveGraph = function() {
    /// <signature>
    /// <summary>Remove one or more graphs from the specified page.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number to remove the graph from.</param>
    /// <param name="Graph number" type="Number" optional="true">Graph number to remove from page. If this argument is 0 or not given, the highest number graph on the page will be removed. If this argument is -1, all graphs will be removed.</param>
    /// <param name="Lower end of range for removing graphs" type="Number" optional="true">If the second argument is 0, this specifies the lower end of the range for removing graphs. All graphs with numbers within the specified range will be removed from the page.</param>
    /// <param name="Upper end of range for removing graphs" type="Number" optional="true">If the second argument is 0, this specifies the upper end of the range for removing graphs. All graphs with numbers within the specified range will be removed from the page. If this argument is not given then it will be set to 32 by default.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

Page.ReturnActivePage = function() {
    /// <signature>
    /// <summary>Returns the current active page in T/HIS.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Page.ReturnGraphs = function() {
    /// <signature>
    /// <summary>Returns the graphs on the specified page as an array of Graph objects.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number for which to return the graphs it contains.</param>
    /// <returns type="Array" elementType="Graph"/>
    /// </signature>
}

Page.SetActivePage = function() {
    /// <signature>
    /// <summary>Sets the current active page in T/HIS, returning -1 if the page does not exist or the page number if it does.</summary>
    /// <param name="Page number" type="Number" optional="false">Page number to set to active page</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

var PopupWindow = function() {
    /// <signature>
    /// <summary>Create a new PopupWindow object.</summary>
    /// <returns type="PopupWindow"/>
    /// </signature>
    /// <field name='persistent' static='false' type='Boolean'>If the popup window will remain mapped when a button is pressed in it. By default (false) when a button is pressed in the popup window the popup will be unmapped. If set to true then the popup will remain mapped until the user clicks out of the window or hides it by calling Hide()</field>
}

PopupWindow.prototype.Hide = function() {
    /// <signature>
    /// <summary>Hides (unmaps) the popup window.</summary>
    /// <returns type="null"/>
    /// </signature>
}

var Read = function() {
}

Read.Bulk = function() {
    /// <signature>
    /// <summary>Reads a Bulk Data file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of Bulk Data file to read</param>
    /// </signature>
}

Read.CSV = function() {
    /// <signature>
    /// <summary>Reads a CSV file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of CSV file to read.</param>
    /// <param name="CSV type" type="Number" optional="true">0,1 or no argument for XYXY file type, 2 for XYYY.</param>
    /// <param name="Row containing curve labels" type="Number" optional="true">Index of the row containing curve labels. This is row 1 by default, so should be set to 0 if no curve labels are present.</param>
    /// <param name="Row containing axis labels" type="Number" optional="true">Index of the row containing axis labels. This is row 2 by default, so should be set to 0 if no axis labels are present.</param>
    /// <param name="CSV seperation option" type="Number" optional="true">0 or no argument for comma, 1 for space, 2 for tab.</param>
    /// <param name="X values column number" type="Number" optional="true">Index of the column containing X-values. This is column 1 by default.</param>
    /// <param name="X axis start value" type="Number" optional="true">Instead of taking X-values from the CSV file, this allows the user to define a value for the start of the X-axis.</param>
    /// <param name="X axis interval" type="Number" optional="true">User defined X-interval between points, to use together with the previous argument.</param>
    /// </signature>
}

Read.Cur = function() {
    /// <signature>
    /// <summary>Reads a Curve file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of Curve file to read</param>
    /// </signature>
}

Read.DIAdem = function() {
    /// <signature>
    /// <summary>Reads a DIAdem file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of DIAdem header file to read.</param>
    /// <param name="X-axis channel" type="Number" optional="false">Index of the channel to use as X-axis values. If this is 0 then the X-values can be generated from a start value and an interval in the following two arguments.</param>
    /// <param name="X-axis start value" type="Number" optional="true">Instead of taking X-values from a DIAdem channel, this allows the user to define a value for the start of the X-axis.</param>
    /// <param name="X axis interval" type="Number" optional="true">User defined interval between points on the X-axis, to use together with the previous argument.</param>
    /// <param name="Show channel names" type="Number" optional="true">Channel comments will be written into the curve tag if no argument or 0, channel names if this argument is 1.</param>
    /// <param name="Filter" type="String" optional="false">String to filter channel names/comments. Only channels whose names/comments contain the filter string will be read.</param>
    /// </signature>
}

Read.Equation = function() {
    /// <signature>
    /// <summary>Create a curve from a user-defined equation.</summary>
    /// <param name="Formula" type="String" optional="false">Equation string.</param>
    /// <param name="X values option" type="Number" optional="true">0 to define x values using X start, X end and X interval, via the following 3 arguments. 1 to calculate x values from curve variables used in the equation, this is the default if curve variables are used and no argument is given. -ID to take x values from Curve #ID.</param>
    /// <param name="X start" type="Number" optional="true">Left endpoint of the x range. Default 0.0.</param>
    /// <param name="X end" type="Number" optional="true">Right endpoint of the x range. Default 1.0.</param>
    /// <param name="X interval" type="Number" optional="true">Interval between points. Default 0.01.</param>
    /// </signature>
}

Read.ISO = function() {
    /// <signature>
    /// <summary>Reads an ISO file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of ISO file to read</param>
    /// <param name="File format" type="Number" optional="true">Format of ISO file, no argument, 0 or 1 for multiple channels, 2 for single channel.</param>
    /// </signature>
}

Read.Key = function() {
    /// <signature>
    /// <summary>Reads a Keyword file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of Keyword file to read</param>
    /// </signature>
}

Read.LSPP = function() {
    /// <signature>
    /// <summary>Reads an LS-PREPOST file into T/HIS.</summary>
    /// <param name="Filename" type="String" optional="false">Name of LS-PREPOST file to read</param>
    /// <param name="File format" type="Number" optional="true">Format of LS-PREPOST file, no argument, 0 or 1 for Curve File, 2 for XY Pairs.</param>
    /// </signature>
}

var Symbol = function() {
    /// <field name='CIRCLE' static='true' type='Number'>Circle symbol</field>
    /// <field name='CROSS' static='true' type='Number'>Cross symbol</field>
    /// <field name='DIAMOND' static='true' type='Number'>Diamond symbol</field>
    /// <field name='DOT' static='true' type='Number'>Dot symbol</field>
    /// <field name='HOURGLASS' static='true' type='Number'>Hourglass symbol</field>
    /// <field name='NONE' static='true' type='Number'>No symbol</field>
    /// <field name='SQUARE' static='true' type='Number'>Square symbol</field>
    /// <field name='STAR' static='true' type='Number'>Star symbol</field>
    /// <field name='TRIANGLE' static='true' type='Number'>Triangle symbol</field>
}

var UnitSystem = function() {
    /// <field name='U1' static='true' type='Number'>U1 unit system (m,ks,s)</field>
    /// <field name='U2' static='true' type='Number'>U2 unit system (mm,T,s)</field>
    /// <field name='U3' static='true' type='Number'>U3 unit system (mm,kg,ms)</field>
    /// <field name='U4' static='true' type='Number'>U4 unit system (mm,gm,ms)</field>
    /// <field name='U5' static='true' type='Number'>U5 unit system (ft,slug,s)</field>
    /// <field name='U6' static='true' type='Number'>U6 unit system (m,T,s)</field>
}

var Units = function() {
    /// <field name='ACCELERATION' static='true' type='Number'>Acceleration units</field>
    /// <field name='AREA' static='true' type='Number'>Area units</field>
    /// <field name='CONDUCTIVITY' static='true' type='Number'>Conductivity units</field>
    /// <field name='CURRENT' static='true' type='Number'>Current units</field>
    /// <field name='DENSITY' static='true' type='Number'>Density units</field>
    /// <field name='DISPLACEMENT' static='true' type='Number'>Displacement units</field>
    /// <field name='ELECTRIC_FIELD_VECTOR' static='true' type='Number'>Electric Field Vector units</field>
    /// <field name='ENERGY' static='true' type='Number'>Energy units</field>
    /// <field name='ENERGY_DENSITY' static='true' type='Number'>Energy Density units</field>
    /// <field name='FLUX' static='true' type='Number'>Thermal Flux units</field>
    /// <field name='FORCE' static='true' type='Number'>Force units</field>
    /// <field name='FORCE_WIDTH' static='true' type='Number'>Force per unit width units</field>
    /// <field name='FREQUENCY' static='true' type='Number'>Frequency units</field>
    /// <field name='LENGTH' static='true' type='Number'>Length units</field>
    /// <field name='MAGNETIC_FLUX_VECTOR' static='true' type='Number'>Magnetic Flux Vector units</field>
    /// <field name='MASS' static='true' type='Number'>MAss units</field>
    /// <field name='MASS_FLOW' static='true' type='Number'>Mass Flow rate units</field>
    /// <field name='MOMENT' static='true' type='Number'>Moment units</field>
    /// <field name='MOMENTUM' static='true' type='Number'>Momentum units</field>
    /// <field name='MOMENT_WIDTH' static='true' type='Number'>Moment per unit width units</field>
    /// <field name='NONE' static='true' type='Number'>No units</field>
    /// <field name='POWER' static='true' type='Number'>Power units</field>
    /// <field name='PRESSURE' static='true' type='Number'>Pressure units</field>
    /// <field name='Q_CRITERION' static='true' type='Number'>Q Criterion units</field>
    /// <field name='ROTATION' static='true' type='Number'>Rotation units</field>
    /// <field name='ROTATIONAL_ACCELERATION' static='true' type='Number'>Rotational Acceleration units</field>
    /// <field name='ROTATIONAL_VELOCITY' static='true' type='Number'>Rotational Velocity units</field>
    /// <field name='STRAIN' static='true' type='Number'>Strain units</field>
    /// <field name='STRESS' static='true' type='Number'>Stress units</field>
    /// <field name='TEMPERATURE' static='true' type='Number'>Temperature units</field>
    /// <field name='THERMAL_DIFFUSIVITY' static='true' type='Number'>Thermal Diffusivity units</field>
    /// <field name='TIME' static='true' type='Number'>Time units</field>
    /// <field name='UNKNOWN' static='true' type='Number'>Unknown units</field>
    /// <field name='VECTOR_POTENTIAL' static='true' type='Number'>Vector Potential units</field>
    /// <field name='VELOCITY' static='true' type='Number'>Velocity units</field>
    /// <field name='VISCOSITY' static='true' type='Number'>Viscosity units</field>
    /// <field name='VOLUME' static='true' type='Number'>Volume units</field>
    /// <field name='VORTICITY' static='true' type='Number'>Vorticity units</field>
    /// <field name='WORK' static='true' type='Number'>Work units</field>
}

Units.USER = function() {
    /// <signature>
    /// <summary>Setup a user defined UNIT</summary>
    /// <param name="mass" type="Number" optional="false">Power for mass dimensions.</param>
    /// <param name="time" type="Number" optional="false">Power for time dimensions.</param>
    /// <param name="length" type="Number" optional="false">Power for length dimensions.</param>
    /// <param name="angle" type="Number" optional="false">Power for angle dimensions.</param>
    /// <param name="temperature" type="Number" optional="false">Power for temperature dimensions.</param>
    /// <param name="current" type="Number" optional="true">Power for current dimensions.</param>
    /// <returns type="Number"/>
    /// </signature>
}

var Widget = function() {
    /// <signature>
    /// <summary>Create a new Widget object.</summary>
    /// <param name="window" type="Window|PopupWindow" optional="false">Window or PopupWindow that widget will be created in</param>
    /// <param name="type" type="Number" optional="false">Widget type. Can be Widget.LABEL, Widget.BUTTON, Widget.CHECKBOX, Widget.COMBOBOX, Widget.LISTBOX, Widget.TEXTBOX or Widget.SLIDER.</param>
    /// <param name="left" type="Number" optional="false">left coordinate of widget</param>
    /// <param name="right" type="Number" optional="false">right coordinate of widget</param>
    /// <param name="top" type="Number" optional="false">top coordinate of widget</param>
    /// <param name="bottom" type="Number" optional="false">bottom coordinate of widget</param>
    /// <param name="text" type="String" optional="true">Text to show on widget (optional for LABEL, BUTTON and TEXTBOX, not required for CHECKBOX, COMBOBOX, LISTBOX and SLIDER)</param>
    /// <returns type="Widget"/>
    /// </signature>
    /// <field name='active' static='false' type='Boolean'>If widget is active (true) or disabled (false)</field>
    /// <field name='arrows' static='false' type='Boolean'>Whether arrows will be shown for a slider (default is true). Slider Widgets only.</field>
    /// <field name='background' static='false' type='Number'>Widget background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY, Widget.ORANGE, Widget.DEFAULT, Widget.COLOUR_NEUTRAL, Widget.COLOUR_CONTRAST, Widget.COLOUR_CONTRAST_2, Widget.COLOUR_WARNING, Widget.COLOUR_SAFE, Widget.COLOUR_TITLE, Widget.COLOUR_INVERSE, Widget.DARKGREY_NEUTRAL, Widget.LIGHTGREY_NEUTRAL Note, background colours in the Window.THEME_DARK, Window.THEME_LIGHT, and Window.THEME_CLASSIC themes will be determined by the category of the widget not the background colour. To override this behaviour and use this background colour first set the widget category to Widget.NO_CATEGORY.</field>
    /// <field name='bottom' static='false' type='Number'>Widget bottom coordinate</field>
    /// <field name='category' static='false' type='Number'>The button category which determines the button's appearance when using the new user interface, see Window.Theme()</field>
    /// <field name='fontSize' static='false' type='Number'>Widget font size in points. Currently only supports the following sizes: 6, 7, 8, 10, 12, 14, 18, 24. Can be used only with Widget.LABEL and Widget.BUTTON. Both LATIN1 and UTF-8 encoding is supported on Windows but Linux only supports LATIN1 encoding at the moment.</field>
    /// <field name='foreground' static='false' type='Number'>Widget foreground colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY, Widget.ORANGE, Widget.DEFAULT, Widget.COLOUR_NEUTRAL, Widget.COLOUR_CONTRAST, Widget.COLOUR_CONTRAST_2, Widget.COLOUR_WARNING, Widget.COLOUR_SAFE, Widget.COLOUR_TITLE, Widget.COLOUR_LABEL, Widget.COLOUR_INVERSE, Widget.DARKGREY_NEUTRAL, Widget.LIGHTGREY_NEUTRAL</field>
    /// <field name='hover' static='false' type='String'>Widget hover text</field>
    /// <field name='imageHeight' static='false' type='Number'>Height of widget image (pixels)</field>
    /// <field name='imageWidth' static='false' type='Number'>Width of widget image (pixels)</field>
    /// <field name='justify' static='false' type='Number'>Widget justification. Can be: Widget.LEFT, Widget.RIGHT or Widget.CENTRE (default).</field>
    /// <field name='left' static='false' type='Number'>Widget left coordinate</field>
    /// <field name='lineWidth' static='false' type='Number'>Width of lines when drawing graphics (initially 1; values 1-255 allowed).</field>
    /// <field name='macroTag' static='false' type='String'>Tag to use for this widget when recording a macro. If empty then the text property value will be used.</field>
    /// <field name='maximum' static='false' type='Number'>The maximum value allowed for a slider (default is 100). Slider Widgets only.</field>
    /// <field name='minimum' static='false' type='Number'>The minimum value allowed for a slider (default is 0). Slider Widgets only.</field>
    /// <field name='monospace' static='false' type='Boolean'>true if the widget uses a monospace font instead of a proportional width font (default). Label and button Widgets only.</field>
    /// <field name='onChange' static='false' type='function'>Function to call when the text in a TEXTBOX widget, the selection in a COMBOBOX widget or the value of a SLIDER is changed. The Widget object is accessible in the function using the 'this' keyword (see the example below for more details of how to define the function and how to use the 'this' keyword). To unset the function set the property to null. Note that this function is called when the user actually types something into the textbox, selects an item in the combobox or moves the slider, NOT when the Widget.text or Widget.value property changes.</field>
    /// <field name='onClick' static='false' type='function'>Function to call when a BUTTON, LABEL, CHECKBOX or COMBOBOX widget is clicked. The Widget object is accessible in the function using the 'this' keyword (see the example below for more details of how to define the function and how to use the 'this' keyword). To unset the function set the property to null. Note that this function is called when the user actually clicks on the button, NOT when the Widget.pushed property changes. For the COMBOBOX widget the function is called before the list of items is mapped.</field>
    /// <field name='onPopup' static='false' type='function'>Function to call when a BUTTON, LABEL or TEXTBOX widget is right clicked to map a popup. The Widget object is accessible in the function using the 'this' keyword. The PopupWindow can then be found by using the popupWindow property of the Widget. The function is called before the popup is mapped so you can change the widgets in the popup as required.</field>
    /// <field name='onTimer' static='false' type='function'>Function to call for a widget when timerDelay ms have elapsed after setting this. Additionally if timerRepeat is set this function will be called repetitively, every timerDelay ms. The Widget object is accessible in the function using the 'this' keyword. To unset the function set the property to null. Note that as soon as this property is set the timer starts!</field>
    /// <field name='orientation' static='false' type='Number'>The orientation of a slider. Can be: Widget.VERTICAL or Widget.HORIZONTAL (default). Slider Widgets only.</field>
    /// <field name='popupDirection' static='false' type='Number'>How PopupWindow will be mapped relative to this widget. Can be Widget.LEFT, Widget.RIGHT, Widget.TOP or Widget.BOTTOM (default).</field>
    /// <field name='popupSymbol' static='false' type='Boolean'>TRUE (default) if a symbol will be shown for a PopupWindow.</field>
    /// <field name='popupWindow' static='false' type='PopupWindow'>PopupWindow for this Widget. Only available for Button, Label and Textbox Widgets. To remove a PopupWindow from a Widget set to null.</field>
    /// <field name='pushed' static='false' type='Boolean'>If widget is pushed (true) or not (false). This only affects Widget.BUTTON with the Widget.toggle property set, and Widget.CHECKBOX widgets.</field>
    /// <field name='right' static='false' type='Number'>Widget right coordinate</field>
    /// <field name='select' static='false' type='Number'>Selection method for ListBox Widgets. Can be: Widget.SELECT_NONE, Widget.SELECT_SINGLE or Widget.SELECT_MULTIPLE or Widget.SELECT_ENHANCED (default).</field>
    /// <field name='selectedItem' static='false' type='WidgetItem'>WidgetItem that is currently selected for a ComboBox Widget. If null no WidgetItem is selected. For a ListBox Widget this property contains the last WidgetItem that was (de)selected. To get a list of all of the selected WidgetItems use WidgetItems() to return all of the WidgetItems and inspect the WidgetItem selected property.</field>
    /// <field name='shown' static='false' type='Boolean'>true if the widget is visible. To alter the visibility of a widget use the Show() and Hide() methods.</field>
    /// <field name='step' static='false' type='Number'>The step value of a slider (default is 1). Slider Widgets only.</field>
    /// <field name='text' static='false' type='String'>Widget text. For a ComboBox Widget this will be the text for the currently selected WidgetItem</field>
    /// <field name='textHidden' static='false' type='Boolean'>true if the widget text is hidden and replaced by asterisks. This may be used to create textboxes to type passwords in. TextBox Widgets only.</field>
    /// <field name='timerDelay' static='false' type='Number'>Delay in ms before the function set for onTimer will be called. The initial value is 1000 (ms). Also see timerRepeat.</field>
    /// <field name='timerRepeat' static='false' type='Boolean'>If the function set for onTimer will be called once (false) or repeatedly (true). The initial value is false. Also see timerDelay.</field>
    /// <field name='toggle' static='false' type='Boolean'>If widget can be toggled (true) or not (false). This only affects Widget.BUTTON widgets.</field>
    /// <field name='top' static='false' type='Number'>Widget top coordinate</field>
    /// <field name='type' static='false' type='Number'>Type of the widget</field>
    /// <field name='value' static='false' type='Number'>The current value of a slider (initially will be the minimum value). Slider Widgets only.</field>
    /// <field name='window' static='false' type='Window'>The Window that this widget is defined in</field>
    /// <field name='xResolution' static='false' type='Number'>X resolution of button when drawing lines, circles, polygons and rectangles (initially 100). X coordinates on the Widget can be from 0 (on the left of the widget) to xResolution (on the right of the widget). Available for Widget.LABEL and Widget.BUTTON Widgets.</field>
    /// <field name='yResolution' static='false' type='Number'>Y resolution of button when drawing lines, circles, polygons and rectangles (initially 100). Y coordinates on the Widget can be from 0 (on the top of the widget) to yResolution (on the bottom of the widget). Available for Widget.LABEL and Widget.BUTTON Widgets.</field>
    /// <field name='BLACK' static='true' type='Number'>Colour black</field>
    /// <field name='BLUE' static='true' type='Number'>Colour blue</field>
    /// <field name='BOTTOM' static='true' type='Number'>Bottom justification</field>
    /// <field name='BUTTON' static='true' type='Number'>Button widget</field>
    /// <field name='CATEGORY_APPLY' static='true' type='Number'>Apply buttons</field>
    /// <field name='CATEGORY_BUTTON_BOX' static='true' type='Number'>A button box panel that contains other widgets</field>
    /// <field name='CATEGORY_CANCEL' static='true' type='Number'>Buttons which cancel the current operation</field>
    /// <field name='CATEGORY_DATA_ENTRY_HEADER' static='true' type='Number'>Header for data entry cells, e.g. PRIMER create panels</field>
    /// <field name='CATEGORY_DISMISS' static='true' type='Number'>Buttons to close or dismiss panels</field>
    /// <field name='CATEGORY_ENTITY' static='true' type='Number'>Entity types in T/HIS</field>
    /// <field name='CATEGORY_GENERIC' static='true' type='Number'>A generic button that isn't a special category</field>
    /// <field name='CATEGORY_GENERIC_2' static='true' type='Number'>An alternative to the generic category that has a complementary colour</field>
    /// <field name='CATEGORY_HELP' static='true' type='Number'>Help buttons</field>
    /// <field name='CATEGORY_KEYWORD' static='true' type='Number'>A PRIMER keyword button</field>
    /// <field name='CATEGORY_LABEL' static='true' type='Number'>A text label</field>
    /// <field name='CATEGORY_LABEL_BOX' static='true' type='Number'>Text label with a border</field>
    /// <field name='CATEGORY_LABEL_POPUP' static='true' type='Number'>Text label with a popup that blends into the background</field>
    /// <field name='CATEGORY_MENU_BOX' static='true' type='Number'>A menu box</field>
    /// <field name='CATEGORY_MESSAGE' static='true' type='Number'>For displaying a temporary warning message</field>
    /// <field name='CATEGORY_OPERATE' static='true' type='Number'>Operate buttons in T/HIS</field>
    /// <field name='CATEGORY_POPUP_BOX' static='true' type='Number'>A popup box that can contain buttons and plain text</field>
    /// <field name='CATEGORY_SAFE_ACTION' static='true' type='Number'>Buttons (usually green) to indicate a safe action</field>
    /// <field name='CATEGORY_SEL_ALL' static='true' type='Number'>Select all</field>
    /// <field name='CATEGORY_TAB' static='true' type='Number'>Tab</field>
    /// <field name='CATEGORY_TABLE_HEADER' static='true' type='Number'>Table (column) header</field>
    /// <field name='CATEGORY_TABLE_ROW' static='true' type='Number'>Table row</field>
    /// <field name='CATEGORY_TEXT_BOX' static='true' type='Number'>A text box</field>
    /// <field name='CATEGORY_TICKBOX' static='true' type='Number'>A tick box</field>
    /// <field name='CATEGORY_TITLE' static='true' type='Number'>Title text</field>
    /// <field name='CATEGORY_TOGGLE' static='true' type='Number'>Buttons that can be toggled, e.g. On/Off</field>
    /// <field name='CATEGORY_TOOL' static='true' type='Number'>Buttons within the tools area</field>
    /// <field name='CATEGORY_UNDO' static='true' type='Number'>Buttons which undo the last operation</field>
    /// <field name='CATEGORY_UNSEL_ALL' static='true' type='Number'>Unselect/deslect all</field>
    /// <field name='CATEGORY_UPDATE' static='true' type='Number'>Update buttons which update the screen but leave the panel open</field>
    /// <field name='CATEGORY_WARNING_ACTION' static='true' type='Number'>Buttons (usually red) to indicate a dangerous action</field>
    /// <field name='CENTRE' static='true' type='Number'>Centre (horizontal) justification</field>
    /// <field name='CHECKBOX' static='true' type='Number'>Checkbox widget</field>
    /// <field name='COLOUR_CONTRAST' static='true' type='Number'>A contrasting colour in the 3 user interface themes (Green, Purple, and Blue in the Dark, Light, and Classic themes respectively). Blue in the legacy theme.</field>
    /// <field name='COLOUR_CONTRAST_2' static='true' type='Number'>Another contrasting colour in the 3 user interface themes (Yellow, Red, and Red in the Dark, Light, and Classic themes respectively). Red in the legacy theme.</field>
    /// <field name='COLOUR_INVERSE' static='true' type='Number'>Inverse colour in the 3 user interface themes (Black or white depending on theme). Black in the legacy theme.</field>
    /// <field name='COLOUR_LABEL' static='true' type='Number'>Label text colour in the 3 user interface themes (Black or white depending on theme). Black in the legacy theme.</field>
    /// <field name='COLOUR_NEUTRAL' static='true' type='Number'>Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Light grey in the legacy theme.</field>
    /// <field name='COLOUR_SAFE' static='true' type='Number'>Safe colour in the 3 user interface themes (Different shade of green in every theme). Dark green in the legacy theme.</field>
    /// <field name='COLOUR_TITLE' static='true' type='Number'>Title colour in the 3 user interface themes (Different shade of grey in every theme). Dark blue in the legacy theme.</field>
    /// <field name='COLOUR_WARNING' static='true' type='Number'>Warning colour in the 3 user interface themes (Different shade of red in every theme). Dark red in the legacy theme.</field>
    /// <field name='COMBOBOX' static='true' type='Number'>Combobox widget</field>
    /// <field name='CYAN' static='true' type='Number'>Colour cyan</field>
    /// <field name='DARKBLUE' static='true' type='Number'>Colour dark blue</field>
    /// <field name='DARKGREEN' static='true' type='Number'>Colour dark green</field>
    /// <field name='DARKGREY' static='true' type='Number'>Colour dark grey</field>
    /// <field name='DARKGREY_NEUTRAL' static='true' type='Number'>Only valid in the function 'Line'. Used to keep the 3D effect in the legacy theme and not in the other themes. Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Dark grey in the legacy theme</field>
    /// <field name='DARKRED' static='true' type='Number'>Colour dark red</field>
    /// <field name='DEFAULT' static='true' type='Number'>Default colour for widgets</field>
    /// <field name='GREEN' static='true' type='Number'>Colour green</field>
    /// <field name='GREY' static='true' type='Number'>Colour grey</field>
    /// <field name='HORIZONTAL' static='true' type='Number'>Horizontal orientation (for sliders)</field>
    /// <field name='LABEL' static='true' type='Number'>Label widget</field>
    /// <field name='LEFT' static='true' type='Number'>Left justification</field>
    /// <field name='LIGHTGREY' static='true' type='Number'>Colour light grey</field>
    /// <field name='LIGHTGREY_NEUTRAL' static='true' type='Number'>Only valid in the function 'Line'. Used to keep the 3D effect in the legacy theme and not in the other themes. Neutral colour in the 3 user interface themes (Different shade of grey in every theme). Light grey in the legacy theme</field>
    /// <field name='LISTBOX' static='true' type='Number'>Listbox widget</field>
    /// <field name='MAGENTA' static='true' type='Number'>Colour magenta</field>
    /// <field name='MIDDLE' static='true' type='Number'>Middle (vertical) justification</field>
    /// <field name='NO_CATEGORY' static='true' type='Number'>No styling is applied. Widget colour controlled by foreground/background properties and is the same in all themes</field>
    /// <field name='ORANGE' static='true' type='Number'>Colour orange</field>
    /// <field name='RED' static='true' type='Number'>Colour red</field>
    /// <field name='RGB24' static='true' type='Number'>24 bits for RGB data in widget images</field>
    /// <field name='RGB8' static='true' type='Number'>8 bits for RGB data in widget images</field>
    /// <field name='RIGHT' static='true' type='Number'>Right justification</field>
    /// <field name='SCALE' static='true' type='Number'>Image will be scaled to fit widget</field>
    /// <field name='SELECT_ENHANCED' static='true' type='Number'>Multiple WidgetItems in a ListBox Widget can be selected. When the user selects a WidgetItem the selection is cleared and the new WidgetItem selected. However, if the user presses the Ctrl key when clicking on a WidgetItem, the clicked WidgetItem gets toggled and all other WidgetItems are left untouched. If the user presses the Shift key while clicking on a WidgetItem, all WidgetItems between the last selected WidgetItem and the clicked WidgetItem are selected or unselected, depending on the state of the clicked WidgetItem.</field>
    /// <field name='SELECT_MULTIPLE' static='true' type='Number'>Multiple WidgetItems in a ListBox Widget can be selected. When the user selects a WidgetItem, the selection status of that WidgetItem is toggled and the other WidgetItems are left alone.</field>
    /// <field name='SELECT_NONE' static='true' type='Number'>No WidgetItem in a ListBox Widget can be selected</field>
    /// <field name='SELECT_SINGLE' static='true' type='Number'>A single WidgetItem in a ListBox Widget can be selected. When the user selects a WidgetItem, any already-selected WidgetItem becomes unselected, and the user cannot unselect the selected WidgetItem by clicking on it.</field>
    /// <field name='SLIDER' static='true' type='Number'>Slider widget</field>
    /// <field name='TEXTBOX' static='true' type='Number'>Text input widget</field>
    /// <field name='TOP' static='true' type='Number'>Top justification</field>
    /// <field name='VERTICAL' static='true' type='Number'>Vertical orientation (for sliders)</field>
    /// <field name='WHITE' static='true' type='Number'>Colour white</field>
    /// <field name='YELLOW' static='true' type='Number'>Colour yellow</field>
}

Widget.prototype.AddWidgetItem = function() {
    /// <signature>
    /// <summary>Adds a WidgetItem to the Widget. Also see Widget.RemoveAllWidgetItems and Widget.RemoveWidgetItem.</summary>
    /// <param name="item" type="WidgetItem" optional="false">WidgetItem to add</param>
    /// <param name="position" type="Number" optional="true">Position on Widget to add the WidgetItem. Any existing WidgetItems will be shifted down as required. If omitted the WidgetItem will be added to the end of the existing ones. Note that positions start at 0.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Circle = function() {
    /// <signature>
    /// <summary>Draws a circle on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().</summary>
    /// <param name="colour" type="Number" optional="false">Colour of circle. See foreground for colours.</param>
    /// <param name="fill" type="Boolean" optional="false">If circle should be filled or not.</param>
    /// <param name="xc" type="Number" optional="false">x coordinate of centre of circle.</param>
    /// <param name="yc" type="Number" optional="false">y coordinate of centre of circle.</param>
    /// <param name="radius" type="Number" optional="false">radius of circle.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Clear = function() {
    /// <signature>
    /// <summary>Clears any graphics on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.ClearSelection = function() {
    /// <signature>
    /// <summary>Clears selection of any WidgetItems on the widget. Only possible for Widget.COMBOBOX and Widget.LISTBOX widgets.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Cross = function() {
    /// <signature>
    /// <summary>Draws a cross symbol on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets.</summary>
    /// <param name="colour" type="Number" optional="true">Colour of cross symbol. See foreground for colours. If omitted, current foreground colour is used.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.CtrlPressed = function() {
    /// <signature>
    /// <summary>Check to see if the Ctrl key is pressed</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

Widget.prototype.Delete = function() {
    /// <signature>
    /// <summary>Deletes the widget from T/HIS (removing it from the window it is defined in) and returns any memory/resources used for the widget. This function should not normally need to be called. However, sometimes a script may want to recreate widgets in a window many times and unless the old widgets are deleted T/HIS will reach the maximum number of widgets for a window (Options.max_widgets). To avoid this problem this method can be used to force T/HIS to delete and return the resources for a widget. Do not use the Widget object after calling this method.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.DirectoryIcon = function() {
    /// <signature>
    /// <summary>Draws a directory icon on the widget. Only possible for Widget.BUTTON widgets.</summary>
    /// <param name="line_colour" type="Number" optional="false">Colour of lines of folder (only used in the old UI - in the new UI it will be ignored, a standard icon is always used). See foreground for colours.</param>
    /// <param name="fill_colour" type="Number" optional="false">Colour of fill of folder (only used in the old UI - in the new UI it will be ignored, a standard icon is always used). See foreground for colours.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.DumpImageString = function() {
    /// <signature>
    /// <summary>Dumps a string representation of an image for a widget to a file in a form that can be used by Widget.ReadImageString(). Only possible for Widget.LABEL and Widget.BUTTON widgets.</summary>
    /// <param name="filename" type="String" optional="false">Filename to dump string representation to</param>
    /// <param name="format" type="Number" optional="true">Can be Widget.RGB8 or Widget.RGB24. Before version 15 T/HIS only used 8 bits to store RGB (red, green and blue) colour information for widget images. In version 15 widget images have been changed to use 24 bits to store RGB information (8 bits for red, 8 bits for green and 8 bits for blue). Both formats are supported. If omitted the new Widget.RGB24 format will be used. See Widget.ReadImageString() for more details.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Hide = function() {
    /// <signature>
    /// <summary>Hides the widget on the screen</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.ItemAt = function() {
    /// <signature>
    /// <summary>Returns the WidgetItem object used at index in this Widget. See also Widget.TotalItems() and Widget.WidgetItems().</summary>
    /// <param name="index" type="Number" optional="false">index to return WidgetItem for. Note that indices start at 0.</param>
    /// <returns type="WidgetItem"/>
    /// </signature>
}

Widget.prototype.Line = function() {
    /// <signature>
    /// <summary>Draws a line on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().</summary>
    /// <param name="colour" type="Number" optional="false">Colour of line. See foreground for colours.</param>
    /// <param name="x1" type="Number" optional="false">x coordinate of start of line.</param>
    /// <param name="y1" type="Number" optional="false">y coordinate of start of line.</param>
    /// <param name="x2" type="Number" optional="false">x coordinate of end of line.</param>
    /// <param name="y2" type="Number" optional="false">y coordinate of end of line.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.PixelsPerUnit = function() {
    /// <signature>
    /// <summary>Returns the number of pixels per unit coordinate. This will vary depending on the monitor T/HIS is running on.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Widget.prototype.Polygon = function() {
    /// <signature>
    /// <summary>Draws a polygon on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().</summary>
    /// <param name="colour" type="Number" optional="false">Colour of polygon. See foreground for colours.</param>
    /// <param name="fill" type="Boolean" optional="false">If polygon should be filled or not.</param>
    /// <param name="x1" type="Number" optional="false">x coordinate of point 1.</param>
    /// <param name="y1" type="Number" optional="false">y coordinate of point 1.</param>
    /// <param name="x2" type="Number" optional="false">x coordinate of point 2.</param>
    /// <param name="y2" type="Number" optional="false">y coordinate of point 2.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.ReadImageFile = function() {
    /// <signature>
    /// <summary>Reads an image from a file to show on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The image will be shown on the widget underneath any text. Note that due to the way that colours are used for menus in T/HIS only a small number of colours are available for Widget images. Black and white images will display without any issues but colour images will be displayed with a reduced set of colours.</summary>
    /// <param name="filename" type="String" optional="false">Image file (BMP, GIF, JPEG or PNG) to read. To remove an image use null.</param>
    /// <param name="justify" type="Number" optional="true">Widget justification. Can be a bitwise or of Widget.LEFT, Widget.RIGHT or Widget.CENTRE and Widget.TOP, Widget.MIDDLE or Widget.BOTTOM. Additionally Widget.SCALE can be used to scale the image (either reducing or enlarging it) so that it fills the widget. If omitted the default is Widget.CENTRE|Widget.MIDDLE without scaling.</param>
    /// <param name="transparent" type="Number" optional="true">Transparent colour. Must be a colour returned by Colour.RGB() in T/HIS. If given then this colour will be replaced by a transparent colour. i.e. the widget background colour will be shown. If omitted or null no transparency will be used.</param>
    /// <param name="tolerance" type="Number" optional="true">Tolerance for transparent colour (0-255). Any pixels in the image that have a red, green and blue colour value within tolerance of the transparent colour will be transparent. For example if the transparent colour was given as Colour.RGB(255, 0, 0) and tolerance is 0 only pixels which have red value 255 and green value 0 and blue value 0 will be made transparent. If tolerance is 4, pixels which have red values between 251 and 255 and green values between 0 and 4 and blue values between 0 and 4 will be made transparent. If omitted a value of 8 will be used.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.ReadImageString = function() {
    /// <signature>
    /// <summary>Reads an image from a JavaScript string previously created by Widget.DumpImageString() to show on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The image will be shown on the widget underneath any text. Note, prior to version 15 of T/HIS only a small number of colours were available for Widget images. In version 14 and earlier the RGB (red, green and blue) information for each pixel in the image was packed into a single byte (8 bits) with 3 bits for red, 3 for green and 2 for blue. Widget.DumpImageString() always returned the string beginning with "RRRGGGBB_RLE" which is this 8 bit format with run length encoding. This is format Widget.RGB8. In version 15 support for Widget images was enhanced to give 24bit support for colours. The RGB information for each pixel has 8 bits for red, 8 bits for green and 8 bits for blue. This is format Widget.RGB24. From version 15 Widget.DumpImageString() can either return the the old 8 bit format Widget.RGB8 (string beginning with "RRRGGGBB_RLE") or return the the new 24bit format Widget.RGB24 (string beginning with "RGB24_Z"). ReadImageString supports both formats.</summary>
    /// <param name="string" type="String" optional="false">String containing the image data previously created by Widget.DumpImageString(). To remove an image use null.</param>
    /// <param name="justify" type="Number" optional="true">Widget justification. Can be a bitwise or of Widget.LEFT, Widget.RIGHT or Widget.CENTRE and Widget.TOP, Widget.MIDDLE or Widget.BOTTOM. Additionally Widget.SCALE can be used to scale the image (either reducing or enlarging it) so that it fills the widget. If omitted the default is Widget.CENTRE|Widget.MIDDLE without scaling.</param>
    /// <param name="transparent" type="Number" optional="true">Transparent colour. Must be a colour returned by Colour.RGB() in T/HIS. If given then this colour will be replaced by a transparent colour. i.e. the widget background colour will be shown. If omitted or null no transparency will be used.</param>
    /// <param name="tolerance" type="Number" optional="true">Tolerance for transparent colour (0-255). Only used for the new 24bit format Widget.RGB24 (strings beginning with "RGB24_Z"). Ignored for the old 8 bit format Widget.RGB8 (strings beginning with "RRRGGGBB_RLE"). Any pixels in the image that have a red, green and blue colour value within tolerance of the transparent colour will be transparent. For example if the transparent colour was given as Colour.RGB(255, 0, 0) and tolerance is 0 only pixels which have red value 255 and green value 0 and blue value 0 will be made transparent. If tolerance is 4, pixels which have red values between 251 and 255 and green values between 0 and 4 and blue values between 0 and 4 will be made transparent. If omitted a value of 8 will be used.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Rectangle = function() {
    /// <signature>
    /// <summary>Draws a rectangle on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets. The coordinates are local to the Widget, not the Window. See properties xResolution and yResolution for more details. Note that the widget graphics will only be updated when the widget is redrawn. This is to allow the user to do multiple drawing commands on a widget. To force the widget to be redrawn call Show().</summary>
    /// <param name="colour" type="Number" optional="false">Colour of rectangle. See foreground for colours.</param>
    /// <param name="fill" type="Boolean" optional="false">If rectangle should be filled or not.</param>
    /// <param name="x1" type="Number" optional="false">x coordinate of first corner of rectangle.</param>
    /// <param name="y1" type="Number" optional="false">y coordinate of first corner of rectangle.</param>
    /// <param name="x2" type="Number" optional="false">x coordinate of second (opposite) corner of rectangle.</param>
    /// <param name="y2" type="Number" optional="false">y coordinate of second (opposite) corner of rectangle.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.RemoveAllWidgetItems = function() {
    /// <signature>
    /// <summary>Removes any WidgetItems from the Widget. Also see Widget.AddWidgetItem and Widget.RemoveWidgetItem.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.RemoveWidgetItem = function() {
    /// <signature>
    /// <summary>Removes a WidgetItem from the Widget. Also see Widget.AddWidgetItem and Widget.RemoveAllWidgetItems.</summary>
    /// <param name="item" type="WidgetItem" optional="false">WidgetItem to remove</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.ShiftPressed = function() {
    /// <signature>
    /// <summary>Check to see if the Shift key is pressed</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

Widget.prototype.Show = function() {
    /// <signature>
    /// <summary>Shows the widget on the screen</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.Static = function() {
    /// <signature>
    /// <summary>Windows have two different regions for Widgets. A 'normal' region which can be scrolled if required (if the window is made smaller scrollbars will be shown which can be used to scroll the contents) and a 'static' region at the top of the Window which is fixed and does not scroll. For an example of a static region in a Window see any of the keyword editing panels. The 'Dismiss', 'Create', 'Reset' etc buttons are in the static region. By default Widgets are put into the normal region of the Window. This method puts the Widget to the static region of the Window.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Widget.StringLength = function() {
    /// <signature>
    /// <summary>Returns the length of a string in Widget units. This can be used to find what size a Widget must be to be able to display the string.</summary>
    /// <param name="text" type="String" optional="false">Text to find the width of</param>
    /// <param name="monospace" type="Boolean" optional="true">If true then width will be calculated using a monospace font. If false (default) then the normal proportional width font will be used</param>
    /// <param name="fontSize" type="Number" optional="true">Calculation can be based on a defined font size, at the moment support is added only for font sizes of 6, 7, 8, 10, 12, 14, 18 and 24.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Widget.prototype.Tick = function() {
    /// <signature>
    /// <summary>Draws a tick symbol on the widget. Only possible for Widget.LABEL and Widget.BUTTON widgets.</summary>
    /// <param name="colour" type="Number" optional="true">Colour of tick symbol. See foreground for colours. If omitted, current foreground colour is used.</param>
    /// <returns type="null"/>
    /// </signature>
}

Widget.prototype.TotalItems = function() {
    /// <signature>
    /// <summary>Returns the number of the WidgetItem objects used in this Widget (or 0 if none used). See also Widget.ItemAt() and Widget.WidgetItems().</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Widget.prototype.WidgetItems = function() {
    /// <signature>
    /// <summary>Returns an array of the WidgetItem objects used in this Widget (or null if none used). See also Widget.ItemAt() and Widget.TotalItems().</summary>
    /// <returns type="Array" elementType="WidgetItem"/>
    /// </signature>
}

var WidgetItem = function() {
    /// <signature>
    /// <summary>Create a new WidgetItem object.</summary>
    /// <param name="widget" type="Widget" optional="false">Widget that widget item will be created in. This can be null in which case the WidgetItem will be created but not assigned to a Widget. It can be assigned later by using Widget.AddWidgetItem().</param>
    /// <param name="text" type="String" optional="false">Text to show on widget item</param>
    /// <param name="selectable" type="Boolean" optional="true">If the widget item can be selected. If omitted the widget item will be selectable.</param>
    /// <returns type="WidgetItem"/>
    /// </signature>
    /// <field name='background' static='false' type='Number'>Widget background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT</field>
    /// <field name='foreground' static='false' type='Number'>Widget foreground colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT</field>
    /// <field name='hover' static='false' type='String'>WidgetItem's hover text</field>
    /// <field name='index' static='false' type='Number'>The index of this widgetitem in the parent widget (undefined if widgetitem is not assigned to a widget).</field>
    /// <field name='monospace' static='false' type='Boolean'>true if the widgetitem uses a monospace font instead of a proportional width font (default).</field>
    /// <field name='onClick' static='false' type='function'>Function to call when a widget item in a COMBOBOX or LISTBOX widget is clicked. The Widgetitem object is accessible in the function using the 'this' keyword.</field>
    /// <field name='onMouseOver' static='false' type='function'>Function to call when the mouse moves over a widget item in a COMBOBOX or LISTBOX widget. The Widgetitem object is accessible in the function using the 'this' keyword.</field>
    /// <field name='selectable' static='false' type='Boolean'>If the widget item can be selected (true) or not (false).</field>
    /// <field name='selected' static='false' type='Boolean'>If the widget item is selected (true) or not (false).</field>
    /// <field name='text' static='false' type='String'>Widget text</field>
    /// <field name='widget' static='false' type='Object'>The widget that this item is defined for (null if not set)</field>
}

var Window = function() {
    /// <signature>
    /// <summary>Create a new Window object.</summary>
    /// <param name="title" type="String" optional="false">Window title to show in title bar</param>
    /// <param name="left" type="Number" optional="false">left coordinate of window in range 0.0 (left) to 1.0 (right)</param>
    /// <param name="right" type="Number" optional="false">right coordinate of window in range 0.0 (left) to 1.0 (right)</param>
    /// <param name="bottom" type="Number" optional="false">bottom coordinate of window in range 0.0 (bottom) to 1.0 (top)</param>
    /// <param name="top" type="Number" optional="false">top coordinate of window in range 0.0 (bottom) to 1.0 (top)</param>
    /// <returns type="Window"/>
    /// </signature>
    /// <field name='active' static='false' type='Boolean'>If true (default) then the window then the window is active and widgets in the window can be used. If false then the window is inactive and the widgets cannot be used.</field>
    /// <field name='background' static='false' type='Number'>Window background colour. Can be: Widget.BLACK, Widget.WHITE, Widget.RED, Widget.GREEN, Widget.BLUE, Widget.CYAN, Widget.MAGENTA, Widget.YELLOW, Widget.DARKRED, Widget.DARKGREEN, Widget.DARKBLUE, Widget.GREY, Widget.DARKGREY, Widget.LIGHTGREY or Widget.DEFAULT</field>
    /// <field name='bottom' static='false' type='Number'>bottom coordinate of window in range 0.0 (bottom) to 1.0 (top)</field>
    /// <field name='height' static='false' type='Number'>height of window</field>
    /// <field name='keepOnTop' static='false' type='Boolean'>If true then the window will be kept "on top" of other windows. If false (default) then the window stacking order can be changed.</field>
    /// <field name='left' static='false' type='Number'>left coordinate of window in range 0.0 (left) to 1.0 (right)</field>
    /// <field name='maxWidgets' static='false' type='Number'>The maximum number of widgets that can be made in this window. This can be changed before the window is created by using Options.max_widgets. Also see totalWidgets</field>
    /// <field name='onAfterShow' static='false' type='function'>Function to call after a Window is shown. The Window object is accessible in the function using the 'this' keyword. This may be useful to ensure that certain actions are done after the window is shown. It can also be used to show another window so this enables multiple windows to be shown. To unset the function set the property to null.</field>
    /// <field name='onBeforeShow' static='false' type='function'>Function to call before a Window is shown. The Window object is accessible in the function using the 'this' keyword. This may be useful to ensure that buttons are shown/hidden etc before the window is shown. Note that it cannot be used to show another window. Use onAfterShow for that. To unset the function set the property to null.</field>
    /// <field name='onClose' static='false' type='function'>Function to call when a Window is closed by pressing the X on the top right of the window. The Window object is accessible in the function using the 'this' keyword. To unset the function set the property to null.</field>
    /// <field name='resize' static='false' type='Number'>Window resizing. By default when a Window is shown it is allowed to resize on all sides (left, right, top and bottom) to try to make enough room to show the Widgets. The behaviour can be changed by using this property. It can be any combination (bitwise OR) of Window.LEFT, Window.RIGHT, Window.TOP or Window.BOTTOM or 0. In addition Window.REDUCE can also be added to allow the window to reduce in size when resizing. Note that when Window.Show is called this property is set to 0 (i.e. not to resize on any side).</field>
    /// <field name='right' static='false' type='Number'>right coordinate of window in range 0.0 (left) to 1.0 (right)</field>
    /// <field name='showClose' static='false' type='Boolean'>If true (default) then a close (X) button will automatically be added on the top right of the window. If false then no close button will be shown.</field>
    /// <field name='shown' static='false' type='Boolean'>true if window is currently shown, false if not</field>
    /// <field name='title' static='false' type='String'>Window title</field>
    /// <field name='top' static='false' type='Number'>top coordinate of window in range 0.0 (bottom) to 1.0 (top)</field>
    /// <field name='totalWidgets' static='false' type='Number'>The total number of widgets that have been made in this window. This can be changed before the window is created by using Options.max_widgets. Also see maxWidgets</field>
    /// <field name='width' static='false' type='Number'>width of window</field>
    /// <field name='BOTTOM' static='true' type='Number'>Bottom resizing/positioning of window</field>
    /// <field name='CANCEL' static='true' type='Number'>Show CANCEL button</field>
    /// <field name='CENTRE' static='true' type='Number'>Centre (horizontal) positioning of window</field>
    /// <field name='LEFT' static='true' type='Number'>Left resizing/positioning of window</field>
    /// <field name='MIDDLE' static='true' type='Number'>Middle (vertical) positioning of window</field>
    /// <field name='NO' static='true' type='Number'>Show NO button</field>
    /// <field name='NONMODAL' static='true' type='Number'>Allow Window.Error, Window.Question, Window.Warning etc windows to be non modal</field>
    /// <field name='OK' static='true' type='Number'>Show OK button</field>
    /// <field name='REDUCE' static='true' type='Number'>Window is allowed to reduce in size when resizing</field>
    /// <field name='RIGHT' static='true' type='Number'>Right resizing/positioning of window</field>
    /// <field name='THEME_CLASSIC' static='true' type='Number'>Use the Classic theme (Note: Not only the script will use this theme, the whole interface of the program will switch to classic)</field>
    /// <field name='THEME_CURRENT' static='true' type='Number'>Use the current theme</field>
    /// <field name='THEME_DARK' static='true' type='Number'>Use the Dark theme (Note: Not only the script will use this theme, the whole interface of the program will switch to dark)</field>
    /// <field name='THEME_LIGHT' static='true' type='Number'>Use the Light theme (Note: Not only the script will use this theme, the whole interface of the program will switch to light)</field>
    /// <field name='TOP' static='true' type='Number'>Top resizing/positioning of window</field>
    /// <field name='USE_OLD_UI_JS' static='true' type='Number'>Use the original, pre v17, theme (default). (Note:The interface of the program will NOT switch to old)</field>
    /// <field name='YES' static='true' type='Number'>Show YES button</field>
}

Window.BottomBorder = function() {
    /// <signature>
    /// <summary>Returns the vertical position of the bottom border (in range 0-1). This can be used to help position windows on the screen.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Window.prototype.Delete = function() {
    /// <signature>
    /// <summary>Deletes the window from T/HIS and returns any memory/resources used for the window. This function should not normally need to be called. However, in exceptional circumstances if a script recreates windows many times T/HIS may run out of USER objects on Microsoft Windows because of the way T/HIS creates and shows windows. To avoid this problem this method can be used to force T/HIS to return the resources for a window. Do not use the Window object after calling this method.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Window.Error = function() {
    /// <signature>
    /// <summary>Show an error message in a window.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="error" type="String" optional="false">Error message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.</param>
    /// <param name="buttons" type="Number" optional="true">The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.GetDirectory = function() {
    /// <signature>
    /// <summary>Map the directory selector box native to your machine, allowing you to choose a directory. On Unix this will be a Motif selector. Windows will use the standard windows directory selector.</summary>
    /// <param name="initial" type="String" optional="true">Initial directory to start from.</param>
    /// <returns type="String"/>
    /// </signature>
}

Window.GetFile = function() {
    /// <signature>
    /// <summary>Map a file selector box allowing you to choose a file. See also Window.GetFiles() and Window.GetFilename().</summary>
    /// <param name="extension" type="String" optional="true">Extension to filter by.</param>
    /// <param name="save" type="Boolean" optional="true">If true the file selector is to be used for saving a file. If false (default) the file selector is for opening a file. Due to native operating system file selector differences, on linux new filenames can only be given when saving a file. On windows it is possible to give new filenames when opening or saving a file.</param>
    /// <param name="initial" type="String" optional="true">Initial directory to start from.</param>
    /// <returns type="String"/>
    /// </signature>
}

Window.GetFilename = function() {
    /// <signature>
    /// <summary>Map a window allowing you to input a filename (or select it using a file selector). OK and Cancel buttons are shown. See also Window.GetFile().</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="message" type="String" optional="false">Message to show in window.</param>
    /// <param name="extension" type="String" optional="true">Extension to filter by.</param>
    /// <param name="initial" type="String" optional="true">Initial value.</param>
    /// <param name="save" type="Boolean" optional="true">If true the file selector is to be used for saving a file. If false (default) the file selector is for opening a file. Due to native operating system file selector differences, on linux new filenames can only be given when saving a file. On windows it is possible to give new filenames when opening or saving a file.</param>
    /// <returns type="String"/>
    /// </signature>
}

Window.GetFiles = function() {
    /// <signature>
    /// <summary>Map a file selector box allowing you to choose multiple files. See also Window.GetFile() and Window.GetFilename().</summary>
    /// <param name="extension" type="String" optional="true">Extension to filter by.</param>
    /// <returns type="String"/>
    /// </signature>
}

Window.GetInteger = function() {
    /// <signature>
    /// <summary>Map a window allowing you to input an integer. OK and Cancel buttons are shown.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="message" type="String" optional="false">Message to show in window.</param>
    /// <param name="initial" type="Number" optional="true">Initial value.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.GetNumber = function() {
    /// <signature>
    /// <summary>Map a window allowing you to input a number. OK and Cancel buttons are shown.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="message" type="String" optional="false">Message to show in window.</param>
    /// <param name="initial" type="Number" optional="true">Initial value.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.GetString = function() {
    /// <signature>
    /// <summary>Map a window allowing you to input a string. OK and Cancel buttons are shown.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="message" type="String" optional="false">Message to show in window.</param>
    /// <param name="initial" type="String" optional="true">Initial value.</param>
    /// <returns type="String"/>
    /// </signature>
}

Window.prototype.Hide = function() {
    /// <signature>
    /// <summary>Hides (unmaps) the window.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Window.Information = function() {
    /// <signature>
    /// <summary>Show information in a window.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="info" type="String" optional="false">Information to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.</param>
    /// <param name="buttons" type="Number" optional="true">The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.MasterResolution = function() {
    /// <signature>
    /// <summary>Returns the resolution of the master programme window in pixels</summary>
    /// <returns type="Array" elementType="Number"/>
    /// </signature>
}

Window.Message = function() {
    /// <signature>
    /// <summary>Show a message in a window.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="message" type="String" optional="false">Message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.</param>
    /// <param name="buttons" type="Number" optional="true">The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.MiddleBorder = function() {
    /// <signature>
    /// <summary>Returns the vertical position of the middle border (in range 0-1). The middle border is the border between the tools/keywords window and the docked windows. This can be used to help position windows on the screen.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Window.Question = function() {
    /// <signature>
    /// <summary>Show a question in a window.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="question" type="String" optional="false">Question to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.</param>
    /// <param name="buttons" type="Number" optional="true">The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted Yes and No button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.prototype.Recompute = function() {
    /// <signature>
    /// <summary>Recomputes the positions of widgets in the window. If you have static widgets and 'normal' widgets in a window and you show and/or hide widgets the window needs to be recomputed to refresh the graphics, scroll bars etc. Calling this method will recompute and redraw the window.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Window.prototype.Redraw = function() {
    /// <signature>
    /// <summary>Redraws the window. Sometimes if you show, hide or draw graphics on widgets the window needs to be redrawn to refresh the graphics. Calling this method will redraw the window refreshing the graphics.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Window.RightBorder = function() {
    /// <signature>
    /// <summary>Returns the horizontal position of the right border (in range 0-1). This can be used to help position windows on the screen.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Window.prototype.Show = function() {
    /// <signature>
    /// <summary>Shows (maps) the window and waits for user input.</summary>
    /// <param name="modal" type="Boolean" optional="true">If this window is modal (true) then the user is blocked from doing anything else in T/HIS until this window is dismissed). If non-modal (false) then the user can still use other functions in T/HIS. If omitted the window will be modal. Note that making a window modal will stop interaction in all other windows and may prevent operations such as picking from working in any macros that are run from scripts.</param>
    /// <returns type="null"/>
    /// </signature>
}

Window.Theme = function() {
    /// <signature>
    /// <summary>Set or get a user interface theme.</summary>
    /// <param name="theme" type="Number" optional="true">If it is provided it is used to set the current theme. Can be either Window.USE_OLD_UI_JS, Window.THEME_CURRENT, Window.THEME_DARK, Window.THEME_LIGHT, Window.THEME_CLASSIC.</param>
    /// <returns type="Number"/>
    /// </signature>
}

Window.TopBorder = function() {
    /// <signature>
    /// <summary>Returns the vertical position of the top border (in range 0-1). This can be used to help position windows on the screen. This is no longer used in T/HIS and will always be 1 but is left for backwards compatibility.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

Window.UpdateGUI = function() {
    /// <signature>
    /// <summary>Force GUI to be updated. This function is not normally needed but if you are doing a computationally expensive operation and want to update the GUI it may be necessary as the GUI update requests are cached until there is spare time to update them. Calling this function forces any outstanding requests to be flushed.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Window.Warning = function() {
    /// <signature>
    /// <summary>Show a warning message in a window.</summary>
    /// <param name="title" type="String" optional="false">Title for window.</param>
    /// <param name="warning" type="String" optional="false">Warning message to show in window. The maximum number of lines that can be shown is controlled by the Options.max_window_lines option.</param>
    /// <param name="buttons" type="Number" optional="true">The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used. By default the window will be modal. If Window.NONMODAL is also given the window will be non-modal instead.</param>
    /// <returns type="Number"/>
    /// </signature>
}

var XMLParser = function() {
    /// <signature>
    /// <summary>Create a new XMLParser object for reading XML files.</summary>
    /// <returns type="XMLParser"/>
    /// </signature>
    /// <field name='characterDataHandler' static='false' type='function'>Function to call when character data is found. The function will be called with 1 argument which is a string containing the character data</field>
    /// <field name='commentHandler' static='false' type='function'>Function to call when a comment is found. The function will be called with 1 argument which is a string containing the text inside the comment</field>
    /// <field name='endCDATAHandler' static='false' type='function'>Function to call at the end of a CDATA section. The function does not have any arguments.</field>
    /// <field name='endElementHandler' static='false' type='function'>Function to call when an element end tag is found. The function will be called with 1 argument which is a string containing the name of the element</field>
    /// <field name='startCDATAHandler' static='false' type='function'>Function to call at the start of a CDATA section. The function does not have any arguments.</field>
    /// <field name='startElementHandler' static='false' type='function'>Function to call when an element start tag is found. The function will be called with 2 arguments. Argument 1 is a string containing the name of the element. Argument 2 is an object containing the element attributes</field>
}

XMLParser.prototype.Parse = function() {
    /// <signature>
    /// <summary>starts parsing an XML file</summary>
    /// <param name="filename" type="String" optional="false">XML file to parse</param>
    /// <returns type="null"/>
    /// </signature>
}

var global = function() {
}

AllocateFlag = function() {
    /// <signature>
    /// <summary>Allocate a flag for use in the script. See also ReturnFlag() and Once allocated the flag is automatically cleared for all entity types and all the curves currently in T/HIS.</summary>
    /// <returns type="Number"/>
    /// </signature>
}

ClearFlag = function() {
    /// <signature>
    /// <summary>Clears a flag on all curves and entity types.</summary>
    /// <param name="flag" type="Flag" optional="false">The flag to return.</param>
    /// <returns type="null"/>
    /// </signature>
}

DialogueInput = function() {
    /// <signature>
    /// <summary>Execute one or more lines of command line dialogue input.</summary>
    /// <param name="string_1, (string_2 ... string_n)" type="String" optional="false">The command(s) that are to be executed as if they had been typed into the dialogue box</param>
    /// <returns type="null"/>
    /// </signature>
}

DialogueInputNoEcho = function() {
    /// <signature>
    /// <summary>Execute one or more lines of command line dialogue input with no echo of commands to dialogue box.</summary>
    /// <param name="string_1, (string_2 ... string_n)" type="String" optional="false">The command(s) that are to be executed as if they had been typed into the dialogue box</param>
    /// <returns type="null"/>
    /// </signature>
}

DisableUpdate = function() {
    /// <signature>
    /// <summary>Temporarily disable the plotting of curves within graphs.</summary>
    /// <returns type="null"/>
    /// </signature>
}

EnableUpdate = function() {
    /// <signature>
    /// <summary>Re-enable the plotting of curves within graphs.</summary>
    /// <returns type="null"/>
    /// </signature>
}

ErrorMessage = function() {
    /// <signature>
    /// <summary>Print an error message to the dialogue box adding a carriage return.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to print</param>
    /// <returns type="null"/>
    /// </signature>
}

Execute = function() {
    /// <signature>
    /// <summary>Execute a program or script outside T/HIS and get the standard output and error streams.</summary>
    /// <param name="data" type="Object" optional="false">Execute data</param>
    /// <returns type="Object"/>
    /// </signature>
}

Exit = function() {
    /// <signature>
    /// <summary>Exit script</summary>
    /// <returns type="null"/>
    /// </signature>
}

GetCurrentDirectory = function() {
    /// <signature>
    /// <summary>Get the current working directory</summary>
    /// <returns type="String"/>
    /// </signature>
}

GetFtcfVar = function() {
    /// <signature>
    /// <summary>Get the value of a FAST-TCF variable</summary>
    /// <param name="name" type="String" optional="false">The FAST-TCF variable name (case independent)</param>
    /// <returns type="String"/>
    /// </signature>
}

GetInstallDirectory = function() {
    /// <signature>
    /// <summary>Get the directory in which executables are installed. This is the OA_INSTALL environment variable, or if that is not set the directory in which the current executable is installed. Returns NULL if not found</summary>
    /// <returns type="String"/>
    /// </signature>
}

GetPreferenceValue = function() {
    /// <signature>
    /// <summary>Get the Preference value with the given string in the any of admin ("OA_ADMIN") or install ("OA_INSTALL") or home ("OA_HOME") directory oa_pref</summary>
    /// <param name="program" type="String" optional="false">The program name string : Valid values are 'All', 'D3Plot', 'Primer', 'Reporter', 'Shell','T/His'</param>
    /// <param name="name" type="String" optional="false">The preference name string</param>
    /// <returns type="String"/>
    /// </signature>
}

GetStartInDirectory = function() {
    /// <signature>
    /// <summary>Get the directory passed to T/HIS by the -start_in command line argument</summary>
    /// <returns type="String"/>
    /// </signature>
}

Getenv = function() {
    /// <signature>
    /// <summary>Get the value of an environment variable</summary>
    /// <param name="name" type="String" optional="false">The environment variable name</param>
    /// <returns type="String"/>
    /// </signature>
}

Message = function() {
    /// <signature>
    /// <summary>Print a message to the dialogue box adding a carriage return.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to print. If '\r' is added to the end of the string then instead of automatically adding a carriage return in the dialogue box, the next message will overwrite the current one. This may be useful for giving feedback to the dialogue box when doing an operation.</param>
    /// <returns type="null"/>
    /// </signature>
}

MilliSleep = function() {
    /// <signature>
    /// <summary>Pause execution of the script for time milliseconds. See also Sleep()</summary>
    /// <param name="time" type="Number" optional="false">Number of milliseconds to pause for</param>
    /// <returns type="null"/>
    /// </signature>
}

NumberToString = function() {
    /// <signature>
    /// <summary>Formats a number to a string with the specified width.</summary>
    /// <param name="number" type="Number" optional="false">The number you want to format.</param>
    /// <param name="width" type="Number" optional="false">The width of the string you want to format it to (must be less than 80).</param>
    /// <param name="pref_int" type="Boolean" optional="true">By default only integer values inside the single precision 32 bit signed integer limit of approximately +/-2e9 are formatted as integers, all other numeric values are formatted as floats. With this argument set to TRUE then integer values up to the mantissa precision of a 64 bit float, approximately +/-9e15, will also be formatted as integers.</param>
    /// <returns type="String"/>
    /// </signature>
}

Plot = function() {
    /// <signature>
    /// <summary>Updates all the T/HIS graphs.</summary>
    /// <returns type="null"/>
    /// </signature>
}

Print = function() {
    /// <signature>
    /// <summary>Print a string to stdout. Note that a carriage return is not added.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to print</param>
    /// <returns type="null"/>
    /// </signature>
}

Println = function() {
    /// <signature>
    /// <summary>Print a string to stdout adding a carriage return.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to print</param>
    /// <returns type="null"/>
    /// </signature>
}

ReturnFlag = function() {
    /// <signature>
    /// <summary>Return a flag used in the script. See also AllocateFlag() and</summary>
    /// <param name="flag" type="Flag" optional="false">The flag to return.</param>
    /// <returns type="null"/>
    /// </signature>
}

SetCurrentDirectory = function() {
    /// <signature>
    /// <summary>Sets the current working directory.</summary>
    /// <param name="directory path" type="String" optional="false">Path to the directory you would like to change into.</param>
    /// <returns type="Boolean"/>
    /// </signature>
}

SetFtcfVar = function() {
    /// <signature>
    /// <summary>Set the value of a FAST-TCF variable. If the variable already exists then it's value is updated</summary>
    /// <param name="name" type="String" optional="false">The FAST-TCF variable name (case independent)</param>
    /// <returns type="String"/>
    /// </signature>
}

Sleep = function() {
    /// <signature>
    /// <summary>Pause execution of the script for time seconds. See also MilliSleep()</summary>
    /// <param name="time" type="Number" optional="false">Number of seconds to pause for</param>
    /// <returns type="null"/>
    /// </signature>
}

System = function() {
    /// <signature>
    /// <summary>Do a system command outside T/HIS. To run an external command and get the output then please use Execute() instead.</summary>
    /// <param name="string" type="String" optional="false">The system command that you want to do</param>
    /// <returns type="Number"/>
    /// </signature>
}

Unix = function() {
    /// <signature>
    /// <summary>Test whether script is running on a Unix/Linux operating system. See also Windows()</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

WarningMessage = function() {
    /// <signature>
    /// <summary>Print a warning message to the dialogue box adding a carriage return.</summary>
    /// <param name="string" type="String" optional="false">The string/item that you want to print</param>
    /// <returns type="null"/>
    /// </signature>
}

Windows = function() {
    /// <signature>
    /// <summary>Test whether script is running on a Windows operating system. See also Unix()</summary>
    /// <returns type="Boolean"/>
    /// </signature>
}

var Component = function() {
    /// <field name='GSTP' static='true' type='Number'>Time step</field>
    /// <field name='GKE' static='true' type='Number'>Kinetic energy</field>
    /// <field name='GIE' static='true' type='Number'>Internal energy</field>
    /// <field name='GSWE' static='true' type='Number'>Stonewall energy</field>
    /// <field name='GSPE' static='true' type='Number'>Spring and damper energy</field>
    /// <field name='GHG' static='true' type='Number'>Hourglass energy</field>
    /// <field name='GSDE' static='true' type='Number'>System damping energy</field>
    /// <field name='GJE' static='true' type='Number'>Joint internal energy</field>
    /// <field name='GSIE' static='true' type='Number'>Sliding interface energy</field>
    /// <field name='GEW' static='true' type='Number'>External work</field>
    /// <field name='GRBE' static='true' type='Number'>Rigid Body stopper energy</field>
    /// <field name='GTE' static='true' type='Number'>Total energy</field>
    /// <field name='GTER' static='true' type='Number'>Total/initial energy</field>
    /// <field name='GVX' static='true' type='Number'>Average X velocity</field>
    /// <field name='GVY' static='true' type='Number'>Average Y velocity</field>
    /// <field name='GVZ' static='true' type='Number'>Average Z velocity</field>
    /// <field name='GTZC' static='true' type='Number'>Time per zone cycle</field>
    /// <field name='GMASS' static='true' type='Number'>Total mass</field>
    /// <field name='GMADD' static='true' type='Number'>Added mass</field>
    /// <field name='GPM' static='true' type='Number'>%age Mass increase</field>
    /// <field name='GEKE' static='true' type='Number'>Eroded Kinetic energy</field>
    /// <field name='GEIE' static='true' type='Number'>Eroded Internal energy</field>
    /// <field name='GEHG' static='true' type='Number'>Eroded Hourglass energy</field>
    /// <field name='GER' static='true' type='Number'>Energy Ratio w/o Eroded</field>
    /// <field name='DRCE' static='true' type='Number'>Current Distortional KE</field>
    /// <field name='DRMX' static='true' type='Number'>Maximum Distortional KE</field>
    /// <field name='DRCO' static='true' type='Number'>Convergence Factor</field>
    /// <field name='DRKE' static='true' type='Number'>Total Kinetic energy</field>
    /// <field name='LKE' static='true' type='Number'>Lumped Kinetic energy</field>
    /// <field name='GMX' static='true' type='Number'>X momentum</field>
    /// <field name='GMY' static='true' type='Number'>Y momentum</field>
    /// <field name='GMZ' static='true' type='Number'>Z momentum</field>
    /// <field name='GAM' static='true' type='Number'>Added mass</field>
    /// <field name='TEMP' static='true' type='Number'>Temperature</field>
    /// <field name='DX' static='true' type='Number'>X Displacement</field>
    /// <field name='DY' static='true' type='Number'>Y Displacement</field>
    /// <field name='DZ' static='true' type='Number'>Z Displacement</field>
    /// <field name='DM' static='true' type='Number'>Displacement Magnitude</field>
    /// <field name='VX' static='true' type='Number'>X Velocity</field>
    /// <field name='VY' static='true' type='Number'>Y Velocity</field>
    /// <field name='VZ' static='true' type='Number'>Z Velocity</field>
    /// <field name='VM' static='true' type='Number'>Velocity Magnitude</field>
    /// <field name='AX' static='true' type='Number'>X Acceleration</field>
    /// <field name='AY' static='true' type='Number'>Y Acceleration</field>
    /// <field name='AZ' static='true' type='Number'>Z Acceleration</field>
    /// <field name='AM' static='true' type='Number'>Acceleration Magnitude</field>
    /// <field name='CX' static='true' type='Number'>X co-ordinate</field>
    /// <field name='CY' static='true' type='Number'>Y co-ordinate</field>
    /// <field name='CZ' static='true' type='Number'>Z co-ordinate</field>
    /// <field name='CV' static='true' type='Number'>Current Vector</field>
    /// <field name='BX' static='true' type='Number'>Basic X co-ordinate</field>
    /// <field name='BY' static='true' type='Number'>Basic Y co-ordinate</field>
    /// <field name='BZ' static='true' type='Number'>Basic Z co-ordinate</field>
    /// <field name='BV' static='true' type='Number'>Basic Vector</field>
    /// <field name='RDX' static='true' type='Number'>X rotation</field>
    /// <field name='RDY' static='true' type='Number'>Y rotation</field>
    /// <field name='RDZ' static='true' type='Number'>Z rotation</field>
    /// <field name='RDM' static='true' type='Number'>Rotation Magnitude</field>
    /// <field name='RVX' static='true' type='Number'>X rotational velocity</field>
    /// <field name='RVY' static='true' type='Number'>Y rotational velocity</field>
    /// <field name='RVZ' static='true' type='Number'>Z rotational velocity</field>
    /// <field name='RVM' static='true' type='Number'>Rotation Vel Magnitude</field>
    /// <field name='RAX' static='true' type='Number'>X rotational acceleration</field>
    /// <field name='RAY' static='true' type='Number'>Y rotational acceleration</field>
    /// <field name='RAZ' static='true' type='Number'>Z rotational acceleration</field>
    /// <field name='RAM' static='true' type='Number'>Rotation Accel Magnitude</field>
    /// <field name='TFX' static='true' type='Number'>X Thermal Flux</field>
    /// <field name='TFY' static='true' type='Number'>Y Thermal Flux</field>
    /// <field name='TFZ' static='true' type='Number'>Z Thermal Flux</field>
    /// <field name='TFM' static='true' type='Number'>Thermal Flux Magnitude</field>
    /// <field name='TTOP' static='true' type='Number'>Top Temperature</field>
    /// <field name='TBOT' static='true' type='Number'>Bottom Temperature</field>
    /// <field name='SXX' static='true' type='Number'>Stress in XX</field>
    /// <field name='SYY' static='true' type='Number'>Stress in YY</field>
    /// <field name='SZZ' static='true' type='Number'>Stress in ZZ</field>
    /// <field name='SXY' static='true' type='Number'>Stress in XY</field>
    /// <field name='SYZ' static='true' type='Number'>Stress in YZ</field>
    /// <field name='SZX' static='true' type='Number'>Stress in ZX</field>
    /// <field name='SMAX' static='true' type='Number'>MAX principal stress</field>
    /// <field name='SMIN' static='true' type='Number'>MIN principal stress</field>
    /// <field name='SMS' static='true' type='Number'>MAX shear stress</field>
    /// <field name='SVON' static='true' type='Number'>von Mises stress</field>
    /// <field name='SAV' static='true' type='Number'>Average stress (Pressure)</field>
    /// <field name='STR' static='true' type='Number'>Triaxiality Factor</field>
    /// <field name='EPL' static='true' type='Number'>Effective plastic strain</field>
    /// <field name='EXX' static='true' type='Number'>Strain in XX</field>
    /// <field name='EYY' static='true' type='Number'>Strain in YY</field>
    /// <field name='EZZ' static='true' type='Number'>Strain in ZZ</field>
    /// <field name='EXY' static='true' type='Number'>Strain in XY</field>
    /// <field name='EYZ' static='true' type='Number'>Strain in YZ</field>
    /// <field name='EZX' static='true' type='Number'>Strain in ZX</field>
    /// <field name='EMAX' static='true' type='Number'>MAX principal strain</field>
    /// <field name='EMIN' static='true' type='Number'>MIN principal strain</field>
    /// <field name='EMS' static='true' type='Number'>MAX shear strain</field>
    /// <field name='EVON' static='true' type='Number'>von Mises strain</field>
    /// <field name='EAV' static='true' type='Number'>Average strain</field>
    /// <field name='PEMAG' static='true' type='Number'>Plastic Strain Magnitude</field>
    /// <field name='SOX' static='true' type='Number'>Extra data</field>
    /// <field name='BFX' static='true' type='Number'>Axial force</field>
    /// <field name='BFY' static='true' type='Number'>Shear force in Y</field>
    /// <field name='BFZ' static='true' type='Number'>Shear force in Z</field>
    /// <field name='BMXX' static='true' type='Number'>Torsional moment</field>
    /// <field name='BMYY' static='true' type='Number'>Moment in Y</field>
    /// <field name='BMZZ' static='true' type='Number'>Moment in Z</field>
    /// <field name='BSAX' static='true' type='Number'>Axial strain</field>
    /// <field name='BPE1' static='true' type='Number'>Bending energy: end 1</field>
    /// <field name='BPE2' static='true' type='Number'>Bending energy: end 2</field>
    /// <field name='BRY1' static='true' type='Number'>Y rotation: end 1</field>
    /// <field name='BRY2' static='true' type='Number'>Y rotation: end 2</field>
    /// <field name='BRZ1' static='true' type='Number'>Z rotation: end 1</field>
    /// <field name='BRZ2' static='true' type='Number'>Z rotation: end 2</field>
    /// <field name='BRXX' static='true' type='Number'>Torsional rotation</field>
    /// <field name='BMY1' static='true' type='Number'>Y Bending moment: end 1</field>
    /// <field name='BMY2' static='true' type='Number'>Y Bending moment: end 2</field>
    /// <field name='BMZ1' static='true' type='Number'>Z Bending moment: end 1</field>
    /// <field name='BMZ2' static='true' type='Number'>Z Bending moment: end 2</field>
    /// <field name='BACE' static='true' type='Number'>Axial collapse energy</field>
    /// <field name='BIE' static='true' type='Number'>Internal energy</field>
    /// <field name='BSXX' static='true' type='Number'>Axial stress</field>
    /// <field name='BSXY' static='true' type='Number'>XY Shear stress</field>
    /// <field name='BSZX' static='true' type='Number'>ZX Shear stress</field>
    /// <field name='BEP' static='true' type='Number'>Effective plastic strain</field>
    /// <field name='BEAX' static='true' type='Number'>Axial strain</field>
    /// <field name='BDX' static='true' type='Number'>Axial displacement</field>
    /// <field name='BDY' static='true' type='Number'>Displacement in Y</field>
    /// <field name='BDZ' static='true' type='Number'>Displacement in Z</field>
    /// <field name='BRY' static='true' type='Number'>Rotation in Y</field>
    /// <field name='BRZ' static='true' type='Number'>Rotation in Z</field>
    /// <field name='BEX' static='true' type='Number'>Extra data</field>
    /// <field name='EPS' static='true' type='Number'>Effective plastic strain</field>
    /// <field name='RMX' static='true' type='Number'>Moment in X</field>
    /// <field name='RMY' static='true' type='Number'>Moment in Y</field>
    /// <field name='RMXY' static='true' type='Number'>Moment in XY</field>
    /// <field name='RQX' static='true' type='Number'>Shear force in X</field>
    /// <field name='RQY' static='true' type='Number'>Shear force in Y</field>
    /// <field name='RFX' static='true' type='Number'>Normal force in X</field>
    /// <field name='RFY' static='true' type='Number'>Normal force in Y</field>
    /// <field name='RFXY' static='true' type='Number'>Normal force in XY</field>
    /// <field name='THK' static='true' type='Number'>Thickness</field>
    /// <field name='EDEN' static='true' type='Number'>Internal energy density</field>
    /// <field name='SHX' static='true' type='Number'>Extra data</field>
    /// <field name='FN' static='true' type='Number'>Normal force</field>
    /// <field name='FX' static='true' type='Number'>Global X force</field>
    /// <field name='FY' static='true' type='Number'>Global Y force</field>
    /// <field name='FZ' static='true' type='Number'>Global Z force</field>
    /// <field name='EN' static='true' type='Number'>Energy</field>
    /// <field name='SP_F' static='true' type='Number'>Resultant Force</field>
    /// <field name='SP_E' static='true' type='Number'>Elongation</field>
    /// <field name='SP_FE' static='true' type='Number'>Res Force v Elongation</field>
    /// <field name='SP_FX' static='true' type='Number'>Global X force</field>
    /// <field name='SP_FY' static='true' type='Number'>Global Y force</field>
    /// <field name='SP_FZ' static='true' type='Number'>Global Z force</field>
    /// <field name='SP_EN' static='true' type='Number'>Energy</field>
    /// <field name='SP_M' static='true' type='Number'>Resultant Moment</field>
    /// <field name='SP_R' static='true' type='Number'>Rotation</field>
    /// <field name='SP_MR' static='true' type='Number'>Res Moment v Rotation</field>
    /// <field name='SP_MX' static='true' type='Number'>Moment in X</field>
    /// <field name='SP_MY' static='true' type='Number'>Moment in Y</field>
    /// <field name='SP_MZ' static='true' type='Number'>Moment in Z</field>
    /// <field name='SB_F' static='true' type='Number'>Force</field>
    /// <field name='SB_S' static='true' type='Number'>Strain</field>
    /// <field name='SB_FS' static='true' type='Number'>Force v Strain</field>
    /// <field name='SB_L' static='true' type='Number'>Current Length</field>
    /// <field name='RT_F' static='true' type='Number'>Force</field>
    /// <field name='RT_P' static='true' type='Number'>Pullout</field>
    /// <field name='RT_FP' static='true' type='Number'>Force v Pullout</field>
    /// <field name='SR_P' static='true' type='Number'>Pull through</field>
    /// <field name='PR_FI' static='true' type='Number'>'Fired' (= 1)</field>
    /// <field name='CFX' static='true' type='Number'>Master X force</field>
    /// <field name='CFY' static='true' type='Number'>Master Y force</field>
    /// <field name='CFZ' static='true' type='Number'>Master Z force</field>
    /// <field name='CFM' static='true' type='Number'>Master Force Mag</field>
    /// <field name='CFXS' static='true' type='Number'>Slave X force</field>
    /// <field name='CFYS' static='true' type='Number'>Slave Y force</field>
    /// <field name='CFZS' static='true' type='Number'>Slave Z force</field>
    /// <field name='CFMS' static='true' type='Number'>Slave Force Mag</field>
    /// <field name='CMX' static='true' type='Number'>Master X moment</field>
    /// <field name='CMY' static='true' type='Number'>Master Y moment</field>
    /// <field name='CMZ' static='true' type='Number'>Master Z moment</field>
    /// <field name='CMXS' static='true' type='Number'>Slave X moment</field>
    /// <field name='CMYS' static='true' type='Number'>Slave Y moment</field>
    /// <field name='CMZS' static='true' type='Number'>Slave Z moment</field>
    /// <field name='CMM' static='true' type='Number'>Master Mass</field>
    /// <field name='CMS' static='true' type='Number'>Slave Mass</field>
    /// <field name='CENS' static='true' type='Number'>Slave side energy</field>
    /// <field name='CENM' static='true' type='Number'>Master side energy</field>
    /// <field name='CFRI' static='true' type='Number'>Frictional energy</field>
    /// <field name='CTEN' static='true' type='Number'>Total energy</field>
    /// <field name='RFZ' static='true' type='Number'>Z force</field>
    /// <field name='RFM' static='true' type='Number'>Force Magnitude</field>
    /// <field name='LFX' static='true' type='Number'>Local X force</field>
    /// <field name='LFY' static='true' type='Number'>Local Y force</field>
    /// <field name='LFZ' static='true' type='Number'>Local Z force</field>
    /// <field name='GRFX' static='true' type='Number'>X force</field>
    /// <field name='GRFY' static='true' type='Number'>Y force</field>
    /// <field name='GRFZ' static='true' type='Number'>Z force</field>
    /// <field name='GRFM' static='true' type='Number'>Force Magnitude</field>
    /// <field name='GEN' static='true' type='Number'>Energy</field>
    /// <field name='PR' static='true' type='Number'>Pressure</field>
    /// <field name='VOL' static='true' type='Number'>Volume</field>
    /// <field name='DE' static='true' type='Number'>Density</field>
    /// <field name='IE' static='true' type='Number'>Internal energy</field>
    /// <field name='IN' static='true' type='Number'>Mass flow rate in</field>
    /// <field name='OU' static='true' type='Number'>Mass flow rate out</field>
    /// <field name='MASS' static='true' type='Number'>Total mass</field>
    /// <field name='SA' static='true' type='Number'>Surface area</field>
    /// <field name='FR' static='true' type='Number'>Reaction force</field>
    /// <field name='TKE' static='true' type='Number'>Translational KE</field>
    /// <field name='IFE' static='true' type='Number'>Inflator Energy</field>
    /// <field name='DMP' static='true' type='Number'>Damping Energy</field>
    /// <field name='PP' static='true' type='Number'>Ave Particle Pressure</field>
    /// <field name='MAF' static='true' type='Number'>Mass flow rate via fabric</field>
    /// <field name='MAV' static='true' type='Number'>Mass flow rate via vent</field>
    /// <field name='AR' static='true' type='Number'>Total area</field>
    /// <field name='PRP' static='true' type='Number'>+ve Pressure</field>
    /// <field name='PRN' static='true' type='Number'>-ve Pressure</field>
    /// <field name='HCE' static='true' type='Number'>Heat Convection Energy</field>
    /// <field name='EV' static='true' type='Number'>Enhanced Vent Flag</field>
    /// <field name='LE' static='true' type='Number'>Leak Energy</field>
    /// <field name='GAS' static='true' type='Number'>Gas Flow rate</field>
    /// <field name='PVO' static='true' type='Number'>Por Volume</field>
    /// <field name='PTE' static='true' type='Number'>Part Temperature</field>
    /// <field name='UN' static='true' type='Number'>Unblocked Area</field>
    /// <field name='BA' static='true' type='Number'>Blocked Area</field>
    /// <field name='LK' static='true' type='Number'>Leakage</field>
    /// <field name='TRE' static='true' type='Number'>Translational Energy</field>
    /// <field name='NP' static='true' type='Number'>Num Particles</field>
    /// <field name='X' static='true' type='Number'>X co-ordinate</field>
    /// <field name='Y' static='true' type='Number'>Y co-ordinate</field>
    /// <field name='Z' static='true' type='Number'>Z co-ordinate</field>
    /// <field name='FM' static='true' type='Number'>Force Magnitude</field>
    /// <field name='MX' static='true' type='Number'>Moment in X</field>
    /// <field name='MY' static='true' type='Number'>Moment in Y</field>
    /// <field name='MZ' static='true' type='Number'>Moment in Z</field>
    /// <field name='MM' static='true' type='Number'>Moment Magnitude</field>
    /// <field name='PHA' static='true' type='Number'>Phi angle</field>
    /// <field name='PHDT' static='true' type='Number'>d(Phi)/dt</field>
    /// <field name='PHS' static='true' type='Number'>Phi stiffness moment</field>
    /// <field name='PHD' static='true' type='Number'>Phi damping moment</field>
    /// <field name='PHT' static='true' type='Number'>Phi total moment</field>
    /// <field name='THA' static='true' type='Number'>Theta angle</field>
    /// <field name='THDT' static='true' type='Number'>d(Theta)/dt</field>
    /// <field name='THS' static='true' type='Number'>Theta stiffness moment</field>
    /// <field name='THD' static='true' type='Number'>Theta damping moment</field>
    /// <field name='THT' static='true' type='Number'>Theta total moment</field>
    /// <field name='PSA' static='true' type='Number'>Psi angle</field>
    /// <field name='PSDT' static='true' type='Number'>d(Psi)/dt</field>
    /// <field name='PSS' static='true' type='Number'>Psi stiffness moment</field>
    /// <field name='PSD' static='true' type='Number'>Psi damping moment</field>
    /// <field name='PST' static='true' type='Number'>Psi total moment</field>
    /// <field name='AA' static='true' type='Number'>Alpha angle</field>
    /// <field name='ADT' static='true' type='Number'>d(Alpha)/dt</field>
    /// <field name='ALS' static='true' type='Number'>Alpha stiffness moment</field>
    /// <field name='ALD' static='true' type='Number'>Alpha damping moment</field>
    /// <field name='ALT' static='true' type='Number'>Alpha total moment</field>
    /// <field name='BDT' static='true' type='Number'>d(Beta)/dt</field>
    /// <field name='BES' static='true' type='Number'>Beta stiffness moment</field>
    /// <field name='BED' static='true' type='Number'>Beta damping moment</field>
    /// <field name='BET' static='true' type='Number'>Beta total moment</field>
    /// <field name='GA' static='true' type='Number'>Gamma angle</field>
    /// <field name='GDT' static='true' type='Number'>d(Gamma)/dt</field>
    /// <field name='GSF' static='true' type='Number'>Gamma scale factor</field>
    /// <field name='DXDT' static='true' type='Number'>d(X)/dt</field>
    /// <field name='DYDT' static='true' type='Number'>d(Y)/dt</field>
    /// <field name='DZDT' static='true' type='Number'>d(Z)/dt</field>
    /// <field name='SFX' static='true' type='Number'>X stiffness force</field>
    /// <field name='SFY' static='true' type='Number'>Y stiffness force</field>
    /// <field name='SFZ' static='true' type='Number'>Z stiffness force</field>
    /// <field name='DFX' static='true' type='Number'>X damping force</field>
    /// <field name='DFY' static='true' type='Number'>Y damping force</field>
    /// <field name='DFZ' static='true' type='Number'>Z damping force</field>
    /// <field name='XSEC_FX' static='true' type='Number'>X force</field>
    /// <field name='XSEC_FY' static='true' type='Number'>Y force</field>
    /// <field name='XSEC_FZ' static='true' type='Number'>Z force</field>
    /// <field name='XSEC_FM' static='true' type='Number'>Force Magnitude</field>
    /// <field name='XSEC_MX' static='true' type='Number'>Moment in X</field>
    /// <field name='XSEC_MY' static='true' type='Number'>Moment in Y</field>
    /// <field name='XSEC_MZ' static='true' type='Number'>Moment in Z</field>
    /// <field name='XSEC_MM' static='true' type='Number'>Moment Magnitude</field>
    /// <field name='XSEC_CX' static='true' type='Number'>X centroid coord</field>
    /// <field name='XSEC_CY' static='true' type='Number'>Y centroid coord</field>
    /// <field name='XSEC_CZ' static='true' type='Number'>Z centroid coord</field>
    /// <field name='XSEC_A' static='true' type='Number'>Area of section</field>
    /// <field name='GKR' static='true' type='Number'>Kinetic Energy Ratio</field>
    /// <field name='GIR' static='true' type='Number'>Internal Energy Ratio</field>
    /// <field name='D11' static='true' type='Number'>Direction Cosine 11</field>
    /// <field name='D12' static='true' type='Number'>Direction Cosine 12</field>
    /// <field name='D13' static='true' type='Number'>Direction Cosine 13</field>
    /// <field name='D21' static='true' type='Number'>Direction Cosine 21</field>
    /// <field name='D22' static='true' type='Number'>Direction Cosine 22</field>
    /// <field name='D23' static='true' type='Number'>Direction Cosine 23</field>
    /// <field name='D31' static='true' type='Number'>Direction Cosine 31</field>
    /// <field name='D32' static='true' type='Number'>Direction Cosine 32</field>
    /// <field name='D33' static='true' type='Number'>Direction Cosine 33</field>
    /// <field name='LDX' static='true' type='Number'>Local X Displacement</field>
    /// <field name='LDY' static='true' type='Number'>Local Y Displacement</field>
    /// <field name='LDZ' static='true' type='Number'>Local Z Displacement</field>
    /// <field name='LVX' static='true' type='Number'>Local X Velocity</field>
    /// <field name='LVY' static='true' type='Number'>Local Y Velocity</field>
    /// <field name='LVZ' static='true' type='Number'>Local Z Velocity</field>
    /// <field name='LAX' static='true' type='Number'>Local X Acceleration</field>
    /// <field name='LAY' static='true' type='Number'>Local Y Acceleration</field>
    /// <field name='LAZ' static='true' type='Number'>Local Z Acceleration</field>
    /// <field name='LRDX' static='true' type='Number'>Local X rotation</field>
    /// <field name='LRDY' static='true' type='Number'>Local Y rotation</field>
    /// <field name='LRDZ' static='true' type='Number'>Local Z rotation</field>
    /// <field name='LRVX' static='true' type='Number'>Local X rotational vel</field>
    /// <field name='LRVY' static='true' type='Number'>Local Y rotational vel</field>
    /// <field name='LRVZ' static='true' type='Number'>Local Z rotational vel</field>
    /// <field name='LRAX' static='true' type='Number'>Local X rotational accel</field>
    /// <field name='LRAY' static='true' type='Number'>Local Y rotational accel</field>
    /// <field name='LRAZ' static='true' type='Number'>Local Z rotational accel</field>
    /// <field name='SW_F' static='true' type='Number'>Axial force</field>
    /// <field name='SW_S' static='true' type='Number'>Shear force</field>
    /// <field name='SW_FAIL' static='true' type='Number'>Failure</field>
    /// <field name='SW_MF' static='true' type='Number'>Maximum Failure</field>
    /// <field name='SW_LE' static='true' type='Number'>Length</field>
    /// <field name='SW_TIME' static='true' type='Number'>Failure Time</field>
    /// <field name='SW_MM' static='true' type='Number'>Moment Magnitude</field>
    /// <field name='SW_TO' static='true' type='Number'>Torsion</field>
    /// <field name='SW_FF' static='true' type='Number'>DC Failure Function</field>
    /// <field name='SW_NF' static='true' type='Number'>Normal Failure</field>
    /// <field name='SW_SF' static='true' type='Number'>Shear Failure</field>
    /// <field name='SW_BF' static='true' type='Number'>Bending Failure</field>
    /// <field name='SW_AREA' static='true' type='Number'>Spotweld Area</field>
    /// <field name='SPC_FX' static='true' type='Number'>X Force</field>
    /// <field name='SPC_FY' static='true' type='Number'>Y Force</field>
    /// <field name='SPC_FZ' static='true' type='Number'>Z Force</field>
    /// <field name='SPC_FM' static='true' type='Number'>Force Magnitude</field>
    /// <field name='SPC_MX' static='true' type='Number'>Moment in X</field>
    /// <field name='SPC_MY' static='true' type='Number'>Moment in Y</field>
    /// <field name='SPC_MZ' static='true' type='Number'>Moment in Z</field>
    /// <field name='SPC_MM' static='true' type='Number'>Moment Magnitude</field>
    /// <field name='SPC_XTF' static='true' type='Number'>X Total Set Force</field>
    /// <field name='SPC_YTF' static='true' type='Number'>Y Total Set Force</field>
    /// <field name='SPC_ZTF' static='true' type='Number'>Z Total Set Force</field>
    /// <field name='SPC_RF' static='true' type='Number'>Resultant Set Force</field>
    /// <field name='SPC_XMF' static='true' type='Number'>X Total Model Force</field>
    /// <field name='SPC_YMF' static='true' type='Number'>Y Total Model Force</field>
    /// <field name='SPC_ZMF' static='true' type='Number'>Z Total Model Force</field>
    /// <field name='SPC_RMF' static='true' type='Number'>Resultant Model Force</field>
    /// <field name='MP' static='true' type='Number'>Mass (Porous+Vent)</field>
    /// <field name='ML' static='true' type='Number'>Mass (Leakage)</field>
    /// <field name='LFM' static='true' type='Number'>Leakage Force Magnitude</field>
    /// <field name='TC' static='true' type='Number'>Temperature Change</field>
    /// <field name='SO' static='true' type='Number'>Cpld Solid ID</field>
    /// <field name='EFS' static='true' type='Number'>Effective Stress</field>
    /// <field name='SM' static='true' type='Number'>Smoothing Length</field>
    /// <field name='ERXX' static='true' type='Number'>Strain in XX</field>
    /// <field name='ERYY' static='true' type='Number'>Strain in YY</field>
    /// <field name='ERZZ' static='true' type='Number'>Strain in ZZ</field>
    /// <field name='ERXY' static='true' type='Number'>Strain in XY</field>
    /// <field name='ERYZ' static='true' type='Number'>Strain in YZ</field>
    /// <field name='ERZX' static='true' type='Number'>Strain in ZX</field>
    /// <field name='RV' static='true' type='Number'>Relative Volume</field>
    /// <field name='AC' static='true' type='Number'>Active</field>
    /// <field name='PL_FT' static='true' type='Number'>Force</field>
    /// <field name='PL_SL' static='true' type='Number'>Slip</field>
    /// <field name='PL_SR' static='true' type='Number'>Slip Rate</field>
    /// <field name='PL_AN' static='true' type='Number'>Wrap Angle</field>
    /// <field name='FPX' static='true' type='Number'>X Pressure Drag</field>
    /// <field name='FPY' static='true' type='Number'>Y Pressure Drag</field>
    /// <field name='FPZ' static='true' type='Number'>Z Pressure Drag</field>
    /// <field name='FPM' static='true' type='Number'>Pressure Drag Magnitude</field>
    /// <field name='FVX' static='true' type='Number'>X Viscous Drag</field>
    /// <field name='FVY' static='true' type='Number'>Y Viscous Drag</field>
    /// <field name='FVZ' static='true' type='Number'>Z Viscous Drag</field>
    /// <field name='FVM' static='true' type='Number'>Viscous Drag Magnitude</field>
    /// <field name='MPX' static='true' type='Number'>MX Pressure Drag</field>
    /// <field name='MPY' static='true' type='Number'>MY Pressure Drag</field>
    /// <field name='MPZ' static='true' type='Number'>MZ Pressure Drag</field>
    /// <field name='MPM' static='true' type='Number'>Pressure Drag Magnitude</field>
    /// <field name='MVX' static='true' type='Number'>MX Viscous Drag</field>
    /// <field name='MVY' static='true' type='Number'>MY Viscous Drag</field>
    /// <field name='MVZ' static='true' type='Number'>MZ Viscous Drag</field>
    /// <field name='MVM' static='true' type='Number'>Viscous Drag Magnitude</field>
    /// <field name='AVX' static='true' type='Number'>X AVelocity</field>
    /// <field name='AVY' static='true' type='Number'>Y AVelocity</field>
    /// <field name='AVZ' static='true' type='Number'>Z AVelocity</field>
    /// <field name='AVM' static='true' type='Number'>AVelocity Magnitude</field>
    /// <field name='PA' static='true' type='Number'>Average Pressure</field>
    /// <field name='VTX' static='true' type='Number'>X Vorticity</field>
    /// <field name='VTY' static='true' type='Number'>Y Vorticity</field>
    /// <field name='VTZ' static='true' type='Number'>Z Vorticity</field>
    /// <field name='VTM' static='true' type='Number'>Vorticity Magnitude</field>
    /// <field name='QC' static='true' type='Number'>Q Criterion</field>
    /// <field name='VC' static='true' type='Number'>Viscosity</field>
    /// <field name='VT' static='true' type='Number'>Viscous Turbulence</field>
    /// <field name='LS' static='true' type='Number'>Level Set Function</field>
    /// <field name='A' static='true' type='Number'>Alpha</field>
    /// <field name='TAA' static='true' type='Number'>Temp Area Average</field>
    /// <field name='TSA' static='true' type='Number'>Temp Sum Average</field>
    /// <field name='TEH' static='true' type='Number'>Average Heat Flux</field>
    /// <field name='HTC' static='true' type='Number'>Heat Transfer Coeff</field>
    /// <field name='ECX' static='true' type='Number'>X Current</field>
    /// <field name='ECY' static='true' type='Number'>Y Current</field>
    /// <field name='ECZ' static='true' type='Number'>Z Current</field>
    /// <field name='ECM' static='true' type='Number'>Current Magnitude</field>
    /// <field name='BFDX' static='true' type='Number'>X BField</field>
    /// <field name='BFDY' static='true' type='Number'>Y BField</field>
    /// <field name='BFDZ' static='true' type='Number'>Z BField</field>
    /// <field name='BFDM' static='true' type='Number'>BField Magnitude</field>
    /// <field name='AFX' static='true' type='Number'>X AField</field>
    /// <field name='AFY' static='true' type='Number'>Y AField</field>
    /// <field name='AFZ' static='true' type='Number'>Z AField</field>
    /// <field name='AFM' static='true' type='Number'>AField Magnitude</field>
    /// <field name='S' static='true' type='Number'>Sigma</field>
    /// <field name='MUR' static='true' type='Number'>Relative Permeability</field>
    /// <field name='JHR' static='true' type='Number'>Joule Heating Rate</field>
    /// <field name='LOFX' static='true' type='Number'>X Lorentz Force</field>
    /// <field name='LOFY' static='true' type='Number'>Y Lorentz Force</field>
    /// <field name='LOFZ' static='true' type='Number'>Z Lorentz Force</field>
    /// <field name='LOFM' static='true' type='Number'>Lorentz Force Magnitude</field>
    /// <field name='EFX' static='true' type='Number'>X EField</field>
    /// <field name='EFY' static='true' type='Number'>Y EField</field>
    /// <field name='EFZ' static='true' type='Number'>Z EField</field>
    /// <field name='EFM' static='true' type='Number'>EField Magnitude</field>
    /// <field name='AIE' static='true' type='Number'>Air Internal Energy</field>
    /// <field name='DPIE' static='true' type='Number'>Detn Product IE</field>
    /// <field name='OIE' static='true' type='Number'>Outside Domain IE</field>
    /// <field name='ATE' static='true' type='Number'>Air Translational E</field>
    /// <field name='DPTE' static='true' type='Number'>Detn Product Trans E</field>
    /// <field name='OTE' static='true' type='Number'>Outside Domain Trans E</field>
    /// <field name='APR' static='true' type='Number'>Air Pressure</field>
    /// <field name='DPPR' static='true' type='Number'>Detn Product Pressure</field>
    /// <field name='RPR' static='true' type='Number'>Resultant Pressure</field>
    /// <field name='DPFX' static='true' type='Number'>Detn Product X Force</field>
    /// <field name='DPFY' static='true' type='Number'>Detn Product Y Force</field>
    /// <field name='DPFZ' static='true' type='Number'>Detn Product Z Force</field>
    /// <field name='VEL' static='true' type='Number'>Velocity</field>
    /// <field name='LMX' static='true' type='Number'>Local X Moment</field>
    /// <field name='LMY' static='true' type='Number'>Local Y Moment</field>
    /// <field name='LMZ' static='true' type='Number'>Local Z Moment</field>
    /// <field name='COUT' static='true' type='Number'>             CURVOUT</field>
}
