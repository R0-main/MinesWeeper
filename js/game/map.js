import { findedCases, map, bombCoords } from './settings';
export function saveMapAs(x, y, type) {
    if (!checkMap(x, y, 'bomb')) {
        map[`${x}-${y}`] = type;
    }
}

export function checkMap(x, y, type) {
    if (type == 'any' && getMapCase(x, y)) return true;
    else if (map[`${x}-${y}`] == type) return true;
    return false;
}

export function getMapCase(x, y) {
    return parseInt(map[`${x}-${y}`]) || 0;
}

export function getAllBombs() {
    let bombsCoords = [];

    for (let i = 0; i < Object.keys(map).length; i++) {
        if (Object.values(map)[i] != 'bomb') continue;
        bombsCoords.push(Object.keys(map)[i]);
    }
    return bombsCoords;
}

export function addFindedCase(x, y) {
    return findedCases.push(`${x}-${y}`);
}

export function findAdjacentCases(x, y) {
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

export function generateGrid(x, y) {
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




export class Coordinates {
    constructor(x, y) {
        return {
            x: x,
            y: y
        };
    }
}