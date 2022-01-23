import Button from '../../../Props/Button.js';
import ImageProp from '../../../Props/ImageProp.js';

export default class ShopItem {
  private img: ImageProp;

  private button: Button;

  private name: string;

  private cost: number;

  private id: number;

  /**
   * Initialze ShopItem
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param name name
   * @param imageSrc image source
   * @param cost cost
   * @param id id
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    name: string,
    imageSrc: string,
    cost: number,
    id: number,
  ) {
    this.img = new ImageProp(xPos, yPos, imageSrc, width, (height / 4) * 3);
    this.button = new Button(xPos, yPos + (height / 4) * 3, width, (height / 4), 'black', 'white', 'red', 'Kopen', width / 10, 'buy');

    this.name = name;
    this.cost = cost;
    this.id = id;
  }

  /**
   * draw the shopitem to the canvas
   *
   * @param ctx the canvas rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.img.draw(ctx);
    this.button.draw(ctx);
  }

  /**
   * Getter for name
   *
   * @returns name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Getter for cost
   *
   * @returns cost
   */
  public getCost(): number {
    return this.cost;
  }

  /**
   * Getter for id
   *
   * @returns id
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Getter for image
   *
   * @returns image
   */
  public getImage(): ImageProp {
    return this.img;
  }

  /**
   * Check if shopitem is hovered
   *
   * @param mouseCoords the coords of the mouse
   * @param mouseCoords.x the x coord of the mouse
   * @param mouseCoords.y the y coord of the mouse
   * @returns boolean
   */
  public isHovered(mouseCoords: { x: number, y: number }): boolean {
    if (
      mouseCoords.x > this.img.getMinXPos()
      && mouseCoords.x < this.img.getMaxXPos()
      && mouseCoords.y > this.img.getMinYPos()
      && mouseCoords.y < this.button.getMaxYPos()
    ) return true;
    return false;
  }

  /**
   * Check if shopitem is hovered
   *
   * @param mouseCoords the coords of the mouse
   * @param mouseCoords.x the x coord of the mouse
   * @param mouseCoords.y the y coord of the mouse
   */
  public doHover(mouseCoords: { x: number, y: number }): void {
    if (this.isHovered(mouseCoords)) {
      this.button.doHover(
        {
          x: this.button.getMinXPos() + (this.button.getWidth() / 2),
          y: this.button.getMinYPos() + (this.button.getHeight() / 2),
        },
      );
    } else {
      this.button.doHover(mouseCoords);
    }
  }
}
