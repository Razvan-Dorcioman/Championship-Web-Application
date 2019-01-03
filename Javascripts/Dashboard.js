function getTopUsersFromDB(){
    var usersArray = selectTopUsers();
    document.getElementById("loadingIcon").style.display = 'block';

    while(topUsersState === false) {
        setTimeout(console.log('Loading'), 1000);
    }

    document.getElementById("loadingIcon").style.display = 'none';

    console.log(usersArray[1].score);


}

function addRowInTable(user, score)
{
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