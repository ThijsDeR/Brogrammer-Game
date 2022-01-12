import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import Button from '../../Props/Button.js';
import ImageProp from '../../Props/ImageProp.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
import Text from '../../Props/Text.js';
import GameInfo from '../../GameInfo.js';
export default class QuestionCutscene extends CutScene {
    props;
    question;
    player;
    completed;
    constructor(canvas, userData, player) {
        super(canvas, userData);
        this.question = Game.randomNumber(0, DoodleLevelInfo.QUESTIONS.length);
        let randomQuestion = DoodleLevelInfo.QUESTIONS[this.question];
        const chatBoxHeight = (canvas.height / 3);
        this.props = [
            new ImageProp(0, chatBoxHeight * 2, './assets/img/chatbox.png', canvas.width, chatBoxHeight),
            new Button(canvas.width / 5 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'red', randomQuestion.answers[0].answer, 20, '0'),
            new Button((canvas.width / 5) * 2 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'blue', randomQuestion.answers[1].answer, 20, '1'),
            new Button((canvas.width / 5) * 3 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'purple', randomQuestion.answers[2].answer, 20, '2'),
            new Button((canvas.width / 5) * 4 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'green', randomQuestion.answers[3].answer, 20, '3'),
            new Text(canvas.width / 2, chatBoxHeight * 2 - 100, canvas.width, 500, randomQuestion.question, 'white', 50)
        ];
        this.player = player;
        this.completed = false;
        const questionClickFunction = (event) => {
            const question = DoodleLevelInfo.QUESTIONS[this.question];
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        for (let i = 0; i < question.answers.length - 1; i++) {
                            if (Number(prop.getId()) === i && !question.answers[i].correct) {
                                this.player.die();
                            }
                        }
                        this.userData.addQuestion(question);
                        this.completed = true;
                    }
                }
            });
            if (this.player.isDead()) {
                const wrongSound = new Audio(GameInfo.SOUND_PATH + 'Wrong.mp3');
                wrongSound.volume = 0.8;
                wrongSound.play();
            }
            else {
                const correctSound = new Audio(GameInfo.SOUND_PATH + 'Correct.wav');
                correctSound.volume = 0.6;
                correctSound.play();
            }
            if (this.completed) {
                this.canvas.removeEventListener('click', questionClickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y }, 'yellow');
                }
            });
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
}
//# sourceMappingURL=QuestionCutscene.js.map