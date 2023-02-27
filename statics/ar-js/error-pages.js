import {pageLoaderFuns, slideTextAnimation, programsMenuBtn, fadersObserver, phoneMenuActivating, headerFuncs, debounce, magneticBtnsEffect} from '../mutual.js';

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        pageLoaderFuns()
        setTimeout(() => {
            programsMenuBtn()
            phoneMenuActivating()
            slideTextAnimation();
            fadersObserver();
            magneticBtnsEffect()

            const header = document.getElementById("page-header")
            const logo = document.getElementById("logo")

            header.classList.add("fill-mode")
            logo.classList.add("fill")

            let windowHeight = window.innerHeight;
            document.documentElement.style.setProperty("--window-height", windowHeight + "px")
            window.addEventListener("resize", ()=>{
                windowHeight = window.innerHeight;
                document.documentElement.style.setProperty("--window-height", windowHeight + "px")
            })            
        }, 600);
    }
}