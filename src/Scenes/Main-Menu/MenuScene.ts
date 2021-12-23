import Button from '../../Props/Button.js';
import CollideHandler from '../../CollideHandler.js';
import CutScene from '../../CutScene.js';
import HubScene from '../Hub/HubScene.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';

export default class MenuScene extends CutScene {
  private props: Prop[];

  private nextScene: Scene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      new Button(this.canvas.width / 2 - (500 / 2), 500, 500, 200, 'blue', 'Start!', 100, 'startBtn')
    ]

    this.nextScene = this
    
    this.canvas.addEventListener('click', (event) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isPressed({x: event.x, y: event.y})) {
            if(prop.getId() === 'startBtn') this.nextScene = new HubScene(this.canvas, this.userData)
          }
        }
      })
    })
  }

  public draw(): void {
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    Scene.writeTextToCanvas(
      this.ctx,
      'BroGrammers Game', 
      this.canvas.width / 2, 
      100, 
      50,
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'A - D To move left or right', 
      (this.canvas.width / 4) * 3, 
      100, 
      20
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Space to jump', 
      (this.canvas.width / 4) * 3, 
      150, 
      20
    )
  }

  public processInput(): void {
    
  }

  public update = (elapsed: number): Scene => {
    return this.nextScene
  }
}