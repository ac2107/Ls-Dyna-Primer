function blast_walls(m, wall_set_sid, part_set, column_height)
{
	// Setup blast wall to prevent run away nodes
	var wflag = AllocateFlag();
	part_set.SetFlag(wflag);
	m.PropagateFlag(wflag);

	var w_set = new Set(m, wall_set_sid, Set.NODE, "Wall_Set");
	w_set.AddFlagged(wflag);
	ReturnFlag(wflag);

	var xmin = -20;
	var xmax = 20;
	var ymin = -20;
	var ymax = 20;
	var zmin = -0.001;
	var zmax = column_height+5;
	var len1 = xmax - xmin;
	var len2 = ymax - ymin;
	var len3 = zmax - zmin;

	create_rigidwall(m, w_set.sid, xmin, ymin, zmin, xmin, ymin, zmax, xmax, ymin, zmin, len1, len2);  // base
	create_rigidwall(m, w_set.sid, xmin, ymax, zmax, xmin, ymax, zmin, xmax, ymax, zmax, len1, len2);  // top
	
	create_rigidwall(m, w_set.sid, xmax, ymin, zmin, xmax, ymax, zmin, xmin, ymin, zmin, len1, len3);  // y min
	create_rigidwall(m, w_set.sid, xmin, ymax, zmin, xmin, ymin, zmin, xmax, ymax, zmin, len1, len3);  // y max

	create_rigidwall(m, w_set.sid, xmin, ymin, zmin, xmax, ymin, zmin, xmin, ymax, zmin, len2, len3);  // x min
	create_rigidwall(m, w_set.sid, xmax, ymax, zmin, xmin, ymax, zmin, xmax, ymin, zmin, len2, len3);  // x max
}
//////////////////////////////////////////////
function create_rigidwall(m, sid, xt, yt, zt, xh, yh, zh, xe, ye, ze, xlen, ylen)
{
	var r = new Rigidwall(m, Rigidwall.PLANAR); // base
	r.finite = true;

	r.nsid = sid;
	r.xt = xt;
	r.yt = yt;
	r.zt = zt;
	r.xh = xh;
	r.yh = yh;
	r.zh = zh;
	r.xhev = xe;
	r.yhev = ye;
	r.zhev = ze;
	r.lenl = xlen;
	r.lenm = ylen;
}
