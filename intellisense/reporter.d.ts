declare class Colour {
/**
 * Creates a black colour
 */
    static Black(): Colour;

/**
 * Creates a blue colour
 */
    static Blue(): Colour;

/**
 * Creates a cyan colour
 */
    static Cyan(): Colour;

/**
 * Creates a green colour
 */
    static Green(): Colour;

/**
 * Creates a 10% grey colour
 */
    static Grey10(): Colour;

/**
 * Creates a 20% grey colour
 */
    static Grey20(): Colour;

/**
 * Creates a 30% grey colour
 */
    static Grey30(): Colour;

/**
 * Creates a 40% grey colour
 */
    static Grey40(): Colour;

/**
 * Creates a 50% grey colour
 */
    static Grey50(): Colour;

/**
 * Creates a 60% grey colour
 */
    static Grey60(): Colour;

/**
 * Creates a 70% grey colour
 */
    static Grey70(): Colour;

/**
 * Creates a 80% grey colour
 */
    static Grey80(): Colour;

/**
 * Creates a 90% grey colour
 */
    static Grey90(): Colour;

/**
 * Creates a magenta colour
 */
    static Magenta(): Colour;

/**
 * No colour
 */
    static None(): Colour;

/**
 * Creates a colour from red, green and blue components
 * @param red red component of colour (0-255).
 * @param green green component of colour (0-255).
 * @param blue blue component of colour (0-255).
 */
    static RGB(red: number, green: number, blue: number): Colour;

/**
 * Creates a red colour
 */
    static Red(): Colour;

/**
 * Creates a white colour
 */
    static White(): Colour;

/**
 * Creates a yellow colour
 */
    static Yellow(): Colour;

/** Colour blue component (0-255) */
    readonly blue: number;
/** Colour green component (0-255) */
    readonly green: number;
/** Colour name */
    readonly name: string;
/** Colour red component (0-255) */
    readonly red: number;
}

declare class File {
/**
 * Close a file opened by a File object.
 */
    Close(): void;

/**
 * Convert directory separators to the correct type for this operating system
 * @param filename Filename you want to convert separators on.
 */
    static ConvertSeparators(filename: string): string;

/**
 * Copy a file
 * @param source Source filename you want to copy.
 * @param dest Destination filename you want to copy source file to. Note that if a file with the name dest already exists it will not be overwritten. Delete the file first with File.Delete().
 */
    static Copy(source: string, dest: string): boolean;

/**
 * Delete a file
 * @param filename Filename you want to delete.
 */
    static Delete(filename: string): boolean;

/**
 * Extract directory name from an absolute filename
 * @param filename Absolute filename you want to extract directory from.
 */
    static Directory(filename: string): string;

/**
 * Check if a file exists
 * @param filename Filename you want to check for existance.
 */
    static Exists(filename: string): boolean;

/**
 * Find any files in a directory (and subdirectories if required) matching a pattern
 * @param directory Directory to look for files in
 * @param pattern Pattern to use to find matching files
 * @param recursive If Reporter should look for files recursively or not
 */
    static FindFiles(directory: string, pattern: string, recursive: boolean): string[];

/**
 * Reads a line from a file which contains contain, opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 256 characters is used. If you expect a file to have lines longer than 256 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must contain that string. If more than one argument is used then lines which contain argument1 OR argument2 OR argument3 will be returned
 * @param contain1 String which matching lines must contain (maximum length of 256 characters).
 * @param contain2 alternative string which matching lines must contain (maximum length of 256 characters).
 * @param contain3 alternative string which matching lines must contain (maximum length of 256 characters).
 * @param ...vars_containn alternative string which matching lines must contain (maximum length of 256 characters).
 */
    FindLineContaining(contain1: string, contain2?: string, contain3?: string, ...vars_containn?: string[]): string;

/**
 * Reads a line from a file opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 256 characters is used. If you expect a file to have lines longer than 256 characters then use ReadLongLine which allows lines of any length. Note that this may be much slower than FindLineStarting or FindLineContaining, especially if the regular expression is very complicated.
 * @param regex Regular expression which matching lines must match with.
 */
    FindLineMatching(regex: RegExp): string;

/**
 * Reads a line from a file which starts with start, opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 256 characters is used. If you expect a file to have lines longer than 256 characters then use ReadLongLine which allows lines of any length. If one argument is used then the line must start with that string. If more than one argument is used then lines which start argument1 OR argument2 OR argument3 will be returned
 * @param start1 String which matching lines must start with (maximum length of 256 characters).
 * @param start2 alternative string which matching lines must start with (maximum length of 256 characters).
 * @param start3 alternative string which matching lines must start with (maximum length of 256 characters).
 * @param ...vars_startn alternative string which matching lines must start with (maximum length of 256 characters).
 */
    FindLineStarting(start1: string, start2?: string, start3?: string, ...vars_startn?: string[]): string;

/**
 * Flushes a file opened for writing by a File object.
 */
    Flush(): void;

/**
 * Check if a filename is absolute
 * @param filename Filename you want to test if absolute.
 */
    static IsAbsolute(filename: string): boolean;

/**
 * Check if a filename is a directory
 * @param filename Filename you want to test to see if it is a directory.
 */
    static IsDirectory(filename: string): boolean;

/**
 * Check if a filename is a file
 * @param filename Filename you want to test to see if it is a file (i.e. not a directory).
 */
    static IsFile(filename: string): boolean;

/**
 * makes a directory
 * @param name Directory you want to create.
 */
    static Mkdir(name: string): boolean;

/**
 * Move a file
 * @param source Source filename you want to move.
 * @param dest Destination filename you want to move (rename) source file to. Note that if a file with the name dest already exists it will not be overwritten. Delete the file first with File.Delete().
 */
    static Move(source: string, dest: string): boolean;

/**
 * Reads a single character from a file opened for reading by a File object.
 */
    ReadChar(): string;

/**
 * Reads a line from a file opened for reading by a File object. To enable this function to be as fast as possible a maximum line length of 256 characters is used. If you expect a file to have lines longer than 256 characters then use ReadLongLine which allows lines of any length.
 */
    ReadLine(): string;

/**
 * Reads a line from a file opened for reading by a File object. The line can be any length. If your file has lines shorter than 256 characters then you may want to use ReadLine instead which is faster.
 */
    ReadLongLine(): string;

/**
 * Sets the file position for reading a file
 * @param position Position you want to seek to.
 */
    Seek(position: number): void;

/**
 * Simplify the name of a file by removing //, /./ and /../
 * @param filename Filename you want to simplify.
 */
    static SimplifyName(filename: string): string;

/**
 * Get the size of a file
 * @param filename File you want to find the size of.
 */
    static Size(filename: string): number;

/**
 * Write a string to a file opened for writing by a File object
 * @param string The string/item that you want to write
 */
    Write(string: any): void;

/**
 * Create a new File object for reading and writing text files.
 * @param filename Filename of the file you want to read/write. If reading, the file must exist. If writing, the file will be overwritten if it already exists
 * @param mode The mode to open the file with. Can be File.READ, File.WRITE or File.APPEND
 */
    constructor(filename: string, mode: number);

/** Flag to open file for appending */
    static APPEND: number;
/** Flag to indicate end of file */
    static EOF: number;
/** Flag to open file for reading */
    static READ: number;
/** Flag to open file for writing */
    static WRITE: number;
}

declare class Image {
/**
 * Draw an ellipse on an image
 * @param x1 X coordinate of start position for ellipse
 * @param y1 Y coordinate of start position for ellipse
 * @param x2 X coordinate of end position for ellipse
 * @param y2 Y coordinate of end position for ellipse
 */
    Ellipse(x1: number, y1: number, x2: number, y2: number): void;

/**
 * Fill an area in an image with a colour.
 * @param x X coordinate of start position for fill
 * @param y Y coordinate of start position for fill
 * @param tol Tolerance for colour matching (0-255). Default is 0. When filling a shape if the red, green and blue components are within tol of the colour of pixel (x, y) the pixel will be filled with the current fill colour.
 */
    Fill(x: number, y: number, tol?: number): void;

/**
 * Draw a line on an image
 * @param x1 X coordinate of start position for line
 * @param y1 Y coordinate of start position for line
 * @param x2 X coordinate of end position for line
 * @param y2 Y coordinate of end position for line
 */
    Line(x1: number, y1: number, x2: number, y2: number): void;

/**
 * Load an image file (gif, png, bmp or jpeg)
 * @param filename Imagename you want to load.
 */
    Load(filename: string): void;

/**
 * Count the number of pixels in an image that have a specific colour.
 * @param colour A valid colour from the X colour database (see /etc/X11/rgb.txt) e.g. "Blue", or #RRGGBB (each of R, G and B is a single hex digit) e.g. "#0000FF" for blue
 * @param tol Tolerance for colour matching (0-255). Default is 0. When looking at pixels if the red, green and blue components are within tol of the colour of pixel (x, y) the pixel will be counted.
 */
    PixelCount(colour: string, tol?: number): number;

/**
 * Draw a polygon on an image. The last point is always connected back to the first point.
 * @param x1 X coordinate of point 1
 * @param y1 Y coordinate of point 1
 * @param x2 X coordinate of point 2
 * @param y2 Y coordinate of point 2
 * @param ...vars_xn X coordinate of point n
 * @param ...vars_yn Y coordinate of point n
 */
    Polygon(x1: number, y1: number, x2: number, y2: number, ...vars_xn: number[], ...vars_yn: number[]): void;

/**
 * Draw a line with multiple straight segments on an image
 * @param x1 X coordinate of point 1
 * @param y1 Y coordinate of point 1
 * @param x2 X coordinate of point 2
 * @param y2 Y coordinate of point 2
 * @param ...vars_xn X coordinate of point n
 * @param ...vars_yn Y coordinate of point n
 */
    Polyline(x1: number, y1: number, x2: number, y2: number, ...vars_xn: number[], ...vars_yn: number[]): void;

/**
 * Draw a rectangle on an image
 * @param x1 X coordinate of start position for rectangle
 * @param y1 Y coordinate of start position for rectangle
 * @param x2 X coordinate of end position for rectangle
 * @param y2 Y coordinate of end position for rectangle
 */
    Rectangle(x1: number, y1: number, x2: number, y2: number): void;

/**
 * Save an image to file (gif, png, bmp or jpeg)
 * @param filename Imagename you want to save.
 * @param filetype Type you want to save as. Can be: Image.BMP, Image.JPG or Image.PNG
 */
    Save(filename: string, filetype: number): void;

/**
 * Draw a star on an image
 * @param x X coordinate of centre of star
 * @param y Y coordinate of centre of star
 * @param r Radius of star
 */
    Star(x: number, y: number, r: number): void;

/**
 * Draw text on an image
 * @param x X position for text
 * @param y Y position for text
 * @param text Text to write on image
 */
    Text(x: number, y: number, text: string): void;

/**
 * Create a new Image object for creating an image. If no arguments are given a null (0 pixels wide by 0 pixels high) is made. If 2 arguments are given they are used as the width and height of the image. The third argument can be used to define the initial background colour (the default is white).
 * @param width Width of image
 * @param height Height of image
 * @param backgroundColour Initial background colour for the image (default is white). Can be "none", a valid colour from the X colour database (see /etc/X11/rgb.txt) e.g. "Blue", or #RRGGBB (each of R, G and B is a single hex digit) e.g. "#0000FF" for blue.
 */
    constructor(width?: number, height?: number, backgroundColour?: string);

/** Whether or not lines, shapes and text are drawn with antialiasing (true by default). */
    antialiasing: bool;
/** Colour to use when filling shapes on the Image. Can be "none", a valid colour from the X colour database (see /etc/X11/rgb.txt) e.g. "Blue", or #RRGGBB (each of R, G and B is a single hex digit) e.g. "#0000FF" for blue. */
    fillColour: string;
/** Font to use when drawing text on the Image e.g. "Courier". Can be any font accessible by REPORTER. */
    font: string;
/** Angle (degrees) text is drawn at on the Image. Can be between -360 and 360 degrees. */
    fontAngle: number;
/** Colour to use when drawing text on the Image. Can be "none", a valid colour from the X colour database (see /etc/X11/rgb.txt) e.g. "Blue", or #RRGGBB (each of R, G and B is a single hex digit) e.g. "#0000FF" for blue. */
    fontColour: string;
/** Justification to use when drawing text on the Image. Can be Reporter.JUSTIFY_CENTRE, Reporter.JUSTIFY_LEFT or Reporter.JUSTIFY_RIGHT */
    fontJustify: number;
/** Size of font (in points) to use when drawing text on the Image */
    fontSize: number;
/** Style of font to use when drawing text on the Image. Can be any combination of Reporter.TEXT_NORMAL, Reporter.TEXT_BOLD, Reporter.TEXT_ITALIC and Reporter.TEXT_UNDERLINE */
    fontStyle: number;
/** Height of the Image */
    height: number;
/** Style to use for the end of lines on an Image. Can be Reporter.CAP_FLAT, Reporter.CAP_SQUARE or Reporter.CAP_ROUND */
    lineCapStyle: number;
/** Colour to use when drawing lines on the Image. Can be "none", a valid colour from the X colour database (see /etc/X11/rgb.txt) e.g. "Blue", or #RRGGBB (each of R, G and B is a single hex digit) e.g. "#0000FF" for blue. */
    lineColour: string;
/** Style to use for the line join at vertices of polygons and polylines on an Image. Can be Reporter.JOIN_MITRE, Reporter.JOIN_BEVEL or Reporter.JOIN_ROUND */
    lineJoinStyle: number;
/** Style to use when drawing lines on an Image. Can be Reporter.LINE_NONE, Reporter.LINE_SOLID, Reporter.LINE_DASH, Reporter.LINE_DOT, Reporter.LINE_DASH_DOT or Reporter.LINE_DASH_DOT_DOT */
    lineStyle: number;
/** Width to use when drawing lines on an Image value */
    lineWidth: number;
/** Width of the Image */
    width: number;
/** Save image as BMP */
    static BMP: number;
/** Save image as JPG */
    static JPG: number;
/** Save image as PNG */
    static PNG: number;
}


/** Object returned by GetCellProperties */
interface GetCellPropertiesReturn {
    /** Cell bottom border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    bottomBorderWidth: number;
    /** Number of columns this cell spans (for merged cells). 1 if not merged. Use columnMergeOrigin to find top-left cell. */
    colspan: number;
    /** The column index */
    column: number;
    /** The column index of the top-left cell in this merge cell group (if cell not merged then == column). */
    columnMergeOrigin: number;
    /** Number of conditions assigned to this cell. */
    conditions: number;
    /** Fill colour */
    fillColour: Colour;
    /** Font name (e.g. "Courier"). */
    fontName: string;
    /** Font size (between 6 and 72). */
    fontSize: number;
    /** Font style. See Text style constants for details. */
    fontStyle: number;
    /** Cell height. Modifying this property will modify the height of all cells in the row. */
    height: number;
    /** Hyperlink destination for HTML. */
    hyperlinkHTML: string;
    /** Hyperlink destination for PDF. */
    hyperlinkPDF: string;
    /** Hyperlink destination for Report or page within Report. */
    hyperlinkReport: string;
    /** Text justification for the item. Same rules as justify property of Item Class. */
    justify: number;
    /** The output text from a Program or Library Program cell. */
    output: string;
    /** Prefix text to appear before Library Program output. */
    prefix: string;
    /** Path and filename for a Program cell, or the filename (e.g. title.js) for a Library Program cell. */
    program: string;
    /** Program arguments */
    programArgs: string[];
    /** Cell right border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    rightBorderWidth: number;
    /** The cell row index. */
    row: number;
    /** The row index of the top-left cell in this merge cell group (if cell not merged then == row). */
    rowMergeOrigin: number;
    /** Number of rows this cell spans (for merged cells). == 1 if not merged. Use rowMergeOrigin to find top-left cell. */
    rowSpan: number;
    /** Suffix text to appear after Library Program output. */
    suffix: string;
    /** The cell text. For Program and Library Program cells, use the prefix, output and suffix properties. */
    text: string;
    /** Colour of text */
    textColour: Colour;
    /** Cell top border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    topBorderWidth: number;
    /** Can be Item.TEXT,Item.LIBRARY_PROGRAM  or Item.PROGRAM. */
    type: number;
    /** REPORTER variable for library program output. */
    variable: string;
    /** Cell width. Modifying this property will modify the width of all cells in the column. */
    width: number;
}


/** Object returned by GetColumnProperties */
interface GetColumnPropertiesReturn {
    /** Number of conditions assigned to this cell. */
    conditions: number;
    /** Fill colour */
    fillColour: Colour;
    /** Font name (e.g. "Courier"). */
    fontName: string;
    /** Font size (between 6 and 72). */
    fontSize: number;
    /** Font style. Same rules as fontStyle property of */
    fontStyle: number;
    /** Hyperlink destination for HTML. */
    hyperlinkHTML: string;
    /** Hyperlink destination for PDF. */
    hyperlinkPDF: string;
    /** Hyperlink destination for Report or page within Report. */
    hyperlinkReport: string;
    /** Text justification for the item. Same rules as justify property of Item Class. */
    justify: number;
    /** Path and filename for a Program cell, or the filename (e.g. title.js) for a Library Program cell. */
    program: string;
    /** Program arguments */
    programArgs: string[];
    /** The cell text. For Program and Library Program cells, use the prefix, output and suffix properties. */
    text: string;
    /** Colour of text */
    textColour: Colour;
    /** Can be Item.TEXT,Item.LIBRARY_PROGRAM  or Item.PROGRAM. */
    type: number;
    /** Cell width. Modifying this property will modify the width of all cells in the column. */
    width: number;
}


/** Object returned by GetCondition */
interface GetConditionReturn {
    /** Fill colour */
    fillColour: Colour;
    /** Font name (e.g. "Courier"). */
    fontName: string;
    /** Font size (between 6 and 72). */
    fontSize: number;
    /** Font style. See Text style constants for details. */
    fontStyle: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify: number;
    /** Condition name */
    name: string;
    /** Colour of text */
    textColour: Colour;
    /** See Condition types constants for details. */
    type: number;
    /** First condition value */
    value: string;
    /** Second condition value (where relevant) */
    value2: string;
}


/** Object returned by GetCondition */
interface GetConditionReturn {
    /** Fill colour */
    fillColour: Colour;
    /** Font name (e.g. "Courier"). */
    fontName: string;
    /** Font size (between 6 and 72). */
    fontSize: number;
    /** Font style. See Text style constants for details. */
    fontStyle: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify: number;
    /** Condition name */
    name: string;
    /** Colour of text */
    textColour: Colour;
    /** See Condition types constants for details. */
    type: number;
    /** First condition value */
    value: string;
    /** Second condition value (where relevant) */
    value2: string;
}


/** Object returned by GetCondition */
interface GetConditionReturn {
    /** Fill colour */
    fillColour: Colour;
    /** Font name (e.g. "Courier"). */
    fontName: string;
    /** Font size (between 6 and 72). */
    fontSize: number;
    /** Font style. See Text style constants for details. */
    fontStyle: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify: number;
    /** Condition name */
    name: string;
    /** Colour of text */
    textColour: Colour;
    /** See Condition types constants for details. */
    type: number;
    /** First condition value */
    value: string;
    /** Second condition value (where relevant) */
    value2: string;
}


/** Object function argument in SetCellProperties */
interface SetCellPropertiesArgument_properties {
    /** Cell bottom border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    bottomBorderWidth?: number;
    /** Fill colour */
    fillColour?: Colour;
    /** Font name (e.g. "Courier"). */
    fontName?: string;
    /** Font size (between 6 and 72). */
    fontSize?: number;
    /** Font style. See Text style constants for details. */
    fontStyle?: number;
    /** Hyperlink destination for HTML. */
    hyperlinkHTML?: string;
    /** Hyperlink destination for PDF. */
    hyperlinkPDF?: string;
    /** Hyperlink destination for Report or page within Report. */
    hyperlinkReport?: string;
    /** Text justification for the item. Same rules as justify property of Item Class. */
    justify?: number;
    /** Prefix text to appear before Library Program output. */
    prefix?: string;
    /** Path and filename for a Program cell, or the filename (e.g. title.js) for a Library Program cell. */
    program?: string;
    /** Program arguments */
    programArgs?: string[];
    /** Cell right border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    rightBorderWidth?: number;
    /** Suffix text to appear after Library Program output. */
    suffix?: string;
    /** The cell text. For Program and Library Program cells, use the prefix, output and suffix properties. */
    text?: string;
    /** Colour of text */
    textColour?: Colour;
    /** Cell top border width. Can be 0.0, 0.1, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0. Other values will result in no border. */
    topBorderWidth?: number;
    /** Can be Item.TEXT,Item.LIBRARY_PROGRAM  or Item.PROGRAM. */
    type?: number;
    /** REPORTER variable for library program output. */
    variable?: string;
}


/** Object function argument in SetColumnProperties */
interface SetColumnPropertiesArgument_properties {
    /** Fill colour */
    fillColour?: Colour;
    /** Font name (e.g. "Courier"). */
    fontName?: string;
    /** Font size (between 6 and 72). */
    fontSize?: number;
    /** Font style. Same rules as fontStyle property of */
    fontStyle?: number;
    /** Hyperlink destination for HTML. */
    hyperlinkHTML?: string;
    /** Hyperlink destination for PDF. */
    hyperlinkPDF?: string;
    /** Hyperlink destination for Report or page within Report. */
    hyperlinkReport?: string;
    /** Text justification for the item. Same rules as justify property of Item Class. */
    justify?: number;
    /** Path and filename for a Program cell, or the filename (e.g. title.js) for a Library Program cell. */
    program?: string;
    /** Program arguments */
    programArgs?: string[];
    /** The cell text. For Program and Library Program cells, use the prefix, output and suffix properties. */
    text?: string;
    /** Colour of text */
    textColour?: Colour;
    /** Can be Item.TEXT,Item.LIBRARY_PROGRAM  or Item.PROGRAM. */
    type?: number;
}


/** Object function argument in SetCondition */
interface SetConditionArgument_properties {
    /** Fill colour */
    fillColour?: Colour;
    /** Font name (e.g. "Courier"). */
    fontName?: string;
    /** Font size (between 6 and 72). */
    fontSize?: number;
    /** Font style. See Text style constants for details. */
    fontStyle?: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify?: number;
    /** Condition name */
    name?: string;
    /** Colour of text */
    textColour?: Colour;
    /** See Condition types constants for details. */
    type?: number;
    /** First condition value */
    value?: string;
    /** Second condition value (where relevant) */
    value2?: string;
}


/** Object function argument in SetCondition */
interface SetConditionArgument_properties {
    /** Fill colour */
    fillColour?: Colour;
    /** Font name (e.g. "Courier"). */
    fontName?: string;
    /** Font size (between 6 and 72). */
    fontSize?: number;
    /** Font style. See Text style constants for details. */
    fontStyle?: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify?: number;
    /** Condition name */
    name?: string;
    /** Colour of text */
    textColour?: Colour;
    /** See Condition types constants for details. */
    type?: number;
    /** First condition value */
    value?: string;
    /** Second condition value (where relevant) */
    value2?: string;
}


/** Object function argument in SetCondition */
interface SetConditionArgument_properties {
    /** Fill colour */
    fillColour?: Colour;
    /** Font name (e.g. "Courier"). */
    fontName?: string;
    /** Font size (between 6 and 72). */
    fontSize?: number;
    /** Font style. See Text style constants for details. */
    fontStyle?: number;
    /** Text alignment for the item. See Justification constants for details. */
    justify?: number;
    /** Condition name */
    name?: string;
    /** Colour of text */
    textColour?: Colour;
    /** See Condition types constants for details. */
    type?: number;
    /** First condition value */
    value?: string;
    /** Second condition value (where relevant) */
    value2?: string;
}

declare class Item {
/**
 * Delete a column from a table. Valid for item type Item.TABLE and Item.AUTO_TABLE.
 * @param column The index of the column to delete. Note that indices start from 0.
 */
    DeleteColumn(column: number): void;

/**
 * Delete a row from a table. Valid for item type Item.TABLE.
 * @param row The index of the row to delete. Note that indices start from 0.
 */
    DeleteRow(row: number): void;

/**
 * Generate an item.
 */
    Generate(): void;

/**
 * Get all of the items on a page.
 * @param page Page to get items from.
 */
    static GetAll(page: Page): Item[];

/**
 * Get the properties of the specified cell. Valid for item type Item.TABLE and Item.AUTO_TABLE.
 * @param row The row index of the cell of interest. Note that indices start from 0.
 * @param column The column index of the cell of interest. Note that indices start from 0.
 */
    GetCellProperties(row: number, column: number): GetCellPropertiesReturn;

/**
 * Get an autotable column properties. Valid for item type Item.AUTO_TABLE.
 * @param column The index of the column of interest. Note that indices start from 0.
 * @param header An argument to signify to get the properties of the header or the generated rows. Can be Reporter.AUTO_TABLE_HEADER or Reporter.AUTO_TABLE_ROWS.
 */
    GetColumnProperties(column: number, header: number): GetColumnPropertiesReturn;

/**
 * Get the width of a table column. Valid for item types Item.TABLE or Item.AUTO_TABLE.
 * @param row The index of the column of interest. Note that indices start from 0.
 */
    GetColumnWidth(row: number): number;

/**
 * Get the conditional formatting data for an item. Valid for item types Item.FILE, Item.PROGRAM, Item.TEXT or Item.TEXTBOX (for Item.AUTO_TABLE and Item.TABLE, see GetCondition functions with additional arguments below).
 * @param index The index of the condition to get. Note that indices start from 0. See conditions for the total number of comditions
 */
    GetCondition(index: number): GetConditionReturn;

/**
 * Get the conditional formatting data for an Item.AUTO_TABLE item.
 * @param index The index of the condition to get. Note that indices start from 0.
 * @param column The column to get the condition from. Note that indices start from 0.
 */
    GetCondition(index: number, column: number): GetConditionReturn;

/**
 * Get the conditional formatting data for an Item.TABLE item.
 * @param index The index of the condition to get. Note that indices start from 0.
 * @param row The cell row to get the condition from. Note that indices start from 0.
 * @param column The cell column to get the condition from. Note that indices start from 0.
 */
    GetCondition(index: number, row: number, column: number): GetConditionReturn;

/**
 * Get an Item from its name.
 * @param page Page to get item from
 * @param name Item name
 */
    static GetFromName(page: Page, name: string): Item;

/**
 * Get the text that appears in an autotable cell once generated. Valid for item type Item.AUTO_TABLE.
 * @param row_index The index of the row of interest. Note that indices start from 0.
 * @param column_index The index of the column of interest. Note that indicies start from 0.
 */
    GetGeneratedData(row_index: number, column_index: number): string;

/**
 * Get the height of a table row. Valid for item type Item.TABLE.
 * @param row The index of the row of interest. Note that indices start from 0.
 */
    GetRowHeight(row: number): number;

/**
 * Insert a column into a table. Valid for item types Item.TABLE and Item.AUTO_TABLE.
 * @param column The index of the position where the inserted column will end up. Note that indices start from 0. If no argument is given, a column will be added to the bottom of the table.
 */
    InsertColumn(column: number): void;

/**
 * Insert a row into a table. Valid for item type Item.TABLE.
 * @param row The index of the position where the inserted row will end up. Note that indices start from 0. If no argument is given, a row will be added to the bottom of the table.
 */
    InsertRow(row: number): void;

/**
 * Merge specified cells in a table. Valid for item types Item.TABLE and Item.AUTO_TABLE.
 * @param topLeftRow The row index of the top-left cell in the group of cells to be merged. Note that indices start from 0.
 * @param topLeftColumn The column index of the top-left cell in the group of cells to be merged. Note that indices start from 0.
 * @param rows The number of rows of cells to be merged (measured from the topLeftRow position).
 * @param columns The number of columns of cells to be merged (measured from the topLeftColumn position).
 */
    MergeCells(topLeftRow: number, topLeftColumn: number, rows: number, columns: number): void;

/**
 * Set the properties of the specified cell. Valid for item type Item.TABLE.
 * @param properties An object containing the cell properties.
 * @param row The row index of the cell to be modified. Note that indices start from 0.
 * @param column The column index of the cell to be modified. Note that indices start from 0.
 */
    SetCellProperties(properties: SetCellPropertiesArgument_properties, row: number, column: number): void;

/**
 * Set the properties of an autotable column. Valid for item type Item.AUTO_TABLE.
 * @param properties Set the properties of an autotable column. Valid for item type Item.AUTO_TABLE.
 * @param column The index of the column of interest. Note that indices start from 0.
 * @param header An argument to signify to set the properties of the header or the generated rows. Can be Reporter.AUTO_TABLE_HEADER or Reporter.AUTO_TABLE_ROWS.
 */
    SetColumnProperties(properties: SetColumnPropertiesArgument_properties, column: number, header: number): void;

/**
 * Set the width of a table column. Valid for item type Item.TABLE.
 * @param column The index of the column of interest. Note that indices start from 0.
 * @param width The column width.
 */
    SetColumnWidth(column: number, width: number): void;

/**
 * Set the specified condition for an item. Valid for item types Item.FILE, Item.PROGRAM, Item.TEXT or Item.TEXTBOX (for Item.AUTO_TABLE and Item.TABLE, see SetCondition functions with additional arguments below).
 * @param condition The index of the condition you wish to set. Note that indices start at 0. If a condition already exists at the specified index, it will be replaced. To add a new condition, specify an index equal to the number of existing conditions.
 * @param properties The index of the condition you wish to set. Note that indices start at 0. If a condition already exists at the specified index, it will be replaced. To add a new condition, specify an index equal to the number of existing conditions.
 */
    SetCondition(condition: number, properties: SetConditionArgument_properties): void;

/**
 * Set the specified condition for an Item.AUTO_TABLE item.
 * @param condition The index of the condition you wish to set. Note that indices start at 0. If a condition already exists at the specified index, it will be replaced. To add a new condition, specify an index equal to the number of existing conditions.
 * @param column The column to set the condition for. Note that indices start from 0.
 * @param properties The column to set the condition for. Note that indices start from 0.
 */
    SetCondition(condition: number, column: number, properties: SetConditionArgument_properties): void;

/**
 * Set the specified condition for an Item.TABLE item.
 * @param condition The index of the condition you wish to set. Note that indices start at 0. If a condition already exists at the specified index, it will be replaced. To add a new condition, specify an index equal to the number of existing conditions.
 * @param row The row to set the condition for. Note that indices start from 0.
 * @param column The column to set the condition for. Note that indices start from 0.
 * @param properties The column to set the condition for. Note that indices start from 0.
 */
    SetCondition(condition: number, row: number, column: number, properties: SetConditionArgument_properties): void;

/**
 * Set the height of a table row. Valid for item type Item.TABLE and Item.AUTO_TABLE.
 * @param row The index of the row of interest. Note that indices start from 0.
 * @param height The row height.
 */
    SetRowHeight(row: number, height: number): void;

/**
 * Unmerge the specified cell in a table. All cells merged to the specified cell will be unmerged. Valid for item types Item.TABLE and Item.AUTO_TABLE.
 * @param row The row index of the cell to be unmerged. Note that indices start from 0.
 * @param column The column index of the cell to be unmerged. Note that indices start from 0..
 */
    UnmergeCells(row: number, column: number): void;

/**
 * Create a new Item. The name and coordinates arguments are optional. Item.TABLE items are constructed with two rows and two columns by default. If you require only one row or column, use DeleteRow and DeleteColumn.
 * @param page Page to create item in
 * @param type Item type. Can be Item.LINE, Item.ARROW, Item.RECTANGLE, Item.ELLIPSE, Item.TEXT, Item.TEXTBOX, Item.IMAGE, Item.PROGRAM, Item.D3PLOT, Item.PRIMER, Item.THIS, Item.TEXT_FILE, Item.IMAGE_FILE, Item.LIBRARY_IMAGE, Item.LIBRARY_PROGRAM, Item.TABLE, Item.AUTO_TABLE, Item.SCRIPT, Item.NOTE or Item.PLACEHOLDER.
 * @param name Name of item
 * @param x X coordinate
 * @param x2 Second X coordinate for "rectangular" items
 * @param y Y coordinate
 * @param y2 Second Y coordinate for "rectangular" items
 */
    constructor(page: Page, type: number, name?: string, x?: number, x2?: number, y?: number, y2?: number);

/** If item is active or not. Inactive items will be skipped during report/page/item generation. */
    active: boolean;
/** Autotable type (whether the data is sourced from a file or a directory). Can be Reporter.AUTO_TABLE_DIRECTORY or Reporter.AUTO_TABLE_FILE. Valid for item type Item.AUTO_TABLE. */
    autotableType: number;
/** Bottom margin width. Valid for item types Item.TEXTBOX, Item.TEXT_FILE, Item.TABLE and Item.AUTO_TABLE */
    bottomMargin: number;
/** The number of columns in the table. Valid for item types Item.TABLE and Item.AUTO_TABLE */
    columns (readonly): number;
/** The number of conditions assigned to the item. Valid for item types Item.PROGRAM, Item.FILE, Item.TEXT and Item.TEXTBOX */
    conditions (readonly): number;
/** If image is embedded or not. Valid for item types Item.IMAGE */
    embed: boolean;
/** File or directory for item. Valid for item types: Item.AUTO_TABLE Item.D3PLOT Item.IMAGE Item.IMAGE_FILE Item.PRIMER Item.PROGRAM Item.TEXT_FILE Item.THIS */
    file: string;
/** Colour of fill for the item. Valid for item types Item.RECTANGLE, Item.ELLIPSE, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    fillColour: Colour;
/** Font for the item e.g. "Courier". Can be any font accessible by REPORTER. Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    fontName: string;
/** Font size for the item (6 &lt;= fontSize &lt;= 72). Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    fontSize: number;
/** Font style for the item. Can be a combination of Reporter.TEXT_NORMAL, Reporter.TEXT_BOLD, Reporter.TEXT_ITALIC or Reporter.TEXT_UNDERLINE Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    fontStyle: number;
/** The height of each generated row in an Autotable. Valid for item type Item.AUTO_TABLE. */
    generatedRowHeight: number;
/** The height of the header in an Autotable. Valid for item type Item.AUTO_TABLE. */
    headerHeight: number;
/** Height for "rectangular" items (absolute difference between y and y2) */
    height: number;
/** Text justification for the item. Can be Reporter.JUSTIFY_CENTRE, Reporter.JUSTIFY_LEFT or Reporter.JUSTIFY_RIGHT combined with Reporter.JUSTIFY_TOP, Reporter.JUSTIFY_MIDDLE or Reporter.JUSTIFY_BOTTOM Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    justify: number;
/** Left margin width. Valid for item types Item.TEXTBOX, Item.TEXT_FILE, Item.TABLE and Item.AUTO_TABLE */
    leftMargin: number;
/** Colour of outline for the item. Valid for item types Item.LINE, Item.ARROW, Item.RECTANGLE, Item.ELLIPSE, Item.TEXTBOX, Item.D3PLOT, Item.PRIMER, Item.THIS, Item.PROGRAM, Item.TEXT_FILE, Item.IMAGE_FILE, Item.TABLE and Item.AUTO_TABLE. */
    lineColour: Colour;
/** Style of outline for the item. Can be Reporter.LINE_NONE, Reporter.LINE_SOLID, Reporter.LINE_DASH, Reporter.LINE_DOT, Reporter.LINE_DASH_DOT or Reporter.LINE_DASH_DOT_DOT Valid for item types Item.LINE, Item.ARROW, Item.RECTANGLE, Item.ELLIPSE, Item.TEXTBOX, Item.D3PLOT, Item.PRIMER, Item.THIS, Item.PROGRAM, Item.TEXT_FILE and Item.IMAGE_FILE. */
    lineStyle: number;
/** Width of outline for the item in mm. Valid for item types Item.LINE, Item.ARROW, Item.RECTANGLE, Item.ELLIPSE, Item.TEXTBOX, Item.D3PLOT, Item.PRIMER, Item.THIS, Item.PROGRAM, Item.TEXT_FILE, Item.IMAGE_FILE, Item.TABLE and Item.AUTO_TABLE */
    lineWidth: number;
/** Name of the Item */
    name: string;
/** Right margin width. Valid for item types Item.TEXTBOX, Item.TEXT_FILE, Item.TABLE and Item.AUTO_TABLE */
    rightMargin: number;
/** The number of rows in the table. Valid for item type Item.TABLE */
    rows (readonly): number;
/** Whether or not a CSV file of the table contents is written when the item is generated. Valid for item types Item.TABLE and Item.AUTO_TABLE */
    saveCSV: bool;
/** The path and filename of the CSV file written when the item is generated. Valid for item types Item.TABLE and Item.AUTO_TABLE */
    saveCSVFilename: string;
/** Whether or not a Excel file of the table contents is written when the item is generated. Valid for item types Item.TABLE and Item.AUTO_TABLE */
    saveXlsx: bool;
/** The path and filename of the Excel file written when the item is generated. Valid for item types Item.TABLE and Item.AUTO_TABLE */
    saveXlsxFilename: string;
/** The script source text for the item. Only valid for item type Item.SCRIPT */
    script: string;
/** The text for the item. Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM, Item.TEXT_FILE and Item.SCRIPT */
    text: string;
/** Colour of text for the item. Valid for item types Item.TEXT, Item.TEXTBOX, Item.PROGRAM and Item.TEXT_FILE */
    textColour: Colour;
/** Top margin width. Valid for item types Item.TEXTBOX, Item.TEXT_FILE, Item.TABLE and Item.AUTO_TABLE */
    topMargin: number;
/** type of the Item. Can be Item.LINE, Item.TEXT etc. */
    readonly type: number;
/** Width for "rectangular" items (absolute difference between x and x2) */
    width: number;
/** X coordinate */
    x: number;
/** Second X coordinate for "rectangular" items */
    x2: number;
/** Y coordinate */
    y: number;
/** Second Y coordinate for "rectangular" items */
    y2: number;
/** Arrow item */
    static ARROW: number;
/** Automatic table item */
    static AUTO_TABLE: number;
/** D3Plot item */
    static D3PLOT: number;
/** Ellipse item */
    static ELLIPSE: number;
/** Image item */
    static IMAGE: number;
/** Image file item */
    static IMAGE_FILE: number;
/** Library image item */
    static LIBRARY_IMAGE: number;
/** Library program item */
    static LIBRARY_PROGRAM: number;
/** Line item */
    static LINE: number;
/** Note item */
    static NOTE: number;
/** Placeholder item */
    static PLACEHOLDER: number;
/** Primer item */
    static PRIMER: number;
/** Program item */
    static PROGRAM: number;
/** Rectangle item */
    static RECTANGLE: number;
/** Script item */
    static SCRIPT: number;
/** Table item */
    static TABLE: number;
/** Text item */
    static TEXT: number;
/** Textbox item */
    static TEXTBOX: number;
/** Text file item */
    static TEXT_FILE: number;
/** T/HIS item */
    static THIS: number;
}


/** Object function argument in Page constructor */
interface Page_constructor_Argument_options {
    /** Page background colour (white if omitted) */
    colour?: Colour;
    /** The page index at which the new page will be inserted (indices start from zero). You cannot create pages prior to the current page i.e. the index must be greater than the index of the current page. If omitted, the new page will be created immediately after the current page. Note that the current page continues to be the page that the Script item is running on (it does not change to the newly-created page). */
    index?: number;
    /** Name for page (empty if omitted) */
    name?: string;
}

declare class Page {
/**
 * Duplicate a page
 * @param index The page index that you want to insert the duplicate page at in the template. Note that indices start at 0. If omitted the duplicate page will be put after the one that you are duplicating.
 */
    Duplicate(index?: number): Page;

/**
 * Generate a page
 */
    Generate(): void;

/**
 * Gets all of the items from a page.
 */
    GetAllItems(): Item[];

/**
 * Get an item from a page.
 * @param index The index of the item on the page that you want to get. Note that indices start at 0.
 */
    GetItem(index: number): Item;

/**
 * Import an item from a file onto the page.
 * @param filename File containing the object to import
 */
    ImportItem(filename: string): Item;

/**
 * Create a new Page..
 * @param template Template to create page in
 * @param options Options specifying various page properties, including where the page should be created. If omitted, the default values below will be used.
 */
    constructor(template: Template, options?: Page_constructor_Argument_options);

/** The total number of items on the page */
    readonly items: number;
/** true if this is a master page object. */
    readonly master: boolean;
/** Name of the Page */
    name: string;
}

declare class Reporter {
/** Please use Template.GetCurrent() instead */
    currentTemplate: Template;
/** Please use Template.GetAll() instead */
    templates: array;
/** Autotable data is generated from a directory. */
    static AUTO_TABLE_DIRECTORY: number;
/** Autotable data is generated from a file. */
    static AUTO_TABLE_FILE: number;
/** Represents the header row in an Autotable. */
    static AUTO_TABLE_HEADER: number;
/** Represents the rows with generated data in an Autotable. */
    static AUTO_TABLE_ROWS: number;
/** A square line ending at the end point of the line */
    static CAP_FLAT: number;
/** A rounded line ending */
    static CAP_ROUND: number;
/** A square line that extends beyond the end point of the line by half the line width */
    static CAP_SQUARE: number;
/** Treats the value as a number. True if value is between the two condition values */
    static CONDITION_BETWEEN: number;
/** Treats the vlue as a string. True if the value contains the string */
    static CONDITION_CONTAINS_STRING: number;
/** Treats the vlue as a string. True if the value does not contain the string */
    static CONDITION_DOESNT_CONTAIN_STRING: number;
/** Treats the value as a regular expression. True if the regular expression does not match */
    static CONDITION_DOESNT_MATCH_REGEX: number;
/** Treats the value as a string. True if the strings are equal */
    static CONDITION_EQUAL_TO: number;
/** Treats the value as a number. True if value is greater than the condition value */
    static CONDITION_GREATER_THAN: number;
/** Treats the value as a number. True if value is less than the condition value */
    static CONDITION_LESS_THAN: number;
/** Treats the value as a regular expression. True if the regular expression matches */
    static CONDITION_MATCHES_REGEX: number;
/** Treats the value as a number. True if value is between the two condition values */
    static CONDITION_NOT_BETWEEN: number;
/** Treats the value as a string. True if the strings are not equal */
    static CONDITION_NOT_EQUAL_TO: number;
/** The triangular notch where the line segments meet is filled */
    static JOIN_BEVEL: number;
/** The outer edges of the line segments are extended to meet at an angle and this is filled */
    static JOIN_MITRE: number;
/** A circular arc between the two line segments is filled */
    static JOIN_ROUND: number;
/** Bottom justification of text */
    static JUSTIFY_BOTTOM: number;
/** Centre justification of text */
    static JUSTIFY_CENTRE: number;
/** Left justification of text */
    static JUSTIFY_LEFT: number;
/** Middle justification of text */
    static JUSTIFY_MIDDLE: number;
/** Right justification of text */
    static JUSTIFY_RIGHT: number;
/** Top justification of text */
    static JUSTIFY_TOP: number;
/** A dashed line (dashes separated by a few pixels) */
    static LINE_DASH: number;
/** A line drawn with alternate dashes and dots */
    static LINE_DASH_DOT: number;
/** A line drawn with one dash and two dots */
    static LINE_DASH_DOT_DOT: number;
/** A dotted line (dots separated by a few pixels) */
    static LINE_DOT: number;
/** Invisible line */
    static LINE_NONE: number;
/** A simple continuous line */
    static LINE_SOLID: number;
/** Text drawn in a bold font */
    static TEXT_BOLD: number;
/** Text drawn in an italic font */
    static TEXT_ITALIC: number;
/** Text drawn in a normal font */
    static TEXT_NORMAL: number;
/** Text drawn underlined */
    static TEXT_UNDERLINE: number;
/** Show template in design view */
    static VIEW_DESIGN: number;
/** Show template in presentation view */
    static VIEW_PRESENTATION: number;
}

declare class Template {
/**
 * Close a template.Note that if you call this function for a Template object, the Template data will be deleted, so you should not try to use it afterwards!.
 */
    Close(): void;

/**
 * Deletes a page from a template.
 * @param index The index of the page that you want to delete. Note that indices start at 0.
 */
    DeletePage(index: number): void;

/**
 * Deletes any temporary variables from a template.
 */
    DeleteTemporaryVariables(): void;

/**
 * Start a dialog to edit the template variables
 * @param title Title for dialog. If omitted, null or an empty string is given then the default title will be used.
 * @param message Message to show in dialog. If omitted, null or an empty string is given then the default message will be used.
 * @param update Whether the variables in the template will be updated with the new values if OK is pressed. Setting this to be false allows you to check variable values before updating them from a script. If omitted the default is true
 * @param variables A list of variables to show in the dialog. If omitted, null or an empty array, all variables will be shown
 * @param columns Columns to show in the dialog (as well as the variable value column). Can be a bitwise OR of Variable.NAME, Variable.TYPE, Variable.DESCRIPTION, Variable.FORMAT, Variable.PRECISION and Variable.TEMPORARY. If omitted columns will be shown for name and description
 */
    EditVariables(title?: string, message?: string, update?: boolean, variables?: array[], columns?: number): object;

/**
 * Replaces any variables in a string with their current values
 * @param string The string you want to expand variables in.
 */
    ExpandVariablesInString(string: string): string;

/**
 * Generate a template
 */
    Generate(): void;

/**
 * Get all of the open templates
 */
    static GetAll(): Template[];

/**
 * Gets all of the pages from a template.
 */
    GetAllPages(): Page[];

/**
 * Get the currently active template
 */
    static GetCurrent(): Template;

/**
 * Get the master page from a template.
 */
    GetMaster(): Page;

/**
 * Get a page from a template.
 * @param index The index of the page that you want to get. Note that indices start at 0.
 */
    GetPage(index: number): Page;

/**
 * Get the description for a variable
 * @param name Variable name you want to get description for.
 */
    GetVariableDescription(name: string): string;

/**
 * Get the value for a variable
 * @param name Variable name you want to get value for.
 */
    GetVariableValue(name: string): string;

/**
 * Save a template as HTML
 * @param filename Filename you want to save.
 */
    Html(filename: string): void;

/**
 * Save a template as Adobe Acrobat PDF
 * @param filename Filename you want to save.
 */
    Pdf(filename: string): void;

/**
 * Save a template as PowerPoint
 * @param filename Filename you want to save.
 */
    Ppt(filename: string): void;

/**
 * Print template on a printer
 * @param printer Printer you want to print to.
 */
    Print(printer: string): void;

/**
 * Save a template
 */
    Save(): void;

/**
 * Save a template/report with a new name
 * @param filename Filename you want to save. Note if you use the .orr extension the template will be saved as a report if generated.
 */
    SaveAs(filename: string): void;

/**
 * Update/redraw a template
 */
    Update(): void;

/**
 * Create a new Template. The filename argument is optional. If present it is a file to open
 * @param filename Name of template file to open
 */
    constructor(filename?: string);

/** Filename (without path) of the Template. */
    readonly filename: string;
/** Name of the Template. This property has been preserved for compatability with older scripts. It either contains the absolute path and filename, or just the filename, depending on how the Template was opened. Please use the filename and path properties for consistent results. */
    readonly name: string;
/** Number of Pages in template */
    readonly pages: number;
/** Absolute path (without filename) of the Template. If the Template is new and has not yet been saved, this property will be empty. */
    readonly path: string;
/** Array of Variable objects for this template. Please use Variable.GetAll() and Variable.GetFromName() instead. */
    variables: array;
/** Current view type (presentation or design view) for this Template. Can be: Reporter.VIEW_DESIGN or Reporter.VIEW_PRESENTATION. */
    view: number;
}

declare class Variable {
/**
 * Returns an array of Variable objects for all of the variables in a Template.
 * @param template Template to get the variables from
 */
    static GetAll(template: Template): Variable[];

/**
 * Returns the Variable object for a variable name.
 * @param template Template to find the variable in
 * @param name name of the variable you want the Variable object for
 */
    static GetFromName(template: Template, name: string): Variable;

/**
 * Remove a variableNote that if you call this function for a Variable object, the Variable data will be deleted, so you should not try to use it afterwards!.
 */
    Remove(): void;

/**
 * Create a new Variable. The template and name arguments MUST be given, all others are optional
 * @param template Template object to create variable in
 * @param name Name of variable
 * @param description Description of variable
 * @param value Variable value
 * @param type Type of variable. Predefined types are "Directory", "File(absolute)", "File(basename)", "File(extension)", "File(tail)", "General", "Number" and "String". Alternatively give your own type. e.g. "NODE ID". If omitted default is "General"
 * @param readonly If variable is readonly or not. If omitted default is false.
 * @param temporary If variable is temporary or not. If omitted default is true.
 */
    constructor(template: Template, name: string, description?: string, value?: string, type?: string, readonly?: boolean, temporary?: boolean);

/** Variable description */
    description: string;
/** Variable format. Can be Variable.FORMAT_NONE, Variable.FORMAT_FLOAT, Variable.FORMAT_SCIENTIFIC, Variable.FORMAT_GENERAL, Variable.FORMAT_INTEGER, Variable.FORMAT_UPPERCASE or Variable.FORMAT_LOWERCASE */
    format: number;
/** Variable name */
    name: string;
/** Variable precision for floating point numbers. */
    precision: number;
/** If Variable is read only or not. */
    readonly: boolean;
/** If Variable is temporary or not. */
    temporary: boolean;
/** Variable type. Predefined types are "Directory", "File(absolute)", "File(basename)", "File(extension)", "File(tail)", "General", "Number" and "String". Alternatively give your own type. e.g. "NODE ID" */
    type: string;
/** Variable value */
    value: string;
/** Show variable description when editing variables with Template.EditVariables() */
    static DESCRIPTION: number;
/** Show variable format when editing variables with Template.EditVariables() */
    static FORMAT: number;
/** Variable has floating point number format */
    static FORMAT_FLOAT: number;
/** Variable has general format */
    static FORMAT_GENERAL: number;
/** Variable has integer format */
    static FORMAT_INTEGER: number;
/** Variable has lower case format */
    static FORMAT_LOWERCASE: number;
/** Variable has no format */
    static FORMAT_NONE: number;
/** Variable has scientific format */
    static FORMAT_SCIENTIFIC: number;
/** Variable has upper case format */
    static FORMAT_UPPERCASE: number;
/** Show variable name when editing variables with Template.EditVariables() */
    static NAME: number;
/** Show variable precision when editing variables with Template.EditVariables() */
    static PRECISION: number;
/** Show variable readonly status when editing variables with Template.EditVariables() */
    static READONLY: number;
/** Show variable temporary status when editing variables with Template.EditVariables() */
    static TEMPORARY: number;
/** Show variable type when editing variables with Template.EditVariables() */
    static TYPE: number;
/** Show variable value when editing variables with Template.EditVariables() */
    static VALUE: number;
}


/** Object function argument in GetOptions */
interface GetOptionsArgument_options {
    /** If checkbox is selected or not */
    selected?: boolean;
    /** Text to show next to option */
    text: string;
    /** Type of option. Can be "label" (plain text), "text" (a one line text widget), "textbox" (a multi line text widget) or "checkbox" (a checkable option) */
    type: string;
    /** Text to show for option */
    value: string;
}

declare class Window {
/**
 * Show an error message in a window.
 * @param title Title for window.
 * @param error Error message to show in window.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used.
 */
    static Error(title: string, error: string, buttons?: number): number;

/**
 * Map the directory selector box native to your machine, allowing you to choose a directory.
 * @param initial Initial directory to start from.
 */
    static GetDirectory(initial?: string): string;

/**
 * Map a file selector box allowing you to choose a file. See also Window.GetFiles()
 * @param extension Extension to filter by.
 * @param allow_new Allow creation of new file.
 * @param initial Initial directory to start from.
 */
    static GetFile(extension?: string, allow_new?: boolean, initial?: string): string;

/**
 * Map a file selector box allowing you to choose multiple files. See also Window.GetFile()
 * @param extension Extension to filter by.
 */
    static GetFiles(extension?: string): string[];

/**
 * Map a window allowing you to input an integer. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 */
    static GetInteger(title: string, message: string): number;

/**
 * Map a window allowing you to input a number. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 */
    static GetNumber(title: string, message: string): number;

/**
 * Map a window allowing you to input various options. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 * @param options Array of objects listing options that can be set. If OK is pressed the objects will be updated with the values from the widgets. If cancel is pressed they will not.
 */
    static GetOptions(title: string, message: string, options: GetOptionsArgument_options[]): boolean;

/**
 * Map a window allowing you to input a string. OK and Cancel buttons are shown.
 * @param title Title for window.
 * @param message Message to show in window.
 */
    static GetString(title: string, message: string): string;

/**
 * Show information in a window.
 * @param title Title for window.
 * @param info Information to show in window.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used.
 */
    static Information(title: string, info: string, buttons?: number): number;

/**
 * Show a message in a window.
 * @param title Title for window.
 * @param message Message to show in window.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used
 */
    static Message(title: string, message: string, buttons?: number): number;

/**
 * Show a question in a window.
 * @param title Title for window.
 * @param question Question to show in window.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted Yes and No button will be used.
 */
    static Question(title: string, question: string, buttons?: number): number;

/**
 * Show a warning message in a window.
 * @param title Title for window.
 * @param warning Warning message to show in window.
 * @param buttons The buttons to use. Can be bitwise OR of Window.OK, Window.CANCEL, Window.YES or Window.NO. If this is omitted an OK button will be used.
 */
    static Warning(title: string, warning: string, buttons?: number): number;

/** Show CANCEL button */
    static CANCEL: number;
/** Show NO button */
    static NO: number;
/** Show OK button */
    static OK: number;
/** Show YES button */
    static YES: number;
}

/**
 * This method can be used to test whether REPORTER is running in batch mode or not.
 */
declare function Batch(): boolean;

/**
 * Print a string to log file for debugging. Anything that you call the debug method on will be 'printed' to the log file window. Note that a carriage return will automatically be added.
 * @param string The string/item that you want to debug
 */
declare function Debug(string: any): void;

/**
 * Stop execution and exit from script
 */
declare function Exit(): void;

/**
 * Return the current working directory for REPORTER.
 */
declare function GetCurrentDirectory(): string;

/**
 * Print an error to log file. Anything that you print will be output to the log file window in bold red text. Note that a carriage return will automatically be added.
 * @param arg1 The string/item that you want to print
 * @param ...vars The string/item that you want to print
 */
declare function LogError(arg1: any, ...vars: any[]): void;

/**
 * Print a string to log file. Anything that you print will be output to the log file window. Note that a carriage return will automatically be added.
 * @param arg1 The string/item that you want to print
 * @param ...vars The string/item that you want to print
 */
declare function LogPrint(arg1: any, ...vars: any[]): void;

/**
 * Print a warning to log file. Anything that you print will be output to the log file window in red text. Note that a carriage return will automatically be added.
 * @param arg1 The string/item that you want to print
 * @param ...vars The string/item that you want to print
 */
declare function LogWarning(arg1: any, ...vars: any[]): void;

/**
 * Output a string from a script. Note that a carriage return is not automatically added.
 * @param string The string/item that you want to print
 */
declare function Output(string: any): void;

/**
 * Set the current working directory for REPORTER.
 * @param directory The directory that you want to change to
 */
declare function SetCurrentDirectory(directory: string): boolean;

/**
 * Do a system command outside REPORTER.
 * @param string The system command that you want to do
 */
declare function System(string: any): number;

/**  */
    reporter: Reporter;
