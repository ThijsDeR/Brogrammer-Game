import CollideHandler from "../../CollideHandler.js";
import GameLevel from "../../GameLevel.js";
import Platform from "../../Props/Platform.js";
import Scene from '../../Scene.js';
import HubScene from "../Hub/HubScene.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunPlayer from "./TempleRunPlayer.js";
import TRQuestion from "./TRQuestion.js";
export default class TempleRunScene extends GameLevel {
    player;
    question;
    score;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new TempleRunPlayer(this.canvas.width / 4, this.canvas.height / 2, 50, 100);
        this.question = new TRQuestion(this.canvas, this.player);
        this.score = 0;
    }
    newQuestion() {
        this.question = new TRQuestion(this.canvas, this.player);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.player.getXPos());
        this.question.draw(this.ctx, this.player.getXPos() - 200);
        this.player.draw(this.ctx, this.player.getXPos() - 200);
        Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width / 2, 50, 20, 'black');
    }
    processInput() {
        this.player.processInput();
    }
    update(elapsed) {
        let contacts = [];
        this.question.getProps().forEach((prop) => {
            if (CollideHandler.collides(this.player, prop)) {
                if (prop instanceof Platform) {
                    const contact = CollideHandler.getVerticalContactData(this.player, prop);
                    contacts.push(contact);
                    if (contact === CollideHandler.TOP_CONTACT) {
                        this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                    }
                    else if (contact === CollideHandler.BOTTOM_CONTACT) {
                        this.player.setYPos(prop.getMaxYPos());
                    }
                }
                else if (prop instanceof DeadProp) {
                    this.player.die();
                }
                else if (prop instanceof CorrectProp) {
                    this.userData.increaseCoins(10);
                    this.score += 1;
                    this.newQuestion();
                }
            }
        });
        this.player.speed_up();
        this.player.move(this.canvas, contacts, elapsed);
        if (this.player.isDead())
            return new HubScene(this.canvas, this.userData);
        return this;
    }
}
//# sourceMappingURL=TempleRunScene.js.map