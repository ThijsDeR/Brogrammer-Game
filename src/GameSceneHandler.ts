import DoodleScene from './Scenes/Doodle/DoodleScene.js';
import Game from './Game.js';
import GameEngine from './GameEngine.js';
import HubScene from './Scenes/Hub/HubScene.js';
import MenuScene from './Scenes/Main-Menu/MenuScene.js';
import Scene from './Scene.js';

export default class GameSceneHandler {
  private game: Game;

  private engine: GameEngine;

  private scene: Scene;

  /**
   * Initialise the game
   *
   * @param game Game
   */
  public constructor(game: Game) {
    this.game = game;
    this.engine = new GameEngine(this);
    this.scene = new MenuScene(this.game.getCanvas(), this.game.getUserData());
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
    this.scene.processInput();
  }

  /**
   * Method that updates the game
   *
   * @param elapsed Time passed in ms
   * @returns 'True' or 'False'
   */
  public update(elapsed: number): boolean {
    this.scene = this.scene.update(elapsed);
    return false;
  }

  /**
   * Method that renders the game on canvas
   */
  public render(): void {
    this.scene.draw();
  }
}
