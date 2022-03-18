//Setting constants for 
const studyTimeInput = document.querySelector("#studyTime");
const restTimeInput = document.querySelector("#restTime");

// Save the data inputed for study and rest times to local storage  
studyTimeInput.value = localStorage.getItem("studyTime");
restTimeInput.value = localStorage.getItem("restTime");


//Action for actually saving the data into constants defined above
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("studyTime", studyTimeInput.value);
    localStorage.setItem("restTime", restTimeInput.value);
});

//Setting current timer to 0, displaying the start timer button again
document.querySelector(".reset").addEventListener("click", () => {
    startBtn.style.transform = "scale(1)";
    clearTimeout(initial);
    setProgress(0);
    mindiv.textContent = 0;
    secdiv.textContent = 0;
});