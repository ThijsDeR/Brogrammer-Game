import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import UserData from '../../../UserData.js';
import TempleRunNPC from './TempleRunNPC.js';

export default class TempleRunNPCCutscene extends CutScene {
  private doodleNPC: TempleRunNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    doodleNPC: TempleRunNPC,
  ) {
    super(canvas, userData)

    this.doodleNPC = doodleNPC

    const sentences = [
      "Please help me, my son is trapped at the top of the clouds.",
      "Can you save him?"
    ]

    const endSentences = [
      "The portal has already been opened, Go forth young robot."
    ]

    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences)
    this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences)
  }

  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.doodleNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height)
    this.textBox.draw(this.ctx)
  }

  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.textBox.nextSentence()
    }
  }

  public update(elapsed: number): boolean {
    this.textBox.advanceSentence(elapsed)
    if (this.textBox.isDone()) {
      this.doodleNPC.finishInteraction();
      this.textBox = this.endTextBox
      this.textBox.reset()
      return true
    }
    return false
  }
  
}