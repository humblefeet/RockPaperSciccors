/*----- constants -----*/
const COUNTDOWN = 3;

/*----- app's state (variables) -----*/
var playerWeapon;
var computerWeapon;

var score;
var weapons = {
    r: "s",
    p: "r",
    s: "p"
};
var stage;

/*----- cached element references -----*/
var weaponBox = document.getElementById('weapons');
// var scoresBox = document.getElementById('scores');
var humanScore = document.getElementById('h-score');
var draw = document.getElementById('draw');
var ai = document.getElementById('c-score');
var resultText = document.querySelector('#results > p');
var resultsBox = document.getElementById('results');
var resetBtn = document.querySelector('footer > button');
var matchHumanScore = document.getElementById('h-mscore');
var matchComputerScore = document.getElementById('c-mscore');

/*----- event listeners -----*/
weaponBox.addEventListener('click', weaponClick);

resetBtn.addEventListener('click', initialize);
/*----- functions -----*/
function resetScores(){
    score.round.wins = 0;
    score.round.losses = 0;
    score.round.draws = 0;
}


function doCountdown(winner){
    var countRemaining = COUNTDOWN;
    resultText.textContent = countRemaining;
    var counter = setInterval(function(){
        countRemaining--;
        if(countRemaining){
            resultText.textContent = countRemaining;
        }else{
        clearInterval(counter);
            if(winner === "t"){
                score.round.draws++;
                resultText.textContent = "DRAW";
            }else if(winner === "w"){
                score.round.wins++;
                resultText.textContent = "Score!"
            }else{
                score.round.losses++;
                resultText.textContent = "Computer Score"
            }if(score.round.wins === 2){
                score.match.wins++;
                resetScores();
            }else if(score.round.losses === 2){
                score.match.losses++;
                resetScores();
        }stage = "results";
            reDraw();
            setTimeout(function(){
            stage = 'select';
            reDraw();
        }, 3000);
    } 500});

}


function getWinner(){
    if (playerWeapon === computerWeapon){
        return "t";
    }else{
        if (weapons[playerWeapon] === computerWeapon) {
            return "w";
        } else {
            return "l";     
        }
    }
}

function weaponClick(e){
    playerWeapon = e.target.alt;
    console.log("Player: " + playerWeapon);

    //randomly choose ai weapon
    var choices = Object.keys(weapons);
    var rand = Math.floor(Math.random() * 3);
    computerWeapon = choices[rand];
    console.log("Computer: " + computerWeapon);

    var winner = getWinner();
    stage = "countdown";
    reDraw();
    doCountdown(winner);
}


function reDraw(){
    humanScore.textContent = score.round.wins;
    ai.textContent = score.round.losses;
    draw.textContent = score.round.draws;
    matchHumanScore.textContent = score.match.wins;
    matchComputerScore.textContent = score.match.losses;

    switch (stage){
        case "select":
            // hide winner (display: none;)
            resultsBox.style.display = "none";
            //display weapons
            weaponBox.style.display = "block";
            break;
        case "countdown":
        case "results":
            //hide weapons
            weaponBox.style.display = "none";
            //do countdown if in this stage
            //interval displaying new countdown of 3,2,1, go!
            weaponBox.style.display = "block";
            break;
            //show the results of winner
            //what we do if nothing else 
    }
}


function initialize(){
    score ={
        round:{
            wins: 0,
            draws: 0,
            losses: 0
        },
        match:{
            wins: 0,
            losses: 0
        }
    };
    weapons={
        r: "s",
        p: "r",
        s: "p"
    };
    playerWeapon = 'r';
    computerWeapon = 'r';

    stage= "select";

    reDraw();
}


initialize();