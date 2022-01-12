import Game from "../../Game.js";
import ImageProp from "../../Props/ImageProp.js";
import Platform from "../../Props/Platform.js"
import Prop from "../../Props/Prop.js"
import Text from "../../Props/Text.js"
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunPlayer from "./TempleRunPlayer.js";

export default class TRQuestion {
  public static readonly PLATFORM_HEIGHT: number = 100

  private props: Prop[]

  public constructor(canvas: HTMLCanvasElement, player: TempleRunPlayer) {

    const platformTopYPos = canvas.height / 3 - 50
    const platformBottomYPos = (canvas.height / 3) * 2 - 50
    this.props = [
      new Platform(player.getMinXPos() + canvas.width + 1000, canvas.height / 3 - 50, 2000, 100),

      new Platform(player.getMinXPos() + canvas.width + 1000, (canvas.height / 3) * 2 - 50, 2000, 100),

      new ImageProp(player.getMinXPos() + canvas.width, canvas.height / 2 - 250, './assets/img/Hacker.png', 500, 500)
    ]
    
    this.addAnswers(canvas, player)
  }

  private addAnswers(canvas: HTMLCanvasElement, player: TempleRunPlayer): void {
    const platformTopYPos = canvas.height / 3 - 50
    const platformBottomYPos = (canvas.height / 3) * 2 - 50

    const positions = [
      platformTopYPos / 2,
      canvas.height / 2,
      platformBottomYPos + ((canvas.height - platformBottomYPos) / 2),
    ]

    const deathPositions = [
      0,
      platformTopYPos + TRQuestion.PLATFORM_HEIGHT,
      platformBottomYPos + TRQuestion.PLATFORM_HEIGHT
    ]

    const answers = [
      {answer: 'chat', correct: false},
      {answer: 'block', correct: true},
      {answer: 'date', correct: false}
    ]
    
    let i = 0
    while (answers.length > 0) {
      const randomAnswer = Game.randomNumber(0, answers.length - 1)
      const answer = answers[randomAnswer]
      this.props.push(new Text(player.getMinXPos() + canvas.width + 1000, positions[i], 500, 500, answer.answer, 'black'))
      if (answer.correct) {
        this.props.push(new CorrectProp(player.getMinXPos() + canvas.width + 2500, deathPositions[i], 200, platformTopYPos))
      } else {
        this.props.push(new DeadProp(player.getMinXPos() + canvas.width + 2500, deathPositions[i], 200, platformTopYPos))
      }
      answers.splice(randomAnswer, 1)
      i++
    }

  }

  public draw(ctx: CanvasRenderingContext2D, offsetX: number) {
    this.props.forEach((prop) => {
      prop.draw(ctx, offsetX)
    })
  }

  public getProps(): Prop[] {
    return this.props;
  }

}