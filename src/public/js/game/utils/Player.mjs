/**
 * Class representing a player in the Tic Tac Toe game.
 * @class Player
 * @property {string} name - The name of the player.
 * @property {string} symbol - The symbol of the player ('x' or 'o').
 * @property {boolean} isAI - Whether the player is an AI.
 **/
export default class Player {
  constructor(name, symbol, isAI = false) {
    this.name = name;
    this.symbol = symbol;
    this.isAI = isAI;
  }
}
