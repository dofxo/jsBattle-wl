/**
 * An array to store boxes.
 * @type {Array}
 */
const boxes = [];

/**
 * An array to store positions of boxes.
 * @type {Array}
 */
const boxPositions = [];

/**
 * The score of the game.
 * @type {number}
 */
let score = 0;

/**
 * The x-coordinate of the player.
 * @type {number}
 */
let playerXCoor = 0;

/**
 * The y-coordinate of the player.
 * @type {number}
 */
let playerYCoor = 0;

/**
 * Object to store the container width and height.
 * @type {object}
 */
let containerDetails = {
	width: 0,
	height: 0,
};

/**
 * The position of the player.
 * @type {object}
 */
let playerPosition;

/**
 * Reference to the document's body element.
 * @type {Element}
 */
const body = document.body;

/**
 * The main application function.
 */
const App = () => {
	/**
	 * The score element.
	 * @type {Element}
	 */
	const scoreElement = document.createElement("div");
	scoreElement.className = "score";
	body.appendChild(scoreElement);

	/**
	 * The player element.
	 * @type {Element}
	 */
	const playerElement = document.createElement("div");
	playerElement.className = "player";
	body.appendChild(playerElement);

	/**
	 * Updates the position of the player based on the current coordinates.
	 */
	const updatePlayerPosition = () => {
		playerElement.style.left = `${playerXCoor}px`;
		playerElement.style.top = `${playerYCoor}px`;

		const playerRect = playerElement.getBoundingClientRect();

		playerPosition = {
			left: playerRect.left,
			right: playerRect.right,
			top: playerRect.top,
			bottom: playerRect.bottom,
		};
	};

	/**
	 * Updates the score element with the current score.
	 */
	const updateScore = () => {
		scoreElement.textContent = `Score: ${score}`;
	};

	/**
	 * Restarts the game by resetting the player coordinates and updating the player position.
	 */
	const restartGame = () => {
		playerXCoor = 0;
		playerYCoor = 0;
		updatePlayerPosition();
	};

	/**
	 * Handles key events for player movement.
	 * @param {KeyboardEvent} event - The key event object.
	 */
	const handleKeyEvent = (event) => {
		switch (event.key) {
			case "ArrowRight":
				playerXCoor += 20;
				break;
			case "ArrowLeft":
				playerXCoor -= 20;
				break;
			case "ArrowDown":
				playerYCoor += 20;
				break;
			case "ArrowUp":
				playerYCoor -= 20;
				break;
			default:
				break;
		}
		updatePlayerPosition();
	};

	/**
	 * Checks for collision between the player and boxes,
	 * updates the score, and restarts the game if a collision occurs.
	 */
	const checkCollision = () => {
		if (playerPosition && boxPositions) {
			boxPositions.forEach((item) => {
				if (
					playerPosition.right >= item.left &&
					playerPosition.left <= item.right &&
					playerPosition.top <= item.bottom &&
					playerPosition.bottom >= item.top
				) {
					score++;
					updateScore();
					restartGame();
				}
			});
		}
	};

	/**
	 * Updates the positions of all the boxes.
	 */
	const updateBoxPositions = () => {
		const boxElements = document.querySelectorAll(".box");
		boxPositions.length = 0;

		[...boxElements].map((boxElement) => {
			const boxRect = boxElement.getBoundingClientRect();

			const boxPosition = {
				left: boxRect.left,
				right: boxRect.right,
				top: boxRect.top,
				bottom: boxRect.bottom,
			};
			boxPositions.push(boxPosition);
		});
	};

	/**
	 * Creates a box element at the specified coordinates.
	 * @param {number} x - The x-coordinate of the box.
	 * @param {number} y - The y-coordinate of the box.
	 */
	const createBox = (x, y) => {
		const boxElement = document.createElement("div");
		boxElement.className = "box";

		boxElement.style.left = `${x}px`;
		boxElement.style.top = `${y}px`;

		body.appendChild(boxElement);
	};

	/**
	 * Generates random boxes on the screen.
	 */
	const generateBoxes = () => {
		const { width, height } = containerDetails;
		for (let i = 0; i < 10; i++) {
			const x = Math.floor(Math.random() * width);
			const y = Math.floor(Math.random() * height);
			createBox(x, y);
		}
		updateBoxPositions();
	};

	/**
	 * Retrieves the container details and initiates the game setup.
	 */
	const getContainerDetails = () => {
		const { width, height } = body.getBoundingClientRect();
		containerDetails = { width, height };
		generateBoxes();
	};

	/**
	 * Initializes the game by setting up the container details,
	 * updating player position, score, and adding event listeners.
	 */
	const initialize = () => {
		getContainerDetails();
		updatePlayerPosition();
		updateScore();
		window.addEventListener("keydown", handleKeyEvent);
		setInterval(checkCollision, 100);
	};

	// Call the initialize function to start the game.
	initialize();
};

// Call the App function to run the game.
App();
