import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import TempleRunNPC from './TempleRunNPC.js';

export default class TempleRunNPCCutscene extends CutScene {
  
  private templeRunNPC: TempleRunNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    templeRunNPC: TempleRunNPC,
  ) {
    super(canvas, userData)

    this.templeRunNPC = templeRunNPC

    const sentences = [
      "Ey knul, leuk om je te ontmoeten",
      "Er komen nogal rare geluiden uit deze grot.",
      "Ik heb de ingang geblokkeerd, zodat er niks naar binnen of naar buiten kan.",
      "Zou je kunnen kijken of alles goed gaat daarbinnen?",
      "Aight Bedankt!"

      // "Ey young lad, nice ta meet ya.",
      // "Been hearin' some weird sounds from this cave.",
      // "I've blocked the entrance so nothing ain't going in or out.",
      // "Can ya look if everythin' is alright in there.",
      // "Aight thanks."
    ]

    const endSentences = [
      "De ingang naar de grot is al open hoor!"

      // "I've already opened the entrance to the cave."
    ]

    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences)
    this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences)
    
    if (this.userData.getNPCStoryProgress('templerun').talkedTo === true) this.textBox = this.endTextBox
  }

  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.templeRunNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height)
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
      this.templeRunNPC.finishInteraction();
      this.textBox = this.endTextBox
      this.textBox.reset()
      return true
    }
    return false
  }

  public getOptionalScene(): Scene | null{
    return null
  }
  
}