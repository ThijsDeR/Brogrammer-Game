import Game from '../../Game.js';
import BossInfo from './Info/BossInfo.js';
import Projectile from './Projectile.js';
export default class BossProjectile extends Projectile {
    constructor(xPos, yPos, width, height, xVelocity, yVelocity) {
        super(xPos, yPos, width, height, BossInfo.PROJECTILE_IMAGE_SRC[Game.randomNumber(0, BossInfo.PROJECTILE_IMAGE_SRC.length - 1)], xVelocity, yVelocity);
    }
}
