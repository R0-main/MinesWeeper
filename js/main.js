let map = {};
let started = false;
let bombs = () => {
    return document.getElementById("bomb-entry").value;
};
let gridSize = () => {
    return {
        x: document.getElementById("grid-entry").value,
        y: document.getElementById("grid-entry").value
    };
};
let needToClick = ((gridSize().x * gridSize().y) - bombs()) - 1;
let firstCoords = {
    x: 0,
    y: 0
};


let findedCases = [];
let flagedCases = [];
let bombCoords = [];
let renderBomb = () => {
    return document.getElementById("render-bomb").checked;
};;


function leftClick(x, y) {
    if (!started) {
        initGame(x, y);
        const adjacentCases = findAdjacentCases(x, y);
        adjacentCases.forEach(({ x, y }) => revealCase(x, y));
    }

    // check if is flag 
    if (flagedCases.includes(`${x}-${y}`)) return;

    // check if is bomb 
    if (bombCoords.includes(`${x}-${y}`)) {
        return endGame(x, y);
    }

    if (needToClick == 0 && !findedCases.includes(`${x}-${y}`)) {
        win();
    }
    // return if is defined 
    else if (findedCases.includes(`${x}-${y}`)) return;
    revealCase(x, y);
}

function rightClick(x, y) {
    // check if the case is already clicked 
    if (flagedCases.includes(`${x}-${y}`)) {
        return resetCase(x, y);
    }
    if (findedCases.includes(`${x}-${y}`)) return;
    // save as a flag
    flagedCases.push(`${x}-${y}`);
    // apply the flag texture 
    setCaseTexture(x, y, `case_flag`);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}


function resetCase(x, y) {
    setCaseTexture(x, y, "case");
    delete flagedCases[flagedCases.indexOf(`${x}-${y}`)];
}

function setCaseTexture(x, y, texture) {
    if (document.getElementById(`${x}-${y}`))
        document.getElementById(`${x}-${y}`).src = `assets/${texture}.png`;
}

// prevent context menu appearing
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});


function initGame(x, y) {

    started = true;
    firstCoords.x = x;
    firstCoords.y = y;

    for (let i = 0; i < bombs(); i++) {
        randomCoords();
    }

    bombCoords.forEach(bomb => {
        let bombX = parseInt(bomb.split('-')[0]);
        let bombY = parseInt(bomb.split('-')[1]);

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;
                saveMapAs(bombX + x, bombY + y, getMapCase(bombX + x, bombY + y) + 1);
            }
        }
    });
}

function findAdjacentCases(x, y) {
    const adjacentCases = [];

    for (let row = x - 1; row <= x + 1; row++) {
        for (let col = y - 1; col <= y + 1; col++) {
            if (row < 0 || row >= gridSize().x || col < 0 || col >= gridSize().y) {
                continue;
            }
            if (row === x && col === y) {
                continue;
            }

            if (checkMap(x, y, 'any') == 0 && !flagedCases.includes(`${row}-${col}`)) {
                adjacentCases.push({ x: row, y: col });
            }
        }
    }

    return adjacentCases;
}

function updateScore() {
    document.getElementById(`score`).innerHTML = `Score : ${((gridSize().x * gridSize().y) - bombs()) - needToClick}/${(gridSize().x * gridSize().y) - bombs()}`;
}

function revealCase(x, y) {
    if (flagedCases.includes(`${x}-${y}`))
        return;
    if (!findedCases.includes(`${x}-${y}`)) {
        needToClick--;
        updateScore();
    }

    if (checkMap(x, y, 'any') != 0 || findedCases.includes(`${x}-${y}`)) {
        // Case is not empty or already revealed, return
        setCaseTexture(x, y, `case_${getCaseTexture(x, y)}`);
        addFindedCase(x, y);
    }
    else {
        // Case is empty and not yet revealed, reveal it
        setCaseTexture(x, y, `case_${getCaseTexture(x, y)}`);
        addFindedCase(x, y);

        // Reveal adjacent empty cases recursively
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const adjacentX = x + i;
                const adjacentY = y + j;
                if (adjacentX < 0 || adjacentX > gridSize().x - 1 || adjacentY < 0 || adjacentY > gridSize().y - 1) continue; // check boundaries
                revealCase(adjacentX, adjacentY);
            }
        }
    }
}


function randomCoords() {
    let x = getRandomInt(gridSize().x) - 1;
    let y = getRandomInt(gridSize().y) - 1;

    // check if the generated coordinates are within the forbidden area
    const isForbidden = x >= firstCoords.x - 1 && x <= firstCoords.x + 1
        && y >= firstCoords.y - 1 && y <= firstCoords.y + 1;

    if (isForbidden || bombCoords.includes(`${x}-${y}`)) {
        randomCoords();
        return;
        // regenerate coordinates if they are in the forbidden area or already contain a bomb
    }
    saveMapAs(x, y, 'bomb');
    if (renderBomb()) {
        setCaseTexture(x, y, 'case_bomb');
    }
    bombCoords.push(`${x}-${y}`);
}

function saveMapAs(x, y, type) {
    if (!checkMap(x, y, 'bomb')) {
        map[`${x}-${y}`] = type;
    }
}

function checkMap(x, y, type) {
    if (type == 'any' && getMapCase(x, y)) return true;
    else if (map[`${x}-${y}`] == type) return true;
    return false;
}

function getMapCase(x, y) {
    return parseInt(map[`${x}-${y}`]) || 0;
}

function endGame(x, y) {

    flagedCases.forEach((flag) => {
        bombCoords.forEach((bomb) => {
            let flagX = parseInt(flag.split('-')[0]);
            let flagY = parseInt(flag.split('-')[1]);

            if (flag != bomb)
                setCaseTexture(flagX, flagY, 'case_not_bomb');
        });
    });
    bombCoords.forEach((bomb) => {
        let bombX = parseInt(bomb.split('-')[0]);
        let bombY = parseInt(bomb.split('-')[1]);

        if (x == bombX && y == bombY) {
            setCaseTexture(x, y, 'case_red_bomb');
        }
        else
            setCaseTexture(bombX, bombY, 'case_bomb');
    });



    //location.reload();;
}

function getAllBombs() {
    let bombsCoords = [];

    for (let i = 0; i < Object.keys(map).length; i++) {
        if (Object.values(map)[i] != 'bomb') continue;
        bombsCoords.push(Object.keys(map)[i]);
    }
    return bombsCoords;
}

function getCaseTexture(x, y) {
    return getMapCase(x, y) || 0;
}

function addFindedCase(x, y) {
    return findedCases.push(`${x}-${y}`);
}

function win() {
    alert('You win !');
}

function generateGrid(x, y) {
    // Sélectionnez l'élément parent pour ajouter la grille
    var parent = document.getElementById("main-grid");

    // Créez une boucle pour générer la grille avec les éléments HTML
    for (var i = 0; i < y; i++) {
        // Créez un élément de colonne
        var column = document.createElement("div");
        column.id = "column-" + i;
        column.className = "column";

        // Ajoutez une colonne à l'élément parent
        parent.appendChild(column);

        for (var j = 0; j < x; j++) {
            // Créez un élément de case
            var cell = document.createElement("a");
            cell.setAttribute('onclick', `leftClick(${j}, ${i})`);
            cell.setAttribute('oncontextmenu', `rightClick(${j}, ${i})`);
            // Ajoutez une case à la colonne
            column.appendChild(cell);

            // Créez un élément d'image pour la case
            var image = document.createElement("img");
            image.id = `${j}-${i}`;
            image.src = "assets/case.png";

            // Ajoutez l'image à la case
            cell.appendChild(image);
        }
    }
};

function generateArea() {
    generateGrid(gridSize().x, gridSize().y);
    document.getElementById('start-btn').setAttribute("disabled", "true");
    updateScore();
}
