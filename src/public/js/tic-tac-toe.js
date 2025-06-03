const gameboard = document.getElementById("gameboard");

class PlayerSymbol {
  constructor(symbol, stroke, gradient) {
    this.symbol = symbol;
    this.stroke = stroke ?? "black";
    this.gradient = gradient ?? null;
  }

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

class GameBoard {
  constructor(elem) {
    this.elem = elem;
    this.fields = [];

    return this.init();
  }

  init() {
    this.fields = new Array(9).fill(null).map((_, index) => ({
      id: index,
      value: null,
      success: null,
    }));
    this.render();
  }

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

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class Controller {
  constructor(gameboard, players) {
    this.gameboard = gameboard;
    this.players = players;
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.isDraw = false;

    this.init();
  }

  init() {
    this.move();
  }

  move() {
    window.addEventListener("click", (e) => {
      const selectedField = e.target.closest(".field");

      if (
        !selectedField ||
        selectedField.dataset.symbol !== "null" ||
        this.winner ||
        this.isDraw
      ) {
        return;
      }

      const updatedFields = this.gameboard.fields.map((field) => {
        if (field.id === parseInt(selectedField.dataset.id)) {
          return {
            ...field,
            value: this.players[this.currentPlayerIndex].symbol,
          };
        }
        return field;
      });

      this.gameboard.fields = updatedFields;
      this.gameboard.render();

      selectedField.textContent = this.players[this.currentPlayerIndex].symbol;

      this.checkWinningCombination();

      this.switchPlayer();
    });
  }

  switchPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

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
    }
  }

  setWinner(winner) {
    this.winner = winner;
  }
}

(function () {
  new Controller(new GameBoard(document.getElementById("gameboard")), [
    new Player("Player 1", "x"),
    new Player("Player 2", "o"),
  ]);
})();
