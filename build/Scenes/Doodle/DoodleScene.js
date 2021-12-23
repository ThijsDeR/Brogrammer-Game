import Coin from "../../Props/Coin.js";
import CollideHandler from "../../CollideHandler.js";
import GameLevel from "../../GameLevel.js";
import Scene from "../../Scene.js";
import Cloud from "./Cloud.js";
import DoodlePlayer from "./DoodlePlayer.js";
import Game from "../../Game.js";
import HubScene from "../Hub/HubScene.js";
<<<<<<< Updated upstream
import ImageProp from "../../Props/ImageProp.js";
=======
import DoodleEnemy from "./DoodleEnemy.js";
>>>>>>> Stashed changes
export default class DoodleScene extends GameLevel {
    player;
    props;
    nextScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new ImageProp(0, 0, './assets/img/kees.jpg', this.canvas.width, this.canvas.height + 500),
            new Cloud(200, this.canvas.height - 150, canvas.width - 400, 150),
        ];
        this.createProps();
        this.player = new DoodlePlayer(this.canvas.width / 2, this.canvas.height / 2, 100, 100);
        this.nextScene = this;
    }
    createProps() {
        let previousHeight = 300;
        for (let i = 0; i < 1000; i++) {
            let xPos = Game.randomNumber(this.canvas.width / 8, this.canvas.width - this.canvas.width / 8);
            let yPos = Game.randomNumber(previousHeight + 200, previousHeight + 400);
            let cloudWidth = this.canvas.width / 5;
            let cloudHeight = 65;
            let coinWidth = 32;
            let coinHeight = 32;
            let enemyHeight = 100;
            let enemyWidth = 100;
            previousHeight = yPos;
            this.props.push(new Cloud(xPos, this.canvas.height - yPos, cloudWidth, cloudHeight));
<<<<<<< Updated upstream
            if (Game.randomNumber(0, 1) === 1) {
                this.props.push(new Coin(xPos + (cloudWidth / 2) - (coinHeight / 2), this.canvas.height - yPos - (coinHeight * 2), coinWidth, coinHeight));
=======
            const rng = Game.randomNumber(1, 10);
            if (rng <= 5) {
                this.props.push(new Coin(xPos + (cloudWidth / 2) - (coinHeight / 2), yPos - (coinHeight * 2), coinWidth, coinHeight));
>>>>>>> Stashed changes
            }
            else if (rng === 10) {
                this.props.push(new DoodleEnemy(xPos + (cloudWidth / 2) - 10, yPos - enemyHeight, enemyWidth, enemyHeight));
            }
        }
    }
    draw() {
        this.ctx.fillStyle = "LightSkyBlue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx, 0, this.player.getYPos() - (this.canvas.height / 2));
        });
        this.player.draw(this.ctx, 0, this.player.getYPos() - (this.canvas.height / 2));
        Scene.writeTextToCanvas(this.ctx, `Coins: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20);
    }
    processInput() {
        this.player.processInput();
    }
    update = (elapsed) => {
        let contacts = [];
        this.props.forEach((prop, propIndex) => {
            if (CollideHandler.collides(this.player, prop)) {
                const contact = CollideHandler.getContactData(this.player, prop);
                if (prop instanceof Cloud) {
                    contacts.push(contact);
                    if (contact === CollideHandler.TOP_CONTACT) {
                        this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                    }
                    prop.disappear();
                }
                if (prop instanceof Coin) {
                    this.userData.increaseCoins(prop.getPoints());
                    this.props.splice(propIndex, 1);
                }
                if (prop instanceof DoodleEnemy) {
                    this.player.setDeath(true);
                    this.props.splice(propIndex, 1);
                }
            }
            if (prop instanceof Cloud) {
                if (prop.hasDisappeared()) {
                    this.props.splice(propIndex, 1);
                }
            }
        });
        this.player.move(this.canvas, contacts, elapsed);
        if (this.player.isDead()) {
            this.nextScene = new HubScene(this.canvas, this.userData);
        }
        return this.nextScene;
    };
}
//# sourceMappingURL=DoodleScene.js.map