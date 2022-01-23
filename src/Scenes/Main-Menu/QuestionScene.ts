import GameInfo from '../../GameInfo.js';
import Button from '../../Props/Button.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import MenuInfo from './Info/MenuInfo.js';
import MistakeScene from './QuestionsScene.js';

export default class QuestionScene extends Scene {
  private question: {
    question: string,
    answers: { answer: string, correct: boolean }[],
    questionInfo: string,
  };

  private backButton: Button;

  private nextScene: Scene;

  /**
   * Initialize QuestionScene
   *
   * @param canvas the game canvas
   * @param userData user data
   * @param question the question
   * @param question.question the question question
   * @param question.answers the question answers
   * @param question.questionInfo the question info
   */
  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    question: {
      question: string,
      answers: { answer: string, correct: boolean }[],
      questionInfo: string,
    },
  ) {
    super(canvas, userData);

    this.question = question;

    this.backButton = new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn');

    this.nextScene = this;

    const hoverFunction = (event: MouseEvent) => {
      this.backButton.doHover({ x: event.x, y: event.y });
    };

    const clickFunction = (event: MouseEvent) => {
      const originalNextScene = this.nextScene;

      if (this.backButton.isHovered({ x: event.x, y: event.y })) {
        const buttonSound = new Audio(`${GameInfo.SOUND_PATH}UI_click.wav`);
        buttonSound.volume = MenuInfo.UI_CLICK_VOLUME
          * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
          * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
        buttonSound.play();
        this.nextScene = new MistakeScene(this.canvas, this.userData);
      }

      if (originalNextScene !== this.nextScene) {
        this.canvas.removeEventListener('click', clickFunction);
        this.canvas.removeEventListener('mousemove', hoverFunction);
      }
    };

    this.canvas.addEventListener('click', clickFunction);

    this.canvas.addEventListener('mousemove', hoverFunction);
  }

  /**
   *
   */
  public draw(): void {
    this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.backButton.draw(this.ctx);

    Scene.writeTextToCanvas(
      this.ctx,
      this.question.question,
      this.canvas.width / 2,
      this.canvas.height / 5,
      this.canvas.height / 25,
      'white',
      'center',
      'middle',
      this.canvas.width / 2,
    );

    this.question.answers.forEach((answer, answerIndex) => {
      let color;

      if (answer.correct) color = 'green';
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
        this.canvas.width / 3,
      );
    });

    Scene.writeTextToCanvas(
      this.ctx,
      this.question.questionInfo,
      this.canvas.width / 2,
      (this.canvas.height / 20) * 15,
      this.canvas.height / 40,
      'white',
      'center',
      'middle',
      this.canvas.width / 3,
    );
  }

  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public processInput(): void {

  }

  /**
   * update the scene
   *
   * @param elapsed the elapsed time since last frame
   * @returns scene
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    return this.nextScene;
  }
}
