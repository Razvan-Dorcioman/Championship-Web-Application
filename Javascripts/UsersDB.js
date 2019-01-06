function insertUserIntoDB(username, email, password) {
    var docName = username;
    db.collection("users").doc(docName).set({
        username: username,
        email: email,
        password: password,
        score: 0,
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

    const usersRef = db.collection('users').doc(username);

    usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                document.getElementById("userLoginMsg").innerHTML = "";
                document.getElementById("userLogin").style.borderColor = "green";
                if(docSnapshot.data().password === password){
                    localStorage.setItem('logUser', docSnapshot.data().username);
                    localStorage.setItem('logScore', docSnapshot.data().score);
                    localStorage.setItem('logGameCreated', docSnapshot.data().gameCreated);
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

var topUsersState = false;
function selectTopUsers(){

    const usersRef = db.collection('users');
    const query = usersRef.orderBy("score" , "desc").limit(11);
    var i = 1;

    query.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            if(doc.exists) {
                var username = doc.data().username;
                var score = doc.data().score;
                localStorage.setItem('topUsers' + i, username);
                localStorage.setItem('topScore' + i, score);
                i++;
                topUsersState = true;
            }
            else{
                console.log('Document is empty!');
                topUsersState = false;
            }
        });
    });
}

