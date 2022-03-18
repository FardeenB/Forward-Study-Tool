//Initializing constants for clock, bell sound, divide by mins, divide by secs, and start button
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");
const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");
const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "study");

let initial, totalsecs, perc, mins, seconds; //variables intialized by let

startBtn.addEventListener("click", () => { //When start button is clicked...

    let btn = localStorage.getItem("btn");

    if (btn === "study") { //Use the mins from study time when it is study, else use rest time 

        // The 'or 1' sets the default time to 1 min for either study or rest
        mins = +localStorage.getItem("studyTime") || 1;
    } else {
        mins = +localStorage.getItem("restTime") || 1;
    }

    seconds = mins * 60; // Math to be used for decrement function
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60); //Timeout on the decrement function
    startBtn.style.transform = "scale(0)"; //Remove the start timer button when it is running 

});

function decremenT() {

    //Dividing by mins and seconds 
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`; //Ternary operator for divide by seconds logic
    //removes almost from previous timer session
    if (circle.classList.contains("almost")) {
        circle.classList.remove("almost");
    }


    //Start decrementing when seconds > 0    
    if (seconds > 0) {
        //make the progress when decrementing represented by a percentage
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        setProgress(perc);
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
        //Display red stroke outline if seconds is 10 seconds or less  
        if (seconds <= 10) {
            circle.classList.add("almost");
        }
    } else {

        //Otherwise, set mins and seconds to 0, and display the start rest button 
        mins = 0;
        seconds = 0;
        bell.play();
        let btn = localStorage.getItem("btn");

        if (btn === "study") {
            startBtn.textContent = "Start Rest";
            startBtn.classList.add("rest");
            localStorage.setItem("btn", "rest"); //use the data stored for rest time 
        } else {
            startBtn.classList.remove("rest");
            startBtn.textContent = "Start study";
            localStorage.setItem("btn", "study"); //otherwise use the data stored for study time
        }
        startBtn.style.transform = "scale(1)";
    }
}