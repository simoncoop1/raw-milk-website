var express = require("express");
var theapp = express();
theapp.use(express.static('public'))

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 

var fs2 = require('fs');

// file is included here:
eval(fs2.readFileSync('./public/geotools.js')+'');

var fs3 = require('fs');
eval(fs3.readFileSync('./public/my-haversine.js')+'');



fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
      console.log(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
  });

var postcode_BGC = require('./postcode-BGC.json');

theapp.get("/url", (req, res, next) => {
    res.json(["this","is","my","test","server"]);
});

theapp.get("/postcode-bgc/:postcode", (req, res, next) => {
    
    //iterate postcode_BGC
    res.json(postcode_BGC[req.params['postcode'].split(' ').join('').toUpperCase()]);

});

theapp.get("/files", (req,res,next) => {

    const testFolder = './public/';
    var csvf = [];

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            //console.log(file);
      //      console.log(file.split('.').pop());
            if(file.split('.').pop() == 'csv'){
                csvf.push(file);
            }
        });
        res.json(csvf);
    });
    //console.log(csvf);

    //res.json(['the','files','are','returned','here']);
    
});

theapp.get("/data/:postcode",(req,res,next) =>{

    //results.length = 0;

    var theData = [];

    fs.createReadStream('./public/registered-raw-drinking-milk-producers-as-at-1-august-2020.csv')
        .pipe(csv())
        .on('data', (data) => {

            var sPC = req.params['postcode'].split(' ').join('').toUpperCase();
            var ePC = data['PostCode'].split(' ').join('').toUpperCase();

            if((sPC in postcode_BGC) && (ePC in postcode_BGC)){
                //create a osgb coordinate 
                osgb=new GT_OSGB(); 
                osgb.setGridCoordinates(postcode_BGC[sPC][0], postcode_BGC[sPC][1]); 
                wgs84 = osgb.getWGS84(); 

                osgb2=new GT_OSGB(); 
                console.log(ePC);
                osgb2.setGridCoordinates(postcode_BGC[ePC][0], postcode_BGC[ePC][1]); 
                wgs842 = osgb2.getWGS84();

                data['distance'] =  distance =  myHaversine([wgs84.longitude,wgs84.latitude],[wgs842.longitude,wgs842.latitude]);


                theData.push(data);
                console.log(data);
            }
            else{//the post codes grid can't be found
                data['distance'] = '';
            }
            
        })
        .on('end', () => {
            //console.log(results);
            res.json(theData);
        });

});

theapp.listen(3003, () => {
         console.log("Server running on port 3003");
});

