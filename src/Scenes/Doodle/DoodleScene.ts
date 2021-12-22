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

export default class DoodleScene extends GameLevel {
  private player: DoodlePlayer;

  private props: Prop[];

  private nextScene: Scene;
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData);

    this.props = [
      // Starting Cloud
      new Cloud(200 , 900, canvas.width - 400, 150),
    ];
    

    this.createProps();

    this.player = new DoodlePlayer(
      this.canvas.width / 2,
      this.canvas.height / 2,
      100,
      100
    );

    this.nextScene = this
  }

  public createProps() {
    let previousHeight = 300
    for (let i = 0; i < 5; i++) {
      let xPos = Game.randomNumber(300, this.canvas.width - 300);
      let yPos = Game.randomNumber(previousHeight * 1.2, previousHeight * 1.4);
      let cloudWidth = this.canvas.width / 5;
      let cloudHeight = 65;
      let coinWidth = 32;
      let coinHeight = 32;
      previousHeight = yPos
      this.props.push(
        new Cloud(
          xPos,
          this.canvas.height - yPos,
          cloudWidth,
          cloudHeight,
        )
      );
  
      if (Game.randomNumber(0, 1) === 1) {
        this.props.push(
          new Coin(
            xPos + (cloudWidth / 2) - (coinHeight / 2),
            yPos - (coinHeight * 2),
            coinWidth,
            coinHeight,
          )
        );
      }
    }
  }


  /**
   * drawing the scene
   */
  public draw(): void {
    this.ctx.fillStyle = "LightSkyBlue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.props.forEach((prop) => {
      prop.draw(this.ctx);
    });

    // Draw text on canvas.
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

        if (prop instanceof Cloud) {
          contacts.push(contact);
          if (contact === CollideHandler.TOP_CONTACT) {
            this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
          }
          prop.disappear();
        }

        if (prop instanceof Coin) {
          this.userData.increaseCoins(prop.getPoints());
          this.props.splice(propIndex, 1);
        }
      }

      if (prop instanceof Cloud) {
        if (prop.hasDisappeared()) {
          this.props.splice(propIndex, 1);
        }
      }
    });
    this.player.move(this.canvas, contacts, elapsed);

    if (this.player.isDead()) {
      this.nextScene = new HubScene(this.canvas, this.userData)
    }
    return this.nextScene;
  };
}
