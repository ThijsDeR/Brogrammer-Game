import GameInfo from '../../GameInfo.js';
import GridGenerator from '../../GridGenerator.js';
import Button from '../../Props/Button.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import MenuInfo from './Info/MenuInfo.js';
import MenuScene from './MenuScene.js';
import QuestionScene from './QuestionScene.js';
export default class QuestionsScene extends Scene {
    props;
    nextScene;
    questions;
    backgroundMusic;
    constructor(canvas, userData, backgroundMusic) {
        super(canvas, userData);
        this.props = [new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn')];
        this.questions = this.userData.getQuestions();
        this.backgroundMusic = backgroundMusic;
        const questionButtonWidth = this.canvas.width / 15;
        const questionButtonHeight = this.canvas.height / 20;
        const betweenQuestionArea = this.canvas.width / 100;
        const xPositions = [];
        const amount = Math.floor((questionButtonHeight * this.questions.length) / (this.canvas.height - ((this.canvas.height / 10) * 4) - ((this.canvas.height / 10) * 2))) + 1;
        if (amount % 2 === 0) {
            for (let i = amount / 2; i > 0; i--) {
                xPositions.push((this.canvas.width / 2) - (questionButtonWidth * i)
                    - (betweenQuestionArea * i) + (questionButtonWidth / 2));
            }
            for (let i = 0; i < (amount / 2); i++) {
                xPositions.push((this.canvas.width / 2) + (questionButtonWidth * (i + 1))
                    + (betweenQuestionArea * (i + 1)) - (questionButtonWidth / 2));
            }
        }
        else {
            for (let i = (amount - 1) / 2; i > 0; i--) {
                xPositions.push((this.canvas.width / 2) - (questionButtonWidth * i)
                    - (betweenQuestionArea * i));
            }
            xPositions.push((this.canvas.width / 2));
            for (let i = 0; i < (amount - 1) / 2; i++) {
                xPositions.push((this.canvas.width / 2) + (questionButtonWidth * (i + 1))
                    + (betweenQuestionArea * (i + 1)));
            }
        }
        const positions = GridGenerator.generateGrid(this.canvas.width / 2, (this.canvas.height / 10) * 4, this.questions.length, (this.canvas.height - ((this.canvas.height / 10) * 4) - ((this.canvas.height / 10) * 2)), questionButtonWidth, questionButtonHeight, betweenQuestionArea, 0);
        this.questions.forEach((question, questionIndex) => {
            this.props.push(new Button(positions[questionIndex].x - (questionButtonWidth / 2), positions[questionIndex].y, questionButtonWidth, questionButtonHeight, 'white', 'white', 'red', `Vraag ${question.id}`, this.canvas.height / 40, `${questionIndex}`));
        });
        this.nextScene = this;
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        const clickFunction = (event) => {
            const originalNextScene = this.nextScene;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn') {
                            this.nextScene = new MenuScene(this.canvas, this.userData, true, this.backgroundMusic);
                        }
                        else {
                            this.nextScene = new QuestionScene(this.canvas, this.userData, this.questions[Number(prop.getId())]);
                        }
                    }
                }
            });
            if (originalNextScene !== this.nextScene) {
                const buttonSound = new Audio(`${GameInfo.SOUND_PATH}UI_click.wav`);
                buttonSound.volume = MenuInfo.UI_CLICK_VOLUME
                    * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                    * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                buttonSound.play();
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.userData.getQuestions();
        Scene.writeTextToCanvas(this.ctx, 'Vragen', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Hier zijn de antwoorden voor de vragen die je hebt beantwoord', this.canvas.width / 2, this.canvas.height / 4, this.canvas.height / 25, 'white');
    }
    processInput() {
    }
    update = (elapsed) => this.nextScene;
}
