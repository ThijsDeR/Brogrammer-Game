import CutScene from "../CutScene";
import Button from "../Props/Button";
import Scene from "../Scene";
export default class MenuCutScene extends CutScene {
    props;
    completed;
    constructor(canvas, userData) {
        super(canvas, userData);
        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);
        this.props = [
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'blue', 'Verder', this.canvas.height / 20, 'verder'),
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'blue', 'Stoppen', this.canvas.height / 20, 'stoppen'),
        ];
        this.completed = false;
        const clickFunction = (event) => {
            let shouldStop = false;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'verder') {
                            this.completed = true;
                        }
                    }
                }
            });
            if (shouldStop) {
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
        Scene.writeTextToCanvas(this.ctx, 'Wacht Menu', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.completed;
    };
}
//# sourceMappingURL=MenuCutScene.js.map