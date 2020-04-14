const csv = require('csv-parser')
const theData = {
    countries: {}
};
var i;
 
process.stdin  
    .pipe(csv())
    .on('data', (data) => {
        let country = data["Province_State"];
        if (!(country in theData.countries)) {
            console.error('adding entry for ' + country);
            theData.countries[country] = [];
            for (i=0; i < theData.days.length; i++) {
                theData.countries[country][i] = 0;
            }
        }
        for (i=0; i < theData.days.length; i++) {
            theData.countries[country][i] +=
                parseInt(data[theData.days[i]]);
        }
    })
    .on('headers', (headers) => {
        theData.days = headers.slice(12);
      })
    .on('end', () => {
        console.log("var theData = "+JSON.stringify(theData)+";");
    });