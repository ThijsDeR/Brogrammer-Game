import Button from "../../Props/Button.js";
import Scene from "../../Scene.js";
import UserData from "../../UserData.js";
import MistakeScene from "./MistakesScene.js";

export default class QuestionScene extends Scene {
  private question: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string};

  private backButton: Button;

  private nextScene: Scene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, question: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string}) {
    super(canvas, userData)

    this.question = question

    this.backButton = new Button(10, 10, 100, 50, 'blue', 'back', 20, 'backBtn')

    this.nextScene = this

    this.canvas.addEventListener('click', (event) => {
      if (this.backButton.isHovered({x: event.x, y: event.y})) {
        this.nextScene = new MistakeScene(this.canvas, this.userData)
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.backButton.doHover({x: event.x, y: event.y}, 'red')
    })
  }

  public draw(): void {
    this.ctx.fillStyle = "#454443";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.backButton.draw(this.ctx)

    Scene.writeTextToCanvas(
      this.ctx, 
      this.question.question,
      this.canvas.width / 2,
      200,
      25,
      'white',
      'center',
      'middle',
      this.canvas.width / 2
    )

    this.question.answers.forEach((answer, answerIndex) => {
      let color;

      if(answer.correct) color = 'green';
      else color = 'red';

      Scene.writeTextToCanvas(
        this.ctx, 
        answer.answer,
        this.canvas.width / 2,
        300 + (100 * answerIndex),
        25,
        color,
        'center',
        'middle',
        this.canvas.width / 3
      )

    })

    
  }

  public processInput(): void {
      
  }

  public update(elapsed: number): Scene {
    return this
  }
  
}