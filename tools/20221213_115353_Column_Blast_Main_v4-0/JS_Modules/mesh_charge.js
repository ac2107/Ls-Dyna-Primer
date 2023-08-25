//////////////////SPHERE/////////////////////
function mesh_sphere(m, shell_pid, cx,cy,cz, radius, ele) 
{
	Message("Meshing Sphere");
	PlayMacro(mac_dir+"sphere_001.prm", { variables: { PID:shell_pid, CEN_X:cx, CEN_Y:cy, CEN_Z:cz,  RAD:radius, ELE:ele } } );
}
//////////////////HEMISPHERE/////////////////////
function mesh_hemisphere(m, shell_pid, cx,cy,cz, nx,ny,nz, radius, ele) 
{
	Message("Meshing Hemiphere");
	PlayMacro(mac_dir+"hemisphere_001.prm", { variables: { PID:shell_pid, CEN_X:cx, CEN_Y:cy, CEN_Z:cz, NORM_X:nx, NORM_Y:ny, NORM_Z:nz, RAD:radius, ELE:ele } } );
}
