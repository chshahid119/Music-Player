// console.log("is connected?")

// initialize the variables
let songIndex=0;
let audioElement=new Audio('song/10.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
//let songInfo=document.getElementsByClassName('songInfo');


let songs=[
    { songName: "breath-Fast here - My heart is here",  filePath: "songs/1.mp3", coverPath: "covers/1.png" },
    { songName: "english-poem",  filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "celtic-irish-scottish",  filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "fun-punk-opener",  filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "i-cant-fall-in-love",  filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "roughly-made-bass-house",  filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "the-sea-is-calling.mp3",  filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bass-Music",  filePath: "songs/8.mp3", coverPath: "covers/8.png" },
    { songName: "adson-john-english-courtly",  filePath: "songs/9.mp3", coverPath: "covers/9.png" },
    { songName: "british-folk-song",  filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]
  

songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;   
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName.slice(0,25);
    
})


// Handle Play Pause Click
masterPlay.addEventListener('click',()=>{
    
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');
       gif.style.opacity=1;
    }
    else{
        audioElement.pause();
       masterPlay.classList.add('fa-play-circle');
       masterPlay.classList.remove('fa-pause-circle');
       gif.style.opacity=0;
    }
})

// Listen to Events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeUpdate');
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
    
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
     element.classList.remove("fa-pause-circle");
     element.classList.add("fa-play-circle");
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e,i)=>{
        console.log(e.target);
        makeAllPlays(); 
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName.toUpperCase();
        audioElement.currentTime=0;
        audioElement.play();
        //To Update the Songs Duration in list (incomplete tAsk)
        // let duration=audioElement.duration;
        // console.log(duration);
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=10){

        songIndex =0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName.toUpperCase();
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        
        songIndex =0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    masterSongName.innerText=songs[songIndex].songName.toUpperCase();
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
})