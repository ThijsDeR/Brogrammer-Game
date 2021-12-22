import ImageProp from '../../Props/ImageProp.js';
export default class Cloud extends ImageProp {
    opacity;
    isDisappearing;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/cloud.png', width, height);
        this.opacity = 1;
        this.isDisappearing = false;
    }
    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.img, this.xPos, this.yPos, this.img.width, this.img.height);
        ctx.globalAlpha = 1;
    }
    disappear() {
        if (!this.isDisappearing) {
            this.isDisappearing = true;
            this.makeDisappear();
        }
    }
    makeDisappear() {
        setTimeout(() => {
            if (this.opacity >= 0.1) {
                this.opacity -= 0.01;
                this.makeDisappear();
            }
        }, 50);
    }
    hasDisappeared() {
        return this.opacity < 0.1;
    }
}
//# sourceMappingURL=Cloud.js.map