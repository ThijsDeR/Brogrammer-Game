import Game from './Game.js';
import Prop from './Prop.js';

export default class CollideHandler {
  public static readonly NO_CONTACT: number = 0;

  public static readonly TOP_CONTACT: number = 1;

  public static readonly BOTTOM_CONTACT: number = 2;

  public static readonly LEFT_CONTACT: number = 3;

  public static readonly RIGHT_CONTACT: number = 4;


  /**
   * Check if two props collide
   *
   * @param object1 object 1
   * @param object2 object 2
   * @returns true or false
   */
  public static collides(object1: Prop, object2: Prop): boolean {
    if (
      object1.getMinXPos() < object2.getMaxXPos()
      && object1.getMaxXPos() > object2.getMinXPos()
      && object1.getMinYPos() < object2.getMaxYPos()
      && object1.getMaxYPos() > object2.getMinYPos()
    ) {
      return true;
    } return false;
  }

  /**
   * gets the elastic data needed
   *
   * @param object1 object that is colliding
   * @param object2 the object being collided with
   * @returns coordinates
   */
  public static getElasticData(object1: Prop, object2: Prop): { x: number, y: number, contact: number } {
    let xPos = object1.getMinXPos();
    let yPos = object1.getMinYPos();
    let contact: number


    const object1MidX = object1.getMinXPos() + (object1.getMaxXPos() / 2);
    const object1MidY = object1.getMinYPos() + (object1.getMaxYPos() / 2);
    const object2MidX = object2.getMinXPos() + (object2.getMaxXPos() / 2);
    const object2MidY = object2.getMinYPos() + (object2.getMaxYPos() / 2);

    const dx = (object2MidX - object1MidX) / ((object2.getMaxXPos() - object2.getMinXPos()) / 2);
    const dy = (object2MidY - object1MidY) / ((object2.getMaxYPos() - object2.getMinYPos()) / 2);

    const absDX = Math.abs(dx);
    const absDY = Math.abs(dy);

    if (absDX > absDY) {
      if (dx < 0) {
        xPos = object2.getMaxXPos();
        contact = CollideHandler.RIGHT_CONTACT
      }
      else {
        xPos = object2.getMinXPos() - (object1.getMaxXPos() - object1.getMinXPos());
        contact = CollideHandler.LEFT_CONTACT
      }

    } else {
      if (dy < 0) {
        yPos = object2.getMaxYPos();
        contact = CollideHandler.TOP_CONTACT
      }
      else {
        yPos = object2.getMinYPos() - (object1.getMaxYPos() - object1.getMinYPos());
        contact = CollideHandler.BOTTOM_CONTACT
      }
    }

    return { x: xPos, y: yPos, contact: contact};
  }
}
