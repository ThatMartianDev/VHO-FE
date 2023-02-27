import {pageLoaderFuns,
    slideTextAnimation,
    programsMenuBtn,
    fadersObserver,
    phoneMenuActivating,
    headerFuncs,
    debounce,
    magneticBtnsEffect,
    AlertCard,
    isElementInview
  } from "../mutual.js";

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

const dropDownElement = document.getElementById("countries-list")
const formContainer = document.getElementById("contact-form")
const formSection = document.getElementById("form-section")
const formLang = formContainer.getAttribute("data-lan")
const MessageTitle = document.getElementById("message-title")
let searchAlert = new AlertCard("#alert");

class newDropDown {
    constructor(element){
        this.currentDropDown = element;
        this.lang
        if (formLang == "ar"){
            this.lang = "ar"
        } if (formLang == "en"){
            this.lang = "en"
        }
        this.currentOptions = getCurrentDropDownOptions(element.querySelectorAll("option"));
        this.wrapper = document.createElement("span")
        this.newDropDown = document.createElement("div");
        this.label = document.createElement("span");
        this.newOptionsList = document.createElement("ul");
        this.searchBar = document.createElement("input")
        buildNewDropDown(this);
        element.after(this.newDropDown);
        element.style.display = "none";
    }

    get selectedOption() {
        return this.currentOptions.find(option => option.selected)
    }

    get selectedOptionIndex(){
        return this.currentOptions.indexOf(this.selectedOption)
    }

    selectValue(value){
        const newSelectedValue = this.currentOptions.find(option => {
            return option.value == value
        })
        const prevSelectedValue = this.selectedOption
        prevSelectedValue.selected = false
        prevSelectedValue.optionElement.selected = false

        newSelectedValue.selected = true
        newSelectedValue.optionElement.selected = true

        this.label.innerText = newSelectedValue.label

        this.newOptionsList.querySelector(`[data-value="${prevSelectedValue.value}"]`).classList.remove("selected")
        const newCustomElement = this.newOptionsList.querySelector(`[data-value="${newSelectedValue.value}"]`)
        newCustomElement.classList.add("selected")
        newCustomElement.scrollIntoView({ block : "nearest"})

    }
}

function buildNewDropDown(dropDown){
    dropDown.wrapper.classList.add("input-wrappers")

    dropDown.newDropDown.classList.add("custom-dropdown");
    dropDown.newDropDown.tabIndex = 0;
    dropDown.wrapper.append(dropDown.newDropDown)

    dropDown.label.classList.add("custom-dropdown-label");
    dropDown.label.innerText = dropDown.selectedOption.label;
    dropDown.newDropDown.append(dropDown.label);

    dropDown.newOptionsList.classList.add("custom-dropdown-options");
    dropDown.searchBar.classList.add("search-bar")
    dropDown.searchBar.type = "search"
    dropDown.searchBar.name = "search"
    dropDown.searchBar.autocomplete = true;
    if (dropDown.lang == "ar"){
        dropDown.searchBar.placeholder = "اكتب اسم دولتك هنا"
    }
    if (dropDown.lang == "en"){
        dropDown.searchBar.placeholder = "Type your country name here"
    }
    dropDown.newOptionsList.append(dropDown.searchBar)
    dropDown.newDropDown.append(dropDown.newOptionsList);
    dropDown.currentOptions.forEach(option => {
        const optionElement = document.createElement("li");
        optionElement.classList.add("custom-option");
        optionElement.classList.toggle("selected", option.selected);
        optionElement.innerText = option.label;
        optionElement.dataset.value = option.value;
        dropDown.newOptionsList.append(optionElement)

        optionElement.addEventListener("click", ()=> {
            dropDown.selectValue(option.value)
            dropDown.newOptionsList.classList.remove("show")
            dropDown.label.classList.remove("active")
        })
    })

    dropDown.label.addEventListener("click", ()=> {
        dropDown.newOptionsList.classList.toggle("show")
        dropDown.label.classList.toggle("active")
    })
    dropDown.searchBar.addEventListener("click", ()=> {
        dropDown.newOptionsList.classList.add("show")
        dropDown.label.classList.add("active")
    })
   
    let debounceTime
    let searchChar
    let searchInput

    let currentWindowHeight = window.innerHeight;
    let isSearchFocused = false

    dropDown.searchBar.addEventListener("keydown", (e)=>{
        isSearchFocused = true
    })

    dropDown.searchBar.addEventListener("input", (e)=> {
        searchInput = e.target.value;

        // if (searchInput !==  /[\u0600-\u06FF]/) {
        //     let alertMessage = "يبدو أنك تكتب بلغة غير العربية, يرجى تحويل اللغة وابحث مرة اخرى"
        //     searchAlert.writeAlertContent(alertMessage)
        //     searchAlert.showCard()
        // }

        clearTimeout(debounceTime)
        debounceTime = setTimeout(()=>{
            searchInput = ""
        }, 2000)

        window.addEventListener("resize", ()=>{
            if (window.innerHeight != currentWindowHeight){
                dropDown.scrollIntoView({"block": "center"})
            }
        })
        
        const searchedOptionInput = dropDown.currentOptions.find(option => {
            switch (dropDown.lang == "ar"){
                case option.label.includes(searchInput):
                    return option.label

                default:
                    return option.label === searchInput
            }
        })
        if (searchedOptionInput) {
            // searchAlert.hideCard();
            dropDown.selectValue(searchedOptionInput.value);
        }
        else {
            return   
        }

        const searchedOptionInputEn = dropDown.currentOptions.find(option => {
            switch (dropDown.lang == "en"){
                case option.label.toLowerCase().includes(searchInput):
                    return option.label
                default:
                    if (option.label.toLowerCase() == searchInput){
                        return option.label
                    }
            }
        })
        if (searchedOptionInputEn) dropDown.selectValue(searchedOptionInput.value)

    })
    dropDown.newDropDown.addEventListener("keydown", (e)=>{
        switch (e.code){
            case "Space":
                if (isSearchFocused == false) {
                    dropDown.newOptionsList.classList.toggle("show")
                    dropDown.label.classList.toggle("active")
                    e.preventDefault()
                }
                break
            case "Tab":
                dropDown.newOptionsList.classList.add("show");
                isSearchFocused = false
                setInterval(()=>{
                    e.preventDefault()
                }, 100)
                break
            case "ArrowUp":
                const prevOption = dropDown.currentOptions[dropDown.selectedOptionIndex - 1]
                if (prevOption){
                    dropDown.selectValue(prevOption.value)
                }
                e.preventDefault()
                break
            case "ArrowDown":
                const nextOption = dropDown.currentOptions[dropDown.selectedOptionIndex + 1]
                if (nextOption){
                    dropDown.selectValue(nextOption.value)
                }
                e.preventDefault()
                break
            case "Enter":
            case "Escape":
                isSearchFocused = false
                dropDown.newOptionsList.classList.remove("show")
                e.preventDefault()
                break
            default:
                clearTimeout(debounceTime)
                searchChar += e.key
                debounceTime = setTimeout(()=>{
                    searchChar = ""
                }, 800)
                const searchedOption = dropDown.currentOptions.find(option => {
                    if (dropDown.lang == "ar"){
                        return option.label.startsWith(searchChar)
                    }
                    if (dropDown.lang == "en"){
                        return option.label.toLowerCase().startsWith(searchChar)
                    }
                })
                if (searchedOption) dropDown.selectValue(searchedOption.value)
        }
    })

    dropDown.newDropDown.addEventListener("blur", ()=> {
        dropDown.newOptionsList.classList.remove("show")
        dropDown.label.classList.remove("active")
    })
    dropDown.searchBar.addEventListener("blur", ()=> {
        dropDown.newOptionsList.classList.remove("show")
        dropDown.label.classList.remove("active")
    })
}


function getCurrentDropDownOptions(dropDownOptions){
    return [...dropDownOptions].map(option => {
        return {
            value: option.value,
            label: option.label,
            selected: option.selected,
            optionElement: option
        }
    })
}

new newDropDown(dropDownElement)
new newDropDown(MessageTitle)

const formSectionTitle = document.querySelector("#form-section .section-title-ar")
const submitBtn = document.getElementById("form-submittion");
const btnText = document.getElementById("submit-btn-text")
const processingIcon = submitBtn.querySelector(".processing-icon")
let formStatues;

submitBtn.onclick = debounce(function(){
    const inputs = [...formContainer.querySelectorAll("input")];
    const allValid = inputs.every(input => input.reportValidity());
    if (allValid){
        formStatues = "Good2Go";
        btnText.innerText = "لحظة من فضلك";
        processingIcon.classList.add("processing")
    }
}, 1000);


  
let inputAlert = new AlertCard("#alert");
var DisplayedResponse;
formContainer.onsubmit = function(e){
        debounce(setTimeout(()=>{
            var data = new FormData(formContainer);
            var xhr = new XMLHttpRequest();
            let requestResponse;
            let JsonData;

            let dropDowns = document.querySelectorAll(".custom-dropdown")
            let mailCopy = document.getElementById("mail-copy")
            if (mailCopy.checked == false){
                mailCopy.value = "no" 
            }
            var csrf_token = "{{ csrf_token() }}";            

            const selectedOptions = document.querySelectorAll(".selected")
            const selectedCountry = selectedOptions[0].dataset.value
            const selectedTitle = selectedOptions[1].dataset.value

            const defaultDropDownText = document.querySelectorAll(".custom-dropdown-options")
            const defaultCountryText = defaultDropDownText[0].querySelector("li").innerText
            const defaultTitleText = defaultDropDownText[1].querySelector("li").innerText

            if (selectedCountry != defaultCountryText && selectedTitle != defaultTitleText){
                formContainer.classList.remove("active-again")

                dropDowns[0].classList.remove("invalid")
                dropDowns[1].classList.remove("invalid")

                data.append("country", selectedCountry)
                data.append("message_title", selectedTitle)
                data.append("send_copy", mailCopy)

                xhr.open("POST", `/contact-form-processing`);
                xhr.setRequestHeader("ProcessData", "FormData")
                xhr.setRequestHeader("X-CSRFToken", csrf_token);

                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 2){
                      let btnTextTimeOut = 8000;
          
                      btnText.innerText = "لحظة من فضلك";
          
                      setTimeout(() => {
                        btnText.innerText = "تتم معالجة طلبك الان";
                      }, btnTextTimeOut * 2);
          
                      setTimeout(() => {
                        btnText.innerText = "في أي وقت الان...";
                      }, btnTextTimeOut * 4);
                    }
          
                    if (xhr.readyState === 4 && xhr.status === 200) {
                      requestResponse = xhr.response;
                      JsonData = JSON.parse(requestResponse);
                      DisplayedResponse = JsonData["message"];
                      console.log(xhr.response, xhr.responseXML);
                      
                      formContainer.reset();
                      formContainer.classList.add("sent");
                      formIdel();
          
                      isElementInview(formSection, formInView, formIsNotInView)
                    }
                    if (xhr.readyState === xhr.UNSENT || xhr.status !== 200) {
                      submitBtn.disabled = false;
                      processingIcon.classList.remove("processing");
                      btnText.innerText = "ارسل الرسالة";
          
                      requestResponse = xhr.response;
                      JsonData = JSON.parse(requestResponse);
                      DisplayedResponse = JsonData["message"];
                      console.log(xhr.response, xhr.responseXML);
          
                      formStatues = "error";
                      isElementInview(formSection, formInView, formIsInNotView_And_ErrorOccured)
                    }
                  };
                
                xhr.send(data);
                submitBtn.disabled = true

            } else {
                if (selectedCountry == defaultCountryText){
                    dropDowns[0].classList.add("invalid")
                }
                if (selectedTitle == defaultTitleText){
                    dropDowns[1].classList.add("invalid")
                }
                btnText.innerText = "ارسل الرسالة";
            }
        }, 300), 2000)
    return false;
}

let sectionTitle = document.querySelector("#form-section .section-title-ar")
let formReactivateDelay = 1700
let anchorContent;
function formIsNotInView(){
  inputAlert.writeAlertContent(DisplayedResponse);
  alertItem.showCard();
}
function formIsInNotView_And_ErrorOccured(){
  alertItem.writeAlertContent(DisplayedResponse);
  alertItem.showCard();
  anchorContent = "ارجع الى النموذج"
  alertItem.addAnchor("#contact-form", anchorContent, "start")
}
function formInView(){
  if(formStatues == "error"){
    alertItem.writeAlertContent(DisplayedResponse);
    alertItem.showCard();
  }
}

function formIdel(){
    if (formContainer.classList.contains("sent")){
        processingIcon.classList.remove("processing")
        btnText.innerText = "ارسل بنجاح"
        setTimeout(()=>{
            sectionTitle.innerText = "تم الارسال بنجاح!"
            sectionTitle.classList.add("sent")
            sectionTitle.scrollIntoView({"block": "center"})
        }, 300)

        const formReactivateBtn = document.createElement("button")
        formReactivateBtn.innerText = "هل تريد ارسال رسالة اخرى؟ اضغط هنا لفتح نموذج جديد"
        formReactivateBtn.classList.add("form-activation-btn")
        formSection.append(formReactivateBtn)

        formReactivation(formReactivateBtn)
    }
}

function formReactivation(reactivateBtn){
    reactivateBtn.addEventListener("click", ()=>{
        formContainer.classList.add("active-again")
        submitBtn.disabled = false
        setTimeout(()=>{
            sectionTitle.innerText = "ارسل رسالة اخرى"
            btnText.innerText = "ارسل الرسالة"
        }, 500)
        setTimeout(()=>{
            formContainer.classList.remove("sent")
            sectionTitle.classList.remove("sent")
            reactivateBtn.classList.add("idle")
        }, formReactivateDelay)
        setTimeout(()=>{
            reactivateBtn.remove()
          }, 1000)
    })
}
