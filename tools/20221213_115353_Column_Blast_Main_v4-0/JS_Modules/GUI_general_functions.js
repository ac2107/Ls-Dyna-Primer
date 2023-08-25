///////////////GUI FUNCTIONS////////////
function exit_click()
{
	Exit();
}
///////////
function number_check1() //non-required data
{
	if(isNaN(this.text) == true) this.text = "";
}
/////
function number_check2() //required data
{
	if(isNaN(this.text) == true)
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
	}
	else if (Number(this.text) <= 0)
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
	}
	else this.category = Widget.CATEGORY_TEXT_BOX;

	wm.Redraw();
}
//////
function integer_check() // non-required data
{
	if(Math.round(this.text) != this.text) this.text = "";
}
//////
function integer_check2() // required data
{
	if(Math.round(this.text) != this.text)
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
	}
	else if(Number(this.text) <= 0)
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
	}
	else this.category = Widget.CATEGORY_TEXT_BOX;

	wm.Redraw();
}
//////
function height_check()
{
	if(isNaN(this.text) == true)
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
	}
	else if(Number(this.text) >= Number(wbase.tcd1.text) )
	{
		this.text = "";
		this.category = Widget.CATEGORY_WARNING_ACTION;
		var answer = Window.Message("Column", "Height of detailed (solid) section is greater than the total column height");
	}
	else this.category = Widget.CATEGORY_TEXT_BOX;

	wm.Redraw();
}
///////////////////
function load_ramp_clicked()
{
	if (this.pushed == true )
	{
		wbase.tf7.Show();
		ramp_type = 1;
	}
	else
	{
		wbase.tf7.Hide();
		wbase.tf7.text = 1.0;
		ramp_type = 0;
	}
}
///////////////////
function charge_clicked()
{
	if (this === wbase.hemi )
	{
		wbase.hemi.pushed   = true;
		wbase.sphere.pushed = false;
		wbase.air.pushed = false;
		wbase.viper.pushed = false;
		charge_type = 1;
	}
	else if (this === wbase.sphere )
	{
		wbase.hemi.pushed   = false;
		wbase.sphere.pushed = true;
		wbase.air.pushed = false;
		wbase.viper.pushed = false;
		charge_type = 2;
	}
	else if (this === wbase.air )
	{
		wbase.hemi.pushed   = false;
		wbase.sphere.pushed = false;
		wbase.air.pushed = true;
		wbase.viper.pushed = false;
		charge_type = 4;
	}
	else if (this === wbase.viper )
	{
		wbase.hemi.pushed   = false;
		wbase.sphere.pushed = false;
		wbase.air.pushed = false;
		wbase.viper.pushed = true;
		charge_type = 100;
	}
}
////////////
function end1_clicked()
{
	if (this === wbase.c_end11 )
	{
		wbase.c_end11.pushed = true;
		wbase.c_end12.pushed = false;
		wbase.c_end13.pushed = false;
		end1_type = 1;

		wbase.c_spring1.Hide();
		wbase.c_spring1.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end12 )
	{
		wbase.c_end11.pushed = false;
		wbase.c_end12.pushed = true;
		wbase.c_end13.pushed = false;
		end1_type = 2;

		wbase.c_spring1.Hide();
		wbase.c_spring1.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end13 )
	{
		wbase.c_end11.pushed = false;
		wbase.c_end12.pushed = false;
		wbase.c_end13.pushed = true;
		end1_type = 3;

		wbase.c_spring1.Show();
		wbase.c_spring1.category = Widget.CATEGORY_WARNING_ACTION;
	}
}
////////////
function end2_clicked()
{
	if (this === wbase.c_end21 )
	{
		wbase.c_end21.pushed = true;
		wbase.c_end22.pushed = false;
		wbase.c_end23.pushed = false;
		wbase.c_end24.pushed = false;
		wbase.c_end25.pushed = false;
		end2_type = 1;

		wbase.c_spring2.Hide();
		wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end22 )
	{
		wbase.c_end21.pushed = false;
		wbase.c_end22.pushed = true;
		wbase.c_end23.pushed = false;
		wbase.c_end24.pushed = false;
		wbase.c_end25.pushed = false;
		end2_type = 2;

		wbase.c_spring2.Hide();
		wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end23 )
	{
		wbase.c_end21.pushed = false;
		wbase.c_end22.pushed = false;
		wbase.c_end23.pushed = true;
		wbase.c_end24.pushed = false;
		wbase.c_end25.pushed = false;
		end2_type = 3;

		wbase.c_spring2.Hide();
		wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end24 )
	{
		wbase.c_end21.pushed = false;
		wbase.c_end22.pushed = false;
		wbase.c_end23.pushed = false;
		wbase.c_end24.pushed = true;
		wbase.c_end25.pushed = false;
		end2_type = 4;

		wbase.c_spring2.Hide();
		wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	}
	if (this === wbase.c_end25 )
	{
		wbase.c_end21.pushed = false;
		wbase.c_end22.pushed = false;
		wbase.c_end23.pushed = false;
		wbase.c_end24.pushed = false;
		wbase.c_end25.pushed = true;
		end2_type = 5;

		wbase.c_spring2.Show();
		wbase.c_spring2.category = Widget.CATEGORY_WARNING_ACTION;
	}
}
////////////
function post_blast_clicked()
{
	if(this === wbase.post_blast1) // imp
	{
		if(this.pushed == false )
		{
			post_blast_load = 0;
			wbase.post_timel.Hide();
			wbase.post_time.Hide();
			wbase.post_time.category = Widget.CATEGORY_WARNING_ACTION;
			wbase.damp.Hide();
			wbase.damp.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(this.pushed == true )
		{
			post_blast_load = 1;
			wbase.post_blast2.pushed = false
			wbase.post_timel.Hide();
			wbase.post_time.Hide();
			wbase.damp.Hide();
			wbase.damp.category = Widget.CATEGORY_WARNING_ACTION;
		}
	}
	if(this === wbase.post_blast2) // exp damped 
	{
		if(this.pushed == false )
		{
			post_blast_load = 0;
			wbase.post_timel.Hide();
			wbase.post_time.Hide();
			wbase.post_time.category = Widget.CATEGORY_WARNING_ACTION;
			wbase.damp.Hide();
			wbase.damp.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(this.pushed == true )
		{
			post_blast_load = 2;
			wbase.post_blast1.pushed = false;
			wbase.post_timel.Show();
			wbase.post_time.Show();
			wbase.damp.Show();
		}
	}
	update_timeline();
}
////////////
function pre_blast_clicked()
{
	if(this === wbase.pre_blast1) // imp
	{
		if(this.pushed == false )
		{
			pre_blast_load = 0;
		}
		else if(this.pushed == true )
		{
			pre_blast_load = 1;
			wbase.pre_blast2.pushed = false
			wbase.dr1.Hide();
			wbase.dr1.category = Widget.CATEGORY_WARNING_ACTION;
		}
	}
	if(this === wbase.pre_blast2) // dr
	{
		if(this.pushed == false )
		{
			pre_blast_load = 0;
			wbase.dr1.Hide();
			wbase.dr1.category = Widget.CATEGORY_WARNING_ACTION;
		}
		else if(this.pushed == true )
		{
			pre_blast_load = 2;
			wbase.pre_blast1.pushed = false;
			wbase.dr1.Show();
		}
	}
	update_timeline();
}
///////////////////////////
function update_timeline()
{
	if(this.ttype == "blast" || this.ttype == "post") // blast duration - check number
	{
		if(isNaN(this.text) == true)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
			return;
		}
		else if (Number(this.text) <= 0)
		{
			this.text = "";
			this.category = Widget.CATEGORY_WARNING_ACTION;
			return;
		}
		else this.category = Widget.CATEGORY_TEXT_BOX;
		wm.Redraw();
	}

	if(pre_blast_load == 0) pre_dur = 0;
	else if(pre_blast_load == 1) pre_dur = 1;
	else if(pre_blast_load == 2) pre_dur = 0;

	var blast_dur = Number(wbase.tt1.text);

	if(post_blast_load == 0) post_dur = 0;
	else if(post_blast_load == 1) post_dur = 1;
	else if(post_blast_load == 2) post_dur = Number(wbase.post_time.text);

	var pr_s = 0;
	var pr_f = pr_s + pre_dur;
	var bl_s = pr_f;
	var bl_f = bl_s + blast_dur;
	var po_s = bl_f;
	var po_f = po_s + post_dur;

	wbase.timel11.text = ""+pr_s; // pre start
	wbase.timel12.text = ""+pr_f; // pre finish
	wbase.timel21.text = ""+bl_s; // blast start
	wbase.timel22.text = ""+bl_f; // blast finish
	wbase.timel31.text = ""+po_s; // post finish
	wbase.timel32.text = ""+po_f; // post finish

	wm.Redraw();
}
///////////////////////////
function check_input() 
{
	var check = 0;
	// Section Dimensions
	if(c_type ==1 && s_sec_type == 1)
	{
		if(Number(wsteel.td1.text)>0 && Number(wsteel.td2.text)>0 && Number(wsteel.td3.text)>0 && Number(wsteel.td3.text)>0 )  ;
		else check=1; 
	}
	else if(c_type ==1 && s_sec_type == 2)
	{
		if(Number(wsteel.td1.text)>0 && Number(wsteel.td2.text)>0) ;
		else check=1; 
	}
	else if(c_type ==1 && s_sec_type == 3)
	{
		if(Number(wsteel.td1.text)>0 && Number(wsteel.td2.text)>0 && Number(wsteel.td3.text)>0) ;
		else check=1; 
	}
	else if(c_type ==1 && s_sec_type == 4)
	{
		if(Number(wsteel.td1.text)>0 && Number(wsteel.td2.text)>0) ;
		else check=1; 
	}
	else if(c_type ==1 && s_sec_type == 5)
	{
		if(Number(wsteel.td1.text)>0 && Number(wsteel.td2.text)>0 && Number(wsteel.td3.text)>0) ;
		else check=1; 
	}
	else if(c_type ==2 && c_sec_type == 1)
	{
		if(Number(wconcr.td1.text)>0 && Number(wconcr.td2.text)>0 && Number(wconcr.td3.text)>0 && Number(wconcr.td4.text)>0 && Number(wconcr.td5.text)>0 && Number(wconcr.td6.text)>0 ) ;
		else check=1; 
	}
	else if(c_type ==2 && c_sec_type == 2)
	{
		if(Number(wconcr.td1.text)>0 && Number(wconcr.td2.text)>0 && Number(wconcr.td4.text)>0 && Number(wconcr.td6.text)>0 ) ;
		else check=1; 
	}

	if(jack == 1)
	{
		if( Number(wbase.cjack2.text)>0 && Number(wbase.cjack3.text)>0 );
		else check=1;
	}

	//Material
	if(c_type == 1)
	{
		if(isec_encase == 1 || hss_fill == 1)
		{
			if(wsteel.bm1.status == 1 && wsteel.bme1.status == 1);
			else check=1;
		}
		else
		{
			if(wsteel.bm1.status == 1);
			else check=1;
		}
	}
	else if(c_type == 2)
	{
		if(jack == 1)
		{
			if(wconcr.bmc1.status == 1 && wconcr.bmr1.status == 1 && wconcr.bcj1.status == 1);
			else check=1;
		}
		else
		{
			if(wconcr.bmc1.status == 1 && wconcr.bmr1.status == 1);
			else check=1;
		}
	}
	
	//Column
	if(Number(wbase.tcd1.text)>0) ;
	else check=1;
	
	if(Number(wbase.tcd2.text)>0) ;
	else check=1;
	
	//Charge Mass
	if(Number(wbase.tcm1.text)>0) ;
	else check=1;

	//Dynamic Relaxation
	if(pre_blast_load == 2)
	{
		if(wbase.dr1.status == 1);
		else check=1;
	}

	return check;
}