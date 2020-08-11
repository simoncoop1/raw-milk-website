import geopandas
import json
import sys

ps = json.loads(sys.argv[1])

# hold the results
res = {}

#a json array of postcodes to obtain grid codes for
#pp = json.loads(ps[0])


#loads the dataset of poscodes
pcode = geopandas.read_file('codepo_gb.gpkg')

for p in ps:

    #the default index remaining -1 indicates error
    i=-1
    for indx, val in enumerate(pcode['Postcode']):
        if val.replace(' ','') == p.replace(' ',''): #some of the postcodes have spaces
            print(indx)
            i = indx

    if i< 0:
        #raise ValueError("code not found "+p)
        continue

    #res.append([pcode['geometry'][i].x,pcode['geometry'][i].y])
    res[p.replace(' ','')]=[pcode['geometry'][i].x,pcode['geometry'][i].y]

#print("[\"" +pcode['geometry'][i].x + ")
#data = [[pcode['geometry'][i].x,pcode['geometry'][i].y]]
#print(pcode['geometry'][i].x)
#data = [[pcode['geometry'][i].x,pcode['geometry'][i].y]]

print(json.dumps(res,sort_keys=True))

