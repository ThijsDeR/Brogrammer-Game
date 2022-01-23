import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
import RectProp from '../../Props/RectProp.js';
import BossProjectile from './BossProjectile.js';
import BossInfo from './Info/BossInfo.js';
export default class Boss extends ImageProp {
    health;
    healthBar;
    projectiles;
    lastScattershotTime;
    lastProjectileTime;
    projectileDelay;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, `${GameInfo.IMG_PATH}sephiroth.png`, width, height);
        this.health = BossInfo.BOSS_HEALTH;
        this.healthBar = [
            new RectProp(this.xPos, this.yPos - (this.height / 2), this.width, this.height / 4, 'gray', 'fill'),
            new RectProp(this.xPos, this.yPos - (this.height / 2), this.width, this.height / 4, 'red', 'fill'),
        ];
        this.projectiles = [];
        this.lastProjectileTime = 0;
        this.lastScattershotTime = BossInfo.SCATTER_SHOT_DELAY / 2;
        this.projectileDelay = BossInfo.STARTING_PROJECTILE_DELAY;
    }
    draw(ctx) {
        super.draw(ctx);
        this.healthBar.forEach((bar) => {
            bar.draw(ctx);
        });
        this.projectiles.forEach((projectile) => {
            projectile.draw(ctx);
        });
    }
    update(elapsed, canvas) {
        this.projectiles.forEach((projectile, projectileIndex) => {
            projectile.move(elapsed);
            if (projectile.checkOutOfCanvas(canvas))
                this.projectiles.splice(projectileIndex, 1);
        });
        this.healthBar[1].setWidth(this.width * (this.health / BossInfo.BOSS_HEALTH));
    }
    shootProjectile(elapsed, player) {
        const tempTan = Math.atan2(player.getMinYPos() - this.getMinYPos(), player.getMinXPos() - this.getMinXPos());
        if (this.lastProjectileTime > this.projectileDelay) {
            this.projectiles.push(new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, Math.cos(tempTan), Math.sin(tempTan)));
            this.lastProjectileTime = elapsed;
            if (this.projectileDelay > BossInfo.MINIMUM_PROJECTILE_DELAY) {
                this.projectileDelay -= BossInfo.PROJECTILE_DELAY_SPEED_UP;
            }
        }
        else {
            this.lastProjectileTime += elapsed;
        }
        if (this.lastScattershotTime > BossInfo.SCATTER_SHOT_DELAY) {
            this.projectiles.push(...[
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, 0, -0.2),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, 0.1, -0.1),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, 0.2, 0),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, 0.1, 0.1),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, 0, 0.2),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, -0.1, 0.1),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, -0.2, 0),
                new BossProjectile(this.xPos + (this.width / 2) - (this.width / 8), this.yPos + (this.height / 2) - (this.height / 8), this.width / 4, this.height / 4, -0.1, -0.1),
            ]);
            this.lastScattershotTime = elapsed;
        }
        else
            this.lastScattershotTime += elapsed;
    }
    getHit() {
        this.health -= 1;
    }
    isDead() {
        return this.health <= 0;
    }
    getProjectiles() {
        return this.projectiles;
    }
    removeProjectile(index) {
        this.projectiles.splice(index, 1);
    }
}
