const dialog = document.getElementById("game-dialog");
const gameResult = document.getElementById("game-result");
const restartButton = document.getElementById("restart-game");

/**
 * Class representing the game controller for Tic Tac Toe.
 * @class Controller
 * @property {GameBoard} gameboard - The game board instance.
 * @property {Array} players - An array of Player instances.
 * @property {number} currentPlayerIndex - The index of the current player.
 * @property {Player|null} winner - The player who has won the game.
 * @property {boolean} isDraw - Whether the game is a draw.
 **/
export default class Controller {
  constructor(gameboard, players) {
    this.gameboard = gameboard;
    this.players = players;
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.isDraw = false;

    this.boundHandleMove = this.handleMove.bind(this);

    this.init();
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
    gameResult.textContent = this.isDraw
      ? "It's a draw!"
      : `${this.winner.name} wins!`;
    dialog.showModal();
  }

  setWinner(winner) {
    this.winner = winner;
  }
}
