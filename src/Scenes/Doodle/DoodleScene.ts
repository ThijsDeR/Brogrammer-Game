import Coin from "../../Props/Coin.js";
import CollideHandler from "../../CollideHandler.js";
import GameLevel from "../../GameLevel.js";
import Prop from "../../Props/Prop.js";
import Scene from "../../Scene.js";
import TextProp from "../../Props/TextProp.js";
import UserData from "../../UserData.js";
import Cloud from "./Cloud.js";
import DoodlePlayer from "./DoodlePlayer.js";

export default class DoodleScene extends GameLevel {
  private player: DoodlePlayer;

  private props: Prop[];

  private texts: TextProp[];
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData);

    this.props = [
      // Starting Cloud
      new Cloud(0, 900, canvas.width, 150),
      new Cloud(
        (Math.random() * canvas.width) / 1.2,
        canvas.height / 1.5,
        canvas.width / 5,
        65
      ),
      new Cloud(
        (Math.random() * canvas.width) / 1.2,
        canvas.height / 3,
        canvas.width / 5,
        65
      ),
      new Cloud(
        (Math.random() * canvas.width) / 1.2,
        canvas.height / 6,
        canvas.width / 5,
        65
      ),
      new Coin((Math.random() * canvas.width) / 1.2, canvas.height / 6, 32, 32),
    ];

    this.texts = [
      new TextProp(
        `Coins: ${this.userData.getCoins()}`,
        this.canvas.width / 2,
        40,
        20,
      )
    ]

    this.createCoins(canvas);

    this.player = new DoodlePlayer(
      this.canvas.width / 2,
      this.canvas.height / 2,
      100,
      100
    );
  }

  public createCoins(canvas: HTMLCanvasElement) {
    for (let i = 0; i < 5; i++) {
      this.props.push(
        new Coin(
          (Math.random() * canvas.width) / 1.2,
          Math.random() * canvas.height,
          32,
          32
        )
      );
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
    this.texts.forEach((text) => {
      text.draw(this.ctx)
    })
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
          this.userData.increaseCoins(prop.getScore());
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
    return this;
  };
}
