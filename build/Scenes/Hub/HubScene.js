import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import ImageProp from '../../Props/ImageProp.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import Teleporter from '../../Props/Teleporter.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
export default class HubScene extends GameLevel {
    player;
    props;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new ImageProp(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new Teleporter(0, (canvas.height / 4) - 150, canvas.width / 10, 200, 'hub'),
            new ImageProp(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
            new Teleporter(0, ((canvas.height / 4) * 3 - 200), canvas.width / 10, 200, 'menu'),
            new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new Teleporter((canvas.width / 20) * 18, (canvas.height / 4) - 150, canvas.width / 10, 200, 'doodle'),
            new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
            new Teleporter((canvas.width / 20) * 18, ((canvas.height / 4) * 3 - 200), canvas.width / 10, 200, 'doodle'),
        ];
        this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage('./assets/img/background.jpg'), 0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, `Coins: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20);
        Scene.writeTextToCanvas(this.ctx, 'Hub', 75, (this.canvas.height / 4) - 170, 20, 'center', 'middle', 'white');
        Scene.writeTextToCanvas(this.ctx, 'Menu', 80, ((this.canvas.height / 4) * 3) - 220, 20, 'center', 'middle', 'white');
        Scene.writeTextToCanvas(this.ctx, 'Doodle', (this.canvas.width / 20) * 19, (this.canvas.height / 4) - 170, 20, 'center', 'middle', 'white');
        Scene.writeTextToCanvas(this.ctx, 'Doodle', (this.canvas.width / 20) * 19, (this.canvas.height / 4) * 3 - 220, 20, 'center', 'middle', 'white');
    }
    processInput() {
        this.player.processInput();
    }
    update = (elapsed) => {
        let contacts = [];
        let nextScene = this;
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
                if (prop instanceof Teleporter) {
                    nextScene = SceneSelector.getClassFromString(prop.getDestinationScene(), this.canvas, this.userData);
                }
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        return nextScene;
    };
}
//# sourceMappingURL=HubScene.js.map