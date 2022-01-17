import GameInfo from "../../../GameInfo.js";
import GridGenerator from "../../../GridGenerator.js";
import Button from "../../../Props/Button.js";
import Scene from "../../../Scene.js";
import UserData from "../../../UserData.js";
import ShopItem from "./ShopItem.js";
import ShopScene from "./ShopScene.js";


export default class ItemShopScene extends Scene {
  private shopItem: ShopItem;

  private buttons: Button[]

  private nextScene: Scene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, item: ShopItem) {
    super(canvas, userData)

    this.shopItem = item

    const buttonWidth = this.canvas.width / 8
    const buttonHeight = this.canvas.height / 20

    this.buttons = [
      new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
      new Button(this.canvas.width / 2 - (buttonWidth / 2), (this.canvas.height / 3) * 2 + buttonHeight, buttonWidth, buttonHeight, 'green', 'blue', 'Buy', this.canvas.width / 100, 'buy'),
    ]

    this.nextScene = this

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene
      this.buttons.forEach((button) => {
        if (button.isHovered({x: event.x, y: event.y})) {
          if (button.getId() === 'backBtn') {
            this.nextScene = new ShopScene(this.canvas, this.userData)
          }

          if (button.getId() === 'buy') {
            if (this.userData.getCoins() > this.shopItem.getCost()) {
              const startSound = new Audio(GameInfo.SOUND_PATH + 'Start_button.wav')
              startSound.volume = 0.5;
              startSound.play();
              this.userData.addSkin({src: this.shopItem.getImage().getImageSrc(), id: this.shopItem.getId()})
              this.userData.decreaseCoins(this.shopItem.getCost())
              this.nextScene = new ShopScene(this.canvas, this.userData)
            } else {
              const wrongSound = new Audio(GameInfo.SOUND_PATH + 'Wrong.mp3')
              wrongSound.volume = 0.5;
              wrongSound.play();
            }
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
    }

    this.canvas.addEventListener('click', clickFunction)

    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public draw(): void {
    this.ctx.fillStyle = "#454443";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

    this.buttons.forEach((button) => {
      button.draw(this.ctx)
    })

    this.ctx.drawImage(
      this.shopItem.getImage().getImage(),
      this.canvas.width / 2 - ((this.canvas.width / 8) / 2),
      this.canvas.height / 3,
      this.canvas.width / 8,
      this.canvas.height / 3
    )
    
    Scene.writeTextToCanvas(
      this.ctx,
      'Shop',
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

    Scene.writeTextToCanvas(
      this.ctx,
      `Name: ${this.shopItem.getName()}`,
      this.canvas.width / 5,
      this.canvas.height / 3,
      this.canvas.width / 50,
      'white',
      "left",
    )

    Scene.writeTextToCanvas(
      this.ctx,
      `Cost: ${this.shopItem.getCost()}`,
      this.canvas.width / 5,
      (this.canvas.height / 3) + (this.canvas.height / 10),
      this.canvas.width / 50,
      'white',
      "left",
    )

  }

  public processInput(): void {
      
  }

  public update(elapsed: number): Scene {
    return this.nextScene
  }
  
}