
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
    // location.reload()
}

function win() {
    alert('You win !');
}