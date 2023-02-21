
# Filename: c:\Users\Anqi.Chen\Documents\Work\Projects\005_HS2_Headhouse\01_Mandeville\20210727 qd_beam_force_this.py
# Path: c:\Users\Anqi.Chen\Documents\Work\Projects\005_HS2_Headhouse\01_Mandeville
# Created Date: Tuesday, July 27th 2021, 9:14:43 am
# Author: Anqi Chen

# Copyright (c) 2021 Arup

# Function: use qd to envelope connection beam force using elout binary

# Note: 

#%%

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


#%%
# plot - checking beam force time history 

p_flag = 1

if p_flag == 1:
    bid = 42957 # individual beam element id
    bindex = ids.tolist().index(bid) # index of bid in the ids list
    force = "axial"

    t = time
    y = force_dic[force][:, bindex]

    fig, ax = plt.subplots()
    ax.plot(t, y, 'r-',)

    ax.set_xlim(0.99, 2.0)
    ax.set_title("| " + force + " | " + "Beam ID = " + str(bid) + " |")
    ax.grid()

#%%
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


# create dataframe to contain all data including force results
size = len(beam_ref)
zeros = [0.0]*size
forcedf = pd.DataFrame(list(zip(beam_ref, section, bids, zeros, zeros, zeros, zeros, zeros, zeros, zeros)), 
                        columns = ['beam reference', 'section', 'beam ids',
                                    'max vrt_shear', 'max hrz_shear', 'max axial +ve', 'min axial -ve', 
                                    'max vrt_moment', 'max hrz_moment' ,'max torsion'])

# enveloping forces and fill the dataframe
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
       
        bindex = ids.tolist().index(bid) # index of bid in the ids list

        vrt_shear = abs(force_dic['vrt_shear'][:, bindex])
        hrz_shear = abs(force_dic['hrz_shear'][:, bindex])

        axial = force_dic['axial'][:, bindex]

        vrt_moment = abs(force_dic['vrt_moment'][:, bindex])
        hrz_moment = abs(force_dic['hrz_moment'][:, bindex])
        torsion = abs(force_dic['torsion'][:, bindex])


        if max(vrt_shear) > max_vrt_shear:
            max_vrt_shear = max(vrt_shear)

        if max(hrz_shear) > max_hrz_shear:
            max_hrz_shear = max(hrz_shear)


        if max(axial) > max_axial_pos:
            max_axial_pos = max(axial)         

        if min(axial) < min_axial_neg:
            min_axial_neg = min(axial)   


        if max(vrt_moment) > max_vrt_moment:
            max_vrt_moment = max(vrt_moment)

        if max(hrz_moment) > max_hrz_moment:
            max_hrz_moment = max(hrz_moment)

        if max(torsion) > max_torsion:
            max_torsion = max(torsion)


    # update envelope forces
    forcedf.at[index, 'max vrt_shear'] = round(max_vrt_shear, 0)
    forcedf.at[index, 'max hrz_shear'] = round(max_hrz_shear, 0)

    forcedf.at[index, 'max axial +ve'] = round(max_axial_pos, 0)
    forcedf.at[index, 'min axial -ve'] = round(min_axial_neg, 0)
    
    forcedf.at[index, 'max vrt_moment'] = round(max_vrt_moment, 0)
    forcedf.at[index, 'max hrz_moment'] = round(max_hrz_moment, 0)
    forcedf.at[index, 'max torsion'] = round(max_torsion, 0)

# write out force results
forcedf.to_csv('beam connection envelope forces.csv')


#%%
"""
# set type of beam force
fType = "shear_t"  # <<< INPUT <<<  

# read resutls for all load cases 
df1 = pd.DataFrame(binout_1.read("elout", "beam", fType)/1000.0, columns=ids)
df1.insert(0, "time", binout_1.read("elout", "beam", "time"))

df2 = pd.DataFrame(binout_2.read("elout", "beam", fType)/1000.0, columns=ids)
df2.insert(0, "time", binout_2.read("elout", "beam", "time"))

df3 = pd.DataFrame(binout_3.read("elout", "beam", fType)/1000.0, columns=ids)
df3.insert(0, "time", binout_3.read("elout", "beam", "time"))


# envelope force 

# set beam ID 
bid = 35001 # <<< INPUT <<<  

bset = [] # beam elements of the same section type/part id as "bid"
for b in ids.tolist():
    # print(b, mat[ids.tolist().index(b)])
    if mat[ids.tolist().index(b)] == mat[ids.tolist().index(bid)] : 
        bset.append(b)

f_max = 0
bid_max = 0
load_case_max = 0

df_list = [df1, df2, df3]

for b in bset:
    # print(b)
    lc = 1  # inital load case number, i.e. df1
    for df in df_list:
        connection_force = abs(df[b])
        # print(max(connection_force), lc)
        if max(connection_force) > f_max:    
            f_max = max(connection_force)
            bid_max = b
            load_case_max = lc
        lc = lc + 1 # iterate load case number

print("envelope beam element =", bid, "for", fType)
print("bid_max =", bid_max,  "; max force =", f_max, "; load case = PBIED", load_case_max)


# plot time histories
fig, ax = plt.subplots()

# plot the envloping time-history  (bid_max)

t_env = df_list[load_case_max-1]["time"]
f_env = df_list[load_case_max-1][bid_max]

ax.plot(t_env, f_env, "r--", label = "envelope bid = " + str(bid_max) + ", PBIED_" + str(load_case_max))

if abs(max(f_env)) > abs(min(f_env)):
    f_env_max = max(f_env)
elif abs(max(f_env)) < abs(min(f_env)):
    f_env_max = min(f_env)
else:
    f_env_max = 0

xb = t_env[f_env.tolist().index(f_env_max)]
yb = f_env_max

props = dict(boxstyle='round', facecolor='white', alpha=0.9)
ax.text(xb*1.0, yb*1.1, round(f_env_max,1), bbox=props)


# force time histories for the selected beam element "bid"
c = 1
for df in [df1, df2, df3]:  #binout_2, binout_3

    ax.plot(df["time"], df[bid], label = "PBIED_" + str(c), linewidth = 0.5)
    c = c + 1

ax.set_xlim(1.0, 1.01)
ax.set_title("Beam ID = " + str(bid) + " | force type = " + fType)
ax.legend(loc = 1, bbox_to_anchor=(1.65, 0.5),)
ax.set_xlabel("time [sec]")
ax.set_ylabel("force [kN or kNm]")

# plot
# t = time
# y = vrt_shear[:, bpos[0][0]]

# fig, ax = plt.subplots()
# ax.plot(t, y, 'r-',)

# ax.set_xlim(0.999, 1.01)
# ax.set_title("Beam ID = " + str(bid))

"""