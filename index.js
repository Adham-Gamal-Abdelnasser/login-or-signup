let userNameInput = document.getElementById("userNameInput")
let userEmailInput = document.getElementById("userEmailInput")
let userPasswordInput = document.getElementById("userPasswordInput")
let alertMessage = document.getElementById("alertMessage")
let signBtn = document.getElementById("signBtn")
let loginBtn = document.getElementById("loginBtn")
let logoutBtn = document.getElementById("logoutBtn")
let helloMessage = document.getElementById("helloMessage")

let arrOfUsers = []
if (localStorage.getItem("users")!=null) {
    arrOfUsers = JSON.parse(localStorage.getItem("users"))
}
if (signBtn != null) {
    signBtn.addEventListener("click",signUp)
    
}
if (loginBtn != null) {
    loginBtn.addEventListener("click",logIn)
}
if (helloMessage != null) {
    let userName = JSON.parse(localStorage.getItem("userName"))
    helloMessage.innerHTML = `Welcome ${userName}`
}
if (logoutBtn != null) {
    logoutBtn.addEventListener("click",logOut)
}
function signUp() {
    let userData = {
        Name: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    }
    if (userNameInput.value == "" || userEmailInput.value == "" || userPasswordInput.value == "" || checkEmailExistence() != -1) {
        if (userNameInput.value == "" || userEmailInput.value == "" || userPasswordInput.value == "") {
            getAlert("All Inputs Are Required","text-danger")
        }
        if (checkEmailExistence() != -1) {
            getAlert("Email Is Already Exist","text-danger")
        }
    }
    else {
        getAlert("Success","success")
        arrOfUsers.push(userData)
        localStorage.setItem("users",JSON.stringify(arrOfUsers))
        clearInputs()
    }
}
function logIn() {
    if (userEmailInput.value == "" || userPasswordInput.value == "") {
        getAlert("All Inputs Are Required","text-danger")
    }
    else {
        let res = arrOfUsers.find(ele => ele.email == userEmailInput.value &&  ele.password == userPasswordInput.value)
        if (res == undefined) {
            getAlert("email or password isn't correct" , "text-danger")
        }
        else{
            localStorage.setItem("userName",JSON.stringify(res.Name))
            window.location.href = "welcome.html"
            clearInputs()
        }
    }
    
}
function getAlert(str,cls) {
    alertMessage.innerHTML=str
    alertMessage.classList.replace("d-none","d-block")
    alertMessage.classList.add(cls)
}
function checkEmailExistence() {
    let res = arrOfUsers.findIndex(ele=>ele.email==userEmailInput.value)
    return res
}
function logOut() {
    window.location.href = "index.html"
}
function clearInputs() {
    userNameInput.value=""
    userEmailInput.value=""
    userPasswordInput.value=""
}