var _game = {
    name : '',
    gameType: '',
    teams: 0,
    players: 0
};

var _user = {
    username: localStorage.getItem('logUser'),
    score: localStorage.getItem('logScore'),
    gameCreated: localStorage.getItem('logGameCreated')
};


getTopUsersFromDB();
loadChampionships();

function getTopUsersFromDB() {
    selectTopUsers();

    for(let i = 1; i < 11 ; i++){
        let userKey = 'topUsers' + i;
        let scoreKey = 'topScore' + i;
        if(localStorage.getItem(userKey) != null)
        addRowInTable(i , localStorage.getItem(userKey) , localStorage.getItem(scoreKey));
    }
}

function loadChampionships(){
    selectAllChampionshipFromDB();
    arrSize = localStorage.getItem('champLength');
    for(let i = 1; i <= arrSize ; i++){
        let nameKey = 'gName' + i;
        let gameKey = 'gGame' + i;
        let playersKey = 'gPlayers' + i;
        let teamsKey = 'gTeams' + i;
        let ownerKey = 'gOwner' + i;

        if(localStorage.getItem(nameKey) != null && localStorage.getItem(nameKey) !== 'test'){
            addChampionshipToDashboard(localStorage.getItem(nameKey), localStorage.getItem(gameKey), localStorage.getItem(playersKey), localStorage.getItem(teamsKey), localStorage.getItem(ownerKey));
            localStorage.removeItem(nameKey);
            localStorage.removeItem(gameKey);
            localStorage.removeItem(playersKey);
            localStorage.removeItem(teamsKey);
            localStorage.removeItem(ownerKey);
            localStorage.removeItem('champLength');
        }
    }
}

function addChampionshipToDashboard(name, game, players, teams, owner){
    let main = document.getElementById("mainPage");
    let box = document.createElement("div");

    let delBtn = document.createElement("a");
    delBtn.innerText = "delete";

    delBtn.setAttribute("style", "    font-size: 100%;\n" +
        "    color: red;" +
        "    cursor: pointer;" +
        "    width: 100px;" +
        "    height: 50px" +
        "    float: center;" +
        "    bottom: 0;" +
        "    margin-bottom: 10px;" +
        "    display: none;");

    box.setAttribute("style", "    margin: 50px 0 0 50px;\n" +
        "    height: 250px;\n" +
        "    width: 200px;\n" +
        "    border: 2px solid #00BFFF;\n" +
        "    border-radius: 25px;\n" +
        "    display: grid;\n" +
        "    position: relative;\n" +
        "    background-color: #f9f9f9;\n" +
        "    float: left;" +
        "    text-align: center;");

    let nameDiv = document.createElement("div");

    nameDiv.setAttribute("style", "padding: 10px;" +
        "    border: 2px solid #00BFFF;" +
        "    border-radius: 25px; " +
        "    display: grid;" +
        "    height: 20px;");

    let contentDiv = document.createElement("div");

    contentDiv.setAttribute("style", "padding: 10px;" +
        "    color: blue" +
        "    margin-left: 25px; " +
        "    display: inline-block;");

    var textName = document.createTextNode(name);

    if(_user.username === owner){
        nameDiv.style.color = "red";
        delBtn.style.display = "block";
    }

    delBtn.onclick = function(){
        box.remove();
        deleteChampionshipFromDB(name);
    };

    nameDiv.appendChild(textName);
    contentDiv.innerHTML = game + "<br><br>" + "Team size: " + players + " vs " + players + "<br><br>" + "Number of teams: " + teams + "<br><br>" + "Created by: "+ owner;

    box.appendChild(nameDiv);
    box.appendChild(contentDiv);
    box.appendChild(delBtn);
    main.appendChild(box);
}

function addRowInTable(iter, user, score) {
    if (!document.getElementsByTagName) return;
    let tabBody = document.getElementById("tableBody");
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let textnode1 = document.createTextNode(iter);
    let textnode2 = document.createTextNode(user);
    let textnode3 = document.createTextNode(score);
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    cell3.appendChild(textnode3);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    if(_user.username === user) {
        row.setAttribute("style", "color:red;");
    }

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

        document.getElementById('gameName').value = '';

    }
};

function closeSettings() {
    document.getElementById('settings').style.display = "none";
    let numberTeams = document.getElementById("dropTeams");
    numberTeams.innerHTML = 'Select...';

    let gameType = document.getElementById("dropGames");
    gameType.innerHTML = 'Select...';

    document.getElementById("teams").innerHTML = '';

    document.getElementById('gameName').value = '';

}

function setNumberOfTeams(number) {
    let numberTeams = document.getElementById("dropTeams");
    numberTeams.innerHTML = number;
    _game.teams = Number(number);
}

function setGameType(gameName) {
    let gameType = document.getElementById("dropGames");
    gameType.innerHTML = gameName;
    _game.gameType = gameName;
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
        xhttp = new XMLHttpRequest();
    } else {
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
    let firstWord = vs.replace(/ .*/,'');
    _game.players = Number(firstWord);
}

function createChampionship(){
    _game.name = document.getElementById('gameName').value;

    if(_game.name === '' || _game.gameType === '' || _game.players === 0 || _game.teams === 0){
        document.getElementById('emptyFields').style.display = 'block';
    }
    else {
        insertGameIntoDB(_game.name, _game.gameType, _user.username, _game.teams, _game.players);
        addChampionshipToDashboard(_game.name, _game.gameType, _game.teams, _game.players, _user.username);
        document.getElementById('emptyFields').style.display = 'none';
        _game.name = '';
        _game.gameType = '';
        _game.teams = 0;
        _game.players = 0;

        closeSettings();

    }
}
