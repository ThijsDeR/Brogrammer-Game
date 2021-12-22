import Button from '../Button.js';
import CutScene from '../CutScene.js';
import Prop from '../Prop.js';
import Scene from '../Scene.js';
import UserData from '../UserData.js';

export default class MenuScene extends CutScene {
  private shouldStart: boolean;

  private props: Prop[];

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      new Button(50, 50, 500, 200, 'blue', 'Start!', 100)
    ]
    this.shouldStart = false
  }

  public draw(): void {
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })
  }

  public processInput(): void {
    
  }

  public update = (elapsed: number): Scene => {
    return this
  }
}