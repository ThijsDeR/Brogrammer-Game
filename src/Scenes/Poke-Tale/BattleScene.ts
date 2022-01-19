import CutScene from "../../CutScene.js";
import KeyboardListener from "../../KeyboardListener.js";
import TextBox from "../../Props/TextBox.js";
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import PokeEnemy from "./PokeEnemy.js";
import PokePlayer from "./PokePlayer.js";
import GameInfo from '../../GameInfo.js';
import Game from "../../Game.js";


export default class BattleScene extends CutScene{
// no movement needed, just draw the enemy and the player. give them 4 options and if they choose correct one. score goes up by one
// verschillende types? als in: kan goed zijn 1 punt/ 0, je blijft op dat scherm, is helemaal goed 1 punt en door naar volgende, fout blijft ook op het scherm en -1, super fout blijf op scherm -2
  private player: PokePlayer;

  private enemy: PokeEnemy;

  private textBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    player: PokePlayer,
    enemy: PokeEnemy,
  ) {
    super(canvas, userData)

    const sentences = [
      "test"
    ]

    this.player = player
    this.enemy = enemy
    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'PokeBox.png')
  }

  public draw(): void {
    // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'Battle-ground.png'), 0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.player.getImage(), 150, 480, this.canvas.width / 4, this.canvas.height / 4)
    this.ctx.drawImage(this.enemy.getImage(), 1150, 360, this.canvas.width / 4, this.canvas.height / 4)
    this.textBox.draw(this.ctx)
  }

  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.textBox.nextSentence()
    }
  }

  public update(elapsed: number): boolean {
    if (this.textBox.isDone()) {
      this.textBox.reset()
      return true
    }
    return false
  }

  public getOptionalScene(): Scene | null{
    return null
  }
}
