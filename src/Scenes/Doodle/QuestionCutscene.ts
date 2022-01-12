import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import Button from '../../Props/Button.js';
import ImageProp from '../../Props/ImageProp.js';
import Prop from '../../Props/Prop.js';
import UserData from '../../UserData.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
import DoodlePlayer from './DoodlePlayer.js';
import Text from '../../Props/Text.js';

export default class QuestionCutscene extends CutScene {
  private props: Prop[];

  private question: number

  private player: DoodlePlayer;

  private completed: boolean;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    player: DoodlePlayer,
  ) {
    super(canvas, userData)

    

    // Sellects a random queston
    this.question = Game.randomNumber(0, DoodleLevelInfo.QUESTIONS.length)
    let randomQuestion = DoodleLevelInfo.QUESTIONS[this.question];

    const chatBoxHeight = (canvas.height / 3)

    this.props = [
      new ImageProp(0, chatBoxHeight * 2, './assets/img/chatbox.png', canvas.width, chatBoxHeight),
      new Button(canvas.width / 5 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'red', randomQuestion.answers[0].answer, 20, '0'),
      new Button((canvas.width / 5) * 2 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'blue', randomQuestion.answers[1].answer, 20, '1'),
      new Button((canvas.width / 5) * 3 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'purple', randomQuestion.answers[2].answer, 20, '2'),
      new Button((canvas.width / 5) * 4 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'green', randomQuestion.answers[3].answer, 20, '3'),
      new Text(canvas.width / 2, chatBoxHeight * 2 - 100, canvas.width, 500, randomQuestion.question, 'white', 50)
    ]

    this.player = player
    this.completed = false;

    this.canvas.addEventListener('click', (event) => {
      const question = DoodleLevelInfo.QUESTIONS[this.question]
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            if(prop.getId() === '0') {
              if (!question.answers[0].correct) {
                this.player.die();
              } 
            }
            if(prop.getId() === '1') {
              if (!question.answers[1].correct) {
                this.player.die();
              } 
            }
            if(prop.getId() === '2') {
              if (!question.answers[2].correct) {
                this.player.die();
              } 
            }
            if(prop.getId() === '3') {
              if (!question.answers[3].correct) {
                this.player.die();
              } 
            }
            this.userData.addQuestion(question)
            this.completed = true;
          }
        }
      })
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          prop.doHover({x: event.x, y: event.y}, 'yellow')
        }
      })
    })
  }


  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.props.forEach((prop) => {
      prop.draw(this.ctx)
    })
  }

  public processInput(): void {

  }

  public update(elapsed: number): boolean {
    return this.completed
  }

}
