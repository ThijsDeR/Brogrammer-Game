import GameInfo from "../../../GameInfo.js";
import GridGenerator from "../../../GridGenerator.js";
import Button from "../../../Props/Button.js";
import Scene from "../../../Scene.js";
import MenuScene from "../MenuScene.js";
import ItemShopScene from "./ItemShopScene.js";
import ShopItem from "./ShopItem.js";
export default class ShopScene extends Scene {
    backButton;
    nextScene;
    items;
    shopItems;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.backButton = new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn');
        this.nextScene = this;
        this.shopItems = [];
        this.items = [
            { name: 'Rood', src: './assets/img/Sam_Suong/robot-preview-red.png', cost: 400, id: 1 },
            { name: 'Groen', src: './assets/img/Sam_Suong/robot-preview-green.png', cost: 400, id: 2 },
            { name: 'Blauw', src: './assets/img/Sam_Suong/robot-preview-blue.png', cost: 400, id: 3 },
            { name: 'Groene Hoed', src: './assets/img/Sam_Suong/robot-preview-greenhat.png', cost: 800, id: 4 },
            { name: 'Bril', src: './assets/img/Sam_Suong/robot-preview-glasses.png', cost: 800, id: 5 },
            { name: 'Katten Oren', src: './assets/img/Sam_Suong/robot-preview-cat.png', cost: 800, id: 6 },
            { name: 'Goud', src: './assets/img/Sam_Suong/robot-preview-goud.png', cost: 1000, id: 7 },
            { name: 'Dark', src: './assets/img/Sam_Suong/robot-preview-dark.png', cost: 1000, id: 8 },
        ];
        this.items = this.items.filter((item) => {
            const skins = this.userData.getSkins().filter((skin) => skin.id === item.id);
            return skins.length === 0;
        });
        console.log(this.items);
        const shopItemWidth = canvas.width / 12;
        const shopItemHeight = canvas.height / 4;
        const positions = GridGenerator.generateGrid(this.canvas.width / 2, this.canvas.height / 3, this.items.length, (canvas.height / 3), shopItemWidth, shopItemHeight, canvas.width / 200, canvas.height / 50);
        console.log(positions);
        this.items.forEach((item, itemIndex) => {
            this.shopItems.push(new ShopItem(positions[itemIndex].x - (shopItemWidth / 2), positions[itemIndex].y, shopItemWidth, shopItemHeight, item.name, item.src, item.cost, item.id));
        });
        const clickFunction = (event) => {
            let originalNextScene = this.nextScene;
            this.shopItems.forEach((shopItem) => {
                if (shopItem.isHovered({ x: event.x, y: event.y })) {
                    const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav');
                    buttonSound.volume = 1;
                    buttonSound.play();
                    this.nextScene = new ItemShopScene(this.canvas, this.userData, shopItem);
                }
            });
            if (this.backButton.isHovered({ x: event.x, y: event.y })) {
                this.nextScene = new MenuScene(this.canvas, this.userData);
            }
            if (originalNextScene !== this.nextScene) {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.backButton.doHover({ x: event.x, y: event.y });
            this.shopItems.forEach((shopItem) => {
                shopItem.doHover({ x: event.x, y: event.y });
            });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = "#454443";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.backButton.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, 'Shop', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
        Scene.writeTextToCanvas(this.ctx, `Munten: ${this.userData.getCoins()}`, this.canvas.width / 2, this.canvas.height / 5, this.canvas.height / 25, 'white', 'center', 'middle');
        this.shopItems.forEach((shopItem) => {
            shopItem.draw(this.ctx);
        });
        if (this.shopItems.length === 0) {
            Scene.writeTextToCanvas(this.ctx, 'Je hebt alles al gekocht!', this.canvas.width / 2, this.canvas.height / 2, this.canvas.height / 25, 'white', 'center', 'middle');
        }
    }
    processInput() {
    }
    update(elapsed) {
        return this.nextScene;
    }
}
//# sourceMappingURL=ShopScene.js.map