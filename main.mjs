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

/***************************************************************/
// Import all external constants & functions required
/***************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_Initialise, fb_Authenticate,fb_RunRecords,fb_bobify
 }
    from './records.mjs';
    window.fb_Initialise = fb_Initialise;
    window.fb_Authenticate = fb_Authenticate;
    window.fb_RunRecords = fb_RunRecords;
    window.fb_bobify() = fb_bobify;
/**************************************************************/
// index.html main code
/**************************************************************/
fb_Initialise();