import { Coordinates } from "./map";

export let map = {};
export let started = false;
export let bombs = () => {
    return document.getElementById("bomb-entry").value;
};
export let gridSize = () => {
    return {
        x: document.getElementById("grid-entry").value,
        y: document.getElementById("grid-entry").value
    };
};
export let needToClick = ((gridSize().x * gridSize().y) - bombs()) - 1;
export let firstCoords = new Coordinates(0, 0);


export let findedCases = [];
export let flagedCases = [];
export let bombCoords = [];
export let renderBomb = () => {
    return document.getElementById("render-bomb").checked;
};
