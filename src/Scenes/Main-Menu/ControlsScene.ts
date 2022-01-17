import Button from '../../Props/Button.js';
import CollideHandler from '../../CollideHandler.js';
import CutScene from '../../CutScene.js';
import HubScene from '../Hub/HubScene.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import MenuScene from './MenuScene.js';
import Player from '../../Player.js';
import MainNPC from './NPC_Controls/MainNPC.js';
import SceneSelector from '../../SceneSelector.js';
import HubPlayer from '../Hub/HubPlayer.js';

export default class ControlsScene extends Scene {
  private props: Prop[];

  private nextScene: Scene;

  private player: HubPlayer;

  private NPCs: MainNPC[];

  private cutScene: null | CutScene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)
    
    this.props = [
      new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
    ]

    this.cutScene = null
    
    this.nextScene = this

    this.NPCs =[
      new MainNPC(this.canvas.width / 42, ((canvas.height / 4) * 3.6) - (this.canvas.height / 11), canvas.width / 10, (this.canvas.height / 5), this.canvas, this.userData),
    ]  

    this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8, this.userData)

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if(prop.getId() === 'backBtn') this.nextScene = new MenuScene(this.canvas, this.userData)
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

    this.NPCs.forEach((NPC) => {
      NPC.draw(this.ctx);
    })
    this.player.draw(this.ctx)

    if (this.cutScene !== null) {
      this.cutScene.draw()
    }

    Scene.writeTextToCanvas(
      this.ctx,
      'Controls',
      this.canvas.width / 2,
      this.canvas.height / 10,
      this.canvas.height / 20,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Klik op A en D om naar links en rechts te bewegen',
      this.canvas.width / 2,
      this.canvas.height / 4,
      this.canvas.height / 25,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Klik op spatie om te springen',
      this.canvas.width / 2,
      (this.canvas.height / 20) * 6,
      this.canvas.height / 25,
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      "Klik op E om met NPC'S te praten",
      this.canvas.width / 2,
      (this.canvas.height / 20) * 7,
      this.canvas.height / 25,
      'white',
    )
  }

   /**
   * processing the input of the scene
   */
    public processInput(): void {
      if (this.cutScene === null) {
        this.player.processInput();
      } else {
        this.cutScene.processInput()
      }
    }

   /**
   * update the scene
   *
   * @returns Next Scene
   */
    public update = (elapsed: number): Scene => {
      let nextScene: Scene = this
      // console.log(this.cutScene)
      if (this.cutScene === null) {
        let contacts: number[] = []
  
        this.props.forEach((prop) => {
          if (CollideHandler.collides(this.player, prop)) {
            const contact = CollideHandler.getContactData(this.player, prop);
            contacts.push(contact)
            if (contact === CollideHandler.TOP_CONTACT) {
              this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
            } else if (contact === CollideHandler.BOTTOM_CONTACT) {
              this.player.setYPos(prop.getMaxYPos())
            }
  
          }
        });
  
        this.NPCs.forEach((NPC) => {
          if (CollideHandler.collides(this.player, NPC)) {
            if (this.player.isInteracting()) {
              this.cutScene = NPC.interact()
            }
          }
        });
  
        this.player.move(this.canvas, contacts, elapsed);
      } else {
        const cutsceneDone = this.cutScene.update(elapsed)
        if (cutsceneDone) this.cutScene = null;
      }
  
      return this.nextScene
    }
  }