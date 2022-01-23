import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
import DoodleInfo from './Info/DoodleInfo.js';
export default class Cloud extends ImageProp {
    opacity;
    isDisappearing;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, `${GameInfo.IMG_PATH}cloud.png`, width, height);
        this.opacity = 1;
        this.isDisappearing = false;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        ctx.globalAlpha = this.opacity;
        super.draw(ctx, offsetX, offsetY);
        ctx.globalAlpha = 1;
    }
    disappear() {
        this.isDisappearing = true;
    }
    makeDisappear(elapsed) {
        if (this.isDisappearing) {
            if (this.opacity >= 0.1) {
                this.opacity -= DoodleInfo.CLOUD_DISSAPEAR * (elapsed * GameInfo.ELAPSED_PENALTY);
            }
        }
    }
    hasDisappeared() {
        return this.opacity < 0.1;
    }
}
