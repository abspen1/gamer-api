require('dotenv').config({ path: '.env' })
const axios = require('axios')

// Global Variables
const pass = process.env.COD
const email = process.env.EMAIL
const auth = process.env.SECRET
const BASE_URL = process.env.BASE_URL
var postData = new Object()
postData.Auth = auth
let jsonData

//Call of Duty API functions
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
    // API.MWmp("pr1vateryan2097", API.platforms.psn).then(data => {
    // console.log(data);  // see output
    // }).catch(err => {
    //     console.log(err);
    // });
    // API.MWFullMatchInfomp("13287832752335928754", API.platforms.psn).then(data => {
    // console.log(data);  // see output
    // }).catch(err => {
    //     console.log(err);
    // });
    // API.MWMapList(API.platforms.psn).then(data => {
    // console.log(data);  // see output
    // }).catch(err => {
    //     console.log(err);
    // });
    API.MWweeklystats("pr1vateryan2097", API.platforms.psn).then(data => {
    console.log(data.mp.all.properties);  // see output
    let kills = data.mp.all.properties.kills
    let kd = data.mp.all.properties.kdRatio
    let wl = data.mp.all.properties.wlRatio
    let message = `pr1vateryan2097 Call of Duty stats for the past week: \nKills: ${kills}\nKD: ${kd}\nWin/Loss: ${wl}`
    postData.Message = message
    jsonData = JSON.stringify(postData)
    postTweet(jsonData)
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err)
});

// Axios back-end post request function
const postTweet = async () => {
    try {
        axios({
          url: `${BASE_URL}/austinapi/go-tweet`,
          method: 'post',
          data: jsonData,
        })
          .then(function (response) {
            // your action after success
            console.log(response.data)
          })
          .catch(function (error) {
            // your action on error success
            console.log(error)
          })
    } catch (e) {
        console.error(e)
    }
}