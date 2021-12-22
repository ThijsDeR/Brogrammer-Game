import KeyboardListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserData from './UserData.js';

export default abstract class CutScene extends Scene {
  protected keyboardListener: KeyboardListener

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.keyboardListener = new KeyboardListener()
  }
}