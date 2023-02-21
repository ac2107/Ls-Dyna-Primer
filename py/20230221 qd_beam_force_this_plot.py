
# Filename: c:\Users\Anqi.Chen\Documents\Work\Projects\005_HS2_Headhouse\01_Mandeville\20210727 qd_beam_force_this.py
# Path: c:\Users\Anqi.Chen\Documents\Work\Projects\005_HS2_Headhouse\01_Mandeville
# Created Date: Tuesday, July 27th 2021, 9:14:43 am
# Author: Anqi Chen

# Copyright (c) 2021 Arup

# Function: use qd to envelope connection beam force using elout binary

# Note: 


import csv
import pandas as pd
import os 
import numpy as np

import matplotlib.pyplot as plt

from qd.cae.dyna import Binout

# find current path
dir_path = os.path.dirname(os.path.realpath(__file__)) + "\\"
print(dir_path)

# define file path
path_r1 = dir_path+"/run17_c07_updated"

# read "binout" file using qd
binout_1 = Binout(path_r1+"/binout")


# read beam element results
time = binout_1.read("elout", "beam", "time")                       # time
ids = binout_1.read("elout", "beam", "ids")[0]                      # beam element ids

vrtShear = binout_1.read("elout", "beam", "shear_t")/1000.0        	# major axis shear force - BFZ [kN]
hrzShear = binout_1.read("elout", "beam", "shear_s")/1000.0        	# minor axis shear force - BFY [kN]
Axial = binout_1.read("elout", "beam", "axial")/1000.0              # axial force            - BFX [kN]
 
vrtMoment = binout_1.read("elout", "beam", "moment_s")/1000.0      	# major axis moment - BMYY [kNm]
hrzMoment = binout_1.read("elout", "beam", "moment_t")/1000.0      	# minor axis moment - BMZZ [kNm]
Torsion = binout_1.read("elout", "beam", "torsion")/1000.0          # torsion           - BMXX [kNm]

mat = binout_1.read("elout", "beam", "mat")[0]                      # part ids for each beam element

# create force dictionary for easy access time history results 
force_dic = {
    "vrt_shear": vrtShear,
    "hrz_shear": hrzShear,
    "axial": Axial,
    "vrt_moment": vrtMoment,
    "hrz_moment": hrzMoment,
    "torsion": Torsion,
}

# enveloping beam connection force 
# read "beam_sets.csv"
file = open('beam_sets.csv', 'r')
lines = file.readlines()

beam_ref = []
section = []
bids = []

for item in lines:
    lst = item.strip().split(",")
    beam_ref.append(lst[0])
    section.append(lst[1])
    bid_list = list(filter(None, lst[2:]))    
    bids.append([int(x) for x in bid_list])

file.close()

# create dataframe to contain all data including force results
size = len(beam_ref)
zeros = [0.0]*size
forcedf = pd.DataFrame(list(zip(beam_ref, section, bids, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros, zeros)), 
                        columns = [ 'beam reference', 'section', 
                                    'beam ids',
                                    'max vrt_shear', 'max hrz_shear', 
                                    'max axial +ve', 'min axial -ve', 
                                    'max vrt_moment', 'max hrz_moment',
                                    'max torsion',
                                    'max vrt_shear bid', 'max hrz_shear bid', 
                                    'max axial +ve bid', 'min axial -ve bid', 
                                    'max vrt_moment bid', 'max hrz_moment bid',
                                    'max torsion bid',
                                    ])

for index, row in forcedf.iterrows():
    # loop beam elements for each beam reference/section

    max_vrt_shear = 0.0
    max_hrz_shear = 0.0

    max_axial_pos = 0.0
    min_axial_neg = 0.0
    
    max_vrt_moment = 0.0
    max_hrz_moment = 0.0
    max_torsion = 0.0

    for bid in row['beam ids']:
    	
		# index of bid in the ids list
        bindex = ids.tolist().index(bid) 

        vrt_shear = abs(force_dic['vrt_shear'][:, bindex])
        hrz_shear = abs(force_dic['hrz_shear'][:, bindex])

        axial = force_dic['axial'][:, bindex]

        vrt_moment = abs(force_dic['vrt_moment'][:, bindex])
        hrz_moment = abs(force_dic['hrz_moment'][:, bindex])
        torsion = abs(force_dic['torsion'][:, bindex])


        if max(vrt_shear) > max_vrt_shear:
            max_vrt_shear = max(vrt_shear)
            max_vrt_shear_bid = bid

        if max(hrz_shear) > max_hrz_shear:
            max_hrz_shear = max(hrz_shear)
            max_hrz_shear_bid = bid


        if max(axial) > max_axial_pos:
            max_axial_pos = max(axial)
            max_axial_pos_bid = bid           

        if min(axial) < min_axial_neg:
            min_axial_neg = min(axial)
            min_axial_neg_bid = bid   


        if max(vrt_moment) > max_vrt_moment:
            max_vrt_moment = max(vrt_moment)
            max_vrt_moment_bid = bid 

        if max(hrz_moment) > max_hrz_moment:
            max_hrz_moment = max(hrz_moment)
            max_hrz_moment_bid = bid 

        if max(torsion) > max_torsion:
            max_torsion = max(torsion)
            max_torsion_bid = bid 


    # update envelope forces
    forcedf.at[index, 'max vrt_shear'] = round(max_vrt_shear, 0)
    forcedf.at[index, 'max hrz_shear'] = round(max_hrz_shear, 0)

    forcedf.at[index, 'max axial +ve'] = round(max_axial_pos, 0)
    forcedf.at[index, 'min axial -ve'] = round(min_axial_neg, 0)
    
    forcedf.at[index, 'max vrt_moment'] = round(max_vrt_moment, 0)
    forcedf.at[index, 'max hrz_moment'] = round(max_hrz_moment, 0)
    forcedf.at[index, 'max torsion'] = round(max_torsion, 0)
    
    # update the envelope beam element 
    forcedf.at[index, 'max vrt_shear bid'] = int(max_vrt_shear_bid)
    forcedf.at[index, 'max hrz_shear bid'] = int(max_hrz_shear_bid)

    forcedf.at[index, 'max axial +ve bid'] = int(max_axial_pos_bid)
    forcedf.at[index, 'min axial -ve bid'] = int(min_axial_neg_bid)
    
    forcedf.at[index, 'max vrt_moment bid'] = int(max_vrt_moment_bid)
    forcedf.at[index, 'max hrz_moment bid'] = int(max_hrz_moment_bid)
    forcedf.at[index, 'max torsion bid'] = int(max_torsion_bid)

    
# change data type
forcedf = forcedf.astype({"max vrt_shear bid": int, 
                          "max hrz_shear bid": int, 
                          "max axial +ve bid": int, 
                          "min axial -ve bid": int, 
                          "max vrt_moment bid": int, 
                          "max hrz_moment bid": int, 
                          "max torsion bid": int, }
)

# write out force results
forcedf.to_csv('beam connection envelope forces.csv')

# use "forcedf" dataframe to plot out time histories of the beam connections
for index, row in forcedf.iterrows():
	
	#get beam element id
	max_vrt_shear_bid = row['max vrt_shear bid']
	max_hrz_shear_bid = row['max hrz_shear bid']
	max_axial_pos_bid = row['max axial +ve bid']
	min_axial_neg_bid = row['min axial -ve bid']
	max_vrt_moment_bid = row['max vrt_moment bid']
	max_hrz_moment_bid = row['max hrz_moment bid']
	max_torsion_bid = row['max torsion bid']
 
    # index of bid in the ids list
	max_vrt_shear_bindex = ids.tolist().index(max_vrt_shear_bid)
	max_hrz_shear_bindex = ids.tolist().index(max_hrz_shear_bid) 
	max_axial_pos_bindex = ids.tolist().index(max_axial_pos_bid) 
	min_axial_neg_bindex = ids.tolist().index(min_axial_neg_bid) 
	max_vrt_moment_bindex = ids.tolist().index(max_vrt_moment_bid) 
	max_hrz_moment_bindex = ids.tolist().index(max_hrz_moment_bid) 
	max_torsion_bindex = ids.tolist().index(max_torsion_bid) 
    
	# plot - checking beam force time history 
	t = time
 
	max_vrt_shear_y = 	force_dic['vrt_shear'][:, int(max_vrt_shear_bindex)]
	max_hrz_shear_y = 	force_dic['hrz_shear'][:, max_hrz_shear_bindex] 
	max_axial_pos_y = 	force_dic['axial'][:, max_axial_pos_bindex] 
	min_axial_neg_y = 	force_dic['axial'][:, min_axial_neg_bindex] 
	max_vrt_moment_y = 	force_dic['vrt_moment'][:, max_vrt_moment_bindex]
	max_hrz_moment_y = 	force_dic['hrz_moment'][:, max_hrz_moment_bindex] 
	max_torsion_y = 	force_dic['torsion'][:, max_torsion_bindex]

	fig, ax = plt.subplots()
	ax.plot(t, max_vrt_shear_y, label = 'max_vrt_shear eid=' + str(max_vrt_shear_bid))
	ax.plot(t, max_hrz_shear_y, label = 'max_hrz_shear eid=' + str(max_hrz_shear_bid))
	ax.plot(t, max_axial_pos_y, label = 'max_axial_pos eid=' + str(max_axial_pos_bid))
	ax.plot(t, min_axial_neg_y, label = 'min_axial_neg eid=' + str(min_axial_neg_bid))
	ax.plot(t, max_vrt_moment_y, label = 'max_vrt_moment eid=' + str(max_vrt_moment_bid))
	ax.plot(t, max_hrz_moment_y, label = 'max_hrz_moment eid=' + str(max_hrz_moment_bid))
	ax.plot(t, max_torsion_y, label = 'max_torsion eid=' + str(max_torsion_bid))

	ax.set_xlim(0.99, 2.0)
	ax.set_title(row['beam reference'])	

	ax.grid()
	ax.legend()
	
	figname = row['beam reference']
	fig.savefig(figname, bbox_inches='tight')
	plt.close(fig)

