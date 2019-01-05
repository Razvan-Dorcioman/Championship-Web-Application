function getTopUsersFromDB() {
    var usersArray = selectTopUsers();
    document.getElementById("loadingIcon").style.display = 'block';

    while (topUsersState === false) {
        setTimeout(console.log('Loading'), 1000);
    }

    document.getElementById("loadingIcon").style.display = 'none';

    console.log(usersArray[1].score);


}

function addRowInTable(user, score) {
    if (!document.getElementsByTagName) return;
    let tabBody = document.getElementsByTagName("tbody").item(0);
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let textnode1 = document.createTextNode(user);
    let textnode2 = document.createTextNode(score);
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    row.appendChild(cell1);
    row.appendChild(cell2);
    tabBody.appendChild(row);
}

function openSettings() {
    document.getElementById('settings').style.display = "block";
}

window.onclick = function () {
    if (event.target === document.getElementById('settings')) {
        document.getElementById('settings').style.display = "none";

        let numberTeams = document.getElementById("dropTeams");
        numberTeams.innerHTML = 'Select...';

        let gameType = document.getElementById("dropGames");
        gameType.innerHTML = 'Select...';

        document.getElementById("teams").innerHTML = '';
    }
};

function closeSettings() {
    document.getElementById('settings').style.display = "none";
    let numberTeams = document.getElementById("dropTeams");
    numberTeams.innerHTML = 'Select...';

    let gameType = document.getElementById("dropGames");
    gameType.innerHTML = 'Select...';

    document.getElementById("teams").innerHTML = '';

}

function setNumberOfTeams(number) {
    let numberTeams = document.getElementById("dropTeams");
    numberTeams.innerHTML = number;

}

function setGameType(gameName) {
    let gameType = document.getElementById("dropGames");
    gameType.innerHTML = gameName;
    let fileName;

    switch (gameName) {
        case 'Counter Strike : Global Offensive':
            fileName = 'CSGO.html';
            break;

        case 'Rocket League':
            fileName = 'RocketLeague.html';
            break;

        case 'Battlefield 5':
            fileName = 'Battlefield5.html';
            break;

        case 'Fifa 19':
            fileName = 'Fifa19.html';
            break;
    }

    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("teams").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "../AjaxFiles/" + fileName, true);
    xhttp.send();
}

function setPlayers(vs) {
    let teamVS = document.getElementById('teamVSteam');
    teamVS.innerHTML = vs;
}