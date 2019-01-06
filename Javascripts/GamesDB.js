function insertGameIntoDB(name, game, owner, teams, players){
    var docName = name;
    db.collection("games").doc(docName).set({
        name:name,
        game: game,
        teams: teams,
        players: players,
        owner: owner
    })
    .catch(function() {
        alert('Insert game failed!');
    });
}

function selectAllChampionshipFromDB(){
    const gamesRef = db.collection('games');
    var i = 1;

    gamesRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.exists){
                    var name = doc.data().name;
                    var game = doc.data().game;
                    var players = doc.data().players;
                    var teams = doc.data().teams;
                    var owner = doc.data().owner;

                    localStorage.setItem('gName' + i, name);
                    localStorage.setItem('gGame' + i, game);
                    localStorage.setItem('gPlayers' + i, players);
                    localStorage.setItem('gTeams' + i, teams);
                    localStorage.setItem('gOwner' + i, owner);

                    i++;
                }
                    localStorage.setItem('champLength', i-1);
            });
        }).catch(err => {
            console.log("Error getting documents", err);
        });
}

function deleteChampionshipFromDB(name){
    db.collection("games").doc(name).delete().then(function() {
        console.log("Document successfully deleted: " + name);
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}