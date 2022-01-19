import GameInfo from "../../GameInfo.js";
import ImageProp from "../../Props/ImageProp.js";
import Prop from "../../Props/Prop.js";
import Scene from "../../Scene.js";
import BossPlayer from "./BossPlayer.js";
import BossProjectile from "./BossProjectile.js";
import BossInfo from "./Info/BossInfo.js";

export default class Boss extends ImageProp {
  private health: number;

  private projectiles: BossProjectile[];

  private lastProjectileTime: number;

  private projectileDelay: number;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, GameInfo.IMG_PATH + 'sephiroth.png', width, height)

    this.health = 1000

    this.projectiles = []

    this.lastProjectileTime = 0;

    this.projectileDelay = BossInfo.STARTING_PROJECTILE_DELAY
  }

  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx)

    Scene.writeTextToCanvas(
      ctx,
      `Health: ${this.health}`,
      this.xPos + (this.width / 2),
      this.yPos - (this.height / 2),
      this.height / 5,
      'white',
    )

    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx)
    })
  }

  public update(elapsed: number) {
    this.projectiles.forEach((projectile) => {
      projectile.move(elapsed)
    })
  }

  public shootProjectile(elapsed: number, player: BossPlayer): void {
    const tempTan = Math.atan2(
      player.getMinYPos() - this.getMinYPos(),
      player.getMinXPos() - this.getMinXPos()
    )
    if (this.lastProjectileTime > this.projectileDelay) {
      this.projectiles.push(new BossProjectile(this.xPos, this.yPos, this.width / 2, this.height / 2, Math.cos(tempTan), Math.sin(tempTan)))
      this.lastProjectileTime = elapsed
      if (this.projectileDelay > BossInfo.MINIMUM_PROJECTILE_DELAY) {
        this.projectileDelay -= BossInfo.PROJECTILE_DELAY_SPEED_UP
      }
    } else {
      this.lastProjectileTime += elapsed
    }
  }

  public getHit(): void {
    this.health -= 1
  }

  public isDead(): boolean {
    return this.health <= 0
  }

  public getProjectiles(): BossProjectile[] {
    return this.projectiles
  }
}