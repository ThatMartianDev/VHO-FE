export {pageLoaderFuns,
    headerFuncs, 
    programsMenuBtn, 
    slideTextAnimation, 
    fadersObserver, 
    phoneMenuActivating, 
    debounce, 
    magneticBtnsEffect, 
    // sliderAnchors, 
    AlertCard, 
    isElementInview,
    sliderAnchors
}

const pageLoaderFuns = function(){
    const pageLoader = document.getElementById("page-loader")
    const loaderImg = pageLoader.querySelector("#loading")
    const loaderText = pageLoader.querySelector("#loader-text")
    if (!sessionStorage.isVisited){
        setTimeout(() => {
            pageLoader.classList.add("hide")
            sessionStorage.isVisited = 'true'
        }, 600);
    }
    if (sessionStorage.isVisited){
        setTimeout(()=>{
            pageLoader.classList.add("hide")
        }, 600)
    }
}

const phoneMenuActivating = ()=>{
    const header = document.getElementById("page-header");
    const menuBtn = document.getElementById("menu-btn");
    const btnLines = document.getElementById("btn-lines");
    const btnWord = document.getElementById("btn-word");
    const menu = document.getElementById("side-menu");

    menuBtn.addEventListener("click", function(){
        menu.classList.toggle("active");
        btnLines.classList.toggle("active");
        btnWord.classList.toggle("active");
        setTimeout(() => {
            header.classList.toggle("fill-mode-phone");
        }, 500);
    });
}

const headerFuncs = ()=>{
    const home = document.getElementById("home")
    const header = document.getElementById("page-header");
    const logo = document.getElementById("logo")
    const sideMenu = document.getElementById("side-menu")

    document.documentElement.style.setProperty("--window-height", window.innerHeight + 'px')
    window.addEventListener("resize", ()=>{
        document.documentElement.style.setProperty("--window-height", window.innerHeight + 'px')
    })

    const headerObserverOptions = {
        rootMargin: "-70% 0% 0% 0%",
    }

    const headerObserver = new IntersectionObserver(function(entries, headerObserver){
        entries.forEach(entry => {
            if (!entry.isIntersecting){
                header.classList.add("fill-mode")
                logo.classList.add("fill")
            } else {
                header.classList.remove("fill-mode")
                logo.classList.remove("fill")
            }
        })
    }, headerObserverOptions)

    headerObserver.observe(home)
}

const programsMenuBtn = function(){
    const programsBtnsContainer = document.getElementById("programs-dropdown")
    const programsBtn = document.getElementById("programs-dropdown-btn")
    const programsList = document.getElementById("programs-links-list")
    const programsItems = programsList.querySelectorAll("a")
    programsBtn.addEventListener("click", debounce(()=>{
        programsList.classList.toggle("active")
        programsBtn.classList.toggle("active")
    }, 300))
    // programsList.addEventListener("blur", ()=>{
    //     programsList.classList.remove("active")
    //     programsBtn.classList.remove("active")
    // })
}

const slideTextAnimation = function(){
    const paragraphs = document.querySelectorAll(".slide-out-text")
    paragraphs.forEach(paragraph => {

        // Split the paragraph into words and return them as a Span tag inside a div tag
        paragraph.innerHTML = paragraph.innerHTML.split(' ').map(function(word){
            return '<span><span>'+word+'</span></span>';
        }).join(' ');

        // Add the transition delay to each span
        const paragraphDivs = Array.from(paragraph.children)
        paragraphDivs.forEach((div, index) => {
            let userAgent = navigator.userAgent;

            if (userAgent.match(/firefox|fxios/i)){
                div.firstChild.style['-moz-transition-delay'] = index * 10 + "ms";
            }  else if (userAgent.match(/safari/i)) {
                div.firstChild.style['-webkit-transition-delay'] = index * 10 + "ms";
            } else if (userAgent.match(/opr\//i)) {
                div.firstChild.style['-o-transition-delay'] = index * 10 + "ms";
            } else {
                div.firstChild.style['transition-delay'] = index * 10 + "ms";
            }
        })
    })
}

const fadersObserver = function(){
    const faders = document.querySelectorAll(".fader");
    const fadersOptions = {
        threshold: 0.3,
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add("fade-in");
                }, 100)
            }
        });
    }, fadersOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

const debounce = function(func, timeout = 600) {
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
};

const magneticBtnsEffect = function(){
    const magneticBtns = Array.from(document.querySelectorAll(".magnetic"));
    magneticBtns.forEach(button => {
        button.addEventListener("mousemove", function(e) {
            const btnPos = button.getBoundingClientRect();
            const btnX = e.clientX - btnPos.left - btnPos.width / 2;
            const btnY = e.clientY - btnPos.top - btnPos.height / 2;

            let userAgent = navigator.userAgent;

            if (userAgent.match(/firefox|fxios/i)){
                this.style['-moz-transform'] = "translate(" + btnX * 0.1 + "px, " + btnY * 0.4 + "px)";
                this.style['-moz-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                this.children[0].style['-moz-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
            }  else if (userAgent.match(/safari/i)) {
                this.style['-webkit-transform'] = "translate(" + btnX * 0.1 + "px, " + btnY * 0.4 + "px)";   
                this.style['-webkit-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                this.children[0].style['-webkit-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;           
            } else if (userAgent.match(/opr\//i)) {
                this.style['-o-transform'] = "translate(" + btnX * 0.1 + "px, " + btnY * 0.4 + "px)";
                this.style['-o-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                this.children[0].style['-o-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
            } else {
                this.style['transform'] = "translate(" + btnX * 0.1 + "px, " + btnY * 0.4 + "px)";
                this.style['transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                this.children[0].style['transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
            }
        });

        button.addEventListener('mouseleave', function() {
            let userAgent = navigator.userAgent;

            this.style.transform = 'translate3d(0px, 0px, 0px)';
            this.style.transform += 'rotate3d(0, 0, 0, 0deg)';
            this.children[0].style.transform = 'translate3d(0px, 0px, 0px)';

            if (userAgent.match(/firefox|fxios/i)){
                this.style['-moz-transform'] = "translate3d(0px, 0px, 0px)";
                this.style['-moz-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                this.children[0].style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';
            }  else if (userAgent.match(/safari/i)) {
                this.style['-webkit-transform'] = "translate3d(0px, 0px, 0px)";   
                this.style['-webkit-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                this.children[0].style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';           
            } else if (userAgent.match(/opr\//i)) {
                this.style['-o-transform'] = "translate3d(0px, 0px, 0px)";
                this.style['-o-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                this.children[0].style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
            } else {
                this.style['transform'] = "translate3d(0px, 0px, 0px)";
                this.style['transform'] += 'rotate3d(0, 0, 0, 0deg)';
                this.children[0].style['transform'] = 'translate3d(0px, 0px, 0px)';
            }
        });
    })
}

const sliderAnchors = function(selector){
    const sectionsWsliders = document.querySelector(selector)
    const slider = sectionsWsliders.querySelector(".add-anchors")
    const anchorsContainer = sectionsWsliders.querySelector(".slider-anchors")

    let anchors;
    let sliderChildren = Array.from(slider.children);
    sliderChildren[0].classList.add("active")

    let itemInView;
    let itemIndex;
    let clickedAnchorIndex;
    let activeAnchor;
    let activeAnchorIndex;
    let anchorTimeOut

    if (sliderChildren.length > 3){
        function createAnchors(container){
            let anchors;
            for (let i = 0; i < sliderChildren.length; i++){
                anchors = document.createElement("span")
                anchors.classList.add("item-anchor")
                container.append(anchors)
            }
        }
        createAnchors(anchorsContainer)
    
        anchors = Array.from(anchorsContainer.children);
        anchors[0].classList.add("clicked")
        
        let sliderItemsObserverOptions = {
            threshold: 1,
        }
    
        const sliderItemsObserver = new IntersectionObserver(function(entries, sliderItemsObserver) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appeared");
                    getItemInView()
                    anchorInView()
                    anchorItemChecker()
                } else {
                    entry.target.classList.remove("appeared")
                }
            });
        }, sliderItemsObserverOptions);
    
        sliderChildren.forEach(child => {
            sliderItemsObserver.observe(child)
        })
    
        function getItemInView(){
            itemInView = slider.querySelector(".appeared")
            itemIndex = sliderChildren.indexOf(itemInView)
        }
    
        function calcTimeOut(x, y){
            let result;
            if (x <= y){
                result = 300 * (y - x)
            }
            else {
                result = 300 * ( x - y)
            }
            return result
        }
    
        const getClickedAnchor = debounce(function(){        
            anchors.forEach(anchor => {
                anchor.addEventListener("click", function(){
                    clickedAnchorIndex = anchors.indexOf(anchor)
                    activeAnchor = anchorsContainer.querySelector(".clicked")
                    activeAnchorIndex = anchors.indexOf(activeAnchor)
                    if (clickedAnchorIndex !== activeAnchorIndex){
                        setTimeout(()=>{
                            anchor.classList.add("clicked")
                            activeAnchor.classList.remove("clicked")
                        }, calcTimeOut(activeAnchorIndex, clickedAnchorIndex))
                    }
                    moveToItem()
                })
            })
        }, calcTimeOut(activeAnchorIndex, clickedAnchorIndex))
        getClickedAnchor()
    
        function moveToItem(){
            let selectedItem = clickedAnchorIndex
            sliderChildren[selectedItem].scrollIntoView({ block : "nearest"})
        }
    
        const anchorInView = debounce(function(){
            anchorTimeOut = 0
            setTimeout(()=>{
                anchors.forEach(anchor => {
                    let currentAnchor = itemIndex
                    if (anchor != anchors[currentAnchor]){
                        anchor.classList.remove("clicked")
                    } else {
                        anchor.classList.add("clicked")
                    }
                })
            }, anchorTimeOut)
        }, calcTimeOut(activeAnchorIndex, clickedAnchorIndex))
    
        const anchorItemChecker = debounce(function(){
            setTimeout(()=>{
                let currentAnchor = anchorsContainer.querySelector(".clicked");
                let anchorIndex = anchors.indexOf(currentAnchor)
                if (itemIndex !== anchorIndex){
                    console.log("error", itemIndex, anchorIndex)
                    anchors[itemIndex].classList.add("clicked")
                }
            }, 300)
        }, 200)
    }
}


class AlertCard {
    constructor(selector){
        this.alertItem = document.querySelector(selector);
        this.alertContent = this.alertItem.querySelector("#alert-content");
        this.alertAnchor = this.alertItem.querySelector("#alert-anchor")
        this.closeBtn = this.alertItem.querySelector("#close-alert")
    }
    
    showCard(){
        this.alertItem.classList.add("show");
        setTimeout(()=>{
            this.closeBtn.addEventListener("click", ()=>{
                this.hideCard();
            })
        }, 300)
    }
    hideCard(){
        this.alertItem.classList.remove("show");
        setTimeout(()=>{
            this.alertContent.innerText = " ";
            this.alertAnchor.classList.remove("added")
        }, 700)
    }
    writeAlertContent(content){
        this.alertContent.innerText = content;
    }
    addAnchor(selector, anchorText, position){
        let target = document.querySelector(selector)

        this.alertAnchor.innerText = anchorText;
        this.alertAnchor.classList.add("added")
        this.alertAnchor.addEventListener("click", ()=>{
            target.scrollIntoView({ block : position})
            setTimeout(()=>{
                this.hideCard();
            }, 5000)
        })
    }
}

function isElementInview(element, ifYes, IfNo) {
    var myElementHeight = element.offsetHeight;
    var myElementWidth = element.offsetWidth;
    var bounding = element.getBoundingClientRect();
      if (bounding.top >= -myElementHeight 
          && bounding.left >= -myElementWidth
          && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
          && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
            ifYes();
      } else {
        IfNo();
      }
  }