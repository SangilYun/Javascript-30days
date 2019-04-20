const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({audio:false, video:true})
        .then(localMediaStream =>{
            console.log(localMediaStream);
            //convert the media stream into something the video can understand            
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        //when someone doesn't allow you to access the web cam
        .catch(err => console.error(`Oh NO !! `, err))
}

function paintToCanvase(){
    const width = video.videoWidth;
    const height = vidoe.videoHeight;
    canvas.width=width;
    canvas.height=height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixles);
        ctx.putImageData(pixels, 0, 0)
    }, 16);
} 

function takePhoto(){
    //play the sound
    snap.currentTime =0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="handsome man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    for(let i=0; i<pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i+0] + 100;//r
        pixels.data[i + 1] = pixels.data[i+1] - 50;//g
        pixels[i+2] //b
    }
}

getVideo();

video.addEventListener('canplay', paintToCanvase);