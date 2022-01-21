import CutScene from "../../CutScene.js";
import GameInfo from "../../GameInfo.js";
import Button from "../../Props/Button.js";
import Prop from "../../Props/Prop.js";
import Slider from "../../Props/Slider.js";
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import MenuInfo from "./Info/MenuInfo.js";
import MenuScene from "./MenuScene.js";


export default class SettingsScene extends Scene {
  private props: Prop[];

  private completed: boolean

  private nextScene: Scene;
  
  private backgroundMusic: HTMLAudioElement;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, backgroundMusic?: HTMLAudioElement, isPlaying: boolean = false) {
    super(canvas, userData)

    this.backgroundMusic = backgroundMusic;

    const buttonWidth = (this.canvas.width / 6)
    const buttonHeight = (this.canvas.height / 100)
    const betweenButtonHeight = (this.canvas.height / 10)

    this.nextScene = this

    this.props = [
      new Slider((this.canvas.width / 2) - (buttonWidth / 2), (this.canvas.height / 3) + (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME), 'Hoofd Geluid', 'white', 'masterSound'),
      new Slider((this.canvas.width / 2) - (buttonWidth / 2), (this.canvas.height / 3) + (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME), 'Muziek Geluid', 'white', 'musicSound'),
      new Slider((this.canvas.width / 2) - (buttonWidth / 2), (this.canvas.height / 3) + (buttonHeight + betweenButtonHeight) * 3, buttonWidth, buttonHeight, 'white', 'red', 'gray', this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME), 'Menu Geluid', 'white', 'uiSound'),
      new Button((this.canvas.width / 100), (this.canvas.height / 50), this.canvas.width / 20, this.canvas.height / 20, 'white', 'white', 'red', 'Terug', this.canvas.height / 50, 'backBtn')
    ]
    this.completed = false

    const clickFunction = (event: MouseEvent) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if (prop.getId() === 'backBtn') {
              this.nextScene = new MenuScene(this.canvas, this.userData, isPlaying, this.backgroundMusic)
              this.completed = true
              
            }
            const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
            buttonSound.volume = MenuInfo.UI_CLICK_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
            buttonSound.play();
        }
        }
        if (prop instanceof Slider) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            prop.changePosition({x: event.x, y: event.y})

            if (prop.getId() === 'masterSound') this.userData.changeSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME, prop.getProcentAmount())
            else if (prop.getId() === 'musicSound') this.userData.changeSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME, prop.getProcentAmount())
            else if (prop.getId() === 'uiSound') this.userData.changeSoundProcent(UserData.UI_SOUND_OBJECT_NAME, prop.getProcentAmount())

            this.backgroundMusic.pause()
            console.log(MenuInfo.MENU_MUSIC_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100))
            console.log(this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
            console.log(this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100)
            this.backgroundMusic.volume = MenuInfo.MENU_MUSIC_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
            this.backgroundMusic.play()
            const buttonSound = new Audio(GameInfo.SOUND_PATH + 'UI_click.wav')
            buttonSound.volume = MenuInfo.UI_CLICK_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
            buttonSound.play();
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
    this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })

    // Game title
    Scene.writeTextToCanvas(
      this.ctx,
      'Instellingen',
      this.canvas.width / 2,
      this.canvas.height / 10,
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
