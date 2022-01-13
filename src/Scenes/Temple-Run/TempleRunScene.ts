import CollideHandler from "../../CollideHandler.js";
import Game from "../../Game.js";
import GameInfo from "../../GameInfo.js";
import GameLevel from "../../GameLevel.js";
import Platform from "../../Props/Platform.js";
import Scene from '../../Scene.js';
import UserData from "../../UserData.js";
import HubScene from "../Hub/HubScene.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunPlayer from "./TempleRunPlayer.js";
import TRQuestion from "./TRQuestion.js";

export default class TempleRunScene extends GameLevel {
  private player: TempleRunPlayer;

  private question: null | TRQuestion;

  private score: number;

  private backgroundMusic: HTMLAudioElement;

  public constructor(
    canvas: HTMLCanvasElement, 
    userData: UserData
  ) {
    super(canvas, userData)

    this.player = new TempleRunPlayer(this.canvas.width / 4, this.canvas.height / 2, this.canvas.width / 40, this.canvas.height / 10)

    this.question = new TRQuestion(this.canvas, this.player)

    this.score = 0

    this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'CaveBackgroundMusic.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.2
    this.backgroundMusic.play();
  }

  private newQuestion(): void {
    this.question = new TRQuestion(this.canvas, this.player)
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(Game.loadNewImage('./assets/img/cave_pixelart_background.png'), 0, 0, this.canvas.width, this.canvas.height)
    this.question.draw(this.ctx, this.player.getMinXPos() - this.canvas.width / 10)
    this.player.draw(this.ctx, this.player.getMinXPos() - this.canvas.width / 10)
    Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width / 2, this.canvas.width / 40, this.canvas.height / 50, 'white')
  }

  public processInput(): void {
    this.player.processInput()
  }

  public update(elapsed: number): Scene {
    let contacts: number[] = []
    this.question.getProps().forEach((prop) => {
      if (CollideHandler.collides(this.player, prop)) {
        if (prop instanceof Platform) {
          const contact = CollideHandler.getVerticalContactData(this.player, prop);
          contacts.push(contact)
          if (contact === CollideHandler.TOP_CONTACT) {
            this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
          } else if (contact === CollideHandler.BOTTOM_CONTACT) {
            this.player.setYPos(prop.getMaxYPos())
          }
        } else if (prop instanceof DeadProp) {
          this.player.die()
          const wrongSound = new Audio(GameInfo.SOUND_PATH + 'Wrong.mp3')
          wrongSound.volume = 0.8;
          wrongSound.play();
          this.backgroundMusic.pause();
          this.backgroundMusic = null
        } else if (prop instanceof CorrectProp) {
          this.userData.increaseCoins(10)
          this.score += 1;
          const correctSound = new Audio(GameInfo.SOUND_PATH + 'Correct.wav');
          correctSound.volume = 0.6;
          correctSound.play();
          this.newQuestion()
        }
      }
    })
    this.player.speed_up()
    this.player.move(this.canvas, contacts, elapsed)
    if (this.player.isDead()) return new HubScene(this.canvas, this.userData)
    return this
  }
}