import Game from './Game.js';
import GameEngine from './GameEngine.js';
import Scene from './Scene.js';

export default class GameSceneHandler {
  private game: Game;

  private engine: GameEngine;

  private scenes: Scene[];

  private currentScene: number;

  /**
   * Initialise the game
   *
   * @param game Game
   */
  public constructor(game: Game) {
    this.game = game;
    this.engine = new GameEngine(this);
    this.scenes = [new Scene(this.game.getCanvas(), this.game.getUserData())];
    this.currentScene = 0;
  }

  /**
   * Method that starts the game engine
   */
  public start(): void {
    this.engine.start();
  }

  /**
   * Method that processes the user input
   */
  public processInput(): void {
    this.scenes[this.currentScene].processInput();
  }

  /**
   * Method that updates the game
   *
   * @param elapsed Time passed in ms
   * @returns 'True' or 'False'
   */
  public update(elapsed: number): boolean {
    this.scenes[this.currentScene].update();
    return false;
  }

  /**
   * Method that renders the game on canvas
   */
  public render(): void {
    this.scenes[this.currentScene].draw();
  }
}
