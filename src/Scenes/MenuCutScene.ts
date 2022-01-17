import CutScene from "../CutScene";
import Button from "../Props/Button";
import Prop from "../Props/Prop";
import Scene from "../Scene";
import UserData from "../UserData";
import MenuScene from "./Main-Menu/MenuScene";


export default class MenuCutScene extends CutScene {
  private props: Prop[];

  private completed: boolean

  private nextScene: Scene | null

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    const buttonWidth = (this.canvas.width / 4)
    const buttonHeight = (this.canvas.height / 6)
    const betweenButtonHeight = (this.canvas.height / 10)

    this.props = [
      new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'blue', 'Verder', this.canvas.height / 20, 'verder'),
      new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'blue', 'Stoppen', this.canvas.height / 20, 'stoppen'),
    ]

    this.completed = false
    this.nextScene = null

    const clickFunction = (event: MouseEvent) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if (prop.getId() === 'stoppen') {
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
