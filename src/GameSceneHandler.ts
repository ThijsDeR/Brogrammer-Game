import Game from './Game.js';
import GameEngine from './GameEngine.js';
import Scene from './Scene.js';

export default class GameSceneHandler {
  private game: Game;

  private engine: GameEngine;

  private scenes: Scene[];

  private currentScene: number;

  /**
   * l
   *
   * @param game l
   */
  public constructor(game: Game) {
    this.game = game;
    this.engine = new GameEngine(this);
    this.scenes = [new Scene(this.game.getCanvas())];
    this.currentScene = 0;
  }

  /**
   * l
   */
  public start(): void {
    this.engine.start();
  }

  /**
   * l
   */
  public processInput(): void {
    this.scenes[this.currentScene].processInput();
  }

  /**
   * l
   *
   * @param elapsed l
   * @returns l
   */
  public update(elapsed: number): boolean {
    this.scenes[this.currentScene].update();
    return false;
  }

  /**
   * l
   */
  public render(): void {
    this.scenes[this.currentScene].draw();
  }
}
