import Coin from "../../Props/Coin.js";
import CollideHandler from "../../CollideHandler.js";
import GameLevel from "../../GameLevel.js";
import Prop from "../../Props/Prop.js";
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import Cloud from "./Cloud.js";
import DoodlePlayer from "./DoodlePlayer.js";
import Game from "../../Game.js";
import HubScene from "../Hub/HubScene.js";
import DoodleEnemy from "./DoodleEnemy.js";
import GameInfo from "../../GameInfo.js";
import Question from "./Question.js";
import CutScene from "../../CutScene.js";
import QuestionCutscene from "./QuestionCutscene.js";
import FallLine from "./FallLine.js";
import CloudPlatform from "./CloudPlatform.js";
import SonNPC from "./NPC_Son/SonNPC.js";
import SonNPCCutscene from "./NPC_Son/SonNPCCutscene.js";
import MenuCutScene from "../MenuCutScene.js";
import DoodleInfo from "./Info/DoodleInfo.js";

export default class DoodleScene extends GameLevel {
  private player: DoodlePlayer;

  private props: Prop[];

  private nextScene: Scene;

  private backgroundMusic: HTMLAudioElement;

  private sonNPC: SonNPC;

  private cutScene: null | CutScene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData);

    this.props = [
      // fall line
      new FallLine(0, this.canvas.height - (this.canvas.height / 100), this.canvas.width, this.canvas.height / 100, 'transparent', 'fill'),

      // Starting Cloud
      new CloudPlatform(this.canvas.width / 10 , this.canvas.height - this.canvas.height / 20, canvas.width - (this.canvas.width / 10) * 2, this.canvas.height / 10),

      // finishing line
      new CloudPlatform(this.canvas.width / 10, DoodleInfo.LEVEL_YPOS_FINISH * this.canvas.height, canvas.width - (this.canvas.width / 10) * 2, this.canvas.height / 10)
    ];


    this.sonNPC = new SonNPC((this.canvas.width / 2) - (this.canvas.width / 40), (DoodleInfo.LEVEL_YPOS_FINISH * this.canvas.height) - (this.canvas.height / 10), this.canvas.width / 20, this.canvas.height / 10, this.canvas, this.userData)


    this.createProps();

    this.player = new DoodlePlayer(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 25,
      this.canvas.height / 8,
      this.userData
    );

    this.nextScene = this

    // background music
    this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'SkyBackgroundMusic.wav');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5
    this.backgroundMusic.play();

    this.cutScene = null
  }

  public createProps(): void {
    let previousHeight = this.canvas.height / 4
    let previousQuestionHeight = 0;
    let i = 0
    let atFinish = false
    while (i < 1000 && atFinish === false) {
      let xPos = Game.randomNumber(this.canvas.width / 8, this.canvas.width - this.canvas.width / 8);
      let yPos = Game.randomNumber(previousHeight + (this.canvas.height / 5), previousHeight + ((this.canvas.height / 10) * 3));
      let cloudWidth = this.canvas.width / 5;
      let cloudHeight = this.canvas.height / 20;
      let coinWidth = this.canvas.width / 40;
      let coinHeight = coinWidth
      let enemyHeight = this.canvas.height / 20;
      let enemyWidth = this.canvas.width / 20;
      let questionYPos = Game.randomNumber(previousQuestionHeight + (this.canvas.height * 5), previousQuestionHeight + (this.canvas.height * 8));

      if (this.canvas.height - yPos < DoodleInfo.LEVEL_YPOS_FINISH * this.canvas.height) {
        atFinish = true
        break
      }

      // Creates a new Cloud
      previousHeight = yPos
      this.props.push(
        new Cloud(
          xPos,
          this.canvas.height - yPos,
          cloudWidth,
          cloudHeight,
        )
      );

      // Creates a new Question
      previousQuestionHeight = questionYPos
      this.props.push(
        new Question(
          0,
          this.canvas.height - questionYPos,
          this.canvas.width,
          this.canvas.height / 100,
          'red',
          'fill',
        )
      )

      const rng = Game.randomNumber(1, 10)

      if (rng <= 5) {
        this.props.push(
          new Coin(
            xPos + (cloudWidth / 2) - (coinHeight / 2),
            this.canvas.height - yPos - (coinHeight * 2),
            coinWidth,
            coinHeight,
          )
        );
      } else if (rng >= 10) {
        this.props.push(
          new DoodleEnemy(
            xPos + (cloudWidth / 2),
            this.canvas.height - yPos - enemyHeight,
            enemyWidth,
            enemyHeight,
          )
        )
      }

      i++
    }
  }


  /**
   * drawing the scene
   */
  public draw(): void {
    this.ctx.fillStyle = "LightSkyBlue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'Sky_background.jpg'), 0, 0, this.canvas.width, this.canvas.height)

    this.props.forEach((prop) => {
      prop.draw(this.ctx, 0, this.player.getMinYPos() - (this.canvas.height / 2));
    });


    this.sonNPC.draw(this.ctx, 0, this.player.getMinYPos() - (this.canvas.height / 2))


    this.player.draw(this.ctx, 0, this.player.getMinYPos() - (this.canvas.height / 2));
    // Draw text on canvas

    Scene.writeTextToCanvas(
      this.ctx,
      `Munten: ${this.userData.getCoins()}`,
      this.canvas.width / 2,
      this.canvas.height / 25,
      this.canvas.height / 25,
      'white',
    )

    if (this.cutScene !== null) {
      this.cutScene.draw()
    }
  }

  /**
   * processing the input of the scene
   */
  public processInput(): void {
    if (this.cutScene === null) {
      this.player.processInput();
    } else {
      this.cutScene.processInput();
    }
  }

  /**
   * update the scene
   *
   * @returns Next Scene
   */
  public update = (elapsed: number): Scene => {
    if (this.cutScene === null) {
      let playerOnPlatform = false
      let contacts: number[] = [];
      this.props.forEach((prop, propIndex) => {
        if (CollideHandler.collides(this.player, prop)) {
          const contact = CollideHandler.getContactData(this.player, prop);

          // Check if instance of prop === Cloud
          // Then checks if the player makes contact with the top of cloud
          // After contact makes the cloud dissappear.
          if (prop instanceof Cloud) {
            contacts.push(contact);
            if (!(prop instanceof CloudPlatform)) {
              if (contact === CollideHandler.TOP_CONTACT) {

                prop.disappear();
              }
            } else {

              playerOnPlatform = true
            }
          }

          // Checks if the instance of prop === Coin.
          // Then check if the player makes contact with a coin prop.
          // If the player makes contact, Adds 1 point to their total points.
          if (prop instanceof Coin) {
            this.userData.increaseCoins(prop.getPoints());
            this.props.splice(propIndex, 1);
            const coinSound = new Audio(GameInfo.SOUND_PATH + 'CoinSound.wav')
            coinSound.play();
          }

          // Checks if the instance of prop === Question.
          // Then check if the player makes contact with a Question prop.
          // If the player makes contact, throws a question.
          if (prop instanceof Question) {
            this.cutScene = new QuestionCutscene(this.canvas, this.userData, this.player);
            this.props.splice(propIndex, 1);
            this.backgroundMusic.pause()
            const questionPopUpSound = new Audio(GameInfo.SOUND_PATH + 'Pop.wav')
            questionPopUpSound.play()
          }

          // Checks if the instance of prop === DoodleEnemy.
          // Then check if the player makes contact with a DoodleEnemy prop.
          // If the player makes contact, the player dies.
          if (prop instanceof DoodleEnemy) {
            this.player.die();
            this.props.splice(propIndex, 1);
            const enemySound = new Audio(GameInfo.SOUND_PATH + 'HitEnemy.wav')
            enemySound.volume = 0.5;
            enemySound.play();
          }

          if (prop instanceof FallLine) {
            this.player.die();
            const enemySound = new Audio(GameInfo.SOUND_PATH + 'HitEnemy.wav')
            enemySound.volume = 0.5;
            enemySound.play();
          }

        }

        // Makes the cloud disappear slowly
        if (prop instanceof Cloud) {
            if (prop.hasDisappeared()) {
              this.props.splice(propIndex, 1);
            } else {
              prop.makeDisappear(elapsed)
            }
        }
      });

      if (CollideHandler.collides(this.player, this.sonNPC)) {
        if (this.player.isInteracting()) {
          this.cutScene = this.sonNPC.interact()
        }
      }

      this.player.move(this.canvas, contacts, elapsed, playerOnPlatform);
      // Checks if the player is dead.
      // If dead === true. Send the player back to the HUB.
      if (this.player.isDead()) {
        this.nextScene = new HubScene(this.canvas, this.userData)
      }

      if (this.player.isPausing()) {
        this.cutScene = new MenuCutScene(this.canvas, this.userData)
      }
    } else {
      const cutsceneDone = this.cutScene.update(elapsed)
      if (cutsceneDone) {
        if (this.cutScene instanceof SonNPCCutscene) {
          this.nextScene = this.cutScene.getOptionalScene()
          const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
          winSound.volume = 0.6;
          winSound.play();
          this.userData.changeNPCStoryProgress({name: 'doodle', talkedTo: true, finished: true})
        } else {
          let optionalCutScene = this.cutScene.getOptionalScene()
          if (optionalCutScene) this.nextScene = optionalCutScene
          this.cutScene = null;
          this.backgroundMusic.play()
        }
      }
    }
    if (this.nextScene !== this) {
      this.backgroundMusic.pause()
      this.backgroundMusic = null
    }
    return this.nextScene;
  };
}
