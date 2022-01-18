import Game from "../../Game.js";
import ImageProp from "../../Props/ImageProp.js";
import Platform from "../../Props/Platform.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import Text from "../../Props/Text.js";
import GameInfo from "../../GameInfo.js";
export default class TRQuestion {
    currentCharacter;
    props;
    constructor(canvas, player) {
        const platformTopYPos = (canvas.height / 3) - (canvas.height / 20);
        const platformBottomYPos = ((canvas.height / 3) * 2) - (canvas.height / 20);
        this.props = [
            new Platform(player.getMinXPos() + canvas.width + (canvas.width / 2), platformTopYPos, canvas.width, canvas.height / 10),
            new Platform(player.getMinXPos() + canvas.width + (canvas.width / 2), platformBottomYPos, canvas.width, canvas.height / 10),
        ];
        const characters = [
            { name: 'Opa', chat: true, block: false, accept: true },
            { name: 'Oma', chat: true, block: false, accept: true },
            { name: 'Vriend', chat: true, block: false, accept: true },
            { name: 'Vriendin', chat: true, block: false, accept: true },
            { name: 'Beste vriend', chat: true, block: false, accept: true },
            { name: 'Buurmeisje', chat: true, block: false, accept: true },
            { name: 'Buurvrouw', chat: true, block: false, accept: true },
            { name: 'Pestkop', chat: false, block: true, accept: false },
            { name: 'Verkoper', chat: false, block: true, accept: false },
            { name: 'Hacker', chat: false, block: true, accept: false }
        ];
        this.currentCharacter = characters[Game.randomNumber(0, characters.length - 1)];
        this.props.push(new ImageProp(player.getMinXPos() + canvas.width, (canvas.height / 2) - (canvas.height / 4), GameInfo.IMG_PATH + `Temple-Run/${this.currentCharacter.name}.png`, canvas.width / 4, canvas.height / 2));
        this.props.push(new Text(player.getMinXPos() + canvas.width + (canvas.width / 8), (canvas.height / 2) - (canvas.height / 4), canvas.width, canvas.height, this.currentCharacter.name, 'white'));
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
            { answerImage: GameInfo.IMG_PATH + 'Temple-Run/chat.png', correct: this.currentCharacter.chat },
            { answerImage: GameInfo.IMG_PATH + 'Temple-Run/block.png', correct: this.currentCharacter.block },
            { answerImage: GameInfo.IMG_PATH + 'Temple-Run/checkmark.png', correct: this.currentCharacter.accept }
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
