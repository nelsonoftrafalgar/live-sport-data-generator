## Project launch

`yarn install`

`yarn dev`

go to http://localhost:5173/


## Docs

LIVE DATA GENERATOR
- set initial score to 0-0
- game lasts for 60 seconds
- game has two different teams 
- team cannot have more than 1 game simultaneously
- team cannot play a game with itself 
- randomly insert new game into state 

LIVE DATA UPDATE
- decrease timeLeft each 1 second
- randomly update result each 1 second
- remove and return game after its time is over

SUMMARY BOARD
- add summary item based on finished game
- if game total score (team A score + team B score) matches a total score of a game in summary it should be inserted before this game 
- if game total score (team A score + team B score) doesn't match a total score of a game in summary it should be appended to summary 