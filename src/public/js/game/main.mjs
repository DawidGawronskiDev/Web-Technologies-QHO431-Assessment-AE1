import Controller from "./utils/Controller.mjs";
import GameBoard from "./utils/GameBoard.mjs";
import Player from "./utils/Player.mjs";

// Initialize the game with a new Controller instance
(function () {
  new Controller(new GameBoard(document.getElementById("gameboard")), [
    new Player("Player 1", "x"),
    new Player("Player 2", "o", true),
  ]);
})();
