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
var region_postcode = require('./region-postcode.json');

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

    var theData = [];//build json for response
    var sPC = req.params['postcode'].split(' ').join('').toUpperCase(); // the start postcode

    fs.createReadStream('./public/registered-raw-drinking-milk-producers-as-at-1-august-2020.csv')
        .pipe(csv())
        .on('data', function(data){addDistance(data,sPC,theData);})
        .on('end', () => {
            //console.log(results);
            res.json(theData);
        });
});


theapp.get("/data/:postcode/:animals/:rating/:region",(req,res,next) =>{

//res.json([req.params['animals'],req.params['rating'],req.params['region']]);


    var theData = [];//build json for response
    var sPC = req.params['postcode'].split(' ').join('').toUpperCase(); // the start postcode

    fs.createReadStream('./public/registered-raw-drinking-milk-producers-as-at-1-august-2020.csv')
        .pipe(csv())
        .on('data', function(data){

            //filter out only add distance to those that passed filters
            //on stuff reaching addDistance in added
            if ((req.params['animals'].indexOf("cows") > -1 & data['HasCows'] == 'YES')
                || req.params['animals'].indexOf("all") > -1
                || (req.params['animals'].indexOf("goats") > -1 & data['HasGoats'] == 'YES')
                || (req.params['animals'].indexOf("horses") > -1 & data['HasHorses'] == 'YES')
                || (req.params['animals'].indexOf("sheep") > -1 & data['HasSheep'] == 'YES')
                || (req.params['animals'].indexOf("buffalo") > -1 & data['HasBuffalo'] == 'YES')){
            
                if((req.params['rating'].indexOf("good") > -1 & data['ComplianceRating'] == 'GOOD')
                    || (req.params['rating'].indexOf("generally satisfactory") > -1 & data['ComplianceRating'] == 'GENERALLY SATISFACTORY')
                    || containsParam('all', req.params['rating'] )){
                    if(req.params['region'].indexOf("all") > -1 
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east of england") > -1 & addressIn("East of",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                        || (req.params['region'].indexOf("east midlands") > -1 & addressIn("East Midlands",data))
                    ){
                        if(data['ComplianceRating']== 'GENERALLY SATISFACTORY')
                        {
                            console.log("yes");
                        }
                        addDistance(data,sPC,theData);

                    }


                }




        }})
        .on('end', () => {
            //console.log(results);
            res.json(theData);
        });


});


//parameters are comma separating e.g cow,goat,
//function check if a parameter is present
function containsParam(p, paramstr){
    var ar = paramstr.split(',')
    for (const a  of ar){
            if(p == a){
                return true
            }
    }
    return false
}

function addDistance(dataIn, sPC, theDataOut){

    //var sPC = req.params['postcode'].split(' ').join('').toUpperCase();
    var ePC = dataIn['PostCode'].split(' ').join('').toUpperCase();

    if((sPC in postcode_BGC) && (ePC in postcode_BGC)){
        //create a osgb coordinate 
        osgb=new GT_OSGB();
        osgb.setGridCoordinates(postcode_BGC[sPC][0], postcode_BGC[sPC][1]);
        wgs84 = osgb.getWGS84();

        osgb2=new GT_OSGB();
        //console.log(ePC);
        osgb2.setGridCoordinates(postcode_BGC[ePC][0], postcode_BGC[ePC][1]);
        wgs842 = osgb2.getWGS84();

        dataIn['distance'] =  distance =  myHaversine([wgs84.longitude,wgs84.latitude],[wgs842.longitude,wgs842.latitude]);

        theDataOut.push(dataIn);

//        console.log(dataIn);
    }
    else{//the post codes grid can't be found
        dataIn['distance'] = '';
    }
}

function addressIn(a, b){
    return false;
}

theapp.listen(3003, () => {
         console.log("Server running on port 3003");
});

