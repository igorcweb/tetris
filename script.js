const main = document.querySelector(".main");

const playfield = [];

//Create Filed 10x20
for (let i = 0; i < 20; i++) {
	playfield.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

let gameSpeed = 400;
let activeTetro = {
	x: 0,
	y: 0,
	shape: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
};


function draw() {
	let mainInnerHTML = "";
	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] === 1) {
				mainInnerHTML += '<div class="cell moving-cell"></div>';
			} else if (playfield[y][x] === 2) {
				mainInnerHTML += '<div class="cell fixed-cell"></div>';
			} else {
				mainInnerHTML += '<div class="cell"></div>';
			}
		}
	}
	main.innerHTML = mainInnerHTML;
}

function removePrevActiveTetro() {
	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] === 1) {
				playfield[y][x] = 0;
			}
		}
	}
}

function addActiveTetro() {
	removePrevActiveTetro();
	for (let y = 0; y < activeTetro.shape.length; y++) {
		for (let x = 0; x < activeTetro.shape[y].length; x++) {
			if (activeTetro.shape[y][x] === 1) {
				playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
			}

		}

	}
}

function hasCollision() {
	for (let y = 0; y < activeTetro.shape.length; y++) {
		for (let x = 0; x < activeTetro.shape[y].length; x++) {
			if (activeTetro.shape[y][x] &&
				(playfield[activeTetro.y + y] === undefined ||
					playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||
					playfield[activeTetro.y + y][activeTetro.x + x] === 2)
			) {
				return true;
			}
		}
	}
	return false;
}


function removeFullLines() {
	let canRemoveLine = true;
	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] !== 2) {
				canRemoveLine = false;
				break;
			}
		}
		if (canRemoveLine) {
			playfield.splice(y, 1);
			playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}

		canRemoveLine = true;
	}
}

function fixTetro() {
	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x]) {
				playfield[y][x] = 2;
			}
		}
	}

	removeFullLines();

}

draw();

document.onkeydown = function (e) {
	if (e.keyCode === 37) {
		// moveTetroLeft();
		activeTetro.x -= 1;
		if (hasCollision()) {
			activeTetro.x += 1;
		}
	} else if (e.keyCode === 39) {
		// moveTetroRight();
		activeTetro.x += 1;
		if (hasCollision()) {
			activeTetro.x -= 1;
		}
	} else if (e.keyCode === 40) {
		// moveTetroDown();
		activeTetro.y += 1;
		if (hasCollision()) {
			activeTetro.y -= 1;
			fixTetro();
			activeTetro.y = 0;

		}
	}
	addActiveTetro();
	draw();
};


addActiveTetro();
draw();

// function startGame() {
// 	activeTetro.y += 1;
// 	if (hasCollision()) {
// 		activeTetro.y -= 1;
// 	}
// 	addActiveTetro();
// 	draw();
// 	setTimeout(startGame, gameSpeed);
// }

// setTimeout(startGame, gameSpeed);