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
import { fb_Initialise, fb_Authenticate,fb_RunRecords,fb_bobify,fb_get_high_score,fb_update_high_score,fb_update_high_score_COC,fb_read_sorted,fb_createAccount,fb_profileAuthState,fb_NewUserName
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
    window.fb_profileAuthState = fb_profileAuthState;
    window.show_user_name_input = show_user_name_input;
    window.fb_NewUserName = fb_NewUserName;
    
export{ fb_Authenticate}
/**************************************************************/
// index.html main code
/**************************************************************/
fb_Initialise();
   
fb_profileAuthState();

function show_user_name_input(){
    console.log("showing form")
    document.getElementById("formChange").style = "display:inline-block"

}

var LeaderBoard = fb_read_sorted("PES")

console.log(LeaderBoard[0])
 fb_read_sorted("PES").then((_LeaderBoard) => {
console.log(_LeaderBoard)
console.log(_LeaderBoard[0].high_Score_PES)
var LeaderBoard = _LeaderBoard;
LeaderBoard = LeaderBoard.sort(function(a, b){return b.high_Score_PES- a.high_Score_PES});
//".read":"true === root.hasChild('admin').hasChild(${uid}) || auth.uid != null",
console.log(document.getElementById("1PES") !== undefined)
const PES_EXIST = document.getElementById("#1PES")
console.log(PES_EXIST)
if(PES_EXIST !== null){
    console.log("adding PES leaderboard")
    console.log(LeaderBoard)
    document.getElementById("#1PES").innerHTML = "#1     " + LeaderBoard[0].display_Name +"-"+LeaderBoard[0].high_Score_PES 
    document.getElementById("#2PES").innerHTML = "#2     " + LeaderBoard[1].display_Name +"-"+LeaderBoard[1].high_Score_PES 
    document.getElementById("#3PES").innerHTML = "#3     " + LeaderBoard[2].display_Name +"-"+LeaderBoard[2].high_Score_PES 
    document.getElementById("#4PES").innerHTML = "#4     " + LeaderBoard[3].display_Name +"-"+LeaderBoard[3].high_Score_PES 
    document.getElementById("#5PES").innerHTML = "#5     " + LeaderBoard[4].display_Name +"-"+LeaderBoard[4].high_Score_PES 
    document.getElementById("#6PES").innerHTML = "#6     " + LeaderBoard[5].display_Name +"-"+LeaderBoard[5].high_Score_PES 
    document.getElementById("#7PES").innerHTML = "#7     " + LeaderBoard[6].display_Name +"-"+LeaderBoard[6].high_Score_PES 
    document.getElementById("#8PES").innerHTML = "#8     " + LeaderBoard[7].display_Name +"-"+LeaderBoard[7].high_Score_PES 
    document.getElementById("#9PES").innerHTML = "#9     " + LeaderBoard[8].display_Name +"-"+LeaderBoard[8].high_Score_PES 
    document.getElementById("#10PES").innerHTML = "#10     " + LeaderBoard[9].display_Name +"-"+LeaderBoard[9].high_Score_PES 
}
const COC_EXIST = document.getElementById("#1COC")
console.log(COC_EXIST)
if (COC_EXIST !== null){
    LeaderBoard = LeaderBoard.sort(function(a, b){return b.high_Score_COC- a.high_Score_COC});
    console.log(LeaderBoard)
        document.getElementById("#1COC").innerHTML = "#1     " + LeaderBoard[0].display_Name +"-"+LeaderBoard[0].high_Score_COC 
        document.getElementById("#2COC").innerHTML = "#2     " + LeaderBoard[1].display_Name +"-"+LeaderBoard[1].high_Score_COC
        document.getElementById("#3COC").innerHTML = "#3     " + LeaderBoard[2].display_Name +"-"+LeaderBoard[2].high_Score_COC 
        document.getElementById("#4COC").innerHTML = "#4     " + LeaderBoard[3].display_Name +"-"+LeaderBoard[3].high_Score_COC
        document.getElementById("#5COC").innerHTML = "#5     " + LeaderBoard[4].display_Name +"-"+LeaderBoard[4].high_Score_COC 
        document.getElementById("#6COC").innerHTML = "#6     " + LeaderBoard[5].display_Name +"-"+LeaderBoard[5].high_Score_COC
        document.getElementById("#7COC").innerHTML = "#7     " + LeaderBoard[6].display_Name +"-"+LeaderBoard[6].high_Score_COC
        document.getElementById("#8COC").innerHTML = "#8     " + LeaderBoard[7].display_Name +"-"+LeaderBoard[7].high_Score_COC
        document.getElementById("#9COC").innerHTML = "#9     " + LeaderBoard[8].display_Name +"-"+LeaderBoard[8].high_Score_COC
        document.getElementById("#10COC").innerHTML = "#10     " + LeaderBoard[9].display_Name +"-"+LeaderBoard[9].high_Score_COC
}
 }).catch((error) => {
    console.log(error)
 });