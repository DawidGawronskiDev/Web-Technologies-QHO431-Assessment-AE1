const gameboard = document.getElementById("gameboard");
const dialog = document.getElementById("game-dialog");
const message = document.getElementById("game-message");
const restartButton = document.getElementById("restart-button");

/**
 * Class representing a player's symbol in the Tic Tac Toe game.
 * @class PlayerSymbol
 * @property {string} symbol - The symbol of the player ('x' or 'o').
 * @property {string} stroke - The stroke color for the symbol.
 * @property {Array} gradient - An array of gradient stops for the symbol.
 * @throws {Error} If the symbol is not 'x' or 'o'.
 */
class PlayerSymbol {
  constructor(symbol, stroke, gradient) {
    this.symbol = symbol;
    this.stroke = stroke ?? "black";
    this.gradient = gradient ?? null;
  }

  /**
   * Renders the SVG representation of the player's symbol.
   * @returns {string} The SVG markup for the player's symbol.
   * @throws {Error} If the symbol is not 'x' or 'o'.
   */
  render() {
    if (this.symbol !== "x" && this.symbol !== "o") {
      throw new Error("Invalid symbol. Use 'x' or 'o'.");
    }

    return `
          <svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" fill="none">
            ${
              this.gradient &&
              `
              <defs>
                <linearGradient id="gradient">
                  ${
                    this.gradient &&
                    this.gradient
                      .map(
                        (stop) =>
                          `<stop offset="${stop.offset}" stop-color="${stop.color}" />`
                      )
                      .join("\n")
                  }
                </linearGradient>
              </defs>`
            }
            ${this[this.symbol === "x" ? "x" : "o"]()}
          </svg>`;
  }

  x() {
    return `
              <path xmlns="http://www.w3.org/2000/svg" d="M12 12L86 86" ${
                this.stroke && !this.gradient && `stroke="${this.stroke}"`
              } stroke-width="22.6274" stroke-linecap="round" ${
      this.gradient && `stroke="url(#gradient)"`
    }/>
              <path xmlns="http://www.w3.org/2000/svg" d="M12 86L86 12" ${
                this.stroke && !this.gradient && `stroke="${this.stroke}"`
              } stroke-width="22.6274" stroke-linecap="round" ${
      this.gradient && `stroke="url(#gradient)"`
    }/>
              `;
  }

  o() {
    return `
              <path xmlns="http://www.w3.org/2000/svg" d="M49 12C28.5655 12 12 28.5655 12 49C12 69.4345 28.5655 86 49 86C69.4345 86 86 69.4345 86 49C86 28.5655 69.4345 12 49 12Z" ${
                this.stroke && !this.gradient && `stroke="${this.stroke}"`
              } stroke-width="22.6274" ${
      this.gradient && `stroke="url(#gradient)"`
    }/>
              `;
  }
}

/**
 * Class representing the game board for Tic Tac Toe.
 * @property {HTMLElement} elem - The HTML element for the game board.
 * @property {Array} fields - An array representing the fields of the game board.
 */
class GameBoard {
  constructor(elem) {
    this.elem = elem;
    this.fields = [];

    return this.init();
  }

  /**
   * Initializes the game board by creating fields and rendering them.
   * @returns {GameBoard} The instance of the GameBoard class.
   */
  init() {
    this.fields = new Array(9).fill(null).map((_, index) => ({
      id: index,
      value: null,
      success: null,
    }));
    this.render();
  }

  /**
   * Renders the game board by creating HTML elements for each field.
   * Each field is represented by a div with specific data attributes.
   * The field's value is displayed as a player's symbol ('x' or 'o') or left empty if null.
   */
  render() {
    this.elem.innerHTML = "";

    this.fields.forEach((field) => {
      const fieldElem = document.createElement("div");
      fieldElem.className = "field";
      fieldElem.dataset.id = field.id;
      fieldElem.dataset.symbol = field.value;
      fieldElem.dataset.success = field.success;

      if (field.value === "x") {
        fieldElem.innerHTML = new PlayerSymbol(
          "x",
          fieldElem.dataset.success === "true" ? "white" : null,
          fieldElem.dataset.success !== "true" && [
            {
              offset: "0%",
              color: "var(--color-accent-1)",
            },
            {
              offset: "100%",
              color: "var(--color-accent-3)",
            },
          ]
        ).render();
      } else if (field.value === "o") {
        fieldElem.innerHTML = new PlayerSymbol(
          "o",
          fieldElem.dataset.success === "true" ? "white" : null,
          fieldElem.dataset.success !== "true" && [
            {
              offset: "0%",
              color: "var(--color-accent-1)",
            },
            {
              offset: "100%",
              color: "var(--color-accent-3)",
            },
          ]
        ).render();
      } else {
        fieldElem.textContent = "";
      }

      this.elem.appendChild(fieldElem);
    });
  }
}

/**
 * Class representing a player in the Tic Tac Toe game.
 * @class Player
 * @property {string} name - The name of the player.
 * @property {string} symbol - The symbol of the player ('x' or 'o').
 * @property {boolean} isAI - Whether the player is an AI.
 **/
class Player {
  constructor(name, symbol, isAI = false) {
    this.name = name;
    this.symbol = symbol;
    this.isAI = isAI;
  }
}

/**
 * Class representing the game controller for Tic Tac Toe.
 * @class Controller
 * @property {GameBoard} gameboard - The game board instance.
 * @property {Array} players - An array of Player instances.
 * @property {number} currentPlayerIndex - The index of the current player.
 * @property {Player|null} winner - The player who has won the game.
 * @property {boolean} isDraw - Whether the game is a draw.
 **/
class Controller {
  constructor(gameboard, players) {
    this.gameboard = gameboard;
    this.players = players;
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.isDraw = false;

    this.boundHandleMove = this.handleMove.bind(this);

    this.init();

    dialog.showModal();
  }

  init() {
    this.move();
  }

  /**
   * Starts the game by setting up the initial state and event listeners.
   * If the current player is an AI, it will automatically make a move after a delay.
   **/
  move() {
    if (
      this.players[this.currentPlayerIndex].isAI &&
      (!this.winner || !this.isDraw)
    ) {
      setTimeout(() => this.aiMove(), 1000);
      return;
    }

    window.addEventListener("click", this.boundHandleMove);
  }

  /**
   * Handles the player's move by checking if the clicked field is valid.
   * If valid, it updates the gameboard and checks for a winning combination.
   * @param {Event} e - The click event triggered by the player.
   **/
  handleMove(e) {
    const selectedField = e.target.closest(".field");

    if (
      !selectedField ||
      selectedField.dataset.symbol !== "null" ||
      this.winner ||
      this.isDraw
    ) {
      return;
    }

    const updatedFields = this.handleSelectField(selectedField.dataset.id);

    this.gameboard.fields = updatedFields;

    window.removeEventListener("click", this.boundHandleMove);

    this.continue();
  }

  /**
   * Handles the AI's move by selecting a random available field.
   * If no fields are available, it sets the game as a draw.
   * Updates the gameboard and checks for a winning combination.
   **/
  aiMove() {
    const availableFields = this.gameboard.fields.filter(
      (field) => field.value === null && field.success !== "true"
    );

    if (availableFields.length === 0) {
      this.isDraw = true;
      this.gameboard.fields = this.gameboard.fields.map((field) => ({
        ...field,
        success: "true",
      }));

      return;
    }

    const randomField =
      availableFields[Math.floor(Math.random() * availableFields.length)];
    const updatedFields = this.handleSelectField(randomField.id);
    this.gameboard.fields = updatedFields;
    this.gameboard.render();
    this.continue();
  }

  /**
   * Continues the game after a move by rendering the gameboard,
   * checking for a winning combination, switching players, and allowing the next move.
   * If a player has won or if the game is a draw, it stops further moves.
   **/
  continue() {
    this.gameboard.render();
    this.checkWinningCombination();
    this.switchPlayer();
    this.move();
  }

  /**
   * Handles the selection of a field by updating its value with the current player's symbol.
   * @param {string} fieldId - The ID of the field that was selected.
   * @returns {Array} The updated fields of the gameboard.
   **/
  handleSelectField(fieldId) {
    return this.gameboard.fields.map((field) => {
      if (field.id === parseInt(fieldId)) {
        return {
          ...field,
          value: this.players[this.currentPlayerIndex].symbol,
        };
      }
      return field;
    });
  }

  switchPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  /**
   * Checks for a winning combination on the gameboard.
   * If a winning combination is found, it sets the winner and updates the gameboard fields.
   * If all fields are filled without a winner, it sets the game as a draw.
   * @returns {void}
   **/
  checkWinningCombination() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.gameboard.fields[a].value &&
        this.gameboard.fields[a].value === this.gameboard.fields[b].value &&
        this.gameboard.fields[a].value === this.gameboard.fields[c].value
      ) {
        this.setWinner(this.players[this.currentPlayerIndex]);
        this.gameboard.fields = this.gameboard.fields.map((f) => {
          if (combination.includes(parseInt(f.id))) {
            return { ...f, success: "true" };
          } else {
            return f;
          }
        });
        this.gameboard.render();
        this.renderDialog();
        break;
      }
    }

    if (this.gameboard.fields.every((field) => field.value)) {
      this.isDraw = true;

      const updatedFields = this.gameboard.fields.map((field) => ({
        ...field,
        success: "true",
      }));
      this.gameboard.fields = updatedFields;
      this.gameboard.render();
      this.renderDialog();
    }
  }

  renderDialog() {
    dialog.showModal();
  }

  setWinner(winner) {
    this.winner = winner;
  }
}

// Initialize the game with a new Controller instance
(function () {
  new Controller(new GameBoard(document.getElementById("gameboard")), [
    new Player("Player 1", "x"),
    new Player("Player 2", "o", true),
  ]);
})();
