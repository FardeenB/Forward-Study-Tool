//constants that uses radius and circumference of the 
const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

//using the previously calculated circumference to equal the styled borders
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;


//Setting the style to equal the progress percentage 
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}