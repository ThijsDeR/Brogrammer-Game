import GameInfo from '../../../GameInfo.js';
import Button from '../../../Props/Button.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import MenuInfo from '../Info/MenuInfo.js';
import ShopItem from './ShopItem.js';
import ShopScene from './ShopScene.js';

export default class ItemShopScene extends Scene {
  private shopItem: ShopItem;

  private buttons: Button[];

  private nextScene: Scene;

  private backgroundMusic: HTMLAudioElement;

  /**
   * Initialize ItemShopScene
   *
   * @param canvas the game canvas
   * @param userData user data
   * @param item the shop item
   * @param backgroundMusic background music
   */
  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    item: ShopItem,
    backgroundMusic?: HTMLAudioElement,
  ) {
    super(canvas, userData);

    this.shopItem = item;

    this.backgroundMusic = backgroundMusic;

    const buttonWidth = this.canvas.width / 8;
    const buttonHeight = this.canvas.height / 20;

    this.buttons = [
      new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
      new Button(this.canvas.width / 2 - (buttonWidth / 2), (this.canvas.height / 3) * 2 + buttonHeight, buttonWidth, buttonHeight, 'green', 'white', 'blue', 'Kopen', this.canvas.width / 100, 'buy'),
    ];

    this.nextScene = this;

    const hoverFunction = (event: MouseEvent) => {
      this.buttons.forEach((button) => {
        button.doHover({ x: event.x, y: event.y });
      });
    };

    const clickFunction = (event: MouseEvent) => {
      const originalNextScene = this.nextScene;
      this.buttons.forEach((button) => {
        if (button.isHovered({ x: event.x, y: event.y })) {
          if (button.getId() === 'backBtn') {
            this.nextScene = new ShopScene(this.canvas, this.userData, this.backgroundMusic);
            const buttonSound = new Audio(`${GameInfo.SOUND_PATH}UI_click.wav`);
            buttonSound.volume = MenuInfo.UI_CLICK_VOLUME
              * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
              * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
            buttonSound.play();
          }

          if (button.getId() === 'buy') {
            if (this.userData.getCoins() > this.shopItem.getCost()) {
              const startSound = new Audio(`${GameInfo.SOUND_PATH}buy-sound.wav`);
              startSound.volume = MenuInfo.SHOP_CLICK_VOLUME
                * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
              startSound.play();
              this.userData.addSkin(
                {
                  src: this.shopItem.getImage().getImageSrc(),
                  id: this.shopItem.getId(),
                  name: this.shopItem.getName(),
                },
              );
              this.userData.decreaseCoins(this.shopItem.getCost());
              this.nextScene = new ShopScene(this.canvas, this.userData, this.backgroundMusic);
            } else {
              const wrongSound = new Audio(`${GameInfo.SOUND_PATH}Wrong.mp3`);
              wrongSound.volume = MenuInfo.SHOP_CLICK_VOLUME
                * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
              wrongSound.play();
            }
          }
        }
      });

      if (originalNextScene !== this.nextScene) {
        this.canvas.removeEventListener('click', clickFunction);
        this.canvas.removeEventListener('mousemove', hoverFunction);
      }
    };

    this.canvas.addEventListener('click', clickFunction);

    this.canvas.addEventListener('mousemove', hoverFunction);
  }

  /**
   *
   */
  public draw(): void {
    this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.buttons.forEach((button) => {
      button.draw(this.ctx);
    });

    this.ctx.drawImage(
      this.shopItem.getImage().getImage(),
      this.canvas.width / 2 - ((this.canvas.width / 8) / 2),
      this.canvas.height / 3,
      this.canvas.width / 8,
      this.canvas.height / 3,
    );

    Scene.writeTextToCanvas(
      this.ctx,
      'Winkel',
      this.canvas.width / 2,
      this.canvas.height / 10,
      this.canvas.height / 20,
      'white',
    );

    Scene.writeTextToCanvas(
      this.ctx,
      `Munten: ${this.userData.getCoins()}`,
      this.canvas.width / 2,
      this.canvas.height / 5,
      this.canvas.height / 25,
      'white',
      'center',
      'middle',
    );

    Scene.writeTextToCanvas(
      this.ctx,
      `Naam: ${this.shopItem.getName()}`,
      this.canvas.width / 5,
      this.canvas.height / 3,
      this.canvas.width / 50,
      'white',
      'left',
    );

    Scene.writeTextToCanvas(
      this.ctx,
      `Kost: ${this.shopItem.getCost()}`,
      this.canvas.width / 5,
      (this.canvas.height / 3) + (this.canvas.height / 10),
      this.canvas.width / 50,
      'white',
      'left',
    );
  }

  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public processInput(): void {

  }

  /**
   * update the scene
   *
   * @param elapsed the time elapsed since last frame
   * @returns nextscene
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    return this.nextScene;
  }
}
