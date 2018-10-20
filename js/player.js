    let barSize = document.getElementById("progressBarCont").offsetWidth;
    let barSpeed = 300;
    let barSizeVolume = document.getElementById("volumeCont").offsetHeight;
    let videoPlayerContainer = document.getElementById("videoPlayerContainer");
    let videoPlayer = document.getElementById("videoPlayer");
    let progressBarCont = document.getElementById("progressBarCont");
    let progressBar = document.getElementById("progressBar");
    let playBtn = document.getElementById("playBtn");
    let time = document.getElementById("time");

    let volumeCont = document.getElementById("volumeCont");
    let volumeBar = document.getElementById("volumeBar");

    let muteBtn = document.getElementById("muteBtn");
    let fullScreen = document.getElementById("fullScreen");
    let updateBar;

    let videoPlayerFunction = () => {
        videoPlayerContainer.style.height = videoPlayerContainer.offsetHeight+"px";

        let update = () => {
            if(!videoPlayer.ended) {
                let size = parseInt(videoPlayer.currentTime * barSize / videoPlayer.duration);
                progressBar.style.width = size+"px";
            }else {
                progressBar.style.width = "0px";
                playBtn.style.backgroundPosition = "-2px -221px";
            }
        }//update

        let playOrPause = () => {
            if(!videoPlayer.paused && !videoPlayer.ended) {
                videoPlayer.pause();
                playBtn.style.backgroundPosition = "-2px -221px";
                clearInterval(updateBar);
            }else {
                videoPlayer.play();
                playBtn.style.backgroundPosition = "-44px -199px";
                updateBar = setInterval(update,barSpeed);                
            }
        }//playOrPause

        let clickedBar = (e) => {
            // if(!videoPlayer.paused && !videoPlayer.ended) {
                let mouseX = e.pageX - progressBarCont.getBoundingClientRect().left;
                let newTime = mouseX * videoPlayer.duration / barSize;
                videoPlayer.currentTime = newTime;
                progressBar.style.width = mouseX+"px";
            // }
        }//clickedBar

        let clickedBarVolume = (e) => {
            let mouseY = Math.abs(e.pageY - volumeCont.getBoundingClientRect().bottom - window.scrollY);
            let newVolume = mouseY / barSizeVolume;
            if(newVolume > -1  && newVolume <= 1) {
                videoPlayer.volume = newVolume.toFixed(1);
                volumeBar.style.height = mouseY+"px";
            }
            if(videoPlayer.volume === 0) {
                videoPlayer.muted = true;
                muteBtn.classList.add("muteBtn");
                muteBtn.classList.remove("muteBtn--one");
                muteBtn.classList.remove("muteBtn--two");
                // muteBtn
            }
            if(videoPlayer.volume > 0) {
                videoPlayer.muted = false;
                muteBtn.classList.remove("muteBtn");
                muteBtn.classList.remove("muteBtn--one");
                muteBtn.classList.remove("muteBtn--two");
            }
            if(videoPlayer.volume >= 0.3 && videoPlayer.volume <= 0.7) {
                muteBtn.classList.add("muteBtn--two");
            }
            if(videoPlayer.volume > 0 && videoPlayer.volume < 0.3) {
                muteBtn.classList.add("muteBtn--one");
            }     
            // console.log("videoPlayer.volume = "+videoPlayer.volume)
            // console.log("newVolume.toFixed(1) = "+newVolume.toFixed(1))
            // console.log("newVolume = "+newVolume)
            // console.log("newVolume = "+Math.round(newVolume))
        }//clickedBarVolume
        
        let currentVolume;
        let muteOrNot = () => {
            if(videoPlayer.muted) {
                videoPlayer.muted = false; 
                muteBtn.classList.remove("muteBtn"); 
                muteBtn.classList.remove("muteBtn--one");
                muteBtn.classList.remove("muteBtn--two");  
                volumeBar.style.height = barSizeVolume * currentVolume;
            }else {
                currentVolume = videoPlayer.volume;
                // console.log(currentVolume)
                videoPlayer.muted = true;
                muteBtn.classList.add("muteBtn");
                volumeBar.style.height = "0px"; 
                muteBtn.classList.remove("muteBtn--one");
                muteBtn.classList.remove("muteBtn--two");
            }
        }//muteOrNot


        let durMinute = parseInt(videoPlayer.duration / 60);
        let durSecond = parseInt(videoPlayer.duration - durMinute * 60);

        let displayTime = () => {
            let currentMinute = parseInt(videoPlayer.currentTime / 60);
            let currentSecond = parseInt(videoPlayer.currentTime - currentMinute * 60);

            // let durMinute = parseInt(videoPlayer.duration / 60);
            // let durSecond = parseInt(videoPlayer.duration - durMinute * 60);

            // (currentMinute < 10) ? currentMinute = "0"+currentMinute : currentMinute;
            (currentSecond < 10) ? currentSecond = "0"+currentSecond : currentSecond;

            // (durMinute < 10) ? durMinute = "0"+durMinute : durMinute;
            (durSecond < 10) ? durSecond = "0"+durSecond : durSecond;
            if(videoPlayer.ended) {currentSecond = "00"; currentMinute = "0";}
            time.innerHTML = currentMinute+" : "+currentSecond+" <span class='forwardSlash'>/</span> "+durMinute+" : "+durSecond;
        }//displayTime

        displayTime();
        playBtn.addEventListener("click",playOrPause,false);
        progressBarCont.addEventListener("click",clickedBar,false);

        progressBarCont.addEventListener("mousedown",function(){
            this.addEventListener("mousemove",clickedBar,false);
        },false);
        progressBarCont.addEventListener("mouseup", function(e){
            this.removeEventListener("mousemove", clickedBar,false);
        });
        progressBarCont.addEventListener("mouseleave",function(){
            this.removeEventListener("mousemove", clickedBar,false);
        },false);


        //////////////////////////////////////////////////////////
        
        volumeCont.addEventListener("click",clickedBarVolume,false);
        
        volumeCont.addEventListener("mousedown",function(){
            this.addEventListener("mousemove",clickedBarVolume,false);
        },false);
        volumeCont.addEventListener("mouseup", function(e){
            this.removeEventListener("mousemove", clickedBarVolume,false);
        });
        volumeCont.addEventListener("mouseleave",function(){
            this.removeEventListener("mousemove", clickedBarVolume,false);
        },false);

///////////////////////////////////////////////////////////////////////////////////////////
        let smallPlayer = document.createElement("div");
        smallPlayer.setAttribute("id","smallPlayerId");
        smallPlayer.style.width = "156px";
        smallPlayer.style.height = "96px";
        smallPlayer.style.border = "1px solid #b0bac7";
        smallPlayer.style.position = "absolute";
        smallPlayer.style.bottom = "20px";
        smallPlayer.style.display = "none";
        smallPlayer.style.backgroundColor = "orange";
        let videoPlayerClone = videoPlayer.cloneNode(true);
        videoPlayerClone.style.width = "100%";
        videoPlayerClone.style.height = "100%";
        videoPlayerClone.style.backgroundColor = "green";
        videoPlayerClone.style.objectFit = "fill"
        videoPlayerClone.removeAttribute("controls");
        
        smallPlayer.appendChild(videoPlayerClone);
        progressBarCont.appendChild(smallPlayer);
        
        let quickView = (e) => {
            smallPlayer.style.display = "block";  
            // videoPlayerClone.play();  
            videoPlayerClone.currentTime = videoPlayerClone.duration * (e.pageX - progressBarCont.getBoundingClientRect().left) / barSize;
            smallPlayer.style.left = (e.pageX - progressBarCont.getBoundingClientRect().left) - (smallPlayer.offsetWidth / 2)+"px";
        }//quickView
        progressBarCont.addEventListener("mousemove",quickView,false);
        progressBarCont.addEventListener("mouseleave",function(){
            smallPlayer.style.display = "none";
            // videoPlayerClone.pause();
        },false);
///////////////////////////////////////////////////////////////////////////////////////////////

        let toggleFullScreen = () => {
            if(videoPlayer.requestFullScreen){
                videoPlayer.requestFullScreen();
            } else if(videoPlayer.webkitRequestFullScreen){
                videoPlayer.webkitRequestFullScreen();
            } else if(videoPlayer.mozRequestFullScreen){
                videoPlayer.mozRequestFullScreen();
            }
        }//toggleFullScreen

        //////////////////////////////
        let videoSettings = document.getElementById("videoSettings");
        let videoSettings__qualities = document.getElementById("videoSettings__qualities");
        videoSettings__qualities.addEventListener("click",function(e){
            e.stopPropagation();
        },false);
        let toggleVideoSettings = () => {
            (videoSettings__qualities.style.display === "block") ? videoSettings__qualities.style.display = "none" : videoSettings__qualities.style.display = "block";
        }//toggleVideoSettings
        videoSettings.addEventListener("click",toggleVideoSettings,false);
        /////////////////////////////

        //////////////////////////////////////
        let i = 0;
        let $currentTime;
        let $currentWidthBar;

        
        //////////////////////////////////////////////////////////////////////
        let networkSpeed = () => {
            var imageAddr = "images/player/networkspeed/img.jpg";
            imageAddr += "?n="+Math.random();
            var startTime, endTime;
            var downloadSize = 1093957; //SIZE_OF_IMAGE_IN_BYTES
            var download = new Image();
            download.onload = function () {
                endTime = (new Date()).getTime();
                showResults();
            }
            startTime = (new Date()).getTime();
            download.src = imageAddr;

            function showResults() {
                var duration = (endTime - startTime) / 1000; //Math.round()
                var bitsLoaded = downloadSize * 8;
                var speedBps = (bitsLoaded / duration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var speedMbps = (speedKbps / 1024).toFixed(2);

                if(speedMbps<1){
                    //LOAD_SMALL_VIDEO
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/360.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();
                }
                else if(speedMbps<2){
                    //LOAD_MEDIUM_VIDEO
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/720.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();
                }
                else {
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/1080.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();  
                    //LOAD_LARGE_VIDEO
                    // console.log("Duration "+duration)
                    // console.log("bitsLoaded "+bitsLoaded)
                    // console.log("speedBps "+speedBps)
                    // console.log("speedKbps "+speedKbps)
                    // console.log("speedMbps "+speedMbps)
                }
            }
        }//networkSpeed
        //////////////////////////////////////////////////////////////////////

        
        let radioArray = ["auto","$1080p","$480p","$360p","$720p"];
        let changeHandler = (el) => {
            videoLoader();
            switch (el) {
                case "auto":
                    networkSpeed();
                break;
                case "1080p":
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/1080.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();               
                break;
                case "720p":
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/720.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();
                break;
                case "480p":
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/480.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();
                break;
                case "360p":
                    $currentTime = videoPlayer.currentTime;
                    videoPlayer.src = 'videos/360.mp4';
                    videoPlayer.currentTime = $currentTime;
                    playOrPause();
                break;
            }
        }//changeHandler
        for(i; i < radioArray.length; i++) {
            document.getElementById(radioArray[i]).addEventListener('change',function(i){
                // console.log(i.target.value)
                changeHandler(i.target.value);
            }, false);
        }

        ///////////////////////////////////////////////////
        let videoLoader = () => {
            let virtualCanvas = document.createElement("canvas");
            virtualCanvas.setAttribute("id","virtualCanvas");
            virtualCanvas.style.position = "absolute";
            virtualCanvas.style.top = "0px";
            virtualCanvas.style.left = "0px";
            virtualCanvas.setAttribute("width",videoPlayerContainer.offsetWidth);
            virtualCanvas.setAttribute("height",videoPlayerContainer.offsetHeight);
            var ctx = virtualCanvas.getContext("2d");
            var img = document.getElementById("videoPlayer");
            ctx.drawImage(img, 0, 0,videoPlayerContainer.offsetWidth,videoPlayerContainer.offsetHeight);
            videoPlayerContainer.appendChild(virtualCanvas);
        }//videoLoader
        // videoLoader();

        //////////////////////////////////////////////////
        videoPlayer.addEventListener("timeupdate",displayTime,false);
        muteBtn.addEventListener("click",muteOrNot);
        fullScreen.addEventListener("click",toggleFullScreen,false);
    }//videoPlayerFunction


    //////////////////////////////////////////////////////////////////////
    let capture = () => {        
        var c = document.getElementById("myCanvas");
        c.setAttribute("width",videoPlayerContainer.offsetWidth);
        c.setAttribute("height",videoPlayerContainer.offsetHeight);
        var ctx = c.getContext("2d");
        var video = document.getElementById("videoPlayer");
        video.addEventListener('canplaythrough', function () {
            ctx.drawImage(video, 0, 0,videoPlayerContainer.offsetWidth,videoPlayerContainer.offsetHeight);
        });
    };

    let startPlaying = () => {
        let playImg = document.createElement("div");
        playImg.setAttribute("id","playImg");
        playImg.style.position = "absolute";
        playImg.style.left = "0px";
        playImg.style.top = "0px";
        playImg.style.zIndex = "1";        
        let videoThumbnail = document.getElementById("videoThumbnail");
        videoThumbnail.appendChild(playImg);        
    }//startPlaying

    let removeThumbnail = () => {
        let videoThumbnail = document.getElementById("videoThumbnail");
        let video = document.getElementById("videoPlayer");
        videoThumbnail.addEventListener("click",function(e){
            // console.log("irkali")
            // console.log(videoThumbnail.parentNode.removeChild(videoThumbnail))
            videoThumbnail.parentNode.removeChild(videoThumbnail);
            video.currentTime = 0;
            // video.play()
            
            // playOrPause()
            video.setAttribute("autoplay",true) /////////////////////irakliiiiiiiiiiiiiiiiiiiiiiiiiiiii

            // videoThumbnail.parentNode()

            let update = () => {
                if(!videoPlayer.ended) {
                    let size = parseInt(videoPlayer.currentTime * barSize / videoPlayer.duration);
                    progressBar.style.width = size+"px";
                }else {
                    progressBar.style.width = "0px";
                    // playBtn.innerHTML = "Play";
                    playBtn.style.backgroundPosition = "-2px -221px";
                }
            }//update
            update();

            let playOrPause = () => {
            if(!videoPlayer.paused && !videoPlayer.ended) {
                videoPlayer.pause();
                // playBtn.innerHTML = "Play";
                playBtn.style.backgroundPosition = "-2px -221px";
                clearInterval(updateBar);
            }else {
                videoPlayer.play();
                // playBtn.innerHTML = "Pause";
                playBtn.style.backgroundPosition = "-44px -199px";
                updateBar = setInterval(update,barSpeed);                
            }
            }//playOrPause
            playOrPause();
            
        });
    }//removeThumbnail

    
    window.addEventListener("load",function(){
        var myVideoPlayer = document.getElementById('videoPlayer');
        if(myVideoPlayer.readyState === 4) {
            videoPlayerFunction();
            let randomTime = Math.floor(Math.random() * (myVideoPlayer.duration - 1) + 1);
            myVideoPlayer.currentTime = randomTime;  
            capture();
            startPlaying();
            removeThumbnail();
        }
    },false);

     let showControls = (e) => {
       // let $this = e.target.parentNode.parentNode;
       let videoPlayerContainer = document.getElementById("videoPlayerContainer");
       $this = videoPlayerContainer;
       let left = e.pageX - $this.getBoundingClientRect().left;
       let top = e.pageY - $this.getBoundingClientRect().top - window.scrollY; //window.scrollY დასქროლვისას განვლილი მანძილის გამოკლება ელემენტის ისევ თავის ადგილზე დგომის იმიტასიისთვის
       let controls = document.getElementById("controls");
       controls.style.opacity = "0";
    //    console.log(top)
       if((left > 1 && left < $this.offsetWidth) && (top > 1 && top < $this.offsetHeight)) {
        //    console.log("cursr is inside")
           controls.style.opacity = "1";
       }else {
        //    console.log("out of box");
        //    console.log("top "+$this.getBoundingClientRect().top)
        //    console.log("e.pageY = "+e.pageY)
           controls.style.opacity = "0";
       }
        // console.log("window.scrollY = "+window.scrollY); 
        // console.log("e.pageY - $this.getBoundingClientRect().top = "+top); //unda gamoaklo დასქროლვისას განვლილი მანძილიც რო თითქოს ისევ ტოპშია დივი
    }//showControls
    document.addEventListener("mousemove",showControls,false);
	