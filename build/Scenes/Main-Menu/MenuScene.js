import Button from '../../Props/Button.js';
import HubScene from '../Hub/HubScene.js';
import Scene from '../../Scene.js';
import ControlsScene from './ControlsScene.js';
import MistakeScene from './MistakesScene.js';
import GameInfo from '../../GameInfo.js';
export default class MenuScene extends Scene {
    props;
    nextScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);
        this.props = [
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'blue', 'Start!', this.canvas.height / 20, 'startBtn'),
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'blue', 'Vragen', this.canvas.height / 20, 'mistakes'),
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 3, buttonWidth, buttonHeight, 'white', 'blue', 'Controls', this.canvas.height / 20, 'controls')
        ];
        this.nextScene = this;
        const clickFunction = (event) => {
            let originalNextScene = this.nextScene;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'startBtn') {
                            const startSound = new Audio(GameInfo.SOUND_PATH + 'Start_button.wav');
                            startSound.volume = 0.5;
                            startSound.play();
                            this.nextScene = new HubScene(this.canvas, this.userData);
                        }
                        ;
                        if (prop.getId() === 'controls') {
                            const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav');
                            buttonSound.volume = 1;
                            buttonSound.play();
                            this.nextScene = new ControlsScene(this.canvas, this.userData);
                        }
                        ;
                        if (prop.getId() === 'mistakes') {
                            const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav');
                            buttonSound.volume = 1;
                            buttonSound.play();
                            this.nextScene = new MistakeScene(this.canvas, this.userData);
                        }
                        ;
                    }
                }
            });
            if (originalNextScene !== this.nextScene) {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = "#454443";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        Scene.writeTextToCanvas(this.ctx, 'Het epische avontuur van Sam Sung', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.nextScene;
    };
}
//# sourceMappingURL=MenuScene.js.map