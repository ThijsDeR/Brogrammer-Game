import Button from "../../Props/Button.js";
import Scene from "../../Scene.js";
import MistakeScene from "./MistakesScene.js";
export default class ShopScene extends Scene {
    backButton;
    nextScene;
    items;
    constructor(canvas, userData, question) {
        super(canvas, userData);
        this.backButton = new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn');
        this.nextScene = this;
        this.items = [
            { name: 'test1', src: './assets/img/sombreroman.png', cost: 500, id: 1 },
            { name: 'test1', src: './assets/img/sombreroman.png', cost: 1000, id: 2 },
            { name: 'test1', src: './assets/img/sombreroman.png', cost: 2000, id: 3 },
        ];
        const clickFunction = (event) => {
            let originalNextScene = this.nextScene;
            if (this.backButton.isHovered({ x: event.x, y: event.y })) {
                this.nextScene = new MistakeScene(this.canvas, this.userData);
            }
            if (originalNextScene !== this.nextScene) {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.backButton.doHover({ x: event.x, y: event.y });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = "#454443";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.backButton.draw(this.ctx);
    }
    processInput() {
    }
    update(elapsed) {
        return this.nextScene;
    }
}
//# sourceMappingURL=ShopScene.js.map