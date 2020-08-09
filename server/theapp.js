var express = require("express");
var theapp = express();
theapp.use(express.static('public'))

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
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

theapp.get("/url", (req, res, next) => {
    res.json(["this","is","my","test","server"]);
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

theapp.get("/data",(req,res,next) =>{

    fs.createReadStream('./public/registered-raw-drinking-milk-producers-as-at-1-august-2020.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //console.log(results);
            res.json(results);
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
        });

//    res.json(["the","result"]);
});

theapp.listen(3003, () => {
         console.log("Server running on port 3003");
});

