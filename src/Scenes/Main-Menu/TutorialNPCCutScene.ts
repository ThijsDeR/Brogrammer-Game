import CutScene from '../../CutScene.js';
import KeyboardListener from '../../KeyboardListener.js';
import TextBox from '../../Props/TextBox.js';
import UserData from '../../UserData.js';
import MainNPC from './MainNPC.js';


export default class TutorialNPCCutscene extends CutScene {
  private doodleNPC: MainNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    doodleNPC: MainNPC,
  ) {
    super(canvas, userData)

    this.doodleNPC = doodleNPC

    const sentences = [
      "Goed zo, je weet nu hoe je met NPC'S moet praten",
      "Mijn taak zit erop."
    ]

    const endSentences = [
      "Start het spel en praat met de andere NPC'S"
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
      this.textBox = this.endTextBox
      this.textBox.reset()
      return true
    }
    return false
  }
  
}