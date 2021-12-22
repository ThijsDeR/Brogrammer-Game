import Button from '../Button.js';
import CutScene from '../CutScene.js';
import HubScene from '../Hub/HubScene.js';
import TextProp from '../TextProp.js';
export default class MenuScene extends CutScene {
    shouldStart;
    props;
    texts;
    nextScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Button(this.canvas.width / 2 - (500 / 2), 500, 500, 200, 'blue', 'Start!', 100, 'startBtn')
        ];
        this.texts = [
            new TextProp('BroGrammers Game', this.canvas.width / 2, 100, 50)
        ];
        this.nextScene = this;
        this.canvas.addEventListener('click', (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isPressed({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'startBtn')
                            this.nextScene = new HubScene(this.canvas, this.userData);
                    }
                }
            });
        });
        this.shouldStart = false;
    }
    draw() {
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.texts.forEach((text) => {
            text.draw(this.ctx);
        });
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.nextScene;
    };
}
//# sourceMappingURL=MenuScene.js.map