import CollideHandler from '../../CollideHandler.js';
import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import HubScene from '../Hub/HubScene.js';
import PokeInfo from './PokeInfo.js';
import PokePlayer from './PokePlayer.js';

export default class PoketaleScene extends GameLevel {
  private player: PokePlayer;

  private score: number;

  private backgroundMusic: HTMLAudioElement;

  private nextScene: Scene;

  private cutScene: CutScene | null

  public constructor(
    canvas: HTMLCanvasElement, 
    userData: UserData
  ) {
    super(canvas, userData)

    this.player = new PokePlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData)

    this.score = 0

    this.cutScene = null
    this.nextScene = this

    // this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + '');
    // this.backgroundMusic.loop = true;
    // this.backgroundMusic.volume = 0.2
    // this.backgroundMusic.play();
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(Game.loadNewImage('./assets/img/poketale_bg.png'), 0, 0, this.canvas.width, this.canvas.height)
    this.player.draw(this.ctx)
    Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width / 2, this.canvas.width / 40, this.canvas.height / 50, 'white')

    if (this.cutScene !== null) {
      this.cutScene.draw()
    }
  }

  public processInput(): void {
    if (this.cutScene === null) {
      this.player.processInput()
    } else {
      this.cutScene.processInput()
    }
  }

  public update(elapsed: number): Scene {
    if (this.cutScene === null) {
      let contacts: number[] = []
      this.player.move(this.canvas, contacts, elapsed)
      if (this.player.isDead()) return new HubScene(this.canvas, this.userData)
      else if (this.score >= PokeInfo.WIN_SCORE) {
        const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
        winSound.volume = 0.6;
        winSound.play();
        this.nextScene = new HubScene(this.canvas, this.userData)
      }
    } else {
      const cutsceneDone = this.cutScene.update(elapsed)
      if (cutsceneDone) {
        let optionalCutScene = this.cutScene.getOptionalScene()
        if (optionalCutScene) this.nextScene = optionalCutScene
        this.cutScene = null;
        this.backgroundMusic.play()
      }
    }
    if (this.nextScene !== this) {
      this.backgroundMusic.pause();
      this.backgroundMusic = null
    }
    return this.nextScene
  }
}