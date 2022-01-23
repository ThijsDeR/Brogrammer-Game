import CollideHandler from '../../CollideHandler.js';
import BossInfo from './Info/BossInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';
import GameInfo from '../../GameInfo.js';
import PlayerProjectile from './PlayerProjectile.js';

export default class BossPlayer extends Player {
  private health: number;

  private stamina: number;

  private projectiles: PlayerProjectile[];

  private shouldShoot: boolean;

  private lastTimeSinceShot: number;

  /**
   * Initialize BossPlayer
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param userData userdata
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    userData: UserData,
  ) {
    super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);

    this.projectiles = [];

    this.health = BossInfo.PLAYER_HEALTH;
    this.stamina = BossInfo.PLAYER_STAMINA;

    this.lastTimeSinceShot = 0;
  }

  /**
   * draw the bossplayer to the canvas
   *
   * @param ctx the canvas rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.direction === 'left') {
      ctx.save();
      ctx.translate(this.xPos + this.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, this.yPos, this.width, this.height);
      ctx.restore();
    } else if (this.direction === 'right') {
      ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.yVel = 0;

    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
    ) this.yVel = -(BossInfo.PLAYER_Y_SPEED) * (this.height / 200);

    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
    ) this.yVel = BossInfo.PLAYER_Y_SPEED * (this.height / 200);

    this.xVel = 0;

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) this.shouldShoot = true;
    else this.shouldShoot = false;

    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
    ) this.xVel = -(BossInfo.PLAYER_X_SPEED) * (this.width / 100);

    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
    ) this.xVel = BossInfo.PLAYER_X_SPEED * (this.width / 100);

    if (this.xVel < 0) this.direction = 'left';
    else if (this.xVel > 0) this.direction = 'right';
  }

  /**
   * Move the bossplayer
   *
   * @param canvas the game canvas
   * @param contacts the contacts of th player
   * @param elapsed the time elapsed since last frame
   */
  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {
    this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY);

    if (this.xPos < 0) {
      this.xPos = canvas.width - this.img.width;
    } else if (this.xPos + this.img.width > canvas.width) {
      this.xPos = 0;
    }

    if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
      this.yVel = 0;
      if (this.yPos + this.yVel < 0) this.yPos = 0;
    }

    if (
      contacts.includes(CollideHandler.TOP_CONTACT)
      || this.yPos + this.yVel + this.img.height > canvas.height
    ) {
      this.yVel = 0;
      if (
        this.yPos + this.yVel + this.img.height > canvas.height
      ) this.yPos = canvas.height - this.img.height;
    }

    //   CollideHandler.LEFT_CONTACT

    //   CollideHandler.RIGHT_CONTACT

    this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
  }

  /**
   * Shoot a projectile
   *
   * @param mouseCoords the coords
   * @param mouseCoords.x the x coord
   * @param mouseCoords.y the y coord
   */
  public shootProjectile(mouseCoords: { x: number, y: number }): void {
    if (this.stamina >= 0) {
      const tempTan = Math.atan2(
        mouseCoords.y - this.getMinYPos(),
        mouseCoords.x - this.getMinXPos(),
      );

      this.projectiles.push(
        new PlayerProjectile(
          this.xPos,
          this.yPos,
          this.width / 2,
          this.height / 2,
          Math.cos(tempTan),
          Math.sin(tempTan),
        ),
      );

      this.stamina -= BossInfo.PLAYER_STAMINA_LOSS;
      this.lastTimeSinceShot = 0;
    }
  }

  /**
   * Update the boss player
   *
   * @param elapsed the time elapsed since last frame
   * @param canvas the game canvas
   */
  public update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.projectiles.forEach((projectile, projectileIndex) => {
      projectile.move(elapsed);
      if (projectile.checkOutOfCanvas(canvas)) this.projectiles.splice(projectileIndex, 1);
    });

    this.lastTimeSinceShot += elapsed;

    if (this.lastTimeSinceShot > BossInfo.PLAYER_STAMINA_RECOVERY_DELAY) {
      if (this.stamina <= BossInfo.PLAYER_STAMINA) {
        this.stamina += BossInfo.PLAYER_STAMINA_RECOVERY;
      }
    }

    if (this.shouldShoot && this.lastTimeSinceShot > BossInfo.PLAYER_SHOOTING_DELAY) {
      this.shootProjectile({ x: canvas.width / 2, y: canvas.height / 2 });
    }
  }

  /**
   * Getter for the projectiles
   *
   * @returns the projectiles
   */
  public getProjectiles(): PlayerProjectile[] {
    return this.projectiles;
  }

  /**
   * Remove a projectile
   *
   * @param index the projectile index
   */
  public removeProjectile(index: number): void {
    this.projectiles.splice(index, 1);
  }

  /**
   * hit the player
   */
  public getHit(): void {
    this.health -= 5;
  }

  /**
   * Getter for health
   *
   * @returns health
   */
  public getHealth(): number {
    return this.health;
  }

  /**
   * Getter for stamina
   *
   * @returns stamina
   */
  public getStamina(): number {
    return this.stamina;
  }

  /**
   * Check if bossplayer is dead
   *
   * @returns boolean
   */
  public isDead(): boolean {
    return this.health <= 0;
  }
}
