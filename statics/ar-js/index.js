import {pageLoaderFuns, slideTextAnimation, programsMenuBtn, fadersObserver, phoneMenuActivating, headerFuncs, debounce, magneticBtnsEffect, sliderAnchors} from '../mutual.js';


document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        pageLoaderFuns()
        setTimeout(()=>{
            headerFuncs()
            programsMenuBtn()
            phoneMenuActivating()
            slideTextAnimation();
            fadersObserver();
            magneticBtnsEffect()
            
            // sliderAnchors("#events")
            // const addAnchors = new SliderAnchors("#events")

            const videoBtn = document.getElementById("video-btn")
            const introVideoContainer = document.getElementById("intro-video")
            const video = introVideoContainer.querySelector("video")
            const videoCloseBtn = document.getElementById("video-close")

            videoBtn.addEventListener("click", debounce(()=>{
                introVideoContainer.classList.add("active")
            }, 1000))


            video.addEventListener('enterpictureinpicture', () => {
                introVideoContainer.classList.remove("active")
                video.pause()
            });

            video.addEventListener('leavepictureinpicture', () => {
                introVideoContainer.classList.add("active")
            });

            videoCloseBtn.addEventListener("click", debounce(()=>{
                introVideoContainer.classList.remove("active")
                video.pause()
            }, 2000))
            videoCloseBtn.addEventListener("keydown", (e)=>{
                if (e.code == "Enter"){
                    introVideoContainer.classList.remove("active")
                    video.pause()
                }
            })
        }, 600)
  }
}