import ImageProp from './ImageProp.js';

export default class Coin extends ImageProp {
    private points: number;

    // TODO: Change prop to ImgProp when implemented.
    public constructor(
        xPos: number, 
        yPos: number, 
        width: number | undefined = undefined, 
        height: number | undefined = undefined
        ){
        super(xPos, yPos, './assets/img/coin.png', width, height)
        this.points = 1;
      }

      public getScore(): number {
          return this.points;
      }
}
