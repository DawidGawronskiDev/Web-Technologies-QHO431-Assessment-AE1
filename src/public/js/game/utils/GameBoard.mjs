import PlayerSymbol from "./PlayerSymbol.mjs";

/**
 * Class representing the game board for Tic Tac Toe.
 * @property {HTMLElement} elem - The HTML element for the game board.
 * @property {Array} fields - An array representing the fields of the game board.
 */
export default class GameBoard {
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
