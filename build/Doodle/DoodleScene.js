import CollideHandler from '../CollideHandler.js';
import GameLevel from '../GameLevel.js';
import Cloud from './Cloud.js';
import DoodlePlayer from './DoodlePlayer.js';
export default class DoodleScene extends GameLevel {
    player;
    props;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Cloud((Math.random() * canvas.width) / 1.2, (canvas.height / 1.5), canvas.width / 5, 65),
            new Cloud((Math.random() * canvas.width) / 1.2, (canvas.height / 3), canvas.width / 5, 65),
            new Cloud((Math.random() * canvas.width) / 1.2, (canvas.height / 6), canvas.width / 5, 65),
            new Cloud(0, 900, canvas.width, 150),
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
        this.writeTextToCanvas(`Coins: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20, 'center', 'black');
    }
    processInput() {
        this.player.processInput();
    }
    update = (elapsed) => {
        let contacts = [];
        this.props.forEach((prop, propIndex) => {
            if (CollideHandler.collides(this.player, prop)) {
                const contact = CollideHandler.getContactData(this.player, prop);
                contacts.push(contact);
                if (contact === CollideHandler.TOP_CONTACT) {
                    this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                }
                if (prop instanceof Cloud) {
                    prop.disappear();
                }
            }
            if (prop instanceof Cloud) {
                if (prop.hasDisappeared()) {
                    this.props.splice(propIndex, 1);
                }
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        return this;
    };
}
//# sourceMappingURL=DoodleScene.js.map