require('dotenv').config({ path: '.env' })
var Redis = require('ioredis')
const axios = require('axios')

// Global Variables
const pass = process.env.COD
const email = process.env.EMAIL
const auth = process.env.SECRET
const BASE_URL = process.env.BASE_URL
const host = process.env.HOST
const redisPass = process.env.REDIS
var flag = false
var winCount = 0
var lossCount = 0
let winLoss = ""
let team1Score = 0
let team2Score = 0
let mode = ""

var postData = new Object()
postData.Auth = auth
let jsonData

var client = new Redis({
    port: 6379,          // Redis port
    host: host,   // Redis host
    password: redisPass,
    db: 3,
})

// Test Redis connection
client.get("foo").then((res) => console.log(res))
// client.del("pr_matches")
// client.smembers("pr_matches").then((res) => console.log(res))

//Call of Duty API functions
const API = require('call-of-duty-api')({ platform: "battle" });

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

function saddMatch(matchID) {
    client.sadd("pr_matches", matchID)
}

async function setUpTweet() {
    let message = `The boys have been playing Call of Duty, in the past hour they are ${winCount} - ${lossCount}. Their most recent game was a ${winLoss} playing ${mode}, ${team1Score} - ${team2Score}!`
    postData.Message = message
    jsonData = JSON.stringify(postData)
    postTweet()
}

function clearVars() {
    flag = false
    winCount = 0
    lossCount = 0
}

setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getMinutes() === 0){ // Check the time for beginning of an hour
        API.login(email, pass).then(data => {
            API.MWcombatmp("pr1vateryan2097", API.platforms.psn).then(data => {
                let operations = 0
                for (i in data.matches) {
                    if (operations === 0){ // The first match is most recent
                        winLoss = data.matches[i].result
                        team1Score = data.matches[i].team1Score
                        team2Score = data.matches[i].team2Score
                        mode = data.matches[i].mode
                        operations++
                    }
                    let matchID = data.matches[i].matchID.toString()
                    let wlRes = data.matches[i].result
                    client.sismember("pr_matches", matchID).then(function (res) {
                        if (res !== true) {
                            flag = true
                            if (wlRes === "win") {
                                winCount++
                            } else {
                                lossCount++
                            }
                            saddMatch(matchID)
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err)
        });
    }
    if(date.getMinutes() === 1) {
        if (flag) {
            setUpTweet()
        } else {
            console.log("No new data this hour")
        }
    }
    if(date.getMinutes() === 10) {
        clearVars()
    }
    if (date.getUTCDay() === 7 && date.getHours() === 18 && date.getMinutes() === 30){ // Check day of the week for Sunday
        API.login(email, pass).then(data => {     
            API.MWweeklystats("pr1vateryan2097", API.platforms.psn).then(data => {
                // console.log(data.mp.all.properties);  // see output
                let kills = data.mp.all.properties.kills
                let kd = data.mp.all.properties.kdRatio
                let wl = data.mp.all.properties.wlRatio
                let message = `pr1vateryan2097's Call of Duty stats for the past week: \nKills: ${kills}\nKD: ${kd}\nWin/Loss: ${wl}`
                postData.Message = message
                jsonData = JSON.stringify(postData)
                postTweet(jsonData)
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err)
        });
        API.login(email, pass).then(data => {     
            API.MWweeklystats("pteromattical", API.platforms.psn).then(data => {
                // console.log(data.mp.all.properties);  // see output
                let kills = data.mp.all.properties.kills
                let kd = data.mp.all.properties.kdRatio
                let wl = data.mp.all.properties.wlRatio
                let message = `pteromattical's Call of Duty stats for the past week: \nKills: ${kills}\nKD: ${kd}\nWin/Loss: ${wl}`
                postData.Message = message
                jsonData = JSON.stringify(postData)
                postTweet(jsonData)
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err)
        });
    }
}, 60000); // Repeat every 60000 milliseconds (1 minute)


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

// API.login(email, pass).then(data => {
//     API.MWcombatmp("pr1vateryan2097", API.platforms.psn).then(data => {
//     for (i in data.matches) {
//         let matchID = data.matches[i].matchID.toString()
//         result = data.matches[i].result
//         team1Score = data.matches[i].team1Score
//         team2Score = data.matches[i].team2Score
//         mode = data.matches[i].mode

//         if (client.sismember("pr_matches", matchID)) {
//             continue
//         } else {
//             flag = true
//             if (result == 'win') {
//                 winCount++
//             } else {
//                 lossCount++
//             }
//             saddMatch(matchID)
//         }
//     }
//     }).catch(err => {
//         console.log(err);
//     });
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
    // API.MWweeklystats("pr1vateryan2097", API.platforms.psn).then(data => {
    // console.log(data.mp.all.properties);  // see output
    // let kills = data.mp.all.properties.kills
    // let kd = data.mp.all.properties.kdRatio
    // let wl = data.mp.all.properties.wlRatio
    // let message = `pr1vateryan2097 Call of Duty stats for the past week: \nKills: ${kills}\nKD: ${kd}\nWin/Loss: ${wl}`
    // postData.Message = message
    // jsonData = JSON.stringify(postData)
    // postTweet(jsonData)
    // }).catch(err => {
    //     console.log(err);
    // });
// }).catch(err => {
//     console.log(err)
// });