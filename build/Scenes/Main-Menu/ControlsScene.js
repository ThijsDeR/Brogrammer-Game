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
            new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
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
        Scene.writeTextToCanvas(this.ctx, 'Controls', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op A en D om naar links en rechts te bewegen', this.canvas.width / 2, this.canvas.height / 4, this.canvas.height / 25, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op spatie om te springen', this.canvas.width / 2, (this.canvas.height / 20) * 6, this.canvas.height / 25, 'white');
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