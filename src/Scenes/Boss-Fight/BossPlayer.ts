import CollideHandler from "../../CollideHandler.js";
import BossInfo from "./Info/BossInfo.js";
import KeyboardListener from "../../KeyboardListener.js";
import Player from "../../Player.js";
import UserData from "../../UserData.js";
import GameInfo from "../../GameInfo.js";
import PlayerProjectile from "./PlayerProjectile.js";

export default class BossPlayer extends Player {
  private health: number;

  private stamina: number;

  private projectiles: PlayerProjectile[]

  private lastTimeSinceShot: number;

  public constructor(
      xPos: number,
      yPos: number,
      width: number | undefined = undefined,
      height: number | undefined = undefined,
      userData: UserData
    ) {
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height)

        this.projectiles = []

        this.health = BossInfo.PLAYER_HEALTH
        this.stamina = BossInfo.PLAYER_STAMINA

        this.lastTimeSinceShot = 0
    }


    public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
      if (this.direction === 'left') {
        ctx.save()
        ctx.translate(this.xPos + this.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(this.img, 0, this.yPos, this.width, this.height)
        ctx.restore()
      } else if (this.direction === 'right') {
        ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height)
      } 

      this.projectiles.forEach((projectile) => {
        projectile.draw(ctx)
      })
    }

    /**
     * processing the input of the player
     */
    public processInput(): void {
        this.yVel = 0;
        
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) this.yVel = -(BossInfo.PLAYER_Y_SPEED) * (this.height / 200);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) this.yVel = BossInfo.PLAYER_Y_SPEED * (this.height / 200);

        this.xVel = 0;

        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) this.xVel = -(BossInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) this.xVel = BossInfo.PLAYER_X_SPEED * (this.width / 100);

    }

    public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {
        this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY)

        if (this.xPos < 0) {
          this.xPos = canvas.width - this.img.width
          } else if (this.xPos + this.img.width > canvas.width) {
          this.xPos = 0
          }

        if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
            this.yVel = 0;
            if (this.yPos + this.yVel < 0) this.yPos = 0
        }

        if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.yVel = 0;
            if (this.yPos + this.yVel + this.img.height > canvas.height) this.yPos = canvas.height - this.img.height
        }

      //   CollideHandler.LEFT_CONTACT

      //   CollideHandler.RIGHT_CONTACT

      this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
    }

    public shootProjectile(mouseCoords: {x: number, y: number}): void {
      if (this.stamina >= 0) {
        const tempTan = Math.atan2(
          mouseCoords.y - this.getMinYPos(),
          mouseCoords.x - this.getMinXPos()
        )
        this.projectiles.push(new PlayerProjectile(this.xPos, this.yPos, this.width / 2, this.height / 2, Math.cos(tempTan), Math.sin(tempTan)))
        this.stamina -= 2
        this.lastTimeSinceShot = 0
      }
    }

    public update(elapsed: number, canvas: HTMLCanvasElement) {
      this.projectiles.forEach((projectile, projectileIndex) => {
        projectile.move(elapsed)
        if (projectile.checkOutOfCanvas(canvas)) this.projectiles.splice(projectileIndex, 1)
      })
      this.lastTimeSinceShot += elapsed
      if (this.lastTimeSinceShot > BossInfo.PLAYER_STAMINA_RECOVERY_DELAY) {
        if (this.stamina <= BossInfo.PLAYER_STAMINA) {
          this.stamina += 0.01
        }
      }
    }

    public getProjectiles(): PlayerProjectile[] {
      return this.projectiles
    }

    public removeProjectile(index: number): void {
      this.projectiles.splice(index, 1)
    }

    public getHit(): void {
      this.health -= 5
    }

    public getHealth(): number {
      return this.health
    }

    public getStamina(): number {
      return this.stamina
    }

    public isDead(): boolean {
      return this.health <= 0;
    }
}