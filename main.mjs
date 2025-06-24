/************************************************
 * main.mjs
 * main entry for index.html
 * Written by Conor Church, Term 2 2025 
 * 
 * All variables to do with database written with fb_ but otherwise writen in camel case
************************************************* */
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');
var test = 1;
/***************************************************************/
// Import all external constants & functions required
/***************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_Initialise, fb_Authenticate,fb_RunRecords,fb_bobify,fb_get_high_score,fb_update_high_score,fb_update_high_score_COC,fb_read_sorted,fb_createAccount,
}
    from './records.mjs';
    window.fb_Initialise = fb_Initialise;
    window.fb_Authenticate = fb_Authenticate;
    window.fb_RunRecords = fb_RunRecords;
    window.fb_bobify = fb_bobify;
    window.fb_get_high_score = fb_get_high_score;
    window.fb_update_high_score = fb_update_high_score;
    window.fb_update_high_score_COC = fb_update_high_score_COC;
    window.fb_read_sorted = fb_read_sorted;
    window.fb_createAccount = fb_createAccount;
export{ fb_Authenticate}
/**************************************************************/
// index.html main code
/**************************************************************/
fb_Initialise();

var LeaderBoard = fb_read_sorted("PES")

console.log(LeaderBoard[0])
 fb_read_sorted("PES").then((_LeaderBoard) => {
console.log(_LeaderBoard)
console.log(_LeaderBoard[0].high_Score_PES)
var LeaderBoard = _LeaderBoard
    console.log(LeaderBoard)
    document.getElementById("#1").innerHTML = "#1     " + LeaderBoard[0].display_Name +"-"+LeaderBoard[0].high_Score_PES 
    document.getElementById("#2").innerHTML = "#2     " + LeaderBoard[1].display_Name +"-"+LeaderBoard[1].high_Score_PES 
    document.getElementById("#3").innerHTML = "#3     " + LeaderBoard[2].display_Name +"-"+LeaderBoard[2].high_Score_PES 
    document.getElementById("#4").innerHTML = "#4     " + LeaderBoard[3].display_Name +"-"+LeaderBoard[3].high_Score_PES 
    document.getElementById("#5").innerHTML = "#5     " + LeaderBoard[4].display_Name +"-"+LeaderBoard[4].high_Score_PES 
    document.getElementById("#6").innerHTML = "#6     " + LeaderBoard[5].display_Name +"-"+LeaderBoard[5].high_Score_PES 
    document.getElementById("#7").innerHTML = "#7     " + LeaderBoard[6].display_Name +"-"+LeaderBoard[6].high_Score_PES 
    document.getElementById("#8").innerHTML = "#8     " + LeaderBoard[7].display_Name +"-"+LeaderBoard[7].high_Score_PES 
    document.getElementById("#9").innerHTML = "#9     " + LeaderBoard[8].display_Name +"-"+LeaderBoard[8].high_Score_PES 
    document.getElementById("#10").innerHTML = "#10     " + LeaderBoard[9].display_Name +"-"+LeaderBoard[9].high_Score_PES 
 }).catch((error) => {
    console.log(error)
 });