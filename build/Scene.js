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
            new Prop(500, 200, './assets/img/kees.jpg', 10, 400),
            new Prop(1000, 300, './assets/img/kees.jpg', 400, 400),
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
        let contact = CollideHandler.NO_CONTACT;
        this.props.forEach((prop) => {
            if (CollideHandler.collides(this.player, prop)) {
                contact = CollideHandler.getContactData(this.player, prop);
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
        this.player.move(this.canvas, contact);
    }
}
//# sourceMappingURL=Scene.js.map