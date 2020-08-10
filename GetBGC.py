import geopandas
import json
import sys


ps = json.loads(sys.argv[1])

codestr = ps[0]

pcode = geopandas.read_file('codepo_gb.gpkg')

i=-1
for indx, val in enumerate(pcode['Postcode']):
    if val == 'NR1 1SL':
        print(indx)
        i = indx

if i< 0:
    raise ValueError

#print("[\"" +pcode['geometry'][i].x + ")
data = [[pcode['geometry'][i].x,pcode['geometry'][i].y]]
json.dumps(data,sort_keys=True,)

