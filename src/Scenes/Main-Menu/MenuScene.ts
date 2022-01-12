import Button from '../../Props/Button.js';
import CollideHandler from '../../CollideHandler.js';
import CutScene from '../../CutScene.js';
import HubScene from '../Hub/HubScene.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import ControlsScene from './ControlsScreen.js';
import Player from '../../Player.js';
import MistakeScene from './MistakesScene.js';
import GameInfo from '../../GameInfo.js';

export default class MenuScene extends Scene {
  private props: Prop[];

  private nextScene: Scene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      new Button(this.canvas.width / 2 - (500 / 2), 250, 500, 200, 'white', 'Start!', 100, 'startBtn'),
      new Button(this.canvas.width / 2 - (500 / 2), 500, 500, 200, 'white', 'Mistakes', 100, 'mistakes'),
      new Button(this.canvas.width / 2 - (500 / 2), 750, 500, 200, 'white', 'Controls', 100, 'controls')
    ]

    this.nextScene = this

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if(prop.getId() === 'startBtn'){
              const startSound = new Audio(GameInfo.SOUND_PATH + 'Start_button.wav')
              startSound.volume = 0.5;
              startSound.play();
              this.nextScene = new HubScene(this.canvas, this.userData);
            };
            if(prop.getId() === 'controls'){
              const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
              buttonSound.volume = 1;
              buttonSound.play();
              this.nextScene = new ControlsScene(this.canvas, this.userData);
            };
            if(prop.getId() === 'mistakes'){
              const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
              buttonSound.volume = 1;
              buttonSound.play();
              this.nextScene = new MistakeScene(this.canvas, this.userData);
            };
          }
        }
      })

      if (originalNextScene !== this.nextScene) {
        this.canvas.removeEventListener('click', clickFunction)
        this.canvas.removeEventListener('mousemove', hoverFunction)
      }
    }

    const hoverFunction = (event: MouseEvent) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          prop.doHover({x: event.x, y: event.y}, 'blue')
        }
      })
    }

    this.canvas.addEventListener('click', clickFunction)
    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public draw(): void {
    this.ctx.fillStyle = "#454443";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    // Game title
    Scene.writeTextToCanvas(
      this.ctx,
      'The epic adventure of Sam Sung',
      this.canvas.width / 2,
      100,
      50,
      'white',
    )
  }

  public processInput(): void {

  }

  public update = (elapsed: number): Scene => {
    return this.nextScene
  }
}
