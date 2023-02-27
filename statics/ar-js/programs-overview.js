import {pageLoaderFuns, slideTextAnimation, programsMenuBtn, fadersObserver, phoneMenuActivating, headerFuncs, debounce, magneticBtnsEffect} from '../mutual.js';

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        pageLoaderFuns()
        setTimeout(() => {
            headerFuncs()
            programsMenuBtn()
            phoneMenuActivating()
            slideTextAnimation();
            fadersObserver();
            magneticBtnsEffect()
        }, 600);
    }
}