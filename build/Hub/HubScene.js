import CollideHandler from '../CollideHandler.js';
import GameLevel from '../GameLevel.js';
import Prop from '../Prop.js';
import HubPlayer from './HubPlayer.js';
export default class HubScene extends GameLevel {
    player;
    props;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Prop(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new Prop(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
            new Prop((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new Prop((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
            new Prop(0, (canvas.height / 4) - 150, './assets/img/Portal.png', canvas.width / 10, 200),
            new Prop(0, ((canvas.height / 4) * 2), './assets/img/Portal.png', canvas.width / 10, 200),
            new Prop((canvas.width / 20) * 18, (canvas.height / 4) - 150, './assets/img/Portal.png', canvas.width / 10, 200),
            new Prop((canvas.width / 20) * 18, ((canvas.height / 4) * 2), './assets/img/Portal.png', canvas.width / 10, 200),
        ];
        this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, 100, 100);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        console.log(this.userData.getCoins());
        this.writeTextToCanvas(`Coins: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20, 'center', 'black');
    }
    processInput() {
        this.player.processInput();
    }
    update = (elapsed) => {
        let contacts = [];
        this.props.forEach((prop) => {
            if (CollideHandler.collides(this.player, prop)) {
                const contact = CollideHandler.getContactData(this.player, prop);
                contacts.push(contact);
                if (contact === CollideHandler.TOP_CONTACT) {
                    this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                }
                else if (contact === CollideHandler.BOTTOM_CONTACT) {
                    this.player.setYPos(prop.getMaxYPos());
                }
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        return this;
    };
}
//# sourceMappingURL=HubScene.js.map