# Gamer API 
This project was made to have some fun interacting with Call of Duty API and using a twitter bot written in Go. The twitter bot is running on my back-end server and will tweet out when it receives a post request with authentification from this script. The twitter bot written in Go source code is [here](https://github.com/abspen1/go-backend)!

# Functions
**Every hour checks API to see if there are new games played, if so make a post request to back-end server to tweet a tweet in this format:**

The boys have been playing Call of Duty, in the past hour they are < wins > - < losses >. Their most recent game was a < win/loss > in < game type > at < map > < score1 > - < score2 >! 

#GoBot

**Once a week checks API to get the weekly stats for multiple users:**

< user >'s Call of Duty stats for the past week:

Kills: < kills >

KD: < kd >

Win/Loss: < wl >

# Dependencies
* Redis - [ioredis](https://www.npmjs.com/package/ioredis)
* COD API - [call-of-duty-api](https://github.com/Lierrmm/Node-CallOfDuty)
* AUTH - [dotenv](https://www.npmjs.com/package/dotenv)
* HTTP Requests - [axios](https://www.npmjs.com/package/axios)