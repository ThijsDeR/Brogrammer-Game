import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import BossInfo from '../../Boss-Fight/Info/BossInfo.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
import BossNPC from './BossNPC.js';
import GameInfo from '../../../GameInfo.js';

export default class BossNPCCutscene extends CutScene {
  private bossNPC: BossNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  private nextScene: Scene | null;

  /**
   * Initialize BossNPCCutscene
   *
   * @param canvas the game canvas
   * @param userData the user data
   * @param bossNPC the boss npc
   */
  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    bossNPC: BossNPC,
  ) {
    super(canvas, userData);

    this.bossNPC = bossNPC;

    const sentences = [
      'Welkom bij het laatste level',
      'Hier zal je de eindbaas AI Foon tegenkomen',
      'Om haar te verslaan moet je haar blokkeren met spatie',
      'Hierdoor schiet je allemaal blokkeerders',
      'Pas op dat je stamina niet op gaat, want dan schiet je trager',
      'Het beste is dan om heel even te wachten met schieten totdat je groene balkje weer vol is',
      'Als je geraakt wordt door haar, verlies je levens. Pas op dat je er niet te veel verliest!',
      'Heel veel succes',
    ];

    const endSentences = [
      'Het portaal is al open hoor',
    ];

    const doneSentences = [
      'Oh, ben je hier alweer?',
      'Je bent al klaar met dit level, als je er nog eens doorheen wilt mag het van mij',
      'Succes!',
    ];

    if (this.userData.getNPCStoryProgress(BossInfo.BOSS_PROGRESS_OBJECT_NAME).finished) this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, doneSentences, `${GameInfo.IMG_PATH}chatbox.png`);
    else if (
      this.userData.getNPCStoryProgress(
        BossInfo.BOSS_PROGRESS_OBJECT_NAME,
      ).talkedTo === true) {
      this.bossNPC.finishInteraction();
      this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences, `${GameInfo.IMG_PATH}chatbox.png`);
    } else this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, `${GameInfo.IMG_PATH}chatbox.png`);
    this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences, `${GameInfo.IMG_PATH}chatbox.png`);

    this.nextScene = null;
  }

  /**
   *
   */
  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bossNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
    this.textBox.draw(this.ctx);
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_E)) {
      this.textBox.nextSentence();
    }
  }

  /**
   * update the cutscene
   *
   * @param elapsed the time elapsed since last frame
   * @returns boolean
   */
  public update(elapsed: number): boolean {
    this.textBox.advanceSentence(elapsed);
    if (this.textBox.isDone()) {
      this.bossNPC.finishInteraction();
      const originalData = this.userData.getNPCStoryProgress(
        PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME,
      );
      if (
        this.userData.getNPCStoryProgress(
          TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME,
        ).finished) {
        this.userData.changeNPCStoryProgress(
          {
            name: PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME,
            talkedTo: true,
            finished: originalData.finished,
          },
        );
      }
      if (
        this.userData.getNPCStoryProgress(
          TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME,
        ).finished) {
        this.textBox = this.endTextBox;
      }
      this.textBox.reset();
      return true;
    }
    return false;
  }

  /**
   * Getter for optional Scene
   *
   * @returns optional Scene
   */
  public getOptionalScene(): Scene | null {
    return this.nextScene;
  }
}
