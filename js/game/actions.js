import { endGame, initGame, win } from "./game";
import { findAdjacentCases } from "./map";
import { findedCases, flagedCases, needToClick, started } from "./settings";
import { resetCase, setCaseTexture } from './render';

export function leftClick(x, y) {
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

export function rightClick(x, y) {
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