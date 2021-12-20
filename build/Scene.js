import CollideHandler from './CollideHandler.js';
import Player from './Player.js';
import Prop from './Prop.js';
export default class Scene {
    canvas;
    ctx;
    player;
    props;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.props = [
            new Prop((canvas.width / 5) * 0, (canvas.height / 4) + 50, './assets/img/kees.jpg', canvas.width / 5, 65),
            new Prop((canvas.width / 5) * 0, (canvas.height / 4) * 3, './assets/img/kees.jpg', canvas.width / 5, 65),
            new Prop((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/kees.jpg', canvas.width / 5, 65),
            new Prop((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/kees.jpg', canvas.width / 5, 65),
            new Prop(canvas.width / 20 * 0, (canvas.height / 4) - 150, './assets/img/Portal.png', 200, 200),
            new Prop(canvas.width / 20 * 0, ((canvas.height / 4) * 2) + 45, './assets/img/Portal.png', 200, 200),
            new Prop((canvas.width / 20) * 18, (canvas.height / 4) - 150, './assets/img/Portal.png', 200, 200),
            new Prop((canvas.width / 20) * 18, ((canvas.height / 4) * 2) + 45, './assets/img/Portal.png', 200, 200),
        ];
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2, 100, 100);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
    }
    processInput() {
        this.player.processInput();
    }
    update() {
        let contacts = [];
        this.props.forEach((prop) => {
            if (CollideHandler.collides(this.player, prop)) {
                const contact = CollideHandler.getContactData(this.player, prop);
                contacts.push(contact);
                if (contact === CollideHandler.LEFT_CONTACT) {
                    this.player.setXPos(prop.getMinXPos() - this.player.getWidth());
                }
                else if (contact === CollideHandler.RIGHT_CONTACT) {
                    this.player.setXPos(prop.getMaxXPos());
                }
                else if (contact === CollideHandler.TOP_CONTACT) {
                    console.log('very on top');
                    this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                }
                else if (contact === CollideHandler.BOTTOM_CONTACT) {
                    this.player.setYPos(prop.getMaxYPos());
                }
            }
        });
        this.player.move(this.canvas, contacts);
    }
}
//# sourceMappingURL=Scene.js.map