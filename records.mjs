/************************************************
 * records.mjs
 * reading database records
 * Written by Conor Church, Term 2 2025 
 * 
 * All variables to do with database written with fb_ but otherwise writen in camel case
 * 
************************************************* */
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#FF69B4';	//  console.log for functions scheme
const COL_G = '#15ff00'
const COL_R = '#ff0000'
console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');
var fb_Db;
var userUid;
var userStats;
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export{
    fb_Initialise, fb_Authenticate,fb_RunRecords,fb_bobify
}


/***************************************************************
// function fb_Intitialise()
// called automatically on loading the page
// intatilises connecting to firebase
 ****************************************************************/
function fb_Initialise() {

    console.log('%c fb_Initialise(): ',
        'color: ' + COL_C +
        '; background-color: ' + COL_B + ';');
    console.log("%c galvinise:",
        'color:' + COL_B +
        '; background-color:' + COL_C + ';');
    const FB_GAMECONFIG = {
        apiKey: "AIzaSyCCqhJW7S5L9nSkhlB_8Nvg3zzD4w65hjU",
        authDomain: "comp-conor-church.firebaseapp.com",
        databaseURL: "https://comp-conor-church-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-conor-church",
        storageBucket: "comp-conor-church.firebasestorage.app",
        messagingSenderId: "807950196532",
        appId: "1:807950196532:web:44538dd1b8184ee5760f61",
        measurementId: "G-G7Z4YR3HX7"
    };
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG)
    fb_Db = getDatabase(FB_GAMEAPP)
    console.info(fb_Db);
}


/***************************************************************
// function fb_Authenticate()
// called by html button Log in 
// call functions from import to login the user
 ****************************************************************/
function fb_Authenticate() {
    console.log('%c authenticate():',
        'color:' + COL_C +
        'background-color:' + COL_B + ';');
    const AUTH = getAuth(); //something is wrong here
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        alert("thank you for signing correctly")
        userUid = result.user.uid;
        console.log(userUid)
        const REF = ref(fb_Db, "uid")
    })
        .catch((error) => {
            alert("Uh Oh, Something went wrong!")
            console.log(error)
        });
    

}

function fb_RunRecords(){

    if(userUid==null){
        alert("please log in")       
    }else{
         console.log('%c fb_RunRecords ',
            'color: ' + COL_C +
            '; background-color: ' + COL_B + ';');
        const dbReference = ref(fb_Db, "user_Data/" + userUid);
        get(dbReference).then((snapshot) => {
            var fb_data = snapshot.val();
            if (fb_data != null) {
                console.log('%c Record found! ',
                    'color: ' + COL_C +
                    '; background-color: ' + COL_G + ';');
                console.log(snapshot.val());
                userStats = Object.values(snapshot.val());
                //print out userStats
                console.log(userStats);
                document.getElementById("id").innerHTML(
                    "<p> i am the walrus</p>"
                )

            } else {
                console.log('%c Record NOT found ',
                    'color: ' + COL_C +
                    '; background-color: ' + COL_R + ';');

            }

        }).catch((error) => {
            console.log('%c Error! ',
                'color: ' + COL_C +
                '; background-color: ' + COL_R + ';');
            console.log(error);
        });        

    
    }
}
/***************************************************************
// function fb_bobify()
// called by html button "bobify username "
// increases "price" by 10%
 ****************************************************************/
function fb_bobify() {
    console.log('%c fb_updateRecord ',
        'color: ' + COL_C +
        '; background-color: ' + COL_B + ';');

    const dbReference = ref(fb_Db, "users_Data/" + userUid + "/display_Name");

    update(dbReference, {"Mr Bob"}).then(() => {
        console.log('%c Mr bobified your name ',
            'color: ' + COL_C +
            '; background-color: ' + COL_G + ';');
            alert("your username has been changed to mr bob")
    }).catch((error) => {
        console.log('%c Error! ',
            'color: ' + COL_C +
            '; background-color: ' + COL_R + ';');
        console.log(error);
    });
}
