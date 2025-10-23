# MinesWeeper

A lightweight browser-based implementation of the classic Minesweeper puzzle written in vanilla JavaScript, HTML, and CSS. The game dynamically builds a grid of cells, plants bombs, and lets players uncover safe tiles or flag suspicious positions.

## Features

- Adjustable grid size and bomb count through the in-page controls.
- First-click safety: the initial cell you open is guaranteed to be free of bombs.
- Keyboard- and mouse-friendly interactions for revealing, flagging, and scanning neighboring cells.
- Automatically tracks discovered cells, flagged bombs, and score as the board is cleared.
- Optional bomb rendering toggle (useful for debugging or teaching the game mechanics).

## Getting Started

1. Clone the repository.
2. Open `index.html` in any modern browser.
3. Adjust the grid size, bomb count, or enable bomb rendering using the controls at the top of the page.
4. Click **Start** to generate a new game board.

No build step or server is required; the game runs entirely in the browser.

## Code Overview

- **`index.html`** – Declares the UI controls and contains the root `<div>` used by the game grid renderer.
- **`css/style.css`** – Handles layout and the visual styling of cells, flags, and bombs.
- **`js/main.js`** – Implements the game logic, including grid generation, neighbor counting, user interaction handlers, and score tracking.

## Usage Examples

Below are a few snippets that illustrate how the main APIs in `js/main.js` work.

### Generating a custom board

```js
// Create a 16x16 board with 40 bombs and ensure bombs are hidden
const gameMap = new Map(16, 16, 40, false);

// Access the internal map representation (object keyed by "x-y")
console.log(gameMap.map['0-0']);
```

### Checking whether coordinates are within the grid

```js
const coords = new Coordinates(5, 7);
const gridBounds = new Coordinates(gameMap.width, gameMap.height);

if (coords.isValid(gridBounds)) {
  // Safe to interact with the cell at (5, 7)
}
```

### Revealing a cell programmatically

```js
// This mimics the logic executed when a player clicks a cell
const target = new Coordinates(3, 2);

if (!gameMap.isBomb(target)) {
  gameMap.revealCase(target);
}
```

These examples highlight the same functions used by the UI event handlers so you can hook into them for custom tooling, AI solvers, or test harnesses.

## Contributing

Issues and pull requests are welcome! Feel free to improve the UI, add accessibility features, or extend the game logic (for example, alternative difficulty presets or a timer).

## License

This project is distributed under the MIT License. See `LICENSE` for details (or choose an appropriate license for your needs if one is not yet present).
