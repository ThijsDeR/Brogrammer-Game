import Player from './Player.js';
import Scene from './Scene.js';

export default abstract class GameLevel extends Scene{

  public abstract draw(): void;

  public abstract processInput(): void;

  public abstract update(elapsed: number): Scene;
}