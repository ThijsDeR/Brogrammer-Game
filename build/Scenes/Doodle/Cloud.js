import ImageProp from '../../Props/ImageProp.js';
export default class Cloud extends ImageProp {
    opacity;
    isDisappearing;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/cloud.png', width, height);
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
                this.opacity -= 0.01 * (elapsed / 20);
            }
        }
    }
    hasDisappeared() {
        return this.opacity < 0.1;
    }
}
//# sourceMappingURL=Cloud.js.map