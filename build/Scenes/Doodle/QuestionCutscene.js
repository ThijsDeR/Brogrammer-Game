import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import Button from '../../Props/Button.js';
import ImageProp from '../../Props/ImageProp.js';
import UserData from '../../UserData.js';
import Text from '../../Props/Text.js';
import GameInfo from '../../GameInfo.js';
import DoodleInfo from './Info/DoodleInfo.js';
export default class QuestionCutscene extends CutScene {
    props;
    question;
    player;
    nextScene;
    completed;
    constructor(canvas, userData, player) {
        super(canvas, userData);
        this.question = Game.randomNumber(0, DoodleInfo.QUESTIONS.length - 1);
        const randomQuestion = DoodleInfo.QUESTIONS[this.question];
        const chatBoxHeight = (canvas.height / 3);
        this.props = [
            new ImageProp(0, chatBoxHeight * 2, `${GameInfo.IMG_PATH}chatbox.png`, canvas.width, chatBoxHeight),
            new Button(canvas.width / 5 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 7, this.canvas.height / 5, 'red', 'white', 'white', randomQuestion.answers[0].answer, this.canvas.height / 30, '0'),
            new Button((canvas.width / 5) * 2 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 7, this.canvas.height / 5, 'blue', 'white', 'white', randomQuestion.answers[1].answer, this.canvas.height / 30, '1'),
            new Button((canvas.width / 5) * 3 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 7, this.canvas.height / 5, 'purple', 'white', 'white', randomQuestion.answers[2].answer, this.canvas.height / 30, '2'),
            new Button((canvas.width / 5) * 4 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 7, this.canvas.height / 5, 'green', 'white', 'white', randomQuestion.answers[3].answer, this.canvas.height / 30, '3'),
            new Text(canvas.width / 2, chatBoxHeight * 2 - this.canvas.height / 10, canvas.width / 2, this.canvas.height, randomQuestion.question, 'white', this.canvas.height / 25),
        ];
        this.nextScene = null;
        this.player = player;
        this.completed = false;
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        const questionClickFunction = (event) => {
            const question = DoodleInfo.QUESTIONS[this.question];
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        for (let i = 0; i < question.answers.length; i++) {
                            if (Number(prop.getId()) === i && !question.answers[i].correct) {
                                this.player.die();
                            }
                        }
                        this.userData.addQuestion(question);
                        this.completed = true;
                    }
                }
            });
            if (this.completed) {
                if (this.player.isDead()) {
                    const wrongSound = new Audio(`${GameInfo.SOUND_PATH}Wrong.mp3`);
                    wrongSound.volume = DoodleInfo.WRONG_SOUND_VOLUME
                        * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                        * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                    wrongSound.play();
                }
                else {
                    const correctSound = new Audio(`${GameInfo.SOUND_PATH}Correct.wav`);
                    correctSound.volume = DoodleInfo.CORRECT_SOUND_VOLUME
                        * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                        * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                    correctSound.play();
                }
                this.canvas.removeEventListener('click', questionClickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        this.canvas.addEventListener('click', questionClickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
    }
    processInput() {
    }
    update(elapsed) {
        return this.completed;
    }
    getOptionalScene() {
        return this.nextScene;
    }
}
