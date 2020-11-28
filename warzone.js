require('dotenv').config({ path: '.env' })
const pass = process.env.COD
const email = process.env.EMAIL

//Call of Duty API functions
const API = require('call-of-duty-api')({ platform: "battle" });


API.login(email, pass).then(data => {
    //I want Warzone Data
    API.MWBattleData("pr1vateryan2097", API.platforms.psn).then(data => {
    console.log(data);  // see output
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err)
});