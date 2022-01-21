import Button from '../../Props/Button.js';
import HubScene from '../Hub/HubScene.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import ControlsScene from './ControlsScene.js';
import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
import QuestionsScene from './QuestionsScene.js';
import GridGenerator from '../../GridGenerator.js';
import ShopScene from './Shop-Scene/ShopScene.js';
import MenuInfo from './Info/MenuInfo.js';
import CutScene from '../../CutScene.js';
import SettingsScene from './SettingsScene.js';

export default class MenuScene extends Scene {
  private props: Prop[];

  private nextScene: Scene;

  private robotImage: ImageProp;

  private backgroundMusic: HTMLAudioElement;

  private isPlaying: boolean;

  private cutScene: CutScene | null

  public constructor(canvas: HTMLCanvasElement, userData: UserData, isPlaying?: boolean, backgroundMusic?: HTMLAudioElement| null) {
    super(canvas, userData)

    const buttonWidth = (this.canvas.width / 4)
    const buttonHeight = (this.canvas.height / 6)
    const betweenButtonWidth = (this.canvas.width / 25)
    const betweenButtonHeight = (this.canvas.height / 8)

    const positions = GridGenerator.generateGrid(
      this.canvas.width / 3,
      this.canvas.height / 3,
      4,
      (this.canvas.height / 3) * 2 - (this.canvas.height / 10),
      buttonWidth,
      buttonHeight,
      betweenButtonWidth,
      betweenButtonHeight
    )
    this.robotImage = new ImageProp((this.canvas.width / 5) * 4, this.canvas.height / 4, `${this.userData.getCurrentSkin().src}`, this.canvas.width / 6, this.canvas.height / 2)

    this.props = [
      new Button((this.canvas.width / 5) * 4, (this.canvas.height / 4) + (this.canvas.height / 2), this.canvas.width / 12, this.canvas.height / 10, 'white', 'white', 'red', '<', this.canvas.height / 12, 'decreaseCurrentSkin'),
      new Button(((this.canvas.width / 5) * 4) + (this.canvas.width / 12), (this.canvas.height / 4) + (this.canvas.height / 2), this.canvas.width / 12, this.canvas.height / 10, 'white', 'white', 'red', '>', this.canvas.height / 12, 'increaseCurrentSkin'),
      new Button(positions[0].x - (buttonWidth / 2), positions[0].y, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Start!', this.canvas.height / 20, 'startBtn'),
      new Button(positions[1].x - (buttonWidth / 2), positions[1].y, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Vragen', this.canvas.height / 20, 'mistakes'),
      new Button(positions[2].x - (buttonWidth / 2), positions[2].y, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Besturing', this.canvas.height / 20, 'controls'),
      new Button(positions[3].x - (buttonWidth / 2), positions[3].y, buttonWidth, buttonHeight, 'white', 'white', 'blue', 'Winkel', this.canvas.height / 20, 'shop'),
      new Button((this.canvas.width / 100), (this.canvas.height / 50), this.canvas.width / 15, this.canvas.height / 20, 'white', 'white', 'red', 'Instellingen', this.canvas.height / 50, 'settings')

    ]

    this.isPlaying = isPlaying ? true : false;

    this.nextScene = this;
    this.cutScene = null

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if (prop.getId() === 'startBtn') {
              if (this.backgroundMusic) {
                this.backgroundMusic.pause()
                this.backgroundMusic = null
              }
              this.nextScene = new HubScene(this.canvas, this.userData);
            }else if (prop.getId() === 'controls') {
              this.nextScene = new ControlsScene(this.canvas, this.userData, this.backgroundMusic);
            }else if (prop.getId() === 'mistakes') {
              this.nextScene = new QuestionsScene(this.canvas, this.userData, this.backgroundMusic);
            } else if (prop.getId() === 'shop') {
              this.nextScene = new ShopScene(this.canvas, this.userData, this.backgroundMusic);
            } else if (prop.getId() === 'decreaseCurrentSkin') {
              this.userData.decreaseCurrentSkin()
              this.robotImage = new ImageProp((this.canvas.width / 5) * 4, this.canvas.height / 4, `${this.userData.getCurrentSkin().src}`, this.canvas.width / 6, this.canvas.height / 2)
            } else if (prop.getId() === 'increaseCurrentSkin') {
              this.userData.increaseCurrentSkin()
              this.robotImage = new ImageProp((this.canvas.width / 5) * 4, this.canvas.height / 4, `${this.userData.getCurrentSkin().src}`, this.canvas.width / 6, this.canvas.height / 2)
            } else if (prop.getId() === 'settings') {
              this.nextScene = new SettingsScene(this.canvas, this.userData, this.backgroundMusic, this.isPlaying)
            }
            const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
            buttonSound.volume = MenuInfo.UI_CLICK_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
            buttonSound.play();
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
          prop.doHover({x: event.x, y: event.y})
        }
      }) 
      
      if (this.isPlaying === false) {
        this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'menu-music.wav');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = MenuInfo.MENU_MUSIC_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
        this.backgroundMusic.play();
        this.isPlaying = true;
      } else {
        if (backgroundMusic !== undefined) this.backgroundMusic = backgroundMusic;
      }
      
      
    }

    this.canvas.addEventListener('click', clickFunction)
    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public draw(): void {
    this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

    this.robotImage.draw(this.ctx)

    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    // Game title
    Scene.writeTextToCanvas(
      this.ctx,
      'Het epische avontuur van Sam Suong',
      this.canvas.width / 2,
      this.canvas.height / 10,
      this.canvas.height / 20,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      `${this.userData.getCurrentSkin().name}`,
      (this.canvas.width / 5) * 4 + (this.canvas.width / 12), 
      this.canvas.height / 4 - (this.canvas.height / 12),
      this.canvas.height / 20,
      'white',
    )
  }

  public processInput(): void {

  }

  public update = (elapsed: number): Scene => {
    return this.nextScene
  }
}
