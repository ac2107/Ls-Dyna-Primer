// functions and classes write and import implementation of keycards not supported by JS API yet

var constrainedBeamInSolid = {

    /*
    *CONSTRAINED_BEAM_IN_SOLID
    $:   slave    master     sstyp     mstyp                         ncoup      cdir
            2         1         1         1                             1         1
    $:   start       end               axfor                                        
        0.0       0.0                   0

    sstyp   0 - part set ID, 1 - part ID
    mstyp   0 - part set ID, 1 - part ID
            
    */

    slave:  2, master: 1, sstyp: 1, mstyp: 1, 
    start: 0.0, end: 0.0, axfor: 0,
    ncoup: 0, cdir: 0,

    createKeycard: function () {

        Message("...create CONSTRAINED_BEAM_IN_SOLID card");

        var f = new File(js_dir+"ibtmp.key", File.WRITE);
        f.Write("*KEYWORD\n");

        f.Write("*CONSTRAINED_BEAM_IN_SOLID\n");
        
        f.Write(this.slave + "," + this.master + "," + this.sstyp + "," + this.mstyp +",,," + this.ncoup + "," + this.cdir + "\n");
        f.Write(this.start + "," + this.end + ",," + this.axfor + "\n");
     
		f.Write("*END\n");
		f.Close();

        m.Import(js_dir+"ibtmp.key"); // merge temp file back into main model (m)

        File.Delete(js_dir+"ibtmp.key") // delete temp file

        Message("...CONSTRAINED_BEAM_IN_SOLID card created");
    }
}











