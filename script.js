
let video = document.querySelector("video");

let constraints = {
    video : true,
    audio : true
}
// navigator -->web API
// madiaDevices --> web API->The MediaDevices interface provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.


// navigator.mediaDevices.getUserMedia(constraints)
// .then((stream) => {
//     video.srcObject = stream;

// })
