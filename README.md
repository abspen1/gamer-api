# Gamer API 
This project was made to have some fun interacting with Call of Duty API and using a twitter bot written in Go. The twitter bot is running on my back-end server and will tweet out when it receives a post request with authentification from this script. The twitter bot written in Go source code is [here](https://github.com/abspen1/go-backend)!

# To Do's 
* Need to code the post request still
* Figure out what I want the tweet to consist of e.g.
```
The boys are playing Call of Duty, they just won a game of <game type> at <map> <score - score>! #GoBot
```
* Instead of that we could just check the data every hour and tally up the wins and losses e.g.
```
The boys have been playing Call of Duty, in the past hour they are <wins> - <losses> playing <game type(s)>.
```
* Could combine the two e.g.
```
The boys have been playing Call of Duty, in the past hour they are <wins> - <losses>. Their most recent game was a <win/loss> in <game type> at <map> <score - score>! #GoBot
```