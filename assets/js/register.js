

let signupForm = document.getElementsByClassName("signupForm")[0]
let OTPPage = document.getElementsByClassName("otpsection")[0]
// const generateOTP = require('../../server/email/generateOTP')

// PASSWORD VISIBILITY
function showPassword(element){
    var x = document.getElementById(element);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}
// END PASSWORD VISIBILITY

const wrapper = document.querySelector(".wrapper")
const signupHeader = document.querySelector(".signup header")
const loginHeader = document.querySelector(".login header")

loginHeader.addEventListener("click",()=>{
    wrapper.classList.add("active")
})
signupHeader.addEventListener("click",()=>{
    wrapper.classList.remove("active")
})
function movetologin(){
    wrapper.classList.add("active")
}
// signupHeader.addEventListener("click",()=>{
//     wrapper.classList.remove("active")
// })

// OTP SECTION
const inputs = document.querySelectorAll("input")
const button = document.querySelector("button")

    // iterate over all inputs
    const inputArray = []
    for(let i=6;i<10;i++){
        let inp = document.getElementsByTagName('input')[i]
        inputArray.push(inp)
    }
    inputArray.forEach((input, index1) =>{
        input.addEventListener("keyup", (e) =>{
            const currentInput = input
            const nextInput = input.nextElementSibling
            const prevInput = input.previousElementSibling

            if(currentInput.value.length > 1){
                currentInput.value = ""
                return;
            }
            if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== ""){
                nextInput.removeAttribute("disabled")
                nextInput.focus()
            }

            // if backspace key is pressed
            if(e.key === "Backspace"){
                // iterate over all inputs again
                inputArray.forEach((input , index2) =>{
                    if(index1 <= index2 && prevInput){
                        input.setAttribute("disabled",true)
                        input.value = ""
                        prevInput.focus()
                    }
                })
            }

            if(document.getElementById("lastOTPNum").disabled===false && document.getElementById("lastOTPNum").value !== ""){
                document.getElementById("otpBtn").classList.add("activeOTPBtn")
                return;
            }
            document.getElementById("otpBtn").classList.remove("activeOTPBtn")
        })
    })
    // focus the first input which index is 0 on window load
    window.addEventListener("load", ()=> inputs[0].focus())
//END OTP SECTION
         
//     let otp
    document.getElementById("signupNextBtn").addEventListener("click",function(){
    signupForm.style.display = "none"
    OTPPage.style.display = "flex" 
    })
// END SIGNUP PAGE

// FORGET PASSWORD
// function forgetpassword(){
//     document.getElementById("loginPassword").style.display = "none"
// }
