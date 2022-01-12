import Button from '../../Props/Button.js';
import HubScene from '../Hub/HubScene.js';
import Scene from '../../Scene.js';
import ControlsScene from './ControlsScreen.js';
import MistakeScene from './MistakesScene.js';
export default class MenuScene extends Scene {
    props;
    nextScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Button(this.canvas.width / 2 - (500 / 2), 250, 500, 200, 'white', 'Start!', 100, 'startBtn'),
            new Button(this.canvas.width / 2 - (500 / 2), 500, 500, 200, 'white', 'Vragen', 100, 'mistakes'),
            new Button(this.canvas.width / 2 - (500 / 2), 750, 500, 200, 'white', 'Controls', 100, 'controls')
        ];
        this.nextScene = this;
        this.canvas.addEventListener('click', (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'startBtn')
                            this.nextScene = new HubScene(this.canvas, this.userData);
                        if (prop.getId() === 'controls')
                            this.nextScene = new ControlsScene(this.canvas, this.userData);
                        if (prop.getId() === 'mistakes')
                            this.nextScene = new MistakeScene(this.canvas, this.userData);
                    }
                }
            });
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y }, 'blue');
                }
            });
        });
    }
    draw() {
        this.ctx.fillStyle = "#454443";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        Scene.writeTextToCanvas(this.ctx, 'Het epische avontuur van Sam Sung', this.canvas.width / 2, 100, 50, 'white');
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.nextScene;
    };
}
//# sourceMappingURL=MenuScene.js.map