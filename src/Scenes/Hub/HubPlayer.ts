import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import Prop from '../../Props/Prop.js';
import UserData from '../../UserData.js';
import HubInfo from './Info/HubInfo.js';

export default class HubPlayer extends Player {
  private climbing: boolean;
  
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    userData: UserData,
  ) {
    console.log(`${userData.getCurrentSkin().src}`)
    super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height)

    this.climbing = false
  }

  public processInput(): void {
    this.xVel = 0;

    if(!this.airborne){
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) this.yVel = -(GameInfo.PLAYER_Y_SPEED) * (this.height / 100);
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) this.xVel = -(GameInfo.PLAYER_X_SPEED) * (this.width / 100);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) this.xVel = GameInfo.PLAYER_X_SPEED * (this.width / 100);

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) this.climbing = true
    else this.climbing = false

    if (this.xVel < 0) this.direction = 'left';
    else if (this.xVel > 0) this.direction = 'right';
  }

  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number, onPlatform?: boolean): void {
    let xVel: number;

    // Give the player a speed penalty when airborne
    if (this.airborne) xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY
    else xVel = this.xVel;

    // Checks if the right side of player collides with something.
    if (xVel < 0) {
      if (!(this.xPos + xVel < 0)) {
        this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY)
      } else {
        this.xVel = 0
      }
    } else {
      if (!(this.xPos + xVel + this.img.width > canvas.width)) {
        this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY)
      } else {
        this.xVel = 0
      }
    }

    const flying = () => {
      this.airborne = true;
      this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
      this.yVel += GameInfo.GRAVITY_CONSTANT * 2 * (elapsed * GameInfo.ELAPSED_PENALTY) * (this.height / 100);
    }
    let shouldBeFlying = true;
    if (this.yPos + this.yVel < 0) {
      this.airborne = true;
      this.yVel = Math.abs(this.yVel / 4);
      shouldBeFlying = false
      if (this.yPos + this.yVel < 0) this.yPos = 0
    }
    
    if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)|| this.yPos + this.yVel + this.img.height > canvas.height) {
      this.airborne = false;
      this.yVel = 0;
      shouldBeFlying = false
      if (this.yPos + this.yVel + this.img.height > canvas.height) this.yPos = canvas.height - this.img.height
    }

    if (this.climbing) shouldBeFlying = false

    if(shouldBeFlying) flying()
  }

  public climb() {
    if (this.climbing) {
      this.yPos -= HubInfo.PLAYER_CLIMB_SPEED
    }
  }
}