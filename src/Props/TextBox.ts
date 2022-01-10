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

  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    sentences: string[],
    
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;

    this.sentences = sentences;
    this.currentSentence = 0;
    this.sentenceLength = 0;

    this.textBoxImage = new ImageProp(this.xPos, this.yPos, './assets/img/chatbox.png', this.width, this.height)

    this.nextSentenceDelay = 200;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.textBoxImage.draw(ctx)
    if (!this.isDone()) {
      Scene.writeTextToCanvas(
        ctx, 
        this.sentences[this.currentSentence].substring(0, this.sentenceLength), 
        this.xPos + (this.width / 2),
        this.yPos + (this.height / 2),
        20,
        'center',
        'middle',
        'black'
      )
    }
  }

  public advanceSentence(elapsed: number): void {
    this.sentenceLength += 0.01;
    this.nextSentenceDelay -= elapsed
  }

  public nextSentence(): void {
    if (this.nextSentenceDelay < 0) {
      if (this.sentenceLength < this.sentences[this.currentSentence].length) {
        this.sentenceLength = this.sentences[this.currentSentence].length
      } else {
        this.currentSentence += 1;
        this.sentenceLength = 0;
      }
      this.nextSentenceDelay = 200
    }
  }

  public isDone(): boolean {
    return this.currentSentence > this.sentences.length - 1
  }
}