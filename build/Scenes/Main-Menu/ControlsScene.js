import Button from '../../Props/Button.js';
import Scene from '../../Scene.js';
import MenuScene from './MenuScene.js';
import Player from '../../Player.js';
export default class ControlsScene extends Scene {
    props;
    nextScene;
    player;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Button(10, 10, 100, 50, 'white', 'red', 'Back', 20, 'backBtn'),
        ];
        this.nextScene = this;
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2, './assets/img/Sam_Suong/robot-preview.png', this.canvas.width / 25, this.canvas.height / 8);
        const clickFunction = (event) => {
            let originalNextScene = this.nextScene;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn')
                            this.nextScene = new MenuScene(this.canvas, this.userData);
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
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, 'Controls', this.canvas.width / 2, 100, 50, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Press A or D To move left or right', this.canvas.width / 2, 250, 30, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Press space to jump', this.canvas.width / 2, 300, 30, 'white');
    }
    processInput() {
        this.player.processInput();
    }
    update = (elapsed) => {
        this.player.move(this.canvas, [], elapsed);
        return this.nextScene;
    };
}
//# sourceMappingURL=ControlsScene.js.map