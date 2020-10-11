require('dotenv').config({ path: '.env' })
require('axios')

const pass = process.env.COD
const email = process.env.EMAIL
const user = process.env.USER
const API = require('call-of-duty-api')({ platform: "battle" });
// API.login(email, pass).then(data => {
//     //I want Warzone Data
//     API.MWBattleData(user, API.platforms.psn).then(data => {
//     console.log(data);  // see output
//     }).catch(err => {
//         console.log(err);
//     });
// }).catch(err => {
//     console.log(err)
// });

API.login(email, pass).then(data => {
    //I want Warzone Data
    API.MWcombatmp(user, API.platforms.psn).then(data => {
    console.log(data);  // see output
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err)
});