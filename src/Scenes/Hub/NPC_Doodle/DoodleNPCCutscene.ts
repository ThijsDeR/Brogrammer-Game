import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import UserData from '../../../UserData.js';
import DoodleNPC from './DoodleNPC.js';

export default class DoodleNPCCutscene extends CutScene {
  private doodleNPC: DoodleNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    doodleNPC: DoodleNPC,
  ) {
    super(canvas, userData)

    this.doodleNPC = doodleNPC

    const sentences = [
      "Hello young robot, could you help me.",
      "I've found myself in quite a predicament.",
      "You see, my son was taken away to the top of the clouds.",
      "Could you go up there and help him get back?",
      "Thank you!",
      "Behind me is a portal that teleports you to the lowest point of the cloud staircase.",
      "Let me unlock this portal so you can easily go there."
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
