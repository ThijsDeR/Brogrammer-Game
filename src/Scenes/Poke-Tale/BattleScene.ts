import CutScene from "../../CutScene.js";
import KeyboardListener from "../../KeyboardListener.js";
import TextBox from "../../Props/TextBox.js";
import Text from '../../Props/Text.js';
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import PokeEnemy from "./PokeEnemy.js";
import PokePlayer from "./PokePlayer.js";
import GameInfo from '../../GameInfo.js';
import Game from "../../Game.js";
import DoodleInfo from "../Doodle/Info/DoodleInfo.js";
import Button from "../../Props/Button.js";
import Prop from "../../Props/Prop.js";
import PokeTaleInfo from "./Info/PokeTaleInfo.js";


export default class BattleScene extends CutScene{
// no movement needed, just draw the enemy and the player. give them 4 options and if they choose correct one. score goes up by one
// verschillende types? als in: kan goed zijn 1 punt/ 0, je blijft op dat scherm, is helemaal goed 1 punt en door naar volgende, fout blijft ook op het scherm en -1, super fout blijf op scherm -2
  private player: PokePlayer;

  private enemy: PokeEnemy;

  private textBox: TextBox;

  private props: Prop[];
  
  private prompt: number;

  private move: number;

  private completed: boolean;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    player: PokePlayer,
    enemy: PokeEnemy,
  ) {
    super(canvas, userData)
    const chatBoxHeight = (canvas.height / 3)
    const sentences = [
      "Je bent een wilde Gostleh tegengekomen!",
    ]

    // Sellects a random queston
    this.prompt = Game.randomNumber(0, PokeTaleInfo.PROMPTS.length - 1)
    let randomQuestion = PokeTaleInfo.PROMPTS[this.prompt];

    this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'PokeBox.png')
    this.player = player
    this.enemy = enemy
    this.props = [
      new Button(canvas.width / 5 * 0.6 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 2.5, this.canvas.height / 12, 'red', 'black', randomQuestion.moves[0].move, this.canvas.height / 30, '0'),
      new Button((canvas.width / 5) * 3.1 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 5)) / 2) + (chatBoxHeight * 2), this.canvas.width / 2.5, this.canvas.height / 12, 'purple', 'black', randomQuestion.moves[1].move, this.canvas.height / 30, '2'),
      new Button((canvas.width / 5) * 0.6 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 7))) + (chatBoxHeight * 2), this.canvas.width / 2.5, this.canvas.height / 12, 'blue', 'black', randomQuestion.moves[2].move, this.canvas.height / 30, '1'),
      new Button((canvas.width / 5) * 3.1 - this.canvas.width / 14, ((chatBoxHeight - (this.canvas.height / 7))) + (chatBoxHeight * 2), this.canvas.width / 2.5, this.canvas.height / 12, 'green', 'black', randomQuestion.moves[3].move, this.canvas.height / 30, '3'),
      new Text(canvas.width / 2, chatBoxHeight * 2 - this.canvas.height / 10, canvas.width / 2, this.canvas.height, randomQuestion.prompt, 'black', this.canvas.height / 25)
    ] 

    const questionClickFunction = (event: MouseEvent) => {
      const question = PokeTaleInfo.PROMPTS[this.prompt]
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            for (let i = 0; i < question.moves.length; i++) {
              if (Number(prop.getId()) === i && !question.moves[i].correct) {
                this.player.die()

              }
            }
            // this.userData.addQuestion(question)
             this.completed = true;
          }
        }
      })

    
      
      

      if (this.completed) {

        if (this.player.isDead()){
          const wrongSound = new Audio(GameInfo.SOUND_PATH + 'Wrong.mp3')
          wrongSound.volume = 0.8;
          wrongSound.play();
        } else {
          const correctSound = new Audio(GameInfo.SOUND_PATH + 'Correct.wav');
          correctSound.volume = 0.6;
          correctSound.play();
        }

        this.canvas.removeEventListener('click', questionClickFunction)
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

    this.canvas.addEventListener('click', questionClickFunction)
    this.canvas.addEventListener('mousemove', hoverFunction)
  }




  public draw(): void {
    // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'Battle-ground.png'), 0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.player.getImage(), 150, 480, this.canvas.width / 4, this.canvas.height / 4)
    this.ctx.drawImage(this.enemy.getImage(), 1150, 360, this.canvas.width / 4, this.canvas.height / 4)
    this.textBox.draw(this.ctx)
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })
  }

  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.textBox.nextSentence()
    }
  }

  public update(elapsed: number): boolean {
    if (this.textBox.isDone()) {
      this.textBox.reset()
      return true
    }
    return false
  }

  public getOptionalScene(): Scene | null{
    return null
  }
}
