# raw-milk-website
website so you can find your nearest United Kingdom raw-milk premises. Raw milk is non pasteurised milk, what you get from the cow without any further processing.

### Installation  
Install node.js  
extract the repository  
download postcode data from external site. and place in `/raw-milk-website/` folder. Then `python3  GetBGC.py`   
download region to country csv from external site to `/raw-milk-website/ folder`. Then `python3 region-postcode-write-json.py`  
download `geotools.js` to `/raw-milk-website/server/public/`   
download the raw milk csv files from external site to `/raw-milk-website/server/public`   
to start server `node theapp.js` from the `/raw-milk-website/server/` folder

access with `http://localhost:3003/milk.html`
