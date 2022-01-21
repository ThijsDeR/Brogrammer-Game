import CutScene from "../CutScene.js";
import Button from "../Props/Button.js";
import Slider from "../Props/Slider.js";
import Scene from "../Scene.js";
import UserData from "../UserData.js";
import MenuScene from "./Main-Menu/MenuScene.js";
export default class SettingsCutScene extends CutScene {
    props;
    completed;
    nextScene;
    backgroundMusic;
    constructor(canvas, userData, backgroundMusic, isPlaying = false) {
        super(canvas, userData);
        this.backgroundMusic = backgroundMusic;
        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);
        this.props = [
            new Slider((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME), 'masterSound'),
            new Slider((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME), 'musicSound'),
            new Slider((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 3, buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME), 'uiSound'),
            new Button((this.canvas.width / 100), (this.canvas.height / 50), this.canvas.width / 20, this.canvas.height / 20, 'white', 'white', 'red', 'back', this.canvas.height / 50, 'backBtn')
        ];
        this.completed = false;
        this.nextScene = null;
        const clickFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn') {
                            this.nextScene = new MenuScene(this.canvas, this.userData, isPlaying, backgroundMusic);
                        }
                    }
                }
                if (prop instanceof Slider) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        prop.changePosition({ x: event.x, y: event.y });
                        if (prop.getId() === 'masterSound')
                            this.userData.changeSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME, prop.getProcentAmount());
                        else if (prop.getId() === 'musicSound')
                            this.userData.changeSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME, prop.getProcentAmount());
                        else if (prop.getId() === 'uiSound')
                            this.userData.changeSoundProcent(UserData.UI_SOUND_OBJECT_NAME, prop.getProcentAmount());
                    }
                }
            });
            if (this.completed) {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        Scene.writeTextToCanvas(this.ctx, 'Wacht Menu', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
    }
    processInput() {
    }
    update = (elapsed) => {
        return this.completed;
    };
    getOptionalScene() {
        return this.nextScene;
    }
}
