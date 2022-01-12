import Button from '../../Props/Button.js';
import Scene from '../../Scene.js';
import MenuScene from './MenuScene.js';
export default class MistakeScene extends Scene {
    props;
    nextScene;
    questions;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [];
        this.questions = this.userData.getQuestions();
        this.questions.forEach((question, questionIndex) => {
            this.props.push(new Button(this.canvas.width / 2 - (200 / 2), 100 * (questionIndex + 1), 200, 100, 'white', `question`, 50, `${questionIndex}`));
        });
        console.log(this.props);
        this.nextScene = this;
        this.canvas.addEventListener('click', (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn')
                            this.nextScene = new MenuScene(this.canvas, this.userData);
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
        this.userData.getQuestions();
        Scene.writeTextToCanvas(this.ctx, 'Questions', this.canvas.width / 2, 100, 50, 'white');
        Scene.writeTextToCanvas(this.ctx, `Here are the anwsers to the questions`, this.canvas.width / 2, 250, 30, 'white');
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.nextScene;
    };
}
//# sourceMappingURL=MistakesScene.js.map