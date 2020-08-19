import os
import csv
import argparse
import sys
import  json
from datetime import datetime

##iterate all records in the data
def dGen():
    current = 0
    fileno = 0

    f = "uk-counties-to-regions.csv"

    with open(f, newline='') as csvfile:
        areader = csv.reader(csvfile, delimiter=',',doublequote=False)
        #print(f)

        for row in areader:
            #count+=1
            #print(count)
            yield row

def go():
    #stuff
    out = {}

    for a in dGen():
        if a[1] == 'Region':
            continue

        #lower case the region for easier
        regionL = a[1].lower()

        if regionL not in out:
            out[regionL]=[a[0]]
        else:
            out[regionL].append(a[0])


    with open('region-postcode.json', 'w', encoding='utf-8') as f:
            json.dump(out, f,)


go()
