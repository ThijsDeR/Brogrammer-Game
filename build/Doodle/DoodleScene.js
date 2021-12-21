import CollideHandler from '../CollideHandler.js';
import GameLevel from '../GameLevel.js';
import Prop from '../Prop.js';
import DoodlePlayer from './DoodlePlayer.js';
export default class DoodleScene extends GameLevel {
    player;
    props;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Prop((Math.random() * canvas.width) / 1.2, (canvas.height / 1.5), './assets/img/cloud.png', canvas.width / 5, 65),
            new Prop((Math.random() * canvas.width) / 1.2, (canvas.height / 3), './assets/img/cloud.png', canvas.width / 5, 65),
            new Prop((Math.random() * canvas.width) / 1.2, (canvas.height / 6), './assets/img/cloud.png', canvas.width / 5, 65),
            new Prop(0, 900, './assets/img/cloud.png', canvas.width, 150),
            new Prop(0, 900, './assets/img/cloud.png', canvas.width, 150),
        ];
        this.player = new DoodlePlayer(this.canvas.width / 2, this.canvas.height / 2, 100, 100);
    }
    draw() {
        this.ctx.fillStyle = 'LightSkyBlue';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        return this;
    };
}
//# sourceMappingURL=DoodleScene.js.map