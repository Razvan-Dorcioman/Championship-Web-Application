function getInputFromRegister(){
    const regObj = document.getElementById("registerForm");
    var username = regObj.elements[0].value;
    var email = regObj.elements[1].value;
    var password = regObj.elements[2].value;

    if(checkRepeatPwd() === true && checkPwd() === true && userState === true && emailState === true) {
        insertUserIntoDB(username, email, password);
        window.location.href = './Login.html';
    }
    else{
        alert('Invalid inputs!');
        return false;
    }
}

function checkRepeatPwd(){
    const regObj = document.getElementById("registerForm");
    const password = regObj.elements[2].value;
    const repeatPassword = regObj.elements[3].value;
    if(password === repeatPassword){
        document.getElementById("pwdRepErrMsg").innerHTML = "";
        document.getElementById("inputRepPwd").style.borderColor = "green";
        return true;
    }
    else{
        document.getElementById("pwdRepErrMsg").innerHTML = "Password doesn't match";
        document.getElementById("inputRepPwd").style.borderColor = "red";
        return false;
    }
}

function checkPwd(){
    const regObj = document.getElementById("registerForm");
    const password = regObj.elements[2].value;
    if(password.length < 8){
        document.getElementById("pwdErrMsg").innerHTML = "Password must contain at least 8 or more characters";
        document.getElementById("inputPwd").style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById("pwdErrMsg").innerHTML = "";
        document.getElementById("inputPwd").style.borderColor = "green";
        return true;
    }
}
