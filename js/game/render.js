import { addFindedCase, checkMap, getMapCase } from "./map";
import { bombs, findedCases, flagedCases, gridSize, needToClick } from "./settings";

export function resetCase(x, y) {
    setCaseTexture(x, y, "case");
    delete flagedCases[flagedCases.indexOf(`${x}-${y}`)];
}

export function setCaseTexture(x, y, texture) {
    if (document.getElementById(`${x}-${y}`))
        document.getElementById(`${x}-${y}`).src = `assets/${texture}.png`;
}

export function updateScore() {
    document.getElementById(`score`).innerHTML = `Score : ${((gridSize().x * gridSize().y) - bombs()) - needToClick}/${(gridSize().x * gridSize().y) - bombs()}`;
}

export function revealCase(x, y) {
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
                resetCase(adjacentX, adjacentY);
            }
        }
    }
}

export function getCaseTexture(x, y) {
    return getMapCase(x, y) || 0;
}