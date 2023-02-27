import {pageLoaderFuns, slideTextAnimation, programsMenuBtn, fadersObserver, phoneMenuActivating, headerFuncs, debounce, magneticBtnsEffect, sliderAnchors} from '../mutual.js';

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
            sliderAnchors("#egypt-team")
            sliderAnchors("#sudan-team")
            sliderAnchors("#mauritania-team")
        }, 600);
    }
}