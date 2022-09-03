
let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let capturedBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");

let recordFlag = false;
let recorder;
let chunks = [];
let constraints = {
    video : true,
    audio : true
}
// navigator -->web API
// madiaDevices --> web API->The MediaDevices interface provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.


 navigator.mediaDevices.getUserMedia(constraints)
 .then((stream) => {
     video.srcObject = stream;

     recorder = new MediaRecorder(stream);

     recorder.addEventListener("start" ,(e) => {
        chunks = [];
     })
     recorder.addEventListener("dataavailable" ,(e) => {
        chunks.push(e.data)
     })
     recorder.addEventListener("stop" ,(e) => {
    //     // conversion of media chunks data into videos
    //     //The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.
        let blob = new Blob( chunks ,{type : "video/mp4"});
        let videoURL = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();



     })

})

 recordBtnCont.addEventListener("click" ,(e) => {
    if (!recorder) return;

    recordFlag = !recordFlag;

    if(recordFlag) {   //start
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }
    else {
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }

 })
let timerID;
let counter = 0; //means total seconds
let timer = document.querySelector(".timer")
 function startTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600;  //remaining value

        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60; 

        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`
        counter++;

    }
    timerID = setInterval(displayTimer , 1000);

 }
 function stopTimer(){
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";

 }
 
