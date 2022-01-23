import Scene from '../Scene.js';
import ImageProp from './ImageProp.js';

export default class TextBox {
  private textBoxImage: ImageProp;

  private sentences: string[];

  private currentSentence: number;

  private sentenceLength: number;

  private nextSentenceDelay: number;

  private xPos: number;

  private yPos: number;

  private width: number;

  private height: number;

  /**
   * Initialize TextBox
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param sentences sentences
   * @param textBoxImage textbox image
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    sentences: string[],
    textBoxImage: string,
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;

    this.sentences = sentences;
    this.currentSentence = 0;
    this.sentenceLength = 0;

    this.textBoxImage = new ImageProp(this.xPos, this.yPos, textBoxImage, this.width, this.height);

    this.nextSentenceDelay = 200;
  }

  /**
   * draw teh textbox to the canvas
   *
   * @param ctx the canvas rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.textBoxImage.draw(ctx);
    if (!this.isDone()) {
      Scene.writeTextToCanvas(
        ctx,
        this.sentences[this.currentSentence].substring(0, this.sentenceLength),
        this.xPos + (this.width / 2),
        this.yPos + (this.height / 2),
        this.height / 10,
        'black',
        'center',
        'middle',
      );
    }
  }

  /**
   * Advance the sentence
   *
   * @param elapsed the time elapsed since previous frame
   */
  public advanceSentence(elapsed: number): void {
    this.sentenceLength += 0.01;
    this.nextSentenceDelay -= elapsed;
  }

  /**
   * Go to next sentence
   */
  public nextSentence(): void {
    if (this.nextSentenceDelay < 0) {
      if (this.sentenceLength < this.sentences[this.currentSentence].length) {
        this.sentenceLength = this.sentences[this.currentSentence].length;
      } else {
        this.currentSentence += 1;
        this.sentenceLength = 0;
      }
      this.nextSentenceDelay = 200;
    }
  }

  /**
   * Reset the textbox
   */
  public reset(): void {
    this.currentSentence = 0;
    this.sentenceLength = 0;
  }

  /**
   * Check if textbox is done
   *
   * @returns boolean
   */
  public isDone(): boolean {
    return this.currentSentence > this.sentences.length - 1;
  }
}
