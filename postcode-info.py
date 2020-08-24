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

    f = "Codelist1.csv"

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
        
        #lower case the region for easier
        #regionL = a[1].lower()

        if "(DET)" in a[0]:
            continue

        if a[1] in out:
            print(a[1])
            raise Exception("key dupe")

        out[a[1]]=a[0]



    with open('postcode-info.json', 'w', encoding='utf-8') as f:
            json.dump(out, f,)


go()
