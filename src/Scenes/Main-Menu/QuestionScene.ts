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

    this.backButton = new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn')

    this.nextScene = this

    const clickFunction = (event: MouseEvent) => {
      let originalNextScene = this.nextScene

      if (this.backButton.isHovered({x: event.x, y: event.y})) {
        this.nextScene = new MistakeScene(this.canvas, this.userData)
      }

      if (originalNextScene !== this.nextScene) {
        this.canvas.removeEventListener('click', clickFunction)
        this.canvas.removeEventListener('mousemove', hoverFunction)
      }
    }

    const hoverFunction = (event: MouseEvent) => {
      this.backButton.doHover({x: event.x, y: event.y})
    }

    this.canvas.addEventListener('click', clickFunction)

    this.canvas.addEventListener('mousemove', hoverFunction)
  }

  public draw(): void {
    this.ctx.fillStyle = "#454443";
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.backButton.draw(this.ctx)

    Scene.writeTextToCanvas(
      this.ctx, 
      this.question.question,
      this.canvas.width / 2,
      this.canvas.height / 5,
      this.canvas.height / 25,
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
        ((this.canvas.height / 10) * 3) + ((this.canvas.height / 10) * answerIndex),
        this.canvas.height / 40,
        color,
        'center',
        'middle',
        this.canvas.width / 3
      )
    })

    Scene.writeTextToCanvas(
      this.ctx, 
      this.question.questionInfo,
      this.canvas.width / 2,
      (this.canvas.height / 20) * 15,
      this.canvas.height / 40,
      'white',
      'center',
      'middle',
      this.canvas.width / 3
    )

    
  }

  public processInput(): void {
      
  }

  public update(elapsed: number): Scene {
    return this.nextScene
  }
  
}