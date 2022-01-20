import CutScene from "../../CutScene.js";
import GameInfo from "../../GameInfo.js";
import KeyboardListener from "../../KeyboardListener.js";
import TextBox from "../../Props/TextBox.js";
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import HubScene from "../Hub/HubScene.js";

export default class BossFightEndCutscene extends CutScene {
  private textBox: TextBox;

  private bossImage: HTMLImageElement

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    bossImage: HTMLImageElement
  ) {
    super(canvas, userData)

    this.bossImage = bossImage

    const sentences = [
      "Wow, je hebt me verslagen",
      "Ik wou nog zoveel chaos veroorzaken, maar dat kan nu niet meer",
      "Adios"
    ]

    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'chatbox.png')
  }

  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.bossImage, 0, 0, this.canvas.width / 4, this.canvas.height)
    this.textBox.draw(this.ctx)
  }

  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_E)) {
      this.textBox.nextSentence()
    }
  }

  public update(elapsed: number): boolean {
    this.textBox.advanceSentence(elapsed)
    if (this.textBox.isDone()) {
      this.textBox.reset()
      return true
    }
    return false
  }

  public getOptionalScene(): Scene | null{
    return new HubScene(this.canvas, this.userData)
  }
}