import CollideHandler from "../../CollideHandler.js";
import PokeInfo from "./PokeInfo.js";
import KeyboardListener from "../../KeyboardListener.js";
import Player from "../../Player.js";

export default class PokePlayer extends Player {
    private dead: boolean;

    public constructor(
        xPos: number,
        yPos: number,
        width: number | undefined = undefined,
        height: number | undefined = undefined
      ) {
          super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height)
          this.dead = false
      }

      /**
       * processing the input of the player
       */
      public processInput(): void {
          this.yVel = 0;
          
          if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) this.yVel = -(PokeInfo.PLAYER_Y_SPEED) * (this.height / 200);
          if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) this.yVel = PokeInfo.PLAYER_Y_SPEED * (this.height / 200);

          this.xVel = 0;

          if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) this.xVel = -(PokeInfo.PLAYER_X_SPEED) * (this.width / 100);
          if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) this.xVel = PokeInfo.PLAYER_X_SPEED * (this.width / 100);

      }

      public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {
          this.xPos += this.xVel * (elapsed / 10)

          if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
              this.yVel = 0;
              if (this.yPos + this.yVel < 0) this.yPos = 0
          }

          if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
              this.yVel = 0;
              if (this.yPos + this.yVel + this.img.height > canvas.height) this.yPos = canvas.height - this.img.height
          }

        //   if (contacts.includes(CollideHandler.LEFT_CONTACT) || this.yPos + this.yVel < 0) {}

        //   if (contacts.includes(CollideHandler.RIGHT_CONTACT) || this.yPos + this.yVel < 0) {}

        this.yPos += this.yVel * 2 * (elapsed / 10);

        this.xPos += this.xVel * (elapsed / 10)

        if (this.xPos < 0) {
        this.xPos = canvas.width - this.img.width
        } else if (this.xPos + this.img.width > canvas.width) {
        this.xPos = 0
        }
      }

      public die(): void {
          this.dead = true;
      }

      public isDead(): boolean {
          return this.dead;
      }
}