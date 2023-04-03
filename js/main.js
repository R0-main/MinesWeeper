let map = {};
let started = false;
let bombs = 10;
let firstCoords = {
    x: 0,
    y: 0
};
let findedCases = [];
let flagedCases = [];
let bombCoords = [];


function leftClick(x, y) {
    if (!started) return initGame(x, y);
    // check if is flag 
    if (flagedCases.includes(`${x}-${y}`)) return;

    // check if is bomb 
    if (bombCoords.includes(`${x}-${y}`)) {
        return endGame();
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

    for (let i = 0; i < bombs; i++) {
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

    breakAllBasic(x, y);
}

function breakAllBasic(x, y) {
    return;
}

function revealCase(x, y) {
    // map the number
    setCaseTexture(x, y, `case_${getCaseTexture(x, y)}`);
    addFindedCase(x, y);
}

function randomCoords() {
    let x = getRandomInt(9);
    let y = getRandomInt(9);

    if (x == firstCoords.x && y == firstCoords.y || bombCoords.includes(`${x}-${y}`)) {
        randomCoords();
        return;
    }
    saveMapAs(x, y, 'bomb');
    setCaseTexture(x, y, 'case_bomb');
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

function endGame() {
    location.reload();
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