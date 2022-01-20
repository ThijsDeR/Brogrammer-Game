import CutScene from "../CutScene.js";
import Button from "../Props/Button.js";
import Prop from "../Props/Prop.js";
import Scene from "../Scene.js";
import UserData from "../UserData.js";
import HubScene from "./Hub/HubScene.js";
import MenuScene from "./Main-Menu/MenuScene.js";


export default class MenuCutScene extends CutScene {
  private props: Prop[];

  private completed: boolean

  private nextScene: Scene | null
  
  private backgroundMusicHub: HTMLAudioElement;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, backgroundMusicHub?: HTMLAudioElement, isPlaying: boolean = false) {
    super(canvas, userData)

    this.backgroundMusicHub = backgroundMusicHub;

    const buttonWidth = (this.canvas.width / 4)
    const buttonHeight = (this.canvas.height / 6)
    const betweenButtonHeight = (this.canvas.height / 10)

    this.props = [
      new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Verder', this.canvas.height / 20, 'verder'),
      new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Hub', this.canvas.height / 20, 'hub'),
      new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 3, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Menu', this.canvas.height / 20, 'menu')
    ]
    this.completed = false
    this.nextScene = null

    const clickFunction = (event: MouseEvent) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if (prop.getId() === 'hub') {
              this.nextScene = new HubScene(canvas, userData, isPlaying, this.backgroundMusicHub)
            } else if (prop.getId() === 'menu') {
              this.nextScene = new MenuScene(canvas, userData)
            }
            this.completed = true
          }
        }
      })

      if (this.completed) {
        this.canvas.removeEventListener('click', clickFunction)
        this.canvas.removeEventListener('mousemove', hoverFunction)
      }
    }

    const hoverFunction = (event: MouseEvent) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          prop.doHover({x: event.x, y: event.y})
        }
      })
    }

    this.canvas.addEventListener('click', clickFunction)
    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public draw(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    // Game title
    Scene.writeTextToCanvas(
      this.ctx,
      'Wacht Menu',
      this.canvas.width / 2,
      this.canvas.height / 10,
      this.canvas.height / 20,
      'white',
    )
  }

  public processInput(): void {

  }

  public update = (elapsed: number): boolean => {
    return this.completed
  }

  public getOptionalScene(): Scene | null{
    return this.nextScene
  }
}
