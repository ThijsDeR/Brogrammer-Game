import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import Button from '../../Props/Button.js';
import ImageProp from '../../Props/ImageProp.js';
import Prop from '../../Props/Prop.js';
import UserData from '../../UserData.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
import DoodlePlayer from './DoodlePlayer.js';
import Text from '../../Props/Text.js';
import GameInfo from '../../GameInfo.js';

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
      new Button(canvas.width / 5 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'red', 'white', randomQuestion.answers[0].answer, 20, '0'),
      new Button((canvas.width / 5) * 2 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'blue', 'white', randomQuestion.answers[1].answer, 20, '1'),
      new Button((canvas.width / 5) * 3 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'purple', 'white', randomQuestion.answers[2].answer, 20, '2'),
      new Button((canvas.width / 5) * 4 - 100, ((chatBoxHeight - 200) / 2) + (chatBoxHeight * 2), 200, 200, 'green', 'white', randomQuestion.answers[3].answer, 20, '3'),
      new Text(canvas.width / 2, chatBoxHeight * 2 - 100, canvas.width, 500, randomQuestion.question, 'white', 50)
    ]

    this.player = player
    this.completed = false;

    const questionClickFunction = (event: MouseEvent) => {
      const question = DoodleLevelInfo.QUESTIONS[this.question]
      this.props.forEach((prop) => {
        if (prop instanceof Button) {
          if (prop.isHovered({x: event.x, y: event.y})) {
            for (let i = 0; i < question.answers.length - 1; i++) {
              if (Number(prop.getId()) === i && !question.answers[i].correct) {
                this.player.die()
              }
            }
            this.userData.addQuestion(question)
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
