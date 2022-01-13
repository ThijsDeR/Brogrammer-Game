import Game from "../../Game.js";
import ImageProp from "../../Props/ImageProp.js";
import Platform from "../../Props/Platform.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
export default class TRQuestion {
    static PLATFORM_HEIGHT = 100;
    props;
    constructor(canvas, player) {
        const platformTopYPos = (canvas.height / 3) - (canvas.height / 20);
        const platformBottomYPos = ((canvas.height / 3) * 2) - (canvas.height / 20);
        this.props = [
            new Platform(player.getMinXPos() + canvas.width + (canvas.width / 2), platformTopYPos, canvas.width, canvas.height / 10),
            new Platform(player.getMinXPos() + canvas.width + (canvas.width / 2), platformBottomYPos, canvas.width, canvas.height / 10),
            new ImageProp(player.getMinXPos() + canvas.width, (canvas.height / 2) - (canvas.height / 4), './assets/img/Hacker.png', canvas.width / 4, canvas.height / 2)
        ];
        this.addAnswers(canvas, player);
    }
    addAnswers(canvas, player) {
        const platformTopYPos = (canvas.height / 3) - (canvas.height / 20);
        const platformBottomYPos = ((canvas.height / 3) * 2) - (canvas.height / 20);
        const positions = [
            platformTopYPos / 2,
            canvas.height / 2,
            platformBottomYPos + ((canvas.height - platformBottomYPos) / 2),
        ];
        const deathPositions = [
            0,
            platformTopYPos + (canvas.height / 10),
            platformBottomYPos + (canvas.height / 10),
        ];
        const answers = [
            { answerImage: './assets/img/chat.png', correct: false },
            { answerImage: './assets/img/block.png', correct: true },
            { answerImage: './assets/img/checkmark.png', correct: false }
        ];
        let i = 0;
        while (answers.length > 0) {
            const randomAnswer = Game.randomNumber(0, answers.length - 1);
            const answer = answers[randomAnswer];
            this.props.push(new ImageProp(player.getMinXPos() + canvas.width + (canvas.width / 2), positions[i], answer.answerImage, canvas.width / 20, canvas.height / 10));
            if (answer.correct) {
                this.props.push(new CorrectProp(player.getMinXPos() + canvas.width + ((canvas.width / 4) * 5), deathPositions[i], canvas.width / 10, platformTopYPos));
            }
            else {
                this.props.push(new DeadProp(player.getMinXPos() + canvas.width + ((canvas.width / 4) * 5), deathPositions[i], canvas.width / 10, platformTopYPos));
            }
            answers.splice(randomAnswer, 1);
            i++;
        }
    }
    draw(ctx, offsetX) {
        this.props.forEach((prop) => {
            prop.draw(ctx, offsetX);
        });
    }
    getProps() {
        return this.props;
    }
}
//# sourceMappingURL=TRQuestion.js.map