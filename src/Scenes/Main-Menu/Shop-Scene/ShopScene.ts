import GameInfo from "../../../GameInfo.js";
import GridGenerator from "../../../GridGenerator.js";
import Button from "../../../Props/Button.js";
import Scene from "../../../Scene.js";
import UserData from "../../../UserData.js";
import MenuInfo from "../Info/MenuInfo.js";
import MenuScene from "../MenuScene.js";
import MistakeScene from "../QuestionsScene.js";
import ItemShopScene from "./ItemShopScene.js";
import ShopItem from "./ShopItem.js";

export default class ShopScene extends Scene {
  public static readonly ITEMS_PER_PAGE: number = 14;

  private buttons: Button[];

  private nextScene: Scene;

  private items: {name: string, src: string, cost: number, id: number}[];

  private shopItems: ShopItem[];

  private backgroundMusic: HTMLAudioElement;

  private pages: number;

  private currentPage: number;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, backgroundMusic?: HTMLAudioElement) {
    super(canvas, userData)

    this.buttons = [
      new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
      new Button((this.canvas.width / 2) - (this.canvas.width / 12), (this.canvas.height / 10) * 9, this.canvas.width / 12, this.canvas.height / 10, 'white', 'white', 'red', '<', this.canvas.height / 12, 'decreaseShopPage'),
      new Button((this.canvas.width / 2), (this.canvas.height / 10) * 9, this.canvas.width / 12, this.canvas.height / 10, 'white', 'white', 'red', '>', this.canvas.height / 12, 'increaseShopPage'),
    ]
    this.nextScene = this;

    this.shopItems = [];

    this.backgroundMusic = backgroundMusic

    this.items = [
      {name: 'Rode Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-red.png', cost: 400, id: 1},
      {name: 'Gele Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-jello.png', cost: 400, id: 2},
      {name: 'Oranje Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-orang.png', cost: 400, id: 3},
      {name: 'Paarse Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-pingre.png', cost: 400, id: 4},
      {name: 'Donker Blauwe Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-purp.png', cost: 400, id: 5},
      {name: 'Groene Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-green.png', cost: 400, id: 6},
      {name: 'Blauwe Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-blue.png', cost: 400, id: 7},

      {name: 'Dappere Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-pjott.png', cost: 800, id: 8},
      {name: 'Lonk Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-greenhat.png', cost: 800, id: 9},
      {name: 'Brillen Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-glasses.png', cost: 800, id: 10},
      {name: 'Katten Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-cat.png', cost: 800, id: 11},

      {name: 'Kikker Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-frog.png', cost: 1000, id: 12},
      {name: 'Alien Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-alien.png', cost: 1000, id: 13}, 
      {name: 'Schaakbord Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-schaakbord.png', cost: 1000, id: 14},

      {name: 'Gouden Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-goud.png', cost: 2000, id: 15},
      {name: 'Schaduw Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-dark.png', cost: 2000, id: 16},
      {name: 'Formele Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-formal.png', cost: 2000, id: 17},
      {name: 'Regenboog Robot', src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview-rainbow.png', cost: 10000, id: 18},
    ]


    this.items = this.items.filter((item) => {
      const skins = this.userData.getSkins().filter((skin) => skin.id === item.id)
      return skins.length === 0
    })
    
    this.currentPage = 0
    this.pages = Math.floor(this.items.length / ShopScene.ITEMS_PER_PAGE)
    if (this.items.length % ShopScene.ITEMS_PER_PAGE !== 0 || this.items.length === 0) this.pages += 1

    this.generateShop(canvas)

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene

      this.shopItems.forEach((shopItem) => {
        if (shopItem.isHovered({x: event.x, y: event.y})) {
          const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
          buttonSound.volume = MenuInfo.UI_CLICK_VOLUME;
          buttonSound.play();
          this.nextScene = new ItemShopScene(this.canvas, this.userData, shopItem, this.backgroundMusic)
        }
      })

      this.buttons.forEach((button) => {
        if (button.isHovered({x: event.x, y: event.y})) {
          const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
          buttonSound.volume = MenuInfo.UI_CLICK_VOLUME;
          buttonSound.play();
          if (button.getId() === 'backBtn') {
            this.nextScene = new MenuScene(this.canvas, this.userData, true, this.backgroundMusic)
          }
          if (button.getId() === 'increaseShopPage') {
            this.currentPage += 1
            if (this.currentPage + 1 > this.pages) this.currentPage = 0
            this.generateShop(canvas)
          }
          if (button.getId() === 'decreaseShopPage') {
            this.currentPage -= 1
            if (this.currentPage < 0) this.currentPage = this.pages - 1
            this.generateShop(canvas)
          }
        }
      })
      

      if (originalNextScene !== this.nextScene) {
        this.canvas.removeEventListener('click', clickFunction)
        this.canvas.removeEventListener('mousemove', hoverFunction)
      }
    }

    const hoverFunction = (event: MouseEvent) => {
      this.buttons.forEach((button) => {
        button.doHover({x: event.x, y: event.y})
      })

      this.shopItems.forEach((shopItem) => {
        shopItem.doHover({x: event.x, y: event.y})
      })
    }

    this.canvas.addEventListener('click', clickFunction)

    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public generateShop(canvas: HTMLCanvasElement): void {
    this.shopItems = []

    const shopItemWidth = canvas.width / 12
    const shopItemHeight = canvas.height / 4

    let tempArray = [...this.items].splice(ShopScene.ITEMS_PER_PAGE * this.currentPage, ShopScene.ITEMS_PER_PAGE)

    const positions = GridGenerator.generateGrid(
      this.canvas.width / 2,
      this.canvas.height / 3,
      tempArray.length,
      (canvas.height / 3),
      shopItemWidth,
      shopItemHeight,
      canvas.width / 200,
      canvas.height / 50,
    )
    tempArray.forEach((item, itemIndex) => {
      this.shopItems.push(new ShopItem(positions[itemIndex].x - (shopItemWidth / 2), positions[itemIndex].y, shopItemWidth, shopItemHeight, item.name, item.src, item.cost, item.id))
    })

  }

  public draw(): void {
    this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

    this.buttons.forEach((button) => {
      button.draw(this.ctx)
    })

    Scene.writeTextToCanvas(
      this.ctx,
      'Winkel',
      this.canvas.width / 2,
      this.canvas.height / 10,
      this.canvas.height / 20,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      `Munten: ${this.userData.getCoins()}`,
        this.canvas.width / 2,
        this.canvas.height / 5,
        this.canvas.height / 25,
        'white',
        'center',
        'middle',
    )

    this.shopItems.forEach((shopItem) => {
      shopItem.draw(this.ctx)
    })

    Scene.writeTextToCanvas(
      this.ctx,
      `Page ${this.currentPage + 1} out of ${this.pages}`,
      this.canvas.width / 3,
      (this.canvas.height / 10) * 9 + (this.canvas.height / 20),
      this.canvas.height / 50,
      'white',

    )

    if (this.shopItems.length === 0) {
      Scene.writeTextToCanvas(
        this.ctx,
        'Je hebt alles al gekocht!',
          this.canvas.width / 2,
          this.canvas.height / 2,
          this.canvas.height / 25,
          'white',
          'center',
          'middle',
      )
    }
  }

  public processInput(): void {

  }

  public update(elapsed: number): Scene {
    return this.nextScene
  }

}
