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
var userEmail;
var userPhoto;
console.log(userUid)
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getDatabase, query, orderByChild,orderByValue, limitToLast,limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set, get, update, }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export{
    fb_Initialise, fb_Authenticate,fb_RunRecords,fb_bobify,fb_get_high_score,fb_update_high_score,fb_update_high_score_COC,fb_read_sorted,
    fb_createAccount,fb_profileAuthState,fb_NewUserName
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
    const AUTH = getAuth(); 
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    //login to users email
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        document.getElementById("playertalk").style = "display:inline-block"
        document.getElementById("playertalk").innerHTML = "thank you for signing in correctly!"
        //take users uid, email, and photo url
        userUid = result.user.uid;
        userEmail = result.user.email;
        userPhoto = result.user.photoURL;
        console.log(userPhoto);
        console.log(userUid)
        const REF = ref(fb_Db, "uid")

        //see if they have logged in before:
         const dbReference = ref(fb_Db, "user_Data/" + userUid +"/display_Name");
        get(dbReference).then((snapshot) => {
             var firstName = snapshot.val();

             //if they haven't, make them choose username
             if (firstName == null){              
                document.getElementById("playertalk").innerHTML = "Seems like you haven't made an account yet, "
                document.getElementById("form").style = "display: inline-block"
             } else{
                
            document.getElementById("playertalk").innerHTML = "welcome back!"
                            document.getElementById("form").style = "display:none"
                            document.getElementById("user_name_bobify").style = "display:inline-block";
                            document.getElementById("user_name_change").style = "display:inline-block";
                            document.getElementById("PESLINK").style = "display:inline-block"
                            document.getElementById("COCLINK").style = "display:inline-block"
                            document.getElementById("signIn").innerHTML = "<p>User Name:"+firstName+"</p>"
                            document.getElementById("profile_picture").innerHTML =" <img src= "+ userPhoto +" alt='Your Profile Picture!'>"
             }
        })
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
                userStats = snapshot.val();
                //print out userStats
                console.log(userStats);
                document.getElementById("user_name_bobify").style = "display:inline-block";
                document.getElementById("user_name_change").style = "display:inline-block";
                document.getElementById("displayName").innerHTML = "hello "+userStats.display_Name+"!";
                document.getElementById("highScoreCOC").innerHTML = "Coin Collector High Score:"+userStats[2];
                document.getElementById("highScorePES").innerHTML = "Pink Egg Simulator High Score:"+userStats[3];
                document.getElementById("userAge").innerHTML = "Age:"+userStats[5]
            }else{
                console.log('%c Record NOT found ',
                    'color: ' + COL_C +
                    '; background-color: ' + COL_R + ';');

            }

        }).catch((error) => {
            console.log('%c Error! ',
                'color: ' + COL_C +
                '; background-color: ' + COL_R + ';');
            console.log(error);
        })  
    }
}

/***************************************************************
// function fb_bobify()
// called by html button "bobify username "
// changes display name to "mr Bob"
 ****************************************************************/
function fb_bobify() {
    console.log('%c fb_updateRecord ',
        'color: ' + COL_C +
        '; background-color: ' + COL_B + ';');

    const dbReference = ref(fb_Db, "user_Data/" + userUid);

    update(dbReference, {display_Name:"Mr Bob"}).then(() => {
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
/***************************************************************
// function fb_get_high_score()
// called on running dying in games
// finds value of highscore of that game
 ****************************************************************/
 function fb_get_high_score(_game){
    console.log("fb_get_high_score()");
    return new Promise((resolve, reject) =>{
        //write down database path
        const dbReference = ref(fb_Db, "/user_Data/" + userUid + "/high_Score_"+_game);
        //use "get()"function to find value of highscore
        get(dbReference).then((snapshot) => {
            console.log(snapshot);
            console.log(snapshot.val());
            var fb_data = snapshot.val();
            if (fb_data != null) {
                console.log('Record found!');
                console.log(fb_data);
                resolve(fb_data);
            } else {
                console.log('Record NOT found');
                resolve("failed");
            }

        }).catch((error) => {
            console.log('Error!');
            reject(error); 
        });
    })
}
 

/***************************************************************
// function fb_update_high_score()
// called on getting a higher score of a game
// updates users high score to current high score
****************************************************************/
function fb_update_high_score(_newHighScore){
    console.log("fb_update_high_score(_newHighScore)");
    console.log(_newHighScore)
    const dbReference = ref(fb_Db, "user_Data/" + userUid);
    update(dbReference,{ high_Score_PES:_newHighScore}).then(() => {
        console.log('%c highscore updated! ',
            'color: ' + COL_C +
            '; background-color: ' + COL_G + ';');
    }).catch((error) => {
        console.log('%c Error! ',
            'color: ' + COL_C +
            '; background-color: ' + COL_R + ';');
        console.log(error);
    });
}
/***************************************************************
// function fb_update_high_score_COC()
// called on getting a higher score of a game of Coin Collector 
// updates users high score to current high score
****************************************************************/
function fb_update_high_score_COC(newHighScore){
       console.log("fb_update_high_score(_newHighScore)");
    console.log(newHighScore)
    const dbReference = ref(fb_Db, "user_Data/" + userUid);
    update(dbReference,{ high_Score_COC:newHighScore}).then(() => {
        console.log('%c highscore updated! ',
            'color: ' + COL_C +
            '; background-color: ' + COL_G + ';');
    }).catch((error) => {
        console.log('%c Error! ',
            'color: ' + COL_C +
            '; background-color: ' + COL_R + ';');
        console.log(error);
    });
}
/***************************************************************
// function fb_read_sorted()
// called on loading onto a website
// updates users high score to current high score
****************************************************************/
function fb_read_sorted(_games) {
    const SORTKEY = "high_Score_" + _games
    console.log(SORTKEY)
    return new Promise((resolve, reject) => {
        const dbReference = query(ref(fb_Db, "user_Data"), orderByChild(SORTKEY), limitToLast(100))
        get(dbReference).then((snapshot) => {
            var fb_data = snapshot.val();
            console.log(fb_data);
            if (fb_data != null) {
                resolve(Object.values(fb_data));

            } else {
                console.log("something went wrong")
                resolve("failedd")

            }

        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })

}


function fb_NewUserName(){
    var new_Name = document.getElementById('formChange').value 
console.log("update username")
console.log(new_Name)
    if(new_Name !== null || new_Name !== undefined || new_Name !== ""|| new_Name !== " "){
        const dbReference = ref(fb_Db, "/user_Data/" + userUid);
        update(dbReference,{"display_Name":new_Name}).then(() => {
            console.log(new_Name)
        }).catch((error) => {
            console.log('%c Error! ',
                'color: ' + COL_C +
                '; background-color: ' + COL_R + ';');
            console.log(error);
        });
}else{
    document.getElementById("playertalk").innerHTML = "invalid username"
}
}
function fb_createAccount(){
                //run through and write records for all games
                var firstName = document.getElementById('name').value
                if(firstName !== null||firstName !== undefined ||firstName!==""||firstName==" "){
                    console.log(firstName)
                    var firstAge;
                    firstAge = document.getElementById("userage").value
                    if(Number.isInteger(firstAge)){
                    if(firstAge !== null|| firstAge !==undefined||firstAge !==""||firstAge!=="e"||firstAge !== 120 ||firstAge>0){
                   console.log("why isn't it working? why? why?")
                        const REF = ref(fb_Db, "user_Data/"+ userUid)
                        set(REF, {display_Name:firstName,
                            email:userEmail,
                            high_Score_COC:0,
                            high_Score_PES:0,
                            photo_URL:userPhoto,
                            age:firstAge
                            }).then(() => {
                            console.log("PLEASE WORK")
                            document.getElementById("playertalk").innerHTML = "Thank you for creating an account " + firstName+"!"
                            document.getElementById("form").style = "display:none"
                            document.getElementById("user_name_bobify").style = "display:inline-block";
                            document.getElementById("user_name_change").style = "display:inline-block";
                            document.getElementById("PESLINK").style = "display:inline-block"
                            document.getElementById("COCLINK").style = "display:inline-block"
                            document.getElementById("signIn").innerHTML = "<p>User Name:"+firstName+"</p>"
                            document.getElementById("profile_picture").innerHTML =" <img src= "+ userPhoto +" alt='Your Profile Picture!'>"


                        })
                        .catch((error) => {
                            console.log(error);
                            console.log('%c something went wrong! ',
                            'color: ' + COL_C +
                            '; background-color: ' + COL_R + ';');
                        })
        
                    }else{
                        document.getElementById("playertalk").innerHTML =firstName +" is an invalid age"
                    }
                }else{
                    document.getElementById("playertalk").innerHTML ="please express your age as an interger rounded down"
                }
                }else{
                    document.getElementById("playertalk").innerHTML =firstName +" is an invalid user Name"

                }
            

}


function fb_profileAuthState() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user !== null){
            console.log(user);
            console.log("WHY DID YOU LEAVE ME")
            userUid = user.uid;
            userEmail =user.email;
            userPhoto = user.photoURL;
            const dbReference = ref(fb_Db, "/user_Data/" + userUid + "/display_Name");
            //use "get()"function to find value of display_Name
            get(dbReference).then((snapshot) => {
                console.log(snapshot);
                console.log(snapshot.val());
                var user_Name = snapshot.val();
                if (user_Name != null) {
                    console.log('Record found!');
                    console.log(user_Name);
                    console.log(userPhoto)
                    const PES_EXIST = document.getElementById("#1PES")
                    console.log(PES_EXIST)
                    const COC_EXIST = document.getElementById("#1COC")
                    console.log(COC_EXIST)
                    if(PES_EXIST !== null){
                        document.getElementById("COCLINK").style = "display:inline-block"
            
                    }
                    if(COC_EXIST !== null){
                        document.getElementById("PESLINK").style = "display:inline-block"
                    }
                            document.getElementById("playertalk").innerHTML = "welcome back!"
                            document.getElementById("form").style = "display:none"
                            document.getElementById("user_name_bobify").style = "display:inline-block";
                            document.getElementById("user_name_change").style = "display:inline-block";
                            document.getElementById("PESLINK").style = "display:inline-block"
                            document.getElementById("COCLINK").style = "display:inline-block"
                            document.getElementById("signIn").innerHTML = "<p>User Name:"+firstName+"</p>"
                            document.getElementById("profile_picture").innerHTML =" <img src= "+ userPhoto +" alt='Your Profile Picture!'>"
                } else {
                    console.log('Record NOT found');
        

                }

            }).catch((error) => {
                console.log('Error!');
                console.log(error);
            });
        }else{
            console.log('please log in ')
             document.getElementById("playertalk").style = "display:inline-block"
    document.getElementById("playertalk").innerHTML = "Please log in to play games"
        }
    })
    

   
}