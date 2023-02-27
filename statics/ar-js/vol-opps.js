import {
  pageLoaderFuns,
  slideTextAnimation,
  programsMenuBtn,
  fadersObserver,
  phoneMenuActivating,
  headerFuncs,
  debounce,
  magneticBtnsEffect,
  sliderAnchors,
  AlertCard,
  isElementInview
} from "../mutual.js";

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
      pageLoaderFuns()
      setTimeout(() => {
          headerFuncs();
          programsMenuBtn();
          phoneMenuActivating();
          slideTextAnimation();
          fadersObserver();
          magneticBtnsEffect();
      }, 600);
  }
}
// sliderAnchors("#volunteer-opportunities");

const formSection = document.getElementById("stay-up-to-date");
const form = document.getElementById("join-our-mail-list");
let formStatues;

const input = form.querySelector("input");

const submitBtn = document.getElementById("submit-btn");
let btnText = document.getElementById("btn-text");
const processingIcon = submitBtn.querySelector(".processing-icon")


submitBtn.onclick = function () {
  const allValid = input.reportValidity();
  if (allValid) {
    formStatues = "Good2Go";
    btnText.innerText = "لحظة من فضلك";
    processingIcon.classList.add("processing");
  }
};

let alertItem = new AlertCard("#alert");
var DisplayedResponse;

form.onsubmit = function (e) {
  debounce(
    setTimeout(() => {
      if (formStatues == "Good2Go") {
        var data = new FormData(form);
        var xhr = new XMLHttpRequest();
        let requestResponse;
        let JsonData;

        var csrf_token = "{{ csrf_token() }}";
        form.classList.remove("active-again");

        xhr.open("POST", "/join-mailing-list");
        xhr.setRequestHeader("ProcessData", "ProcessEmail");
        xhr.setRequestHeader("X-CSRFToken", csrf_token);

        xhr.onreadystatechange = function(){
          if (xhr.readyState === xhr.OPENED){
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

            ////////////////////////
            ///// MUST BE FIXED ////
            JsonData = JSON.parse(requestResponse);
            ////////////////////////
            
            DisplayedResponse = JsonData["message"];
            console.log(xhr.response, xhr.responseXML);
            
            form.reset();
            form.classList.add("sent");
            formIdel();

            isElementInview(formSection, formInView, formIsNotInView)
          }
          if (xhr.readyState === xhr.UNSENT || xhr.status !== 200) {
            submitBtn.disabled = false;
            processingIcon.classList.remove("processing");
            btnText.innerText = "تسجل في قائمة البريد خاصتنا";

            requestResponse = xhr.response;
            JsonData = JSON.parse(requestResponse);
            DisplayedResponse = JsonData["message"] + " " + `${xhr.status}`;
            console.log(xhr.response, xhr.responseXML);

            formStatues = "error";
            isElementInview(formSection, formInView, formIsInNotView_And_ErrorOccured)
          }
        };
        xhr.send(data);
        submitBtn.disabled = true;
      }
    }, 300),
    2000
  );
  return false;
};
let anchorContent;
function formIsNotInView(){
  alertItem.writeAlertContent(DisplayedResponse);
  alertItem.showCard();
  anchorContent = "ارجع الى النموذج"
  alertItem.addAnchor("#stay-up-to-date", anchorContent, "center")
}
function formIsInNotView_And_ErrorOccured(){
  alertItem.writeAlertContent(DisplayedResponse);
  alertItem.showCard();
  anchorContent = "ارجع الى النموذج"
  alertItem.addAnchor("#stay-up-to-date", anchorContent, "center")
}
function formInView(){
  if(formStatues == "error"){
    alertItem.writeAlertContent(DisplayedResponse);
    alertItem.showCard();
  }
}

function formIdel() {
  if (form.classList.contains("sent")) {
    btnText.innerText = "ارسل بنجاح";
    formStatues = "idle"
    processingIcon.classList.remove("processing");
    setTimeout(() => {
      form.classList.add("sent");
    }, 300);
    
    const formReactivateBtn = document.createElement("button");
    formReactivateBtn.innerText =
      "تم تسجيل بريدك بنجاح, هل تريد التسجيل ببريد اخر؟ اضغط هنا لاعادة فتح الطلب";
    formReactivateBtn.classList.add("form-activation-btn");
    formSection.append(formReactivateBtn);

    formReactivation(formReactivateBtn);
  }
}
let formReactivateDelay = 700;
function formReactivation(reactivateBtn) {
  reactivateBtn.addEventListener("click", () => {
    form.classList.add("active-again");
    submitBtn.disabled = false;
    setTimeout(() => {
      btnText.innerText = "تسجل في قائمة البريد خاصتنا";
    }, 500);
    setTimeout(() => {
      form.classList.remove("sent");
      reactivateBtn.classList.add("idle");
    }, formReactivateDelay);
    setTimeout(() => {
      reactivateBtn.remove();
    }, 1000);
  });
}
