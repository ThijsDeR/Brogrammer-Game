import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import HubScene from '../../Hub/HubScene.js';
import SonNPC from './SonNPC.js';
import GameInfo from '../../../GameInfo.js';

export default class SonNPCCutscene extends CutScene {
  private sonNPC: SonNPC;

  private textBox: TextBox;

  /**
   * Initialize SonNPCCutscene
   *
   * @param canvas the game canvas
   * @param userData user data
   * @param sonNPC the SonNPC
   */
  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    sonNPC: SonNPC,
  ) {
    super(canvas, userData);

    this.sonNPC = sonNPC;

    const sentences = [
      'Oh dankjewel, ik ben hier al zo lang.',
      'Ik moest zelfs die vieze slimes opeten, ewwww.',
      'Laten we nu maar teruggaan.',
    ];

    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, `${GameInfo.IMG_PATH}chatbox.png`);
  }

  /**
   * draw the SonNPCCutscene
   */
  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.sonNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
    this.textBox.draw(this.ctx);
  }

  /**
   * process the input of the cutscene
   */
  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_E)) {
      this.textBox.nextSentence();
    }
  }

  /**
   * update the cutscene
   *
   * @param elapsed the time elapsed since last frame
   * @returns boolean
   */
  public update(elapsed: number): boolean {
    this.textBox.advanceSentence(elapsed);
    if (this.textBox.isDone()) {
      this.sonNPC.finishInteraction();
      this.textBox.reset();
      return true;
    }
    return false;
  }

  /**
   * Getter for optional scene
   *
   * @returns optional scene
   */
  public getOptionalScene(): Scene {
    return new HubScene(this.canvas, this.userData);
  }
}
