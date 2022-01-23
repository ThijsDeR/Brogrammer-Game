import GameInfo from '../../GameInfo.js';
import Projectile from './Projectile.js';
export default class PlayerProjectile extends Projectile {
    constructor(xPos, yPos, width, height, xVelocity, yVelocity) {
        super(xPos, yPos, width, height, `${GameInfo.IMG_PATH}Temple-Run/block.png`, xVelocity, yVelocity);
    }
}
