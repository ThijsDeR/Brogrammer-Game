import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import HubScene from '../Hub/HubScene.js';
import BossInfo from './Info/BossInfo.js';
import BossPlayer from './BossPlayer.js';
import Boss from './Boss.js';
import CollideHandler from '../../CollideHandler.js';
import RectProp from '../../Props/RectProp.js';
import Text from '../../Props/Text.js';
import BossFightEndCutscene from './BossFightEndCutscene.js';
import MenuCutScene from '../MenuCutScene.js';
export default class BossScene extends GameLevel {
    player;
    boss;
    playerHealthBar;
    playerStaminaBar;
    backgroundMusic;
    nextScene;
    cutScene;
    clickFunction;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new BossPlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        this.boss = new Boss((this.canvas.width / 2) - (this.canvas.width / 20), (this.canvas.height / 2) - (this.canvas.height / 10), (this.canvas.width / 10), (this.canvas.height / 5));
        this.playerHealthBar = [
            new RectProp(this.canvas.width / 100, this.canvas.height / 50, this.canvas.width / 5, this.canvas.height / 20, 'gray', 'fill'),
            new RectProp(this.canvas.width / 100, this.canvas.height / 50, this.canvas.width / 5, this.canvas.height / 20, 'red', 'fill'),
            new Text((this.canvas.width / 100) + (this.canvas.width / 10), this.canvas.height / 50 + (this.canvas.height / 40), this.canvas.width, this.canvas.height, 'Leven', 'white', this.canvas.height / 30, 'center', 'middle')
        ];
        this.playerStaminaBar = [
            new RectProp(this.canvas.width - (this.canvas.width / 5) - (this.canvas.width / 100), this.canvas.height / 50, this.canvas.width / 5, this.canvas.height / 20, 'gray', 'fill'),
            new RectProp(this.canvas.width - (this.canvas.width / 5) - (this.canvas.width / 100), this.canvas.height / 50, this.canvas.width / 5, this.canvas.height / 20, 'green', 'fill'),
            new Text((this.canvas.width - (this.canvas.width / 100)) - (this.canvas.width / 10), this.canvas.height / 50 + (this.canvas.height / 40), this.canvas.width, this.canvas.height, 'Uithoudingsvermogen', 'white', this.canvas.height / 30, 'center', 'middle')
        ];
        this.cutScene = null;
        this.nextScene = this;
        this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'boss-music.mp3');
        this.backgroundMusic.volume = BossInfo.BACKGROUND_MUSIC_VOLUME;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'boss-fight-background.jpg'), 0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.boss.draw(this.ctx);
        this.playerHealthBar.forEach((bar) => {
            bar.draw(this.ctx);
        });
        this.playerStaminaBar.forEach((bar) => {
            bar.draw(this.ctx);
        });
        if (this.cutScene !== null) {
            this.cutScene.draw();
        }
    }
    processInput() {
        if (this.cutScene === null) {
            this.player.processInput();
        }
        else {
            this.cutScene.processInput();
        }
    }
    update(elapsed) {
        if (this.cutScene === null) {
            let contacts = [];
            this.player.move(this.canvas, contacts, elapsed);
            this.player.update(elapsed, this.canvas);
            this.boss.update(elapsed, this.canvas);
            this.boss.shootProjectile(elapsed, this.player);
            this.boss.getProjectiles().forEach((projectile, projectileIndex) => {
                if (CollideHandler.collides(this.player, projectile.getImageProp())) {
                    this.player.getHit();
                    this.boss.removeProjectile(projectileIndex);
                }
            });
            this.player.getProjectiles().forEach((projectile, projectileIndex) => {
                if (CollideHandler.collides(this.boss, projectile.getImage())) {
                    this.boss.getHit();
                    this.player.removeProjectile(projectileIndex);
                }
            });
            this.playerHealthBar[1].setWidth((this.canvas.width / 5) * (this.player.getHealth() / BossInfo.PLAYER_HEALTH));
            this.playerStaminaBar[1].setWidth((this.canvas.width / 5) * (this.player.getStamina() / BossInfo.PLAYER_STAMINA));
            if (this.player.isPausing()) {
                this.cutScene = new MenuCutScene(this.canvas, this.userData);
            }
            if (this.player.isDead()) {
                this.nextScene = new HubScene(this.canvas, this.userData);
                this.canvas.removeEventListener('click', this.clickFunction);
            }
            else if (this.boss.isDead()) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = BossInfo.WIN_SOUND_VOLUME;
                winSound.play();
                this.backgroundMusic.pause();
                this.backgroundMusic = null;
                this.userData.increaseCoins(BossInfo.COMPLETE_SCORE_AWARD);
                this.cutScene = new BossFightEndCutscene(this.canvas, this.userData, this.boss.getImage());
            }
        }
        else {
            const cutsceneDone = this.cutScene.update(elapsed);
            if (cutsceneDone) {
                let optionalCutScene = this.cutScene.getOptionalScene();
                if (optionalCutScene)
                    this.nextScene = optionalCutScene;
                this.cutScene = null;
                if (this.backgroundMusic) {
                    this.backgroundMusic.play();
                }
            }
        }
        if (this.nextScene !== this) {
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
                this.backgroundMusic = null;
            }
        }
        return this.nextScene;
    }
}
