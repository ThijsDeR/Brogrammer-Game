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
import ImageProp from "../../Props/ImageProp.js";
import DoodleEnemy from "./DoodleEnemy.js";
import DoodleLevelInfo from "./DoodleLevelInfo.js";
import RectProp from "../../Props/RectProp.js";

export default class DoodleScene extends GameLevel {
  private player: DoodlePlayer;

  private props: Prop[];

  private nextScene: Scene;

  private backgroundMusic: HTMLAudioElement
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData);

    this.props = [
      // fall line
      new RectProp(0, this.canvas.height - 20, this.canvas.width, 20, 'red', 'fill'),
      // Starting Cloud
      new Cloud(200 , this.canvas.height - 150, canvas.width - 400, 150),

      // finishing line
      new RectProp(0, DoodleLevelInfo.LEVEL_YPOS_FINISH, this.canvas.width, 20, 'red', 'fill')

    ];


    this.createProps();

    this.player = new DoodlePlayer(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 25, 
      this.canvas.height / 8
    );

    this.nextScene = this

    // background music
    this.backgroundMusic = new Audio('./assets/img/Sound/SkyBackgroundMusic.wav');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5
    this.backgroundMusic.play();
  }

  public createProps() {
    let previousHeight = 100
    let i = 0
    let atFinish = false
    while (i < 1000 && atFinish === false) {
      let xPos = Game.randomNumber(this.canvas.width / 8, this.canvas.width - this.canvas.width / 8);
      let yPos = Game.randomNumber(previousHeight + 200, previousHeight + 300);
      let cloudWidth = this.canvas.width / 5;
      let cloudHeight = 65;
      let coinWidth = 32;
      let coinHeight = 32;
      let enemyHeight = 60;
      let enemyWidth = 100;

      if (this.canvas.height - yPos < DoodleLevelInfo.LEVEL_YPOS_FINISH) {
        atFinish = true
        break
      }

      previousHeight = yPos
      this.props.push(
        new Cloud(
          xPos,
          this.canvas.height - yPos,
          cloudWidth,
          cloudHeight,
        )
      );

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
            xPos + (cloudWidth / 2) - 10,
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
    this.props.forEach((prop) => {
      prop.draw(this.ctx, 0, this.player.getYPos() - (this.canvas.height / 2));
    });

    this.player.draw(this.ctx, 0, this.player.getYPos() - (this.canvas.height / 2));
    // Draw text on canvas

    Scene.writeTextToCanvas(
      this.ctx,
      `Coins: ${this.userData.getCoins()}`,
      this.canvas.width / 2,
      40,
      20,
    )
  }

  /**
   * processing the input of the scene
   */
  public processInput(): void {
    this.player.processInput();
  }

  /**
   * update the scene
   *
   * @returns Next Scene
   */
  public update = (elapsed: number): Scene => {
    let contacts: number[] = [];
    this.props.forEach((prop, propIndex) => {
      if (CollideHandler.collides(this.player, prop)) {
        const contact = CollideHandler.getContactData(this.player, prop);

        // Check if instance of prop === Cloud
        // Then checks if the player makes contact with the top of cloud
        // After contact makes the cloud dissappear.
        if (prop instanceof Cloud) {
          contacts.push(contact);
          if (contact === CollideHandler.TOP_CONTACT) {
            // this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
            prop.disappear();
          }

        }

        // Checks if the instance of prop === Coin.
        // Then check if the player makes contact with a coin prop.
        // If the player makes contact, Adds 1 point to their total points.
        if (prop instanceof Coin) {
          this.userData.increaseCoins(prop.getPoints());
          this.props.splice(propIndex, 1);
          const coinSound = new Audio('./assets/img/Sound/CoinSound.wav')
          coinSound.play();
        }

        if (prop instanceof DoodleEnemy) {
          this.player.die();
          this.props.splice(propIndex, 1);
          const enemySound = new Audio('./assets/img/Sound/HitEnemy.wav')
          enemySound.play();
        }

      }

      // Makes the cloud disappear slowly
      if (prop instanceof Cloud) {
        if (prop.hasDisappeared()) {
          this.props.splice(propIndex, 1);
        }
      }
    });
    this.player.move(this.canvas, contacts, elapsed);

    // Checks if the player is dead.
    // If dead === true. Send the player back to the HUB.
    if (this.player.isDead()) {
      this.nextScene = new HubScene(this.canvas, this.userData)
      this.backgroundMusic.pause();
      this.backgroundMusic = null
    } else if (this.player.getYPos() < DoodleLevelInfo.LEVEL_YPOS_FINISH) {
      this.nextScene = new HubScene(this.canvas, this.userData)
      this.backgroundMusic.pause();
      this.backgroundMusic = null
    }
    return this.nextScene;
  };
}
