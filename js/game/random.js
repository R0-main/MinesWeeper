export function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

export function randomCoords() {
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
    bombCoords.push((`${x}-${y}`));
}