/**
 * Class representing a player's symbol in the Tic Tac Toe game.
 * @class PlayerSymbol
 * @property {string} symbol - The symbol of the player ('x' or 'o').
 * @property {string} stroke - The stroke color for the symbol.
 * @property {Array} gradient - An array of gradient stops for the symbol.
 * @throws {Error} If the symbol is not 'x' or 'o'.
 */
export default class PlayerSymbol {
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
