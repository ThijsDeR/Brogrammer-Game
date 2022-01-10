import Button from '../../Props/Button.js';
import CollideHandler from '../../CollideHandler.js';
import CutScene from '../../CutScene.js';
import HubScene from '../Hub/HubScene.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import MenuScene from './MenuScene.js';

export default class ControlsScene extends CutScene {
  private props: Prop[];

  private nextScene: Scene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      new Button(this.canvas.width / 2 - (500 / 2), 700, 500, 200, 'white', 'Back', 100, 'backBtn'),
    ]

    this.nextScene = this

    this.canvas.addEventListener('click', (event) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if(prop.getId() === 'backBtn') this.nextScene = new MenuScene(this.canvas, this.userData)
          }
        }
      })
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          prop.doHover({x: event.x, y: event.y})
        }
      })
    })
  }

  public draw(): void {
    this.ctx.fillStyle = "#454443";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    Scene.writeTextToCanvas(
      this.ctx,
      'Controlls',
      this.canvas.width / 2,
      100,
      50,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Press A or D To move left or right',
      this.canvas.width / 2,
      250,
      30,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Press space to jump',
      this.canvas.width / 2,
      300,
      30,
      'white',
    )
  }

  public processInput(): void {

  }

  public update = (elapsed: number): Scene => {
    return this.nextScene
  }
}
