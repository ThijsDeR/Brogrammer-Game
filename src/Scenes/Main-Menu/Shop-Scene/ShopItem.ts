import Button from "../../../Props/Button.js"
import ImageProp from "../../../Props/ImageProp.js";

export default class ShopItem {
  private img: ImageProp;

  private button: Button;

  private name: string;

  private cost: number;

  private id: number;

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
    this.img = new ImageProp(xPos, yPos, imageSrc, width, (height / 4) * 3)
    this.button = new Button(xPos, yPos + (height / 4) * 3, width, (height / 4), 'black', 'red', 'Kopen', width / 10, 'buy')

    this.name = name;
    this.cost = cost;
    this.id = id;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.img.draw(ctx)
    this.button.draw(ctx)
  }

  public getName(): string {
    return this.name;
  }

  public getCost(): number {
    return this.cost;
  }

  public getId(): number {
    return this.id;
  }

  public getImage(): ImageProp {
    return this.img
  }

  public isHovered(mouseCoords: {x: number, y: number}): boolean {
    if (
      mouseCoords.x > this.img.getMinXPos()
      && mouseCoords.x < this.img.getMaxXPos()
      && mouseCoords.y > this.img.getMinYPos()
      && mouseCoords.y < this.button.getMaxYPos()
    ) return true
    return false
  }

  public doHover(mouseCoords: {x: number, y: number}): void {
    if (this.isHovered(mouseCoords)) {
      this.button.doHover({x: this.button.getMinXPos() + (this.button.getWidth() / 2), y: this.button.getMinYPos() + (this.button.getHeight() / 2)})
    } else {
      this.button.doHover(mouseCoords)
    }
  }


}
