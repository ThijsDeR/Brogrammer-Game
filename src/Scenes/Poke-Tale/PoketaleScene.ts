import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import HubScene from '../Hub/HubScene.js';
import PokeTaleInfo from './Info/PokeTaleInfo.js';
import PokePlayer from './PokePlayer.js';
import PokeEnemy from './PokeEnemy.js';
import Prop from '../../Props/Prop.js';
import CollideHandler from '../../CollideHandler.js';
import MenuCutScene from '../MenuCutScene.js';
import BattleScene from './BattleScene.js';

export default class PoketaleScene extends GameLevel {
  private player: PokePlayer;

  private props: Prop[];

  protected score: number;

  private backgroundMusic: HTMLAudioElement;

  private nextScene: Scene;

  private cutScene: CutScene | null;

  /**
   * Constructor of PoketaleScene
   *
   * @param canvas The game field
   * @param userData The data of the user
   */
  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
  ) {
    super(canvas, userData);

    this.player = new PokePlayer(this.canvas.width / 10, this.canvas.height / 1,
      this.canvas.width / 25, this.canvas.height / 8, this.userData);

    this.props = [
      new PokeEnemy(
        Game.randomNumber(0 + (this.canvas.width / 20),
          this.canvas.width - (this.canvas.width / 20)),
        Game.randomNumber(this.canvas.height / 2 + (this.canvas.height / 10),
          this.canvas.height - (this.canvas.height / 10)),
        this.canvas.width / 20,
        this.canvas.height / 10,
      ),

      new PokeEnemy(
        Game.randomNumber(0 + (this.canvas.width / 20),
          this.canvas.width - (this.canvas.width / 20)),
        Game.randomNumber(this.canvas.height / 2 + (this.canvas.height / 10),
          this.canvas.height - (this.canvas.height / 10)),
        this.canvas.width / 20,
        this.canvas.height / 10,
      ),

      new PokeEnemy(
        Game.randomNumber(0 + (this.canvas.width / 20),
          this.canvas.width - (this.canvas.width / 20)),
        Game.randomNumber(this.canvas.height / 2 + (this.canvas.height / 10),
          this.canvas.height - (this.canvas.height / 10)),
        this.canvas.width / 20,
        this.canvas.height / 10,
      ),

      new PokeEnemy(
        Game.randomNumber(0 + (this.canvas.width / 20),
          this.canvas.width - (this.canvas.width / 20)),
        Game.randomNumber(this.canvas.height / 2 + (this.canvas.height / 10),
          this.canvas.height - (this.canvas.height / 10)),
        this.canvas.width / 20,
        this.canvas.height / 10,
      ),

    ];

    this.score = 0;

    this.cutScene = null;
    this.nextScene = this;

    this.backgroundMusic = new Audio(`${GameInfo.SOUND_PATH}PokeTale_bg.wav`);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = PokeTaleInfo.BACKGROUND_MUSIC_VOLUME
    * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
    * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
    this.backgroundMusic.play();
  }

  /**
   * Method that draws
   */
  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(Game.loadNewImage(`${GameInfo.IMG_PATH}poketale_bg.png`), 0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);

    Scene.writeTextToCanvas(
      this.ctx,
      `Score: ${this.score}`,
      this.canvas.width * PokeTaleInfo.SCORE_TEXT_X_POS,
      this.canvas.height * PokeTaleInfo.SCORE_TEXT_Y_POS,
      this.canvas.height * PokeTaleInfo.SCORE_TEXT_FONT_SIZE,
      'black',
    );

    this.props.forEach((prop) => {
      prop.draw(this.ctx);
    });
    if (this.cutScene !== null) {
      this.cutScene.draw();
    }
  }

  /**
   * Method that processes the input of the player
   */
  public processInput(): void {
    if (this.cutScene === null) {
      this.player.processInput();
    } else {
      this.cutScene.processInput();
    }
  }

  /**
   * Method that updates the scene of poketale
   *
   * @param elapsed time elapsed
   * @returns next scene
   */
  public update(elapsed: number): Scene {
    if (this.cutScene === null) {
      const contacts: number[] = [];
      this.props.forEach((prop, propIndex) => {
        if (CollideHandler.collides(this.player, prop)) {
          // //Checks if the instance of prop === PokeEnemy.
          // //Then check if the player makes contact with a PokeEnemy prop.
          // //If the player makes contact, the player dies.
          if (prop instanceof PokeEnemy) {
            this.cutScene = new BattleScene(this.canvas, this.userData, this.player, prop);
            // Should call a startFight function
            this.props.splice(propIndex, 1);
          }
        }
      });

      this.player.move(this.canvas, contacts, elapsed);

      if (this.player.isDead()) {
        this.nextScene = new HubScene(this.canvas, this.userData);
      } else if (this.score >= PokeTaleInfo.WIN_SCORE) {
        const winSound = new Audio(`${GameInfo.SOUND_PATH}Win.mp3`);
        winSound.volume = PokeTaleInfo.WIN_SOUND_VOLUME
        * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
        * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
        winSound.play();
        this.userData.changeNPCStoryProgress({
          name: PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME,
          talkedTo: true,
          finished: true,
        });
        this.userData.increaseCoins(PokeTaleInfo.COMPLETE_SCORE_AWARD);
        this.nextScene = new HubScene(this.canvas, this.userData);
      }

      if (this.player.isPausing()) {
        this.cutScene = new MenuCutScene(this.canvas, this.userData);
      }
    } else {
      const cutsceneDone = this.cutScene.update(elapsed);
      if (cutsceneDone) {
        const optionalCutScene = this.cutScene.getOptionalScene();
        if (optionalCutScene) this.nextScene = optionalCutScene;
        else if (this.cutScene instanceof BattleScene) this.score += this.cutScene.getPoints();
        this.cutScene = null;
        this.backgroundMusic.play();
      }
    }
    if (this.nextScene !== this) {
      this.backgroundMusic.pause();
      this.backgroundMusic = null;
    }
    return this.nextScene;
  }
}
