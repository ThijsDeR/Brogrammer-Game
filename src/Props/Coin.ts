import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';

export default class Coin extends ImageProp {
    private points: number;

    public constructor(
        xPos: number, 
        yPos: number, 
        width: number | undefined = undefined, 
        height: number | undefined = undefined
        ){
        super(xPos, yPos, GameInfo.IMG_PATH + 'coin.png', width, height)
        this.points = 1;
      }

      public getPoints(): number {
          return this.points;
      }
}
