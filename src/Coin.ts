import Prop from './Prop.js';

export default class Coin extends Prop {
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
