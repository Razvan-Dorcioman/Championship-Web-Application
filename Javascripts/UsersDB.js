function insertUserIntoDB(username, email, password) {
    var docName = username;
    db.collection("users").doc(docName).set({
        username: username,
        email: email,
        password: password,
        gameCreated: 0
    }).then(function() {
        alert('Register success!');
    }).catch(function() {
        alert('Register failed!');
        });
}

var userState;
function checkUsernameDB(){
    const regObj = document.getElementById("registerForm");
    const myUser = regObj.elements[0].value;
    const usersRef = db.collection('users').doc(myUser);


    usersRef.get()
        .then((docSnapshot) => {
                if (docSnapshot.exists) {
                document.getElementById("userErrMsg").innerHTML = "This username already exist!";
                document.getElementById("inputUser").style.borderColor = "red";
                userState = false;
            } else {
                document.getElementById("userErrMsg").innerHTML = "";
                document.getElementById("inputUser").style.borderColor = "green";
                userState = true;
            }
        });
}

var emailState;
function checkEmailDB(){
    const regObj = document.getElementById("registerForm");
    const myEmail = regObj.elements[1].value;
    const usersRef = db.collection('users');

    const query = usersRef.where('email', '==', myEmail);
    query.get().then(function(querySnapshot){
        if (querySnapshot.empty) {
            document.getElementById("emailErrMsg").innerHTML = "";
            document.getElementById("inputEmail").style.borderColor = "green";
            emailState = true;
        } else {
            document.getElementById("emailErrMsg").innerHTML = "This email already exist!";
            document.getElementById("inputEmail").style.borderColor = "red";
            emailState = false;
        }
    })
}

function verifyUserDB(){
    const logObj = document.getElementById("loginForm");
    var username = logObj.elements[0].value;
    var password = logObj.elements[1].value;
    console.log("Aici!!!");
    const usersRef = db.collection('users').doc(username);

    usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                document.getElementById("userLoginMsg").innerHTML = "";
                document.getElementById("userLogin").style.borderColor = "green";
                if(docSnapshot.data().password === password){
                    console.log("Success!");
                    window.location.href = './Dashboard.html';
                }
                else{
                    document.getElementById("pwdLoginMsg").innerHTML = "Password doesn't match!";
                    document.getElementById("pwdLogin").style.borderColor = "red";
                }
            } else {
                document.getElementById("userLoginMsg").innerHTML = "Username doesn't exist!";
                document.getElementById("userLogin").style.borderColor = "red";
            }
        });
}

