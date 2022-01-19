
import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import HubScene from '../Hub/HubScene.js';
import BossInfo from './Info/BossInfo.js';
import BossPlayer from './BossPlayer.js';
import Boss from './Boss.js';
import CollideHandler from '../../CollideHandler.js';

export default class BossScene extends GameLevel {
  private player: BossPlayer;

  private boss: Boss;

  private score: number;

  private backgroundMusic: HTMLAudioElement;

  private nextScene: Scene;

  private cutScene: CutScene | null

  private clickFunction: (event: MouseEvent) => void

  public constructor(
    canvas: HTMLCanvasElement, 
    userData: UserData
  ) {
    super(canvas, userData)

    this.player = new BossPlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData)

    this.boss = new Boss((this.canvas.width / 2) - (this.canvas.width / 20), (this.canvas.height / 2) - (this.canvas.height / 10), (this.canvas.width / 10), (this.canvas.height / 5))

    this.score = 0

    this.cutScene = null
    this.nextScene = this
    
    this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'CaveBackgroundMusic.mp3')
    this.backgroundMusic.volume = 0.6
    this.backgroundMusic.loop = true
    this.backgroundMusic.play()

    this.clickFunction = (event: MouseEvent) => {
      console.log('shoot')
      this.player.shootProjectile({x: event.x, y: event.y})
    }

    this.canvas.addEventListener('click', this.clickFunction)
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'boss-fight-background.jpg'), 0, 0, this.canvas.width, this.canvas.height)
    this.player.draw(this.ctx)
    this.boss.draw(this.ctx)

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
      this.player.update(elapsed)
      this.boss.update(elapsed)
      this.boss.shootProjectile(elapsed, this.player)
      this.boss.getProjectiles().forEach((projectile) => {
        if (CollideHandler.collides(this.player, projectile.getRectProp())) {
          this.player.die()
        }
      })

      this.player.getProjectiles().forEach((projectile, projectileIndex) => {
        if (CollideHandler.collides(this.boss, projectile.getImage())) {
          this.boss.getHit()
          this.player.removeProjectile(projectileIndex)
        }
      })

      if (this.player.isDead()) {
        this.nextScene = new HubScene(this.canvas, this.userData)
        this.canvas.removeEventListener('click', this.clickFunction)
      }
      else if (this.boss.isDead()) {
        const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
        winSound.volume = BossInfo.WIN_SOUND_VOLUME;
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