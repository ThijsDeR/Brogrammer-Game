import Scene from '../Scene.js';
import RectProp from './RectProp.js';

export default class Slider extends RectProp {
  private id: string;

  private text: string;

  private textColor: string;

  private originalColor: string;

  private sliderColor: string;

  private hoverColor: string;

  private position: number;

  private positionRectProp: RectProp;

  /**
   * Initialize Slider
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param color color
   * @param sliderColor slider color
   * @param hoverColor color of slider when hovered
   * @param position position of slider (0 - 100%)
   * @param text text
   * @param textColor text color
   * @param id slider id
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    sliderColor: string,
    hoverColor: string,
    position: number,
    text: string,
    textColor: string,
    id: string,

  ) {
    super(xPos, yPos, width, height, color, 'stroke');

    this.originalColor = color;
    this.id = id;
    this.hoverColor = hoverColor;
    this.sliderColor = sliderColor;
    this.position = position;
    this.positionRectProp = new RectProp(this.xPos - this.width / 20, this.yPos - this.height / 2, this.width / 10, this.height * 2, this.sliderColor, 'fill');

    this.text = text;
    this.textColor = textColor;
  }

  /**
   * draw the slider to the screen
   *
   * @param ctx the canvas rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);

    this.positionRectProp.draw(ctx, -((this.position / 100) * this.width));
    Scene.writeTextToCanvas(
      ctx,
      this.text,
      this.xPos + (this.width * 1.5),
      this.yPos,
      this.height * 2,
      this.textColor,
    );
  }

  /**
   * Check if button is hovered
   *
   * @param mouseCoords object of x and y coordinates
   * @param mouseCoords.x the x coordinate
   * @param mouseCoords.y the y coordinate
   * @returns boolean
   */
  public isHovered(mouseCoords: { x: number, y: number }): boolean {
    if (
      mouseCoords.x > this.getMinXPos()
      && mouseCoords.x < this.getMaxXPos()
      && mouseCoords.y > this.getMinYPos()
      && mouseCoords.y < this.getMaxYPos()
    ) return true;
    return false;
  }

  /**
   * Getter for position
   *
   * @returns position
   */
  public getPosition(): number {
    return Math.round(this.position);
  }

  /**
   * Setter for position
   *
   * @param mouseCoords object of x and y coordinates
   * @param mouseCoords.x the x coordinate
   * @param mouseCoords.y the y coordinate
   */
  public changePosition(mouseCoords: { x: number, y: number }): void {
    this.position = Math.round(((mouseCoords.x - this.xPos) / this.width) * 100);
    if (this.position > 100) this.position = 100;
    else if (this.position < 0) this.position = 0;
  }

  /**
   * Getter for id
   *
   * @returns id
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Change button color if hovered
   *
   * @param mouseCoords object of x and y coordinates
   * @param mouseCoords.x the x coordinate
   * @param mouseCoords.y the y coordinate
   */
  public doHover(mouseCoords: { x: number, y: number }): void {
    if (this.isHovered(mouseCoords)) this.color = this.hoverColor;
    else this.color = this.originalColor;
  }
}
