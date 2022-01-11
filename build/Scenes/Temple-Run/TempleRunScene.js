import CollideHandler from "../../CollideHandler.js";
import GameLevel from "../../GameLevel.js";
import Platform from "../../Props/Platform.js";
import HubScene from "../Hub/HubScene.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunPlayer from "./TempleRunPlayer.js";
import TRQuestion from "./TRQuestion.js";
export default class TempleRunScene extends GameLevel {
    player;
    question;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new TempleRunPlayer(this.canvas.width / 4, this.canvas.height / 2, 50, 100);
        this.question = new TRQuestion(this.canvas, this.player);
    }
    newQuestion() {
        this.question = new TRQuestion(this.canvas, this.player);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.player.getXPos());
        this.question.draw(this.ctx, this.player.getXPos());
        this.player.draw(this.ctx, this.player.getXPos() - 200);
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
                    this.newQuestion();
                }
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        if (this.player.isDead())
            return new HubScene(this.canvas, this.userData);
        return this;
    }
}
//# sourceMappingURL=TempleRunScene.js.map