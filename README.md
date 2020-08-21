# raw-milk-website
website so you can find your nearest United Kingdom raw-milk premises. Raw milk is non pasteurised milk, what you get from the cow without any further processing.

### Installation  
Install node.js  
extract the repository  
download postcode data from external site (https://www.ordnancesurvey.co.uk/business-government/products/code-point-open). and place in `/raw-milk-website/` folder. Then `python3  GetBGC.py`   
download region to country csv from external site(https://gist.github.com/radiac/d91d2ed1b971c03d49e9b7bd85e23f1c) to `/raw-milk-website/ folder`. Then `python3 region-postcode-write-json.py`  
download `geotools.js` from external site(https://www.nearby.org.uk/tests/GeoTools.html) to `/raw-milk-website/server/public/`   
download the raw milk csv files from external site(https://data.gov.uk/dataset/f6706084-9c82-4a50-a781-41e0e6229948/raw-drinking-milk-premises-in-england-wales-and-northern-ireland) to `/raw-milk-website/server/public`   
to start server `node theapp.js` from the `/raw-milk-website/server/` folder

access from `http://localhost:3003/milk.html`
