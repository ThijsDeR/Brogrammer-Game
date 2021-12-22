import Button from '../Button.js';
import CutScene from '../CutScene.js';
export default class MenuScene extends CutScene {
    shouldStart;
    props;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Button(50, 50, 500, 200, 'blue', 'Start!', 100)
        ];
        this.shouldStart = false;
    }
    draw() {
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
    }
    processInput() {
    }
    update = (elapsed) => {
        return this;
    };
}
//# sourceMappingURL=MenuScene.js.map